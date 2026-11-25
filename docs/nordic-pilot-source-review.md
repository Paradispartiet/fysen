# Nordic pilot source review

Three first-party restaurant menu sources reviewed 2026-11-25; see nordic-pilot-source-review.json. Samples are factual QA observations, not exhaustive menus and not public availability records. The price helper is intentionally isolated from the existing NOK extraction pipeline. It accepts only already identified price fields in a verified local currency context. Before integration, each source adapter needs deterministic extraction, full-menu coverage, robots-aware retrieval, identity/price/currency assertions and a verified source date. Do not write these examples to the live database or archive.

The Oslo HTML/PDF heuristic uses NOK and a minimum of 40 major units in common paths; directly reusing it for EUR would silently lose items. Swedish PDF portion labels and Finnish multiple price fields need different handling. The reviewed source JSON records sample evidence only. Review seasonal validity and replace menus when the source changes.
