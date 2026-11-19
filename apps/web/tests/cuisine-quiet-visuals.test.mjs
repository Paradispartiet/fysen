import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { countryFlagUrl } from "../components/country-flag-artwork-url.ts";

const source = (file) => readFile(new URL(file, import.meta.url), "utf8");

test("national flags use authentic small SVG artwork, not the OS emoji glyph", () => {
  for (const [flag, code] of [
    ["🇯🇵", "jp"],
    ["🇱🇧", "lb"],
    ["🇵🇸", "ps"],
    ["🇲🇲", "mm"],
    ["🇫🇴", "fo"],
    ["🇬🇱", "gl"],
  ]) {
    assert.equal(countryFlagUrl(flag), `https://flagcdn.com/${code}.svg`);
  }
  for (const invalid of ["", "US", "🏳️‍🌈", "🍕", "🇳🇴🇸🇪"]) {
    assert.equal(countryFlagUrl(invalid), null);
  }
});

test("the home, live and archive layouts render flags as genuine images only", async () => {
  const files = [
    ["../components/cuisine-explorer.tsx", 'className="cuisineAreaFlag"'],
    ["../components/dish-browse.tsx", 'className="dishBrowseCountryFlag"'],
    ["../components/verified-menu-archive-view.tsx", 'className={styles.atlasCountryFlag ?? ""}'],
  ];
  for (const [file, className] of files) {
    const jsx = await source(file);
    assert.ok(jsx.includes("<CuisineCountryFlag"), file);
    assert.ok(jsx.includes(className), file);
    assert.doesNotMatch(jsx, /<span[^>]*aria-hidden="true"[^>]*>\{area\.flag\}<\/span>/u, file);
  }
  const component = await source("../components/cuisine-country-flag.tsx");
  assert.ok(component.includes('alt=""'));
  assert.ok(component.includes('aria-hidden="true"'));
  assert.ok(component.includes('decoding="async"'));
});

test("kitchen tiles are small and quiet, while dish text remains readable", async () => {
  const css = await source("../styles/cuisine-explorer-v2-3.css");
  const quiet = css.slice(css.lastIndexOf("/*\n * Fysen quiet food atlas v2"));
  assert.ok(quiet.includes("min-height: 58px"));
  assert.ok(quiet.includes("width: 28px"));
  assert.ok(quiet.includes("height: 19px"));
  assert.ok(quiet.includes("height: 28px"));
  assert.ok(quiet.includes("background: transparent"));
  assert.ok(quiet.includes("border: 1px solid transparent"));
  assert.ok(quiet.includes("object-fit: contain"));
  assert.ok(quiet.includes("filter: saturate(.59) contrast(.94)"));
  assert.ok(quiet.includes("color: var(--color-ink)"));
  assert.ok(quiet.includes("@media (max-width: 767px)"));
});

test("all secondary views use modest non-zooming illustration sizes", async () => {
  for (const file of [
    "../styles/dish-browse.css",
    "../components/verified-menu-archive-view.module.css",
    "../components/dish-result.module.css",
    "../styles/matlyst-featured.css",
    "../styles/dish-learning-dialog.css",
  ]) {
    const css = await source(file);
    assert.match(css, /object-fit:\s*contain/u, file);
    assert.match(css, /filter:\s*saturate/u, file);
  }
});
