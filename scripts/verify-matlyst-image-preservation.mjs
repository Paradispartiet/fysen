import { readFileSync } from "node:fs";
import process from "node:process";
import { pathToFileURL } from "node:url";

const originalDishCount = 44;
const approvedFields = [
  "atlas",
  "kind",
  "largeSource",
  "largeSourceSha256",
  "largeSourceOriginalPath",
  "largeSourceOriginalSha256",
  "largeSourceNativeWidth",
  "largeSourceNativeHeight",
  "largeSourceMethod",
  "largeSourceReview",
  "photoCredit",
  "photoSource",
  "photoLicense",
  "photoLicenseNotice",
];

function verifyShape(manifest, label) {
  if (!manifest || !Array.isArray(manifest.images) || manifest.images.length < originalDishCount) {
    throw new Error(label + ": Matlyst must retain at least " + originalDishCount + " dishes");
  }
  const seen = new Set();
  for (const [index, dish] of manifest.images.entries()) {
    if (!dish || typeof dish.id !== "string" || !/^[a-z0-9-]+$/u.test(dish.id) ||
        seen.has(dish.id) || dish.index !== index) {
      throw new Error(label + ": duplicate, reordered or invalid dish at position " + index);
    }
    seen.add(dish.id);
  }
}

function requireNewApprovalEvidence(dish) {
  const required = [
    "largeSource", "largeSourceSha256", "largeSourceOriginalPath",
    "largeSourceOriginalSha256", "largeSourceReview", "largeSourceMethod",
    "photoCredit", "photoSource", "photoLicense",
  ];
  for (const field of required) {
    if (typeof dish[field] !== "string" || dish[field].trim().length === 0) {
      throw new Error(dish.id + ": new large view missing " + field);
    }
  }
  for (const field of ["largeSourceSha256", "largeSourceOriginalSha256"]) {
    if (!/^[0-9a-f]{64}$/u.test(dish[field])) {
      throw new Error(dish.id + ": invalid " + field);
    }
  }
  if (!Number.isInteger(dish.largeSourceNativeWidth) ||
      !Number.isInteger(dish.largeSourceNativeHeight) ||
      dish.largeSourceNativeWidth < 1600 || dish.largeSourceNativeHeight < 1600) {
    throw new Error(dish.id + ": unverified native full-size resolution");
  }
  if (!dish.photoSource.startsWith("https://") ||
      !dish.photoLicense.startsWith("https://") ||
      !/^[a-z0-9-]+-master-[0-9]+[.]avif$/u.test(dish.largeSource) ||
      !/^[a-z0-9-]+-thumb-[0-9]+[.]avif$/u.test(dish.atlas)) {
    throw new Error(dish.id + ": source, license, master or thumbnail is invalid");
  }
}

export function verifyPreservedMatlystApprovals(baseline, candidate) {
  verifyShape(baseline, "Base");
  verifyShape(candidate, "Candidate");
  if (candidate.images.length < baseline.images.length) throw new Error("Matlyst cannot remove existing image slots");
  let preserved = 0;
  let added = 0;
  for (let i = 0; i < baseline.images.length; i += 1) {
    const previous = baseline.images[i];
    const current = candidate.images[i];
    if (previous.id !== current.id) {
      throw new Error("Matlyst dish order changed at " + i + ": " + previous.id + " -> " + current.id);
    }
    if (previous.largeViewEnabled === true) {
      if (current.largeViewEnabled !== true) {
        throw new Error(previous.id + ": already-approved full-size image was disabled");
      }
      for (const field of approvedFields) {
        if (previous[field] !== current[field]) {
          throw new Error(previous.id + ": approved " + field + " was replaced or lost");
        }
      }
      preserved += 1;
    } else if (current.largeViewEnabled === true) {
      requireNewApprovalEvidence(current);
      added += 1;
    }
  }
  const mappedIds = new Set(candidate.images.slice(0, baseline.images.length).flatMap(image => [image.id, image.catalogId].filter(Boolean)));
  for (const image of candidate.images.slice(baseline.images.length)) {
    if (image.catalogId !== image.id || mappedIds.has(image.id) || !image.label?.trim() || !image.query?.trim() || image.surface !== "Matlyst") {
      throw new Error(image.id + ": appended image needs unique exact catalog ID, label and query");
    }
    if (image.largeViewEnabled !== true) throw new Error(image.id + ": appended image needs an approved master");
    requireNewApprovalEvidence(image);
    mappedIds.add(image.id);
    added += 1;
  }
  return { dishes: candidate.images.length, preserved, added, totalApproved: preserved + added };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (process.argv.length !== 4) {
    throw new Error("Usage: node verify-matlyst-image-preservation.mjs BASE.json CANDIDATE.json");
  }
  const baseline = JSON.parse(readFileSync(process.argv[2], "utf8"));
  const candidate = JSON.parse(readFileSync(process.argv[3], "utf8"));
  process.stdout.write("PASS: " + JSON.stringify(verifyPreservedMatlystApprovals(baseline, candidate)) + "\n");
}
