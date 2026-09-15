# Oslo canonical catalog classification — round 20 — Jagger

Date: 2026-09-15.

Baseline: **734 canonical manifests** on `7ddba1bf3037d35190df4d4b32544ad4a3b34999`.

This is the twentieth bounded family pass from the Oslo quality audit and includes one stale-identity removal.

## Current Oslo footprint

Jagger's current Oslo first-party pages identify two active locations:

- Frogner — Skovveien 4, 0257 Oslo
- Grünerløkka — Thorvald Meyers gate 36A, 0555 Oslo

Sources:
- https://jaggercph.no/jagger-frogner/
- https://jaggercph.no/jagger-grunerlokka/

Jagger's own company history explicitly states that its first Oslo restaurant in **Storgata no longer exists** and that the two current strong Oslo locations are Grünerløkka and Frogner.

Source:
- https://careers.buzzcph.com/en/pages/the-story-of-jagger

## Canonical family before this round

The catalog contains three Jagger identities:

- `jagger-frogner-oslo`
- `jagger-grunerlokka-oslo`
- `jagger-storgata-oslo`

Frogner and Grünerløkka match the current first-party physical identities.

`jagger-storgata-oslo` at Storgata 31 is stale and is removed in this round.

Expected canonical catalog after merge: **733 manifests**.

## Classification

| Canonical slug | Classification | Decision |
| --- | --- | --- |
| `jagger-frogner-oslo` | coverage | keep |
| `jagger-grunerlokka-oslo` | coverage | keep |
| `jagger-storgata-oslo` | reject | remove stale/closed physical identity |

The retained locations provide physical/proximity coverage. Their shared Jagger menu concept is not counted as two independent dish-value gains.

## Production behavior

The existing catalog coverage reconciliation remains responsible for quiescing the removed `jagger-storgata-oslo` production restaurant and disabling any associated enabled sources after merge. No direct production mutation is performed in this PR.

## Scope guard

No retained restaurant manifest, parser, extractor, source URL, menu floor, required dish assertion, transport rule, or runtime behavior is changed in this round.
