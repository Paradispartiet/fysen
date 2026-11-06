/**
 * Fail-closed public-search exclusions for identity disputes proven in the
 * Free menu registry. The unit test cross-checks every slug against
 * apps/menu-worker/free-identity-quarantines.json on every code CI run.
 *
 * These are identity quarantines, not stale-menu or parser failures.
 * Never remove one without a documented source verification and a matching
 * registry change. Historical snapshots remain untouched.
 */
export const publicIdentityQuarantineSlugs = [
  "city-work-akersgata-oslo",
  "falafel-station-brugata-oslo",
  "fancii-oslo",
  "ferrys-pizzeria-filipstad-oslo",
] as const;
