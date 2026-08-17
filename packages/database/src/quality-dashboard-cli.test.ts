import { describe, expect, it } from "vitest";
import { outputDirectoryArgument } from "./quality-dashboard-cli.js";

describe("quality dashboard CLI arguments", () => {
  it("ignores pnpm's standalone argument separator", () => {
    expect(outputDirectoryArgument(["--", "reports"])).toBe("reports");
    expect(outputDirectoryArgument(["reports"])).toBe("reports");
  });

  it("falls back to reports when no output directory is supplied", () => {
    expect(outputDirectoryArgument([])).toBe("reports");
    expect(outputDirectoryArgument(["--"])).toBe("reports");
  });
});
