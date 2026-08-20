# Matlyst v3 regression contract

Denne kontrakten låser den flate Matlyst-modellen etter at forsiden og **Alle retter** ble samkjørt.

## Port

`@fysen/web` kjører `apps/web/tests/matlyst-v3-contract.test.mjs` som del av ordinær `pnpm test` og dermed full CI.

Testen laster de faktiske TypeScript-modulene gjennom en liten lokal transpiler. Det opprettes ingen parallell produksjonsmodell eller fixture-kopi.

## Det som er låst

Regresjonskontrakten krever at:

- katalogen inneholder 19 entydige aktive kjøkken;
- sentrale kjøkken som Japansk, Italiensk, Egyptisk og Levantinsk er direkte tilgjengelige;
- `Midtøsten` ikke kan gjeninnføres som et aggregert kjøkken;
- production-backed retter som `momo`, `pierogi`, `doro-wat` og `sisig` er tilgjengelige gjennom kjøkkenscope uten krav om full Food Knowledge-artikkel;
- `dishBrowseCuisineHref` roundtripper `cuisine` uten `world` eller `region`.

## Hvorfor dette er en egen kontrakt

Generell lint, typecheck, build og browser smoke kan være grønne selv om en senere endring gjeninnfører geografiske mellomnivåer, dupliserer et kjøkken eller lar **Alle retter** miste production-backed discovery-retter. Denne testen gjør slike produktbrudd til eksplisitte CI-feil.

Kontrakten endrer ikke restaurantproduksjon, parser, materialisering, production DB, Fysen Pro eller releasekadens.
