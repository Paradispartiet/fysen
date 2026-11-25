import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { URL } from "node:url";
import { illustrationForDishName } from "../components/food-illustration-match.ts";

test("miniatures use existing conservative dish matching", () => {
  assert.equal(illustrationForDishName("Pizza margherita"), "pizza");
  assert.equal(illustrationForDishName("Pasta carbonara"), "pasta");
  assert.equal(illustrationForDishName("Ramen"), "soup");
  assert.equal(illustrationForDishName("Tacos al pastor"), "taco");
  assert.equal(illustrationForDishName("Ukjent spesialrett"), null);
});

test("public menu archive uses only decorative local illustrations and retains source evidence", async () => {
  const source = await readFile(new URL("../components/verified-menu-archive-view.tsx", import.meta.url), "utf8");
  assert.match(source, /illustrationForDishName\(result\.name\)/u);
  assert.match(source, /illustrationForDishName\(dish\.label\)/u);
  assert.match(source, /illustrationForDishName\(dish\.name\)/u);
  assert.match(source, /<FoodIllustration/u);
  assert.match(source, /priceLabel\(result\.priceMinor, result\.priceMaxMinor, result\.priceKind, result\.currency\)/u);
  assert.match(source, /result\.sourceUrl/u);
  assert.match(source, /dateTime=\{result\.observedAt\}/u);
  assert.match(source, /result\.restaurantName/u);
  assert.match(source, /dish\.restaurantCount/u);
});

test("live menu results show original art without altering restaurant and price data", async () => {
  const source = await readFile(new URL("../components/dish-result.tsx", import.meta.url), "utf8");
  assert.match(source, /illustrationForDishName\(result\.dish\.name\)/u);
  assert.match(source, /className=\{styles\.dishArtwork \?\? ""\}/u);
  assert.match(source, /result\.restaurant\.name/u);
  assert.match(source, /formatDishPrice\(result\.dish\)/u);
  assert.match(source, /result\.menu\.sourceUrl/u);
  assert.match(source, /result\.match\.type === "fuzzy"/u);
});

test("miniatures have consistent transparent object-fit contain styling", async () => {
  for (const file of ["dish-result.module.css", "verified-menu-archive-view.module.css"]) {
    const css = await readFile(new URL(`../components/${file}`, import.meta.url), "utf8");
    assert.match(css, /\.dishArtwork\s*\{/u);
    assert.match(css, /object-fit:\s*contain/u);
    assert.match(css, /@media\s*\(max-width:/u);
  }
});
