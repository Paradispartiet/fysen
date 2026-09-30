import assert from "node:assert/strict";
import { Buffer } from "node:buffer";
import process from "node:process";
import test from "node:test";
import { restaurantIntakeRequestSchema } from "@fysen/contracts/restaurant-intake";
import { restaurantOnboardingManifestSchema } from "../../menu-worker/src/onboarding-manifest.ts";
import {
  buildRestaurantIntakeSeed,
  intakeSlug,
} from "../lib/restaurant-intake-seed.ts";
import { handleRestaurantIntake } from "../lib/restaurant-intake.ts";

const { Request, Response } = globalThis;

const secret = "test-operator-key-with-at-least-32-characters";
const origin = "https://fysen.test";
const input = {
  name: "Åpen prøvekjøkken",
  address: "Testgata 1, 0123 Oslo",
  menuUrl: "https://restaurant.example/meny",
  websiteUrl: "https://restaurant.example",
  coverageNote: "Gir dokumentert regional rettdekning i området.",
};

function configure(t) {
  const keys = [
    "FYSEN_RESTAURANT_INTAKE_OPERATOR_TOKEN",
    "FYSEN_RESTAURANT_INTAKE_GITHUB_TOKEN",
  ];
  const previous = keys.map((key) => process.env[key]);
  process.env[keys[0]] = secret;
  process.env[keys[1]] = "test-server-github-token";
  t.after(() =>
    keys.forEach((key, index) => {
      if (previous[index] === undefined) delete process.env[key];
      else process.env[key] = previous[index];
    }),
  );
}

function request(body = input, headers = {}) {
  return new Request(`${origin}/api/admin/restaurant-intake`, {
    method: "POST",
    headers: {
      authorization: `Bearer ${secret}`,
      origin,
      "content-type": "application/json",
      ...headers,
    },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("request validates Oslo postcode, HTTPS, browser source type and action provenance", () => {
  assert.equal(restaurantIntakeRequestSchema.safeParse(input).success, true);
  for (const change of [
    { address: "Testgata 1, Bergen" },
    { menuUrl: "http://restaurant.example/meny" },
    { menuUrl: "not-a-url" },
    { menuUrl: "HTTPS://restaurant.example/meny" },
    { menuUrl: "https://user:pass@restaurant.example/meny" },
    { sourceType: "pdf", fetchMode: "browser" },
    { bookingUrl: "https://restaurant.example/book" },
    { coverageNote: "Volum" },
  ])
    assert.equal(
      restaurantIntakeRequestSchema.safeParse({ ...input, ...change }).success,
      false,
    );
});

test("generated research seed fits existing manifest fields and leaves geocoding and assertions to intake", () => {
  const parsed = restaurantIntakeRequestSchema.parse({
    ...input,
    bookingUrl: "https://restaurant.example/book",
    orderUrl: "https://restaurant.example/order",
    actionSourceUrl: "https://restaurant.example/contact",
  });
  const seed = buildRestaurantIntakeSeed(parsed, "2026-09-30");
  const entry = seed.restaurants[0];
  const manifest = restaurantOnboardingManifestSchema.parse({
    ...entry,
    restaurant: { ...entry.restaurant, latitude: 59.9, longitude: 10.7 },
    menuSource: { ...entry.menuSource, minimumExpectedItems: 3 },
    qualityAssertions: { requiredDishNames: ["Example dish"] },
  });
  assert.equal(manifest.restaurant.slug, "apen-provekjokken-oslo");
  assert.equal(manifest.menuSource.checkIntervalMinutes, 720);
  assert.equal(manifest.verification.hours.status, "unverified");
  assert.equal(entry.assertionCount, 8);
  assert.equal(seed.coverageRationale, input.coverageNote);
  assert.equal(Object.hasOwn(entry.restaurant, "latitude"), false);
  assert.equal(Object.hasOwn(entry.restaurant, "longitude"), false);
  assert.equal(Object.hasOwn(entry, "qualityAssertions"), false);
  assert.deepEqual(
    manifest.actions.map(({ type, sourceUrl }) => ({ type, sourceUrl })),
    [
      { type: "booking", sourceUrl: parsed.actionSourceUrl },
      { type: "order", sourceUrl: parsed.actionSourceUrl },
    ],
  );
  assert.equal(intakeSlug("Prøve Oslo"), "prove-oslo");
  assert.ok(intakeSlug(`${"a".repeat(200)} Oslo`).endsWith("-oslo"));
  assert.ok(intakeSlug("a".repeat(200)).length <= 160);
});

test("missing server setup is fail-closed without network calls", async (t) => {
  configure(t);
  delete process.env.FYSEN_RESTAURANT_INTAKE_GITHUB_TOKEN;
  const network = t.mock.method(globalThis, "fetch", () => {
    throw new Error("Unexpected fetch");
  });
  assert.equal((await handleRestaurantIntake(request())).status, 503);
  assert.equal(network.mock.callCount(), 0);
});

test("authorization and origin gates run before parsing or GitHub calls", async (t) => {
  configure(t);
  const network = t.mock.method(globalThis, "fetch", () => {
    throw new Error("Unexpected fetch");
  });
  for (const authorization of ["", "Bearer wrong", secret]) {
    assert.equal(
      (await handleRestaurantIntake(request("invalid JSON", { authorization })))
        .status,
      401,
    );
  }
  assert.equal(
    (
      await handleRestaurantIntake(
        request(input, { origin: "https://other.example" }),
      )
    ).status,
    403,
  );
  assert.equal(network.mock.callCount(), 0);
});

test("oversized, malformed and invalid requests never reach GitHub", async (t) => {
  configure(t);
  const network = t.mock.method(globalThis, "fetch", () => {
    throw new Error("Unexpected fetch");
  });
  for (const body of [
    "{",
    "x".repeat(32_001),
    { ...input, name: "寿司" },
    { ...input, menuUrl: "not-a-url" },
    { ...input, menuUrl: "http://restaurant.example" },
  ]) {
    assert.equal((await handleRestaurantIntake(request(body))).status, 400);
  }
  assert.equal(network.mock.callCount(), 0);
});

test("submission pins fresh main, writes only a research seed and opens the existing intake PR", async (t) => {
  configure(t);
  const calls = [];
  t.mock.method(globalThis, "fetch", async (url, options) => {
    calls.push({
      url,
      options,
      body: options.body ? JSON.parse(options.body) : null,
    });
    const replies = [
      { object: { sha: "a".repeat(40) } },
      {},
      {},
      { html_url: "https://github.com/Paradispartiet/fysen/pull/123" },
    ];
    return Response.json(replies[calls.length - 1]);
  });
  const response = await handleRestaurantIntake(request());
  const receipt = await response.json();
  assert.equal(response.status, 202);
  assert.equal(receipt.status, "pending_validation");
  assert.equal(calls.length, 4);
  assert.match(calls[0].url, /\/git\/ref\/heads\/main$/u);
  assert.equal(calls[1].body.sha, "a".repeat(40));
  assert.match(calls[1].body.ref, /^refs\/heads\/restaurant-intake\//u);
  assert.equal(calls[2].options.method, "PUT");
  assert.match(
    calls[2].url,
    /\/contents\/apps\/menu-worker\/research\/operator-[a-f0-9-]+\.seed\.json$/u,
  );
  const seed = JSON.parse(
    Buffer.from(calls[2].body.content, "base64").toString("utf8"),
  );
  assert.deepEqual(
    seed.restaurants[0].restaurant,
    buildRestaurantIntakeSeed(
      restaurantIntakeRequestSchema.parse(input),
      "2026-09-30",
    ).restaurants[0].restaurant,
  );
  assert.equal(calls[3].body.base, "main");
  assert.equal(calls[3].body.head, calls[2].body.branch);
  assert.match(
    calls[3].body.body,
    new RegExp(
      `Batch-intake seed: ${receipt.seedPath.replaceAll(".", "\\.")}`,
      "u",
    ),
  );
  assert.equal(JSON.stringify(seed).includes(secret), false);
  assert.equal(
    JSON.stringify(seed).includes("test-server-github-token"),
    false,
  );
  assert.equal(
    JSON.stringify(receipt).includes("test-server-github-token"),
    false,
  );
});

test("main lookup failure performs no mutation and does not leak GitHub errors", async (t) => {
  configure(t);
  const network = t.mock.method(
    globalThis,
    "fetch",
    async () => new Response("private upstream details", { status: 403 }),
  );
  const response = await handleRestaurantIntake(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { code: "INTAKE_UNAVAILABLE" });
  assert.equal(network.mock.callCount(), 1);
});

test("definitive branch creation rejection does not return a false review link", async (t) => {
  configure(t);
  let calls = 0;
  t.mock.method(globalThis, "fetch", async () => {
    calls += 1;
    if (calls === 1)
      return Response.json({ object: { sha: "c".repeat(40) } });
    return new Response("private upstream details", { status: 403 });
  });
  const response = await handleRestaurantIntake(request());
  assert.equal(response.status, 502);
  assert.deepEqual(await response.json(), { code: "INTAKE_UNAVAILABLE" });
  assert.equal(calls, 2);
});

for (const failAt of [2, 3, 4])
  test(`uncertain GitHub write ${failAt} returns a review link without retry or deletion`, async (t) => {
    configure(t);
    let calls = 0;
    t.mock.method(globalThis, "fetch", async () => {
      calls += 1;
      if (calls === failAt)
        throw new Error("timeout after possibly successful write");
      return Response.json(
        calls === 1 ? { object: { sha: "b".repeat(40) } } : {},
      );
    });
    const response = await handleRestaurantIntake(request());
    const receipt = await response.json();
    assert.equal(response.status, 502);
    assert.equal(receipt.status, "needs_review");
    assert.match(
      receipt.branchUrl,
      /^https:\/\/github.com\/Paradispartiet\/fysen\/tree\/restaurant-intake\//u,
    );
    assert.equal(calls, failAt);
  });
