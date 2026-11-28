import { readFileSync } from "node:fs";
import { draftInternationalCuisines, draftInternationalGalleryNames, draftInternationalDishNames } from "../lib/international-food-drafts.ts";
import { galleryNames } from "../lib/visual-messages.ts";
import { pageMessages } from "../lib/page-messages.ts";
import { visualMessages } from "../lib/visual-messages.ts";
import { browseMessages } from "../lib/browse-messages.ts";
import test from "node:test";
import assert from "node:assert/strict";
import { locales, parseLocale } from "../lib/locales.ts";
import { messages, isPreviewLocale } from "../lib/locale-messages.ts";
import { resultMessages } from "../lib/result-messages.ts";
import { knowledgeMessages } from "../lib/knowledge-messages.ts";
import { internationalReviewLocales, draftInternationalCore, draftInternationalResults, draftInternationalKnowledge, draftInternationalBrowse, draftInternationalVisuals, draftInternationalPages } from "../lib/international-review-drafts.ts";

const tokens = (value) => (value.match(/\{\w+\}/gu) ?? []).sort();
for (const locale of internationalReviewLocales) {
  test(`International review draft ${locale}: complete source keys and placeholders, not selectable`, () => {
    assert.equal(parseLocale(locales[locale].intl), locale);
    assert.equal(isPreviewLocale(locale), false);
    for (const [source, draft] of [[messages.nb, draftInternationalCore[locale]], [resultMessages.nb, draftInternationalResults[locale]], [knowledgeMessages.nb, draftInternationalKnowledge[locale]], [browseMessages.nb, draftInternationalBrowse[locale]], [visualMessages.nb, draftInternationalVisuals[locale]], [pageMessages.nb, draftInternationalPages[locale]]]) {
      assert.deepEqual(Object.keys(draft).sort(), Object.keys(source).sort());
      for (const [key, value] of Object.entries(draft)) {
        assert.ok(value.trim(), key);
        assert.deepEqual(tokens(value), tokens(source[key]), key);
      }
    }
  });
}

const sourceKeys = (file) => [...readFileSync(new URL(file, import.meta.url), "utf8").matchAll(/^ {2}"([^"]+)": \[/gmu)].map((match) => match[1]).sort();
for (const locale of internationalReviewLocales) {
  test(`International display drafts ${locale} preserve canonical keys and exact gallery variants`, () => {
    assert.equal(isPreviewLocale(locale), false);
    assert.deepEqual(Object.keys(draftInternationalCuisines[locale]).sort(), sourceKeys("../lib/cuisine-labels.ts"));
    assert.deepEqual(Object.keys(draftInternationalDishNames[locale]).sort(), sourceKeys("../lib/dish-display-names.ts"));
    assert.deepEqual(Object.keys(draftInternationalGalleryNames[locale]).sort(), Object.keys(galleryNames).sort());
    for (const label of [...Object.values(draftInternationalCuisines[locale]), ...Object.values(draftInternationalDishNames[locale])]) assert.ok(label.trim());
    for (const [id, row] of Object.entries(draftInternationalGalleryNames[locale])) {
      assert.equal(row.original, galleryNames[id][0]);
      assert.ok(row.text.trim());
    }
  });
}
