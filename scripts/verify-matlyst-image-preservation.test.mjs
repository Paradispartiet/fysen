import assert from "node:assert/strict";
import test from "node:test";
import { verifyPreservedMatlystApprovals } from "./verify-matlyst-image-preservation.mjs";

function verifiedImage(id, index) {
  return {
    id, index,
    atlas: id + "-thumb-512.avif",
    kind: "Redaksjonelt rettfoto",
    largeViewEnabled: true,
    largeSource: id + "-master-3000.avif",
    largeSourceSha256: "a".repeat(64),
    largeSourceOriginalPath: "assets/fysen-dish-originals/" + id + ".png",
    largeSourceOriginalSha256: "b".repeat(64),
    largeSourceNativeWidth: 3000,
    largeSourceNativeHeight: 2400,
    largeSourceMethod: "independent-original",
    largeSourceReview: "docs/fysen-image-reviews/" + id + ".md",
    photoCredit: "Reviewer / license",
    photoSource: "https://example.org/source",
    photoLicense: "https://example.org/license",
  };
}

function baseManifest() {
  return {
    images: Array.from({ length: 44 }, (_, index) => ({
      id: "dish-" + index, index,
      atlas: "dish-" + index + "-768.avif",
      largeViewEnabled: false,
    })),
  };
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

test("keeps all 44 dishes and their existing approved masters", () => {
  const before = baseManifest();
  before.images[0] = verifiedImage("dish-0", 0);
  before.images[1] = verifiedImage("dish-1", 1);
  assert.deepEqual(verifyPreservedMatlystApprovals(before, clone(before)), {
    dishes: 44, preserved: 2, added: 0, totalApproved: 2,
  });
});

test("rejects an approved full-size image accidentally disabled", () => {
  const before = baseManifest();
  before.images[0] = verifiedImage("dish-0", 0);
  const after = clone(before);
  after.images[0].largeViewEnabled = false;
  assert.throws(() => verifyPreservedMatlystApprovals(before, after), /already-approved/u);
});

test("rejects a replaced approved source, source hash or photo attribution", () => {
  const before = baseManifest();
  before.images[0] = verifiedImage("dish-0", 0);
  for (const key of ["largeSource", "largeSourceSha256", "atlas", "photoLicense"]) {
    const after = clone(before);
    after.images[0][key] = "changed";
    assert.throws(() => verifyPreservedMatlystApprovals(before, after), /approved/u);
  }
});

test("rejects a reorder, duplicate or reduction of the 44 gallery slots", () => {
  const before = baseManifest();
  const after = clone(before);
  const old = after.images[0];
  after.images[0] = after.images[1];
  after.images[1] = old;
  assert.throws(() => verifyPreservedMatlystApprovals(before, after), /reordered|order/u);
  const duplicates = clone(before);
  duplicates.images[1].id = duplicates.images[0].id;
  assert.throws(() => verifyPreservedMatlystApprovals(before, duplicates), /duplicate/u);
  assert.throws(() => verifyPreservedMatlystApprovals(before, { images: [] }), /44 dishes/u);
});

test("new approvals must carry real resolution, provenance, separate thumb and hashes", () => {
  const before = baseManifest();
  const after = clone(before);
  after.images[1].largeViewEnabled = true;
  assert.throws(() => verifyPreservedMatlystApprovals(before, after), /missing/u);
  after.images[1] = verifiedImage("dish-1", 1);
  assert.deepEqual(verifyPreservedMatlystApprovals(before, after), {
    dishes: 44, preserved: 0, added: 1, totalApproved: 1,
  });
  after.images[1].largeSourceNativeWidth = 900;
  assert.throws(() => verifyPreservedMatlystApprovals(before, after), /resolution/u);
});

test("append a verified new dish without altering the original 44 slots", () => {
  const before = baseManifest();
  before.images[0] = verifiedImage("dish-0", 0);
  const after = clone(before);
  const extra = { ...verifiedImage("new-dish", 44), catalogId: "new-dish", label: "New dish", query: "new dish", surface: "Matlyst" };
  after.images.push(extra);
  assert.deepEqual(verifyPreservedMatlystApprovals(before, after), { dishes: 45, preserved: 1, added: 1, totalApproved: 2 });
  assert.throws(() => verifyPreservedMatlystApprovals(after, before), /remove existing/u);
  const invalid = clone(after);
  invalid.images[44].catalogId = "other";
  assert.throws(() => verifyPreservedMatlystApprovals(before, invalid), /exact catalog ID/u);
  const incomplete = clone(after);
  incomplete.images[44].largeViewEnabled = false;
  assert.throws(() => verifyPreservedMatlystApprovals(before, incomplete), /approved master/u);
});
