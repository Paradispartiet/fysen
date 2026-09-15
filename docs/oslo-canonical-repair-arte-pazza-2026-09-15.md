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

The existing 50-item floor and assertions are initially retained and must be proven against the new Wolt contract on the exact PR head. Any measured source-specific drift will be corrected only from validator evidence.

Expected canonical catalog after merge: 723 manifests.

No parser, validator or runtime behavior is changed.
