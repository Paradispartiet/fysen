# Oslo coverage census — 2026-09-21

This document is a dated coverage audit and research ledger. It is **not** a parallel production catalog.
`apps/menu-worker/catalog/` remains the only canonical restaurant list.

## Coverage contract

"Relevant Oslo restaurant" follows the permanent dish-first policy in `docs/oslo-pilot-v1.md` and
`docs/restaurant-production.md`: a place belongs in the coverage universe when omitting it would lose
meaningful dish/cuisine coverage, geographic coverage, documented demand, qualitative significance, or
a necessary source type. Fysen does not target every registered food-service business in Oslo.

The census statuses are:

- `canonical`: present in `apps/menu-worker/catalog/`;
- `excluded`: assessed and outside the current Fysen coverage contract, with an explicit reason;
- `review`: relevant signal exists, but source/menu/semantic evidence or final promotion is unresolved;
- `missing`: relevant in the refreshed source universe and neither canonical, excluded nor already under review.

A coverage refresh is not closed while `missing > 0`. A claim that all relevant places are actually
covered also requires the remaining `review` queue to be resolved to `canonical` or `excluded`;
`review` is not equivalent to coverage.

## Census start baseline

- census-start `main`: `1259e32a1637b40201d87f1e7c1fe9e186f8f753`;
- catalog JSON manifests on that tree: **745**;
- last full catalog-health proof before the workflow-only current head:
  `d08fa3b36ff2a11699166a9d0cd0f310b332757f`, Catalog health #262;
- Catalog health #262: **745 manifests / 745 accepted / 0 failed**;
- `d08fa3b… -> 1259e32a…` changes only
  `.github/workflows/revenue-production-proof.yml` and
  `.github/workflows/vercel-production-release.yml`; no catalog file changed.

Therefore the census-start coverage baseline is **745 canonical manifests**, not 744.

### Progress after census start

- PR #848 merged the census ledger without changing the catalog.
- PR #849 produced a fresh Brasserie Hansken exact-head proof.
- PR #850 promoted Brasserie Hansken and merged as `101f55385da8c1053f1bb864b8cf82179ed46d2a`.
- The Git catalog baseline after #850 was **746 manifests**.
- PR #853 promoted Ringnes Brygghus and merged as `64d663983917ad022a563498eb998783c6c15a60`, bringing the Git catalog to **747 manifests**.
- Catalog health #264 on exact `64d663983917ad022a563498eb998783c6c15a60` proved **747 manifests / 747 accepted / 0 failed**. Exact evidence artifact: `10658640142`.
- PRs #855–#860 change only this dated census ledger and do not alter `apps/menu-worker/catalog/`; therefore the current Git catalog baseline remains **747 manifests** after those merges.

## Historical benchmark reconciliation

The 2026-09-11 quality audit identified 85 benchmark gaps: 52 P0 and 33 P1.
Against current `main` after Brasserie Hansken promotion #850:

- **29 / 85 are now canonical**;
- **56 / 85 remain non-canonical review items**;
- **0 / 85 are unclassified inside that historical benchmark**.

This closes classification of the old 85-place snapshot, but it does **not** prove present-day Oslo
coverage. The external benchmark universe must be refreshed after this reconciliation.

### Historical gaps now canonical — 29

| Restaurant | Status | Current canonical identity |
|---|---|---|
| Statholdergaarden | canonical | `statholdergaarden-oslo` |
| Izakaya by Vladimir Pak | canonical | `izakaya-by-vladimir-pak-oslo` |
| Sjømagasinet | canonical | `sjomagasinet-oslo` |
| Statholderens Mat og Vinkjeller | canonical | `statholderens-mat-vinkjeller-oslo` |
| Cru | canonical | `cru-oslo` |
| Arakataka | canonical | `arakataka-oslo` |
| Brasserie Blanche | canonical | `brasserie-blanche-oslo` |
| Brasserie Hansken | canonical | `brasserie-hansken-oslo` |
| Madonna | canonical | `madonna-oslo` |
| Festningen Restaurant | canonical | `festningen-restaurant-oslo` |
| Kaffistova | canonical | `kaffistova-oslo` |
| Rorbua | canonical | `rorbua-oslo` |
| Frognerseteren Finstua | canonical | `frognerseteren-finstua-oslo` |
| Bristol Grill | canonical | `bristol-grill-oslo` |
| Lorry Restaurant | canonical | `lorry-restaurant-oslo` |
| Fiskeriet Bjørvika | canonical | `fiskeriet-bjorvika-oslo` |
| Theatercaféen | canonical | `theatercafeen-oslo` |
| Brasserie France | canonical | `brasserie-france-oslo` |
| Norda | canonical | `norda-oslo` |
| Bar Boman | canonical | `bar-boman-oslo` |
| Atlas Brasserie | canonical | `atlas-brasserie-oslo` |
| Palmen Restaurant | canonical | `palmen-restaurant-oslo` |
| The Top Restaurant | canonical | `the-top-restaurant-oslo` |
| Mauriske Salonger | canonical | `mauriske-salonger-oslo` |
| Katla | canonical | `katla-oslo` |
| Vintage Kitchen | canonical | `vintage-kitchen-oslo` |
| Skaal Matbar | canonical | `skaal-matbar-oslo` |
| Tomodomo | canonical | `tomodomo-oslo` |
| Nektar | canonical | `nektar-vinbar-oslo` |

### Historical P0 gaps still in review — 35

| Restaurant | Status | Current blocker / latest useful evidence |
|---|---|---|
| Mon Oncle | review | Public surface exposes menu formats/prices rather than stable named individually priced dishes. |
| Maaemo | review | No stable public current named dish output suitable for dish-first intake. |
| Kontrast | review | Set-menu formats/prices and concept, not a stable individually priced named dish list. |
| Stallen | review | Seasonal serving/package menu rather than individually priced named dishes. |
| Hot Shop | review | Tasting-menu package evidence; additionally tracked as sunset/review after announced 2026 closure. |
| SAVAGE | review | Current first-party surface has not yielded stable dish-level canonical intake evidence. |
| Sabi Omakase Oslo | review | Omakase/package price without stable named individually priced current courses. |
| Credo | review | No stable current public named/priced first-party dish list proven. |
| The Little Pickle | review | Dinner menu remains image-led; no stable textual priced dinner list proven. |
| Frances Vinbar | review | Rotating food offering without a stable current named/priced public menu proven. |
| Betong | review | Tasting-menu formats/prices, not stable individually priced named dishes. |
| Varemottaket | review | No stable public named dish list proven. |
| Kolonialen Bislett | review | No stable public named/priced menu proven. |
| Vaaghals | review | First-party PDF transport was repaired, but the latest Michelin reproof still failed canonical extraction. |
| Smalhans | review | Named dishes exist, but published prices bind to menu packages rather than individual dishes. |
| Plah | review | Public first-party evidence is package/tasting-menu priced rather than individually dish-priced. |
| FYR Bistronomi & Bar | review | First-party source is rich, but canonical extraction remained below floor. PR #829 contains a generic inline-price repair but was **not merged**; fresh-main repair/reproof is still required. |
| Eero | review | Event/set-menu package pricing rather than stable individually priced dishes. |
| PANU | review | Menu is image-led / no stable textual named-priced list proven. |
| Le Benjamin | review | Fresh first-party priced PDF is semantically useful, but production fetching is blocked by the publisher's robots policy. |
| Stortorvets Gjæstgiveri | review | Active identity, but no stable current first-party named/priced menu proven in the P0 pass. |
| Gamle Raadhus Restaurant | review | Semantic QA still emitted garnish/component fragments as standalone dishes; needs generic output repair and reproof. |
| Restaurant Schrøder | review | Fresh P0 reproof retained title/description fusion. |
| Den Glade Gris | review | PDF beverage/layout leakage remains. |
| Engebret Café | review | Fresh #811 reproof showed English translation/description rows inheriting following Norwegian dish prices. |
| Dovrehallen | review | Fresh #811 reproof missed current priced dishes/variants from the first-party menu. |
| The Salmon | review | Fresh #811 reproof was nondeterministic (53 vs 0 items) and also exposed generic numbered menu-package labels. |
| Louise | review | First-party menu endpoint failed deterministically; no secondary authority substituted. |
| Lofoten Fiskerestaurant | review | Fresh #811 reproof emitted a platter description instead of the canonical dish title. |
| Havsmak | review | Section-heading leak was fixed, but legitimate dishes immediately after headings were still not fully recovered. |
| Lofotstua | review | No stable public first-party priced dish menu proven. |
| Skur 33 | review | Component/allergen/layout fragments remain in generated output. |
| Solsiden Restaurant | review | Cross-card price-association risk remains fail-closed. |
| KUMI Gamlebyen | review | Current first-party page has unpriced dishes; priced PDF is stale and prior Wolt venue was deleted. |
| KUMI Oslobukta | review | Current first-party page has unpriced dishes; priced PDF is stale and prior Wolt venue was deleted. |

### Historical P1 gaps still in review — 21

| Restaurant | Status | Current blocker / latest useful evidence |
|---|---|---|
| Basso Social | review | Package prices / generic serving categories; no stable individually priced named menu proven. |
| Keyser Social | review | Generic tasting/package categories and image-based menu. |
| KöD Frogner | review | Shared image-only menu source; no supported textual dish source proven. |
| St. Lars | review | Image-only menu in the audited source state. |
| Konoji | review | No current first-party menu/identity evidence sufficient for canonical intake in P1 review. |
| Happolati | review | No current first-party menu/identity evidence sufficient for canonical intake in P1 review. |
| J2 Modern Korean | review | Package menu rather than individually priced dish output. |
| KöD Posthallen | review | Shared image-only menu source; no supported textual dish source proven. |
| Nordvegan | review | Named rotating buffet food, but no individual item prices. |
| Ekspedisjonshallen | review | Current PDF was blocked by source robots policy. |
| To Søstre | review | Afternoon-tea/package offering without stable individually priced named dish list. |
| About Contrasts | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Åpent Bakeri Barcode | review | Hybrid/bakery candidate not closed by current canonical evidence; needs fresh marginal-value/source reproof. |
| Tabuno | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Koie Ramen | review | P1 round-2 evidence remained insufficient for a separate canonical identity; needs fresh identity/source reproof. |
| Substans | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Stranden 30 | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Palace Grill | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Punk Royale | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Kafeteria August | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Fox and Loaf | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |

## Current source refresh — MICHELIN complete

The MICHELIN Guide Oslo listing was re-opened on 2026-09-21 and currently renders **29 Oslo
restaurants**. One entry, À L'aise, is the already documented closed identity from the 2026-09 audit and
remains excluded from the active coverage universe. The remaining 28 identities are all already present
in the historical benchmark ledger above.

Source:
- https://guide.michelin.com/no/en/oslo-region/restaurants

Current reconciliation of the active 28 after Hansken #850:
- canonical: **10**;
- review: **18**;
- missing: **0**;
- newly discovered active identities: **0**.

This source family is therefore fully reconciled for the current census. MICHELIN remains a research
signal rather than canonical truth; the stale À L'aise listing is a concrete reason not to treat a guide
entry as proof of active restaurant identity.

## Current source refresh — tranche 1

The current VisitOSLO restaurant catalogue was re-opened on 2026-09-21. It exposes **326**
restaurant products. The first 12 current products were reconciled against the current canonical catalog
and the historical 85-place review ledger before moving to later pages.

Source:
- https://www.visitoslo.com/restaurants-nightlife/restaurants

First-page reconciliation:

| Restaurant | Census status | Reason |
|---|---|---|
| Basso Social | review | Existing historical P1 review. |
| Bønder i byen Grünerløkka | canonical | Current catalog contains `bonder-i-byen-oslo`. |
| Brasilia Oslo | review | New current benchmark signal. Active Oslo restaurant, but the present buffet/experience pricing model needs dish-first marginal-value and source-fit review before classifying it as a missing canonical restaurant. |
| Brasserie Coucou | review | New current benchmark identity outside the historical 85. Exact-head run #1102 passed identity/geocoding but the current first-party menu surface produced 0 canonical items under the generic HTML stack. Keep as source/extraction review; no parser exception or weaker floor. |
| Brasserie Opera | review | New current benchmark signal. Active Oslo restaurant, but the currently inspected first-party landing page does not itself establish the final canonical priced dish surface. |
| CiCi Tollgaarden | canonical | Current catalog contains `cici-tollgaarden-oslo`. |
| Credo Restaurant | review | Existing historical P0 review. |
| Den Glade Gris | review | Existing historical P0 review. |
| Dyna Fyr | review | New current benchmark signal, but primarily a seasonal/private-event set-menu restaurant; relevance/source-fit must be decided explicitly before intake. |
| Ekebergrestauranten | review | New current benchmark identity outside the historical 85. Run #1103 generated 32 items but semantic QA exposed generic noise as priced dishes: bilingual section headings, allergen lines and waiter/presentation instructions. Keep fail-closed pending generic HTML cleanup and fresh reproof. |
| Festningen Restaurant | canonical | Current catalog contains `festningen-restaurant-oslo`. |
| Folkvang Sagene | review | New current benchmark identity outside the historical 85. Run #1107 generated and strict-validated 26/26, but semantic QA found `Ukens Husmann 240` bound to 280 NOK from a `240,- / 280,-` source row. Keep fail-closed pending a generic multiple-price title repair and fresh reproof. |

Tranche-1 closeout classification after exact-head research:
- canonical: **3**;
- review: **9**;
- missing: **0**;
- excluded: **0**.

This closes `missing` for the **first 12 VisitOSLO products only**. It does not close Oslo coverage: VisitOSLO pages 2–28, Anders Husa/current thematic sources and demand-gap inputs are not yet fully reconciled, and all nine tranche-1 review identities remain unresolved for a final coverage claim.

## Current source refresh — VisitOSLO hidden gems complete

The current VisitOSLO "Skjulte perler" list was re-opened on 2026-09-21 and exposes **10 / 10**
current products. This source family is fully enumerated and reconciled independently of the broader
326-product restaurant catalogue.

Source:
- https://www.visitoslo.com/no/oslo-for-deg/oslo-for-foodies/skjulte-perler

| Restaurant / product | Census status | Reason |
|---|---|---|
| Nektar | canonical | Current catalog contains `nektar-vinbar-oslo`. |
| Konoji | review | Existing historical P1 review; no sufficient current first-party menu/identity evidence has closed the hold. |
| Farine | review | Current first-party identity is a bakery/spiseri with simple breakfast/lunch food, but the current public surface does not establish a stable individually priced dish menu suitable for immediate canonical intake. |
| Middagscruise i Oslofjorden med Brim Explorer | excluded | Tour/package identity rather than a fixed restaurant identity. The current product includes a three-course dinner, but it is outside the restaurant census contract. |
| Izakaya | canonical | Current catalog contains `izakaya-by-vladimir-pak-oslo`. |
| Kafé Republik | review | Exact-head intake #1109 generated and strict-validated 13 items, but the current first-party page contains 15 individually priced dishes. Semantic/source comparison shows extraction loss for `Grilled Beef Skewers, Peanut Sauce` (185 NOK) and `Spekemat` (165 NOK). Keep fail-closed pending generic extraction repair and fresh reproof. |
| St. Lars | review | Existing historical P1 review; audited source state was image-only. |
| Ringnes Brygghus | canonical | Promoted byte-for-byte from exact-head intake #1110 artifact `10656010234`; all 10 current first-party pizzas were strict-validated with correct name/price bindings and clean semantic output. Canonical identity: `ringnes-brygghus-oslo`. |
| Angst Bar | excluded | Current VisitOSLO identity is explicitly a bar/club and no restaurant food surface is established; outside the dish-first restaurant census. |
| Latter Restaurant & Bar | review | Active restaurant identity is established, but the current first-party public surface found in this refresh does not expose a stable named/priced a la carte list suitable for immediate intake. |

Hidden-gems reconciliation after Ringnes promotion:
- canonical: **3**;
- review: **5**;
- excluded: **2**;
- missing: **0**.

Final research proof on exact head `b2ecbaabc890b5a82dad756833aa6902a3c9d3b2` used Restaurant batch
intake #1110: **2/2 generated, 2/2 strict accepted, 0 failed**. Artifact `10656010234` has ZIP SHA-256
`a77216f70cf69a27a7d2f2b7c65149e1d964d691ac9acae2dd22558913085dbf`. The promoted Ringnes manifest
has SHA-256 `7b208eba2404977967d8c524bf415b07d01774338b0fc1295a7bd261de6cab6d` and Git blob
`08ed7d7ba0d467bf8b48726cc22a8664d2cb2cb5`, identical to the accepted artifact. Kafé Republik remains
review because two priced source dishes are absent from the 13-item canonical extraction.

## Current source refresh — VisitOSLO hotel restaurants complete

The current VisitOSLO hotel-restaurants guide was re-opened on 2026-09-21. The source was published
2026-05-27, updated 2026-08-07, and exposes **10 / 10** current products. All ten identities were
already classified elsewhere in this census, so this source family adds no new `missing` identity.

Source:
- https://www.visitoslo.com/restaurants-nightlife/convenient/hotel-restaurants

| Restaurant | Census status | Reason |
|---|---|---|
| Norda | canonical | Current catalog contains `norda-oslo`. |
| SAVAGE | review | Existing historical P0 review; current first-party surface has not yielded stable dish-level canonical intake evidence. |
| Ekspedisjonshallen | review | Existing historical P1 review; current PDF source remains blocked by publisher robots policy. |
| Theatercaféen | canonical | Current catalog contains `theatercafeen-oslo`. |
| Bar Boman | canonical | Current catalog contains `bar-boman-oslo`. |
| Bristol Grill | canonical | Current catalog contains `bristol-grill-oslo`. |
| To Søstre | review | Existing historical P1 review; current offering is afternoon-tea/package led rather than a stable individually priced named dish list. |
| Atlas Brasserie & Café | canonical | Current catalog contains `atlas-brasserie-oslo`. |
| Palmen Restaurant & Bar | canonical | Current catalog contains `palmen-restaurant-oslo`. |
| The Top Restaurant | canonical | Current catalog contains `the-top-restaurant-oslo`. |

Hotel-restaurants reconciliation:
- canonical: **7**;
- review: **3**;
- excluded: **0**;
- missing: **0**.

This closes classification for this finite VisitOSLO thematic source. It does **not** close the broad
326-product catalogue or resolve the three review identities.

## Current source refresh — VisitOSLO quick-bite guide complete

The current VisitOSLO quick-bite guide was re-opened on 2026-09-21. The source was published
2026-05-27, updated 2026-07-03, and exposes **11 / 11** current products. This source mixes individual
restaurants with food-hall / food-court umbrella identities, so umbrella products remain explicit
`review` items until venue-level marginal value and source fit are resolved.

Source:
- https://www.visitoslo.com/restaurants-nightlife/convenient/a-quick-bite

| Restaurant / product | Census status | Reason |
|---|---|---|
| CiCi Tollgaarden | canonical | Current catalog contains `cici-tollgaarden-oslo`. |
| Mathallen Food Hall | review | Current VisitOSLO identity is an umbrella food hall with more than 30 shops, cafés and restaurants; several tenants are already canonical individually. Venue-level marginal value and source fit remain unresolved. |
| Yo! Sushi | canonical | Current catalog contains `yo-sushi-oslo-s-oslo` at Jernbanetorget 1. |
| CiCi Osteria Kirkegata | canonical | Same physical identity as current catalog `cici-kirkegata-oslo` at Kirkegata 23. |
| VIA Village | review | Current VisitOSLO identity is a food-court umbrella over named independent stalls; several VIA Village stalls are already canonical individually. Venue-level marginal value and source fit remain unresolved. |
| Vippa Oslo | review | Current VisitOSLO identity is a food/culture centre with multiple food stalls rather than one already-proven canonical restaurant menu. |
| Paleet Food Hall | canonical | Current catalog contains `paleet-food-hall-oslo` at Karl Johans gate 39. |
| Freddy Fuego Burrito Bar | canonical | Current catalog contains `freddy-fuego-burrito-bar-hausmanns-gate-oslo` at Hausmanns gate 31A. |
| Barcode Street Food | review | Current VisitOSLO identity is a food-hall umbrella with multiple stalls; individual Barcode stalls are already represented separately in the catalog. Venue-level marginal value and source fit remain unresolved. |
| Oslo Street Food | review | Current VisitOSLO identity is a food-court umbrella with multiple stalls; individual vendors are represented separately in the catalog. Venue-level marginal value and source fit remain unresolved. |
| Anne på landet – Frognerparken | review | Active current café identity with lunch/dinner dishes, but no separate canonical identity is proven yet; first-party menu/source intake remains to be established. |

Quick-bite reconciliation:
- canonical: **5**;
- review: **6**;
- excluded: **0**;
- missing: **0**.

This closes classification for this finite VisitOSLO thematic source. It does **not** resolve the six
review identities, and it does not substitute for the still-incomplete broad 326-product catalogue.

## Current source refresh — VisitOSLO local-foodies guide complete

The current VisitOSLO "Do as the local foodies" guide was re-opened on 2026-09-21. The source was
published 2026-05-27, updated 2026-07-09, and exposes **21 / 21** current restaurant products.

Source:
- https://www.visitoslo.com/restaurants-nightlife/the-taste-of-oslo/local-foodies

| Restaurant | Census status | Reason |
|---|---|---|
| Vaaghals | review | Existing historical P0 review; first-party PDF transport was repaired, but the latest canonical reproof still failed extraction. |
| Basso Social | review | Existing historical P1 review; package prices / generic serving categories do not establish a stable individually priced named menu. |
| Keyser Social | review | Existing historical P1 review; current evidence is tasting/package led and menu presentation is image-based. |
| KöD Frogner | review | Existing historical P1 review; shared current menu source is image-only under the audited source state. |
| Eero | review | Existing historical P0 review; current first-party pricing is event/set-menu package based rather than stable individually priced dishes. |
| St. Lars | review | Existing historical P1 review; audited current menu source remains image-only. |
| ZZ Pizza | canonical | VisitOSLO lists St. Halvards gate 33; current catalog contains the same physical identity as `zz-pizza-gamlebyen-oslo`. |
| The Little Pickle | review | Existing historical P0 review; dinner menu remains image-led without a stable textual priced dinner list proven. |
| Madonna | canonical | Current catalog contains `madonna-oslo`. |
| Izakaya | canonical | Current catalog contains `izakaya-by-vladimir-pak-oslo`. |
| Konoji | review | Existing historical P1 review; current first-party menu/identity evidence remains insufficient for canonical intake. |
| PANU | review | Existing historical P0 review; menu remains image-led without a stable textual named/priced source proven. |
| Happolati | review | Existing historical P1 review; current first-party menu/identity evidence remains insufficient for canonical intake. |
| Arakataka | canonical | Current catalog contains `arakataka-oslo`. |
| Kolonialen Bislett | review | Existing historical P0 review; no stable public named/priced menu has been proven. |
| J2 Modern Korean | review | Existing historical P1 review; current public evidence is package-menu led rather than individually priced dish output. |
| KöD Posthallen | review | Existing historical P1 review; shared current menu source is image-only under the audited source state. |
| Restaurant Betong | review | Same physical identity as historical `Betong` review; tasting-menu formats/prices do not provide stable individually priced named dishes. |
| Jewel of India | review | VisitOSLO's foodie-list identity is the active Oscars gate 81 restaurant. The current catalog contains only the distinct Bjørvika identity `jewel-of-india-bjorvika-oslo`; Oscars gate requires its own source/intake proof before promotion. |
| Le Benjamin Bar & Bistro | review | Same physical identity as historical `Le Benjamin` review; current first-party priced PDF is useful but production fetching is blocked by publisher robots policy. |
| Brasserie France | canonical | Current catalog contains `brasserie-france-oslo`. |

Local-foodies reconciliation:
- canonical: **5**;
- review: **16**;
- excluded: **0**;
- missing: **0**.

This closes classification for this finite current VisitOSLO thematic source. The Jewel of India row is
intentionally physical-identity aware: the VisitOSLO product is Oscars gate 81 and must not inherit
canonical status from the separate Bjørvika branch. The 16 review identities still need their existing
blocker families resolved before a final Oslo-wide coverage declaration.

## Current source refresh — VisitOSLO lunch guide complete

The current VisitOSLO lunch guide was re-opened on 2026-09-21. The source was published 2026-07-03,
updated 2026-09-18, and exposes **26 / 26** current products.

Source:
- https://www.visitoslo.com/restaurants-nightlife/convenient/lunch

| Restaurant / product | Census status | Reason |
|---|---|---|
| Rorbua | canonical | Current catalog contains `rorbua-oslo`. |
| Lofoten Fish Restaurant | review | Same physical identity as historical `Lofoten Fiskerestaurant` review at Stranden 75; prior fresh reproof emitted a platter description instead of the canonical dish title. |
| Festningen Restaurant | canonical | Current catalog contains `festningen-restaurant-oslo`. |
| Sabaki Skøyen | canonical | Current catalog contains `sabaki-skoyen-oslo`. |
| Palmen Restaurant & Bar | canonical | Current catalog contains `palmen-restaurant-oslo`. |
| Bønder i byen Grünerløkka | canonical | Current catalog contains `bonder-i-byen-oslo`. |
| Ekspedisjonshallen | review | Existing historical P1 review; current PDF source remains blocked by publisher robots policy. |
| Kaffistova | canonical | Current catalog contains `kaffistova-oslo`. |
| Grand Café | review | Active current lunch restaurant at Karl Johans gate 31, but no canonical manifest/source-intake proof is established in the current census yet. |
| Atlas Brasserie & Café | canonical | Current catalog contains `atlas-brasserie-oslo`. |
| Maschmanns Food Market | review | Current VisitOSLO identity is a food-market umbrella at Karenslyst allé 51 that includes a bakery and pizzeria; venue-level dish-first source fit and marginal value require explicit resolution. |
| Dalat Café | canonical | Current catalog contains `dalat-cafe-torggata-oslo`. |
| Vespa & Humla | review | Active current lunch/bakery identity at Københavngata 2C, but no canonical manifest/source-intake proof is established in the current census yet. |
| Paleet Food Hall | canonical | Current catalog contains `paleet-food-hall-oslo`. |
| Amundsen Bryggeri & Spiseri | review | Active current eatery at Stortingsgata 20 with a food menu, but no canonical manifest/source-intake proof is established in the current census yet. |
| Burger Joint Aker Brygge | canonical | Current catalog contains `burger-joint-aker-brygge-oslo`. |
| El Camino | canonical | VisitOSLO's lunch identity is the Frogner location at Niels Juels gate 31; current catalog contains the same physical identity as `el-camino-frogner-oslo`. |
| VIA Village | review | Existing current VisitOSLO review; food-court umbrella over named independent stalls, several already canonical individually. |
| Südøst Restaurant | canonical | VisitOSLO lists Trondheimsveien 5; current catalog contains the same physical identity as `sudost-trondheimsveien-oslo`. |
| Mamma Pizza Osteria | canonical | VisitOSLO lists Dronningens gate 22; current catalog contains the same physical identity as `mamma-pizza-osteria-italiana-oslo`. |
| Hitchhiker | review | Active current restaurant at Øvre Slottsgate 3, but no canonical manifest/source-intake proof is established in the current census yet. |
| Kafé Republik | review | Existing hidden-gems review; exact-head extraction returns 13 of 15 individually priced source dishes and remains fail-closed pending generic extraction repair. |
| Lorry Restaurant | canonical | Current catalog contains `lorry-restaurant-oslo`. |
| Anne på landet – Frognerparken | review | Existing current VisitOSLO review; active café with lunch/dinner dishes, but no separate canonical intake proof yet. |
| Anne på landet – Hønse-Lovisas hus | review | Active current café at Sandakerveien 2 with handmade food and lunch service, but no canonical manifest/source-intake proof is established in the current census yet. |
| Nordvegan | review | Existing historical P1 review; named rotating buffet food is published without individual item prices. |

Lunch-guide reconciliation:
- canonical: **14**;
- review: **12**;
- excluded: **0**;
- missing: **0**.

This closes classification for this finite and recently updated VisitOSLO source family. It does not
resolve the 12 review identities or substitute for complete reconciliation of the broad 326-product
restaurant catalogue.

## Current source refresh — VisitOSLO vegan & vegetarian guide complete

The current VisitOSLO vegan/vegetarian guide was re-opened on 2026-09-21. The source was published
2026-05-27, updated 2026-09-18, and exposes **21** current physical/product identities across its
plant-based, vegetarian/vegan, and vegetarian-alternative sections.

Source:
- https://www.visitoslo.com/restaurants-nightlife/vegan-vegetarian

| Restaurant / product | Census status | Reason |
|---|---|---|
| Håndbakt OSLO | canonical | VisitOSLO lists Kjølbergata 21; current catalog contains the same physical identity as `handbakt-oslo`. |
| Oslo Raw | canonical | VisitOSLO lists Skovveien 16; current catalog contains the same physical identity as `oslo-raw-frogner-oslo`. |
| Nordvegan | review | Existing historical P1 review; named rotating buffet food is published without individual item prices. |
| KUMI Gamlebyen | review | Existing historical P0 review; current first-party page has unpriced dishes, the priced PDF is stale and the prior Wolt venue is deleted. |
| KUMI Oslobukta | review | Existing historical P0 review; current first-party page has unpriced dishes, the priced PDF is stale and the prior Wolt venue is deleted. |
| Krishnas Cuisine | canonical | Current catalog contains `krishnas-cuisine-oslo`. |
| Sumo Restaurant Karl Johan | canonical | Current catalog contains `sumo-karl-johan-oslo`. |
| Mathallen Food Hall | review | Existing current VisitOSLO review; umbrella food hall with many independent tenants, several already canonical individually. |
| Konoji | review | Existing historical P1 review; current first-party menu/identity evidence remains insufficient for canonical intake. |
| Sumo Restaurant Hegdehaugsveien | canonical | Current catalog contains `sumo-hegdehaugsveien-oslo`. |
| MelaCafé | review | Active current restaurant at Mariboes gate 8, but no canonical manifest/source-intake proof is established in the current census yet. |
| Zarathustra Meyhane | review | Active current restaurant at Thorvald Meyers gate 80, but no canonical manifest/source-intake proof is established in the current census yet. |
| Sumo Restaurant Bjørvika | canonical | Current catalog contains `sumo-bjorvika-oslo`. |
| VIA Village | review | Existing current VisitOSLO review; food-court umbrella over independent stalls, several already canonical individually. |
| Hrímnir Ramen | canonical | Current catalog contains `hrimnir-ramen-storgata`. |
| Listen to Delhi | canonical | Current catalog contains `listen-to-delhi-oslo`. |
| Sumo Storo | canonical | Current catalog contains `sumo-storo-oslo`. |
| Vippa Oslo | review | Existing current VisitOSLO review; food/culture centre with multiple food stalls rather than one already-proven canonical restaurant menu. |
| ASIA Aker Brygge | canonical | Current catalog contains `asia-aker-brygge-oslo`. |
| Nam Fah | review | Active current Thai restaurant at Maridalsveien 21, but no canonical manifest/source-intake proof is established in the current census yet. |
| Sumo Solli Plass | canonical | Current catalog contains `sumo-solli-plass-oslo`. |

Vegan/vegetarian reconciliation:
- canonical: **11**;
- review: **10**;
- excluded: **0**;
- missing: **0**.

This closes classification for this finite and recently updated VisitOSLO thematic source. It does not
resolve the ten review identities or substitute for complete reconciliation of the broad 326-product
restaurant catalogue.

## Current source refresh — VisitOSLO cheap-restaurants guide complete

The current VisitOSLO "Billige restauranter" guide was re-opened on 2026-09-21. The source was
published and updated 2026-07-03 and exposes **25 / 25** current products.

Source:
- https://www.visitoslo.com/no/oslo-for-deg/billig-oslo/billige-restauranter

| Restaurant / product | Census status | Reason |
|---|---|---|
| MelaCafé | review | Existing current VisitOSLO review; active restaurant at Mariboes gate 8 without canonical source-intake proof yet. |
| Tullins Café | canonical | Current catalog contains `tullins-cafe-oslo`. |
| Dovrehallen Bar & Restaurant | review | Same physical identity as historical `Dovrehallen` review; fresh reproof missed current priced dishes/variants. |
| Paleet Food Hall | canonical | Current catalog contains `paleet-food-hall-oslo`. |
| Syverkiosken | review | Active current food identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| El Camino | canonical | VisitOSLO's product is the Frogner location at Niels Juels gate 31; current catalog contains `el-camino-frogner-oslo`. |
| Restaurant Schrøder | review | Existing historical P0 review; fresh reproof retained title/description fusion. |
| Koie Ramen Torggata | review | Existing Koie Ramen review family; a separate canonical physical identity remains unresolved and needs fresh identity/source reproof. |
| Koie Ramen Munch | review | Existing Koie Ramen review family; a separate canonical physical identity remains unresolved and needs fresh identity/source reproof. |
| Haralds Vaffel | canonical | Current catalog contains `haralds-vaffel-grunerlokka-oslo`. |
| Vippa Oslo | review | Existing current VisitOSLO review; food/culture centre with multiple food stalls rather than one already-proven canonical restaurant menu. |
| Istanbul Restaurant Grünerløkka | review | VisitOSLO lists Trondheimsgate 11. The current Istanbul catalog manifest is Trondheimsveien 13, so the physical identity is not treated as canonical without a fresh identity check. |
| Istanbul Restaurant Grønland | canonical | VisitOSLO lists Grønland 14; current catalog contains the same physical identity as `istanbul-kebab-gronland-oslo`. |
| Tuk Tuk Thai | review | Active current Thai restaurant at Møllergata 8, but no canonical manifest/source-intake proof is established in the current census yet. |
| Krishnas Cuisine | canonical | Current catalog contains `krishnas-cuisine-oslo`. |
| Freddy Fuego Burrito Bar | canonical | Current catalog contains `freddy-fuego-burrito-bar-hausmanns-gate-oslo`. |
| Nam Fah | review | Existing current VisitOSLO review; active Thai restaurant at Maridalsveien 21 without canonical source-intake proof yet. |
| Mediterranean Grill | canonical | Current catalog contains `mediterranean-grill-torggata-oslo`. |
| Rice Bowl Thai Café | canonical | Current catalog contains `rice-bowl-kirkegata-oslo`. |
| Postkontoret | review | Active current bar/restaurant at Hagegata 27 with a pizza menu, but no canonical manifest/source-intake proof is established in the current census yet. |
| Dattera til Hagen | review | Active current bar/café at Grønland 10 with a food offering, but no canonical manifest/source-intake proof is established in the current census yet. |
| Café Sara | canonical | Current catalog contains `cafe-sara-hausmanns-gate-oslo`. |
| Oslo Street Food | review | Existing current VisitOSLO review; food-court umbrella with multiple vendors rather than one already-proven canonical restaurant identity. |
| Barcode Street Food | review | Existing current VisitOSLO review; food-hall umbrella with multiple stalls, several already represented individually in the catalog. |
| Ricksha Pakistani Street Food | canonical | Current catalog contains `ricksha-pakistani-street-food-oslo`. |

Cheap-restaurants reconciliation:
- canonical: **11**;
- review: **14**;
- excluded: **0**;
- missing: **0**.

This closes classification for this finite VisitOSLO thematic source. It does not resolve the 14 review
identities or substitute for complete reconciliation of the broad 326-product restaurant catalogue.

## Current source refresh — VisitOSLO child-friendly restaurants complete

The current VisitOSLO child-friendly restaurant guide was re-opened on 2026-09-21. The source was
published 2026-07-03, updated 2026-08-11, and exposes **32 / 32** current products.

Source:
- https://www.visitoslo.com/no/oslo-for-deg/barnas-oslo/barnevennlige-restauranter

| Restaurant / product | Census status | Reason |
|---|---|---|
| The Salmon | review | Existing historical P0 review; fresh reproof was nondeterministic and also exposed generic numbered menu-package labels. |
| CiCi Osteria Kirkegata | canonical | Current catalog contains the same physical identity as `cici-kirkegata-oslo`. |
| Bønder i byen Grünerløkka | canonical | Current catalog contains `bonder-i-byen-oslo`. |
| Ekebergrestauranten | review | Existing current VisitOSLO review; exact-head intake generated 32 items, but semantic QA exposed headings, allergen rows and waiter/presentation instructions as priced dishes. |
| CiCi Tollgaarden | canonical | Current catalog contains `cici-tollgaarden-oslo`. |
| Mathallen Oslo | review | Same current umbrella identity as Mathallen Food Hall; multiple independent tenants, several already canonical individually, so venue-level source fit remains unresolved. |
| ASIA Aker Brygge | canonical | Current catalog contains `asia-aker-brygge-oslo`. |
| Mother India | review | Active current restaurant at Pilestredet 63 with a substantial food offering, but no canonical manifest/source-intake proof is established in the current census yet. |
| Egon Karl Johan | canonical | Current catalog contains `egon-karl-johan-oslo`. |
| Le Benjamin Bar & Bistro | review | Existing historical review; current first-party priced PDF is useful but production fetching remains blocked by publisher robots policy. |
| Olivia Aker Brygge | canonical | Current catalog contains `olivia-aker-brygge-oslo`. |
| Olivia Østbanehallen | canonical | Current catalog contains `olivia-ostbanehallen-oslo`. |
| Mehfel Restaurant | canonical | Current catalog contains `mehfel-kirkegata-oslo`. |
| Villa Paradiso Grünerløkka | canonical | Current catalog contains `villa-paradiso-grunerlokka-oslo`. |
| Villa Paradiso Tivoli | canonical | Current catalog contains `villa-paradiso-tivoli-oslo`. |
| Mamma Pizza Osteria | canonical | Current catalog contains the Dronningens gate 22 identity as `mamma-pizza-osteria-italiana-oslo`. |
| Syverkiosken | review | Existing current VisitOSLO review; active food identity without canonical source-intake proof yet. |
| Tuk Tuk Thai | review | Existing current VisitOSLO review; active Thai restaurant at Møllergata 8 without canonical source-intake proof yet. |
| Haralds Vaffel | canonical | Current catalog contains `haralds-vaffel-grunerlokka-oslo`. |
| Vippa Oslo | review | Existing current VisitOSLO review; food/culture centre with multiple stalls rather than one already-proven canonical restaurant menu. |
| Trattoria Popolare | review | Active current restaurant at Trondheimsveien 2 with an à la carte food offering, but no canonical manifest/source-intake proof is established in the current census yet. |
| Fiskeriet Youngstorget | canonical | Current catalog contains `fiskeriet-youngstorget-oslo`. |
| Freddy Fuego Burrito Bar | canonical | Current catalog contains `freddy-fuego-burrito-bar-hausmanns-gate-oslo`. |
| Masala Politics | canonical | Current catalog contains `masala-politics-karl-johans-gate-oslo`. |
| Yaya's Vika | canonical | Current catalog contains `yayas-vika-oslo`. |
| Bun's Sørenga | canonical | Current catalog contains `buns-sorenga-oslo`. |
| Oslo Street Food | review | Existing current VisitOSLO review; food-court umbrella with multiple vendors rather than one already-proven canonical restaurant identity. |
| Barcode Street Food | review | Existing current VisitOSLO review; food-hall umbrella with multiple stalls, several already represented individually in the catalog. |
| Olivia Hegdehaugsveien | canonical | Current catalog contains `olivia-hegdehaugsveien-oslo`. |
| TGI Friday's City | canonical | Current catalog contains `tgi-fridays-oslo-city-oslo`. |
| Der Peppern Gror | canonical | VisitOSLO lists Fridtjof Nansens plass 7; current catalog contains the same physical identity as `der-peppern-gror-radhusplassen-oslo`. |
| Baltazar Ristorante & Enoteca | review | Active current restaurant at Dronningens gate 27 with a seasonal à la carte menu and pizza, but no canonical manifest/source-intake proof is established in the current census yet. |

Child-friendly reconciliation:
- canonical: **20**;
- review: **12**;
- excluded: **0**;
- missing: **0**.

This closes classification for this finite and recently updated VisitOSLO thematic source. It does not
resolve the 12 review identities or substitute for complete reconciliation of the broad 326-product
restaurant catalogue.

## Current source refresh — VisitOSLO outdoor-seating restaurants complete

The current VisitOSLO outdoor-dining guide was re-opened on 2026-09-21. The source was published
2026-05-27, updated 2026-09-18, and its restaurant section exposes **41 / 41** current products.
The separate drinks-in-the-sun section is not counted in this restaurant tranche.

Source:
- https://www.visitoslo.com/restaurants-nightlife/outdoor-dining

| Restaurant / product | Census status | Reason |
|---|---|---|
| Stortorvets Gjæstgiveri | review | Existing historical P0 review; active identity, but no stable current first-party named/priced menu was proven in the prior pass. |
| Sumo Restaurant Bjørvika | canonical | Current catalog contains `sumo-bjorvika-oslo`. |
| Grefsenkollen restaurant | review | Active current restaurant identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| Sumo Restaurant Hegdehaugsveien | canonical | Current catalog contains `sumo-hegdehaugsveien-oslo`. |
| Gamle Raadhus Restaurant | review | Existing historical P0 review; semantic QA emitted garnish/component fragments as standalone dishes and needs generic output repair plus reproof. |
| Sjømagasinet Restaurant og Vinbar | canonical | Current catalog contains the same physical identity as `sjomagasinet-oslo`. |
| The Salmon | review | Existing historical P0 review; fresh reproof was nondeterministic and also exposed generic numbered menu-package labels. |
| Brasserie Opera | review | Existing current VisitOSLO review; active restaurant, but the inspected first-party surface has not yet established the final canonical priced dish source. |
| Sumo Solli Plass | canonical | Current catalog contains `sumo-solli-plass-oslo`. |
| Aanerud Bakeri Oslo | review | Active current bakery/restaurant identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| Carls | review | Current VisitOSLO venue combines food, drink and activities; restaurant-level source fit and a canonical dish source remain unresolved. |
| Rorbua | canonical | Current catalog contains `rorbua-oslo`. |
| Sumo Storo | canonical | Current catalog contains `sumo-storo-oslo`. |
| Ekebergrestauranten | review | Existing current VisitOSLO review; exact-head intake exposed headings, allergen rows and waiter/presentation instructions as priced dishes. |
| Lofoten Fish Restaurant | review | Same physical identity as historical `Lofoten Fiskerestaurant` review; prior fresh reproof emitted a platter description instead of the canonical dish title. |
| Frognerseteren - Kafé Seterstua | review | Separate current café product at Frognerseteren; it is not equated with canonical `frognerseteren-finstua-oslo` without its own menu/source proof. |
| Festningen Restaurant | canonical | Current catalog contains `festningen-restaurant-oslo`. |
| Sumo Restaurant Karl Johan | canonical | Current catalog contains `sumo-karl-johan-oslo`. |
| Kafé Villa Grande | review | Active current café identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| The Top Terrace | review | Separate terrace product; it is not equated with canonical `the-top-restaurant-oslo` without a physical/menu identity proof. |
| Shutter by Sky | review | Active current food-and-drink identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| ASIA Aker Brygge | canonical | Current catalog contains `asia-aker-brygge-oslo`. |
| Voksenåsen Bar & Terrace | review | Active hotel bar/terrace food identity; dish-first relevance and a canonical source remain unresolved. |
| Louise | review | Existing historical P0 review; first-party menu endpoint failed deterministically and no secondary authority was substituted. |
| Den Gamle Major | review | Active current pub/restaurant identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| Folkvang Sagene | review | Existing current VisitOSLO review; exact-head output passed structurally but semantic QA found incorrect multiple-price binding. |
| Store Stå Pub | review | Active current pub/food identity; dish-first relevance and canonical source fit remain unresolved. |
| Skaugum | review | Active current food-and-drink venue; restaurant identity/source fit remains unresolved in the census. |
| Solsiden Restaurant | review | Existing historical P0 review; cross-card price-association risk remains fail-closed. |
| Kunstnernes Jur | review | Active current bar/café identity at Kunstnernes Hus; restaurant-level source fit and canonical intake remain unresolved. |
| FYR Bistronomi & Bar | review | Existing historical P0 review; first-party source is rich, but canonical extraction remained below floor and needs fresh-main generic repair/reproof. |
| Lanternen Yacht Club | review | Active seasonal food-and-drink identity; canonical dish source and restaurant-level source fit remain unresolved. |
| Burger Joint Aker Brygge | canonical | Current catalog contains `burger-joint-aker-brygge-oslo`. |
| Anne på landet – Hønse-Lovisas hus | review | Existing current VisitOSLO review; active café with handmade food and lunch service, but no canonical source-intake proof yet. |
| Kafé Vigeland | review | Active current café identity at the Vigeland area, but no canonical manifest/source-intake proof is established in the current census yet. |
| Jakobs Hage | review | Active current food-and-drink identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| Lekter'n | review | Active current seasonal restaurant/bar identity at Aker Brygge, but no canonical manifest/source-intake proof is established in the current census yet. |
| Olivia Aker Brygge | canonical | Current catalog contains `olivia-aker-brygge-oslo`. |
| Food at SALT Art & Music | review | Current VisitOSLO product is a mixed cultural/food venue; restaurant-level source fit and canonical dish source remain unresolved. |
| Asylet | canonical | Current catalog contains the same physical identity as `kafe-asylet-gronland-oslo`. |
| Lorry Restaurant | canonical | Current catalog contains `lorry-restaurant-oslo`. |

Outdoor-seating restaurant reconciliation:
- canonical: **13**;
- review: **28**;
- excluded: **0**;
- missing: **0**.

This closes classification for the **41-product restaurant section** of this current VisitOSLO thematic
source. The separate 13-product drinks-in-the-sun section is not silently treated as restaurants and
can be reconciled separately if it contributes restaurant identities. The 28 review items remain open
until their source-fit or parser blocker families are resolved.

## Current source refresh — VisitOSLO accessible restaurants complete

The current VisitOSLO accessible-restaurants guide was re-opened on 2026-09-21. The guide was
published 2026-05-27, updated 2026-07-10, and exposes two finite restaurant sets:
**39 / 39** under wheelchair access and **42 / 42** under lower-noise dining. The two sets overlap by
**20** identities, for **61 unique current identities** in this source family.

Source:
- https://www.visitoslo.com/your-oslo/accessibility/accessible-restaurants

VisitOSLO explicitly states that these recommendations are compiled from external sources and are not
VisitOSLO certifications of accessibility. This census uses the page only as a current restaurant-discovery
signal; accessibility claims are not imported into Fysen's restaurant model.

| Restaurant / product | Source set | Census status | Reason |
|---|---|---|---|
| Sjømagasinet Restaurant og Vinbar | both | canonical | Same physical identity already established as `sjomagasinet-oslo`. |
| Brasserie Opera | both | review | New current benchmark signal. Active Oslo restaurant, but the currently inspected first-party landing page does not itself establish the final canonical priced dish surface. |
| Vaaghals | both | review | First-party PDF transport was repaired, but the latest Michelin reproof still failed canonical extraction. |
| Atlas Brasserie & Café | wheelchair | canonical | Current catalog contains `atlas-brasserie-oslo`. |
| Feast at MUNCH | wheelchair | review | Current guide product is not automatically equated with `munch-kafe-bjorvika-oslo`; exact venue/menu identity must be proven first. |
| The Top Restaurant | wheelchair | canonical | Current catalog contains `the-top-restaurant-oslo`; this is not the separate The Top Terrace product. |
| Madonna | wheelchair | canonical | Current catalog contains `madonna-oslo`. |
| Ahaan | both | review | Current Ahaan product is kept separate from the combined Plah & Ahaan listing and has no canonical manifest proof. |
| Cru wine & kitchen | both | canonical | Current catalog contains the established Cru identity `cru-oslo`. |
| Vintage Kitchen | both | canonical | Current catalog contains `vintage-kitchen-oslo`. |
| Piazza Italia | both | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Mendel’s Oslo | both | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Mamma Pizza Vika - Osteria di mare | both | canonical | Current catalog contains the same Vika venue as `mamma-pizza-vika-oslo` (Ruseløkkveien 26). |
| Nam Fah | wheelchair | review | Active current Thai restaurant at Maridalsveien 21, but no canonical manifest/source-intake proof is established in the current census yet. |
| Vinoteket | wheelchair | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Peloton | both | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Louise | wheelchair | review | First-party menu endpoint failed deterministically; no secondary authority substituted. |
| Smalhans | wheelchair | review | Named dishes exist, but published prices bind to menu packages rather than individual dishes. |
| Trattoria Popolare | wheelchair | review | Active current restaurant at Trondheimsveien 2 with an à la carte food offering, but no canonical manifest/source-intake proof is established in the current census yet. |
| Mon Oncle | wheelchair | review | Public surface exposes menu formats/prices rather than stable named individually priced dishes. |
| Girotondo | both | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Hrímnir Ramen | wheelchair | canonical | Current catalog contains `hrimnir-ramen-storgata`. |
| Restaurant À L’aise (closed) | both | excluded | VisitOSLO explicitly marks this identity closed; it is outside the active restaurant universe. |
| Bristol Grill | wheelchair | canonical | Current catalog contains `bristol-grill-oslo`. |
| Grilleriet | wheelchair | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Restaurant Eik Annen Etage | wheelchair | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Ekspedisjonshallen | both | review | Current PDF was blocked by source robots policy. |
| Hot Shop | both | review | Tasting-menu package evidence; additionally tracked as sunset/review after announced 2026 closure. |
| TAK Oslo | wheelchair | review | Active current guide identity; no canonical manifest/source-intake proof is established; it is not confused with similarly named catalog entries. |
| Hard Rock Cafe Oslo | wheelchair | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Festningen Restaurant | wheelchair | canonical | Current catalog contains `festningen-restaurant-oslo`. |
| SEVEN | wheelchair | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| KöD Frogner | both | review | Shared image-only menu source; no supported textual dish source proven. |
| Maaemo | both | review | No stable public current named dish output suitable for dish-first intake. |
| Centropa | both | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Arakataka | both | canonical | Current catalog contains `arakataka-oslo`. |
| Kafé Republik | both | review | Exact-head intake #1109 generated and strict-validated 13 items, but the current first-party page contains 15 individually priced dishes. Semantic/source comparison shows extraction loss for `Grilled Beef Skewers, Peanut Sauce` (185 NOK) and `Spekemat` (165 NOK). Keep fail-closed pending generic extraction repair and fresh reproof. |
| Bar Boman | wheelchair | canonical | Current catalog contains `bar-boman-oslo`. |
| Restaurant Betong | both | review | Same physical identity as historical `Betong` review; tasting-menu formats/prices do not provide stable individually priced named dishes. |
| ASIA Aker Brygge | quiet | canonical | Current catalog contains `asia-aker-brygge-oslo`. |
| Nodee Sky | quiet | canonical | Current catalog contains exact identity `nodee-sky-oslo`. |
| Ostebutikken Deli & Bistro | quiet | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Brasserie Blanche | quiet | canonical | Current catalog contains `brasserie-blanche-oslo`. |
| Lille Herbern | quiet | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Kolonialen Bislett | quiet | review | No stable public named/priced menu proven. |
| Ruffino Ristorante Italiano | quiet | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Gangnam Korean Restaurant | quiet | canonical | Current catalog contains exact identity `gangnam-korean-restaurant-oslo`. |
| SAVAGE | quiet | review | Current first-party surface has not yielded stable dish-level canonical intake evidence. |
| Trancher Grünerløkka | quiet | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Restaurant Stallen | quiet | review | Seasonal serving/package menu rather than individually priced named dishes. |
| J2 Modern Korean | quiet | review | Package menu rather than individually priced dish output. |
| Brasserie Hansken | quiet | canonical | Current catalog contains `brasserie-hansken-oslo`. |
| Baltazar Ristorante & Enoteca | quiet | review | Active current restaurant at Dronningens gate 27 with a seasonal à la carte menu and pizza, but no canonical manifest/source-intake proof is established in the current census yet. |
| [Vin] Tjuvholmen | quiet | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Plah & Ahaan | quiet | review | Combined current guide product remains review; it is not silently collapsed into either Plah or Ahaan without exact physical/menu identity proof. |
| Brasserie France | quiet | canonical | Current catalog contains `brasserie-france-oslo`. |
| Brasserie Rivoli | quiet | review | Active current guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Theatercaféen | quiet | canonical | Current catalog contains `theatercafeen-oslo`. |
| Dinner National | quiet | canonical | Current catalog contains the Nationaltheatret venue as `dinner-nationaltheatret-oslo`. |
| Kain Neo-Filipino Bistro | quiet | canonical | Current catalog contains exact identity `kain-neo-filipino-bistro-oslo`. |
| Restaurant Kontrast | quiet | review | Set-menu formats/prices and concept, not a stable individually priced named dish list. |

Accessible-restaurants reconciliation across the **61 unique identities**:
- canonical: **21**;
- review: **39**;
- excluded: **1**;
- missing: **0**.

Per finite source set:
- wheelchair-access list: **12 canonical / 26 review / 1 excluded / 0 missing**;
- lower-noise list: **14 canonical / 27 review / 1 excluded / 0 missing**.

The closed À L’aise listing is excluded from the active universe. Review rows remain review rather than
being silently equated with similarly named or co-located canonical venues. In particular, Feast at MUNCH
is not automatically collapsed into MUNCH Kafé, Ahaan is not collapsed into Plah & Ahaan, and current
physical venue identities remain distinct unless the catalog/source evidence establishes equivalence.

This closes classification for the complete current VisitOSLO accessibility restaurant guide. It does
not close the broad 326-product VisitOSLO restaurant catalogue and it does not resolve the remaining
review queue.

## Current source refresh — VisitOSLO traditional Norwegian food complete

The current VisitOSLO guide "Where to eat traditional Norwegian food" was re-opened on 2026-09-21.
The article was published 2026-05-26, updated 2026-07-16, and exposes three finite restaurant/product
sets: **15 / 15** traditional-Norwegian places, **11 / 11** sandwich places and **11 / 11** seafood
places. After overlap, the source family contains **35 unique identities**.

Source:
- https://www.visitoslo.com/articles/norwegian-restaurants

| Restaurant / product | Source set | Census status | Reason |
|---|---|---|---|
| Kaffistova | traditional | canonical | Current catalog contains `kaffistova-oslo`. |
| Rorbua | traditional | canonical | Current catalog contains `rorbua-oslo`. |
| Helt Vilt | traditional | canonical | Current catalog contains exact Helt Vilt identity `helt-vilt-vulkan-oslo` at Vulkan 5. |
| Stortorvets Gjæstgiveri | traditional | review | Active identity, but no stable current first-party named/priced menu proven in the P0 pass. |
| Gamle Raadhus Restaurant | traditional+sandwiches | review | Semantic QA still emitted garnish/component fragments as standalone dishes; needs generic output repair and reproof. |
| Frognerseteren - Restaurant Finstua | traditional | canonical | Same restaurant identity as canonical `frognerseteren-finstua-oslo`; the first-party source itself is the Restaurant Finstua menu. |
| Bønder i byen Grünerløkka | traditional | canonical | Current catalog contains the established same venue as `bonder-i-byen-oslo`. |
| Bristol Grill | traditional | canonical | Current catalog contains `bristol-grill-oslo`. |
| Asylet | traditional | canonical | Current catalog contains the same physical identity as `kafe-asylet-gronland-oslo`. |
| Smalhans | traditional | review | Named dishes exist, but published prices bind to menu packages rather than individual dishes. |
| Restaurant Schrøder | traditional | review | Fresh P0 reproof retained title/description fusion. |
| Den Glade Gris | traditional | review | PDF beverage/layout leakage remains. |
| Lorry Restaurant | traditional | canonical | Current catalog contains `lorry-restaurant-oslo`. |
| Engebret Café | traditional+sandwiches | review | Fresh #811 reproof showed English translation/description rows inheriting following Norwegian dish prices. |
| Dovrehallen Bar & Restaurant | traditional | review | Same physical identity as historical `Dovrehallen` review; fresh reproof missed current priced dishes/variants. |
| Theatercaféen | sandwiches | canonical | Current catalog contains `theatercafeen-oslo`. |
| Nasjonalmuseet Kafe | sandwiches | review | Current VisitOSLO sandwich-list identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Mendel’s Oslo | sandwiches | review | Current VisitOSLO sandwich-list identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Atlas Brasserie & Café | sandwiches | canonical | Current catalog contains `atlas-brasserie-oslo`. |
| Frognerseteren - Kafé Seterstua | sandwiches | review | Separate current café product at Frognerseteren; it is not equated with canonical `frognerseteren-finstua-oslo` without its own menu/source proof. |
| Palmen Restaurant & Bar | sandwiches | canonical | Current catalog contains `palmen-restaurant-oslo`. |
| Åpent Bakeri Barcode | sandwiches | review | Hybrid/bakery candidate not closed by current canonical evidence; needs fresh marginal-value/source reproof. |
| Karlsborg Spiseforretning | sandwiches | review | Current VisitOSLO sandwich-list identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Vintage Kitchen | sandwiches | canonical | Current catalog contains `vintage-kitchen-oslo`. |
| The Salmon | seafood | review | Fresh #811 reproof was nondeterministic (53 vs 0 items) and also exposed generic numbered menu-package labels. |
| Sjømagasinet Restaurant og Vinbar | seafood | canonical | Current catalog contains the same physical identity as `sjomagasinet-oslo`. |
| Louise | seafood | review | First-party menu endpoint failed deterministically; no secondary authority substituted. |
| Lofoten Fish Restaurant | seafood | review | Same physical identity as historical `Lofoten Fiskerestaurant` review at Stranden 75; prior fresh reproof emitted a platter description instead of the canonical dish title. |
| Havsmak | seafood | review | Section-heading leak was fixed, but legitimate dishes immediately after headings were still not fully recovered. |
| Lofotstua | seafood | review | No stable public first-party priced dish menu proven. |
| Skur 33 | seafood | review | Component/allergen/layout fragments remain in generated output. |
| Sabi Omakase Oslo | seafood | review | Omakase/package price without stable named individually priced current courses. |
| Solsiden Restaurant | seafood | review | Cross-card price-association risk remains fail-closed. |
| Fiskeriet Youngstorget | seafood | canonical | Current catalog contains `fiskeriet-youngstorget-oslo`. |
| Fiskeriet Bjørvika | seafood | canonical | Current catalog contains `fiskeriet-bjorvika-oslo`. |

Traditional-Norwegian-food reconciliation across the **35 unique identities**:
- canonical: **15**;
- review: **20**;
- excluded: **0**;
- missing: **0**.

Per finite source set:
- traditional Norwegian: **8 canonical / 7 review / 0 excluded / 0 missing**;
- sandwiches: **4 canonical / 7 review / 0 excluded / 0 missing**;
- seafood: **3 canonical / 8 review / 0 excluded / 0 missing**.

Physical identities remain strict. VisitOSLO's Restaurant Finstua maps to canonical
`frognerseteren-finstua-oslo`, whose first-party menu source is explicitly Restaurant Finstua, while
Frognerseteren Kafé Seterstua remains a separate review identity. The new Nasjonalmuseet Kafe,
Mendel’s Oslo and Karlsborg Spiseforretning signals stay in review until their dish-first source fit is
proven; they are not promoted solely because VisitOSLO includes them.

This closes classification for all three finite product sets in this current VisitOSLO article. It does
not close the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO fine dining complete

The current VisitOSLO guide "Fine dining the Oslo way" was re-opened on 2026-09-21. The article was
published 2026-05-27, updated 2026-07-14, and exposes **34 / 34** current fine-dining products on one
finite list.

Source:
- https://www.visitoslo.com/your-oslo/oslo-for-foodies/fine-dining

| Restaurant / product | Census status | Reason |
|---|---|---|
| Maaemo | review | No stable public current named dish output suitable for dish-first intake. |
| Statholdergaarden | canonical | Current catalog contains `statholdergaarden-oslo`. |
| Restaurant Kontrast | review | Same physical identity as historical `Kontrast` review; set-menu formats/prices do not provide a stable individually priced named dish list. |
| J2 Modern Korean | review | Package menu rather than individually priced dish output. |
| Restaurant À L’aise (closed) | excluded | VisitOSLO explicitly marks this identity closed; outside the active restaurant universe. |
| Sabi Omakase Oslo | review | Omakase/package price without stable named individually priced current courses. |
| Palace Grill | review | P1 round-2 evidence remained insufficient for canonical dish-first intake; needs fresh current-source reproof. |
| Hot Shop | review | Tasting-menu package evidence; additionally tracked as sunset/review after announced 2026 closure. |
| PANU | review | Menu is image-led / no stable textual named-priced list proven. |
| Mon Oncle | review | Public surface exposes menu formats/prices rather than stable named individually priced dishes. |
| Plah & Ahaan | review | Combined current VisitOSLO product remains review; it is not silently collapsed into Plah or Ahaan without exact physical/menu identity proof. |
| Vaaghals | review | First-party PDF transport was repaired, but the latest Michelin reproof still failed canonical extraction. |
| Katla | canonical | Current catalog contains `katla-oslo`. |
| Apostrophe | review | Active current fine-dining guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Kastellet | review | Active current fine-dining guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Arakataka | canonical | Current catalog contains `arakataka-oslo`. |
| Alex Sushi | review | Active current fine-dining guide identity; no exact canonical manifest/source-intake proof is established in the current census yet. |
| Code Restaurant | review | Active current fine-dining guide identity; no exact canonical manifest/source-intake proof is established. It is not equated with Dinner Barcode or other Barcode venues. |
| TAK Oslo | review | Active current fine-dining guide identity; no exact canonical manifest/source-intake proof is established. Similar string fragments in other catalog slugs are not identity evidence. |
| The Top Restaurant | canonical | Current catalog contains `the-top-restaurant-oslo`; this remains distinct from The Top Terrace. |
| Ekebergrestauranten | review | Exact-head intake previously exposed bilingual headings, allergen rows and waiter/presentation instructions as priced dishes; keep fail-closed pending generic HTML cleanup and fresh reproof. |
| Feinschmecker | review | Active current fine-dining guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Grefsenkollen restaurant | review | Active current restaurant identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| Lofoten Fish Restaurant | review | Same physical identity as historical `Lofoten Fiskerestaurant` review at Stranden 75; prior fresh reproof emitted a platter description instead of the canonical dish title. |
| Frognerseteren - Restaurant Finstua | canonical | Same restaurant identity as canonical `frognerseteren-finstua-oslo`; its first-party menu source is explicitly Restaurant Finstua. |
| Palmen Restaurant & Bar | canonical | Current catalog contains `palmen-restaurant-oslo`. |
| Grand Café | review | Active current lunch/fine-dining restaurant at Karl Johans gate 31, but no canonical manifest/source-intake proof is established in the current census yet. |
| Dinner Barcode | canonical | Current catalog contains exact venue identity `dinner-barcode-oslo`. |
| Dinner National | canonical | Current catalog contains the Nationaltheatret venue as `dinner-nationaltheatret-oslo`. |
| Bar Boman | canonical | Current catalog contains `bar-boman-oslo`. |
| Festningen Restaurant | canonical | Current catalog contains `festningen-restaurant-oslo`. |
| Restaurant Eik Annen Etage | review | Active current fine-dining guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| SEVEN | review | Active current fine-dining guide identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Credo Restaurant | review | Existing historical P0 review; no stable current public named/priced first-party dish list has been proven. |

Fine-dining reconciliation:
- canonical: **10**;
- review: **23**;
- excluded: **1**;
- missing: **0**.

The closed À L’aise listing is excluded from the active universe. String similarity is not used as
physical-identity evidence: Code Restaurant is not equated with Dinner Barcode, and TAK Oslo is not
equated with Arakataka, Taki or Tatakii. Conversely, Dinner Barcode, Dinner National and Restaurant
Finstua map to exact established canonical venue identities.

This closes classification for the complete current VisitOSLO fine-dining source family. It does not
close the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO fireplace restaurants complete

The current VisitOSLO winter page was re-opened on 2026-09-21. Its "Fire place restaurants" section
exposes **10 / 10** current products on one finite list.

Source:
- https://www.visitoslo.com/your-oslo/winter

| Restaurant / product | Census status | Reason |
|---|---|---|
| Rorbua | canonical | Current catalog contains `rorbua-oslo`. |
| Grefsenkollen restaurant | review | Active current restaurant identity, but no canonical manifest/source-intake proof is established in the current census yet. |
| Kafé Celsius | review | Current VisitOSLO fireplace-restaurant identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Hos Thea | review | Current VisitOSLO fireplace-restaurant identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Holmenkollen Restaurant | review | Current VisitOSLO fireplace-restaurant identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Stortorvets Gjæstgiveri | review | Existing historical P0 review; active identity, but no stable current first-party named/priced menu was proven. |
| Gamle Raadhus Restaurant | review | Existing historical P0 review; semantic QA emitted garnish/component fragments as standalone dishes and needs generic output repair plus reproof. |
| Frognerseteren - Kafé Seterstua | review | Separate current café product at Frognerseteren; it is not equated with canonical `frognerseteren-finstua-oslo` without its own menu/source proof. |
| Eataly Ristorante | review | Current VisitOSLO fireplace-restaurant identity; no canonical manifest/source-intake proof is established in the current census yet. |
| Olivia Aker Brygge | canonical | Current catalog contains `olivia-aker-brygge-oslo`. |

Fireplace-restaurant reconciliation:
- canonical: **2**;
- review: **8**;
- excluded: **0**;
- missing: **0**.

This source adds explicit review signals for Kafé Celsius, Hos Thea, Holmenkollen Restaurant and Eataly
Ristorante. Frognerseteren Kafé Seterstua remains separate from canonical Restaurant Finstua. No
restaurant is promoted solely because it appears in the VisitOSLO seasonal guide.

This closes classification for the complete current fireplace-restaurant list. It does not close the
broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO wine bars complete

The current VisitOSLO wine-bar guide was re-opened on 2026-09-21. The article was published
2026-05-27, updated 2026-07-03, and exposes **10 / 10** current products on one finite list.

Source:
- https://www.visitoslo.com/restaurants-nightlife/nightlife/wine-bars-in-oslo

| Restaurant / product | Census status | Reason |
|---|---|---|
| Vinoteket | review | Current VisitOSLO wine-bar identity; no exact canonical manifest is established. Dish-first restaurant relevance and a stable priced food source remain to be resolved. |
| Katla | canonical | Current catalog contains `katla-oslo`. |
| [Vin] Bjørvika | review | Current VisitOSLO wine-bar identity in Bjørvika; no exact canonical manifest/source-intake proof is established in the census yet. |
| Becco | review | Current VisitOSLO wine-bar identity; no exact canonical manifest/source-intake proof is established. Keep review until dish-first restaurant relevance is resolved. |
| Oh Dear | review | Current VisitOSLO wine-bar identity; no exact canonical manifest/source-intake proof is established. Keep review until dish-first restaurant relevance is resolved. |
| Grand Café | review | Existing current VisitOSLO review; active restaurant at Karl Johans gate 31, but no canonical manifest/source-intake proof is established yet. |
| Cru wine & kitchen | canonical | Same established physical identity as canonical `cru-oslo`. |
| Nektar | canonical | Current catalog contains `nektar-vinbar-oslo`. |
| Territoriet | review | Current VisitOSLO wine-bar identity; no exact canonical manifest/source-intake proof is established. Keep review until dish-first restaurant relevance is resolved. |
| Skaal Matbar | canonical | Current catalog contains `skaal-matbar-oslo`. |

Wine-bar reconciliation:
- canonical: **4**;
- review: **6**;
- excluded: **0**;
- missing: **0**.

A wine-bar label is not itself an exclusion reason under the dish-first coverage contract. Non-canonical
identities therefore remain in review until their meaningful food coverage and stable dish source are
established or an explicit exclusion decision is justified. String/location similarity is not used to
collapse [Vin] Bjørvika into another Bjørvika venue.

This closes classification for the complete current VisitOSLO wine-bar source family. It does not close
the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO microbreweries complete

The current VisitOSLO microbrewery guide was re-opened on 2026-09-21. The article was published
2026-05-26, updated 2026-08-20, and names **10 / 10** current brewery/bar products including its
three additional beer-enthusiast suggestions.

Source:
- https://www.visitoslo.com/articles/microbreweries-in-oslo

| Restaurant / product | Census status | Reason |
|---|---|---|
| Ringnes Brygghus | canonical | Current catalog contains exact identity `ringnes-brygghus-oslo`; current VisitOSLO product explicitly combines microbrewery and pizzeria. |
| Crow Bar & Brewery | review | Current VisitOSLO guide explicitly documents a substantial food offering alongside the brewery/bar, but no exact canonical manifest/source-intake proof is established yet. |
| Røør | excluded | Current product is a gaming/beer bar with 70+ taps and shuffleboards; the current VisitOSLO surface establishes no restaurant food offering. |
| Schouskjelleren Mikrobryggeri | excluded | Current product is a beer-focused microbrewery/bar; the current VisitOSLO surface establishes no restaurant food offering. |
| Oslo Mikrobryggeri | excluded | Current product is a brewery pub focused on its beer selection; the current VisitOSLO surface establishes no restaurant food offering. |
| Grünerløkka Brygghus | review | VisitOSLO explicitly documents traditional English pub food and rustic European fare, but no exact canonical manifest/source-intake proof is established yet. |
| Amundsen Bryggeri & Spiseri | review | VisitOSLO explicitly documents a broad food offer from snacks through fish & chips and desserts; no exact canonical manifest/source-intake proof is established yet. |
| Brygg | review | VisitOSLO explicitly states that Brygg combines food with beer and also hosts pop-up restaurants; stable own dish-source fit remains unresolved. |
| Bar Babylon | review | Current VisitOSLO bar product is drink-led, but a current VisitOSLO article also documents a weekly changing snack menu; keep review pending dish-first marginal-value/source-fit decision. |
| Beer Palace | excluded | Current VisitOSLO product is a beer pub; food is delivered from neighbouring Burger Joint rather than established as Beer Palace's own restaurant menu. |

Microbrewery reconciliation:
- canonical: **1**;
- review: **5**;
- excluded: **4**;
- missing: **0**.

This pass applies the dish-first contract rather than treating every bar as a restaurant. Crow,
Grünerløkka Brygghus, Amundsen and Brygg have explicit current food signals, while Bar Babylon has a
separate current VisitOSLO signal for a rotating snack menu; all remain review until a stable canonical
dish source or an explicit marginal-value decision is established. Røør, Schouskjelleren and Oslo
Mikrobryggeri are excluded on the current evidence because their product surfaces establish beer/bar
use but no restaurant food surface. Beer Palace is also excluded because its described food is supplied
by neighbouring Burger Joint rather than a Beer Palace restaurant menu.

This closes classification for the complete current VisitOSLO microbrewery source family. It does not
close the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO cocktail bars complete

The current VisitOSLO cocktail-bar guide was re-opened on 2026-09-21 and exposes **11 / 11**
current products on one finite list.

Source:
- https://www.visitoslo.com/your-oslo/oslo-for-foodies/cocktail-scene

| Restaurant / product | Census status | Reason |
|---|---|---|
| Norda | canonical | Current catalog contains `norda-oslo`; this row is the restaurant identity, not the separate Norda Cocktail Bar product. |
| Fuglen | excluded | Current VisitOSLO product is a coffee shop by day and cocktail bar by night; the current surface establishes coffee/tea and drinks but no restaurant dish offering. |
| Himkok | review | Current VisitOSLO product is cocktail/distillery-led but explicitly describes an outdoor kitchen in the venue summary; keep review pending stable own dish-source proof. |
| Svanen Oslo | excluded | Current VisitOSLO cocktail guide establishes the bar identity but no restaurant food surface in the currently inspected source evidence. |
| Posthallen Drinkhub | review | VisitOSLO classifies it as a restaurant/bar venue and explicitly documents snacks plus a food discount; exact dish-source/canonical identity remains unresolved. |
| Anam Cara | review | VisitOSLO explicitly shows and describes snacks, including cured meats/cheese, alongside the cocktail/wine bar; stable dish-first source fit remains unresolved. |
| Pier 42 | excluded | Current VisitOSLO product is the Amerikalinjen cocktail bar and the current surface establishes cocktails but no restaurant dish offering. |
| Bar Boca | excluded | Current VisitOSLO product is a cocktail/wine bar and the current surface establishes drinks but no restaurant dish offering. |
| Torggata Botaniske | excluded | Current VisitOSLO product is an intimate cocktail bar and the current surface establishes drinks but no restaurant dish offering. |
| About Contrasts | review | Existing P1 review; current VisitOSLO now explicitly describes the venue as a café and brunch venue by day and cocktail bar by night, strengthening restaurant relevance without proving canonical intake. |
| Norda Cocktail Bar | review | Separate current bar product at The Hub; VisitOSLO explicitly documents a range of bar snacks. It is not silently collapsed into canonical `norda-oslo` without exact menu/physical-identity proof. |

Cocktail-bar reconciliation:
- canonical: **1**;
- review: **5**;
- excluded: **5**;
- missing: **0**.

This pass applies the dish-first restaurant contract rather than treating every cocktail bar as a
restaurant. Posthallen Drinkhub, Anam Cara, Himkok, About Contrasts and Norda Cocktail Bar have current
food signals and therefore remain review until stable own dish sources or explicit marginal-value
decisions are established. Fuglen, Svanen Oslo, Pier 42, Bar Boca and Torggata Botaniske are excluded
on the currently inspected VisitOSLO evidence because their product surfaces establish drink/café-bar
use but no restaurant dish offering.

Physical identities remain strict: Norda Cocktail Bar is a separate current VisitOSLO product and is
not silently collapsed into canonical `norda-oslo`.

This closes classification for the complete current VisitOSLO cocktail-bar source family. It does not
close the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO brunch complete

The current VisitOSLO brunch guide was re-opened on 2026-09-21. The article was published
2026-05-27, updated 2026-08-07, and exposes **10 / 10** current products on one finite list.

Source:
- https://www.visitoslo.com/no/spise-og-drikke/kaffe-kake/brunsj

| Restaurant / product | Census status | Reason |
|---|---|---|
| Theatercaféen | canonical | Current catalog contains `theatercafeen-oslo`. |
| Bon Bon Oslo | canonical | Same current physical identity as canonical `bonbon-bjorvika-oslo` at Dronning Eufemias gate 43. |
| KUMI Gamlebyen | review | Current first-party page has unpriced dishes; priced PDF is stale and the prior Wolt venue was deleted. |
| Mauriske Salonger | canonical | Current catalog contains `mauriske-salonger-oslo`. |
| KUMI Oslobukta | review | Current first-party page has unpriced dishes; priced PDF is stale and the prior Wolt venue was deleted. |
| Katla | canonical | Current catalog contains `katla-oslo`. |
| Vintage Kitchen | canonical | Current catalog contains `vintage-kitchen-oslo`. |
| About Contrasts | review | Current VisitOSLO explicitly confirms café/brunch service by day, strengthening restaurant relevance, but canonical dish-source proof remains unresolved. |
| Åpent Bakeri Barcode | review | Hybrid bakery/brunch candidate remains unresolved under the dish-first marginal-value/source contract; no canonical manifest proof yet. |
| Skaal Matbar | canonical | Current catalog contains `skaal-matbar-oslo`. |

Brunch reconciliation:
- canonical: **6**;
- review: **4**;
- excluded: **0**;
- missing: **0**.

Bon Bon Oslo is matched to the exact canonical Bjørvika identity rather than to unrelated similarly
named catalog entries. The two KUMI venues remain distinct review identities with the existing stale-
price/source blocker. About Contrasts and Åpent Bakeri Barcode remain review despite clear brunch
relevance because relevance alone is not canonical intake proof.

This closes classification for the complete current VisitOSLO brunch source family. It does not close
the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO afternoon tea complete

The current VisitOSLO afternoon-tea guide was re-opened on 2026-09-21. The article was published
2026-05-27, updated 2026-08-07, and exposes **13 / 13** current products on one finite list.

Source:
- https://www.visitoslo.com/fr/restaurants-vie-nocturne/cafe-et-gateaux/afternoon-tea

| Restaurant / product | Census status | Reason |
|---|---|---|
| Nasjonalmuseet Kafe | review | Current VisitOSLO café/afternoon-tea identity; no canonical manifest/source-intake proof is established in the census yet. |
| The Top Bar | review | Separate current VisitOSLO product at Radisson Blu Plaza with afternoon tea and bar service; it is not equated with canonical `the-top-restaurant-oslo`. |
| Palmen Restaurant & Bar | canonical | Current catalog contains `palmen-restaurant-oslo`. |
| TAK Oslo | review | Existing current fine-dining review; no exact canonical manifest/source-intake proof is established. Similar string fragments in other catalog slugs are not identity evidence. |
| Mauriske Salonger | canonical | Current catalog contains `mauriske-salonger-oslo`. |
| To Søstre | review | Existing historical P1 review; current offering is afternoon-tea/package led rather than a stable individually priced named dish list. |
| THIEF RESTAURANT | review | Current VisitOSLO restaurant identity with snacks, fast food and main courses, but no exact canonical manifest/source-intake proof is established in the census yet. |
| Pascal Henrik Ibsens gate | review | Current VisitOSLO pastry-shop/restaurant identity with warm lunch and dinner service; no exact canonical manifest/source-intake proof is established yet. |
| Ahaan | review | Current standalone Ahaan product remains review; it is not silently collapsed into Plah or the combined Plah & Ahaan listing without exact physical/menu identity proof. |
| Mendel’s Oslo | review | Current pastry-shop/café identity with afternoon tea; no canonical manifest/source-intake proof is established in the census yet. |
| Spor av Nord | review | Current café/restaurant identity with breakfast, lunch, dinner and afternoon tea; no canonical manifest/source-intake proof is established yet. |
| A.C. Perchs Thehandel | review | Current tea-room/café identity with afternoon tea and lunch signal; dish-first marginal value and stable canonical source remain unresolved. |
| Lysebu Restaurant | review | Current full restaurant identity with à la carte, seasonal menus and afternoon tea; no canonical manifest/source-intake proof is established yet. |

Afternoon-tea reconciliation:
- canonical: **2**;
- review: **11**;
- excluded: **0**;
- missing: **0**.

The source family is restaurant-relevant even when the product is primarily a café, pastry shop or
tea room, because the current product surfaces establish actual food service. Those identities remain
review rather than being excluded or promoted without a stable canonical dish source.

Physical identities remain strict: The Top Bar is not collapsed into The Top Restaurant, and standalone
Ahaan is not collapsed into Plah or the combined Plah & Ahaan product without exact identity proof.

This closes classification for the complete current VisitOSLO afternoon-tea source family. It does not
close the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO game bars complete

The current VisitOSLO guide to game bars was re-opened on 2026-09-21. The Norwegian article is dated
2026-05-26, updated 2026-09-21, and names **10 / 10** current venues across its main recommendations
and "Flere spillbarer" section.

Source:
- https://www.visitoslo.com/no/artikler/spillbarer-i-oslo

| Restaurant / product | Census status | Reason |
|---|---|---|
| The Good Knight | excluded | Current VisitOSLO product is a chess café/bar; the current surface establishes drinks and chess activity but no restaurant dish offering. |
| Oche Torggata | canonical | Current catalog contains exact identity `oche-torggata-oslo` with a current first-party food menu. |
| Tilt | excluded | Current VisitOSLO product is an arcade/beer bar; the current surface establishes drinks and games but no restaurant dish offering. |
| Røør | excluded | Existing current microbrewery exclusion; the current surface establishes beer and shuffleboard but no restaurant food offering. |
| Oslo Camping | excluded | Current VisitOSLO product is a mini-golf bar/club; the current surface establishes drinks/activity but no restaurant dish offering. |
| Raadhuset | review | Current VisitOSLO product has an explicit Mexican-inspired menu with tacos, burritos, nachos and vegan alternatives; no canonical manifest/source-intake proof is established yet. |
| Spillbaren Barcode | excluded | Current VisitOSLO product establishes games and cocktail-bar service but no own restaurant food offering in the inspected surface. |
| Spillbaren Majorstuen | excluded | Current VisitOSLO product establishes games and bar service but no own restaurant food offering in the inspected surface. |
| Grønland Boulebar | review | Current VisitOSLO product explicitly includes a restaurant serving French-inspired food centered on rotisserie chicken; no canonical manifest/source-intake proof is established yet. |
| Underground Golf Club | review | Current VisitOSLO product explicitly serves thin-crust pizza through Barry’s Pizza Shack at the venue; exact dish-source/canonical identity remains unresolved. |

Game-bar reconciliation:
- canonical: **1**;
- review: **3**;
- excluded: **6**;
- missing: **0**.

This pass applies the dish-first contract venue by venue. Oche is already canonical. Raadhuset,
Grønland Boulebar and Underground Golf Club have explicit current food service and therefore remain
review until a stable canonical dish source or identity proof is established. The six excluded venues
are activity/bar identities whose currently inspected VisitOSLO product surfaces establish no own
restaurant dish offering.

This closes classification for the complete current VisitOSLO game-bar guide. It does not close the
broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — VisitOSLO baked goods and cakes complete

The current VisitOSLO guide to baked goods and cakes was re-opened on 2026-09-21 through the indexed
French locale. The article was published 2026-05-27, updated 2026-08-07, and exposes **13 / 13**
current products on one finite list.

Source:
- https://www.visitoslo.com/fr/restaurants-vie-nocturne/cafe-et-gateaux/viennoiseries-et-patisseries

| Restaurant / product | Census status | Reason |
|---|---|---|
| Aanerud Bakeri Oslo | review | Existing current VisitOSLO review; active bakery/café identity, but no canonical manifest/source-intake proof is established yet. |
| Talormade Oslobukta | review | Current bakery/donut identity in Oslobukta; no exact canonical manifest/source-intake proof is established in the census yet. |
| Mauriske Salonger | canonical | Current catalog contains `mauriske-salonger-oslo`. |
| Pascal Henrik Ibsens gate | review | Current pastry-shop/restaurant identity with warm lunch and dinner service; no exact canonical manifest/source-intake proof is established yet. |
| Theatercaféen | canonical | Current catalog contains `theatercafeen-oslo`. |
| Mendel’s Oslo | review | Current pastry-shop/café identity with afternoon tea; no canonical manifest/source-intake proof is established yet. |
| Åpent Bakeri Inkognito terrasse | review | Current bakery/café identity; it is not collapsed into other Åpent Bakeri locations without exact physical/source identity proof. |
| Haralds Vaffel | canonical | Current catalog contains `haralds-vaffel-grunerlokka-oslo`. |
| Fjærkonfekt | review | Current confectionery/pastry identity; no canonical manifest/source-intake proof is established yet. |
| Godt Brød bakery | review | Current bakery identity; no exact canonical manifest/source-intake proof is established in the census yet. |
| Sverre Sætre confectionery | review | Current artisan confectionery/cake identity; no canonical manifest/source-intake proof is established yet. |
| Anne på landet – Hønse-Lovisas hus | review | Existing current VisitOSLO review; active café with handmade food and lunch service, but no canonical source-intake proof yet. |
| Farine | review | Existing hidden-gems review; bakery/spiseri identity is active but no stable individually priced dish menu has been proven for immediate canonical intake. |

Baked-goods-and-cakes reconciliation:
- canonical: **3**;
- review: **10**;
- excluded: **0**;
- missing: **0**.

This source family remains relevant under the dish-first contract because the products sell prepared
food, pastries, cakes or café meals. Non-canonical bakery/confectionery identities remain review rather
than being excluded solely for not being full-service restaurants.

Physical identities remain strict: Åpent Bakeri Inkognito terrasse is not collapsed into Barcode,
Tjuvholmen or another Åpent Bakeri location without exact venue/source proof.

This closes classification for the complete current VisitOSLO baked-goods-and-cakes source family. It
does not close the broad 326-product restaurant catalogue or resolve the remaining review queue.

## Current source refresh — Anders Husa Oslo guide complete

The current Anders Husa / Anders & Kaitlin Oslo city guide was re-opened on 2026-09-21. The page
shows an update date of **2026-07-07** and exposes its complete server-rendered Oslo food-map list.
The full current list contains **48 entries**, including restaurants, bakeries, bars, coffee shops and
one explicitly labelled recommended hotel.

Source:
- https://andershusa.com/destinations/best-restaurants-oslo/

This is an independent relevance source rather than canonical truth. The guide itself demonstrates that
point: it still contains À L'aise even though the fresher VisitOSLO evidence explicitly marks that venue
closed. Existing stronger identity/closure evidence therefore remains authoritative for census status.

| Venue / product | Census status | Reason |
|---|---|---|
| Maaemo | review | Existing historical P0 review; no stable public current named dish output suitable for dish-first canonical intake. |
| Tabuno | review | Existing historical P1 review; current independent guide confirms relevance, but fresh canonical source proof remains unresolved. |
| Betong | review | Existing historical P0 review; tasting-menu formats/prices do not provide stable individually priced named dishes. |
| Koie Ramen | review | Existing historical P1 review; current independent guide confirms relevance, but separate exact canonical identity/source proof remains unresolved. |
| Madonna | canonical | Current catalog contains `madonna-oslo`. |
| Vaaghals | review | Existing historical P0 review; first-party PDF transport was repaired, but latest canonical extraction proof remained insufficient. |
| ZZ Pizza | canonical | Current guide lists St. Halvards gate 33, matching canonical `zz-pizza-gamlebyen-oslo`. |
| Hobo Hotel Oslo | excluded | The source explicitly labels this as a recommended hotel umbrella containing several food concepts, not one restaurant identity for the restaurant census. |
| Svanen | excluded | Current independent guide describes a cocktail bar; current VisitOSLO evidence likewise establishes drinks but no restaurant dish surface. |
| Savage | review | Existing historical P0 review; current independent guide confirms relevance, but stable dish-level canonical intake evidence remains unresolved. |
| Substans | review | Existing historical P1 review; current independent guide confirms relevance, but fresh canonical source proof remains unresolved. |
| Stranden 30 | review | Existing historical P1 review; current independent guide confirms relevance, but fresh canonical source proof remains unresolved. |
| Eero | review | Existing historical P0 review; current menu evidence remains package/set-menu led rather than stable individually priced dishes. |
| Palace Grill | review | Existing historical P1 review; current independent guide confirms relevance, but fresh canonical source proof remains unresolved. |
| Bakeriet ved Credo | review | Current independent bakery identity at Nasjonalbiblioteket with prepared food and pastries; it is separate from Credo restaurant and has no canonical manifest/source-intake proof yet. |
| Punk Royale | review | Existing historical P1 review; current independent guide confirms relevance, but fresh canonical source proof remains unresolved. |
| Corral’s Tacos | canonical | Current guide lists Frognerveien 9D, matching exact canonical Solli identity `corrals-tacos-solli-oslo`; it is not the separate Grønland venue. |
| Kafeteria August | review | Existing historical P1 review; current independent guide confirms active all-day restaurant relevance, but canonical source proof remains unresolved. |
| Mon Oncle | review | Existing historical P0 review; public surface exposes menu formats/prices rather than stable named individually priced dishes. |
| Tomodomo | canonical | Current catalog contains `tomodomo-oslo`. |
| Fuglen | excluded | Current independent guide describes coffee-bar-by-day / cocktail-bar-by-night use; current VisitOSLO evidence likewise establishes no restaurant dish offering. |
| Panu | review | Existing historical/current review; menu remains image-led with no stable textual named-priced canonical list proven. |
| Fox and Loaf | review | Existing historical P1 review; current independent guide confirms restaurant relevance, but fresh canonical source proof remains unresolved. |
| Arakataka | canonical | Current catalog contains `arakataka-oslo`. |
| Ugly Duckling | canonical | Current guide lists Torggata 21b, matching exact canonical `ugly-duckling-oslo`. |
| The Little Pickle | review | Existing historical P0 review; dinner menu remains image-led with no stable textual priced dinner list proven. |
| Le Benjamin | review | Existing historical P0 review; fresh first-party priced PDF is semantically useful but production fetching is blocked by publisher robots policy. |
| Territoriet | review | Existing current wine-bar review; independent guide confirms the venue but does not itself resolve dish-first restaurant relevance or canonical source fit. |
| Nektar | canonical | Current catalog contains `nektar-vinbar-oslo`. |
| Hrímnir Ramen | canonical | Current catalog contains `hrimnir-ramen-storgata`, matching the current Maridalsveien identity. |
| Hot Temper | canonical | Current guide lists Nordre gate 24, matching exact canonical `hot-temper-grunerlokka-oslo`. |
| Haralds Vaffel | canonical | Current catalog contains `haralds-vaffel-grunerlokka-oslo`. |
| Kontrast | review | Existing historical P0 review; set-menu formats/prices do not provide a stable individually priced named dish list. |
| Tim Wendelboe | excluded | Current independent guide describes a specialty coffee bar; no restaurant dish surface is established for the restaurant census. |
| Skaal Matbar | canonical | Current catalog contains `skaal-matbar-oslo`. |
| Dumpling AS | review | Current independent guide establishes an active full restaurant with named dumpling dishes, but no exact canonical manifest/source-intake proof exists yet. |
| Supreme Roastworks | excluded | Current independent guide describes a specialty coffee shop; no restaurant dish surface is established for the restaurant census. |
| Rikkes Hage | review | Current independent guide establishes a seasonal beer garden with an own kitchen serving prepared bar snacks; canonical source/seasonality handling remains unresolved. |
| Rodeo | review | Current independent guide establishes an active globally inspired bistro with substantial prepared dishes; no canonical manifest/source-intake proof exists yet. |
| Render Burger | canonical | Current guide lists Toftes gate 19B, matching exact canonical `render-burger-grunerlokka-oslo`. |
| Hot Shop | review | Existing historical P0 review; tasting-menu/package evidence remains unresolved and the venue is separately tracked for announced 2026 closure. |
| Liminal | review | Current independent guide establishes an active seasonal tasting-menu restaurant in Torshov; no canonical manifest/source-intake proof exists yet. |
| Daegens | review | Current independent guide establishes an active Lilleborg bakery with prepared buns and BMO food; no canonical manifest/source-intake proof exists yet. |
| Roze Gastro | review | Current independent guide establishes an active Bislett tasting-menu restaurant with named dishes; no canonical manifest/source-intake proof exists yet. |
| St. Lars | review | Existing historical P1 review; audited source state was image-only despite clear current restaurant relevance. |
| Smalhans | review | Existing historical P0 review; named dishes exist but published prices bind to menu packages rather than individual dishes. |
| Grotto | review | Current independent guide establishes an active full French-style bistro with substantial prepared dishes; no canonical manifest/source-intake proof exists yet. |
| À L'aise | excluded | The independent guide still contains the venue, but current VisitOSLO evidence explicitly marks À L’aise closed; stronger closure evidence keeps it outside the active universe. |

Anders Husa current-guide reconciliation:
- canonical: **12**;
- review: **30**;
- excluded: **6**;
- missing: **0**.

The independent guide contributes several relevant identities not previously closed by the VisitOSLO
families, including Bakeriet ved Credo, Dumpling AS, Rikkes Hage, Rodeo, Liminal, Daegens, Roze Gastro
and Grotto. They remain review until exact dish-source and canonical-intake proof is established.

Physical identity remains strict. Corral's Tacos at Frognerveien 9D maps specifically to canonical
`corrals-tacos-solli-oslo`, not the separate Grønland venue. Bakeriet ved Credo is not collapsed into
Credo restaurant. The recommended Hobo Hotel umbrella is outside the restaurant-identity census even
though the guide describes several food concepts inside the hotel.

This closes classification for the complete current Anders Husa Oslo city-guide list. It does not close
the broad 326-product VisitOSLO restaurant catalogue or resolve the remaining review queue.

## Current source refresh — Anders Husa Cheap Eats complete

The current Anders Husa / Anders & Kaitlin "Best Cheap Eats in Oslo" guide was re-opened on
2026-09-21. The article was updated **2026-04-03** and its editorial list contains **8 / 8**
recommendations. Reader comments and user-suggested venues below the article are not counted as
editorial recommendations.

Source:
- https://andershusa.com/cheap-eats-oslo/

The guide is particularly useful as an independent demand/relevance signal because it explicitly limits
itself to savory, substantial street-food, takeaway and counter-service meals rather than fine dining or
desserts.

| Venue / product | Census status | Reason |
|---|---|---|
| Syverkiosken | review | Existing current review; active prepared-food identity at Maridalsveien 45B, but no canonical manifest/source-intake proof is established yet. |
| Stykke | review | The current guide anchors this recommendation to Møllergata 12, while canonical Stykke manifests are Universitetsgata 2 and Hasle. Do not collapse the source identity across locations without exact relocation/identity proof. |
| Focacceria | canonical | Current guide lists Markveien 34, matching exact canonical `focacceria-grunerlokka-oslo`. |
| Falafel Me | review | Current independent guide establishes an active falafel identity at Storgata 13, but no exact canonical manifest/source-intake proof exists yet. |
| Stangeriet | review | Current independent guide establishes an active prepared-food counter at Vulkan 5, but no canonical manifest/source-intake proof exists yet. |
| Illegal Burger | review | The guide recommendation is brand-level and its contact block points to Olaf Ryes plass 4 while also mentioning Møllergata. The only current canonical Illegal Burger manifest is Møllergata 23, so strict physical identity remains unresolved. |
| Freddy Fuego | canonical | Current guide lists Hausmanns gate 31A, matching canonical `freddy-fuego-burrito-bar-hausmanns-gate-oslo`. |
| Fly Chicken | canonical | Current guide points to the Torggata venue; Fly Chicken's current first-party location page confirms Torggata 9A, matching canonical `fly-chicken-torggata-oslo`. |

Anders Husa Cheap Eats reconciliation:
- canonical: **3**;
- review: **5**;
- excluded: **0**;
- missing: **0**.

Physical identity remains strict. Stykke is not marked canonical merely because the catalog contains
other Stykke branches: the guide's Møllergata 12 identity does not match the current canonical addresses.
Likewise, the Illegal Burger recommendation spans/anchors a different location than the single current
canonical Møllergata manifest, so it remains review. Fly Chicken Torggata is canonical only after the
current first-party location page confirms the article's abbreviated Torggata 9 address is Torggata 9A.

This closes classification for the complete current Anders Husa Cheap Eats editorial list. It does not
close the broad 326-product VisitOSLO restaurant catalogue or resolve the remaining review queue.

## Closeout order

The census should now proceed in this order:

1. **Close census candidates without mixing blocker families.**
   Brasserie Hansken is complete through #850. VisitOSLO tranche 1 has no remaining `missing`, but all three newly found identities are now explicit review items: Coucou on source/extraction, Ekeberg on HTML semantic noise, and Folkvang on multiple-price title parsing. FYR remains a separate historical blocker family.
2. **Reproof parser/semantic holds in generic blocker families.**
   Group HTML semantic leakage, PDF layout/title binding, nondeterministic extraction, robots/source
   blockers and package-only menus rather than creating restaurant-specific runtime exceptions.
3. **Refresh the external Oslo relevance universe.**
   Re-run the benchmark sources from the 2026-09-11 audit plus the broader VisitOSLO restaurant
   catalogue and current demand-gap evidence. Normalize physical identities against current catalog.
4. **Classify every newly observed relevant identity.**
   Every relevant candidate must end as `canonical`, `excluded`, `review`, or `missing`, with
   an explicit source/date and reason.
5. **Coverage declaration gate.**
   Do not claim “all relevant Oslo restaurants are covered” until the refreshed universe has
   `missing = 0` and the remaining `review` queue has been resolved to `canonical` or an explicit
   `excluded` decision under the dish-first contract.

## Next concrete unit of work

The major finite VisitOSLO thematic families, the complete current Anders Husa Oslo city guide and the
current Anders Husa Cheap Eats editorial list are now fully classified with `missing = 0`. Continue with
additional independent current Oslo relevance/demand sources and resolve the accumulated review blocker
families while the broad 326-product VisitOSLO catalogue enumeration remains open. Kafé Republik stays
in its generic extraction-loss blocker family and must not be promoted from the incomplete 13/15 output.
