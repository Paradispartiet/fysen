# Oslo canonical catalog classification — round 3 — McDonald's

Date: 2026-09-15.

This is the third bounded implementation of the existing `core / coverage / redundant` audit policy. It follows the Peppes Pizza and Bislett Kebab House family passes. It is not a new intake round and does not treat repeated chain menus as repeated dish-value wins.

Canonical baseline before this classification: **735 manifests** on `1455b5ccb8f00119da4be06c73f9e5d6f4abf786`.

The baseline is closed:
- LETT repair baseline catalog-health #171: **735/735 accepted**;
- production materialization #209: success with **0 blocking failures**;
- post-Bislett-Kebab-House merge CI #2513: success.

## Finding

The catalog contains **9 McDonald's manifests**, and all nine are distinct physical Oslo restaurant identities:

| Canonical slug | Address | Classification | Coverage role |
| --- | --- | --- | --- |
| `mcdonalds-alna-senter-oslo` | Strømsveien 245, 0668 Oslo | coverage | Alna / east |
| `mcdonalds-bryn-senter-oslo` | Østensjøveien 79, 0667 Oslo | coverage | Bryn / southeast |
| `mcdonalds-cc-vest-oslo` | Lilleakerveien 16, 0283 Oslo | coverage | CC Vest / west |
| `mcdonalds-furuset-oslo` | Tevlingveien 17, 1081 Oslo | coverage | Furuset / east |
| `mcdonalds-grorud-oslo` | Grorudveien 73, 0976 Oslo | coverage | Grorud / northeast |
| `mcdonalds-klingenberggaten-oslo` | Klingenberggata 4, 0161 Oslo | coverage | central west |
| `mcdonalds-majorstuen-oslo` | Valkyriegata 13A, 0366 Oslo | coverage | Majorstuen / west-central |
| `mcdonalds-storgata-oslo` | Storgata 15, 0155 Oslo | coverage | central east |
| `mcdonalds-thv-meyersgate-oslo` | Thorvald Meyers gate 35-41, 0555 Oslo | coverage | Grünerløkka / inner east |

No pair shares a canonical address or coordinates.

The closest canonical pair is Klingenberggata / Storgata at about **0.87 km** straight-line distance. Alna Senter / Furuset are about **1.29 km** apart. Those are useful proximity-review signals, not duplicate-identity evidence.

## Shared-concept evidence

McDonald's is explicitly operated as one national restaurant brand. The Norwegian first-party restaurant locator requires users to select an individual restaurant, while the consumer menu/app model is chain-level and then location-selected:

- https://www.mcdonalds.com/no/nb-no/finn-oss.html
- https://www.mcdonalds.com/no/nb-no/hos-oss/mcapp.html
- https://www.mcdonalds.com/no/nb-no/om-oss/om-mcdonalds.html

The nine canonical manifests likewise use location-specific service-menu sources, but their locked menus are variants of the same McDonald's concept. Minimum observed menu floors range from **82 to 139 items** and the representative assertions repeatedly cover the same product families: burgers, chicken/fish, wraps, vegetarian products, sides, drinks and desserts.

The family therefore must not be counted as nine independent dish-coverage gains. Its canonical value is primarily physical/service coverage.

## Classification result

- **core:** 0
- **coverage:** 9
- **redundant:** 0 removed in this round
- **dedupe:** 0
- **review:** 0 new locations created by this pass
- **reject:** 0

The two central restaurants and the two east-Oslo near-neighbours remain `coverage` because current evidence proves distinct physical identities. A future consolidation would require demand, action/service differentiation and shared-menu evidence strong enough to show that removing one location does not materially reduce user value.

This round deliberately does **not** derive a new intake queue from partial location surfaces such as charging-station lists. New McDonald's locations require the same separate marginal-value / demand review as any other coverage candidate.

No restaurant manifest, source URL, menu floor, quality assertion, parser, runtime, transport rule or production state is changed by this round.
