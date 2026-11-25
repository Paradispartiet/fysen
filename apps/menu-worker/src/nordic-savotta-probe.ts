import { readFileSync } from "node:fs";
import { HttpMenuClient } from "./http-client.js";
import { extractSavottaHtmlPreview } from "./nordic-savotta-preview.js";
import { parseNordicMenuPrice } from "./nordic-menu-price.js";

type ReviewedFile = { status: string; menus: { restaurantSlug: string; source: string; currency: string; items: { name: string; priceField: string; publishEligible: boolean }[] }[] };

async function main(): Promise<void> {
  const review = JSON.parse(readFileSync(new URL("../../../docs/nordic-pilot-reviewed-food-menus.json", import.meta.url), "utf8")) as ReviewedFile;
  const menu = review.menus.find((m) => m.restaurantSlug === "savotta-aleksanterinkatu-helsinki");
  if (review.status !== "review-only-not-runtime" || !menu || menu.currency !== "EUR" ||
    menu.source !== "https://ravintolasavotta.fi/menu/" || menu.items.some((item) => item.publishEligible !== false)) {
    throw new Error("Invalid research-only Savotta source");
  }
  const fetched = await new HttpMenuClient().fetchSource({
    url: menu.source, userAgent: "FysenMenuBot/0.1", etag: null, lastModified: null,
  });
  if (fetched.kind !== "content") throw new Error("Expected complete source content");
  const preview = extractSavottaHtmlPreview(fetched.body, menu.items.map((item) => item.name));
  const priceChanges = preview.items.flatMap((item) => {
    const previous = menu.items.find((row) => row.name === item.name);
    const price = previous && parseNordicMenuPrice(previous.priceField, "EUR");
    return price && (price.priceMinor !== item.priceMinor || price.priceMaxMinor !== item.priceMaxMinor)
      ? [{ name: item.name, previous: price, observed: item }] : [];
  });
  console.log(JSON.stringify({ ...preview, sourceUrl: menu.source, observedAt: fetched.fetchedAt,
    rawSha256: fetched.rawSha256, priceChanges, publication: "none" }, null, 2));
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
