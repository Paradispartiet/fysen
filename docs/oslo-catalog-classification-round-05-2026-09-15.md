# Oslo canonical catalog classification — round 5 — JOE & THE JUICE

Date: 2026-09-15.

This is the fifth bounded implementation of the existing `core / coverage / redundant` audit policy. It follows the Peppes Pizza, Bislett Kebab House, McDonald's and LETT family passes. It is not a new intake round and does not treat repeated chain menus as repeated dish-value wins.

Canonical baseline before this classification: **735 manifests** on `a1eea010ee58b2affd734239162543c80ccee484`.

The baseline is closed:
- LETT repair catalog-health #171: **735/735 accepted**;
- production materialization #209: success with **0 blocking failures**;
- post-LETT-classification merge CI #2517: success.

## Finding

The catalog contains **9 JOE & THE JUICE manifests**, and all nine are distinct physical Oslo restaurant identities:

| Canonical slug | Address | Classification | Coverage role |
| --- | --- | --- | --- |
| `joe-the-juice-aker-brygge-oslo` | Stranden 1, 0250 Oslo | coverage | Aker Brygge / waterfront |
| `joe-the-juice-cc-vest-oslo` | Lilleakerveien 16, 0283 Oslo | coverage | CC Vest / west |
| `joe-the-juice-colosseum-oslo` | Essendrops gate 9, 0368 Oslo | coverage | Colosseum / Majorstuen |
| `joe-the-juice-frogner-oslo` | Skovveien 5, 0257 Oslo | coverage | Frogner |
| `joe-the-juice-nordstrand-oslo` | Nordstrandveien 40A, 1162 Oslo | coverage | Nordstrand / south |
| `joe-the-juice-oscars-gate-oslo` | Oscars gate 19, 0352 Oslo | coverage | Homansbyen / inner west |
| `joe-the-juice-skoyen-oslo` | Messepromenaden 2, 0279 Oslo | coverage | Skøyen |
| `joe-the-juice-storo-storsenter-oslo` | Vitaminveien 7-9, 0485 Oslo | coverage | Storo / north |
| `joe-the-juice-torggata-oslo` | Torggata 9A, 0181 Oslo | coverage | central east |

No pair shares a canonical address or coordinates.

## Shared-concept evidence

JOE & THE JUICE explicitly operates a shared international food/drink concept. Its current first-party menu states that the signature juice range is the same wherever a customer orders, while its store pages combine the same families of sandwiches, juices, shakes, bowls, porridge, coffee and baked goods.

Sources:
- https://www.joejuice.com/product-category/juice
- https://content.joejuice.com/locations/aker-brygge
- https://www.joejuice.com/news/joe-the-juice-launches-its-biggest-push-on-mornings-to-date

The nine canonical manifests show the same pattern. Completeness floors range from **65 to 90 items**, and representative assertions repeatedly overlap on sandwiches, bowls, juices/shakes, coffee, baked goods and bottled water.

The family therefore must not be counted as nine independent dish-coverage gains. Its canonical value is primarily physical/service coverage.

## Current non-canonical gap

JOE & THE JUICE currently publishes a dedicated first-party Oslo location page for **Bjørvika**:

- https://content.joejuice.com/locations/bjorvika

There is no `joe-the-juice-bjorvika-oslo` canonical manifest in the current 735-manifest catalog.

Bjørvika is therefore recorded as a **review** candidate only. This round does not auto-onboard it: a separate intake decision must prove current physical identity, a stable priced source, marginal coverage/demand value and the ordinary production contract.

This is not asserted to be an exhaustive census of every JOE location in Oslo; it is one first-party-proven current gap found during the bounded family pass.

## Classification result

- **core:** 0
- **coverage:** 9
- **redundant:** 0 removed in this round
- **dedupe:** 0
- **review:** Bjørvika as a first-party-proven non-canonical Oslo location gap
- **reject:** 0

No restaurant manifest, source URL, menu floor, quality assertion, parser, runtime, transport rule or production state is changed by this round.
