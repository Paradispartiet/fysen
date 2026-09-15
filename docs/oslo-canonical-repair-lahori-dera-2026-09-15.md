# Oslo canonical repair — Lahori Dera

Date: 2026-09-15.

Baseline: 724 canonical manifests on `93035224d525477b6bb2312e15739f8212d21897`.

## Consolidation

Keep and normalize:
- `lahori-dera-gronland-oslo`

Remove:
- `lahori-dera-oslo`

The two manifests resolve to the same physical restaurant and share the same SE MENY source and 42-item minimum. The older Grønland identity is retained because it already carries the first-party website, a seven-interval hours source and the correct physical location.

The later generic alias uses `Norbygata 56A`, while current first-party, Wolt, SE MENY and business evidence all resolve Lahori Dera to `Norbygata 56, 0190 Oslo`.

The retained manifest address is normalized from `Norbygata 56` to `Norbygata 56, 0190 Oslo`. Its menu source, hours source, floor and assertions remain unchanged.

Current evidence:
- First-party: https://lahoridera.no/
- SE MENY: https://semeny.no/sted/285lahoridera
- Wolt: https://wolt.com/nb/nor/oslo/restaurant/lahori-dera

Expected canonical catalog after merge: 723 manifests.

No parser, validator or runtime behavior is changed.
