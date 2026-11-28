import test from "node:test";
import assert from "node:assert/strict";
import { previewLocales } from "../lib/locale-messages.ts";
import { browseMessages,browseText } from "../lib/browse-messages.ts";
test("browse translations retain all keys and placeholders",()=>{
 for(const locale of previewLocales){
  assert.deepEqual(Object.keys(browseMessages[locale]),Object.keys(browseMessages.nb));
  for(const key of Object.keys(browseMessages.nb)) assert.deepEqual(browseMessages[locale][key].match(/\{\w+\}/gu),browseMessages.nb[key].match(/\{\w+\}/gu));
  assert.ok(browseText(locale,"allCity",{city:"Helsinki"}).includes("Helsinki"));
 }
});
