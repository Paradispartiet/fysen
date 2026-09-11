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

**12 researched → 1 promoted → 6 semantic-review → 5 source-review**

| # | Restaurant | Decision | First-party menu evidence | Dish-first rationale |
|---|---|---|---|---|
| 25 | Madonna | `review` | https://www.madonnaoslo.no/no/meny | The visible first-party pages publish named/priced dishes, but exact-head production extraction recovered only 1 canonical item from dinner through both HTTP/browser and 0 from the separate lunch page. Keep in review rather than adding a restaurant-specific parser exception. |
| 26 | Festningen Restaurant | `semantic-review` | https://www.festningenrestaurant.no/middag | Current first-party dinner page exposes named, individually priced starters and other à la carte dishes in addition to chef-menu packages. |
| 27 | FYR Bistronomi & Bar | `semantic-review` | https://www.fyrbistronomi.no/sommermeny | Current first-party seasonal page exposes named, individually priced seafood, meat, vegetable dishes and desserts. |
| 28 | Eero | `review` | https://www.eero.no/ | Active Oslo venue, but current first-party food output is primarily event/set-menu packages priced per person rather than stable individually priced dishes. |
| 29 | PANU | `review` | https://www.restaurant-panu.com/ | Active restaurant and the site advertises set menu/à la carte, but the public first-party dish menu is image-led and does not expose a stable textual named priced list suitable for canonical extraction. |
| 30 | Le Benjamin | `review` | https://lebenjamin.no/wp-content/uploads/2026/09/Meny-9.-september-2026.pdf | Fresh first-party PDF contains individually priced dishes, but exact-head production intake respects the site's `robots.txt`, which disallows fetching this PDF. Keep in review rather than bypass crawler policy. |
| 31 | Kaffistova | `semantic-review` | https://www.bondeheimen.no/menyar/a-la-carte | Current first-party à la carte publishes individually priced Norwegian dishes across starters, mains and desserts. |
| 32 | Rorbua | **`promoted`** | https://rorbua.as/page/ | Current first-party HTML publishes a broad named and priced Norwegian menu; live intake must resolve the current HTML semantics rather than rely on older PDF pricing. |
| 33 | Stortorvets Gjæstgiveri | `review` | current first-party/operator presence; no stable public first-party dish list proven | Active physical restaurant is supported, but this pass did not find a stable current first-party named priced menu suitable for canonical extraction. |
| 34 | Gamle Raadhus Restaurant | `semantic-review` | https://www.gamleraadhus.no/kveldsmeny | Current first-party dinner menu, effective 19 August 2026, exposes named and individually priced dishes. |
| 35 | Frognerseteren Finstua | `semantic-review` | https://www.frognerseteren.no/restaurant-finstua-meny | Current first-party Finstua page publishes a large named and priced lunch/dinner menu. |
| 36 | Bristol Grill | `semantic-review` | https://hotelbristol.no/spise-pa-bristol/bristol-grill/ | Current first-party Bristol Grill page exposes a substantial à la carte, meat list, sides and sauces with explicit prices. |

## Intake candidates

The final round-3 intake seed contains the seven candidates that remain eligible after live source proof:

1. Festningen Restaurant
2. FYR Bistronomi & Bar
3. Kaffistova
4. Rorbua
5. Gamle Raadhus Restaurant
6. Frognerseteren Finstua
7. Bristol Grill

Each candidate must still pass Kartverket identity/geocoding, catalog physical-identity dedupe, live source acquisition, extraction, the minimum three unique priced dishes, generated assertions and semantic artifact QA. A source can be technically green and still return to `review` if titles/prices are semantically wrong.

## Review policy

- **Madonna:** both published first-party menu surfaces remain incompatible with the current generic extractor under exact-head proof (dinner: 1 item; lunch: 0). No restaurant-specific parser exception is introduced.
Madonna, Eero, PANU, Le Benjamin and Stortorvets Gjæstgiveri remain P0 review items. This is not a judgment on restaurant quality.

- **Eero:** current first-party food offer is package/event-oriented; package price must not be attached dishonestly to individual courses.
- **PANU:** public first-party surface is not a stable textual dish list in this pass; image-only menu content is not promoted merely to make intake possible.
- **Le Benjamin:** the current first-party PDF is semantically strong, but production fetch is disallowed by the publisher's `robots.txt`; crawler policy is not bypassed.
- **Stortorvets Gjæstgiveri:** active identity is supported, but no stable current first-party named priced dish surface was proven in this pass.

No secondary guide menu is promoted to canonical authority for these review items.

## First live-intake result

The first exact-head proof after address resolution requested nine candidates and generated seven immediately. Festningen Restaurant (24 items), FYR Bistronomi & Bar (3), Kaffistova (21), Rorbua (19), Gamle Raadhus Restaurant (18), Frognerseteren Finstua (32) and Bristol Grill (26) all generated candidate manifests. Madonna's dinner page recovered only one unique priced dish through both HTTP and rendered-browser extraction despite the published page visibly containing a larger menu. The final source-level proof therefore uses Madonna's separate current first-party lunch page, which publishes named and individually priced dishes, without changing the three-dish minimum. Le Benjamin returned a deterministic robots-policy refusal and is removed from intake rather than bypassing that policy.

## Final source decision

A final exact-head source-level reproof tested Madonna's separate first-party lunch surface after the dinner surface had failed identically under HTTP and browser rendering. The lunch page exposed zero canonical items to the production extractor. Madonna therefore returns to `review`. The round closes with seven intake candidates and five review candidates; no extraction floor, robots policy or parser quality gate is weakened.


## Semantic artifact QA and promotion

Exact-head intake run #442 on `c03de300fb87eeb87780cb2a10ce7c50fd899ba9` generated and strict-validated all seven final intake candidates (7/7 generated, 7/7 accepted). The artifact digest is `sha256:07f14f452964c4033dbe1655006a912ea558d438cdcccd328ae65f12294da895`.

Workflow-green is not sufficient for promotion. Full observed-name inspection found:

- **Rorbua:** 19/19 output is semantically coherent dish output. No observed UI, beverage, copyright, address, section-label or description-fragment leakage. Promoted with eight priced assertions.
- **Festningen Restaurant:** output contains menu-package labels and component/description fragments such as `kr 195`, `toast`, `egg cream`, `mushroom mayonnaise`, `mushroom velouté`, `potato puré` and `pommes Anna`. Remains fail-closed.
- **FYR Bistronomi & Bar:** only three items are recovered; `KALDE FORRETTER` is a section heading and the observed dessert-price association is not trustworthy. Remains fail-closed.
- **Kaffistova:** output includes malformed multi-price names and beverage leakage, including `Delefat for 2 eller 4 personar 295/` and `Gewürstraminer Vendage Tardive 2015, Hugel`. Remains fail-closed.
- **Gamle Raadhus Restaurant:** output includes date and size labels (`Gjelder fra 19. august`, `Large`, `Small`) as dishes. Remains fail-closed.
- **Frognerseteren Finstua:** output includes description fragments and page metadata such as `røkt persillemajones`, `30 gr.`, `Holmenkollveien` and `Copyright © Frognerseteren`. Remains fail-closed.
- **Bristol Grill:** output includes quantity/price metadata and section/display labels such as `3 stk 195 kr / 6 stk`, `100 gr`, `For hele bordet` and `Sideretter`. Remains fail-closed.

The six semantic-review candidates are not rejected. They should be reconsidered after generic parser/output hardening and exact-head reproof. No restaurant-specific exception, assertion weakening or artificial item-floor reduction is used.
