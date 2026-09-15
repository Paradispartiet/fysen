# Oslo canonical catalog classification — round 6 — Espresso House

Date: 2026-09-15.

This is the sixth bounded implementation of the existing `core / coverage / redundant` audit policy. It follows the Peppes Pizza, Bislett Kebab House, McDonald's, LETT and JOE & THE JUICE family passes.

Canonical baseline before this classification: **735 manifests** on `c5135f47598be762f30810545bede02c3c650a67`.

The baseline is closed:
- LETT repair catalog-health #171: **735/735 accepted**;
- production materialization #209: success with **0 blocking failures**;
- post-JOE-&-THE-JUICE merge CI #2519: success.

## Finding

The catalog contains **8 Espresso House manifests**, and all eight are distinct physical Oslo café identities:

| Canonical slug | Corrected/current identity | Classification |
| --- | --- | --- |
| `espresso-house-aker-brygge-oslo` | Stranden 1, 0250 Oslo | coverage |
| `espresso-house-bogstadveien-oslo` | **Espresso House Valkyriegata**, Valkyriegata 9, 0366 Oslo | coverage |
| `espresso-house-byporten-oslo` | Jernbanetorget 6, 0154 Oslo | coverage |
| `espresso-house-glasmagasinet-oslo` | **Stortorvet 9**, 0155 Oslo | coverage |
| `espresso-house-hovedhallen-oslo` | Jernbanetorget 1, 0154 Oslo | coverage |
| `espresso-house-linderud-senter-oslo` | Erich Mogensøns vei 38, 0594 Oslo | coverage |
| `espresso-house-pilestredet-oslo` | **Pilestredet 39D**, 0166 Oslo | coverage |
| `espresso-house-solli-plass-oslo` | **Henrik Ibsens gate 90D**, 0255 Oslo | coverage |

No pair shares a canonical physical identity. Byporten and Hovedhallen are both in the Oslo S/Jernbanetorget complex, but Espresso House publishes them as separate active shops at different canonical addresses.

## Physical-identity repair

The family pass found four stale/imprecise identity fields. They are repaired in this same bounded PR from current first-party store pages:

1. Stable slug `espresso-house-bogstadveien-oslo` keeps its canonical ID/slug, but the display name changes from **Espresso House Bogstadveien** to **Espresso House Valkyriegata**. The manifest already points physically to Valkyriegata 9; Espresso House's current store page uses the Valkyriegata identity.
   - https://no.espressohouse.com/find-us/valkyriegata
2. Glasmagasinet address is completed from `Stortorvet` to **Stortorvet 9**.
   - https://no.espressohouse.com/find-us/glasmagasinet
3. Pilestredet address is completed from `Pilestredet 39` to **Pilestredet 39D**.
   - https://no.espressohouse.com/find-us/pilestredet
4. Solli Plass address is completed from `Henrik Ibsens gate 90` to **Henrik Ibsens gate 90D**.
   - https://no.espressohouse.com/find-us/solli-plass

The established slug for the Valkyriegata identity is deliberately retained to avoid unnecessary canonical-ID churn. No menu source, quality floor or dish assertion changes.

## Shared-concept evidence

The eight manifests expose strongly overlapping Espresso House food/coffee families: toast/focaccia/bagels, bakery, coffee, iced drinks/boosters and bottled drinks. Current completeness floors range from **69 to 99 items**.

The family therefore must not be counted as eight independent dish-value gains. Its catalog value is primarily physical/service coverage.

## First-party-proven non-canonical gaps

The current Espresso House locator independently proves several active Oslo shops with no matching canonical manifest in the 735-manifest catalog, including:

- **Oslo S Flytogterminalen** — Jernbanetorget 1
- **Continental** — Olav Vs gate 2
- **Nordregate** — Nordre Gate 18
- **Parkveien** — Parkveien 27
- **Stovner Senter** — Stovner Senter 3

Sources:
- https://no.espressohouse.com/find-us/oslo-s-flytogterminalen
- https://no.espressohouse.com/find-us/continental
- https://no.espressohouse.com/find-us/nordregate
- https://no.espressohouse.com/find-us/parkveien
- https://no.espressohouse.com/find-us/stovner-senter

These are **review** candidates only. This is not asserted to be an exhaustive Oslo store census, and no location is auto-onboarded without separate marginal-value, source and demand proof.

## Classification result

- **core:** 0
- **coverage:** 8
- **redundant:** 0 removed
- **dedupe:** 0
- **identity repair:** 4 metadata corrections on existing stable canonical identities
- **review:** at least the five first-party-proven non-canonical locations above
- **reject:** 0

No parser, menu floor, required-dish assertion, transport rule or runtime behavior is changed by this round.
