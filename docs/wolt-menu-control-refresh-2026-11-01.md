# Wolt menu controls — 1 November 2026

Three current Wolt delivery menus fail stale catalog controls. Original and current extractors produce identical item arrays on the same fresh HTML captures; these failures do not establish a parser regression. Each capture contains the correct restaurant title and embedded `loading_strategy: "full"` menu data. All 94 extracted eligible name/price pairs were independently checked against those raw product records.

| Restaurant | Eligible offers | Previous floor | Current floor | Exact control pairs |
| --- | ---: | ---: | ---: | ---: |
| 67Grill | 23 | 28 | 20 | 8 |
| Karachi Street Food | 46 | 47 | 41 | 7 |
| Nordvegan | 25 | 8 | 8 | 10 |

The adjusted floors are 90% of the current eligible baseline, rounded down, to allow ordinary menu variation. Every retained normalized name/price control remains unchanged. Only absent controls are replaced with independently published meals; these replacements do not imply that dishes were renamed.

| Restaurant | Absent control | Current control | Price |
| --- | --- | --- | ---: |
| 67Grill | 35. Dønner-Pita | 34. Dønner-Rull | 149 NOK |
| 67Grill | 09. Shawarma-Tallerken | 14. Crispy-Tallerken | 179 NOK |
| Karachi | Butter Chicken | Chapli Kebab | 229 NOK |
| Karachi | Nan Veggie Rull | Veggie Paratha Rull | 169 NOK |
| Karachi | Biff Cloud Nan | Keema Cloud Nan | 219 NOK |
| Karachi | Karachi Biff Pizza Stor | Karachi Kjøttdeig Pizza Stor | 299 NOK |
| Karachi | Døner nanrull | Karachi Døner Box | 279 NOK |
| Nordvegan | Spinach Soup 🌱 | Creamy Pumpkin Soup | 149 NOK |

67Grill has 30 raw products, including six drinks and 24 food products. Existing numeric-title filtering excludes the Pizza record `26. 67` at 189 NOK. Its description is “Kylling shawarma, biff, bacon, pepperoni og løk.” This supports its pizza context but does not supply an unambiguous dish title; no title was invented from those ingredients. The eligible count of 23 therefore does not claim complete coverage of all raw food products. Karachi has 65 raw products; existing beverage, zero-price cutlery and low-price filters leave 46 eligible offers. Nordvegan has 34 raw products; excluding eight drinks and cutlery leaves 25 offers. Its current `Spring rolls (2)` at 119 NOK still satisfies the retained `Spring rolls (2) 🌱` control through existing normalization.

The [source evidence](research/wolt-menu-control-refresh-20261101.sources.json) records capture timestamps and SHA-256 hashes, raw JSON paths and item IDs, every eligible source pair, exclusions, retained controls, replacements, and local quality results. All three updated manifests pass menu quality evaluation against their captured extraction. Strict fresh-source validation and production publication are separate checks. Prices remain Wolt delivery prices; hours and dine-in prices are unverified. No parser behavior changes are included in this maintenance.
