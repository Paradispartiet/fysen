# Oslo canonical catalog classification — round 1 — Peppes Pizza

Date: 2026-09-15.

This is the first bounded implementation of the existing `core / coverage / redundant` audit policy. It classifies one previously measured chain family before moving to the next family; it is not a new intake round and does not treat repeated chain menus as repeated dish-value wins.

Baseline before this repair: **736 canonical manifests** on `5f2cfc6946fe603e4180a0cafa999c25e13e5e62`.

## Finding

The current catalog contains 13 Peppes manifests, but only 12 distinct physical Oslo identities.

`peppes-pizza-stortingsgata-oslo` and `peppes-pizza-stortingsgaten-oslo` both resolve to:

- Stortingsgata 4, 0158 Oslo;
- latitude `59.91292328073435`;
- longitude `10.738467865838835`.

The established `peppes-pizza-stortingsgata-oslo` identity came from Oslo Batch 04. The later `peppes-pizza-stortingsgaten-oslo` alias was added in Batch 36.

The established manifest is retained because it is the older canonical identity and its Wolt contract is the cleaner dish-first source: its locked assertions are food items. The later SeMeny alias adds a larger observed floor but includes beverage rows such as `Urge 0,5l` and `Mer Fruktdrikk Appelsin` among its required assertions. Those extra rows are not stronger dish-first coverage and are not migrated.

Expected canonical catalog after the repair: **735 manifests**.

## Classification

The remaining 12 physical Peppes locations are classified as **coverage**, not `core` and not twelve independent units of new dish coverage.

| Canonical slug | Classification | Coverage role |
| --- | --- | --- |
| `peppes-pizza-stortingsgata-oslo` | coverage | central Oslo physical/service location |
| `peppes-pizza-oslo-s-oslo` | coverage | Oslo S / transport-hub physical location |
| `peppes-pizza-solli-plass-oslo` | coverage | Solli / west-central physical location |
| `peppes-pizza-skoyen-oslo` | coverage | Skøyen physical location |
| `peppes-pizza-roa-oslo` | coverage | Røa / west Oslo physical location |
| `peppes-pizza-tasen-oslo` | coverage | Tåsen / north Oslo physical location |
| `peppes-pizza-nydalen-oslo` | coverage | Nydalen physical location |
| `peppes-pizza-loren-oslo` | coverage | Løren physical location |
| `peppes-pizza-ensjo-oslo` | coverage | Ensjø / east-central physical location |
| `peppes-pizza-grorud-oslo` | coverage | Grorud / northeast Oslo physical location |
| `peppes-pizza-hauketo-oslo` | coverage | Hauketo / south Oslo physical location |
| `peppes-pizza-lambertseter-oslo` | coverage | Lambertseter / southeast Oslo physical location |

This classification preserves proximity and physical-service value while explicitly refusing to count the shared Peppes concept as twelve separate dish-first gains. No remaining location is removed merely because it belongs to a chain; a later consolidation requires concrete demand, proximity/action or shared-menu-model evidence.

## Recurrence guard

The duplicate escaped the intake identity check because the restaurant-name tokens `stortingsgata` and `stortingsgaten` were treated as unrelated even though the published canonical address was identical.

The permanent batch-intake identity matcher now canonicalizes Norwegian restaurant-name tokens ending in `gata` or `gaten` to the same `gate` form. The existing same-address requirement remains in place, so this does not turn a street-name similarity into a collision by itself.

No parser, menu floor, dish assertion, transport policy or source authority is weakened.
