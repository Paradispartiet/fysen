import test from "node:test";
import assert from "node:assert/strict";
import { locales, parseLocale, resolveLocale } from "../lib/locales.ts";

test("Nordic locale registry includes launch and broader Nordic languages", () => {
  assert.deepEqual(Object.keys(locales), ["nb", "nn", "sv", "da", "fi", "is", "fo", "kl", "se", "en", "fr", "pt", "es", "de"]);
});

test("locale selection normalizes regional tags and legacy Norwegian", () => {
  assert.equal(parseLocale("SV-se"), "sv");
  assert.equal(parseLocale("no-NO"), "nb");
  assert.equal(parseLocale("nn-NO"), "nn");
  assert.equal(parseLocale("se-NO"), "se");
  assert.equal(parseLocale("constructor"), undefined);
});

test("explicit preference overrides browser language and unsupported choices", () => {
  assert.equal(resolveLocale("fi", "sv-SE"), "fi");
  assert.equal(resolveLocale("it", "is-IS"), "is");
  assert.equal(resolveLocale(null, "it, da;q=0.8, sv;q=0.9"), "sv");
  assert.equal(resolveLocale(null, "fi;q=0, en;q=0.5"), "en");
  assert.equal(resolveLocale(null, "it, *;q=0.5"), "nb");
  assert.equal(resolveLocale(), "nb");
});


test("international language tags normalize independently of location", () => {
  assert.equal(parseLocale("fr-CA"), "fr");
  assert.equal(parseLocale("pt-BR"), "pt");
  assert.equal(parseLocale("es-MX"), "es");
  assert.equal(parseLocale("de-AT"), "de");
  assert.equal(resolveLocale("pt-PT", "de-DE"), "pt");
  assert.equal(resolveLocale(null, "de-DE, fr-FR;q=0.8"), "de");
});
