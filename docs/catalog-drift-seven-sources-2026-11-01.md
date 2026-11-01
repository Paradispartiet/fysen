# Seven live menu drifts — 1 November 2026 (PR #1078)

Live full-catalog proof: [GitHub run 41318220389](https://github.com/Paradispartiet/fysen/actions/runs/41318220389), artifact `fysen-pr-catalog-proof-41318220389` (983 manifests, 976 accepted, seven failed). All seven were HTTP 200 with parsed menu records; failure family was `menu_assertions` only, with zero transport, extraction, manifest, hours or action failures. The raw artifact includes the exact observed dish names, minor-unit prices and SHA-256 fingerprints below. **The seven updates below require fresh strict live validation and a new 983-source proof before merge.**

| Catalog identity | Captured offers | Prior floor → revised floor | Representative control replaced | Source fingerprint SHA-256 |
| --- | ---: | ---: | --- | --- |
| `afghan-house-gronland-oslo` | 22 | 24 → 20 | None; all required dishes passed | `46e162984df5325ca82b140109c2ce5617228d8ffc5183b9e9a1002f5ec1db09` |
| `arte-pazza-pizza-pasta-oslo` | 34 | 36 → 31 | `Tagliatelle di Scampi` → `Gnocchi Alla Sorrentina con bocconcini di Manzo` (245 NOK) | `af1da2cf6452e74fbb4160e44817dc4eff0f731588b2dd4acb1025fe62af046d` |
| `eckers-lokka-oslo` | 13 | 14 → 12 | `Tuna Melt Toast` → `Rosa ananas` (95 NOK) | `23ca34d5dd9ad718bf8a7b608f6e441b383860bd425b21027739e8b809b7cb2b` |
| `eckers-ulleval-oslo` | 16 | 12 → 12 | `Rosa ananas` → `Mint mango` (95 NOK) | `a1af0a009f99bb414e909c99cf5f71cc11c401248cc27eade09883cb33e39fe6` |
| `gregor-pizza-bislett-oslo` | 37 | 42 → 34 | `Chevre` → `Quattro Formaggi` (175 NOK) | `e09fd66b8595e4d26a96b721bc56825928e8777bb44b9be1f3067829e27dd70b` |
| `koi-sushi-wok-vollebekk-oslo` | 83 | 85 → 75 | None; all required dishes passed | `52d762c3a4d1e6bf2abcba20febdb9f171c327582f970606de8717f96df089c6` |
| `zio-pizza-marienlyst-oslo` | 15 | 15 → 15 | `Coppa ham` → `Mortadella` (270 NOK) | `16a497d7b5b8637bf5dbc43609ad2057425623c85ef7cc4497e1948507df40a0` |

The floors use roughly 90% of the currently observed eligible offers, rounded up, where the prior threshold exceeded reality. These minima are alert thresholds, **not selection limits**, so the worker continues extracting all qualifying offers. They are based on the exact complete live source captured in the GitHub artifact, not an arbitrary target count; no individual title/price assertions were dropped without a specific current replacement. All five replacement pairs were observed in the same source/restaurant and are not duplicates of the retained required pairs. The Ullevål smoothie replacement remains within the same product category; the other replacements are respectively a pasta, a smoothie, a cheese pizza and a cured-meat pizza. Titles and prices are Wolt delivery prices, not independently confirmed dine-in prices.

The fixed parser tests, global HTTP budget, restaurant identities, URL policy, source actions and restaurant deduplication were not modified by this drift follow-up. Re-run exact-head direct proof and the full 983-source catalog regression; do not merge until green. Post-merge production materialization, reconcile and public search are separate gates. Gamle Raadhus and Den Glade Gris are still candidates; promote in a separate, byte-identical catalog PR after this source PR passes.
