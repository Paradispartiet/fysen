import { describe, expect, it } from "vitest";
import { extractMenuSource } from "./menu-source-runtime.js";

describe("published tabbed menu cards", () => {
  it("binds titles to prices across tabs and excludes translations, allergens and package labels", async () => {
    const html = `
      <html><body>
        <div role="tablist">
          <label role="tab">SNACKS</label><label role="tab">LUNSJ</label>
          <label role="tab">A LA CARTE</label><label role="tab">BARNEMENY</label>
          <label role="tab">DRIKKE</label>
        </div>
        <div role="tabpanel" aria-label="SNACKS" style="display:block">
          <div class="menu-section"><div class="menu-section-title">SNACKS</div>
            <div class="menu-items">
              <div class="menu-item"><div class="menu-item-title">Blomkål-arancinis</div>
                <div class="menu-item-options"><div class="menu-item-option">Allergener: hvete, melk</div></div></div>
              <div class="menu-item"><div class="menu-item-title"></div>
                <div class="menu-item-description">Cauliflower arancinis</div>
                <div class="menu-item-options"><div class="menu-item-option">Allergenes: wheat, milk</div></div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 169,-</div></div>
              <div class="menu-item"><div class="menu-item-title">Fisketaco</div></div>
              <div class="menu-item"><div class="menu-item-description">Fish taco</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 195,-</div></div>
            </div>
          </div>
        </div>
        <div role="tabpanel" aria-label="LUNSJ" style="display:none">
          <div class="menu-section"><div class="menu-section-title">LUNSJ</div>
            <div class="menu-items">
              <div class="menu-item"><div class="menu-item-title">DAGENS LUNSJPAKKE</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 495,-</div></div>
              <div class="menu-item"><div class="menu-item-title">Snacks- og dessertmenyen er tilgjengelig hele dagen.</div>
                <div class="menu-item-description">The snacks and dessert menu is available all day.</div></div>
              <div class="menu-item"><div class="menu-item-title">Stor tartar av storfe 120 g.</div></div>
              <div class="menu-item"><div class="menu-item-description">Large beef tartare 120 g.</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 365,-</div></div>
              <div class="menu-item"><div class="menu-item-title">Parmaskinke</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 269,-</div></div>
            </div>
          </div>
        </div>
        <div role="tabpanel" aria-label="A LA CARTE" style="display:none">
          <div class="menu-section"><div class="menu-section-title">HOVEDRETTER</div>
            <div class="menu-items">
              <div class="menu-item"><div class="menu-item-title">Torsk</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 435,-</div></div>
              <div class="menu-item"><div class="menu-item-title">Kveite</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 485,-</div></div>
              <div class="menu-item"><div class="menu-item-title">Dagens hovedrett</div></div>
              <div class="menu-item"><div class="menu-item-title">419,-</div></div>
            </div>
          </div>
        </div>
        <div role="tabpanel" aria-label="BARNEMENY" style="display:none">
          <div class="menu-section"><div class="menu-section-title">BARNEMENY</div>
            <div class="menu-items">
              <div class="menu-item"><div class="menu-item-title">Pølser og pommes frites</div>
                <div class="menu-item-options"><div class="menu-item-option">119,-</div></div></div>
            </div>
          </div>
        </div>
        <div role="tabpanel" aria-label="DRIKKE" style="display:none">
          <div class="menu-section"><div class="menu-section-title">DRIKKE</div>
            <div class="menu-items">
              <div class="menu-item"><div class="menu-item-title">Husets limonade</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 89,-</div></div>
              <div class="menu-item"><div class="menu-item-title">Eplemost</div></div>
              <div class="menu-item"><div class="menu-item-title">Kr 79,-</div></div>
            </div>
          </div>
        </div>
      </body></html>
    `;
    const result = await extractMenuSource("html", {
      kind: "content",
      fetchedAt: "2026-09-29T00:00:00.000Z",
      status: 200,
      contentType: "text/html; charset=utf-8",
      body: html,
      bodyBytes: new TextEncoder().encode(html),
      rawSha256: "tabbed-menu-fixture",
      etag: null,
      lastModified: null,
      durationMs: 1,
      robotsAllowed: true,
    });

    expect(result.items.map((item) => [item.name, item.priceMinor])).toEqual([
      ["Blomkål-arancinis", 16900],
      ["Fisketaco", 19500],
      ["Stor tartar av storfe 120 g.", 36500],
      ["Parmaskinke", 26900],
      ["Torsk", 43500],
      ["Kveite", 48500],
      ["Pølser og pommes frites", 11900],
    ]);
  });
});
