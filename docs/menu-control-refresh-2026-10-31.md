# Current source controls — 31 October 2026

The 983-manifest production materialization completed with two blocking onboarding failures: Biryani Express Barcode and Delicatessen Majorstuen. Both sources still contain enough priced offers, but three prior control dishes are absent from the current source. No parser change is needed for these failures.

| Restaurant | Removed control | Replacement control | Source price |
| --- | --- | --- | --- |
| Biryani Express | Chettinad Chicken Biryani | House Special Boneless Chicken Biryani (Hot) | 269 NOK |
| Biryani Express | Family Chettinad Chicken Biryani | Family Hyderabadi Chicken Biryani (Hot) | 559 NOK |
| Delicatessen Majorstuen | Grillet Entrecote Txogitxu | Presa ibérica (200g) | 365 NOK |

These are independent current-menu controls, not claims that the removed dishes were renamed. Each restaurant retains eight exact name/price assertions. The other thirteen assertions and all manifest fields except these controls and their verification notes/date are unchanged. Item floors remain 19 and 44; current extraction yields 20 and 54 offers.

The Wolt embedded menu records and the first-party-linked Favrit public menu records were checked independently of extraction. All sixteen asserted pairs match raw records; the three removed names are absent. Source hashes, capture timestamps, stable item IDs, JSON paths and assertion pairs are in [the source evidence](research/menu-control-refresh-20261031.sources.json). Wolt prices remain delivery prices; kitchen hours remain unverified.

The failed materialization also recorded a nonblocking Tasty Thai Grønland extraction error with prior publication preserved. Global source health, catalog reconcile, production pilot proof and rendered public browse must pass after these two manifest updates; local acceptance is not production approval.

Separately, the 45 public API checks completed successfully for all 20 Engebret October à-la-carte dishes, all 23 Lofoten ordinary lunch/dinner offers and both Salmon scoop-unit corrections. This does not cover Engebret’s separate menus or Lofoten’s unsupported kilogram price.
