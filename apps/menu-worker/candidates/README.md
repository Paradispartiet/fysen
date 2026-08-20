# Restaurant candidates

This directory is the staging area for restaurant onboarding manifests owned by `@fysen/menu-worker`.

A candidate manifest uses the exact same schema as a production manifest in `catalog/`, but files in `candidates/` are **never** read by the production onboarding job. They exist only for read-only source validation.

## Canonical menu-source hierarchy

Fysen is dish-first and should primarily answer where a person can actually eat a dish. Source selection therefore follows this order:

1. **Current first-party restaurant menu** is preferred: the restaurant's own HTML menu, JSON-LD, PDF or other official menu publication.
2. Other current first-party restaurant publications may support identity, dishes, hours or actions when they actually contain the relevant evidence.
3. A restaurant-linked or otherwise clearly matched delivery/takeaway platform such as Foodora or Wolt may be used as a **secondary priced service-menu source** when the first-party menu is not machine-readable or does not expose current prices reliably.
4. A delivery/service menu proves the dishes that are actually present on that service. It must **not** be described as the restaurant's complete dine-in menu unless completeness is independently established.
5. Search-engine snippets, cached/indexed copies and unaffiliated aggregators are discovery evidence only. They are never canonical substitutes for the current live source.

A missing first-party website is not by itself grounds for rejecting a real restaurant. Identity still has to be established independently and the selected menu source must pass the normal live source/safety/quality gates.

## Minimum item count is a source-integrity floor, not a quota

`minimumExpectedItems` remains a hard fail-closed assertion, but its value must be justified by the **current canonical source** and the coverage needed to detect parser/source regressions. It is not a target for how many dishes a restaurant ought to have.

- Do not set the minimum to an arbitrary restaurant-size or cuisine-coverage number.
- Do not reject a restaurant merely because its legitimate current menu is shorter than an earlier snapshot or research result.
- If direct live-source evidence proves that a dish was removed, update the stale required assertion and source-backed minimum instead of forcing the old menu to remain true.
- Never lower the minimum to conceal parser loss: if the live source still contains more items than Fysen materializes, fix the generic parser/transport problem or fail closed.
- Required dish/price assertions should pin representative current source evidence, while forbidden assertions protect against UI, beverage and parser leakage.

The candidate validation gate checks the declared sources with the same runtime primitives used in production:

- menu fetch mode and network policy;
- HTML / JSON-LD / PDF extraction;
- canonical menu fingerprint and price semantics;
- source-backed minimum item count;
- required dish and price-variant assertions;
- forbidden dish-name assertions for parser-quality failures;
- opening-hours extraction and minimum interval count;
- booking/order reachability.

Menu quality and restaurant identity remain hard production gates. Commercial actions are included only when they can be verified. Opening hours are strict by default, but an otherwise verified restaurant must not be excluded solely because kitchen hours are ambiguous or temporarily not canonical-readable.

For that case the manifest may explicitly declare hours uncertainty:

```json
"verification": {
  "hours": {
    "status": "provisional",
    "checkedAt": "2026-08-20",
    "note": "First-party page exposes venue hours, but no complete kitchen-scoped schedule."
  }
}
```

`provisional` requires an `hoursSource` so Fysen can keep monitoring it. `unverified` may be used when no canonical kitchen-hours source is currently available. Both states require a dated reason and make only the hours gate nonblocking; they never relax menu, price, identity, network-security or action validation.

Production persists the hours verification status and audit metadata. Search only uses `verified` hours to derive `open` / `closed`; a provisional or unverified restaurant remains searchable by its verified menu, but its opening state is `unknown` until the hours status is promoted to verified.

## Batch intake and validation

For larger research groups, use the production-line commands documented in [`docs/restaurant-production.md`](../../../docs/restaurant-production.md). `intake:batch` fetches each declared canonical menu source, pins the complete observed item count as the initial source-integrity floor and generates representative priced assertions. It never overwrites an existing candidate.

`validate:candidates:batch` validates candidates with bounded concurrency. Each candidate returns its own result, and failures are grouped into manifest, transport, extraction, menu assertion, hours, action or unknown families. A malformed or unavailable candidate therefore remains red without preventing independent candidates from completing their live gates.

Batching changes throughput only. It does not relax source hierarchy, minimum item floors, required/forbidden assertions, action verification or the explicit promotion boundary.

All explicitly uncertain production restaurants are available from the derived audit log:

```bash
pnpm --filter @fysen/menu-worker verification:log
```

The log is generated from the canonical manifests rather than maintained as a second hand-written restaurant list.

Validation performs no database writes and cannot activate a restaurant.

Promotion is explicit: after a candidate passes all blocking source validation, the same manifest is moved from `candidates/` to `catalog/` in a separate production-onboarding change. `catalog/` remains the only directory consumed by automatic onboarding.
