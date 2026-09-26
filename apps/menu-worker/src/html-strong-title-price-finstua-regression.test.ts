import { describe, expect, it } from "vitest";
import { recoverStrongTitlePriceHtmlItems } from "./html-strong-title-price-recovery.js";

describe("Finstua strong-title price recovery", () => {
  it("recovers dishes when section labels or allergen codes occupy the strong slot", () => {
    const html = `
      <html><body>
        <h2>Restaurant Finstua Lunsjmeny</h2>
        <p><strong>Lunsjretter</strong> Kremet fiskesuppe med reker, fisk og friske grønnsaker (SK, F, M, S)</p>
        <p>Kr. 335,-</p>
        <p><strong>Ceasarsalat med kylling fra Hovelsrud, sprø bacon, parmesan og krutonger (F, E, S, SP, G1)</strong></p>
        <p>Kr. 315,-</p>
        <p>Sommersalat med valnøtter, kokt egg, cherrytomat og sennepsvinaigrette</p>
        <p><strong>(M, G1, G2, S)</strong></p>
        <p>Kr. 315,-</p>
        <p><strong>Sandwiches</strong> Toast Skagen servert på landbrød med ørretrogn, sitron og pepperrot (SK, M, G1, E, SP)</p>
        <p>Kr. 325,-</p>
        <h2>Restaurant Finstua middagsmeny</h2>
        <p><strong>Löjrom fra Kalix</strong></p>
        <p>serveres med toast, rømme, rødløk, dill og sitron</p>
        <p>Kr. 275,-</p>
        <p><strong>Grillet Reinsdyr fra Røros</strong></p>
        <p>serveres med kremet viltsaus, solbærpure og hasselbackpotet</p>
        <p>Kr. 585,-</p>
      </body></html>
    `;

    const items = recoverStrongTitlePriceHtmlItems(html);

    expect(items.map((item) => item.name)).toEqual([
      "Kremet fiskesuppe med reker, fisk og friske grønnsaker",
      "Ceasarsalat med kylling fra Hovelsrud, sprø bacon, parmesan og krutonger",
      "Sommersalat med valnøtter, kokt egg, cherrytomat og sennepsvinaigrette",
      "Toast Skagen servert på landbrød med ørretrogn, sitron og pepperrot",
      "Löjrom fra Kalix",
      "Grillet Reinsdyr fra Røros",
    ]);
    expect(items.map((item) => item.priceMinor)).toEqual([
      33500,
      31500,
      31500,
      32500,
      27500,
      58500,
    ]);
    expect(items.some((item) => /^(?:Lunsjretter|Sandwiches)$/u.test(item.name))).toBe(false);
    expect(items.some((item) => /^\([^)]*\)$/u.test(item.name))).toBe(false);
  });
});
