import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";
import { URL } from "node:url";
import { previewLocales } from "../lib/locale-messages.ts";
import { galleryNames, galleryName, visualText, visualMessages } from "../lib/visual-messages.ts";
test("all exact gallery variants retain their original IDs and labels", () => {
 const source = readFileSync(new URL("../components/dish-photo-gallery.tsx", import.meta.url), "utf8");
 const rows = [...source.matchAll(/\{ id: "([^"]+)", label: "([^"]+)", query: "([^"]+)" \}/gu)];
 assert.equal(rows.length, 44);
 assert.equal(Object.keys(galleryNames).length, 44);
 for (const [,id,label] of rows) {
   assert.equal(galleryName(id,label,"nb"),label);
   for (const locale of previewLocales) assert.ok(galleryName(id,label,locale).trim());
 }
 assert.equal(galleryName("pho","Phở","en"),"Phở");
 assert.equal(galleryName("cheeseburger","Cheeseburger","fi"),"Cheeseburger");
 assert.equal(galleryName("cheeseburger","Cheeseburger med bacon","fi"),"Pekonijuustohampurilainen");
 assert.doesNotMatch(source,/Oppdag retter i ditt eget tempo|Litt inspirasjon/u);
 assert.equal(visualText("nb","kicker"),"Matlyst · Til inspirasjon");
});
test("visual labels retain source distinctions and placeholders", () => {
 for(const locale of previewLocales) {
  assert.deepEqual(Object.keys(visualMessages[locale]),Object.keys(visualMessages.nb));
  assert.ok(visualText(locale,"exteriorAlt",{name:"Egon"}).includes("Egon"));
  assert.ok(visualText(locale,"explore",{count:44}).includes("44"));
  assert.notEqual(visualText(locale,"photoAlt",{name:"X"}),visualText(locale,"aiAlt",{name:"X"}));
 }
});
