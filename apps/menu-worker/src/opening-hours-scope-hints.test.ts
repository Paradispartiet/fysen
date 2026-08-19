import { describe, expect, it } from "vitest";
import {
  OPENING_HOURS_SCOPE_HINT_RESOLVER_VERSION,
  resolveOpeningHoursScopeHints,
} from "./opening-hours-scope-hints.js";

describe("opening-hours scope hint priority", () => {
  it("uses explicit scope hints alone when they are present", () => {
    expect(OPENING_HOURS_SCOPE_HINT_RESOLVER_VERSION).toBe("scope-priority-v1");
    expect(
      resolveOpeningHoursScopeHints(
        ["Pizzeria"],
        ["https://www.cueoslo.no/meny", "cue-thorvald-meyers-gate-oslo", "Cue Oslo"],
      ),
    ).toEqual(["Pizzeria"]);
  });

  it("uses URL, slug and restaurant identity only as fallback when explicit scope is empty", () => {
    expect(
      resolveOpeningHoursScopeHints(
        [],
        ["https://example.no/storgata", "restaurant-storgata", "Restaurant Storgata"],
      ),
    ).toEqual(["https://example.no/storgata", "restaurant-storgata", "Restaurant Storgata"]);
  });

  it("trims blanks and removes exact duplicates without changing priority", () => {
    expect(
      resolveOpeningHoursScopeHints(
        ["  Pizzeria  ", "", "Pizzeria"],
        ["Cue Oslo"],
      ),
    ).toEqual(["Pizzeria"]);
  });
});
