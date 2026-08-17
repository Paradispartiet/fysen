# Fysen architecture v1

## North star

Fysen is a **dish-first** product. The primary entity in search is a dish occurrence on a current restaurant menu, not a restaurant review or a recommendation generated at query time.

Product execution is currently governed by two complementary plans:

- [`oslo-pilot-v1.md`](./oslo-pilot-v1.md) — make Fysen genuinely useful in Oslo;
- [`revenue-layer-v1.md`](./revenue-layer-v1.md) — make demand and restaurant value measurable without corrupting organic search.

## Hard boundaries

1. **Source ingestion is evidence.** HTTP/PDF/image/API observations are source material, not the product model.
2. **Canonical menu data is derived.** Extractors may propose structured menu items, but only validated records enter the searchable index.
3. **Search is deterministic.** AI may later assist ingestion and canonicalization; it does not invent availability during a user search.
4. **Freshness is first-class.** Every searchable occurrence must ultimately resolve to a source, snapshot and verification timestamp.
5. **Crawler and API are separate processes.** Slow or hostile websites cannot consume public API capacity.
6. **External providers are adapters, not domain models.** Fysen must survive replacement of any map, AI, crawling or restaurant-data provider.
7. **Bad extraction fails closed.** A suspicious menu or opening-hours collapse is quarantined instead of being interpreted as a real-world mass change.
8. **Organic relevance is not for sale.** Commercial placement must never fabricate eligibility or change what counts as an organic dish match.
9. **Revenue telemetry is data-minimal.** Demand measurement does not require IP, user-agent, account identity or permanent user profiles in v1.
10. **Commercial destinations are verified data.** Booking/order buttons require an active, unexpired canonical destination with source provenance; stale destinations fail closed.
11. **Opening state is verified data.** `open` or `closed` requires a fresh, accepted kitchen-hours snapshot in the restaurant's canonical time zone. Missing or stale evidence is always `unknown`.

## Runtime topology

```text
React/Next.js web
        |
    NestJS API
        |
  PostgreSQL/PostGIS
        ^
        |
 canonical menu/action/hours writes
        ^
        |
 Menu Worker
    |
    +-- URL/SSRF gate
    +-- robots.txt gate
    +-- polite HTTP fetch + conditional headers
    +-- JSON-LD MenuItem extraction
    +-- controlled HTML menu heuristic fallback
    +-- kitchen-hours extraction
    +-- extraction quality gates
    +-- fingerprints + change detection
    +-- booking/order destination re-verification
```

The API and worker share domain contracts, but the worker is not hosted inside the public API process.

## Persistence model

The backend-owned tables live in the dedicated PostgreSQL schema `fysen` rather than the default `public` schema.

```text
restaurants
   |\
   | restaurant_actions -------- restaurant_action_verification_runs
   |
   | restaurant_hours_sources -------- restaurant_hours_watch_runs
   |          |
   |          restaurant_hours_snapshots
   |                    |
   |          restaurant_hours_intervals
   |
menu_sources
   |
menu_snapshots -------- menu_watch_runs
   |
menu_items
   |
menu_changes

search_events
   |
search_result_impressions
   |
conversion_events
```

`menu_snapshots` are immutable successful menu observations. `menu_sources` hold current operational state such as ETag, Last-Modified, last menu fingerprint and next check time. `menu_watch_runs` retain both successful and failed checks.

`restaurant_actions` contain canonical booking/order destinations with source URL, verification method, `verified_at` and `expires_at`. Search publishes only enabled actions whose verification has not expired. `restaurant_action_verification_runs` retain both successful and failed rechecks so the later quality dashboard can explain why an action is present, stale or missing.

`restaurant_hours_sources` are independent evidence sources for kitchen service hours. They hold the source URL, IANA time zone, extractor, conditional-HTTP state, schedule fingerprint and next check time. `restaurant_hours_snapshots` are immutable accepted schedules and do not persist raw HTML. `restaurant_hours_intervals` contain canonical ISO-weekday intervals, including explicit next-day closes. `restaurant_hours_watch_runs` retain successes, extraction failures and quarantine outcomes.

The revenue funnel is deliberately separate from evidence ingestion. `search_events` capture normalized demand and result count. `search_result_impressions` establish which concrete menu items were shown and at what rank. `conversion_events` attribute explicit outbound actions to an impression with a deduplicating client event ID.

PostGIS stores restaurant position as `geography(Point, 4326)`. `pg_trgm` is enabled as the first lexical-search primitive; canonical Dish identity will be layered on top rather than inferred directly from fuzzy text.

## Menu publication rule

The watcher pipeline separates **fetch success** from **publication success**:

```text
HTTP 200
  -> extraction
  -> minimum item check
  -> suspicious-drop check
  -> fingerprint comparison
  -> diff
  -> atomic snapshot + items + changes
```

A page can therefore be reachable while its extraction is still rejected or quarantined.

## Restaurant hours publication rule

Kitchen hours use the same evidence-first bias but have a separate lifecycle:

```text
source URL + canonical time zone
  -> safe HTTP fetch / 304 handling
  -> deterministic hours extraction
  -> exact time requirement
  -> minimum interval + suspicious-collapse gate
  -> schedule fingerprint
  -> immutable hours snapshot + intervals
  -> fresh evidence => open / closed
  -> missing or stale evidence => unknown
```

The worker reuses the menu crawler's SSRF, robots, redirect, timeout and response-size protections. A restaurant saying it is open “late” is not sufficient evidence of kitchen availability: when an exact food-service cutoff cannot be established, extraction fails closed rather than inventing a closing time.

Opening state is evaluated in the source's canonical IANA time zone. Overnight intervals explicitly record whether the close occurs the next day. A failed or quarantined recheck does not refresh `last_checked_at`, so old evidence naturally ages into `unknown` instead of remaining authoritative indefinitely.

## Restaurant action publication rule

Booking/order destinations use an independent fail-closed rule:

```text
source evidence
  -> canonical action URL
  -> verified_at + expires_at
  -> publish while enabled and unexpired
  -> reverify seven days before expiry
  -> successful safe fetch extends 30 days
  -> failure does not extend expiry
  -> expiry removes the action from search automatically
```

The re-verifier deliberately reuses the worker's SSRF, robots, redirect, timeout and response-size protections.

## Search order

Planned v1 ranking pipeline:

1. canonical exact match
2. curated aliases
3. normalized/fuzzy lexical match
4. semantic fallback for candidate discovery
5. freshness + open-now + distance ranking

Semantic similarity never overrides an explicit incompatible dish identity. Opening state does not fabricate eligibility: it annotates a menu-qualified result as `open`, `closed` or `unknown` based on independent fresh evidence.

## Revenue attribution rule

Search must remain available even if analytics persistence is temporarily unavailable. Funnel attribution is therefore **fail-open for search availability** while conversion persistence remains explicit and validated.

A successful attributed flow is:

```text
search query
  -> search_event
  -> result impression(s)
  -> impression id returned with result
  -> explicit outbound action
  -> deduplicated conversion_event
```

The supported action types are menu, restaurant website, directions, booking and order. Booking/order actions are returned only when a canonical verified destination is currently publishable.

## Data-quality bias

False positives are more damaging than missing results. When evidence is stale or extraction confidence is low, Fysen should withhold or visibly downgrade the result rather than claim availability.
