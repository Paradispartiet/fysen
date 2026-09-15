# Oslo canonical catalog classification — round 2 — Bislett Kebab House

Date: 2026-09-15.

This is the second bounded implementation of the existing `core / coverage / redundant` audit policy. It classifies the current Bislett Kebab House family after Peppes; it is not a new intake round and does not treat repeated chain menus as repeated dish-value wins.

Canonical baseline before this classification: **735 manifests** on `4cff9cd4ffbe414f3696d9cff3c36b29ced2fb33`.

The baseline is closed:
- catalog-health #171: **735/735 accepted**;
- production materialization #209: success with **0 blocking failures** and no coverage-reconcile drift;
- `lett-bislett-oslo`: 43 current items against a minimum of 37, with no missing required dishes.

## Finding

The catalog contains **9 Bislett Kebab House manifests**, and all nine are distinct physical Oslo restaurant identities:

| Canonical slug | Address | Classification | Coverage role |
| --- | --- | --- | --- |
| `bislett-kebab-house-bislett-oslo` | Hegdehaugsveien 2, 0167 Oslo | coverage | Bislett / inner west |
| `bislett-kebab-house-carl-berner-oslo` | Trondheimsveien 139A, 0570 Oslo | coverage | Carl Berner / inner northeast |
| `bislett-kebab-house-grunerlokka-oslo` | Thorvald Meyers gate 83A, 0552 Oslo | coverage | Grünerløkka / inner east |
| `bislett-kebab-house-kalbakken-oslo` | Trondheimsveien 391, 0953 Oslo | coverage | Kalbakken / Groruddalen |
| `bislett-kebab-house-majorstuen-oslo` | Bogstadveien 62B, 0366 Oslo | coverage | Majorstuen / west |
| `bislett-kebab-house-manglerud-oslo` | Plogveien 6, 0679 Oslo | coverage | Manglerud / southeast |
| `bislett-kebab-house-pilestredet-oslo` | Pilestredet 55A, 0350 Oslo | coverage | Pilestredet / Bislett-adjacent |
| `bislett-kebab-house-sandaker-oslo` | Sandakerveien 72C, 0484 Oslo | coverage | Sandaker / north |
| `bislett-kebab-house-tveita-oslo` | Tvetenveien 150, 0671 Oslo | coverage | Tveita / east |

Current first-party store evidence confirms these locations as active:
- https://www.bislettkebabhouse.no/our-stores
- https://www.bislettkebabhouse.no/bkhpickup

The first-party store list also currently names **Linderud** and **Prinsdal** as Oslo locations that are not canonical in Fysen. They remain **review** candidates only. This classification round does not auto-onboard chain locations without separate marginal-value / demand evidence.

## Shared-concept evidence

Bislett Kebab House publishes one brand-level menu taxonomy across kebab, burger, pizza, vegetarian, children, extras and drinks. Existing canonical manifests use location-specific service-menu sources, with observed minimum floors from 73 to 94 items.

The locked representative assertions also show substantial concept overlap. In particular:

- Grünerløkka;
- Pilestredet;
- Tveita

currently have the **same eight required dish assertions**.

That shared menu model means the family must not be counted as nine independent dish-coverage gains. Their value is primarily physical proximity and service coverage.

## Bislett versus Pilestredet

The canonical coordinates place Bislett and Pilestredet only about **250 metres apart**, but this is not a duplicate identity:

- first-party currently lists both stores separately;
- the chain history describes the original operation near Pilestredet and a later second location only a few blocks away;
- the addresses and canonical identities are distinct.

Both therefore remain `coverage`. Their unusually close proximity is a valid future demand/consolidation review signal, but not sufficient by itself for deletion.

History source:
- https://www.bislettkebabhouse.no/en/om-oss

## Classification result

- **core:** 0
- **coverage:** 9
- **redundant:** 0 removed in this round
- **dedupe:** 0
- **review:** Linderud and Prinsdal as non-canonical current-location gaps
- **reject:** 0

No restaurant manifest, source URL, menu floor, quality assertion, parser, runtime, transport rule or production state is changed by this round.
