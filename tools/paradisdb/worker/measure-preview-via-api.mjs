import { parseSearch, runArchiveSearch } from "./worker.mjs";

const account = process.env.CLOUDFLARE_ACCOUNT_ID;
const token = process.env.CLOUDFLARE_API_TOKEN;
const preview = "8b6616b4-11df-4ddc-9817-378f51ee0b69";

if (!/^[a-f0-9]{32}$/i.test(account ?? "") || !token) {
  console.error("Set CLOUDFLARE_ACCOUNT_ID and a scoped D1 Read CLOUDFLARE_API_TOKEN.");
  process.exitCode = 1;
} else {
  const endpoint = `https://api.cloudflare.com/client/v4/accounts/${account}/d1/database/${preview}/query`;
  const database = {
    prepare(sql) {
      return {
        bind(...params) {
          return {
            async all() {
              const response = await fetch(endpoint, {
                method: "POST",
                redirect: "error",
                signal: AbortSignal.timeout(15000),
                headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
                body: JSON.stringify({ sql, params }),
              });
              if (!response.ok) throw new Error(`Cloudflare HTTP ${response.status}`);
              const payload = await response.json();
              const result = payload.result?.[0];
              if (!payload.success || !result?.success) throw new Error("D1 returned an unsuccessful query");
              return result;
            },
          };
        },
      };
    },
  };
  try {
    const measurements = [];
    for (const term of ["pizza", "ramen", "kylling", "zzzfyseningenmatch"]) {
      const search = parseSearch(new URLSearchParams({ q: term, city: "Oslo" }));
      const { results, meta } = await runArchiveSearch(database, search, { sample: true });
      if (!Array.isArray(results) || !Number.isSafeInteger(meta?.rows_read)
          || meta.rows_read < 0 || meta.rows_written !== 0) {
        throw new Error("D1 did not return verified read-only row metrics");
      }
      measurements.push({ term, matches: results.length, rowsRead: meta.rows_read, rowsWritten: meta.rows_written });
    }
    console.log(JSON.stringify({ database: "paradisdb-fysen-preview", measurements }, null, 2));
  } catch (error) {
    console.error("D1 measurement failed:", error.message);
    process.exitCode = 1;
  }
}
