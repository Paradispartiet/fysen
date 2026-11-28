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
import { article as original9 } from "../content/food-knowledge/articles/tom-yum.ts";
import { article as original10 } from "../content/food-knowledge/articles/pho.ts";
import { article as original11 } from "../content/food-knowledge/articles/banh-mi.ts";
import { article as original12 } from "../content/food-knowledge/articles/katsu.ts";
import { article as original13 } from "../content/food-knowledge/articles/bao.ts";
import { article as original14 } from "../content/food-knowledge/articles/mapo-tofu.ts";
import { article as original15 } from "../content/food-knowledge/articles/butter-chicken.ts";
import { article as original16 } from "../content/food-knowledge/articles/tandoori.ts";
import { article as original17 } from "../content/food-knowledge/articles/chana-masala.ts";
import { article as original18 } from "../content/food-knowledge/articles/dosa.ts";
import { article as original19 } from "../content/food-knowledge/articles/cacio-e-pepe.ts";
import { article as original20 } from "../content/food-knowledge/articles/pizza-margherita.ts";
import { article as original21 } from "../content/food-knowledge/articles/arancini.ts";
import { article as original22 } from "../content/food-knowledge/articles/pasta-alla-norma.ts";
import { article as original23 } from "../content/food-knowledge/articles/hummus.ts";
import { article as original24 } from "../content/food-knowledge/articles/shawarma.ts";
import { article as original25 } from "../content/food-knowledge/articles/manakish.ts";
import { article as original26 } from "../content/food-knowledge/articles/koshari.ts";
import { article as original27 } from "../content/food-knowledge/articles/pide.ts";
import { article as original28 } from "../content/food-knowledge/articles/birria.ts";
import { article as original29 } from "../content/food-knowledge/articles/cochinita-pibil.ts";
import { article as original30 } from "../content/food-knowledge/articles/pozole.ts";
import { article as original31 } from "../content/food-knowledge/articles/fish-taco.ts";
import { article as original32 } from "../content/food-knowledge/articles/smashburger.ts";
const originals=[original0,original1,original2,original3,original4,original5,original6,original7,original8,original9,original10,original11,original12,original13,original14,original15,original16,original17,original18,original19,original20,original21,original22,original23,original24,original25,original26,original27,original28,original29,original30,original31,original32];
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
