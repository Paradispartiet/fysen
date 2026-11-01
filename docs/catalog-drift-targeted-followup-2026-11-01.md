# Exact-head targeted menu drifts — PR #1078, 1 November 2026

Source: [targeted manifest validation #41336459220](https://github.com/Paradispartiet/fysen/actions/runs/41336459220). CI #41336459180 and intake #41336459251 were green on the same prior head. This report does **not** require a new full-catalog scan.

| Restaurant | Observed priced items | Last live result | Correction | Source SHA-256 |
|---|---:|---|---|---|
| Karachi Street Food Stovner | 26 | minimum 41; five old name+price controls absent | minimum alert 24; rebind five checks to Chicken Bun Burger 225, Kylling Biryani 235, Veggie Bun Burger 215, Saag Paratha 159, Hel Kylling 280 NOK | `6886cf34c7e1813062a83f19903555831accc9d4eb9f3b3b7b7b34bbabe91ad7` |
| Mr. Bowl Majorstuen | 28 | Chicken Fingers 129 NOK absent | rebind to Fried Rice Chicken 249 NOK; seven other controls retained | `9fd17725567e7c0a3fba53bd358ed5fbc7b54e6491e289e0276f6a27bca819a0` |
| Tåsen Cafebar | 6 | Mix Pita and Mix Tallerken absent, minimum 8 | minimum alert 6, replace Mix Pita with Chili Saus 35 NOK, retire other stale check; six current items have six price controls | `c52c5a8cd12f47c8056f8619ada0e1ee151df5e38edccc8888806a2685946ae3` |
| The Salmon | 0 parsed | HTTP 200 at https://www.thesalmon.com/menu/ but empty extractor output; on 31 October the same first-party menu yielded 47 individual food items | **not patched** — zero extraction is a source/runtime regression, never a reason to lower counts or delete food. Diagnose separately against the still-published first-party Winter 26/27 menu. | `4f53cda18c2baa0c0354bb5f9a3ecbe5ed12ab4d8e11ba873c2f11161202b945` (empty item output only) |

The Karachi drop from 46 to 26 in one day is significant; the remaining source menu is preserved fully, and the 24-item minimum is an alarm floor, not a cap. Wolt prices are delivery prices, not confirmed dine-in prices. No global parser changes or coverage cuts. Merge is **blocked** until changed-source proofs are green, especially The Salmon. Manual/scheduled full-catalog health remains independent of PR gate.
