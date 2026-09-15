# Oslo canonical catalog classification — round 13 — Olivia

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `5496b939a45645e5a0c0b8fa3235e05cd6c2171f`.

This is the thirteenth bounded family pass from the Oslo quality audit.

## Current first-party Oslo footprint

Olivia's current first-party restaurant selector lists exactly five Oslo restaurants:

- Aker Brygge
- Tjuvholmen
- Hegdehaugsveien
- Østbanehallen
- Eger

Source: https://oliviarestauranter.no/restauranter/

The canonical catalog contains the same five Olivia identities:

- `olivia-aker-brygge-oslo`
- `olivia-tjuvholmen-oslo`
- `olivia-hegdehaugsveien-oslo`
- `olivia-ostbanehallen-oslo`
- `olivia-eger-oslo`

Current first-party pages continue to support the physical identities used by canonical, including:
- Aker Brygge — Stranden 3, 0250 Oslo
- Hegdehaugsveien — Hegdehaugsveien 34, 0352 Oslo
- Østbanehallen — Jernbanetorget 1, 0154 Oslo
- Eger — Karl Johans gate 23, 0159 Oslo
- Tjuvholmen — Bryggegangen 4, 0252 Oslo

Sources:
- https://oliviarestauranter.no/restauranter/aker-brygge/
- https://oliviarestauranter.no/restauranter/hegdehaugsveien/
- https://oliviarestauranter.no/restauranter/ostbanehallen/
- https://oliviarestauranter.no/restauranter/eger/
- https://oliviarestauranter.no/restauranter/tjuvholmen/

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `olivia-aker-brygge-oslo` | coverage | keep |
| `olivia-tjuvholmen-oslo` | coverage | keep |
| `olivia-hegdehaugsveien-oslo` | coverage | keep |
| `olivia-ostbanehallen-oslo` | coverage | keep |
| `olivia-eger-oslo` | coverage | keep |

The five restaurants provide physical/proximity coverage. Their shared Olivia concept and largely shared menu contract are not counted as five independent dish-value gains.

## Pronto is a separate concept

Olivia's first-party site also lists **Pronto Oslo S** and **Pronto Storo**, explicitly described as a separate on-the-go concept. They are not missing Olivia restaurant identities and are not included in this family count.

This round therefore records **no Olivia gap**.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
