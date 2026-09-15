# Oslo canonical catalog classification — round 18 — Delicatessen

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `ae73172102ce1efad3468d5c36d34ec6ec7486af`.

This is the eighteenth bounded family pass from the Oslo quality audit.

## Current first-party Oslo footprint

Delicatessen's current first-party material identifies three Oslo restaurants:

- Aker Brygge — Holmens gate 2, 0250 Oslo
- Grünerløkka — Søndre gate 8, 0550 Oslo
- Majorstuen — Vibes gate 8, 0356 Oslo

Sources:
- https://delicatessen.no/aker-brygge/
- https://delicatessen.no/grunerlokka/
- https://delicatessen.no/majorstuen/
- https://delicatessen.no/om-oss/

The canonical catalog contains the same three physical identities:

- `delicatessen-aker-brygge-oslo`
- `delicatessen-grunerlokka-oslo`
- `delicatessen-majorstuen-oslo`

All three canonical addresses match current first-party identities.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `delicatessen-aker-brygge-oslo` | coverage | keep |
| `delicatessen-grunerlokka-oslo` | coverage | keep |
| `delicatessen-majorstuen-oslo` | coverage | keep |

The three restaurants provide physical/proximity coverage. Their shared Delicatessen concept is not counted as three independent dish-value gains.

## No Oslo family gap

Delicatessen also operates in Sandvika and Stavanger, but those are outside Oslo municipality and therefore outside this canonical family pass.

The Oslo first-party footprint and canonical family are 3-for-3 aligned. This round records:

- no stale identity;
- no dedupe;
- no missing Oslo first-party location;
- no automatic intake candidate.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
