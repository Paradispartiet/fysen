import assert from "node:assert/strict";
import test from "node:test";
import { MAX_FOREGROUND_AGE_MS, shouldRefreshAfterResume } from "../src/freshness.ts";

test("a brief app switch does not waste data by refreshing twice", () => {
  assert.equal(shouldRefreshAfterResume(1_000, 1_000 + MAX_FOREGROUND_AGE_MS - 1), false);
  assert.equal(shouldRefreshAfterResume(null, 5_000), false);
});

test("after 15 minutes away, refresh menu search and Matlyst", () => {
  assert.equal(shouldRefreshAfterResume(1_000, 1_000 + MAX_FOREGROUND_AGE_MS), true);
  assert.equal(shouldRefreshAfterResume(1_000, 1_000 + MAX_FOREGROUND_AGE_MS + 3), true);
});

test("clock changes or invalid timestamps do not trigger a bogus refresh", () => {
  assert.equal(shouldRefreshAfterResume(5_000, 1_000), false);
  assert.equal(shouldRefreshAfterResume(Number.NaN, 900_000), false);
  assert.equal(shouldRefreshAfterResume(0, Number.POSITIVE_INFINITY), false);
});
