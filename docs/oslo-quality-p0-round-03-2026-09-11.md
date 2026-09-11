# Oslo quality P0 research — round 3 — 2026-09-11

This is the third research round from the canonical 52-place P0 queue in `oslo-restaurant-quality-audit-2026-09-11.md`.

Round scope: P0 positions 25–36, Madonna through Bristol Grill.

Research contract:
- prove an active physical Oslo identity;
- require a currently published first-party menu surface;
- only named, priced dish-level output advances directly to intake;
- supported first-party PDF is acceptable when the restaurant publishes the menu itself;
- image-only menus, event/package menus and sources without a stable public dish list remain `review`;
- guide/editorial status is research signal only, never canonical menu authority;
- intake and semantic artifact QA remain fail-closed; this research document does not predeclare promotion.

## Result

**12 researched → 9 intake → 3 review**

| # | Restaurant | Decision | First-party menu evidence | Dish-first rationale |
|---|---|---|---|---|
| 25 | Madonna | **`intake`** | https://www.madonnaoslo.no/no/meny | Current first-party HTML publishes a substantial named and individually priced dinner menu at Operagata 17. |
| 26 | Festningen Restaurant | **`intake`** | https://www.festningenrestaurant.no/middag | Current first-party dinner page exposes named, individually priced starters and other à la carte dishes in addition to chef-menu packages. |
| 27 | FYR Bistronomi & Bar | **`intake`** | https://www.fyrbistronomi.no/sommermeny | Current first-party seasonal page exposes named, individually priced seafood, meat, vegetable dishes and desserts. |
| 28 | Eero | `review` | https://www.eero.no/ | Active Oslo venue, but current first-party food output is primarily event/set-menu packages priced per person rather than stable individually priced dishes. |
| 29 | PANU | `review` | https://www.restaurant-panu.com/ | Active restaurant and the site advertises set menu/à la carte, but the public first-party dish menu is image-led and does not expose a stable textual named priced list suitable for canonical extraction. |
| 30 | Le Benjamin | **`intake`** | https://lebenjamin.no/wp-content/uploads/2026/09/Meny-9.-september-2026.pdf | Fresh first-party PDF dated 9 September 2026 exposes individually priced starters, mains and desserts. |
| 31 | Kaffistova | **`intake`** | https://www.bondeheimen.no/menyar/a-la-carte | Current first-party à la carte publishes individually priced Norwegian dishes across starters, mains and desserts. |
| 32 | Rorbua | **`intake`** | https://rorbua.as/page/ | Current first-party HTML publishes a broad named and priced Norwegian menu; live intake must resolve the current HTML semantics rather than rely on older PDF pricing. |
| 33 | Stortorvets Gjæstgiveri | `review` | current first-party/operator presence; no stable public first-party dish list proven | Active physical restaurant is supported, but this pass did not find a stable current first-party named priced menu suitable for canonical extraction. |
| 34 | Gamle Raadhus Restaurant | **`intake`** | https://www.gamleraadhus.no/kveldsmeny | Current first-party dinner menu, effective 19 August 2026, exposes named and individually priced dishes. |
| 35 | Frognerseteren Finstua | **`intake`** | https://www.frognerseteren.no/restaurant-finstua-meny | Current first-party Finstua page publishes a large named and priced lunch/dinner menu. |
| 36 | Bristol Grill | **`intake`** | https://hotelbristol.no/spise-pa-bristol/bristol-grill/ | Current first-party Bristol Grill page exposes a substantial à la carte, meat list, sides and sauces with explicit prices. |

## Intake candidates

The round-3 intake seed contains only the nine candidates with direct dish-level first-party evidence:

1. Madonna
2. Festningen Restaurant
3. FYR Bistronomi & Bar
4. Le Benjamin
5. Kaffistova
6. Rorbua
7. Gamle Raadhus Restaurant
8. Frognerseteren Finstua
9. Bristol Grill

Each candidate must still pass Kartverket identity/geocoding, catalog physical-identity dedupe, live source acquisition, extraction, the minimum three unique priced dishes, generated assertions and semantic artifact QA. A source can be technically green and still return to `review` if titles/prices are semantically wrong.

## Review policy

Eero, PANU and Stortorvets Gjæstgiveri remain P0 review items. This is not a judgment on restaurant quality.

- **Eero:** current first-party food offer is package/event-oriented; package price must not be attached dishonestly to individual courses.
- **PANU:** public first-party surface is not a stable textual dish list in this pass; image-only menu content is not promoted merely to make intake possible.
- **Stortorvets Gjæstgiveri:** active identity is supported, but no stable current first-party named priced dish surface was proven in this pass.

No secondary guide menu is promoted to canonical authority for these review items.
