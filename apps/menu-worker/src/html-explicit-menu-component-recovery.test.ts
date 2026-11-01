import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { recoverCompleteExplicitMenuComponentHtmlItems as recover } from "./html-semantic-menu-card-recovery.js";
const card = (name = "Roasted cod", price = "325", description = "With potatoes") => `<div class="menu-item"><h3 class="menu-item__name">${name}</h3><p class="menu-item__description">${description}</p><p class="menu-item__price">${price}</p></div>`;
const captured = readFileSync(new URL("./fixtures/lorry-julemeny-2026-11-01.html", import.meta.url), "utf8");
const pairs = (html: string) => recover(html).map(i => [i.name, i.priceMinor]);
describe("complete explicit menu component recovery", () => {
  it("recovers the nine current source offers and retains ingredient, allergen and serving evidence", () => {
    const items = recover(captured);
    expect(items.map(i => [i.name, i.priceMinor])).toEqual([
      ["Lutefisk",87500],["Pinnekjøtt",87500],["Juletallerken",74500],["Rakørret",69500],["Smalahove",73500],
      ["Vegetarisk Juletallerken",43500],["Multekrem",27500],["Riskrem med bringebærsaus",23900],["Vaniljeis med bjørnebær og eggelikør",23900],
    ]);
    for (const name of ["Lutefisk", "Pinnekjøtt"]) {
      expect(items.find(i => i.name === name)?.description).toContain("2 serveringer");
      expect(items.find(i => i.name === name)?.sourceExcerpt).toContain("2 serveringer");
    }
    expect(items.find(i => i.name === "Juletallerken")?.description).toContain("Ribbe, medisterkake");
    expect(items.find(i => i.name === "Lutefisk")?.description).toContain("(F,M,S)");
    expect(new Set(items.map(i => i.sourceKey)).size).toBe(9);
  });
  it("works on unrelated hosts, names and optional descriptions", () => {
    expect(pairs(card("Baked aubergine", "NOK 295", "") + card("Pear tart", "155,-"))).toEqual([["Baked aubergine",29500],["Pear tart",15500]]);
  });
  it.each(["325 / 425", "325 per kg", "from 325", "325 EUR", "325 425", "325 per person", "25"])("rejects ambiguous or unsupported price %s without partial coverage", price => {
    expect(recover(card() + card("Other food", price))).toEqual([]);
  });
  it("rejects conflicting duplicate names but collapses equivalent repeated components", () => {
    expect(recover(card() + card("Roasted cod", "425"))).toEqual([]);
    expect(pairs(card() + card())).toEqual([["Roasted cod",32500]]);
  });
  it.each([
    '<p>Extra soup 145</p>', '<p>Soup 145.-</p>', '<p>Lobster 1.450,-</p>', '<p>Lobster 1.450.-</p>', '<p>Lobster 1450,-</p>', '<p>Lobster 1 450,-</p>', '<p>Lobster 1,450.00</p>', '<p>Lobster 145,50</p>', '<p>Lobster 1 450,50</p>', '<p>Soup 145.</p>', '<p>Soup145.-</p>', '<p>Soup145.</p>', '<address><p>Soup 145</p>Parkveien 12, 0350 Oslo</address>', '<address>Soup 145<br>Parkveien 12, 0350 Oslo</address>', '<b>Extra soup</b>145', '<p>Extra soup kr 145</p>', '<h3>Soup</h3><p>145</p>',
    '<p>145 EUR</p>', '<p>Extra soup SEK 20</p>', '<p>Extra soup DKK 20</p>', '<p>Extra soup 20€</p>', '<p>Extra soup 20£</p>', '<p>Extra soup 20$</p>', '<h3>Soup 145</h3>', '<h3>145</h3>', '<div class="menu-item"><h3>Soup</h3><p>145</p></div>',
    '<footer><p>Soup 145</p></footer>', '<footer><a href="tel:+4722696904">Soup 145</a></footer>', '<div class="footer__address">Soup 145</div>',
  ])("refuses complete coverage with visible unbound food price %s", extra => {
    expect(recover(card() + extra)).toEqual([]);
    expect(recover(card("Roasted cod", "325", "With potatoes" + extra))).toEqual([]);
  });
  it("rejects extra independently priced descendants and duplicate title or price slots", () => {
    expect(recover(card().replace('</div>', '<p>Soup 145</p></div>'))).toEqual([]);
    expect(recover(card().replace('</div>', '<p class="menu-item__price">425</p></div>'))).toEqual([]);
    expect(recover(card().replace('</div>', '<h3 class="menu-item__name">Soup</h3></div>'))).toEqual([]);
    expect(recover(card().replace('</div>', card("Soup", "145") + '</div>'))).toEqual([]);
  });
  it("ignores invisible and navigation components, while retaining visible food", () => {
    const extra = card("Hidden soup", "145");
    for (const wrapper of [`<div hidden>${extra}</div>`, `<div aria-hidden="true">${extra}</div>`, `<div style="display:none">${extra}</div>`, `<div style="visibility:hidden">${extra}</div>`, `<nav>${extra}</nav>`, `<div role="navigation">${extra}</div>`]) {
      expect(pairs(card() + wrapper)).toEqual([["Roasted cod",32500]]);
    }
  });
  it("ignores contact metadata by semantics, without suppressing food in a footer", () => {
    expect(pairs(card() + '<footer><address>Parkveien 12, 0350 Oslo</address><a href="tel:+4722696904">+47 22 69 69 04</a><time>11.00-01.00</time></footer>')).toEqual([["Roasted cod",32500]]);
    expect(recover(card() + '<footer><p>Soup 145 kr</p></footer>')).toEqual([]);
  });
});
