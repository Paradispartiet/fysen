# Oslo canonical catalog classification — round 10 — Burger King

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `5c8c41a2aac60535189284f7576bc202d834ac3f`.

This is the tenth bounded family pass from the Oslo quality audit.

## Canonical Oslo family

The catalog currently contains six Burger King identities:

- `burger-king-klingenberg-oslo` — Klingenberggata 5
- `burger-king-majorstuen-oslo` — Valkyriegata 11A
- `burger-king-manglerud-oslo` — Plogveien 6
- `burger-king-storgata-oslo` — Storgata 14-18
- `burger-king-torggata-oslo` — Torggata 24
- `burger-king-ulleval-oslo` — Sognsveien 75A

Fresh local-business / property evidence still resolves all six as active Burger King locations. Manglerud Senter, for example, currently publishes Burger King as an active tenant with current opening hours.

## First-party locator frontend drift

Burger King's current `burgerking.no/restaurants/<slug>` routes are not safe brand-identity evidence in this pass. Multiple Burger King routes currently render HTML titles such as:

- `Popeyes - Klingenberg`
- `Popeyes - Majorstua`
- `Popeyes - Manglerud`
- `Popeyes - Torggata`
- `Popeyes - Ullevål Stadion`

At the same time, current local operating evidence continues to identify Burger King at those physical locations.

This is treated as **first-party frontend / metadata drift**, not as proof that the restaurants have converted brand. No canonical restaurant is renamed or removed on that basis.

Reference routes:
- https://burgerking.no/restaurants/klingenberg
- https://burgerking.no/restaurants/majorstua
- https://burgerking.no/restaurants/manglerud
- https://burgerking.no/restaurants/torggata
- https://burgerking.no/restaurants/ulleval

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `burger-king-klingenberg-oslo` | coverage | keep |
| `burger-king-majorstuen-oslo` | coverage | keep |
| `burger-king-manglerud-oslo` | coverage | keep |
| `burger-king-storgata-oslo` | coverage | keep |
| `burger-king-torggata-oslo` | coverage | keep |
| `burger-king-ulleval-oslo` | coverage | keep |

The six restaurants contribute physical/proximity coverage. The shared Burger King menu is not counted as six independent dish-value gains.

## Additional Oslo review signals

Current local-business evidence also identifies Burger King at:

- Oslo S — Jernbanetorget 1
- Hegdehaugsveien 32
- Mortensrud — Lofsrudveien 6
- Stovner Senter 3
- Sæter — Ekebergveien 235

These are **review signals only**, not first-party-proven intake candidates in this pass. The broken/misbranded first-party locator surface must be resolved or independently cross-proven before any automatic onboarding decision.

## Scope guard

No restaurant manifest, parser, source contract, menu assertion, transport rule, runtime behavior, or production state is changed in this round.
