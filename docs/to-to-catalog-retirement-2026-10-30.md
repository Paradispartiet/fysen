# To-To Rådhusplassen — retire stale active menu identity

Checked: 2026-10-30.

Decision: remove `to-to-radhusplassen-oslo` from the active canonical catalog and preserve its exact previous manifest in `apps/menu-worker/research/retired/to-to-radhusplassen-oslo.json`. The existing production coverage reconciliation owns deactivation of the obsolete active record and disabling its sources. Historical snapshots are retained; no database records are deleted by this change.

Evidence:

- Both configured Wolt locale endpoints returned HTTP 404 during strict GitHub validation (#40868725315 and the prior Norwegian-source catalog health), and the current direct Norwegian source fetch still returns 404. The former homepage https://www.to-to.no/ also returns 404.
- Brønnøysund identifies TO-TO AS, organization 929907140, through under-unit 830725202 at Fridtjof Nansens plass 7, and reports the main entity as bankrupt: https://virksomhet.brreg.no/nb/oppslag/underenheter/830725202
- A current first-party venue page identifies Fridtjof at Fridtjof Nansens plass 7 with a different organization, 929588762: https://fridtjofbar.no/oslo

This combination does not support continuing to publish the old To-To menu as current active coverage. Bankruptcy alone is not treated as proof of a specific closure date. No closure date is invented, and To-To is not automatically renamed or merged into Fridtjof. A future Fridtjof intake requires its own identity and priced-menu proof.

Expected canonical count at this revision: 982 to 981. No other restaurant is removed. Existing strict menu assertions and parser behavior are unchanged.
