# Fysen: gratis drift og trygg gjenoppretting (beslutning 12. november 2026)

**Beslutning:** Brukeren velger **0 kr i nye abonnementskostnader**. Ikke oppgrader Supabase, ikke deaktiver Spend Cap, ikke kjøp ekstra databasekapasitet. Bevar historikken. Deaktiver heller ikke beskyttelsesmekanismer eller slett tabeller som en automatisk følge av denne beslutningen.

## Hva som faktisk virker – og hva som ikke er friskmeldt

| Område | Dokumentert status | Begrensning |
|---|---|---|
| Offentlig web | `https://fysen.vercel.app` ble distribuert og var tilgjengelig 12. november | Nettstedet er ikke i seg selv bevis for at den opprinnelige databasen kan motta skriver |
| Verifisert offentlig menyarkiv | `fysen-free-public-index`, ca. 973 restauranter og 47 265 menyposter etter oppdateringen 12. november | Historiske kilder med egne observasjonsdatoer, ikke sanntidsmenyer |
| Arkiv-API | `/v1/dishes/archive/status`, `/search`, `/browse` på `fysen-api.vercel.app` bestod offentlig produksjonskontroll 12. november, samt isolert Vercel-test i PR #1165 | Ikke bevis for full DB-søk, booking eller betaling |
| Mobilreise for gratis rettsøk | PR #1179 er merget etter grønn mobiltest og ordinær CI | Egen kontroll, ikke erstatning for streng live-DB/booking-gate |
| Supabase original | `voglczxxtbwcxjrbffbt`, observert Unhealthy og 91 % diskkapasitet 11. november | Read-only ble teknisk verifisert 2. november; live skrivekapasitet nå ikke dokumentert |
| Supabase recovery | `txaopscyxjvvmwawsphk`, observert Unhealthy og 17 % diskkapasitet 11. november | Samme organisasjon kan være blokkert av organisasjonens forbruk; ikke automatisk live-erstatning |
| Full produksjonsbevis | Feiler på eldre menykilder og enkelte inaktive restauranter | Skal forbli blokkert frem til faktiske kilde- og produksjonsdata er verifisert |

**Brukervennlig visning:** Ikke legg tekniske advarsler om «gamle eller ikke ferske menyer» på vanlige sider. Vis vanlig søk, restaurant, pris og «Se meny», der en kilde er dokumentert. Kildedato og status skal fortsatt være tilgjengelig på en hensiktsmessig informasjonsflate eller ved kilden, og aldri forfalskes. Ikke vis uverifisert booking eller påstå sanntid. Oppdaterings- og driftsdetaljer kan ligge under meny/om eller intern driftstatus.

## Gratis driftsmodell vi bruker nå

1. **Offentlig lesesøk:** Hent checksum-verifisert indeks fra isolert `fysen-free-public-index`. Bevar `sourceUrl`, `observedAt`, godkjente restaurantidentiteter og karantene. Alle svar fra arkiv-API har `source: verified-menu-archive` og `realtime: false`.
2. **Begrenset menykildeoppdatering:** Fortsett eksisterende GitHub Actions-jobb `Refresh Fysen Free menus (bounded, database-independent)` med gitt kildebudsjett. Ikke gjør nattlig full dump/import på Supabase. Ikke lov automatisk at alle 973 er oppdatert selv om indeksen ble regenerert.
3. **Liten offentlig indeks, ikke historisk database:** Det offentlige indekset holder bare et kvalitetssikret, deduplisert utvalg. Det inneholder ikke brukerhistorikk, søkelogger, private kilder eller alle tidligere menyversjoner.
4. **Historien bevares privat:** Historisk dump fra 2. november er lagret i fire private deler i Google Drive og re-verifisert med SHA-256, og seks historietabeller ble gjenopprettet i isolert PostgreSQL 17 (se dokumentert run #41510938739). Søkereferanser har også separat arkivbevis. GitHub Actions-artifakter alene er ikke langtidsbackup.
5. **Egen kvalitetssperre:** Tester skal kontrollere API, indekser, identitetskarantener, mobilreise og kildebevis. Streng produksjonskontroll for live-DB, bordbestilling/booking og priser beholdes separat, selv om gratis arkivsøk er grønt.

## Hvorfor vi ikke straks kan ta original Postgres tilbake på Free

- Dokumentert 2. november: originaldatabasen hadde ca. 1 582 MB databaseinnhold. `menu_items` utgjorde ca. 1 323 MB inkludert indekser. Det er over 500 MB Free databasegrense.
- Supabase har **to ulike problemer**: prosjektvis disk/read-only (95 %-diskfare) og organisasjonens Fair Use 402 basert på gjennomsnittlig databaseforbruk over fakturaperioden. Underliggende Free-diskgrense kan variere over tid; kontroller gjeldende Supabase-dokumentasjon. Lav diskbruk på recovery (17 %) opphever ikke automatisk organisasjonsbegrensningen.
- Å slette gamle rader alene garanterer ikke mindre databasefiler; WAL, indekser og nødvendig vedlikehold kan bruke ekstra disk. Supabase-dokumentasjon advarer om at når disk blir full og Postgres stanser, kan betalt plan bli nødvendig for å starte den opprinnelige instansen igjen. Gratis løsning kan derfor bestå i å **ikke** gjenstarte originalen for drift, men la offentlig arkivmodus fungere videre.
- `DELETE FROM menu_snapshots` ville kaskadeslette menyposter og deler av pris-/endringshistorikken. Det ville også fjerne eller nullstille relasjoner fra søkeresultater og overvåking. Historikken må derfor ikke beskjæres uten eksplisitt omfang og separat restoretst.

## Sikker vei til en kompakt database – ikke en autorisert sletting

**Trinn A – ingen produksjonsendring:** Inventer original DB med bare read-only spørringer hvis tilgjengelig. Bekreft organisasjonskvote og disk, regn ut datamengde per tabell, test at backup er nedlastbar, hashet og kan gjenopprettes. Bevar alle tabeller med datoer og referanser.

**Trinn B – isolert prøverestaurering:** Bruk det eksisterende `rehearse-fysen-three-day-prune.yml` *kun mot en midlertidig lokal Postgres-container*. Scriptet selekterer en hypotetisk tre-dagers beholdning fra den frosne 2. november-kopien. Dokumenter logiske resultatantall, fysiske bytes etter komprimering, fremmednøkler, søkeresultat-referanser og om appen fungerer med snapshottene. Dette er ikke et mandat for driftssletting.

**Trinn C – beslutningsport:** Velg først etter verifisert øvelse og eksplisitt samtykke enten (a) fortsatt arkivbasert offentlig gratisdrift mens originalen bevares, eller (b) en avgrenset, reverserbar driftsovergang med kompakt database innenfor Free-kvoten og org-kvoten. Hvis fysiske bytes, indekser, WAL eller ønsket vekst gjør 500 MB urealistisk, behold arkivmodellen.

**Trinn D – organisasjonens sperre:** Selv en virkelig mindre DB fjerner ikke nødvendigvis 402 før tilstrekkelig tid under kvoten eller ny fakturaperiode. Kontroller org-totalen, ikke bare prosjektets diskprosent. Ikke opprett flere freeprosjekter for å omgå en gjeldende organisasjonssperre.

## Release- og kvalitetsporter

| Kontroll | Krav |
|---|---|
| Offentlig arkiv-API | HTTP 200, gyldig JSON, korrekte antall, `source`/`realtime`, ekte kildelenker, karantener |
| Nettside og mobil | Søkeresultater med restaurant, rett og kilde; navigasjon fungerer uten horisontal overflow |
| Pris og tidsangivelser | Bare verdier fra de dokumenterte kildene; ikke omtale som nåtidspris uten ny verifikasjon |
| Full DB-produksjon | Read-write status, aktuell kildedata, samkjørt katalog, vellykket prøve på live-DB, separate booking/Revenue-tester |
| Kostnad | Ingen oppgradering eller aktivering av betalingsfunksjon uten separat godkjenning |

## Henvisninger

- [Hendelse, størrelser, backup og FK-analyse](fysen-storage-readonly-recovery-2026-11-02.md)
- [Supabase prosjektregister](supabase-project-inventory.md)
- [Fysen issue #1147: produksjonsblokker](https://github.com/Paradispartiet/fysen/issues/1147)
- [Free arkiv-API PR #1165](https://github.com/Paradispartiet/fysen/pull/1165)
- [Verifisert karantene PR #1178](https://github.com/Paradispartiet/fysen/pull/1178)
- [Mobil fallback-bevis PR #1179](https://github.com/Paradispartiet/fysen/pull/1179)
- [Supabase størrelse, disk og Fair Use](https://supabase.com/docs/guides/platform/database-size)

Dokumentstatus: Gratisdrift valgt. Destruktiv opprydding, databaseoverføring, restart av stoppet full-disk original eller abonnement er **ikke godkjent**.