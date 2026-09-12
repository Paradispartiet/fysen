# Oslo quality P0 round 4 — positions 37–48

Date: 2026-09-11.

This round continues the canonical dish-first Oslo quality plan after round 3 and post-#682 production proof.

## Queue

37. Restaurant Schrøder — seeded from current first-party HTML menu.
38. Den Glade Gris — seeded from the current first-party May 2026 food-menu PDF linked by the restaurant.
39. Lorry Restaurant — seeded from current first-party dinner menu.
40. Engebret Café — seeded from current first-party à la carte.
41. Dovrehallen — seeded from current first-party priced menu.
42. The Salmon — seeded from current first-party Summer 2026 menu.
43. Louise — **review, removed from seed after live proof**. The first-party menu endpoint returned deterministic HTTP 500 in intake #554; no alternate aggregator source is substituted.
44. Lofoten Fiskerestaurant — seeded from current first-party menu.
45. Havsmak — seeded from current first-party seasonal menu.
46. Lofotstua — **review, not seeded**. Active identity is externally verifiable, but no public first-party priced dish menu was found. Facebook/aggregator evidence is not substituted for the missing first-party menu surface.
47. Skur 33 — seeded from the priced PDF linked from the first-party domain.
48. Solsiden Restaurant — seeded from the current 2026 seasonal first-party menu; the restaurant states that the season ends 12 September, so source freshness remains fail-closed.

## Gate

P0 status does not imply promotion. Restaurant batch intake must prove current identity/address resolution, non-duplicate canonical identity, live menu transport, at least three unique priced dishes, strict validation and output-clean semantic dish names. Any transport, parser, metadata, beverage or package-label leakage remains review until solved generically.

No restaurant-specific extractor exceptions and no weaker validator floor are authorized by this round.

## Intake #554 — first semantic pass

Exact-head intake on `7f3e117ed3b256bb63bf63bae0d26e5d45b8dba0` resolved and deduplicated all 11 seeded identities, generated 9 candidates and failed 2.

- Louise failed source transport with HTTP 500 and returns to review.
- Skur 33 failed closed because `KRABBE` is legitimately published at 195 on the lunch menu and 210 on the dinner menu while the PDF source-key disambiguator did not yet encode service context.
- The generated artifact exposed systematic HTML/PDF output leakage: UI labels, weekday/section headings, quantity labels, menu-package labels, trailing `kr` artifacts, ABV beverage rows and lowercase description fragments.
- The fix remains generic: HTML output canonicalization and PDF source scoping are hardened with positive/negative regressions. Concrete observed leakage is also locked as `forbiddenDishNames` in this research seed.
- No candidate is promotion-ready merely because the first generator pass succeeded. The seed must be re-run on the hardened exact head and its artifact inspected again.

Artifact: `restaurant-batch-intake-7f3e117ed3b256bb63bf63bae0d26e5d45b8dba0`, digest `sha256:b77714b2483cf158b00b840d7db2c43e52e841cf3bd02179f37770d6f83814d7`.

## Final fresh-head reproof — intake #579

Exact-head reproof on `18361fc610437fc02d16528a300726d217a26aa8` generated **10/10** candidates with **0 source-generation failures**. This proves that the generic source-key repairs resolved the Engebret and Skur 33 generation blockers without weakening collision handling.

Artifact: `restaurant-batch-intake-18361fc610437fc02d16528a300726d217a26aa8`  
Artifact ID: `10277774204`  
Digest: `sha256:9458a4d60f20d50a6533f51673d288d36f129112d33ac1f1c91f4b5fe8396dc8`.

Full semantic artifact QA produced the final round-4 classification:

- **Lorry Restaurant — promotion-ready.** 35 observed items; strict assertions green; prior weekday-label leakage is absent.
- **Engebret Café — promotion-ready.** 16 observed items; strict assertions green. The former Kalix 350/265 source-key conflict is resolved generically by preferring the uniquely direct-priced observation while preserving genuinely distinct direct prices fail-closed.
- **Dovrehallen — promotion-ready.** 46 observed items; strict assertions green and dish output remains coherent.
- **The Salmon — promotion-ready.** 53 observed items; strict assertions green and dish output remains coherent.
- **Lofoten Fiskerestaurant — promotion-ready.** 19 observed items; strict assertions green. Section/size labels and the descriptive `Gratinated with herbal butter` fragment are no longer promoted as dishes.
- **Havsmak — promotion-ready.** 16 observed items; strict assertions green and package-label leakage remains excluded.
- **Restaurant Schrøder — semantic-review.** The source is healthy, but dish titles still absorb long description/allergen/wine-suggestion text; the concrete malformed titles are intentionally forbidden and strict validation fails closed.
- **Den Glade Gris — semantic-review.** The PDF is healthy and generates broadly, but beverage/layout leakage remains (including beer rows and text fragments). No broader PDF suppression is introduced merely to force this candidate through.
- **Skur 33 — semantic-review.** The former source-key generation blocker is solved, but the generated dish set still contains component/allergen/layout fragments such as quantity/component rows. Passing transport/generation is not sufficient for promotion.
- **Solsiden Restaurant — semantic-review.** Generic section and quantity cleanup improved the output, but artifact QA still shows a cross-card price association risk around the terrace “fish of the day” / following dessert sequence. It remains fail-closed rather than accepting a semantically suspect price binding.
- **Louise — source-review.** First-party menu endpoint remained unusable in the earlier live pass; no secondary menu authority is substituted.
- **Lofotstua — source-review.** No stable public first-party named/priced dish menu was proven.

The permanent round-4 seed is therefore narrowed to the **six promotion-ready candidates**: Lorry, Engebret Café, Dovrehallen, The Salmon, Lofoten Fiskerestaurant and Havsmak.

No restaurant-specific parser exception, weaker minimum, secondary menu authority or manual assertion bypass is introduced.

## Rice Bowl catalog-health #143 repair

Canonical `main` `220570c2534c322a4dd51c3c965f5e4a20b08221` failed catalog-health #143 on exactly one manifest: `rice-bowl-kirkegata-oslo`. The historical first-party `https://www.ricebowl.no/meny` surface still returned HTTP 200 but the current server response yielded 0/36 extracted dishes.

The restaurant's first-party takeaway surface `https://www.ricebowl.no/bestill-takeaway` publishes the same canonical priced menu directly over HTTP. Exact-head live validation on `a0f6f4e2aebe2a10857abfdf02c00ad2ad0428bb` accepted **36/36** items with no missing required dishes and no forbidden dish leakage. The manifest therefore moves only the menu source URL to the direct first-party takeaway surface; the HTTP transport, 36-item floor, required names/variants and forbidden-noise assertions remain strict.

A browser-rendering experiment was explicitly discarded rather than raising the 120-request safety budget. No browser network-policy relaxation is part of the final repair.

