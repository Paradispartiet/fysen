import assert from "node:assert/strict";
import test from "node:test";
import { parseFysenDeepLink } from "../src/deep-link.ts";

test("opens Fysen Matlyst and favorites using native app tabs", () => {
  assert.deepEqual(parseFysenDeepLink("fysen://matlyst"), { tab: "matlyst" });
  assert.deepEqual(parseFysenDeepLink("fysen://favorites"), { tab: "favorites" });
  assert.deepEqual(parseFysenDeepLink("fysen://search"), { tab: "search", query: null });
});

test("a Fysen search deep link preserves a real, bounded query", () => {
  assert.deepEqual(parseFysenDeepLink("fysen://search?q=ramen"), { tab: "search", query: "ramen" });
  assert.deepEqual(parseFysenDeepLink("fysen://search?q=pho%20bo"), { tab: "search", query: "pho bo" });
  assert.deepEqual(parseFysenDeepLink("fysen://search?q=%20%20ramen%20"), { tab: "search", query: "ramen" });
});

test("rejects arbitrary schemes, unknown tabs, paths and invalid query lengths", () => {
  for (const link of [
    null, "https://fysen.vercel.app", "fysen://evil", "fysen://matlyst/other",
    "fysen://search?q=x", "fysen://search?q=" + "x".repeat(81), "not-a-url",
  ]) {
    assert.equal(parseFysenDeepLink(link), null, String(link));
  }
});

test("malformed and overlong URLs never trigger navigation", () => {
  assert.equal(parseFysenDeepLink("fysen://search?q=" + "x".repeat(600)), null);
  assert.equal(parseFysenDeepLink("fysen://search/%25%GG"), null);
});
