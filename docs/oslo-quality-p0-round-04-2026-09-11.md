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
