# Production finish — 31 October 2026

The catalog has 983 materialized restaurants after PR #1074, but the exact source-health proof reports 982 healthy sources and one Tasty Thai Grønland extraction error. The public browse page also exceeds its existing 5-second API request budget. Materialization success alone is not production approval.

## Tasty Thai current menu

The current Wolt delivery menu contains 34 extracted priced offers. Its minimum 36 rejects ordinary selection changes. Satay Gai is absent from the raw embedded menu; its assertion slot now checks independently listed Mini Vårruller 115 NOK. All seven other controls remain unchanged, with eight exact name/price assertions in total. The minimum becomes 30, the established 90%-of-observed buffer rounded down. No parser, source URL or forbidden-name policy changes. Raw source SHA256, capture timestamp, item IDs, paths and all eight pairs are recorded in [source evidence](research/production-finish-20261031.sources.json). Kitchen hours remain unverified; prices are Wolt delivery prices.

## Browse transport latency

The read-only production diagnosis is in draft PR #1075, which is not intended for merge. On the exact same transaction and source data, the flat browse query returned 48082 rows in 6593 ms; database execution itself took only about 200 ms. The compact experiment returned 983 restaurant groups in 1148 ms and reconstructed a byte-identical complete browse response with 20403 dishes, recent dishes, popular dishes and quality counters. This identifies row transport as the bottleneck.

The production change wraps the unchanged eligible-row selection in a CTE and aggregates compact item tuples per restaurant. It sends restaurant identity/name/address once per group, then reconstructs the existing rows before classification, ranking, deduplication and example selection. All item fields remain available, including full descriptions and fetched timestamps. Queries for recent additions and popular searches remain unchanged. No freshness rule, API query limit, source assertion, response schema or request deadline changes.

Two new regression tests were observed failing against the old flat-row reader, then passing with compact expansion. They exercise classification exclusions, canonical identity, restaurant counts/examples and timestamp ranking. All 65 database unit tests, TypeScript check and ESLint pass locally. Real PostgreSQL integration checks and production proof must pass before completion. Ranking comparisons that are fully tied retain the existing unspecified tie order; the actual production response comparison was exact.

## Public menu verification already completed

All 61 exact public API name/price/currency/source checks passed: Engebret 20, Lofoten 23, Salmon 2 scoop-unit corrections, Biryani Express 8 and Delicatessen Majorstuen 8. Tasty Thai public checks, source-health reconcile, rendered browse and final release proof remain required after deployment.
