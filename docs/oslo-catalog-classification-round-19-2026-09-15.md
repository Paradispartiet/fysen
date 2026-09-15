# Oslo canonical catalog classification — round 19 — Døgnvill

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `6731adf3414493a6137ad2faa60cb4ab46bb0f71`.

This is the nineteenth bounded family pass from the Oslo quality audit.

## Current first-party Oslo footprint

Døgnvill's current first-party site identifies three Oslo restaurants:

- Bjørvika — Operagata 6, 0150 Oslo
- Vulkan — Vulkan 12, 0178 Oslo
- Tjuvholmen — Lille Stranden 10, 0252 Oslo

Sources:
- https://www.dognvillburger.no/kontakt
- https://www.dognvillburger.no/restaurant/bjorvika
- https://www.dognvillburger.no/restaurant/vulkan
- https://www.dognvillburger.no/restaurant/tjuvholmen

The canonical catalog contains the same three physical identities:

- `dognvill-bjorvika-oslo`
- `dognvill-vulkan-oslo`
- `dognvill-tjuvholmen-oslo`

All three canonical addresses match current first-party identities.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `dognvill-bjorvika-oslo` | coverage | keep |
| `dognvill-vulkan-oslo` | coverage | keep |
| `dognvill-tjuvholmen-oslo` | coverage | keep |

The three restaurants provide physical/proximity coverage. Their shared Døgnvill concept is not counted as three independent dish-value gains.

## No Oslo family gap

Døgnvill also operates in Stavanger, but that restaurant is outside Oslo municipality.

The Oslo first-party footprint and canonical family are 3-for-3 aligned. This round records no stale identity, dedupe, missing Oslo location or automatic intake candidate.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
