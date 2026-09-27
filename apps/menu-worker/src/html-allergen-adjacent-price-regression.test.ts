import { describe, expect, it } from "vitest";
import { extractScopedHtmlMenu } from "./html-source-extractor.js";

describe("allergen-adjacent standalone price regression", () => {
  it("keeps the dish title and never promotes allergen codes or food sections to dishes", () => {
    const fishSoup =
      "Kremet fiskesuppe med reker, fisk og friske grønnsaker";
    const caesar =
      "Ceasarsalat med kyllingbryst, sprø bacon, parmesan og krutonger";
    const skagen =
      "Toast Skagen, kremet dill med håndpillede reker, ørretrogn, sitron og pepperrot";
    const reindeer = "Grillet Reinsdyr fra Røros";
    const html = `
      <html><body>
        <h2>Lunsjretter</h2>
        <p>${fishSoup}</p>
        <p>(SK, F, M, S)</p>
        <p>Kr. 335,-</p>
        <p>${caesar}</p>
        <p>(F, E, S, SP, G1)</p>
        <p>Kr. 315,-</p>
        <h2>Sandwiches</h2>
        <p>${skagen}</p>
        <p>(SK, M, F, SP, G1)</p>
        <p>Kr. 325,-</p>
        <h2>Kjøtt</h2>
        <p>${reindeer}</p>
        <p>med sellerikrem, jordskokk, kantareller, pærer og solbær</p>
        <p>Inneholder: M, S, SL</p>
        <p>Kr. 585,-</p>
      </body></html>
    `;

    const result = extractScopedHtmlMenu(html);

    expect(result.items.map((item) => item.name)).toEqual([
      fishSoup,
      caesar,
      skagen,
      reindeer,
    ]);
    expect(result.items.map((item) => item.priceMinor)).toEqual([
      33500,
      31500,
      32500,
      58500,
    ]);
    expect(
      result.items.some(
        (item) =>
          /^\(/u.test(item.name) ||
          /^(?:Lunsjretter|Sandwiches|Kjøtt)$/iu.test(item.name),
      ),
    ).toBe(false);
  });
});
