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

**12 researched → 1 promotion-ready → 11 review**

| # | Restaurant | Decision | First-party menu evidence | Rationale |
|---|---|---|---|---|
| 13 | Betong | `review` | https://restaurantbetong.no/info | Active and current, but the public first-party page exposes tasting-menu formats/prices rather than a stable named dish list. |
| 14 | Sjømagasinet | `review` | https://www.sjomagasinet.no/english | Rich current first-party menu, but semantic QA of the generated candidate found description fragments promoted as dish names and an invalid oyster price association. Keep in review until extractor recovery is corrected. |
| 15 | Statholderens Mat og Vinkjeller | `review` | https://statholdergaarden.no/smv/meny/alacarte | Current dated first-party à la carte is strong, but semantic QA found `Agurk, reddik, potetchips,` promoted as a dish title instead of `Bakt Røye`. Keep in review until the title recovery is corrected. |
| 16 | Brasserie Hansken | `review` | https://brasseriehansken.no/uploads/X1JUCwPz/MENYKVELDMARS20261.pdf | The current first-party site links a detailed priced dinner PDF, but live intake found conflicting prices attached to the same extracted title. Keep in review until the PDF price/title ambiguity is resolved. |
| 17 | Varemottaket | `review` | current first-party/booking presence; no stable dish list | Active tasting-menu restaurant, but no stable public first-party named dish output was found. |
| 18 | Kolonialen Bislett | `review` | https://www.kolonialenbislett.no/ | Active restaurant and current opening information, but the public page does not expose a stable named priced menu. |
| 19 | Cru | `review` | https://www.cru.no/s/dinner-meny-cru-with-english-2jef.pdf | The current first-party menu link used in research returns HTTP 404 to the production fetcher. Keep in review until a live canonical first-party menu URL is available. |
| 20 | Vaaghals | `review` | https://www.vaaghals.com/s/Kveldsmeny-fra-19-mai-2026_NO.pdf | The current first-party page links the dinner PDF and the redirect is legitimate, but production PDF extraction exposes only 1 unique priced dish; keep in review rather than weakening the 3-dish floor. |
| 21 | Smalhans | `review` | https://www.smalhans.no/menu-english | The first-party page contains named dishes, but prices are attached to menu packages. The generated candidate therefore contained only `3-Course Menu`, `Smalhans` and `Krøsus Menu` rather than individually priced dishes; keep in review. |
| 22 | Arakataka | **`promotion-ready`** | https://www.arakataka.no/_files/ugd/ae3af9_4ec3189fb8bf4ab7a9f6b65a061a0a0d.pdf | Current first-party PDF generated a semantically coherent five-item result: the six-course menu plus Charcuterie, Arakataco, Kongekrabbe & vaffel and Spaghetti & Löjrom. Strict live validation is green. |
| 23 | Plah | `review` | https://www.plah.no/menu | Active current tasting menu, but public first-party output gives menu/package price rather than named current courses. |
| 24 | Brasserie Blanche | `review` | https://blanche.no/ | Current HTML contains a substantial priced à la carte plus September 2026 seasonal content, but the live production fetch failed at source acquisition. Keep in review until the source is stably fetchable. |

## Intake policy

Strict intake proof was followed by semantic artifact QA. Only Arakataka is promotion-ready. Sjømagasinet and Statholderens have extractor title/price association defects despite passing structural validation, while Smalhans exposes menu-package prices rather than individual dish prices. No structurally green candidate is promoted when its generated dish semantics are wrong.

## Review policy

Betong, Sjømagasinet, Statholderens Mat og Vinkjeller, Brasserie Hansken, Varemottaket, Kolonialen Bislett, Cru, Vaaghals, Smalhans, Plah and Brasserie Blanche remain P0 review items. Their restaurant quality is not in dispute; the blocker is Fysen-specific dish-first evidence. They can be reconsidered when a stable named first-party dish surface is available.

## First live-intake result

The first exact-head intake attempted eight candidates. Four generated immediately: `sjomagasinet-oslo`, `statholderens-mat-vinkjeller-oslo`, `smalhans-oslo` and `arakataka-oslo`. Brasserie Hansken failed closed on a PDF title/price conflict; Cru returned HTTP 404; Brasserie Blanche failed source acquisition. Vaaghals reached a legitimate cross-origin first-party CDN redirect, so the second proof declares only `https://static1.squarespace.com` as an allowed redirect origin rather than weakening crawler policy.

The second exact-head proof confirmed the declared Vaaghals CDN redirect but extracted only 1 unique priced dish from the PDF. The canonical minimum remains 3, so Vaaghals is returned to `review`. The final round-2 seed therefore contains only Sjømagasinet, Statholderens Mat og Vinkjeller, Smalhans and Arakataka.


## Semantic artifact QA

The final four-candidate intake was structurally green (4/4 generated, 0 failures), but promotion is stricter than structural validation:

- `sjomagasinet-oslo`: generated 29 items, but the artifact promoted description fragments such as `selection of seasonal vegetables from local producers` and `lemon and ginger butter, wine and cream` as dish names, and associated `2 Types of oysters` with 2995 NOK. This is not canonical dish quality.
- `statholderens-mat-vinkjeller-oslo`: generated 10 items, but `Agurk, reddik, potetchips,` was promoted as the 535 NOK dish instead of the first-party title `Bakt Røye`.
- `smalhans-oslo`: generated only three priced menu packages (`3-Course Menu`, `Smalhans`, `Krøsus Menu`). The named dishes are not individually priced, so they cannot be represented honestly as direct dish-price rows under the current contract.
- `arakataka-oslo`: generated five coherent first-party PDF items and remains the sole promotion candidate from this round.

This semantic QA is now part of the effective promotion standard: workflow-green is necessary but not sufficient.
