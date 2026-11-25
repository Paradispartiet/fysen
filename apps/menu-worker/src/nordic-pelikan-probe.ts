import { readFileSync } from "node:fs";
import { load } from "cheerio";
import { HttpMenuClient } from "./http-client.js";
import { extractPelikanPdfPreview, type PelikanReviewRow } from "./nordic-pelikan-preview.js";
import { parseNordicMenuPrice } from "./nordic-menu-price.js";

type ReviewedFile = { status: string; menus: { restaurantSlug: string; source: string; currency: string; items: (PelikanReviewRow & { priceField: string; publishEligible: boolean })[] }[] };

async function main(): Promise<void> {
  const review = JSON.parse(readFileSync(new URL("../../../docs/nordic-pilot-reviewed-food-menus.json", import.meta.url), "utf8")) as ReviewedFile;
  const menu = review.menus.find((m) => m.restaurantSlug === "pelikan-blekingegatan-stockholm");
  if (review.status !== "review-only-not-runtime" || !menu || menu.currency !== "SEK" ||
    menu.items.length !== 33 || menu.items.some((r) => r.publishEligible !== false)) throw new Error("Invalid Pelikan research scope");
  const client = new HttpMenuClient();
  const menuPage = "https://pelikan.se/meny";
  const page = await client.fetchSource({ url: menuPage, userAgent: "FysenMenuBot/0.1", etag: null, lastModified: null });
  if (page.kind !== "content") throw new Error("Expected Pelikan menu page");
  const $ = load(page.body);
  const links = $("a[href]").toArray().filter((a) => $(a).text().trim().toLowerCase() === "meny")
    .map((a) => new URL($(a).attr("href") ?? "",menuPage).href)
    .filter((url) => new URL(url).pathname.toLowerCase().endsWith(".pdf"));
  if (links.length !== 1 || links[0] !== menu.source) throw new Error("Pelikan first-party PDF link changed; review required");
  if (new URL(menu.source).origin !== "https://static.thatsup.website") throw new Error("Unreviewed PDF host");
  const pdf = await client.fetchSource({url:menu.source,userAgent:"FysenMenuBot/0.1",etag:null,lastModified:null},{maxResponseBytes:8*1024*1024});
  if (pdf.kind !== "content") throw new Error("Expected complete Pelikan PDF");
  const items = await extractPelikanPdfPreview(pdf.bodyBytes,menu.items);
  const priceChanges = items.flatMap((item) => {
    const old = menu.items.find((r) => r.name === item.name);
    const previous = old && parseNordicMenuPrice(old.priceField,"SEK");
    return previous && (previous.priceMinor !== item.priceMinor || previous.priceMaxMinor !== item.priceMaxMinor)
      ? [{name:item.name,previous,observed:item}] : [];
  });
  console.log(JSON.stringify({status:"review-required",city:"Stockholm",publication:"none",
    sourceUrl:menu.source, observedAt:pdf.fetchedAt, rawSha256:pdf.rawSha256,
    menuPage, menuPageSha256:page.rawSha256, items, priceChanges},null,2));
}
void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
