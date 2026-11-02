import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const expected = { query: "Valentes Spesial", city: "Oslo", slug: "valentes-vika-oslo", name: "Valentes Spesial", priceMinor: 39800 };
export function checkResponse(data) {
  if (data?.query !== expected.query || data?.city !== expected.city ||
      !Array.isArray(data.results) || data.count !== data.results.length ||
      data.count < 1 || data.count > 12) throw new Error("Public search response shape/count failed");
  const row = data.results.find(r => r?.restaurant?.slug === expected.slug &&
    r?.dish?.name === expected.name && r?.dish?.priceMinor === expected.priceMinor);
  if (!row) throw new Error("Expected named restaurant / dish / exact price not found");
  if (row.dish.currency !== "NOK" || !["exact", "canonical"].includes(row.match?.type) ||
      !["exact", "from", "multiple"].includes(row.dish.priceKind) ||
      row.restaurant.city !== "Oslo" || !/^https:\/\//.test(row.menu?.sourceUrl ?? "") ||
      ["observedAt", "lastCheckedAt", "freshUntil"].some(key =>
        Number.isNaN(Date.parse(row.menu?.[key] ?? "")))) {
    throw new Error("Public search source/price/freshness metadata invalid");
  }
  return { restaurant: row.restaurant.slug, dish: row.dish.name, priceMinor: row.dish.priceMinor,
    sourceUrl: row.menu.sourceUrl, observedAt: row.menu.observedAt, matchType: row.match.type,
    count: data.count };
}
export async function verifyPublicSearch(fetchImpl = fetch) {
  const urls = ["https://fysen-api.vercel.app/v1/dishes/search",
                "https://fysen.vercel.app/api/dishes/search"];
  const proofs = [];
  for (const [index, base] of urls.entries()) {
    const u = new URL(base);
    u.searchParams.set("q", expected.query);
    u.searchParams.set("city", expected.city);
    u.searchParams.set("limit", "12");
    u.searchParams.set("sort", "relevance");
    const response = await fetchImpl(u.toString(), { cache: "no-store",
      headers: { accept: "application/json", "user-agent": "FysenPublicSearchProof/1.0" },
      signal: AbortSignal.timeout(15000) });
    if (!response.ok) throw new Error("Public endpoint "+index+" returned HTTP "+response.status);
    proofs.push({ endpoint: index === 0 ? "api" : "web-search", url: u.toString(),
      ...checkResponse(await response.json()) });
  }
  if (proofs[0].sourceUrl !== proofs[1].sourceUrl) {
    throw new Error("Public API and web search disagree on menu provenance");
  }
  return { status: "verified", proofs };
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  try { process.stdout.write(JSON.stringify(await verifyPublicSearch(), null, 2)+"\n"); }
  catch (error) { console.error(error); process.exitCode = 1; }
}
