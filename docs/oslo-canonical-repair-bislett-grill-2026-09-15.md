# Oslo canonical repair — Bislett Grill

Date: 2026-09-15.

Baseline: 725 canonical manifests on `77b7b2e6780bc67ac55d92dce6b62a622b57c3a9`.

## Consolidation

Keep and repair:
- `bislett-grill-oslo`

Remove:
- `bislett-grill-hegdehaugsveien-oslo`

The two manifests carried the same SE MENY source, the same 51-item floor and identical required dish assertions, so they represented one menu contract rather than two restaurants. The first exact-head Wolt proof then measured the migrated contract at 47 canonical items and exposed three source-specific assertion differences; those measured differences are incorporated on the same PR.

The older location-specific slug is not retained because its physical label is stale. Current Wolt publishes Bislett Grill at Pilestredet 63, 0350 Oslo, while Hegdehaugsveien 2 is currently the Bislett Kebab House Bislett address. The generic slug is therefore the safer stable identity for the repaired location.

The retained manifest is updated to:
- address: Pilestredet 63, 0350 Oslo;
- coordinates: 59.92403, 10.73107;
- menu source: https://wolt.com/nb/nor/oslo/restaurant/bislett-grill;
- exact-head Wolt proof observes 47 canonical items, so the minimum is aligned from 51 to 47;
- two pizza assertions are aligned to Wolt's canonical numbered titles (`3. Ham time`, `17. Chicken n'Beef`);
- the absent `Villa 1,5L` assertion is replaced by observed `200g Smash` at 84 kr.

Current evidence:
- Wolt Bislett Grill: https://wolt.com/nb/nor/oslo/restaurant/bislett-grill
- SE MENY legacy listing: https://semeny.no/public/sted/bislettgrillleveresavrestauranten
- Brønnøysund address unit, Pilestredet 63: https://virksomhet.brreg.no/nb/oppslag/underenheter/995694301

Expected canonical catalog after merge: 724 manifests.

This is an address/source consolidation, not a simple alias deletion. No parser, validator or runtime behavior is changed.
