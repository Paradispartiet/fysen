import { readFileSync } from "node:fs";
import { HttpMenuClient } from "./http-client.js";
import { parseNordicMenuPrice } from "./nordic-menu-price.js";
import { extractSchonnemannHtmlCategory, mergeSchonnemannCategories, type SchonnemannItem } from "./nordic-schonnemann-preview.js";

type ReviewedRow = { name: string; priceField: string; sourceUrl: string; alternateSourceUrls?: string[]; publishEligible: boolean };
type ReviewedFile = { status: string; menus: { restaurantSlug: string; currency: string; items: ReviewedRow[] }[] };
type SourceMap = { status: string; validFrom: string; validThrough: string; sections: { sourceUrl: string; listedItems: number }[]; reviewedUniqueItems: number; listedItems: number };

async function main(): Promise<void> {
  const review = JSON.parse(readFileSync(new URL("../../../docs/nordic-pilot-reviewed-food-menus.json", import.meta.url), "utf8")) as ReviewedFile;
  const map = JSON.parse(readFileSync(new URL("../../../docs/nordic-schonnemann-source-map.json", import.meta.url), "utf8")) as SourceMap;
  const menu = review.menus.find((m) => m.restaurantSlug === "schonnemann-hauser-plads-kobenhavn");
  const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Europe/Copenhagen", year: "numeric", month: "2-digit", day: "2-digit" }).format(new Date());
  if (review.status !== "review-only-not-runtime" || map.status !== "reviewed-categories-not-runtime" ||
    !menu || menu.currency !== "DKK" || menu.items.some((item) => item.publishEligible !== false) ||
    today < map.validFrom || today > map.validThrough) throw new Error("Schønnemann reviewed seasonal scope not valid");
  if (map.sections.length !== 13 || menu.items.length !== map.reviewedUniqueItems ||
    new Set(map.sections.map((section) => section.sourceUrl)).size !== map.sections.length) {
    throw new Error("Invalid category source map");
  }
  const client = new HttpMenuClient();
  const categories: SchonnemannItem[][] = [];
  const evidence: { sourceUrl: string; observedAt: string; rawSha256: string; items: number }[] = [];
  for (const section of map.sections) {
    const url = section.sourceUrl;
    if (!/^https:\/\/www\.restaurantschonnemann\.dk\/menukort\/[a-z-]+\/$/u.test(url)) throw new Error("Unreviewed source URL");
    const names = menu.items.filter((row) => row.sourceUrl === url || row.alternateSourceUrls?.includes(url)).map((row) => row.name);
    if (names.length !== section.listedItems) throw new Error("Category count mismatch: " + url);
    const fetched = await client.fetchSource({ url, userAgent: "FysenMenuBot/0.1", etag: null, lastModified: null });
    if (fetched.kind !== "content") throw new Error("Expected complete source content");
    const items = extractSchonnemannHtmlCategory(fetched.body, names, url);
    categories.push(items);
    evidence.push({ sourceUrl: url, observedAt: fetched.fetchedAt, rawSha256: fetched.rawSha256, items: items.length });
  }
  const items = mergeSchonnemannCategories(categories);
  if (categories.flat().length !== map.listedItems || items.length !== map.reviewedUniqueItems) throw new Error("Whole-menu count mismatch");
  const priceChanges = items.flatMap((item) => {
    const previous = menu.items.find((row) => row.name === item.name);
    const price = previous && parseNordicMenuPrice(previous.priceField, "DKK");
    return price && (price.priceMinor !== item.priceMinor || price.priceMaxMinor !== item.priceMaxMinor)
      ? [{ name: item.name, previous: price, observed: item }] : [];
  });
  console.log(JSON.stringify({ status: "review-required", city: "København", publication: "none",
    validFrom: map.validFrom, validThrough: map.validThrough, evidence, items, priceChanges }, null, 2));
}
void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
