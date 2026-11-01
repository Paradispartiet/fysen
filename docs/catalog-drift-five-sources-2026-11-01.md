# Remaining live catalog drifts — 1 November 2026 (PR #1078)

Evidence: [full catalog proof run 41332250921](https://github.com/Paradispartiet/fysen/actions/runs/41332250921); immutable artifact `fysen-pr-catalog-proof-41332250921`. At PR head `cf93032f3ccc235cff8f5bf440041e642bc587d3`, 978/983 were accepted; 4 `menu_assertions`, 1 `manifest`, 0 transport/extraction/hours/action failures. The exact-source strict proof additionally failed for Eckers Løkka (note exceeded 1,000-character schema limit) and Nordvegan (outdated spring-roll assertion).

| Source | Observed priced entries | Specific proof failure | Targeted correction | Captured source SHA-256 |
| --- | ---: | --- | --- | --- |
| Digg Pizza Grønland | 45 | minimum 47, all eight dish/price pairs passed | alert floor 47 → 41 (~91% of observed), no extraction cap | `f1985d4f010293eac4b163b281ba25c50bfd3704b892f58dc027cb96069683bf` |
| Eckers Løkka | 13, prior proof 41318220389 | hours verification note over 1,000 chars; not a menu failure | condense note, preserve source evidence in `docs/catalog-drift-seven-sources-2026-11-01.md` | `23ca34d5dd9ad718bf8a7b608f6e441b383860bd425b21027739e8b809b7cb2b` |
| Mr. Bowl Majorstuen | 30 | `Dual Fried Chicken` 259 NOK not published | swap single exact assertion for observed `Fried Rice Beef` 279 NOK | `2179a99a627e0c7ea0905c29de280c1847b9376602d6749e6ced9e512a012fe3` |
| Nordvegan | 24 | `Spring rolls (2) 🌱` 119 NOK not published | swap single exact assertion for observed `BBQ Chick'n Wrap 🌱` 189 NOK | `f986924dbbc578d76098f1f6f0297aa599bff7605e7ce652e1683fef181dc5f9` |
| Tåsen Cafebar | 8 | `Marinert Biffkjøtt` 159 NOK and `Biff Tallerken` 189 NOK not published | swap exact controls for observed `Pommes Frites` 79 NOK and `Husets Dressing` 35 NOK; these are side/dressing, not main dishes | `290291b78a9e7613712f0c05e91060f41ae50b7af423de2f3a0deee2fc5c001d` |

All replacement titles and prices are in the same restaurant's source record in the raw GitHub artifact, not inferred from similarly named restaurants. No sources/identities, fetch settings, parser behavior, application minimums for other menus, or extraction limits were changed. The previous seven-source follow-up remains as-is. Wolt delivery prices are **not** independently verified dine-in prices.

**Release gate:** Re-run strict proof and complete 983-source live validation on the new exact PR head. Merge only after both green. Post-merge: production catalog materialization, production reconcile, and explicit public-search spot-checks. Gamle Raadhus and Den Glade Gris remain unpromoted candidates for a separate, byte-identical catalog PR.
