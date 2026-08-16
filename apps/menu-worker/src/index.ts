import { normalizeDishName } from "@fysen/menu-core";

const workerIdentity = {
  service: "fysen-menu-worker",
  status: "ready",
  normalizationProbe: normalizeDishName("  Biff-tartar  "),
} as const;

process.stdout.write(`${JSON.stringify(workerIdentity)}\n`);
