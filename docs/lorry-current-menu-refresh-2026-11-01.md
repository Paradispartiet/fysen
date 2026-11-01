# Lorry current first-party menu refresh

On 2026-11-01 the former canonical source `https://lorry.no/meny/middag`
returned 404. The official homepage `https://lorry.no/` links **Julemeny** at
`https://lorry.no/meny/julemeny`. The replacement source contains nine
individually priced food components; the former 26-item dinner floor belongs
to the superseded source. The new floor is eight as a normal-variation buffer of one, with exact
name/price controls for all nine source offers remaining mandatory. This check date does not assert a seasonal start
date: the page supplies none.

| Source title | NOK |
| --- | ---: |
| Lutefisk | 875 |
| Pinnekjøtt | 875 |
| Juletallerken | 745 |
| Rakørret | 695 |
| Smalahove | 735 |
| Vegetarisk Juletallerken | 435 |
| Multekrem | 275 |
| Riskrem med bringebærsaus | 239 |
| Vaniljeis med bjørnebær og eggelikør | 239 |

The page explicitly binds each title (`menu-item__name`), description
(`menu-item__description`) and bare numeric price (`menu-item__price`) inside
one `menu-item` component. Ribbe and Vegetarisk Bratwürst are ingredients in
Juletallerken descriptions, not independently priced dishes. Lutefisk and
Pinnekjøtt each state **2 serveringer**; recovery retains this condition and
all ingredient/allergen text in descriptions and source excerpts.

The full unmodified capture is
`apps/menu-worker/src/fixtures/lorry-julemeny-2026-11-01.html`.
Its SHA-256 is
`f0101f57e0f274ccfc9c1487909e9a6da462dc1341121d625a90054caaa39230`.
The companion JSON records source identity, count, controls and publication
policy. Tests use this whole capture, including navigation and contact footer,
rather than only menu cards.

Scope is this Julemeny page. Lunch and the separately linked reduced menu for
Sundays/quiet days are not combined with its nine offers. Restaurant identity,
coordinates, actions and hours verification status remain unchanged.

The explicit component path returns nonempty results only when every visible
card is unambiguous and no other visible bare or currency-marked price remains
inside or outside the cards. Hidden/navigation content is excluded; a footer
is never exempted wholesale. Conflicting duplicates reject completeness;
equivalent duplicates collapse. Existing Squarespace ordinary-menu recovery
remains unchanged. Complete component results take precedence over the larger
heuristic set that previously promoted ingredients to extra dishes.

Stage the source change and preserve the previously published menu until the
replacement fetch, complete extraction, minimum count, and all nine exact
name/price controls validate. A failed replacement must not publish a partial
menu or erase the previous valid data.
