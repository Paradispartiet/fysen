# Oslo canonical duplicate repair — Smash by Ghost Town

Date: 2026-09-15.

Baseline: **731 canonical manifests** on `e59be0499c1f8d8ab060f25bae39f60de1d9fe26`.

This repair resolves one residual physical-identity duplicate after the Kverneriet Majorstua cleanup.

## Duplicate pair

Both catalog entries represent the same Smash by Ghost Town restaurant in Thorvald Meyers gate:

- `smash-by-ghost-town-grunerlokka-oslo`
- `smash-by-ghost-town-oslo`

The two manifests use the same SeMeny source, the same 28-item floor, the same eight required dish names/prices, and the same coordinates to practical precision.

Current public menu:
- https://semeny.no/sted/590smashbyghosttown

## Canonical winner

Keep `smash-by-ghost-town-oslo`.

The registered restaurant company, SMASH BY GHOST TOWN AS (org. no. 932 459 248), is registered at **Thorvald Meyers gate 73A, 0552 Oslo**. The retained manifest uses that address, while the removed older alias uses 73B.

Company-status evidence:
- https://www.proff.no/selskap/smash-by-ghost-town-as/oslo/serveringssteder/IFF5U5S0DRM
- https://forvalt.no/Konkurs/Firmadetaljer/932459248/663478

## Operating-status note

SMASH BY GHOST TOWN AS entered bankruptcy on **2026-09-01**. That is recorded as a separate operating-status signal and is not treated here as sufficient evidence to remove the physical restaurant entirely, because the current public menu source still publishes the restaurant/menu.

This PR therefore performs only canonical deduplication. Any later full closure/removal must be based on fresh operating evidence and handled independently.

## Removed alias

Remove `smash-by-ghost-town-grunerlokka-oslo`.

It represents the same physical restaurant, uses the same menu contract and assertions, and carries the less precise 73B address.

Expected canonical catalog after merge: **730 manifests**.

## Production behavior

The existing catalog coverage reconciliation remains responsible for quiescing the removed alias in production after merge. No direct production mutation is performed in this PR.

## Scope guard

No retained restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this repair.
