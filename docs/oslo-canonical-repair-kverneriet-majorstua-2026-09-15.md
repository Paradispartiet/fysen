# Oslo canonical duplicate repair — Kverneriet Majorstua

Date: 2026-09-15.

Baseline: **732 canonical manifests** on `52c7b5ca4aca24acb4bf1bc129e81783a557609f`.

This repair resolves one residual physical-identity duplicate discovered after the Villa Paradiso Majorstua cleanup.

## Duplicate pair

Both catalog entries resolve to the same Kverneriet restaurant at **Kirkeveien 64B, 0366 Oslo**:

- `kverneriet-majorstua-oslo`
- `kverneriet-majorstuen-oslo`

Their coordinates are effectively identical. Kverneriet's current first-party location and menu pages identify the restaurant as **Kverneriet Majorstua**.

Sources:
- https://kverneriet.com/majorstua/
- https://kverneriet.com/majorstua/menu/

## Canonical winner

Keep `kverneriet-majorstua-oslo`.

Reasons:
- it is the earlier established canonical identity;
- it matches the current first-party location naming and route;
- it uses Kverneriet's current first-party menu page;
- its physical identity and address match the later alias.

The retained first-party menu contract is not replaced by the later secondary source.

## Removed alias

Remove `kverneriet-majorstuen-oslo`.

The later alias represents the same physical restaurant and uses a secondary SeMeny source. It adds no distinct physical-location coverage.

Expected canonical catalog after merge: **731 manifests**.

## Production behavior

The existing catalog coverage reconciliation remains responsible for quiescing the removed `kverneriet-majorstuen-oslo` production identity and disabling any associated enabled source after merge. No direct production mutation is performed in this PR.

## Scope guard

No retained restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this repair.
