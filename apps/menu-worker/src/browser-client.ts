import { chromium, type BrowserContext, type Route } from "playwright-core";
import { sha256 } from "@fysen/menu-core";
import { assertPublicHttpUrl } from "./security.js";
import {
  HttpMenuClient,
  MenuFetchError,
  type MenuHttpFetchResult,
} from "./http-client.js";

const MAX_RENDERED_HTML_BYTES = 2 * 1024 * 1024;
const MAX_BROWSER_REQUESTS = 120;
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

// Diagnostic-only allowances on this unmerged branch. Never merge these hardcoded origins.
const diagnosticAllowedDataOrigins = new Set([
  "https://siteassets.parastorage.com",
  "https://static.parastorage.com",
]);

type RenderedMenuFetch = Extract<MenuHttpFetchResult, { readonly kind: "content" }>;

export interface BrowserMenuSource {
  readonly url: string;
  readonly userAgent: string;
}

export interface BrowserRequestPolicyInput {
  readonly sourceOrigin: string;
  readonly requestUrl: string;
  readonly resourceType: string;
}

export type BrowserRequestDecision =
  | { readonly action: "allow"; readonly validatePublicNetwork: true }
  | { readonly action: "block"; readonly reason: string; readonly fatal: boolean };

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

  if (
    (input.resourceType === "document" || input.resourceType === "xhr" || input.resourceType === "fetch") &&
    requestUrl.origin !== input.sourceOrigin &&
    !diagnosticAllowedDataOrigins.has(requestUrl.origin)
  ) {
    return {
      action: "block",
      reason: `cross-origin ${input.resourceType} requires explicit source support: ${requestUrl.origin}`,
      fatal: true,
    };
  }

  return { action: "allow", validatePublicNetwork: true };
}

async function installNetworkPolicy(
  context: BrowserContext,
  sourceOrigin: string,
  violation: { value: MenuFetchError | null },
): Promise<void> {
  const validatedUrls = new Map<string, Promise<void>>();
  let requestCount = 0;

  await context.route("**/*", async (route: Route) => {
    try {
      requestCount += 1;
      if (requestCount > MAX_BROWSER_REQUESTS) {
        violation.value ??= new MenuFetchError(
          "BROWSER_REQUEST_LIMIT",
          `Rendered source exceeded ${MAX_BROWSER_REQUESTS} browser requests`,
        );
        await route.abort("blockedbyclient");
        return;
      }

      const request = route.request();
      const decision = browserRequestDecision({
        sourceOrigin,
        requestUrl: request.url(),
        resourceType: request.resourceType(),
      });
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

    const preflight = await this.httpClient.fetchSource({
      url: target.toString(),
      userAgent: source.userAgent,
      etag: null,
      lastModified: null,
    });
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
      await installNetworkPolicy(context, target.origin, violation);
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
      if (finalUrl.origin !== target.origin) {
        throw new MenuFetchError(
          "BROWSER_CROSS_ORIGIN_REDIRECT",
          `Rendered source redirected outside its declared origin: ${finalUrl.origin}`,
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
