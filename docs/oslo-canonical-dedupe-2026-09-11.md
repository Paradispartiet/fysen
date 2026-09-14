# Oslo canonical restaurant dedupe — 2026-09-11

This resolution implements the 31 verified duplicate pairs from the Oslo quality audit.

Policy:
- preserve the earlier established canonical slug unless there is a stronger reason not to;
- quiesce removed slugs through the existing catalog coverage reconciliation after merge;
- retain first-party menu provenance where it is materially stronger;
- migrate stronger later menu contracts onto the stable canonical slug when they add real coverage;
- prevent recurrence in restaurant intake by checking physical identity in addition to slug.

## Canonical resolutions

1. `sushi-dinner-oslo` ← removed `dinner-sushi-oslo`
2. `heim-st-hanshaugen-oslo` ← removed `heim-st-hanshaugen`
3. `hys-sushi-bubble-tea-ensjo-oslo` ← removed `hys-sushi-bubble-tea-ensjo`
4. `kinabolle-ensjo-oslo` ← removed `kinabolle-ensjo`
5. `kjokken-kaffe-oslo-s-oslo` ← removed `kjokken-kaffe-oslo-s`
6. `lambertseter-kro-kinesisk-oslo` ← removed `lambertseter-kro-kinesisk-restaurant-oslo`
7. `lofthus-samvirkelag-torshov-oslo` ← removed `lofthus-samvirkelag-torshov`
8. `olearys-vika-oslo` ← removed `olearys-oslo-vika-oslo`
9. `oslo-kebab-pizzahus-oslo` ← removed `oslo-kebab-pizzahus`
10. `oslo-raw-frogner-oslo` ← removed `oslo-raw-frogner`
11. `oslo-tran-sushi-oslo` ← removed `oslo-tran-sushi`
12. `otsu-sushi-poke-bowl-sagene-oslo` ← removed `otsu-sushi-poke-bowl-sagene`
13. `sushi-og-thai-torshov-oslo` ← removed `sushi-thai-torshov`
14. `texas-grill-pizza-oslo` ← removed `texas-grill-og-pizza-oslo`
15. `yayas-vika-oslo` ← removed `yayas-restaurant-vika-oslo`
16. `aften-pizza-grill-storgata-oslo` ← removed `aften-pizza-grill-oslo`
17. `atelier-asian-tapas-mathallen-oslo` ← removed `atelier-asian-tapas-oslo`
18. `july-tea-food-pilestredet-oslo` ← removed `july-tea-food-oslo`
19. `la-pizza-la-pasta-majorstuen-oslo` ← removed `la-pizza-la-pasta-oslo`
20. `meraki-via-village-vika-oslo` ← removed `meraki-via-village-oslo`
21. `new-winny-kebab-grefsen-oslo` ← removed `new-winny-kebab-oslo`
22. `pizzeria-la-pietra-valerenga-oslo` ← removed `pizzeria-la-pietra-oslo`
23. `roots-of-india-grefsen-oslo` ← removed `roots-of-india-oslo`
24. `golden-mountain-radhusplassen-oslo` ← removed `golden-mountain-restaurant-oslo`
25. `green-taste-gamlebyen-oslo` ← removed `green-taste-oslo`
26. `grills-ville-frogner-oslo` ← removed `grills-ville-oslo`
27. `happy-time-grunerlokka-oslo` ← removed `happy-time-oslo`
28. `helt-vilt-vulkan-oslo` ← removed `helt-vilt-oslo`
29. `hoa-sen-hammersborggata-oslo` ← removed `hoa-sen-oslo`
30. `kims-kitchen-bislett-oslo` ← removed `kims-kitchen-oslo`
31. `kverneriet-solli-oslo` ← removed `kverneriet-solli-plass-oslo`

## Contract migrations

- `sushi-dinner-oslo` keeps its established slug and its previously proven 95-item canonical source; the broader duplicate source was reverted after post-merge production materialization returned `extraction_error` on the staged migration.
- `meraki-via-village-vika-oslo` keeps its established slug and its previously proven 13-item menu contract; the broader duplicate source was rejected after exact-head live validation returned 0/16.
- `oslo-raw-frogner-oslo` keeps its established slug and absorbs the complete postal address and later verification metadata from `oslo-raw-frogner`.
- `kinabolle-ensjo-oslo` and `kverneriet-solli-oslo` deliberately keep their first-party menu sources rather than replacing them with later secondary SeMeny duplicates.

## Production behavior

The permanent materializer calls `reconcileRestaurantCatalogCoverage()` after successful onboarding. Removed Oslo slugs are therefore deactivated and their enabled menu, hours and action sources are disabled transactionally. No direct production SQL mutation is required.

The intake workflow now rejects a new non-reproof candidate when it collides with a canonical menu source or with the same normalized address plus a strongly matching restaurant name. Different restaurants sharing a food-hall address are not rejected on address alone.

## Post-merge materialization repair

- The first dedupe materialization exposed two blocking source-health issues before coverage reconciliation could run.
- `sushi-dinner-oslo` is restored to the previously proven canonical source.
- `way-down-south-oslo` still publishes the same burgers on its first-party menu. Rendered validation exposed their current canonical labels as `Chicken Caesar Burger` and `Beef Cheek Burger, 130 g`; the stale spelling/format assertions are updated, and browser fetch is retained because it observes 21 current items versus 20 through the HTTP production pass.

## Residual exact-identity reconciliation — round 2

A complete 818-manifest identity pass found additional historical duplicates that predated the permanent intake collision guard. Round 2 removes 12 exact physical-identity duplicates. Every pair has the same restaurant name and coordinates, and the retained and removed manifests have identical source type, fetch mode, minimum item threshold, actions and quality assertions.

The established-slug policy therefore resolves these pairs without a menu-contract migration:

1. `8-fish-bokkerveien-oslo` ← removed `8-fish-oslo`
2. `american-burgers-hegdehaugsveien-oslo` ← removed `american-burgers-oslo`
3. `apsorn-thai-torshov-oslo` ← removed `apsorn-thai-restaurant-oslo`
4. `buns-sorenga-oslo` ← removed `buns-sorengkaia-oslo`
5. `baggis-burgers-vollebekk-oslo` ← removed `baggis-burgers-oslo`
6. `bamiyan-valley-gronland-oslo` ← removed `bamiyan-valley-oslo`
7. `birken-lunch-grunerlokka-oslo` ← removed `birken-lunch-oslo`
8. `boboko-via-village-oslo` ← removed `boboko-oslo`
9. `boom-sushi-trondheimsveien-oslo` ← removed `boom-sushi-oslo`
10. `braud-toastbar-grunerlokka-oslo` ← removed `braud-toastbar-oslo`
11. `cafe-laundromat-bislett-oslo` ← removed `cafe-laundromat-oslo`
12. `cafekontoret-gronland-oslo` ← removed `cafekontoret-oslo`

Catalog coverage reconciliation remains the production quiescence mechanism for the removed slugs. Later batches did not add stronger assertions to any of these pairs, and catalog-health #153 proved both sides of every pair green on the same pre-reconciliation baseline.

## Residual exact-identity reconciliation — round 3

Round 3 applies the same established-slug rule to the next 12 exact physical-identity duplicates. Every retained and removed pair again has identical source type, fetch mode, minimum item threshold, actions and quality assertions:

1. `chaiwala-gronland-oslo` ← removed `chaiwala-oslo`
2. `chaskka-solli-oslo` ← removed `chaskka-oslo`
3. `chili-og-wok-sentrum-oslo` ← removed `chili-og-wok-oslo`
4. `corrals-tacos-gronland-oslo` ← removed `corrals-tacos-oslo`
5. `crispy-clubs-storgata-oslo` ← removed `crispy-clubs-oslo`
6. `dr-gyros-bislett-oslo` ← removed `dr-gyros-smaken-av-hellas-oslo`
7. `drop-in-bjorvika-oslo` ← removed `drop-in-oslo`
8. `falafel-station-brugata-oslo` ← removed `falafel-station-oslo`
9. `fiorentino-gronland-oslo` ← removed `fiorentino-oslo`
10. `flavour-heimdalsgata-oslo` ← removed `flavour-oslo`
11. `foodie-restaurant-tordenskiolds-gate-oslo` ← removed `foodie-restaurant-oslo`
12. `freddy-fuego-burrito-bar-hausmanns-gate-oslo` ← removed `freddy-fuego-burrito-bar-oslo`

Catalog-health #154 proved the 806-manifest round-2 baseline at 806/806 accepted before this reconciliation. Coverage reconciliation remains responsible for quiescing the removed production identities after merge.

## Residual exact-identity reconciliation — round 4

Round 4 removes the next 12 exact physical-identity duplicates while preserving the established, place-specific canonical slugs. Each retained and removed pair has an identical full menu-source, action and quality contract, so no contract migration is required:

1. `french-tacos-burgers-torshov-oslo` ← removed `french-tacos-burgers-avenue-torshov-oslo`
2. `gohan-matcha-youngstorget-oslo` ← removed `gohan-matcha-oslo`
3. `helt-ratt-stockfleths-gate-oslo` ← removed `helt-ratt-oslo`
4. `hokkigai-sushi-st-hanshaugen-oslo` ← removed `hokkigai-sushi-oslo`
5. `kafe-asylet-gronland-oslo` ← removed `kafe-asylet-oslo`
6. `kemi-restaurant-brugata-oslo` ← removed `kemi-restaurant-oslo`
7. `king-falafel-brugata-oslo` ← removed `king-falafel-oslo`
8. `loasis-pizza-kebab-grunerlokka-oslo` ← removed `l-oasis-pizza-kebab-oslo`
9. `linns-sushi-frogner-oslo` ← removed `linns-sushi-oslo`
10. `mandi-house-toyen-oslo` ← removed `mandi-house-restaurant-oslo`
11. `meiwei-spiseri-tullins-gate-oslo` ← removed `meiwei-spiseri-oslo`
12. `mini-thai-sushi-majorstuen-oslo` ← removed `mini-thai-sushi-oslo`

Catalog-health #155 proved the 794-manifest round-3 baseline at 794/794 accepted before this reconciliation. Coverage reconciliation remains responsible for quiescing the removed production identities after merge.

## Residual exact-identity reconciliation — round 5

Round 5 removes the next 12 exact physical-identity duplicates while preserving the established, place-specific canonical slugs. Each retained and removed pair has the same restaurant name and coordinates, and identical menu-source, hours-source, action and quality contracts, so no contract migration is required:

1. `mr-potet-bryn-oslo` ← removed `mr-potet-oslo`
2. `mucho-mas-grunerlokka-oslo` ← removed `mucho-mas-oslo`
3. `nabo-kitchen-bar-majorstuen-oslo` ← removed `nabo-kitchen-bar-oslo`
4. `ng-bar-restaurant-grunerlokka-oslo` ← removed `ng-bar-restaurant-oslo`
5. `palazzo-pizzeria-grunerlokka-oslo` ← removed `palazzo-pizzeria-oslo`
6. `render-burger-grunerlokka-oslo` ← removed `render-burger-oslo`
7. `restaurant-kraft-kvaernerbyen-oslo` ← removed `restaurant-kraft-oslo`
8. `santa-rosa-majorstuen-oslo` ← removed `santa-rosa-oslo`
9. `sushi-express-parkveien-oslo` ← removed `sushi-express-oslo`
10. `sushi-special-bergensgata-oslo` ← removed `sushi-special-oslo`
11. `umami-sushi-rodelokka-oslo` ← removed `umami-sushi-oslo`
12. `yemen-zaad-restaurant-gronland-oslo` ← removed `yemen-zaad-restaurant-oslo`

Catalog-health #162 proved the 782-manifest round-4 baseline at 782/782 accepted before this reconciliation. Catalog coverage reconciliation remains responsible for quiescing the removed production identities after merge.

## Residual exact-identity reconciliation — round 6

Round 6 closes the remaining 13 `safe_exact_contract` pairs from the complete 770-manifest identity pass. Every pair has the same restaurant name and exact coordinates, and identical menu-source, hours-source, action and quality contracts. Git history also proves that the retained place-specific slug predates the later generic duplicate in every pair. Verification timestamps/notes may differ, but they do not change the source or quality contract, so no contract migration is required:

1. `mymy-sushi-prinsens-gate-oslo` ← removed `mymy-sushi-oslo`
2. `oslo-kebab-pizzahus-toyengata-oslo` ← removed `oslo-kebab-pizzahus-oslo`
3. `oslo-raw-adamstuen-oslo` ← removed `oslo-raw-cafe-and-bakery-adamstuen-oslo`
4. `pane-vino-trondheimsveien-oslo` ← removed `pane-vino-oslo`
5. `pappabuene-radhusbrygge-oslo` ← removed `pappabuene-oslo`
6. `pele-pele-gronland-oslo` ← removed `pele-pele-oslo`
7. `peoples-arbeidersamfunnets-plass-oslo` ← removed `peoples-oslo`
8. `sami-sushi-wok-bjerregaards-gate-oslo` ← removed `sami-sushi-wok-oslo`
9. `vesuvio-pizza-bjerregaards-gate-oslo` ← removed `vesuvio-pizza-oslo`
10. `winther-restaurant-aker-brygge-oslo` ← removed `winther-restaurant-oslo`
11. `yoyo-dumplings-noodles-bislett-oslo` ← removed `yoyo-dumplings-noodles-oslo`
12. `yum-cha-majorstuen-oslo` ← removed `yum-cha-oslo`
13. `zz-pizza-gamlebyen-oslo` ← removed `zz-pizza-oslo`

Catalog-health #163 proved the 770-manifest round-5 baseline at 770/770 accepted before this reconciliation. The expected canonical catalog after merge is 757 manifests. Catalog coverage reconciliation remains responsible for quiescing the removed production identities after merge.

The separate manual-contract-review queue is intentionally untouched by this round.


## Residual exact-identity reconciliation — round 7

Round 7 removes the 21 remaining alias-only physical-identity duplicates from the manual review queue. Catalog-health #164 attempt 2 proved the 757-manifest round-6 catalog fully healthy on exact `e9681d8bc1bbf3f4e01115dd188b4f43a73d2c89`. Git history keeps the older established identity in every pair; hours, actions and quality contracts remain unchanged, and only menu URL aliases / verification metadata differ. No source or quality migration is required. Expected canonical catalog after merge: **736 manifests**. Coverage reconciliation remains responsible for quiescing removed production identities.
