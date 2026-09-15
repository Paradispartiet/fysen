# Oslo canonical catalog classification — round 4 — LETT

Date: 2026-09-15.

This is the fourth bounded implementation of the existing `core / coverage / redundant` audit policy. It follows the Peppes Pizza, Bislett Kebab House and McDonald's family passes. It is not a new intake round and does not treat repeated chain menus as repeated dish-value wins.

Canonical baseline before this classification: **735 manifests** on `a0e9e5223e5ba53167d911ee1e7f8f6293962c48`.

The baseline is closed:
- LETT Bislett repair catalog-health #171: **735/735 accepted**;
- production materialization #209: success with **0 blocking failures**;
- `lett-bislett-oslo`: **43 current items** against a minimum of 37, no missing required dishes and no forbidden dishes;
- post-McDonald's merge CI #2515: success.

## Finding

The catalog contains **9 LETT manifests**, and all nine are distinct physical Oslo restaurant identities:

| Canonical slug | Canonical address | Classification | Coverage role |
| --- | --- | --- | --- |
| `lett-aker-brygge-oslo` | Grundingen 1, 0250 Oslo | coverage | Aker Brygge / waterfront |
| `lett-bislett-oslo` | Thereses gate 52A, 0168 Oslo | coverage | Bislett / inner west |
| `lett-bogstadveien-oslo` | Bogstadveien 39D, 0365 Oslo | coverage | Bogstadveien / Majorstuen |
| `lett-frogner-oslo` | Frognerveien 8, 0257 Oslo | coverage | Frogner |
| `lett-grensen-oslo` | Akersgata 45, 0158 Oslo | coverage | Grensen / central |
| `lett-hegdehaugsveien-oslo` | Hegdehaugsveien 32, 0352 Oslo | coverage | Hegdehaugsveien / inner west |
| `lett-steen-strom-oslo` | Nedre Slottsgate 8, 0157 Oslo | coverage | Steen & Strøm / central |
| `lett-valkyrien-oslo` | Valkyriegata 3, 0366 Oslo | coverage | Valkyrien / Majorstuen |
| `lett-wessels-plass-oslo` | Akersgata 18, 0158 Oslo | coverage | Wessels plass / central |

The current first-party restaurant list also names three Oslo locations that are not canonical in Fysen:

- **Klingenberg — Klingenberggata 7**
- **Storo — Vitaminveien 11**
- **Sjølyst — Karenslyst Allé 9**

Source:
- https://lett.family/no/artikler/vare-restauranter

These three are **review** candidates only. This pass does not auto-onboard additional chain locations without separate demand, proximity, source and marginal-value evidence.

## Shared-concept evidence

The nine canonical locations expose strongly overlapping versions of the same LETT food concept: bowls, wraps, sandwiches, desserts and drinks. Existing completeness floors are tightly grouped at **37–44 items**, and representative assertions repeatedly overlap on the same dishes, including `Søtpotet feta bowl`, `Kylling Cæsar bowl`, `Spicy kylling wrap`, `Røbet chèvre wrap`, `Bris`, `Bananbrød` and `Hydrate Coconut water`.

The family therefore must not be counted as nine independent dish-coverage gains. Its canonical value is primarily proximity and physical service coverage.

## Aker Brygge address conflict — fail closed

LETT's current first-party restaurant list writes:

- **Aker Brygge — Grundingen 3**

Two independent authoritative/current surfaces support the existing canonical address instead:

- Aker Brygge's own venue page lists LETT at **Grundingen 1**:
  - https://www.akerbrygge.no/restaurant/lett
- Brønnøysund Register Centre lists the registered `LETT AKER BRYGGE` sub-entity at **Grundingen 1, 0250 Oslo**:
  - https://virksomhet.brreg.no/en/oppslag/underenheter/921847122

This round therefore **does not mutate** `lett-aker-brygge-oslo`. The conflict is recorded as an identity-review note. A future address repair requires stronger evidence that the physical storefront moved rather than a first-party text/address-number inconsistency.

## Classification result

- **core:** 0
- **coverage:** 9
- **redundant:** 0 removed in this round
- **dedupe:** 0
- **review:** Klingenberg, Storo and Sjølyst as non-canonical Oslo location gaps; Aker Brygge address-number conflict remains review-only
- **reject:** 0

No restaurant manifest, source URL, menu floor, quality assertion, parser, runtime, transport rule or production state is changed by this round.
