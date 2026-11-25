import { parseSearch, runArchiveSearch } from "./worker.mjs";

// Deploy only behind an authenticated route. The template exposes no URL.
async function authorized(request, secret) {
  const supplied = request.headers.get("authorization");
  if (typeof secret !== "string" || secret.length < 32 || !supplied) return false;
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode("Bearer " + secret));
  return crypto.subtle.verify("HMAC", key, signature, encoder.encode(supplied));
}

const TERMS = ["pizza", "ramen", "kylling", "zzzfyseningenmatch"];

export default {
  async fetch(request, env) {
    if (request.method !== "POST" || new URL(request.url).pathname !== "/measure"
        || env.ENABLE_D1_MEASUREMENT !== "true") {
      return new Response(null, { status: 404 });
    }
    const headers = { "cache-control": "no-store" };
    try {
      if (!await authorized(request, env.MEASUREMENT_TOKEN)) {
        return new Response(null, { status: 404, headers });
      }
      const measurements = [];
      for (const term of TERMS) {
        const parsed = parseSearch(new URLSearchParams({ q: term, city: "Oslo" }));
        const { results, meta } = await runArchiveSearch(env.PREVIEW_DB, parsed, { sample: true });
        if (!Number.isSafeInteger(meta?.rows_read) || meta.rows_read < 0
            || !Number.isSafeInteger(meta?.rows_written) || meta.rows_written !== 0
            || !Array.isArray(results)) {
          return Response.json({ error: "Unverified D1 metadata" }, { status: 503, headers });
        }
        measurements.push({ term, matches: results.length, rowsRead: meta.rows_read, rowsWritten: meta.rows_written });
      }
      return Response.json({ measurements }, { headers });
    } catch {
      return Response.json({ error: "Preview measurement failed" }, { status: 503, headers });
    }
  },
};
