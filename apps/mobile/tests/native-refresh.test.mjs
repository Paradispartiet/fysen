import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const source = fs.readFileSync(new URL("../App.tsx", import.meta.url), "utf8");

test("Matlyst and search have real native pull-to-refresh controls", () => {
  assert.match(source, /import\s*\{[^}]*RefreshControl[^}]*\}\s*from "react-native"/s);
  assert.match(source, /refreshing=\{loading\}/);
  assert.match(source, /onRefresh=\{retry\}/);
  assert.match(source, /lastSearchedTerm\.current/);
});

test("foreground resume refreshes both live Matlyst and last search", () => {
  assert.match(source, /AppState\.addEventListener\("change"/);
  assert.match(source, /shouldRefreshAfterResume\(backgroundAt\.current, Date\.now\(\)\)/);
  assert.match(source, /void refreshFeatured\(\)/);
  assert.match(source, /setRefreshRequest\(\(previous\) => previous \+ 1\)/);
});

test("invalid search first cancels any previous in-flight request", () => {
  const start = source.indexOf("const perform = useCallback(async (term: string)");
  const abort = source.indexOf("request.current?.abort();", start);
  const validate = source.indexOf("validateSearchTerm(term)", start);
  assert.ok(start >= 0 && abort > start && validate > abort);
});
