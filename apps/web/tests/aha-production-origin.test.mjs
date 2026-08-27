import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const consumerSession = readFileSync(new URL("../lib/aha-consumer-session.ts", import.meta.url), "utf8");

test("AHA callbacks default to the canonical public Fysen origin", () => {
  assert.match(consumerSession, /return "https:\/\/fysen\.vercel\.app";/u);
  assert.doesNotMatch(consumerSession, /fysen-matsgran-8572s-projects\.vercel\.app/u);
});
