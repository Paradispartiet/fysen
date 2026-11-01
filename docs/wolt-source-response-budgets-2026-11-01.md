# Two explicit Wolt response budgets — 1 November 2026

Full catalog proof [41270052806](https://github.com/Paradispartiet/fysen/actions/runs/41270052806) on `1dfa501` accepted 980 of 983 sources. Burger King Hegdehaugsveien and Domino's Grorud failed before extraction with `Response exceeds 2097152 bytes`. These are response-budget failures, not evidence of missing dishes or bad prices.

Both manifests now explicitly use the existing bounded 8 MiB HTTP source option, already used by canonical Wolt sources such as Domino Nydalen, Tveita and Løren. This does not change the global 2 MiB default or the maximum allowed by existing code. Source URLs, redirect origins, robots enforcement, browser policy, restaurant identities, minimum eight offers and all ten name/price controls per source remain unchanged.

Independent current captures contain 82 and 56 eligible offers and pass all twenty existing controls. Their payloads were 1,740,239 and 1,489,700 bytes; these are not the sizes of the failed GitHub responses. Different fetches return different response envelopes. No exact size is invented for the failed response. The override remains a hard cap, and fresh strict validation must pass before publication.

[Source evidence](research/wolt-source-response-budgets-20261101.sources.json) records the failed run, hashes, observed comparison sizes and unchanged controls. No parser, semantic filter, minimum or price assertion is relaxed to admit these pages.

## Domino Pilestredet — follow-up on the new strict PR run

The strict PR validation on [run 41303213144](https://github.com/Paradispartiet/fysen/actions/runs/41303213144) failed for `catalog/dominos-pizza-pilestredet-oslo.json` with `Response exceeds 2097152 bytes`, after earlier requested restaurant manifests including Burger King Hegdehaugsveien and Domino Grorud passed. A separate source capture was reported at 2.16 MB. The canonical manifest now uses the same existing per-source 8 MiB hard cap as the other oversized Wolt sources. No global fetch budget, URL, identity, minimum, required dish title or price check was changed. Acceptance remains contingent on a fresh strict PR validation and full 983-source catalog proof. Other sources have not been widened without a direct failure.
