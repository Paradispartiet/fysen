/**
 * Read-only Sumo source diagnostic for issue #922.
 *
 * Compares repeated raw HTTP responses (not canonical menu fingerprints)
 * against parser recovery families. Only bounded metadata and fixed dish/section
 * probes are printed: never response HTML, user data or arbitrary page content.
 */
import { normalizeDishName } from "@fysen/menu-core";
import { extractHtmlVisibleText, stripExplicitlyHiddenHtmlContent } from "./html-extractor.js";
import { normalizeHtmlHeadingLineBreaks } from "./html-heading-normalizer.js";
import {
  recoverAdjacentHeadingPriceHtmlItems,
} from "./html-adjacent-heading-price-recovery.js";
import {
  recoverStrongTitlePriceHtmlItems,
} from "./html-strong-title-price-recovery.js";
import {
  recoverTrailingPriceCardHtmlItems,
} from "./html-trailing-price-card-recovery.js";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";
import {
  extractMenuSource,
  fetchMenuSource,
  normalizeHtmlPriceNotation,
} from "./menu-source-runtime.js";

const SOURCE_URL = "https://sumorestaurant.no/en/our-concept";
const LOCKED = [
  { name: "Sim-Sim Poké", priceMinor: 26900 },
  { name: "Kimchi Salad", priceMinor: 5900 },
  { name: "Dirty Ushi Maki", priceMinor: 26900 },
  { name: "Family Combo", priceMinor: 119900 },
] as const;
const SECTIONS = [
  "Poké", "Extras", "Beyond fusion", "Sushi Sharing Combos",
] as const;

type ParsedItem = {
  readonly normalizedName: string;
  readonly priceMinor: number | null;
};

function signature(items: readonly ParsedItem[]): string {
  return JSON.stringify(
    items.map((item) => [item.normalizedName, item.priceMinor]),
  );
}

function probeLocked(
  visibleText: string,
  items: readonly ParsedItem[],
) {
  return LOCKED.map(({ name, priceMinor }) => ({
    name,
    sourceTextContainsName: visibleText.includes(name.normalize("NFKC").toLowerCase()),
    extractedName: items.some((item) => item.normalizedName === normalizeDishName(name)),
    extractedExactPrice: items.some(
      (item) =>
        item.normalizedName === normalizeDishName(name) &&
        item.priceMinor === priceMinor,
    ),
  }));
}

async function main(): Promise<void> {
  const attempts = [];
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    try {
      const fetched = await fetchMenuSource({
        url: SOURCE_URL,
        sourceType: "html",
        fetchMode: "http",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
      });
      if (fetched.kind !== "content") {
        attempts.push({ attempt, kind: fetched.kind });
        continue;
      }

      const normalizedHtml = normalizeHtmlPriceNotation(
        normalizeHtmlHeadingLineBreaks(fetched.body),
      );
      const sanitized = stripExplicitlyHiddenHtmlContent(normalizedHtml);
      const visibleText = extractHtmlVisibleText(sanitized)
        .normalize("NFKC")
        .toLowerCase();
      const scoped = extractScopedHtmlMenu(sanitized);
      const trailing = recoverTrailingPriceCardHtmlItems(sanitized);
      const adjacent = recoverAdjacentHeadingPriceHtmlItems(sanitized);
      const strong = recoverStrongTitlePriceHtmlItems(sanitized);
      const extracted = await extractMenuSource("html", fetched);
      const repeated = await extractMenuSource("html", fetched);
      attempts.push({
        attempt,
        kind: fetched.kind,
        httpStatus: fetched.status,
        rawSha256: fetched.rawSha256,
        bodyBytes: fetched.bodyBytes.length,
        extractionMethod: extracted.method,
        extractorVersion: extracted.extractorVersion,
        familyCounts: {
          scoped: scoped.items.length,
          trailing: trailing.length,
          adjacentHeading: adjacent.length,
          strongTitle: strong.length,
          selectedCanonical: extracted.items.length,
        },
        sameRawBodyDeterministic: signature(extracted.items) === signature(repeated.items),
        sections: SECTIONS.map((section) => ({
          section,
          sourceTextContainsLabel: visibleText.includes(section.toLowerCase()),
        })),
        locked: probeLocked(visibleText, extracted.items),
        leakedAllergenControl: extracted.items.some(
          (item) => /^(?:view|filter) allergies$/iu.test(item.name),
        ),
      });
    } catch (error) {
      attempts.push({
        attempt,
        kind: "error",
        message: error instanceof Error ? error.message.slice(0, 250) : "unknown",
      });
    }
    if (attempt < 5) {
      await new Promise<void>((resolve) => setTimeout(resolve, 750));
    }
  }

  const content = attempts.filter((entry) => entry.kind === "content");
  process.stdout.write(
    JSON.stringify({
      githubSha: process.env.GITHUB_SHA ?? null,
      source: SOURCE_URL,
      attempts,
      distinctRawSha256: new Set(
        content.map((entry) => "rawSha256" in entry ? entry.rawSha256 : null),
      ).size,
    }, null, 2) + "\n",
  );
  if (content.length === 0) process.exitCode = 1;
}

await main();
