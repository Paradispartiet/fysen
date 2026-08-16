# Menu Watcher v1

## Purpose

Menu Watcher v1 turns a restaurant-owned public menu page into a versioned, auditable menu observation without making the public Fysen API depend on live third-party websites.

## One check

1. Load the configured `MenuSource` from PostgreSQL.
2. Reject non-HTTP(S), credential-bearing or non-public network destinations.
3. Fetch and evaluate `/robots.txt` for the configured user agent.
4. Apply per-origin delay, timeout, response-size and redirect limits.
5. Send `If-None-Match` / `If-Modified-Since` when prior validators exist.
6. Prefer schema.org-style JSON-LD `MenuItem` records.
7. Fall back to conservative price-terminated HTML lines.
8. Reject extraction below `minimum_expected_items`.
9. Quarantine a large unexplained collapse relative to the previous accepted snapshot.
10. Compute the normalized menu fingerprint and item-level diff.
11. Persist snapshot, items, changes and watch-run atomically.

## Outcomes

- `changed`: a new accepted menu snapshot was persisted.
- `unchanged`: page was fetched and parsed but the canonical menu fingerprint is unchanged.
- `not_modified`: origin returned HTTP 304.
- `blocked_by_robots`: robots rules explicitly disallow the target URL.
- `fetch_error`: HTTP/network/security validation failed.
- `extraction_error`: fetched material cannot safely produce an accepted menu.
- `quarantined`: extraction changed too dramatically to publish automatically.

## Network safety

The HTTP worker is not a general-purpose URL fetcher. It resolves hostnames before requesting them and rejects loopback, private, link-local, reserved and otherwise non-public address ranges. Redirect destinations are revalidated and v1 blocks cross-origin redirects.

These checks reduce SSRF risk. Production deployment must also use egress/network policy so application-level validation is not the only line of defense.

## robots.txt policy

Fysen checks robots rules before fetching the configured menu URL. A normal 4xx response other than 429 is treated as no published robots restriction. Rate-limiting responses and server failures are treated fail-closed rather than guessed through.

## Extraction scope

v1 intentionally supports only:

- JSON-LD `MenuItem`
- conservative HTML lines ending in a plausible whole-NOK price

PDF, image/OCR, JavaScript browser rendering and source-specific adapters are future fallback layers. They must produce the same canonical observation shape and pass the same publication gates.

## Evidence and privacy

Fysen stores hashes, normalized menu evidence and bounded source excerpts for accepted menu items. It does not persist the full raw HTML body in the v1 database. This keeps the searchable index traceable without making the database a wholesale copy of every crawled page.

## CI versus live pilot

CI tests extraction with deterministic fixtures and tests migrations against PostgreSQL/PostGIS. It deliberately does not depend on a restaurant website being available during a build.

The Oslo pilot is a separate manual command. A live pilot result is not considered production-approved until the extracted items are reviewed against the source page.
