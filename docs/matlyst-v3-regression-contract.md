# Matlyst v3 regression contract

Denne kontrakten låser den permanente Matlyst v3-modellen etter at forsiden og **Alle retter** ble samkjørt.

## Port

`@fysen/web` kjører `apps/web/tests/matlyst-v3-contract.test.mjs` som del av ordinær `pnpm test` og dermed full CI.

Testen laster de faktiske TypeScript-modulene for Matlyst gjennom en liten lokal transpiler basert på repoets eksisterende TypeScript-avhengighet. Det opprettes ingen parallell produksjonsmodell eller fixture-kopi av taksonomien.

## Det som er låst

Regresjonskontrakten krever at:

- `Asia → Øst-Asia → Japansk` er aktiv.
- `Europa → Sør-Europa → Italiensk` er aktiv.
- `Afrika → Nord-Afrika → Egyptisk` er aktiv.
- `Asia → Vest-Asia → Levantinsk` er aktiv.
- `Europa → Iberia → Spansk / Portugisisk` finnes i den definerte taksonomien, men forblir inaktivt til source-gaten er oppfylt.
- hvert aktivt kjøkken forekommer nøyaktig én gang i verdensdel/region-treet.
- alle aktive `cuisines` finnes i treet.
- `Midtøsten` ikke kan gjeninnføres som både region og kjøkken.
- production-backed discovery-retter som `momo`, `pierogi`, `doro-wat` og `sisig` er tilgjengelige gjennom kjøkkenscope selv uten full Food Knowledge-artikkel.
- `dishBrowseTaxonomyHref` roundtripper `world`, `region` og `cuisine` korrekt.
- ugyldige eller inaktive deep-link-kombinasjoner nedgraderes trygt og kan ikke aktivere et kjøkken i feil region.

## Hvorfor dette er en egen kontrakt

Generell lint, typecheck, build og browser smoke kan være grønne selv om en senere endring flytter et kjøkken til feil region, reaktiverer den gamle `Midtøsten`-presentasjonen eller lar **Alle retter** miste production-backed discovery-retter.

Denne testen gjør slike produkt- og taksonomibrudd til eksplisitte CI-feil.

## Datagrense

Kontrakten endrer ikke restaurantproduksjon, parser, materialisering, production DB, Fysen Pro eller releasekadens. Production release forblir batchstyrt maksimalt to ganger daglig.
