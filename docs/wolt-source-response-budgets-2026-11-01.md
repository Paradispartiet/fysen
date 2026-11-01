# Two explicit Wolt response budgets — 1 November 2026

Full catalog proof [41270052806](https://github.com/Paradispartiet/fysen/actions/runs/41270052806) on `1dfa501` accepted 980 of 983 sources. Burger King Hegdehaugsveien and Domino's Grorud failed before extraction with `Response exceeds 2097152 bytes`. These are response-budget failures, not evidence of missing dishes or bad prices.

Both manifests now explicitly use the existing bounded 8 MiB HTTP source option, already used by canonical Wolt sources such as Domino Nydalen, Tveita and Løren. This does not change the global 2 MiB default or the maximum allowed by existing code. Source URLs, redirect origins, robots enforcement, browser policy, restaurant identities, minimum eight offers and all ten name/price controls per source remain unchanged.

Independent current captures contain 82 and 56 eligible offers and pass all twenty existing controls. Their payloads were 1,740,239 and 1,489,700 bytes; these are not the sizes of the failed GitHub responses. Different fetches return different response envelopes. No exact size is invented for the failed response. The override remains a hard cap, and fresh strict validation must pass before publication.

[Source evidence](research/wolt-source-response-budgets-20261101.sources.json) records the failed run, hashes, observed comparison sizes and unchanged controls. No parser, semantic filter, minimum or price assertion is relaxed to admit these pages.
