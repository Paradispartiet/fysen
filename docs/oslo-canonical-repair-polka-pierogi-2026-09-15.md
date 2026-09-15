# Oslo canonical duplicate repair — Polka Pierogi

Date: 2026-09-15.

Baseline: 727 canonical manifests on `dbbc1fefef2482b83f6e848de3a3a683b8f8ba7e`.

## Duplicate resolution

Keep:
- `polka-pierogi-hausmanns-gate-oslo`

Remove:
- `polka-pierogi-oslo`

Both manifests use the same SE MENY source, the same 26-item minimum and identical required dish name/price assertions. The later generic alias carries Hausmanns gate 31A, while current source evidence resolves the restaurant to Hausmanns gate 31C, 0182 Oslo.

The retained location-specific manifest already uses Hausmanns gate 31C.

Current identity evidence:
- SE MENY: https://semeny.no/sted/polkapierogi
- Wolt: https://wolt.com/nb/nor/oslo/restaurant/polka-pierogi

Expected canonical catalog after merge: 726 manifests.

No retained manifest, parser, source contract, validator or runtime behavior is changed.
