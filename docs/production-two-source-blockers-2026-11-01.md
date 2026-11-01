# PR #1078 production follow-up — two blocking Wolt sources

Merge: [PR #1078](https://github.com/Paradispartiet/fysen/pull/1078), commit `09bd5ec232987dbdad54eb03158aebb7f360ff0d`.

Production materialization [run #41337870383](https://github.com/Paradispartiet/fysen/actions/runs/41337870383) failed at 983/983 processed, with six failed restaurant refreshes; **two blocking assertion failures** prevented automatic production reconcile [#41342573056](https://github.com/Paradispartiet/fysen/actions/runs/41342573056), which was skipped. Blocking slugs:

- `sabi-sushi-holtet-oslo`: 36 priced items extracted; `Gyoza` at NOK 184 absent from this extractor-refresh snapshot. The dish is nonetheless listed on the published [Sabi Sushi Holtet Wolt page](https://wolt.com/nb/nor/oslo/restaurant/sabi-sushi-holtet). Do **not** remove/rename it or reduce quality floor solely for a failed runtime snapshot.
- `viet-kitchen-bjolsen-oslo`: 71 priced items extracted; `BÚN BÒ XÀO XẢ ỚT - Risnudler med marinert biff` at NOK 249 missing from this extractor-refresh snapshot. The same dish appears on the published [Viet Kitchen Wolt page](https://wolt.com/en/nor/oslo/restaurant/viet-kitchen-oslo). Retain its exact name/price and the current floor.

Other **nonblocking source-refresh errors** are Alibaba Grill Stovner (`extraction_error`), Burger King Mortensrud (2 MiB response limit), Ela Gyros (`extraction_error`) and Zam Zam Hasle (`extraction_error`). They remain source-health incidents and must not be reported as fresh/healthy solely because they are nonblocking.

This small PR requests **only two exact-head strict source proofs**. No all-catalog PR validation, parser wide change, fake product, count cutoff or unrelated restaurant modification. If both exact-head proofs pass, merging the notes allows the ordinary required production materialization to rerun and re-enable reconcile. If either fails, investigate the specific source with captured proof log; do not merge to force a green status.
