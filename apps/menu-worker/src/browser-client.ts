import { chromium, type BrowserContext, type Route } from "playwright-core";
import { sha256 } from "@fysen/menu-core";
import { assertPublicHttpUrl } from "./security.js";
import {
  HttpMenuClient,
  MenuFetchError,
  type MenuHttpFetchResult,
} from "./http-client.js";

const MAX_RENDERED_HTML_BYTES = 2 * 1024 * 1024;
const MAX_BROWSER_ROUTE_EVENTS = 1000;
const MAX_BROWSER_NETWORK_REQUESTS = 120;
const NAVIGATION_TIMEOUT_MS = 15_000;
const NETWORK_IDLE_TIMEOUT_MS = 5_000;

const blockedResourceTypes = new Set([
  "image",
  "media",
  "font",
  "texttrack",
  "eventsource",
  "websocket",
]);

type RenderedMenuFetch = Extract<MenuHttpFetchResult, { readonly kind: "content" }>;

export interface BrowserMenuSourceSupport {
  readonly redirectOrigins: readonly string[];
  readonly browserDataOrigins: readonly string[];
}

export interface BrowserMenuSource {
  readonly url: string;
  readonly userAgent: string;
  readonly sourceSupport?: BrowserMenuSourceSupport;
}

export interface BrowserRequestPolicyInput {
  readonly sourceOrigin: string;
  readonly requestUrl: string;
  readonly resourceType: string;
  readonly redirectOrigins?: readonly string[];
  readonly browserDataOrigins?: readonly string[];
}

export type BrowserRequestDecision =
  | { readonly action: "allow"; readonly validatePublicNetwork: true }
  | { readonly action: "block"; readonly reason: string; readonly fatal: boolean };

export interface BrowserRequestBudget {
  readonly routeEvents: number;
  readonly networkRequests: number;
}

export type BrowserRequestBudgetViolation =
  | {
      readonly code: "BROWSER_ROUTE_EVENT_LIMIT" | "BROWSER_REQUEST_LIMIT";
      readonly message: string;
    }
  | null;

export interface BrowserRequestBudgetResult {
  readonly budget: BrowserRequestBudget;
  readonly violation: BrowserRequestBudgetViolation;
}

export function browserRequestDecision(input: BrowserRequestPolicyInput): BrowserRequestDecision {
  if (blockedResourceTypes.has(input.resourceType)) {
    return { action: "block", reason: `blocked resource type: ${input.resourceType}`, fatal: false };
  }

  let requestUrl: URL;
  try {
    requestUrl = new URL(input.requestUrl);
  } catch {
    return { action: "block", reason: "invalid request URL", fatal: true };
  }

  if (requestUrl.protocol !== "https:") {
    return { action: "block", reason: `browser request must use HTTPS: ${requestUrl.protocol}`, fatal: true };
  }

  const documentOrigins = new Set([input.sourceOrigin, ...(input.redirectOrigins ?? [])]);
  const dataOrigins = new Set([...documentOrigins, ...(input.browserDataOrigins ?? [])]);
  const allowedOrigins = input.resourceType === "document" ? documentOrigins : dataOrigins;

  if (
    (input.resourceType === "document" || input.resourceType === "xhr" || input.resourceType === "fetch") &&
    !allowedOrigins.has(requestUrl.origin)
  ) {
    return {
      action: "block",
      reason: `cross-origin ${input.resourceType} requires explicit source support: ${requestUrl.origin}`,
      fatal: true,
    };
  }

  return { action: "allow", validatePublicNetwork: true };
}

export function accountBrowserRequest(
  current: BrowserRequestBudget,
  decision: BrowserRequestDecision,
): BrowserRequestBudgetResult {
  const routeEvents = current.routeEvents + 1;
  if (routeEvents > MAX_BROWSER_ROUTE_EVENTS) {
    return {
      budget: { routeEvents, networkRequests: current.networkRequests },
      violation: {
        code: "BROWSER_ROUTE_EVENT_LIMIT",
        message: `Rendered source exceeded ${MAX_BROWSER_ROUTE_EVENTS} browser route events`,
      },
    };
  }

  if (decision.action === "block") {
    return {
      budget: { routeEvents, networkRequests: current.networkRequests },
      violation: null,
    };
  }

  const networkRequests = current.networkRequests + 1;
  if (networkRequests > MAX_BROWSER_NETWORK_REQUESTS) {
    return {
      budget: { routeEvents, networkRequests },
      violation: {
        code: "BROWSER_REQUEST_LIMIT",
        message: `Rendered source exceeded ${MAX_BROWSER_NETWORK_REQUESTS} allowed browser network requests`,
      },
    };
  }

  return {
    budget: { routeEvents, networkRequests },
    violation: null,
  };
}

export function browserBudgetViolationIsFatal(
  violation: Exclude<BrowserRequestBudgetViolation, null>,
): boolean {
  return violation.code === "BROWSER_ROUTE_EVENT_LIMIT";
}

async function installNetworkPolicy(
  context: BrowserContext,
  sourceOrigin: string,
  support: BrowserMenuSourceSupport,
  violation: { value: MenuFetchError | null },
): Promise<void> {
  const validatedUrls = new Map<string, Promise<void>>();
  let budget: BrowserRequestBudget = { routeEvents: 0, networkRequests: 0 };

  await context.route("**/*", async (route: Route) => {
    try {
      const request = route.request();
      const decision = browserRequestDecision({
        sourceOrigin,
        requestUrl: request.url(),
        resourceType: request.resourceType(),
        redirectOrigins: support.redirectOrigins,
        browserDataOrigins: support.browserDataOrigins,
      });
      const accounted = accountBrowserRequest(budget, decision);
      budget = accounted.budget;
      if (accounted.violation) {
        if (browserBudgetViolationIsFatal(accounted.violation)) {
          violation.value ??= new MenuFetchError(accounted.violation.code, accounted.violation.message);
        }
        await route.abort("blockedbyclient");
        return;
      }

      if (decision.action === "block") {
        if (decision.fatal) {
          violation.value ??= new MenuFetchError("BROWSER_REQUEST_BLOCKED", decision.reason);
        }
        await route.abort("blockedbyclient");
        return;
      }

      const url = new URL(request.url());
      const networkKey = `${url.protocol}//${url.hostname}:${url.port || "443"}`;
      let validation = validatedUrls.get(networkKey);
      if (!validation) {
        validation = assertPublicHttpUrl(url).then(() => undefined);
        validatedUrls.set(networkKey, validation);
      }
      await validation;
      await route.continue();
    } catch (error) {
      violation.value ??= new MenuFetchError(
        "BROWSER_NETWORK_POLICY",
        error instanceof Error ? error.message : String(error),
      );
      await route.abort("blockedbyclient").catch(() => undefined);
    }
  });
}

export class BrowserMenuClient {
  constructor(private readonly httpClient = new HttpMenuClient()) {}

  async fetchSource(source: BrowserMenuSource): Promise<RenderedMenuFetch> {
    const started = Date.now();
    const target = await assertPublicHttpUrl(source.url);
    const support: BrowserMenuSourceSupport = source.sourceSupport ?? {
      redirectOrigins: [],
      browserDataOrigins: [],
    };

    const preflight = await this.httpClient.fetchSource(
      {
        url: target.toString(),
        userAgent: source.userAgent,
        etag: null,
        lastModified: null,
      },
      { allowedRedirectOrigins: support.redirectOrigins },
    );
    if (preflight.kind !== "content") {
      throw new MenuFetchError(
        "BROWSER_PREFLIGHT_NOT_MODIFIED",
        "Rendered source preflight unexpectedly returned HTTP 304",
        preflight.status,
      );
    }

    const browser = await chromium.launch({ channel: "chrome", headless: true, chromiumSandbox: true });
    const context = await browser.newContext({
      acceptDownloads: false,
      ignoreHTTPSErrors: false,
      javaScriptEnabled: true,
      serviceWorkers: "block",
      userAgent: source.userAgent,
    });
    const violation: { value: MenuFetchError | null } = { value: null };

    try {
      await installNetworkPolicy(context, target.origin, support, violation);
      const page = await context.newPage();
      context.on("page", (openedPage) => {
        if (openedPage !== page) void openedPage.close();
      });
      page.on("dialog", (dialog) => void dialog.dismiss());

      const response = await page.goto(target.toString(), {
        timeout: NAVIGATION_TIMEOUT_MS,
        waitUntil: "domcontentloaded",
      });
      await page.waitForLoadState("networkidle", { timeout: NETWORK_IDLE_TIMEOUT_MS }).catch(() => undefined);

      if (violation.value) throw violation.value;
      const finalUrl = new URL(page.url());
      const allowedDocumentOrigins = new Set([target.origin, ...support.redirectOrigins]);
      if (!allowedDocumentOrigins.has(finalUrl.origin)) {
        throw new MenuFetchError(
          "BROWSER_CROSS_ORIGIN_REDIRECT",
          `Rendered source redirected outside its declared origins: ${finalUrl.origin}`,
          response?.status() ?? null,
        );
      }
      await assertPublicHttpUrl(finalUrl);

      const body = await page.content();
      const bodyBytes = new TextEncoder().encode(body);
      if (bodyBytes.length > MAX_RENDERED_HTML_BYTES) {
        throw new MenuFetchError(
          "BROWSER_DOM_TOO_LARGE",
          `Rendered DOM exceeded ${MAX_RENDERED_HTML_BYTES} bytes`,
          response?.status() ?? null,
        );
      }

      const fetchedAt = new Date().toISOString();
      return {
        kind: "content",
        status: response?.status() ?? preflight.status,
        contentType: "text/html; charset=utf-8",
        body,
        bodyBytes,
        rawSha256: sha256(body),
        etag: null,
        lastModified: null,
        robotsAllowed: preflight.robotsAllowed,
        durationMs: Date.now() - started,
        fetchedAt,
      };
    } finally {
      await context.close().catch(() => undefined);
      await browser.close().catch(() => undefined);
    }
  }
}
