import { describe, expect, it } from "vitest";
import { assertLocalOperatorEnvironment } from "./operator-environment.js";

describe("privileged operator environment", () => {
  it("allows ordinary local execution", () => {
    expect(() => assertLocalOperatorEnvironment({ GITHUB_ACTIONS: undefined })).not.toThrow();
    expect(() => assertLocalOperatorEnvironment({ GITHUB_ACTIONS: "false" })).not.toThrow();
  });

  it("refuses GitHub Actions before privileged output can be emitted", () => {
    expect(() => assertLocalOperatorEnvironment({ GITHUB_ACTIONS: "true" })).toThrow(/must not run in GitHub Actions/);
    expect(() => assertLocalOperatorEnvironment({ GITHUB_ACTIONS: "TRUE" })).toThrow(/logs\/artifacts/);
  });
});
