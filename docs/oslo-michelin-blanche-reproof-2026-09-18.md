# Brasserie Blanche Michelin coverage reproof — 2026-09-18

Brasserie Blanche was re-tested as a remaining Oslo MICHELIN coverage gap after round 2 had held it in review because production source acquisition failed.

## Source state

The current first-party homepage publishes a substantial current à-la-carte directly in HTML with individually priced starters, mains and desserts.

The public site writes the venue address as `Josefinesgate 23, 0351 Oslo`. Kartverket resolution failed on that spelling. The registered address form `Josefines gate 23, 0351 Oslo` was therefore used for canonical geocoding; no restaurant identity changed.

## Exact-head proof

Exact head: `66eb741fe5639fc28b024c7b5d0bbef0d9a09fa7`

- CI #2946: success
- Restaurant batch intake #949: success
- requested: 1
- generated: 1
- failed: 0
- strict validation: 1 accepted / 0 failed
- live source: HTTP 200
- generated item floor: 9
- exact-head artifact digest: `sha256:4316ebaf696a89b05c07a2f4e4e774cac1b5d8bcf9d4d6bdedbcfdb65472f0ba`

## Semantic artifact QA

The workflow result is technically valid but not promotion-ready. The generated canonical output contains parallel language versions of the same menu concepts as separate dishes, including:

- `Kalvesnitzel med erter` and `Wiener Schnitzel` — both 465 NOK
- `CONFITERT ANDELÅR med SAVOYKÅL` and `Confit duck leg` — both 465 NOK
- `Pannestekt piggvar med EDAMAME` and `Pan-seared turbot` — both 545 NOK

This is the same bilingual structural class now also observed on Festningen Restaurant. Workflow-green remains necessary but not sufficient for canonical promotion.

## Decision

Brasserie Blanche remains `review`.

The original round-2 blocker is closed: source acquisition works. The remaining blocker is generic bilingual semantic de-duplication / source scoping. No restaurant-specific parser exception, manual assertion bypass or weakened floor is introduced.
