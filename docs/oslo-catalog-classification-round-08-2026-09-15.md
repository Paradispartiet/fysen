# Oslo canonical catalog classification — round 8 — Fly Chicken

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `0740e74a249d8338c1838e804a77bbf2e60eeb2c`.

This is the eighth bounded family pass from the Oslo quality audit. It classifies the current Fly Chicken Oslo footprint without treating a repeated chain menu as repeated dish-first value.

## Current first-party Oslo footprint

Fly Chicken's current Oslo location page lists eight locations:

- Steen & Strøm — Kongens gate 23
- Linderud — Erich Mogensøns vei 38
- Oslo City — Stenersgata 1
- Torggata — Torggata 9A
- Storo — Vitaminveien 31
- CC Vest — Lilleakerveien 19
- Majorstuen — Kirkeveien 43
- Carl Berner — Trondheimsveien 133

Source: https://www.flychicken.no/oslo-locations

The canonical catalog contains seven Fly Chicken identities:

- `fly-chicken-carl-berner-oslo`
- `fly-chicken-kirkeveien-oslo`
- `fly-chicken-linderud-oslo`
- `fly-chicken-oslo-city-oslo`
- `fly-chicken-steen-strom-oslo`
- `fly-chicken-storo-oslo`
- `fly-chicken-torggata-oslo`

All seven resolve to the same physical Oslo locations as the current first-party list. No dedupe or deletion is indicated.

## Postcode conflicts — preserve canonical fail-closed

Three Fly Chicken first-party pages publish postcodes that conflict with independent exact-address evidence:

- Carl Berner: first-party `0565`; canonical `0571`
- Majorstuen / Kirkeveien 43: first-party `0360`; canonical `0368`
- Storo / Vitaminveien 31: first-party `0484`; canonical `0485`

Independent Brønnøysund address records support the existing canonical postcodes:

- Fly Chicken Carl Berner is registered at Trondheimsveien 133, **0571 Oslo**;
- Sameiet Kirkeveien 43-45 is registered at Kirkeveien 43, **0368 Oslo**;
- businesses at Vitaminveien 31 are registered at **0485 Oslo**.

Sources:
- https://virksomhet.brreg.no/nb/oppslag/underenheter/931089242
- https://virksomhet.brreg.no/nb/oppslag/enheter/912662322
- https://virksomhet.brreg.no/nb/oppslag/enheter/920340954

The family pass therefore makes no address mutation. A current first-party location label is not combined with a conflicting postcode when exact-address registry evidence supports the existing canonical identity.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `fly-chicken-carl-berner-oslo` | coverage | keep |
| `fly-chicken-kirkeveien-oslo` | coverage | keep |
| `fly-chicken-linderud-oslo` | coverage | keep |
| `fly-chicken-oslo-city-oslo` | coverage | keep |
| `fly-chicken-steen-strom-oslo` | coverage | keep |
| `fly-chicken-storo-oslo` | coverage | keep |
| `fly-chicken-torggata-oslo` | coverage | keep |

These seven physical locations provide geographic/service coverage. Their shared Fly Chicken menu concept is not counted as seven independent dish-value gains.

## Non-canonical first-party gap

Fly Chicken currently lists **CC Vest — Lilleakerveien 19, 0283 Oslo**, but there is no canonical Fly Chicken CC Vest manifest.

CC Vest is recorded as a **review-only gap**. This round does not auto-intake it. Any later onboarding must prove current priced menu output, marginal geographic/demand value, and the normal source/production contracts.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
