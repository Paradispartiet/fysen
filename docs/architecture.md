# Fysen architecture v1

## North star

Fysen is a **dish-first** product. The primary entity in search is a dish occurrence on a current restaurant menu, not a restaurant review or a recommendation generated at query time.

## Hard boundaries

1. **Source ingestion is evidence.** Raw HTML/PDF/image/API observations are immutable source material.
2. **Canonical menu data is derived.** Extractors may propose structured menu items, but only validated records enter the searchable index.
3. **Search is deterministic.** AI may assist ingestion and canonicalization; it does not invent availability during a user search.
4. **Freshness is first-class.** Every searchable occurrence must have `lastVerifiedAt` and `sourceUrl`.
5. **Crawler and API are separate processes.** Slow or hostile websites cannot consume public API capacity.
6. **External providers are adapters, not domain models.** Fysen must survive replacement of any map, AI, crawling or restaurant-data provider.

## Initial runtime topology

```text
React/Next.js web
        |
    NestJS API
        |
  PostgreSQL/PostGIS   <- next delivery
        ^
        |
 canonical menu writes
        ^
        |
 Menu Worker -> HTTP -> structured data -> Playwright/PDF/image fallbacks
```

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
