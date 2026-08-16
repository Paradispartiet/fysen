import { createRequire } from "node:module";
import { performance } from "node:perf_hooks";
import { sha256 } from "@fysen/menu-core";
import { assertPublicHttpUrl, type HostResolver } from "./security.js";

interface RobotsRules {
  isAllowed(url: string, userAgent?: string): boolean | undefined;
}

type RobotsParserFactory = (url: string, robotsText: string) => RobotsRules;

const nodeRequire = createRequire(import.meta.url);
const robotsParser = nodeRequire("robots-parser") as RobotsParserFactory;

export interface MenuHttpSourceState {
  readonly url: string;
  readonly userAgent: string;
  readonly etag: string | null;
  readonly lastModified: string | null;
}

export type MenuHttpFetchResult =
  | {
      readonly kind: "not_modified";
      readonly fetchedAt: string;
      readonly status: 304;
      readonly etag: string | null;
      readonly lastModified: string | null;
      readonly durationMs: number;
    }
  | {
      readonly kind: "content";
      readonly fetchedAt: string;
      readonly status: number;
      readonly contentType: string | null;
      readonly body: string;
      readonly rawSha256: string;
      readonly etag: string | null;
      readonly lastModified: string | null;
      readonly durationMs: number;
      readonly robotsAllowed: true;
    };

export class MenuFetchError extends Error {
  constructor(
    readonly code: string,
    message: string,
    readonly httpStatus: number | null = null,
  ) {
    super(message);
    this.name = "MenuFetchError";
  }
}

export interface HttpMenuClientOptions {
  readonly fetchImpl?: typeof fetch;
  readonly resolver?: HostResolver;
  readonly timeoutMs?: number;
  readonly maxResponseBytes?: number;
  readonly minHostDelayMs?: number;
}

function positiveIntegerFromEnv(name: string, fallback: number): number {
  const value = Number(process.env[name]);
  return Number.isInteger(value) && value > 0 ? value : fallback;
}

export class HttpMenuClient {
  private readonly fetchImpl: typeof fetch;
  private readonly resolver: HostResolver | undefined;
  private readonly timeoutMs: number;
  private readonly maxResponseBytes: number;
  private readonly minHostDelayMs: number;
  private readonly nextAllowedAt = new Map<string, number>();

  constructor(options: HttpMenuClientOptions = {}) {
    this.fetchImpl = options.fetchImpl ?? fetch;
    this.resolver = options.resolver;
    this.timeoutMs = options.timeoutMs ?? positiveIntegerFromEnv("FYSEN_HTTP_TIMEOUT_MS", 12_000);
    this.maxResponseBytes =
      options.maxResponseBytes ?? positiveIntegerFromEnv("FYSEN_MAX_RESPONSE_BYTES", 2 * 1024 * 1024);
    this.minHostDelayMs =
      options.minHostDelayMs ?? positiveIntegerFromEnv("FYSEN_MIN_HOST_DELAY_MS", 1_000);
  }

  async fetchSource(source: MenuHttpSourceState): Promise<MenuHttpFetchResult> {
    const started = performance.now();
    const target = await this.validate(source.url);
    const robotsAllowed = await this.checkRobots(target, source.userAgent);
    if (!robotsAllowed) {
      throw new MenuFetchError("ROBOTS_DISALLOWED", `robots.txt disallows ${target.href}`);
    }

    const headers = new Headers({
      Accept: "text/html,application/xhtml+xml;q=0.9,*/*;q=0.1",
      "User-Agent": source.userAgent,
    });
    if (source.etag) headers.set("If-None-Match", source.etag);
    if (source.lastModified) headers.set("If-Modified-Since", source.lastModified);

    const response = await this.safeFetch(target, { method: "GET", headers });
    const fetchedAt = new Date().toISOString();
    const durationMs = Math.max(0, Math.round(performance.now() - started));
    const etag = response.headers.get("etag");
    const lastModified = response.headers.get("last-modified");

    if (response.status === 304) {
      return { kind: "not_modified", fetchedAt, status: 304, etag, lastModified, durationMs };
    }
    if (!response.ok) {
      throw new MenuFetchError("HTTP_STATUS", `Menu fetch returned HTTP ${response.status}`, response.status);
    }

    const body = await this.readLimitedBody(response, this.maxResponseBytes);
    return {
      kind: "content",
      fetchedAt,
      status: response.status,
      contentType: response.headers.get("content-type"),
      body,
      rawSha256: sha256(body),
      etag,
      lastModified,
      durationMs,
      robotsAllowed: true,
    };
  }

  private async checkRobots(target: URL, userAgent: string): Promise<boolean> {
    const robotsUrl = new URL("/robots.txt", target);
    const response = await this.safeFetch(robotsUrl, {
      method: "GET",
      headers: new Headers({ Accept: "text/plain,*/*;q=0.1", "User-Agent": userAgent }),
    });

    if (response.status >= 200 && response.status < 300) {
      const body = await this.readLimitedBody(response, 256 * 1024);
      const parser = robotsParser(robotsUrl.href, body);
      return parser.isAllowed(target.href, userAgent) !== false;
    }

    if (response.status >= 400 && response.status < 500 && response.status !== 429) {
      return true;
    }

    throw new MenuFetchError(
      "ROBOTS_UNAVAILABLE",
      `robots.txt could not be evaluated safely (HTTP ${response.status})`,
      response.status,
    );
  }

  private async validate(value: string | URL): Promise<URL> {
    return this.resolver ? assertPublicHttpUrl(value, this.resolver) : assertPublicHttpUrl(value);
  }

  private async safeFetch(initialUrl: URL, init: RequestInit): Promise<Response> {
    let current = await this.validate(initialUrl);
    const initialOrigin = current.origin;

    for (let redirects = 0; redirects <= 3; redirects += 1) {
      await this.throttle(current.origin);
      let response: Response;
      try {
        response = await this.fetchImpl(current, {
          ...init,
          redirect: "manual",
          signal: AbortSignal.timeout(this.timeoutMs),
        });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        throw new MenuFetchError("NETWORK_ERROR", `Network request failed: ${message}`);
      }

      if (![301, 302, 303, 307, 308].includes(response.status)) return response;
      const location = response.headers.get("location");
      if (!location) throw new MenuFetchError("INVALID_REDIRECT", "Redirect response did not contain Location");
      await response.body?.cancel();

      const next = await this.validate(new URL(location, current));
      if (next.origin !== initialOrigin) {
        throw new MenuFetchError("CROSS_ORIGIN_REDIRECT", `Cross-origin crawler redirect blocked: ${next.origin}`);
      }
      current = next;
    }

    throw new MenuFetchError("TOO_MANY_REDIRECTS", "Crawler redirect limit exceeded");
  }

  private async throttle(origin: string): Promise<void> {
    const now = Date.now();
    const allowedAt = this.nextAllowedAt.get(origin) ?? now;
    if (allowedAt > now) {
      await new Promise<void>((resolve) => setTimeout(resolve, allowedAt - now));
    }
    this.nextAllowedAt.set(origin, Date.now() + this.minHostDelayMs);
  }

  private async readLimitedBody(response: Response, maxBytes: number): Promise<string> {
    const contentLength = Number(response.headers.get("content-length"));
    if (Number.isFinite(contentLength) && contentLength > maxBytes) {
      throw new MenuFetchError("BODY_TOO_LARGE", `Response exceeds ${maxBytes} bytes`, response.status);
    }
    if (!response.body) return "";

    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let total = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (!value) continue;
        total += value.byteLength;
        if (total > maxBytes) {
          throw new MenuFetchError("BODY_TOO_LARGE", `Response exceeds ${maxBytes} bytes`, response.status);
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }

    return Buffer.concat(chunks.map((chunk) => Buffer.from(chunk))).toString("utf8");
  }
}
