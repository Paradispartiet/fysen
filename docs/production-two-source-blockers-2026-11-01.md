# PR #1078 production follow-up — two source blockers, 1 November 2026

Production [materialization #41337870383](https://github.com/Paradispartiet/fysen/actions/runs/41337870383) processed 983 manifests but failed on **two blocking** extractor-refresh quality checks, skipping automatic [reconcile #41342573056](https://github.com/Paradispartiet/fysen/actions/runs/41342573056). Four other refresh incidents were classified as nonblocking, not healthy.

## Confirmed direct source evidence

- **Sabi Sushi Holtet**: production snapshot had 36 dishes and omitted `Gyoza` at **184 NOK**. Later [strict HTTP source proof #41345736871](https://github.com/Paradispartiet/fysen/actions/runs/41345736871) returned **37** priced items, including `Gyoza` at 184 NOK, and passed all eight existing exact controls. No substantive change needed.
- **Viet Kitchen Bjølsen**: [HTTP proof and isolated diagnostic #41346809813](https://github.com/Paradispartiet/fysen/actions/runs/41346809813) fetched **1,849,972 bytes**, source SHA-256 `936e85db456748823e469ff946544ab5239a88962ab1935add1feaef87bfacb1`. The embedded menu payload contained **106** items bound to 16 category slots; existing extractor returned **71 priced food items**. The original `BÚN BÒ XÀO XẢ ỚT - Risnudler med marinert biff` was **absent from the fetched raw scripts**, not silently dropped by filtering. The independently observed [indexed Wolt menu](https://wolt.com/en/nor/oslo/restaurant/viet-kitchen-oslo) and [Foodora menu](https://www.foodora.no/en/restaurant/x0nn/viet-kitchen) still mention that dish; they may represent different publication snapshots and **do not prove availability in the live Wolt response used by Fysen**.
- The same live raw Wolt response independently contains `BÚN NEM NƯỚNG - Risnudler med grillede Nem svinnekjøttkaker` at **239 NOK**. Replace **only** the unsupported Wolt name+price assertion with this grounded rice-noodle dish. The nine other exact controls, 66-item minimum alert, provider URL and HTTP transport stay unchanged; no item cap or source-health waiver.
- Rendered-browser trial [#41345918349](https://github.com/Paradispartiet/fysen/actions/runs/41345918349) exceeded the built-in 120-request limit, and is **reverted**. No third-party origin or request-budget rules are weakened.

## Remaining nonblocking source health incidents

Alibaba Grill Stovner, Ela Gyros and Zam Zam Hasle each returned an `extraction_error` during refresh. Burger King Mortensrud exceeded the 2 MiB response limit. They need their own source-health rechecks, but are not the two stated catalog onboarding blockers.

## Release policy

This PR validates **only the two changed manifests**. It must pass strict live proofs and ordinary CI before merge. Production materialization and reconcile after merge must be verified, and targeted public-search checks should confirm restaurant/source/price. Do not run a duplicate full-catalog PR proof or pretend a current Wolt listing exists where the fetched source lacks it.
