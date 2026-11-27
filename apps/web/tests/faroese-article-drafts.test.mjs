import test from "node:test";
import assert from "node:assert/strict";
import { isPreviewLocale } from "../lib/locale-messages.ts";
import { draftFaroeseArticles } from "../content/food-knowledge/translations/faroese-review.ts";
import { article as original0 } from "../content/food-knowledge/articles/ramen.ts";
import { article as original1 } from "../content/food-knowledge/articles/biryani.ts";
import { article as original2 } from "../content/food-knowledge/articles/falafel.ts";
import { article as original3 } from "../content/food-knowledge/articles/carbonara.ts";
import { article as original4 } from "../content/food-knowledge/articles/tacos-al-pastor.ts";
import { article as original5 } from "../content/food-knowledge/articles/pad-thai.ts";
import { article as original6 } from "../content/food-knowledge/articles/dal-makhani.ts";
import { article as original7 } from "../content/food-knowledge/articles/sushi.ts";
import { article as original8 } from "../content/food-knowledge/articles/gyoza.ts";
const originals=[original0,original1,original2,original3,original4,original5,original6,original7,original8];
const nums=s=>s.match(/[0-9]+|[½¼¾]/gu)??[];
test("Faroese article drafts preserve original recipe structure and numeric tokens",()=>{
 assert.deepEqual(Object.keys(draftFaroeseArticles).sort(),originals.map(a=>a.dishId).sort());
 for(const original of originals){
  const b=draftFaroeseArticles[original.dishId];
  for(const key of ["overview","history","flavor","technique"]) assert.ok(b[key].trim());
  for(const key of ["essentials","variants","serving","commonMistakes"]) assert.equal(b[key].length,original[key].length);
  for(const key of ["ingredients","steps"]){
   assert.equal(b.recipe[key].length,original.recipe[key].length);
   assert.deepEqual(b.recipe[key].map(nums),original.recipe[key].map(nums));
  }
  for(const key of ["yield","time"]) assert.deepEqual(nums(b.recipe[key]),nums(original.recipe[key]));
 }
 assert.equal(isPreviewLocale("fo"),false);
});
