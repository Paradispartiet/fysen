import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { hasCompleteStrongTitlePriceLineCoverage, recoverStrongTitlePriceHtmlItems } from "./html-strong-title-price-recovery.js";
import { extractMenuSource } from "./menu-source-runtime.js";

const html = readFileSync(new URL("./fixtures/engebret-julemeny-2026.html", import.meta.url), "utf8");
const expected = [
  ["Rakørret fra Valdres. Moden rakfisk med lefse, rødbeter, rødløk, rømme", 37500],
  ["Villaks røkt på gammelmåten, serveres med potetblini, rømme og ørretrogn", 29500],
  ["Fenalår fra Nordnorsk villsau med syltede beter, rømme", 29500],
  ["Kalix Løyrom (30g) med rødløk, rømme og blini", 45500],
  ["Lutefisk fra Lofoten - Lutefisken serveres så mange ganger det er ønskelig", 87500],
  ["Juletallerken - serveres 2 ganger", 79500],
  ["Pinnekjøtt fra Østerdalen - serveres 2 ganger", 87500],
  ["Smalahove fra Voss- serveres 2 ganger", 87500],
  ["Rakørret fra Valdres - serveres 2 ganger", 79500],
  ["Stekt breiflabb med gulrotpuré, sølvløk, blomkål, honningglasert gulrot og smørsaus", 56500],
  ["Grillet reinsdyr med selleripuré, bakte rotgrønnsaker, syltet rødkål, kremet viltsaus og tyttebær", 56500],
  ["Multekrem med kransekake", 28500],
  ["Riskrem med rød saus", 24000],
  ["Engebrets karamellpudding", 24000],
  ["Krydderkokte plommer med sorbet", 24000],
];

describe("multiple emphasized offers within one paragraph", () => {
  it("recovers the fifteen source offers with local prices and serving qualifiers", () => {
    const items = recoverStrongTitlePriceHtmlItems(html);
    expect(items.map(item => [item.name, item.priceMinor])).toEqual(expected);
    expect(items.find(item => item.name.startsWith("Lutefisk fra Lofoten"))?.description).toContain("serveres så mange ganger det er ønskelig");
    for (const name of ["Juletallerken - serveres 2 ganger", "Pinnekjøtt fra Østerdalen", "Smalahove fra Voss", "Rakørret fra Valdres - serveres 2 ganger"]) {
      expect(items.find(item => item.name.startsWith(name))?.description).toContain("serveres 2 ganger");
    }
    expect(items.some(item => /allergener|Gulløyepoteter|vegetarrett|\bM, E\b/i.test(item.name))).toBe(false);
  });

  it("proves coverage across all food prices and recognizes the separately headed course bundle", () => {
    expect(hasCompleteStrongTitlePriceLineCoverage(html)).toBe(true);
  });

  it("preserves complete recovery with the source's contact overlays and opening times", async () => {
    const page = `<div class="contact-wrapper"><p>Våre åpningstider<br><strong>Mandag til fredag:</strong>11:30-23:00<br>(kjøkkenet åpent til 21:30)<br><strong>Lørdag:</strong>17:00-23:00<br>(kjøkkenet åpent til 21:30)</p>
      <p><strong>Engebret Café</strong><br>Bankplassen 1 0151 Oslo<br>Telefon 22822525<br><a href="mailto:post@engebret-cafe.no">post@engebret-cafe.no</a></p></div>
      <div class="address-phone-email"><p>123 Street Avenue, City Town, 99999</p><p>(123) 555-6789</p><p>email@address.com</p></div>
      <main><div class="sqs-html-content">${html}</div></main>
      <footer><p>Lunsj mandag til fredag 11:30 - 14:30</p><p>I november og desember 2026, ingen onlinebooking, kun mailforespørsler for reservasjoner</p></footer>`;
    expect(hasCompleteStrongTitlePriceLineCoverage(page)).toBe(true);
    expect(recoverStrongTitlePriceHtmlItems(page).map(item => [item.name, item.priceMinor])).toEqual(expected);
    expect((await extractMenuSource("html", { body: page } as never)).items.map(item => [item.name, item.priceMinor])).toEqual(expected);
    expect(hasCompleteStrongTitlePriceLineCoverage(page + "<p>Grilled salmon 450</p>")).toBe(false);
    expect(hasCompleteStrongTitlePriceLineCoverage(page.replace("Bankplassen 1 0151 Oslo", "Grilled salmon 450"))).toBe(false);
  });

  it("does not certify unbound, alternative, or extra visible prices", () => {
    for (const extra of [
      "<h2>Hovedretter</h2><p>Extra fish kr 450.-</p>",
      "<h2>Hovedretter</h2><p><strong><em>Extra fish kr 450.- og kr 550.-</em></strong></p>",
      "<div>Extra fish kr 450.-</div>",
      "<div>450</div>",
      "<p>Grilled salmon 450</p>",
      "<h2>Grilled salmon 450</h2>",
      "<h2>Grilled salmon450</h2>",
      "<h2>Hovedretter</h2><p><strong><em>Extra fish kr 450.-<br>Extra fish kr 550.-</em></strong></p>",
      "<h2>Hovedretter</h2><p><strong><em>Grilled salmon 450<br>Fish soup kr 120.-</em></strong></p>",
      "<div>Extra fish EUR 45</div>",
      "<h2>Hovedretter</h2><p><strong><em>Extra fish 450 / 550 kr</em></strong></p>",
      "<h2>Hovedretter</h2><p>450,-</p>",
      "<h2>Hovedretter</h2><p>450</p>",
      "<h2>Hovedretter</h2><p><strong><em>Extra fish EUR 45</em></strong></p>",
    ]) expect(hasCompleteStrongTitlePriceLineCoverage(html + extra), extra).toBe(false);
    expect(hasCompleteStrongTitlePriceLineCoverage(html.replace("<strong>Engebrets 3 retters julemeny kr 1.345.-</strong>", "<strong>Chef special kr 1.345.-</strong>"))).toBe(false);
  });

  it("uses the complete semantic recovery in the runtime", async () => {
    const result = await extractMenuSource("html", { body: html } as never);
    expect(result.items.map(item => [item.name, item.priceMinor])).toEqual(expected);
  });

  it("fails closed for conflicting prices under the same semantic source key", () => {
    const conflicting = html + "<h2>Hovedretter</h2><p><strong><em>Extra fish kr 450.-<br>Extra fish kr 550.-</em></strong></p>";
    expect(hasCompleteStrongTitlePriceLineCoverage(conflicting)).toBe(false);
    const exactDuplicate = html + "<h2>Desserter</h2><p><strong><em>Riskrem med rød saus M kr 240.-</em></strong></p>";
    expect(hasCompleteStrongTitlePriceLineCoverage(exactDuplicate)).toBe(true);
    expect(recoverStrongTitlePriceHtmlItems(exactDuplicate)).toHaveLength(15);
  });
});
