import test from "node:test";
import assert from "node:assert/strict";
import { locales, parseLocale } from "../lib/locales.ts";
import { messages, isPreviewLocale } from "../lib/locale-messages.ts";
import { resultMessages } from "../lib/result-messages.ts";
import { knowledgeMessages } from "../lib/knowledge-messages.ts";
import { internationalReviewLocales, draftInternationalCore, draftInternationalResults, draftInternationalKnowledge } from "../lib/international-review-drafts.ts";

const tokens = (value) => (value.match(/\{\w+\}/gu) ?? []).sort();
for (const locale of internationalReviewLocales) {
  test(`International review draft ${locale}: complete source keys and placeholders, not selectable`, () => {
    assert.equal(parseLocale(locales[locale].intl), locale);
    assert.equal(isPreviewLocale(locale), false);
    for (const [source, draft] of [[messages.nb, draftInternationalCore[locale]], [resultMessages.nb, draftInternationalResults[locale]], [knowledgeMessages.nb, draftInternationalKnowledge[locale]]]) {
      assert.deepEqual(Object.keys(draft).sort(), Object.keys(source).sort());
      for (const [key, value] of Object.entries(draft)) {
        assert.ok(value.trim(), key);
        assert.deepEqual(tokens(value), tokens(source[key]), key);
      }
    }
  });
}
