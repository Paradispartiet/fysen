# Restaurant candidates

This directory is the staging area for restaurant onboarding manifests.

A candidate manifest uses the exact same schema as a production manifest in `catalog/`, but files in `candidates/` are **never** read by the production onboarding job. They exist only for read-only source validation.

The candidate validation gate checks the declared first-party sources with the same runtime primitives used in production:

- menu fetch mode and network policy;
- HTML / JSON-LD / PDF extraction;
- canonical menu fingerprint and price semantics;
- minimum item count;
- required dish and price-variant assertions;
- forbidden dish-name assertions for parser-quality failures;
- opening-hours extraction and minimum interval count;
- booking/order reachability.

Validation performs no database writes and cannot activate a restaurant.

Promotion is explicit: after a candidate passes source validation, the same manifest is moved from `candidates/` to `catalog/` in a separate production-onboarding change. `catalog/` remains the only directory consumed by automatic onboarding.
