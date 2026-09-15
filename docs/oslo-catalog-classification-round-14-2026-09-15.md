# Oslo canonical catalog classification — round 14 — Egon

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `299a44f81cbe90fc1f9d290ec4923bad53102bd2`.

This is the fourteenth bounded family pass from the Oslo quality audit.

## Current first-party Oslo footprint

Egon's current Oslo restaurant and booking surfaces identify five Oslo restaurants:

- Egon Byporten — Jernbanetorget 6, 0154 Oslo
- Egon Karl Johan — Karl Johans gate 37, 0162 Oslo
- Egon Nordstrand — Ekebergveien 228 B, 1162 Oslo
- Egon Storo — Vitaminveien 9-11, 0485 Oslo
- Egon Ullevål — Sognsveien 77c, 0855 Oslo

Sources:
- https://egon.no/restauranter/oslo
- https://ordering.egon.no/booking-restauranter/

The canonical catalog contains the same five physical identities:

- `egon-byporten-oslo`
- `egon-karl-johan-oslo`
- `egon-nordstrand-oslo`
- `egon-storo-oslo`
- `egon-ulleval-oslo`

The canonical addresses match the current first-party identities. Differences such as `228B` versus `228 B` and `77C` versus `77c` are formatting only.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `egon-byporten-oslo` | coverage | keep |
| `egon-karl-johan-oslo` | coverage | keep |
| `egon-nordstrand-oslo` | coverage | keep |
| `egon-storo-oslo` | coverage | keep |
| `egon-ulleval-oslo` | coverage | keep |

The five restaurants provide physical/proximity coverage. Their shared Egon concept is not counted as five independent dish-value gains.

## No family gap

The current first-party Oslo footprint and canonical family are 5-for-5 aligned. This round therefore records:

- no dedupe;
- no stale/closed canonical identity;
- no missing first-party Oslo location;
- no automatic intake candidate.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
