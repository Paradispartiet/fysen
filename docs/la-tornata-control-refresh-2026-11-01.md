# La Tornata menu controls, 2026-11-01

Fresh capture of the canonical [Wolt source](https://wolt.com/en/nor/oslo/restaurant/pizzeria-la-tornata), using `FysenMenuBot/0.1`, confirms that `4. Parma` and `7. Con Carne` are absent from the complete response and embedded menu data. Their former controls (25000 and 23400 øre) are replaced with actual current offers: `11. Nochi Con Miele` at 24100 øre and `16. Roma` at 23700 øre. The source provides no effective menu-change date; November 1 is the observation date.

The independent raw JSON review used the `query-state` script, `/queries/6/state/data`. Its 52 products comprise 32 Pizza, 7 Dressinger, and 13 Drikke items. Comparing every name/price pair from the two food categories with the runtime's 39 extracted offers gives exact equality: no missing food pairs and no extra extracted pairs. The source therefore supports replacing retired assertions, with no parser change. The six other name/price controls remain unchanged, both assertion lists retain eight entries, and the minimum remains 18.

The manifest note is 437 characters, within the schema's 1000-character maximum. The checked date documents the menu observation; hours remain unverified. Schema parsing and local quality evaluation against the captured response pass (39/18; no missing required or forbidden dishes).

[Compact evidence](research/la-tornata-control-refresh-20261101.sources.json) records the SHA-256, response size, all 39 independently read food pairs with product IDs and JSON paths, category counts, and replacement controls. Capture SHA-256: `5060bbb608bf64c07aba0cd2d223f1508630d0c94c07cfe354e0d6dbd8f4a8d4` (1,352,978 bytes).
