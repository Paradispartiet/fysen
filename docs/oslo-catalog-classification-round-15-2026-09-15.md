# Oslo canonical catalog classification — round 15 — El Camino

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `fb0d98d05217e1b74a38947555e09e2f597bfa61`.

This is the fifteenth bounded family pass from the Oslo quality audit.

## Current first-party footprint

El Camino's current first-party location surface identifies four active Oslo restaurants:

- Barcode — Dronning Eufemias Gate 11
- Bogstadveien — Bogstadveien 20
- Frogner — Niels Juels Gate 31
- Skøyen — Karenslyst Allé 30, 0278 Oslo

The same first-party surface also lists **CC Vest — Lilleakerveien 16, 0283 Oslo** as **Opening Soon**.

Sources:
- https://elcamino.no/en/locations
- https://elcamino.no/en

The canonical catalog contains the same four active Oslo identities:

- `el-camino-barcode-oslo`
- `el-camino-bogstadveien-oslo`
- `el-camino-frogner-oslo`
- `el-camino-skoyen-oslo`

Canonical physical addresses match the active first-party locations.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `el-camino-barcode-oslo` | coverage | keep |
| `el-camino-bogstadveien-oslo` | coverage | keep |
| `el-camino-frogner-oslo` | coverage | keep |
| `el-camino-skoyen-oslo` | coverage | keep |

The four restaurants provide physical/proximity coverage. Their shared El Camino concept is not counted as four independent dish-value gains.

## CC Vest — future review signal

CC Vest is not treated as an active missing restaurant because first-party explicitly marks it **Opening Soon**.

It is recorded only as a **future review signal**. Any later onboarding must wait until the location is open and must separately prove:

- active physical identity;
- current priced menu output;
- marginal geographic/demand value;
- ordinary source and production contracts.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
