# Oslo canonical catalog classification — round 9 — Los Tacos

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `2255d1c022bbac4b050c7a43971a8a8ca721f60c`.

This is the ninth bounded family pass from the Oslo quality audit. It classifies the current Los Tacos Oslo footprint without treating repeated chain menus as repeated dish-first value.

## Current first-party Oslo footprint

Los Tacos currently lists twelve Oslo restaurants:

- Alexander Kiellands Plass
- Smestad
- Grünerløkka
- Majorstuen
- Aker Brygge
- Bjørvika
- Oslo City
- Torshov
- Storo
- Torggata
- Steen & Strøm
- Jernbanetorget

Source: https://www.lostacos.no/restaurant?order=ninito

The canonical catalog contains seven Los Tacos identities:

- `los-tacos-aker-brygge-oslo`
- `los-tacos-alexander-kiellands-plass-oslo`
- `los-tacos-bjorvika-oslo`
- `los-tacos-lokka-oslo`
- `los-tacos-majorstua-oslo`
- `los-tacos-smestad-oslo`
- `los-tacos-torshov-oslo`

All seven resolve to active first-party Oslo locations.

## Physical identity review

The current first-party pages support the same physical locations as canonical:

- Aker Brygge — Bryggetorget 14
- Alexander Kiellands Plass — Darres gate 1
- Bjørvika — Operagata 35
- Grünerløkka — Seilduksgata 17
- Majorstuen — Bogstadveien 64
- Smestad — Hoffsveien 92
- Torshov — Vogts gate 60

The canonical manifests sometimes keep a more precise unit suffix (`1A`, `64A`, `60A`). The first-party pages do not provide evidence that those more precise physical identities are wrong, so no address mutation is made.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `los-tacos-aker-brygge-oslo` | coverage | keep |
| `los-tacos-alexander-kiellands-plass-oslo` | coverage | keep |
| `los-tacos-bjorvika-oslo` | coverage | keep |
| `los-tacos-lokka-oslo` | coverage | keep |
| `los-tacos-majorstua-oslo` | coverage | keep |
| `los-tacos-smestad-oslo` | coverage | keep |
| `los-tacos-torshov-oslo` | coverage | keep |

The seven locations provide physical/proximity coverage. The shared Los Tacos concept is not counted as seven independent dish-value gains.

## Non-canonical first-party gaps

Five current Oslo locations have no canonical Los Tacos manifest:

- Oslo City — Stenersgata 1
- Storo
- Torggata — Torggata 18
- Steen & Strøm
- Jernbanetorget — Europarådets plass 1

These are recorded as **review-only gaps**. This round does not auto-intake them. Any later onboarding must separately prove current priced menu output, marginal geographic/demand value, and ordinary source/production contracts.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
