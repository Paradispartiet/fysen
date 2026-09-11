# Oslo quality P0 research — round 2 — 2026-09-11

This is the second research round from the canonical 52-place P0 queue in `oslo-restaurant-quality-audit-2026-09-11.md`.

Round scope: P0 positions 13–24, Betong through Brasserie Blanche.

Research contract:
- prove an active physical Oslo identity;
- require a currently published first-party menu surface;
- prefer direct HTML dish output, but use the repository's supported `pdf` source type when the restaurant itself publishes its menu as PDF;
- do not use guide/editorial dish lists as canonical menu authority;
- let intake/live validation decide whether PDF or complex HTML is actually parsable;
- tasting-menu price pages without named dishes remain `review`.

## Result

**12 researched → 5 intake proofs → 7 review**

| # | Restaurant | Decision | First-party menu evidence | Rationale |
|---|---|---|---|---|
| 13 | Betong | `review` | https://restaurantbetong.no/info | Active and current, but the public first-party page exposes tasting-menu formats/prices rather than a stable named dish list. |
| 14 | Sjømagasinet | **`intake`** | https://www.sjomagasinet.no/english | Rich current HTML with named and priced seafood starters, mains, shellfish-bar dishes and desserts. |
| 15 | Statholderens Mat og Vinkjeller | **`intake`** | https://statholdergaarden.no/smv/meny/alacarte | Current dated first-party à la carte with named starters, mains and desserts and explicit prices. |
| 16 | Brasserie Hansken | `review` | https://brasseriehansken.no/uploads/X1JUCwPz/MENYKVELDMARS20261.pdf | The current first-party site links a detailed priced dinner PDF, but live intake found conflicting prices attached to the same extracted title. Keep in review until the PDF price/title ambiguity is resolved. |
| 17 | Varemottaket | `review` | current first-party/booking presence; no stable dish list | Active tasting-menu restaurant, but no stable public first-party named dish output was found. |
| 18 | Kolonialen Bislett | `review` | https://www.kolonialenbislett.no/ | Active restaurant and current opening information, but the public page does not expose a stable named priced menu. |
| 19 | Cru | `review` | https://www.cru.no/s/dinner-meny-cru-with-english-2jef.pdf | The current first-party menu link used in research returns HTTP 404 to the production fetcher. Keep in review until a live canonical first-party menu URL is available. |
| 20 | Vaaghals | **`intake`** | https://www.vaaghals.com/s/Kveldsmeny-fra-19-mai-2026_NO.pdf | Current first-party menu page links the dinner PDF; use PDF source and require live extraction proof. |
| 21 | Smalhans | **`intake`** | https://www.smalhans.no/menu-english | Current first-party HTML exposes the September menu with named dishes and menu prices. |
| 22 | Arakataka | **`intake`** | https://www.arakataka.no/_files/ugd/ae3af9_4ec3189fb8bf4ab7a9f6b65a061a0a0d.pdf | Current first-party site links a detailed menu PDF with named dishes, snacks and prices; live intake must prove PDF extraction. |
| 23 | Plah | `review` | https://www.plah.no/menu | Active current tasting menu, but public first-party output gives menu/package price rather than named current courses. |
| 24 | Brasserie Blanche | `review` | https://blanche.no/ | Current HTML contains a substantial priced à la carte plus September 2026 seasonal content, but the live production fetch failed at source acquisition. Keep in review until the source is stably fetchable. |

## Intake policy

The five candidates below are **research proofs, not automatic additions**. The batch-intake workflow must still resolve Oslo coordinates, reject canonical/physical-identity collisions, generate candidates from the live first-party source and pass strict validation. Any candidate that fails those gates returns to `review`; no validator or minimum is weakened to force it through.

## Review policy

Betong, Brasserie Hansken, Varemottaket, Kolonialen Bislett, Cru, Plah and Brasserie Blanche remain P0 review items. Their restaurant quality is not in dispute; the blocker is Fysen-specific dish-first evidence. They can be reconsidered when a stable named first-party dish surface is available.

## First live-intake result

The first exact-head intake attempted eight candidates. Four generated immediately: `sjomagasinet-oslo`, `statholderens-mat-vinkjeller-oslo`, `smalhans-oslo` and `arakataka-oslo`. Brasserie Hansken failed closed on a PDF title/price conflict; Cru returned HTTP 404; Brasserie Blanche failed source acquisition. Vaaghals reached a legitimate cross-origin first-party CDN redirect, so the second proof declares only `https://static1.squarespace.com` as an allowed redirect origin rather than weakening crawler policy.
