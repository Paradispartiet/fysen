import { resolve } from "node:path";
import { readRestaurantOnboardingManifest } from "../apps/menu-worker/dist/onboarding-manifest.js";
import {
  extractMenuSource,
  fetchMenuSource,
} from "../apps/menu-worker/dist/menu-source-runtime.js";
import { recoverElementorPriceListHtmlItems } from "../apps/menu-worker/dist/html-elementor-price-list-recovery.js";
import { recoverStrongTitlePriceHtmlItems } from "../apps/menu-worker/dist/html-strong-title-price-recovery.js";
import { recoverAdjacentHeadingPriceHtmlItems } from "../apps/menu-worker/dist/html-adjacent-heading-price-recovery.js";
import { extractScopedHtmlMenu } from "../apps/menu-worker/dist/html-source-extractor.js";

const manifestArg = process.argv[2];
if (!manifestArg) {
  throw new Error("Usage: node scripts/diagnose-html-recovery.mjs <manifest-path>");
}

const manifest = await readRestaurantOnboardingManifest(resolve(manifestArg));
const source = manifest.menuSource;
if (source.sourceType !== "html" && source.sourceType !== "json_ld") {
  throw new Error(`Diagnostic only supports HTML/JSON-LD sources, got ${source.sourceType}`);
}

const fetched = await fetchMenuSource({
  url: source.url,
  sourceType: source.sourceType,
  fetchMode: source.fetchMode,
  userAgent: source.userAgent,
  etag: null,
  lastModified: null,
  maxResponseBytes: source.maxResponseBytes ?? null,
  sourceSupport: source.sourceSupport,
});
if (fetched.kind !== "content") {
  throw new Error(`Expected content fetch, got ${fetched.kind}`);
}

const families = {
  elementor: recoverElementorPriceListHtmlItems(fetched.body),
  strongTitle: recoverStrongTitlePriceHtmlItems(fetched.body),
  headingPrice: recoverAdjacentHeadingPriceHtmlItems(fetched.body),
  scoped: extractScopedHtmlMenu(fetched.body).items,
  finalRuntime: (await extractMenuSource(source.sourceType, fetched)).items,
};

const result = Object.fromEntries(
  Object.entries(families).map(([name, items]) => [
    name,
    {
      count: items.length,
      items: items.map((item) => ({
        name: item.name,
        priceMinor: item.priceMinor,
        sectionName: item.sectionName,
      })),
    },
  ]),
);

console.log(JSON.stringify({
  slug: manifest.restaurant.slug,
  sourceUrl: source.url,
  httpStatus: fetched.status,
  result,
}, null, 2));
