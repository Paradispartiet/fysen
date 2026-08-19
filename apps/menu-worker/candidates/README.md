# Restaurant candidates

This directory is the staging area for restaurant onboarding manifests owned by `@fysen/menu-worker`.

A candidate manifest uses the exact same schema as a production manifest in `catalog/`, but files in `candidates/` are **never** read by the production onboarding job. They exist only for read-only source validation.

The candidate validation gate checks the declared first-party sources with the same runtime primitives used in production:

- menu fetch mode and network policy;
- HTML / JSON-LD / PDF extraction;
- canonical menu fingerprint and price semantics;
- minimum item count;
- required dish and price-variant assertions;
- forbidden dish-name assertions for parser-quality failures;
- opening-hours extraction and minimum interval count;
- booking/order reachability.

Menu quality, restaurant identity and declared commercial actions remain hard production gates. Opening hours are strict by default, but an otherwise verified restaurant must not be excluded solely because the first-party kitchen-hours source is ambiguous or temporarily not canonical-readable.

For that case the manifest may explicitly declare hours uncertainty:

```json
"verification": {
  "hours": {
    "status": "provisional",
    "checkedAt": "2026-08-19",
    "note": "First-party page exposes conflicting opening-hours sections."
  }
}
```

`provisional` requires an `hoursSource` so Fysen can keep monitoring it. `unverified` may be used when no canonical kitchen-hours source is currently available. Both states require a dated reason and make only the hours gate nonblocking; they never relax menu, price, identity, network-security or action validation.

Production persists the hours verification status and audit metadata. Search only uses `verified` hours to derive `open` / `closed`; a provisional or unverified restaurant remains searchable by its verified menu, but its opening state is `unknown` until the hours status is promoted to verified.

All explicitly uncertain production restaurants are available from the derived audit log:

```bash
pnpm --filter @fysen/menu-worker verification:log
```

The log is generated from the canonical manifests rather than maintained as a second hand-written restaurant list.

Validation performs no database writes and cannot activate a restaurant.

Promotion is explicit: after a candidate passes all blocking source validation, the same manifest is moved from `candidates/` to `catalog/` in a separate production-onboarding change. `catalog/` remains the only directory consumed by automatic onboarding.
