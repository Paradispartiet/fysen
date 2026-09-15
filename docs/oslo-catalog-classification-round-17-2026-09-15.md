# Oslo canonical catalog classification — round 17 — Bambus

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `875ab563549595846cc3f4798b682df0a2a32788`.

This is the seventeenth bounded family pass from the Oslo quality audit.

## Current first-party Oslo footprint

Bambus' current first-party restaurant/order surfaces support these canonical Oslo locations:

- Frogner — Niels Juels gate 29, 0257 Oslo
- Lambertseter Senter — Cecilie Thoresens vei 21, 1153 Oslo
- Thon Senter Storo — Vitaminveien 7-9, 0485 Oslo

Sources:
- https://www.bambussushi.no/restauranter/frognerveien/
- https://www.bambussushi.no/restauranter/lambertseter-senter/
- https://www.bambussushi.no/restauranter/thon-senter-storo/
- https://bambussushi.munu.shop/places

The canonical catalog contains the same three physical identities:

- `bambus-frogner-oslo`
- `bambus-lambertseter-oslo`
- `bambus-storo-oslo`

No stale canonical identity is found.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `bambus-frogner-oslo` | coverage | keep |
| `bambus-lambertseter-oslo` | coverage | keep |
| `bambus-storo-oslo` | coverage | keep |

The three restaurants provide physical/proximity coverage. Their shared Bambus concept is not counted as three independent dish-value gains.

## Byporten — review-only physical/service ambiguity

The current first-party ordering surface exposes two Bambus entries at the same physical address, Jernbanetorget 6, 0154 Oslo:

- Byporten Sushi
- Byporten Noodles

Bambus' own explanatory material also describes an Oslo-sentrum presence, but the two ordering entries appear to be separate service concepts sharing one physical address.

This is therefore recorded as a **review-only physical/service gap**, not as two automatic restaurant intakes. A later pass must establish whether Fysen should model:

- one physical Bambus Byporten restaurant with multiple menu/service surfaces;
- two independently useful concepts at one address; or
- another explicit canonical relationship.

No intake is performed in this round.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
