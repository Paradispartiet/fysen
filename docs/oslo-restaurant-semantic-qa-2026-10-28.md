# Fysen Oslo — semantic menu audit (2026-10-28)

This is a **source-vs-extractor review**, not a production acceptance certificate. Full coverage of recognized Oslo restaurants requires source-accurate names, price units and all relevant dishes; an 8-item manifest assertion or green CI does **not** prove complete menu coverage.

## Evidence

- Restaurant Schrøder: https://www.xn--restaurant-schrder-u4b.no/meny/
- Engebret Café (October à la carte): https://www.engebret-cafe.no/menymenu
- Lofoten Fiskerestaurant: https://www.lofoten-fiskerestaurant.no/menu-eng
- Dovrehallen: https://www.dovrehallen.no/var-meny
- The Salmon (VINTER 26/27): https://www.thesalmon.com/menu/
- Observed variants were read from **live GitHub Action logs**, not inferred from eight requiredDishVariants. Relevant runs: Schrøder intake #40665401813; parser intake #40665481578; Dovrehallen/The Salmon validator #40665814508. The latter uses pre-#1037 parser semantics and is therefore **not** an acceptance proof for promotion.

## Source-vs-output findings

| Restaurant | Observed entries | Manual QA findings | Decision |
|---|---:|---|---|
| Schrøder | 15 | Three source-name leaks: `Reinsdyrhjerte Med rødbete og solbær` (real heading `Reinsdyrhjerte`), `Oksetunge Pepperrotkrem` (real heading `Oksetunge`), and `Brimsoll Fra Sogn. Brunostsaus` (real heading `Brimsoll`). Directly priced `Grynsodd`, `Stiftgårdskake` and `Efter maten – kombinasjon` absent. `Rakfisk` publishes 235 kr for small / 465 kr for large, and `Schrøder panne` 595 kr **per person**, minimum two, but these cannot be represented as plain one-price portions. `Biff med løk` is a heading for two individually priced fillet variants; do not assign it an invented price. | **Review only**; parser work in #1034 is useful but does not complete the restaurant. |
| Engebret Café | 11 | The observed 11 title/price pairs align with first-party October page, and the unpriced English sentence after `Sjøkrepssuppe` is excluded. The source still lists priced dishes absent from output, including scallops, Camembert, lamb roll, mountain trout, halibut, monkfish, rack of lamb, reindeer steak and beef tenderloin. The November/December menu is separate. | **Incomplete**; no canonical promotion. |
| Lofoten Fiskerestaurant | 17 | `FISH OF THE DAY` output was 395 kr, whereas lunch source says **350 kr** in a spaced `350, -` card; #1037 tests/repairs this generic price format. `FRESH LOBSTER` is **1,550 kr per kg**, not 1,550 kr per dish. `Spicy pumpkin crème brûlée` is the description below the real `CRÈME BRÛLÉE` heading. Lunch `LOFOTEN'S FISH SOUP` 195 kr and dinner 395 kr are distinct valid variants; only 395 kr appeared. Platter prices per person and oysters 2/4/6 need explicit unit/size semantics. | **Not approved** until rerun and remaining unit/heading issues resolved. |
| Dovrehallen | 43 | The 43 observed rows have source-backed dish names/prices in the reviewed sample, but `Blandet salat / Mixed salad` (155 kr) and `Salt Kjøtt og Flesk` (249 kr) are missing. The source has `Karbonade / Minced steak` at both 140 and 175 kr with distinct toppings; extracted output keeps only 175. Christmas menu is season-specific. | **Partial**; catalog promotion should not be characterized as full coverage. |
| The Salmon | 47 after #1037 | The winter 26/27 source has 47 individually priced dishes/variants. `Meny 1/2/3` are three-course bundles, not individual dishes. `Laks Benedict` costs 255 kr with `Serveres 11.30–15.00` as service metadata. #1037 intake returned 47 and no forbidden hits. | Candidate **may proceed to exact-head catalog validation** after code integration; manual full-item and price comparison remains required. |

## Required safety gates

1. No false dish titles, borrowed prices, invented menu variants or price-unit loss.
2. Source-derived per-person/per-kilogram prices must be explicitly represented, otherwise quarantine the row (do not treat it as a normal plate price).
3. Distinct sizes and lunch/dinner variants must not silently collapse or inherit each other's prices.
4. Do not lower `minimumExpectedItems` to conceal missing dishes; changes must reflect independently verified priced source entries, explicitly excluding non-dish bundles.
5. Run fresh exact-head intake, validate and full artifact QA **after merging parser changes**; update promotion branches to the merged base before any catalog merge.
6. Reconcile canonical → production materialization → API/web search separately after merge. Keep reviewed/incomplete restaurants in a distinct queue; they are not published coverage.

**Outcome:** Automated checks are not sufficient for #1034/#1037/#1036 to be declared fully complete; this audit identifies remaining concrete safety and coverage gaps without suppressing source evidence.
