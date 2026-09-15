# Oslo canonical catalog classification — round 16 — Sabi Sushi

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `2afdc3549fc55c207ed190ba2fa083ede2a27294`.

This is the sixteenth bounded family pass from the Oslo quality audit.

## Current first-party Oslo footprint

Sabi Sushi's current first-party ordering surface lists these physical Oslo locations:

- Sabi Frogner — Bygdøy allé 63B, 0265 Oslo
- Sabi Grünerløkka — Korsgata 25A, 0551 Oslo
- Sabi Holtet — Kongsveien 91, 1177 Oslo
- Sabi Manglerud — Plogveien 6, 0679 Oslo
- Sabi Skøyen — Harbitzalléen 19, 0275 Oslo
- Sabi Storo — Nycoveien 2, 0483 Oslo
- Sabi Vika — Ruseløkkveien 3, 0251 Oslo
- Sabi Vinderen — Holmenveien 1, 0374 Oslo

Source: https://nettbutikk.sabi.no/places

The canonical catalog currently contains four Sabi Sushi identities:

- `sabi-sushi-manglerud-oslo`
- `sabi-sushi-skoyen-oslo`
- `sabi-sushi-storo-oslo`
- `sabi-sushi-vika-oslo`

All four canonical physical identities match the current first-party locations.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `sabi-sushi-manglerud-oslo` | coverage | keep |
| `sabi-sushi-skoyen-oslo` | coverage | keep |
| `sabi-sushi-storo-oslo` | coverage | keep |
| `sabi-sushi-vika-oslo` | coverage | keep |

The four restaurants provide physical/proximity coverage. Their shared Sabi Sushi concept is not counted as four independent dish-value gains.

## Non-canonical Oslo review gaps

Four active first-party Oslo locations have no canonical Sabi Sushi manifest:

- Frogner — Bygdøy allé 63B
- Grünerløkka — Korsgata 25A
- Holtet — Kongsveien 91
- Vinderen — Holmenveien 1

These are **review-only gaps**. This round does not auto-intake them. Any later onboarding must separately prove current priced menu output, marginal geographic/demand value, and normal source/production contracts.

## Exclusions

- `Sabi Fornebu - Oslo` is physically at Snarøyveien 55, 1364 Fornebu and is outside Oslo municipality; it is not an Oslo canonical gap.
- Sabi Omakase Oslo is a separately named/concepted restaurant and is not folded into the ordinary Sabi Sushi location family in this classification pass.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
