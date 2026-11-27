import test from "node:test";
import assert from "node:assert/strict";
import { messages,isPreviewLocale } from "../lib/locale-messages.ts";
import { resultMessages } from "../lib/result-messages.ts";
import { locales,parseLocale } from "../lib/locales.ts";
import { reviewLocales,draftCoreMessages,draftFaroeseResults,reviewState } from "../lib/nordic-review-drafts.ts";
function check(source,draft){
 assert.deepEqual(Object.keys(draft).sort(),Object.keys(source).sort());
 for(const [key,value] of Object.entries(draft)){
  assert.ok(value.trim(),key);
  assert.deepEqual((value.match(/\{\w+\}/gu)??[]).sort(),(source[key].match(/\{\w+\}/gu)??[]).sort(),key);
 }
}
test("unreviewed Nordic core dictionaries are complete, not enabled",()=>{
 for(const locale of reviewLocales){
  assert.equal(parseLocale(locales[locale].intl),locale);
  assert.equal(isPreviewLocale(locale),false);
  assert.equal(reviewState[locale],"needs-native-review");
  check(messages.nb,draftCoreMessages[locale]);
 }
});
test("Faroese results draft preserves placeholders and coverage",()=>check(resultMessages.nb,draftFaroeseResults));
