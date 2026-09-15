# Oslo canonical duplicate repair — OAKBERRY Storgata

Date: 2026-09-15.

Baseline: 728 canonical manifests on `f9284867bce204e60ca132eb42f1b239a8f3826d`.

## Duplicate resolution

Keep:
- `oakberry-storgata-oslo`
- `oakberry-vika-oslo` as a separate physical restaurant

Remove:
- `oakberry-oslo`

The generic Oslo manifest and the Storgata manifest resolve to the same physical restaurant at Storgata 10A, 0155 Oslo, with identical coordinates, the same SE MENY source, the same 21-item minimum and identical required dish name/price assertions.

The retained Storgata slug is the earlier location-specific canonical identity. OAKBERRY's current store list and Brønnøysund both distinguish Storgata 10A from the separate Vika location at Haakon VIIs gate 10.

Expected canonical catalog after merge: 727 manifests.

No retained manifest, parser, source contract, validator or runtime behavior is changed.
