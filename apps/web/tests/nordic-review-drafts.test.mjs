import { translatedSummaryIds } from "../lib/dish-summary-translations.ts";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { draftFaroeseCuisines,draftFaroeseGalleryNames,draftFaroeseDishNames,draftFaroeseSummaries } from "../lib/faroese-food-drafts.ts";
import { galleryNames } from "../lib/visual-messages.ts";
import { visualMessages } from "../lib/visual-messages.ts";
import { browseMessages } from "../lib/browse-messages.ts";
import { pageMessages } from "../lib/page-messages.ts";
import { knowledgeMessages } from "../lib/knowledge-messages.ts";
import test from "node:test";
import assert from "node:assert/strict";
import { messages,isPreviewLocale } from "../lib/locale-messages.ts";
import { resultMessages } from "../lib/result-messages.ts";
import { locales,parseLocale } from "../lib/locales.ts";
import { reviewLocales,draftCoreMessages,draftFaroeseResults,draftFaroeseKnowledge,draftFaroesePages,draftFaroeseBrowse,draftFaroeseVisuals,draftArcticResults,reviewState } from "../lib/nordic-review-drafts.ts";
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

test("Faroese food knowledge UI draft retains keys and placeholders",()=>check(knowledgeMessages.nb,draftFaroeseKnowledge));

test("Faroese page UI retains keys and placeholders",()=>check(pageMessages.nb,draftFaroesePages));

test("Faroese browse UI retains keys and placeholders",()=>check(browseMessages.nb,draftFaroeseBrowse));

test("Faroese visual UI retains keys and placeholders",()=>check(visualMessages.nb,draftFaroeseVisuals));

test("partial Greenlandic and Northern Sami search drafts only use existing keys",()=>{
 for(const locale of ["kl","se"]){
  assert.equal(isPreviewLocale(locale),false);
  for(const [key,value] of Object.entries(draftArcticResults[locale])){
   assert.ok(Object.hasOwn(resultMessages.nb,key));
   assert.ok(value.trim());
   assert.deepEqual((value.match(/\{\w+\}/gu)??[]).sort(),(resultMessages.nb[key].match(/\{\w+\}/gu)??[]).sort(),key);
  }
 }
});

test("Faroese display drafts retain exact canonical category and dish IDs",()=>{
 const cuisineSource=readFileSync(new URL("../lib/cuisine-labels.ts",import.meta.url),"utf8");
 const categoryKeys=[...cuisineSource.matchAll(/^ {2}"([^"]+)": \[/gmu)].map(x=>x[1]);
 assert.deepEqual(Object.keys(draftFaroeseCuisines).sort(),categoryKeys.sort());
 const dishSource=readFileSync(new URL("../lib/dish-display-names.ts",import.meta.url),"utf8");
 const dishKeys=[...dishSource.matchAll(/^ {2}"([^"]+)": \[/gmu)].map(x=>x[1]);
 assert.deepEqual(Object.keys(draftFaroeseDishNames).sort(),dishKeys.sort());
 assert.deepEqual(Object.keys(draftFaroeseGalleryNames).sort(),Object.keys(galleryNames).sort());
 for(const [id,row] of Object.entries(draftFaroeseGalleryNames)){
  assert.equal(row.original,galleryNames[id][0]);
  assert.ok(row.text.trim());
 }
 assert.equal(draftFaroeseGalleryNames.pho.original,"Phở bò");
 assert.equal(isPreviewLocale("fo"),false);
});

test("Faroese summary drafts cover all existing encyclopedia summaries",()=>{
 assert.deepEqual(Object.keys(draftFaroeseSummaries).sort(),[...translatedSummaryIds].sort());
 for(const summary of Object.values(draftFaroeseSummaries)) assert.ok(summary.trim());
 assert.equal(isPreviewLocale("fo"),false);
});
