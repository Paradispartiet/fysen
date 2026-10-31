# Priced dish allergen metadata — 31 October 2026

The production catalog and its source health now verify all 983 restaurants, and 76 direct public name/price/source checks pass. The final rendered-browse check nevertheless found that 19 of Engebret's 20 valid dishes were absent from browse: their source-backed descriptions start with allergen metadata. The public search index contains all 20.

The consumer classifier previously treated any description beginning with `allergen` as an information-only record, regardless of its named dish and positive source price. Keep that fallback for unpriced/zero-price informational records, while letting a positively priced named row continue through the existing beverage, modifier and side filters. Titles explicitly identifying allergens/information remain excluded even if they have a captured price.

Tests use the two full Engebret steak titles and source prices, explicit allergen titles with prices, unpriced metadata, beverages and sides with allergen descriptions. Three new cases failed against the old rule; all 69 database unit tests, TypeScript and ESLint pass after the fix. A read-only production impact audit is run before merge; its temporary instrumentation is removed from the final change. No source parser, source assertion, freshness rule, API limit or deadline changes.
