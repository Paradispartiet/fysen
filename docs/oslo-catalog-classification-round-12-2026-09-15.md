# Oslo canonical catalog classification — round 12 — Sumo

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `45bfc7ae91d563c6fbed158857703262834d7f98`.

This is the twelfth bounded family pass from the Oslo quality audit.

## Current first-party Oslo footprint

Sumo's current Oslo restaurant list contains:

- Karl Johan
- Storo
- Hegdehaugsveien
- The Speakeasy
- Solli Plass
- Bjørvika

Source: https://sumorestaurant.no/en/restaurants?city=oslo

The canonical Sumo Restaurant family contains five physical restaurant identities:

- `sumo-karl-johan-oslo`
- `sumo-storo-oslo`
- `sumo-hegdehaugsveien-oslo`
- `sumo-solli-plass-oslo`
- `sumo-bjorvika-oslo`

All five remain active on Sumo's current first-party surface.

## The Speakeasy is not a sixth physical restaurant

Sumo lists The Speakeasy in the restaurant selector, but its own detail page explicitly states that it is located **inside Sumo Karl Johans Gate**. The Karl Johan restaurant page likewise describes a hidden speakeasy room as one of that restaurant's private spaces.

The Speakeasy shares Karl Johan's phone number (`+47 400 01 899`) and is presented as a private dining room with a dedicated menu, waiter and minimum-spend arrangement.

Sources:
- https://sumorestaurant.no/en/restaurants/the-speakeay
- https://sumorestaurant.no/en/restaurants/karl-johan
- https://sumorestaurant.no/en/campaigns/sumo-speakeasy

It is therefore classified as an **embedded experience / non-separate physical identity**, not a missing canonical restaurant. No new manifest is created.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `sumo-karl-johan-oslo` | coverage | keep |
| `sumo-storo-oslo` | coverage | keep |
| `sumo-hegdehaugsveien-oslo` | coverage | keep |
| `sumo-solli-plass-oslo` | coverage | keep |
| `sumo-bjorvika-oslo` | coverage | keep |

The five restaurants provide physical/proximity coverage. Their shared Sumo menu contract is not counted as five independent dish-value gains.

## Lille Sumo scope boundary

The catalog also contains `lille-sumo-oslo` at Olav Vs gate 4. It is a separately named canonical restaurant identity with its own source and menu contract, and is not represented by Sumo Restaurants' current Oslo location family. It is intentionally outside this family-classification pass.

## Scope guard

No restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, runtime behavior, or production state is changed in this round.
