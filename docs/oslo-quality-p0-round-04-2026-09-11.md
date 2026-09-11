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
43. Louise — fail-closed source probe against the restaurant's own menu endpoint; promotion requires that the endpoint resolve to a current parseable priced menu.
44. Lofoten Fiskerestaurant — seeded from current first-party menu.
45. Havsmak — seeded from current first-party seasonal menu.
46. Lofotstua — **review, not seeded**. Active identity is externally verifiable, but no public first-party priced dish menu was found. Facebook/aggregator evidence is not substituted for the missing first-party menu surface.
47. Skur 33 — seeded from the priced PDF linked from the first-party domain.
48. Solsiden Restaurant — seeded from the current 2026 seasonal first-party menu; the restaurant states that the season ends 12 September, so source freshness remains fail-closed.

## Gate

P0 status does not imply promotion. Restaurant batch intake must prove current identity/address resolution, non-duplicate canonical identity, live menu transport, at least three unique priced dishes, strict validation and output-clean semantic dish names. Any transport, parser, metadata, beverage or package-label leakage remains review until solved generically.

No restaurant-specific extractor exceptions and no weaker validator floor are authorized by this round.
