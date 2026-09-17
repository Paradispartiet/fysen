import { describe, expect, it } from "vitest";
import { canonicalizeUniqueMenuSourceKeys } from "./menu-source-key-canonicalizer.js";
import { extractPdfMenu } from "./pdf-extractor.js";
import { extractScopedPdfMenu } from "./pdf-source-extractor.js";
import { extractMenuSource, fetchMenuSource } from "./menu-source-runtime.js";

const OLIVIA_MENU_URL =
  "https://oliviarestauranter.no/wp-content/uploads/2020/10/Felles-NO-mat-web-sommer26.pdf";

describe("TEMP Olivia Manzo tonnato live diagnostic", () => {
  it(
    "prints the exact stage where Manzo tonnato disappears",
    async () => {
      const fetched = await fetchMenuSource({
        url: OLIVIA_MENU_URL,
        sourceType: "pdf",
        fetchMode: "http",
        userAgent: "FysenMenuBot/0.1",
        etag: null,
        lastModified: null,
        maxResponseBytes: null,
        sourceSupport: {
          redirectOrigins: [],
          browserDataOrigins: [],
        },
      });
      if (fetched.kind !== "content") {
        throw new Error("TEMP diagnostic unexpectedly received not_modified");
      }

      const sourceBytes = fetched.bodyBytes;
      const fetchSummary = {
        status: fetched.status,
        contentType: fetched.contentType,
        bytes: sourceBytes.byteLength,
        signature: Buffer.from(sourceBytes.subarray(0, 8)).toString("latin1"),
        rawSha256: fetched.rawSha256,
      };
      const base = await extractPdfMenu(sourceBytes.slice());
      const scoped = await extractScopedPdfMenu(sourceBytes.slice());
      const runtime = await extractMenuSource("pdf", {
        ...fetched,
        bodyBytes: sourceBytes.slice(),
      });
      const canonical = canonicalizeUniqueMenuSourceKeys(runtime.items);
      const visibleLines = base.visibleText.split("\n");
      const signalLines = visibleLines
        .map((line, index) => ({ index, line }))
        .filter(({ line }) => /manzo|tonnato|perfekt\s+å\s+dele|\b295\b/iu.test(line));

      const summarize = (item: (typeof base.items)[number]) => ({
        name: item.name,
        priceMinor: item.priceMinor,
        sectionName: item.sectionName,
        position: item.position,
        sourceExcerpt: item.sourceExcerpt,
      });
      const isManzo = (name: string) => /manzo|tonnato/iu.test(name);

      const payload = {
        fetch: fetchSummary,
        baseCount: base.items.length,
        scopedCount: scoped.items.length,
        runtimeCount: runtime.items.length,
        canonicalCount: canonical.length,
        extractorVersion: runtime.extractorVersion,
        signalLines,
        baseManzo: base.items.filter((item) => isManzo(item.name)).map(summarize),
        scopedManzo: scoped.items.filter((item) => isManzo(item.name)).map(summarize),
        runtimeManzo: runtime.items.filter((item) => isManzo(item.name)).map(summarize),
        canonicalManzo: canonical.filter((item) => isManzo(item.name)).map(summarize),
        baseAntipastiWindow: base.items.slice(0, 12).map(summarize),
        scopedAntipastiWindow: scoped.items.slice(0, 12).map(summarize),
        canonicalAntipastiWindow: canonical.slice(0, 12).map(summarize),
      };

      console.error(`OLIVIA_MANZO_DIAG ${JSON.stringify(payload, null, 2)}`);

      expect(base.items.length).toBeGreaterThan(0);
      expect(scoped.items.length).toBeGreaterThan(0);
      expect(runtime.items.length).toBeGreaterThan(0);
      throw new Error("TEMP DIAGNOSTIC ONLY — do not merge this head");
    },
    60_000,
  );
});
