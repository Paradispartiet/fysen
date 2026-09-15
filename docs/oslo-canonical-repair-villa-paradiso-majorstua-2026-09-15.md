# Oslo canonical duplicate repair — Villa Paradiso Majorstua

Date: 2026-09-15.

Baseline: **733 canonical manifests** on `7f1fe7fd11196c4a9f8234182e2f1bcb0fcbf4a1`.

This repair resolves one residual physical-identity duplicate discovered after the 21-family classification queue was closed.

## Duplicate pair

Both catalog entries resolve to the same Villa Paradiso restaurant at **Jacob Aalls gate 28**:

- `villa-paradiso-majorstua-oslo`
- `villa-paradiso-majorstuen-oslo`

Their coordinates are effectively identical, and Villa Paradiso's current first-party location page identifies the restaurant as **Villa Paradiso Majorstua** at Jacob Aalls gate 28.

Source:
- https://www.villaparadiso.no/restauranter/majorstua

## Canonical winner

Keep `villa-paradiso-majorstua-oslo`.

Reasons:
- it is the earlier established canonical identity;
- it has the current Villa Paradiso first-party location URL;
- its menu contract uses Villa Paradiso's linked first-party PDF;
- it already carries the stable `majorstua` slug used by the first-party route.

The retained manifest is not weakened or replaced by the later secondary menu source.

## Removed alias

Remove `villa-paradiso-majorstuen-oslo`.

The later alias represents the same physical restaurant and uses the weaker secondary SeMeny source. It adds no distinct physical-location coverage.

Expected canonical catalog after merge: **732 manifests**.

## Production behavior

The existing catalog coverage reconciliation remains responsible for quiescing the removed `villa-paradiso-majorstuen-oslo` production identity and disabling any associated enabled source after merge. No direct production mutation is performed in this PR.

## Scope guard

No retained restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this repair.
