import { describe, expect, it } from "vitest";
import { extractPdfMenu } from "./pdf-extractor.js";
import { extractScopedPdfMenu } from "./pdf-source-extractor.js";

const OLIVIA_MENU_URL =
  "https://oliviarestauranter.no/wp-content/uploads/2020/10/Felles-NO-mat-web-sommer26.pdf";

describe("TEMP Olivia Manzo tonnato live diagnostic", () => {
  it(
    "prints the exact stage where Manzo tonnato disappears",
    async () => {
      const response = await fetch(OLIVIA_MENU_URL);
      expect(response.ok).toBe(true);
      const bytes = new Uint8Array(await response.arrayBuffer());

      const base = await extractPdfMenu(bytes);
      const scoped = await extractScopedPdfMenu(bytes);
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

      const payload = {
        baseCount: base.items.length,
        scopedCount: scoped.items.length,
        signalLines,
        baseManzo: base.items
          .filter((item) => /manzo|tonnato/iu.test(item.name))
          .map(summarize),
        scopedManzo: scoped.items
          .filter((item) => /manzo|tonnato/iu.test(item.name))
          .map(summarize),
        baseAntipastiWindow: base.items.slice(0, 12).map(summarize),
        scopedAntipastiWindow: scoped.items.slice(0, 12).map(summarize),
      };

      console.error(`OLIVIA_MANZO_DIAG ${JSON.stringify(payload, null, 2)}`);

      expect(base.items.length).toBeGreaterThan(0);
      expect(scoped.items.length).toBeGreaterThan(0);
      throw new Error("TEMP DIAGNOSTIC ONLY — do not merge this head");
    },
    30_000,
  );
});
