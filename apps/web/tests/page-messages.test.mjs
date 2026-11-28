import assert from "node:assert/strict";
import test from "node:test";
import { previewLocales } from "../lib/locale-messages.ts";
import { pageMessages, pageText } from "../lib/page-messages.ts";
test("page language dictionaries retain all fields and placeholders", () => {
 const placeholders = s => (s.match(/\{\w+\}/gu) ?? []).sort();
 for(const locale of previewLocales) {
   assert.deepEqual(Object.keys(pageMessages[locale]), Object.keys(pageMessages.nb));
   for(const key of Object.keys(pageMessages.nb)) {
     assert.ok(pageMessages[locale][key].trim());
     assert.deepEqual(placeholders(pageMessages[locale][key]), placeholders(pageMessages.nb[key]));
   }
   assert.ok(pageText(locale,"savedMany",{count:3}).includes("3"));
   assert.ok(pageText(locale,"analyzeHelp").includes("50"));
 }
});
