# Fysen architecture v1

## North star

Fysen is a **dish-first** product. The primary entity in search is a dish occurrence on a current restaurant menu, not a restaurant review or a recommendation generated at query time.

## Hard boundaries

1. **Source ingestion is evidence.** HTTP/PDF/image/API observations are source material, not the product model.
2. **Canonical menu data is derived.** Extractors may propose structured menu items, but only validated records enter the searchable index.
3. **Search is deterministic.** AI may later assist ingestion and canonicalization; it does not invent availability during a user search.
4. **Freshness is first-class.** Every searchable occurrence must ultimately resolve to a source, snapshot and verification timestamp.
5. **Crawler and API are separate processes.** Slow or hostile websites cannot consume public API capacity.
6. **External providers are adapters, not domain models.** Fysen must survive replacement of any map, AI, crawling or restaurant-data provider.
7. **Bad extraction fails closed.** A suspicious menu collapse is quarantined instead of being interpreted as mass removal.

## Runtime topology

```text
React/Next.js web
        |
    NestJS API
        |
  PostgreSQL/PostGIS
        ^
        |
 canonical menu writes
        ^
        |
 Menu Worker
    |
    +-- URL/SSRF gate
    +-- robots.txt gate
    +-- polite HTTP fetch + conditional headers
    +-- JSON-LD MenuItem extraction
    +-- controlled HTML heuristic fallback
    +-- extraction quality gate
    +-- fingerprint + diff
```

The API and worker share domain contracts, but the worker is not hosted inside the public API process.

## Persistence model

The backend-owned tables live in the dedicated PostgreSQL schema `fysen` rather than the default `public` schema.

```text
restaurants
   |
menu_sources
   |
menu_snapshots -------- menu_watch_runs
   |
menu_items
   |
menu_changes
```

`menu_snapshots` are immutable successful menu observations. `menu_sources` hold current operational state such as ETag, Last-Modified, last menu fingerprint and next check time. `menu_watch_runs` retain both successful and failed checks.

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

## Search order

Planned v1 ranking pipeline:

1. canonical exact match
2. curated aliases
3. normalized/fuzzy lexical match
4. semantic fallback for candidate discovery
5. freshness + open-now + distance ranking

Semantic similarity never overrides an explicit incompatible dish identity.

## Data-quality bias

False positives are more damaging than missing results. When evidence is stale or extraction confidence is low, Fysen should withhold or visibly downgrade the result rather than claim availability.
