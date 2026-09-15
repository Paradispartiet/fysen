# Oslo canonical catalog classification — round 21 — Sabrura

Date: 2026-09-15.

Baseline: **733 canonical manifests** on `35784d6babfdcffbee7e2c78873c6c514d616922`.

This is the twenty-first bounded family pass from the Oslo quality audit and completes the original measured 21-family chain-classification queue.

## Current first-party Oslo footprint

Sabrura's current first-party restaurant pages identify three Oslo locations:

- Markveien — Markveien 67A, 0550 Oslo
- Stortorvet — Stortorvet 7, 0155 Oslo
- Valkyrien — Valkyriegaten 1-3, 0366 Oslo

Sources:
- https://sabrurasushi.no/restauranter/markveien/
- https://sabrurasushi.no/restauranter/stortorvet/
- https://sabrurasushi.no/restauranter/valkyrien/

The canonical catalog contains three Sabrura identities:

- `sabrura-markveien-oslo` — Markveien 67A, 0550 Oslo
- `sabrura-stortorvet-oslo` — Grensen 4, 0159 Oslo
- `sabrura-valkyrien-oslo` — Valkyriegata 1, 0366 Oslo

All three represent the same current physical locations as first-party.

## Stortorvet address alias — no mutation

Sabrura's public page uses **Stortorvet 7**, while canonical uses **Grensen 4**.

Independent evidence supports canonical `Grensen 4` for the Sabrura business identity:
- Brønnøysund registers Sabrura Stortorvet at Grensen 4;
- Wolt publishes Sabrura Stortorvet at Grensen 4;
- property documentation for the connected Stortorvet 7 / S7 complex includes Grensen 4 as part of the same building complex.

Sources:
- https://virksomhet.brreg.no/nb/oppslag/enheter/924499692
- https://wolt.com/nb/nor/oslo/restaurant/sabrura-stortorvet
- https://www.klpeiendom.no/eiendom/stortorvet-7/

This is treated as a public-facing entrance/complex-address alias, not move evidence. No canonical address mutation is made.

## Valkyrien address range — no mutation

Sabrura first-party publishes **Valkyriegaten 1-3**, while canonical uses **Valkyriegata 1**.

Valkyrien shopping centre is a merged property complex spanning the former Valkyriegata 1-3 properties and adjoining addresses. The two forms therefore resolve to the same physical centre/location.

Source:
- https://oslobilder.no/OMU/OB.FS1289a

No canonical address mutation is made.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `sabrura-markveien-oslo` | coverage | keep |
| `sabrura-stortorvet-oslo` | coverage | keep |
| `sabrura-valkyrien-oslo` | coverage | keep |

The three restaurants provide physical/proximity coverage. Their shared Sabrura concept is not counted as three independent dish-value gains.

## No Oslo family gap

The current first-party Oslo footprint and canonical family are 3-for-3 aligned.

This round records:
- no stale identity;
- no dedupe;
- no missing Oslo first-party location;
- no automatic intake candidate.

## Queue closure

With Sabrura classified, the original 21 measured chain families from the 2026-09-11 Oslo quality audit have all received a bounded canonical classification pass.

The next restaurant-quality task should therefore come from the remaining explicit quality/review queues rather than another unbounded chain sweep.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
