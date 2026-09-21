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
- The current Git catalog baseline after #850 is **746 manifests**. A new full-catalog production-health claim is not inferred from that Git count alone; the last explicitly cited full health proof above remains 745/745.

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
| Ringnes Brygghus | **missing** | Exact-head intake #1109 generated and strict-validated all 10 current first-party pizzas with correct name/price bindings and clean semantic output. Promotion-ready from artifact `10654979415`; remains `missing` only until separate byte-identical canonical promotion. |
| Angst Bar | excluded | Current VisitOSLO identity is explicitly a bar/club and no restaurant food surface is established; outside the dish-first restaurant census. |
| Latter Restaurant & Bar | review | Active restaurant identity is established, but the current first-party public surface found in this refresh does not expose a stable named/priced a la carte list suitable for immediate intake. |

Hidden-gems reconciliation after exact-head intake #1109:
- canonical: **2**;
- review: **5**;
- excluded: **2**;
- missing: **1**.

Exact-head proof on `5e055411b0fdcfbf9df38cd5230f49080b081dcc` generated **2/2** candidates,
strict-validated **2/2**, and uploaded artifact `10654979415` with SHA-256
`12fc6e90b25b97b5fd6d5f179e7d1ceaa0d7f3d9dc8020735ca3fd2b262c3d19`.
Structural green was not treated as semantic promotion approval: Ringnes is clean 10/10 and
promotion-ready, while Kafé Republik returns to review because two priced source dishes are absent from
the 13-item canonical extraction.

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

Merge the evidence-backed hidden-gems research classification, then promote **Ringnes Brygghus** in a
separate PR from the exact accepted artifact. Kafé Republik remains an extraction-review item and must
not be promoted from the incomplete 13/15 output.

After Ringnes is canonical, hidden-gems reaches `missing = 0`. Continue the refreshed VisitOSLO
universe and remaining current thematic sources while resolving Kafé Republik and other blocker families
separately.
