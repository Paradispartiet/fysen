import { sha256 } from "@fysen/menu-core";
import { HttpMenuClient, type MenuHttpFetchResult } from "./http-client.js";
import { OpeningHoursExtractionError, type ExtractedOpeningHours } from "./opening-hours-extractor.js";
import {
  extractCanonicalOpeningHours,
  OPENING_HOURS_SOURCE_EXTRACTOR_VERSION,
} from "./opening-hours-source-extractor.js";

export interface OpeningHoursSourceRuntimeInput {
  readonly url: string;
  readonly userAgent: string;
  readonly etag: string | null;
  readonly lastModified: string | null;
  readonly extractor?: string;
  readonly scopeHints: readonly string[];
}

type OpeningHoursContentFetch = Extract<MenuHttpFetchResult, { readonly kind: "content" }>;

export type OpeningHoursSourceResolution =
  | { readonly kind: "not_modified"; readonly fetched: Extract<MenuHttpFetchResult, { readonly kind: "not_modified" }> }
  | {
      readonly kind: "content";
      readonly fetched: OpeningHoursContentFetch;
      readonly extracted: ExtractedOpeningHours;
      readonly scheduleFingerprint: string;
      readonly extractorVersion: string;
    };

export function openingHoursFingerprint(
  intervals: readonly { isoWeekday: number; opensAt: string; closesAt: string; closesNextDay: boolean }[],
): string {
  return sha256(
    JSON.stringify(
      [...intervals].sort(
        (a, b) =>
          a.isoWeekday - b.isoWeekday ||
          a.opensAt.localeCompare(b.opensAt) ||
          a.closesAt.localeCompare(b.closesAt) ||
          Number(a.closesNextDay) - Number(b.closesNextDay),
      ),
    ),
  );
}

export async function resolveOpeningHoursSource(
  input: OpeningHoursSourceRuntimeInput,
  client = new HttpMenuClient(),
): Promise<OpeningHoursSourceResolution> {
  const fetched = await client.fetchSource({
    url: input.url,
    userAgent: input.userAgent,
    etag: input.etag,
    lastModified: input.lastModified,
  });
  if (fetched.kind === "not_modified") return { kind: "not_modified", fetched };

  const extractor = input.extractor ?? "visible_text_v1";
  if (extractor !== "visible_text_v1") {
    throw new OpeningHoursExtractionError("UNSUPPORTED_EXTRACTOR", `Unsupported hours extractor: ${extractor}`);
  }

  const extracted = extractCanonicalOpeningHours(fetched.body, input.scopeHints);
  return {
    kind: "content",
    fetched,
    extracted,
    scheduleFingerprint: openingHoursFingerprint(extracted.intervals),
    extractorVersion: OPENING_HOURS_SOURCE_EXTRACTOR_VERSION,
  };
}
