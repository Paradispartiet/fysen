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

## Exact repository baseline

- current `main`: `1259e32a1637b40201d87f1e7c1fe9e186f8f753`;
- catalog JSON manifests on that tree: **745**;
- last full catalog-health proof before the workflow-only current head:
  `d08fa3b36ff2a11699166a9d0cd0f310b332757f`, Catalog health #262;
- Catalog health #262: **745 manifests / 745 accepted / 0 failed**;
- `d08fa3b… -> 1259e32a…` changes only
  `.github/workflows/revenue-production-proof.yml` and
  `.github/workflows/vercel-production-release.yml`; no catalog file changed.

Therefore the current coverage baseline is **745 canonical manifests**, not 744.

## Historical benchmark reconciliation

The 2026-09-11 quality audit identified 85 benchmark gaps: 52 P0 and 33 P1.
Against current `main`:

- **28 / 85 are now canonical**;
- **57 / 85 remain non-canonical review items**;
- **0 / 85 are unclassified inside that historical benchmark**.

This closes classification of the old 85-place snapshot, but it does **not** prove present-day Oslo
coverage. The external benchmark universe must be refreshed after this reconciliation.

### Historical gaps now canonical — 28

| Restaurant | Status | Current canonical identity |
|---|---|---|
| Statholdergaarden | canonical | `statholdergaarden-oslo` |
| Izakaya by Vladimir Pak | canonical | `izakaya-by-vladimir-pak-oslo` |
| Sjømagasinet | canonical | `sjomagasinet-oslo` |
| Statholderens Mat og Vinkjeller | canonical | `statholderens-mat-vinkjeller-oslo` |
| Cru | canonical | `cru-oslo` |
| Arakataka | canonical | `arakataka-oslo` |
| Brasserie Blanche | canonical | `brasserie-blanche-oslo` |
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

### Historical P0 gaps still in review — 36

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
| Brasserie Hansken | review | **Technical blocker now resolved:** PR #843 is merged and exact live proof generated/accepted 9/9 clean items. No later canonical promotion exists; this is the highest-maturity historical review item. |
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

## Closeout order

The census should now proceed in this order:

1. **Promote/reproof mature historical holds first.**
   Brasserie Hansken is first because the generic parser blocker is already fixed on main and a 9/9
   exact-head artifact exists. FYR must not be treated as equivalent because its proposed #829 parser
   repair is not merged.
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

Brasserie Hansken should be the first closeout unit: reproduce the merged #843 9/9 proof from fresh
`main`, create the exact promotion manifest from the proven artifact if semantic QA still matches,
then run the ordinary promotion gates and post-merge catalog/materialization proof.

After Hansken, proceed through blocker families rather than arbitrary restaurant order.
