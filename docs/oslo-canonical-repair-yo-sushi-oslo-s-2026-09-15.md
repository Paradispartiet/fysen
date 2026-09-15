# Oslo canonical duplicate repair — YO! Sushi Oslo S

Date: 2026-09-15.

Baseline: 726 canonical manifests on `135630ec4877f62fa1ccebd59868bff687b5f85f`.

## Duplicate resolution

Keep:
- `yo-sushi-oslo-s-oslo`

Remove:
- `yo-sushi-oslo-city`

Both manifests resolve to the same physical restaurant at Jernbanetorget 1, 0154 Oslo, with identical coordinates, the same SE MENY source, the same 59-item minimum and identical required dish name/price assertions.

The retained Oslo S slug is the earlier location-specific canonical identity and matches the current first-party identity "Oslo Central Station". The later "Oslo City" alias adds no distinct physical coverage.

Current identity evidence:
- YO! Oslo Central Station: https://yosushi.com/restaurants/oslo-central-station
- Oslo S: https://oslo-s.no/spisesteder/yo-sushi/
- SE MENY: https://semeny.no/sted/693yosushi

Expected canonical catalog after merge: 725 manifests.

No retained manifest, parser, source contract, validator or runtime behavior is changed.
