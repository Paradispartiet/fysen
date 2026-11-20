import assert from "node:assert/strict";
import test from "node:test";
import { menuEvidenceLabel } from "../lib/menu-evidence-label.ts";

test("live menu coverage only describes fetched menu evidence", () => {
  assert.equal(menuEvidenceLabel("live", 1), "Registrert hos 1 restaurant i de hentede menyene");
  assert.equal(menuEvidenceLabel("live", 2), "Registrert hos 2 restauranter i de hentede menyene");
  assert.equal(menuEvidenceLabel("live", 0), "Rettforslag · ingen treff i de hentede menyene");
});

test("archive findings cannot be described as current restaurant availability", () => {
  const label = menuEvidenceLabel("archive", 3);
  assert.match(label, /Arkivert menytreff hos 3 restauranter/u);
  assert.match(label, /ikke bekreftet nå/u);
  assert.equal(menuEvidenceLabel("archive", 0),
    "Rettforslag · ikke funnet i det kontrollerte menyarkivet");
});

test("unexamined catalog examples and unavailable coverage cannot become false zero counts", () => {
  assert.equal(menuEvidenceLabel("unchecked", 0),
    "Rettforslag · ikke kontrollert mot menyarkivet");
  assert.equal(menuEvidenceLabel("unavailable", 0),
    "Rettforslag · menydekning utilgjengelig");
  for (const kind of ["unchecked", "unavailable"]) {
    const label = menuEvidenceLabel(kind, 0);
    assert.doesNotMatch(label, /ingen treff|ikke funnet|registrert hos/u);
  }
});
