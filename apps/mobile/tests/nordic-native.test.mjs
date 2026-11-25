import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";
import {formatPrice} from "../src/format.ts";
test("local prices retain currency in native UI",()=>{
  for (const [currency, suffix] of [["NOK","kr"],["DKK","DKK"],["SEK","SEK"],["EUR","€"]]) {
    assert.ok(formatPrice({priceMinor:1500,priceKind:"exact",currency}).endsWith(" "+suffix));
    assert.ok(formatPrice({priceMinor:1500,priceMaxMinor:2500,priceKind:"multiple",currency}).endsWith(" "+suffix));
  }
});
test("Nordic native search uses archive provenance and explicit pagination",()=>{
 const app=fs.readFileSync(new URL("../App.tsx",import.meta.url),"utf8");
 const api=fs.readFileSync(new URL("../src/api.ts",import.meta.url),"utf8");
 assert.match(app,/nordicCities\.map/);
 assert.match(app,/NordicArchiveScreen key=\{city\}/);
 assert.match(app,/Meny sist registrert/);
 assert.match(app,/Vis flere menytreff/);
 assert.match(api,/\/v1\/dishes\/archive\/search\?/);
 assert.match(api,/nextOffset/);
});
