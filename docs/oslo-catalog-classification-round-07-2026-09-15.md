# Oslo canonical catalog classification — round 7 — Subway

Date: 2026-09-15.

Baseline: **735 canonical manifests** on `a61825f6d6e134a30c1c7aff68e64d96578019d4`.

This is the seventh bounded `core / coverage / redundant / review / reject` family pass from the Oslo quality audit. It does not start a new intake batch and does not count a repeated chain menu as repeated dish-first value.

## Current first-party Oslo footprint

Subway's current Oslo locator lists eight locations:

- Lille Grensen — Akersgata 43, 0158 Oslo
- Bogstadveien — Bogstadveien 41, 0366 Oslo
- Linderud Senter — Erich Mogensøns vei 38, 0594 Oslo
- Pilestredet — Pilestredet 41C, published by Subway as 0167 Oslo
- Galleriet — Schweigaards gate 6, 0185 Oslo
- Skippergata — Skippergata 25A, 0154 Oslo
- Stovner Senter — Stovner Senter 3, 0985 Oslo
- Tveita Senter — Tvetenveien 150, 0671 Oslo

Source: https://restaurants.subway.com/no/norge/oslo

The canonical catalog before this round contains eight Subway manifests:

- `subway-bogstadveien-oslo`
- `subway-byporten-oslo`
- `subway-galleriet-oslo`
- `subway-lambertseter-oslo`
- `subway-linderud-senter-oslo`
- `subway-pilestredet-oslo`
- `subway-skippergata-oslo`
- `subway-tveita-senter-oslo`

Six physical locations overlap directly between the current Subway locator and canonical catalog: Bogstadveien, Galleriet, Linderud Senter, Pilestredet, Skippergata and Tveita Senter.

## Lambertseter — reject / remove stale identity

`subway-lambertseter-oslo` is absent from Subway's current Oslo locator.

This absence is independently corroborated by Lambertseter Senter owner OBOS. In its 2025-10-17 center update, OBOS states that Subway was among the tenants that had been discontinued or were on the way out during the center changes.

Source: https://kommunikasjon.ntb.no/pressemelding/18690323/utvidet-senter-ga-utvidet-omsetning?lang=no&publisherId=10510398

That combination is strong enough to classify the canonical Lambertseter identity as **reject / stale closed location** rather than geographic coverage. The manifest is removed in this round. Production quiescence remains the responsibility of the existing catalog coverage reconciliation after merge.

Expected catalog after merge: **734 manifests**.

## Byporten — review, preserve fail-closed

`subway-byporten-oslo` is also absent from Subway's current Oslo locator, but the evidence is conflicting rather than conclusive:

- Byporten's own 2025 holiday-hours page still listed Subway as an operating tenant;
- Brønnøysund still exposes the `SUBWAY BYPORTEN` under-unit at Jernbanetorget 6.

Sources:
- https://byporten.no/apningstider-helligdager-mai-og-juni-2025/
- https://virksomhet.brreg.no/nb/oppslag/underenheter/917295913

The canonical Byporten manifest therefore remains in place and is classified **review**. It must not be removed until current closure/move evidence is stronger than the conflicting tenant/registry evidence.

## Pilestredet postcode conflict — no mutation

Subway's own location page currently publishes Pilestredet 41C as **0167 Oslo**, while the canonical manifest uses **0166 Oslo**.

Independent address evidence supports the canonical postcode for the exact building:
- Brønnøysund business-address records publish Pilestredet 41C, 0166 Oslo;
- property/address sources also place Pilestredet 41C in 0166.

The manifest therefore remains unchanged. This pass does not create a hybrid first-party/address-registry identity.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `subway-bogstadveien-oslo` | coverage | keep |
| `subway-galleriet-oslo` | coverage | keep |
| `subway-linderud-senter-oslo` | coverage | keep |
| `subway-pilestredet-oslo` | coverage | keep |
| `subway-skippergata-oslo` | coverage | keep |
| `subway-tveita-senter-oslo` | coverage | keep |
| `subway-byporten-oslo` | review | preserve pending stronger current status proof |
| `subway-lambertseter-oslo` | reject | remove stale/closed canonical identity |

The six retained coverage locations represent physical/proximity value, not six independent dish-value gains from a shared chain menu.

## Non-canonical first-party locations

The current first-party locator also proves two Oslo locations with no canonical manifest:

- Lille Grensen — Akersgata 43;
- Stovner Senter — Stovner Senter 3.

Both are recorded as **review-only gaps**. This classification pass does not auto-intake them. Any later onboarding must separately prove current priced menu output, marginal geographic/demand value, and normal production contracts.

## Scope guard

This round changes no parser, extractor, transport policy, menu URL, menu floor, required dish assertion, or runtime behavior. It removes only the strongly evidenced stale Lambertseter identity and documents the bounded family classification.
