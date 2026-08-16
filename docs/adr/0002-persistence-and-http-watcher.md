# ADR 0002 — PostgreSQL persistence and HTTP-first Menu Watcher

- **Status:** Accepted
- **Date:** 2026-08-16

## Context

Fysen needs a fresh menu index while remaining fast, auditable and independent of any single delivery platform or restaurant provider. Fetching a website during a user search would make correctness and latency depend on a third party and would provide no stable history of what changed.

## Decision

1. PostgreSQL is the source of truth for accepted Fysen menu observations.
2. Restaurant coordinates use PostGIS `geography(Point, 4326)`.
3. Backend-owned data lives in schema `fysen`, not the default `public` schema.
4. The menu worker runs separately from the public API.
5. The first ingestion adapter is polite HTTP with robots handling, conditional requests, SSRF validation and bounded responses.
6. Structured JSON-LD is preferred. HTML heuristics are conservative fallback only.
7. Successful changed observations create immutable snapshots and explicit diffs.
8. Suspicious extraction is quarantined instead of automatically changing searchable availability.
9. Live crawling is excluded from required CI; deterministic fixtures and a real PostGIS service test the same pipeline components.

## Consequences

Fysen can later add Playwright, PDF, image/OCR and partner API adapters without changing the storage contract. Search can operate entirely on accepted data and stay deterministic. The tradeoff is that some menus will initially be unsupported or withheld rather than guessed, which is intentional because false availability is the more damaging product failure.
