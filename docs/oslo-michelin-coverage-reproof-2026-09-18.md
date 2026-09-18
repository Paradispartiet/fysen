# Oslo Michelin coverage reproof — 2026-09-18

This is a fresh source/runtime reproof of six still-non-canonical Oslo MICHELIN coverage gaps selected from the 2026-09-11 P0 audit. It is a coverage round, not a volume batch. Catalog health (741/741 before this work) is not treated as Oslo coverage.

Research contract:
- use current first-party menu evidence only;
- do not use guide/editorial dish lists as canonical menu authority;
- keep the canonical three-dish floor;
- do not add restaurant-specific parser exceptions merely to promote a candidate;
- treat successful generation as provisional until semantic artifact QA;
- retain unresolved MICHELIN candidates in the coverage queue.

## Exact-head proof

Initial head: `300cd8d38700e26f06a7ad98136a3a0ffd3e7a46`
Restaurant batch intake #943:
- requested: 6
- generated: 2
- failed: 4
- generated: Madonna (12 items / 8 assertions), Festningen Restaurant (8 / 8)
- Brasserie Hansken: PDF title/price conflict
- FYR Bistronomi & Bar: 1 unique priced dish
- Vaaghals: blocked on first-party redirect to `https://static1.squarespace.com`
- Cru: 1 unique priced dish

Vaaghals round-2 evidence had already proven that exact Squarespace CDN redirect legitimate. The seed therefore restored only that previously documented redirect origin and reran without changing parser or item floors.

Second head: `95c5e6fa6f551b55dcaa54dc82b5509762454660`
Restaurant batch intake #944:
- requested: 6
- generated: 2
- failed: 4
- Brasserie Hansken: unchanged PDF title/price conflict under `pdf-text-v33`
- Madonna: generated 12 items / 8 assertions under current HTML extraction
- Festningen Restaurant: generated 8 items / 8 assertions, but failed manual semantic artifact QA
- FYR Bistronomi & Bar: still only 1 unique priced dish
- Vaaghals: redirect passed; `pdf-text-v33` exposed no canonical menu items
- Cru: still only 1 unique priced dish

## Candidate decisions

| Restaurant | Decision | Current evidence | Reason |
|---|---|---|---|
| Brasserie Hansken | `review` | Current first-party 2026 evening PDF | Live PDF extraction still binds the same extracted cheese title to conflicting prices (295 and 85). This is a parser/layout ambiguity, not a missing-source problem. |
| Madonna | **`intake`** | Current first-party textual dinner menu | Generated 12 canonical items with 8 representative priced assertions. The prior round-3 generic extraction failure is no longer reproduced. Keep as the sole permanent seed candidate for strict live validation. |
| Festningen Restaurant | `review` | Current first-party dinner page | Technical generation succeeded, but semantic artifact QA exposed bilingual duplicate dishes (`SPEKEMAT` / `CURED MEAT`) and an allergen fragment embedded in at least one dish title. Do not promote contaminated output. |
| FYR Bistronomi & Bar | `review` | Current first-party seasonal menu | Source is rich in individually priced dishes, but production extraction still exposes only one unique priced dish. The three-dish floor remains unchanged. |
| Vaaghals | `review` | First-party evening PDF dated 16 September 2026 | The already-proven Squarespace redirect now passes, but current `pdf-text-v33` yields no canonical menu items. Transport is no longer the blocker. |
| Cru | `review` | Current first-party Bjørvika menu surface | The former 404 is gone, but current production extraction exposes only one unique priced dish. |

## Closeout policy

Only Madonna remains in the permanent research seed after this reproof. The five review candidates remain part of the Oslo MICHELIN coverage queue; none is rejected as a restaurant, only held on Fysen-specific dish-first evidence or semantic output quality.

A later promotion PR may be created only after Madonna passes an exact-head strict live validation from the reduced seed. Festningen requires a generic bilingual/output-canonicalization solution before reproof. Hansken requires a generic PDF title/price-layout solution before reproof. FYR, Vaaghals and Cru remain source/extraction review items unless current first-party surfaces become canonically extractable.
