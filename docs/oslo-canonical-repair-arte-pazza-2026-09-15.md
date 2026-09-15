# Oslo canonical repair — Arte Pazza

Date: 2026-09-15.

Baseline: 723 canonical manifests on `c6d76552f00b38123a6e9932dfb2fcc2fb8e49c9`.

## Two physical locations

Keep unchanged:
- `arte-pazza-pizza-parkveien-oslo`
- Parkveien 10, 0350 Oslo
- pizza/takeaway contract

Repair:
- `arte-pazza-pizza-pasta-oslo`
- move physical identity from Parkveien 10 to Ullevålsveien 61, 0171 Oslo
- coordinates: 59.926388, 10.738349
- set first-party website: https://www.artepazza.no/
- migrate menu source to https://wolt.com/nb/nor/oslo/restaurant/arte-pazza-filetto-ristorante

Current first-party evidence explicitly distinguishes the two Oslo locations: Parkveien is the pizza/takeaway address, while Ullevålsveien is the restaurant with pizza, pasta and table service. Current Wolt and Foodora likewise publish Arte Pazza Pizza Pasta at Ullevålsveien 61.

The existing Pizza Pasta manifest carried the full restaurant contract but was incorrectly attached to Parkveien 10. This repair preserves both physical locations instead of treating them as aliases.

The first exact-head Wolt proof measured **36 canonical items** rather than the old 50-item SE MENY floor. It also proved that six legacy assertions were source-specific/stale on the migrated contract.

The same PR therefore aligns the contract to the measured Wolt output:
- minimum expected items: **50 → 36**;
- retain `🌱 Insalata del Giorno/ dagens salat liten` at 65 kr and `Nduja` at 265 kr;
- replace the six missing legacy assertions with observed Wolt items spanning antipasto, pasta, house pizza, vegetarian pizza and side coverage: `Carpaccio Classico`, `Tagliatelle di Scampi`, `* Arte Pazza`, `Pizza Sud-Nord`, `* Margherita 🌱` and `Hvitløksbrød`.

No assertion is inferred from the public page alone; every replacement is taken directly from the validator's exact-head observed dish set and price output.

Expected canonical catalog after merge: 723 manifests.

No parser, validator or runtime behavior is changed.
