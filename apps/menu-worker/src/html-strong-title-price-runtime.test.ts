import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";

describe("strong-title runtime preference", () => {
  it("prefers semantic strong title-price pairs over flattened section labels", async () => {
    const extracted = await extractMenuSource("html", {
      body: `
        <h4><strong>SPECIAL RAW</strong></h4>
        <p><strong>Salmon tartare</strong> cucumber</p><p>220,-</p><p>—</p>
        <p><strong>Tuna tataki</strong> chilli</p><p>240,-</p><p>—</p>
        <h4><strong>SMALL PLATES</strong></h4>
        <p><strong>Sharing skewers</strong></p>
        <p><strong>Chicken skewer</strong> curry</p><p>210,-</p><p>—</p>
        <p><strong>Prawn tempura</strong> lime</p><p>230,-</p>
        <p><strong>Padron skewer</strong> sesame</p><p>190,-</p>
        <h4><strong>MAINS</strong></h4>
        <p><strong>Crispy oyster</strong> <strong>mushrooms</strong></p><p>for two with pancakes</p><p>720,-</p>
      `,
    });
    expect(extracted.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Salmon tartare", 22000], ["Tuna tataki", 24000], ["Chicken skewer", 21000],
      ["Prawn tempura", 23000], ["Padron skewer", 19000], ["Crispy oyster mushrooms", 72000],
    ]);
    expect(extracted.items.some((item) => /^(?:SPECIAL RAW|SMALL PLATES|MAINS|Sharing skewers)$/u.test(item.name))).toBe(false);
    expect(extracted.extractorVersion).toContain("strong-title-price-v1");
  });
});
