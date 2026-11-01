# Dinner menu controls, 1 November 2026

Both official HTML menus were fetched once and evaluated through the original baseline runtime and the current runtime before this fix. The resulting item arrays were identical: Barcode had 47 items against a floor of 42; Nationaltheatret had 43 against a floor of 43. The failures therefore represent current source drift, rather than a regression introduced by the paragraph/strong-line changes. Source URLs, SHA-256 hashes and all changed controls are recorded in `research/dinner-menu-control-refresh-20261101.sources.json`.

Barcode’s current source prints “DAMPET Seabass 特 色 蒸 海 鱼” at NOK 398. Both pre-fix runtimes incorrectly rewrote this mixed-case Latin/Han preparation title to the preceding accordion label “Signatur Klassisk”. The generic description classifier now recognizes short preparation titles with a Han translation while continuing to reject preparation prose containing connectors such as “med” and “with”. A regression test exercises extraction followed by description-title recovery with the real title, neighboring section label and price; negative cases retain instruction filtering.

Four controls were refreshed in each manifest from the current first-party source:

| Restaurant | Previous control | Verified current control |
| --- | --- | --- |
| Barcode | VEGANSKE VÅRRULLER 素 春 卷, 159 | Same title, 169 |
| Barcode | SHUI ZHU BIFF 水 煮牛 肉, 339 | Same title, 349 |
| Barcode | DAMPET HAVABBOR 特 色 蒸 海 鱼, 398 | DAMPET Seabass 特 色 蒸 海 鱼, 398 |
| Barcode | VEGANSK CRISPY DUCK 豆 腐 煲, 339 | Same title, 349 |
| Nationaltheatret | JIANGNAN SNACKS 江 南 四 小 碟, 99 | Snacks de luxe 小 食 拼 盘, 99 |
| Nationaltheatret | INNBAKT KAMSKJELL 酥 炸 帶 子 卷, 199 | Innbakt kamskjell 酥 炸 带 子 卷, 199 |
| Nationaltheatret | KAM KON POT 錦 江 煲, 298 | Same title, 315 |
| Nationaltheatret | KYLLING GONGBAO 宮 保 雞 丁, 219 | Same title, 234 |

The other four controls in each manifest remain unchanged. Both manifests retain eight name/price controls and their original floors. After the fix, the same full source captures yield 47 and 43 items, all eight controls pass at each restaurant, and Barcode contains the real Seabass title instead of the section label.
