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

- `sushi-dinner-oslo` keeps its established slug and absorbs the broader 170-item menu source/assertion contract from `dinner-sushi-oslo`.
- `meraki-via-village-vika-oslo` keeps its established slug and its previously proven 13-item menu contract; the broader duplicate source was rejected after exact-head live validation returned 0/16.
- `oslo-raw-frogner-oslo` keeps its established slug and absorbs the complete postal address and later verification metadata from `oslo-raw-frogner`.
- `kinabolle-ensjo-oslo` and `kverneriet-solli-oslo` deliberately keep their first-party menu sources rather than replacing them with later secondary SeMeny duplicates.

## Production behavior

The permanent materializer calls `reconcileRestaurantCatalogCoverage()` after successful onboarding. Removed Oslo slugs are therefore deactivated and their enabled menu, hours and action sources are disabled transactionally. No direct production SQL mutation is required.

The intake workflow now rejects a new non-reproof candidate when it collides with a canonical menu source or with the same normalized address plus a strongly matching restaurant name. Different restaurants sharing a food-hall address are not rejected on address alone.
