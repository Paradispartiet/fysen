# Oslo canonical catalog classification — round 11 — Pizza Pancetta

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `96658471b1388cf532e7ffe02fd2f6844b79aad3`.

This is the eleventh bounded family pass from the Oslo quality audit.

## Canonical Oslo family

The catalog contains six Pizza Pancetta identities:

- `pizza-pancetta-adamstuen-oslo` — Brageveien 2A
- `pizza-pancetta-bjolsen-oslo` — Bentsebrugata 31B
- `pizza-pancetta-briskeby-oslo` — Briskebyveien 54
- `pizza-pancetta-grefsen-oslo` — Grefsenveien 6A
- `pizza-pancetta-majorstuen-oslo` — Kirkeveien 69
- `pizza-pancetta-ulleval-hageby-oslo` — Vestgrensa 4

Fresh 2026 operating evidence supports all six as active physical restaurant identities:
- Wolt's Pizza Pancetta Oslo brand surface currently exposes Briskeby, Majorstuen, Ullevål Hageby and Bjølsen;
- Grefsen has current Foodora/Wolt service and registered business activity at Grefsenveien 6;
- Adamstuen has a current first-party site and current delivery activity at Brageveien 2A.

Sources:
- https://wolt.com/en/nor/oslo/brand/pizza-pancetta
- https://www.foodora.no/en/restaurant/z5cl/pizza-pancetta-grefsen
- https://pancettadamstuen.com/
- https://www.foodora.no/en/restaurant/n7nl/pizza-pancetta-adamstuen

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `pizza-pancetta-adamstuen-oslo` | coverage | keep |
| `pizza-pancetta-bjolsen-oslo` | coverage | keep |
| `pizza-pancetta-briskeby-oslo` | coverage | keep |
| `pizza-pancetta-grefsen-oslo` | coverage | keep |
| `pizza-pancetta-majorstuen-oslo` | coverage | keep |
| `pizza-pancetta-ulleval-hageby-oslo` | coverage | keep |

The six locations provide physical/proximity coverage. Repeated Pizza Pancetta menu concepts are not counted as six independent dish-value gains.

## Vålerenga review signal

Current delivery evidence identifies **Pizza Pancetta Vålerenga** at Østerdalsgata 2A, 0658 Oslo.

Source:
- https://wolt.com/nb/nor/oslo/restaurant/pizza-pancetta-vlerenga

Oslo municipality also records a 2025 serveringsbevilling denial for Pizza Pancetta Vålerenga due to missing documentation. That does not by itself prove the current takeaway operation invalid, but it is a reason to keep this identity fail-closed as a **review-only signal** rather than automatic intake.

Source:
- https://www.oslo.kommune.no/skatt-og-naring/salg-servering-og-skjenking/kontroll-av-salg-servering-og-skjenking/tilsynsresultater/avslag-pa-soknad-om-bevilling-2023-2/

Any later onboarding must separately prove current legal/operational identity, priced menu output and marginal geographic/demand value.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
