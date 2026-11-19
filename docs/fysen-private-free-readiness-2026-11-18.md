# Fysen – privat lagring på gratisnivå: kontroll 18. november 2026

**Formål:** Ferdigstille arkivbasert offentlig lesing uten å forveksle dette med en autorisasjon til å bytte database for private funksjoner.

**Beslutningsstatus:** IKKE KLAR FOR PRODUKSJONSOVERGANG. Original og recovery beholdes uendret. Ingen miljøvariabler, GitHub-secrets, Supabase-prosjekter, abonnementer, backups eller brukerposter er endret ved denne vurderingen.

## Bekreftet direkte med read-only Supabase-spørringer (18.11.2026)

| Observasjon | Original: `fysen` | `fysen-recovery-free` |
|---|---:|---:|
| Prosjektreferanse | `voglczxxtbwcxjrbffbt` | `txaopscyxjvvmwawsphk` |
| `pg_database_size()`, avrundet | 1 590 MB | 60 MB |
| Applikasjonstabeller i `fysen` | 30 | 29 |
| Indekser i `fysen` | 89 | 87 |
| Utvidelser: `postgis`, `pg_trgm`, `pgcrypto` | 3/3 | 3/3 |
| `fysen.schema_migrations` | finnes | **mangler** |
| Påkrevde seks `dish_aliases` | 6/6 | 6/6 |
| Gyldig `menu_items_extraction_method_check`, med `pdf_text` | ja | ja |
| Menyposter | 1 709 517 | 42 000 |
| `search_events` | 1 327 | 0 |
| `search_result_impressions` | 7 261 | 0 |
| `aha_consumer_sessions`, `min_mat_items`, `restaurant_claims`, `restaurant_pro_sessions` | 0 i hver | 0 i hver |
| `anon` / `authenticated`: schema USAGE for `fysen` | nei / nei | nei / nei |
| `transaction_read_only` i innlogget administrativ SQL-sesjon | off | off |

**Tolkning:** En administrativ SQL-sesjon med `read_only=off` beviser ikke at appens faktiske tjenestekonto kan skrive. Recovery er innenfor prosjektets nominelle databasegrense, men opprinnelig prosjekt er langt over 500 MB. Organisasjonens Fair Use-sperre / HTTP 402 må vurderes separat og kan gjelde begge prosjektene.

**Sikkerhetsavgrensning:** Flere `fysen`-tabeller mangler RLS. Skjemaet er ikke gitt USAGE til `anon` eller `authenticated` i disse prosjektene, så dette er ikke bevis for åpent klienttilgang. Ikke åpne schema-grants eller eksponer private API-tabeller før en egen sikkerhetsgjennomgang og tabellspesifikke RLS-regler. Supabase-advarselen skal likevel behandles som åpen.

## Hva hindrer en direkte recovery-overtakelse?

1. **Manglende migrasjonsregister:** `packages/database/src/migrate.ts` oppretter `fysen.schema_migrations` ved vanlig kjøring og vil deretter forsøke hver registrerte migrasjon. En recovery-kopi med alle tabellene, men uten dette registeret, må **ikke** få `pnpm db:migrate` blindt mot seg. Lag først isolert skjema- og migrasjonsdiff og fastslå etterprøvbar migrasjonslinje.
2. **Historikk mangler:** Recovery har ikke originalens registrerte søk eller resultatvisninger. Disse må bevares i privat arkiv med dokumentert restaurering før noen pensjonering av originalen. Eksisterende Google Drive-arkiv omfatter menyhistorikk, ikke hele Supabase-instansen; verifiser hele historikkomfanget separat.
3. **Arkiv-ID-er er ikke DB-UUID-er:** `fysen.min_mat_items.menu_item_id` er en UUID knyttet til `fysen.menu_items`. Offentlige arkivtreff har dokumenterte restaurant-slugs og kilder, men ikke nødvendigvis tilsvarende UUID-er i kompakt recovery. Arkivtreff skal ikke utgis for å være kanoniske databaseobjekter. En separat identitets-/lagringskontrakt er nødvendig før «Lagre i Min mat» tilbys direkte fra arkivsøk.
4. **Kvote og skrivetilgang er ikke bevist:** Ikke bruk recovery som `DATABASE_URL` før faktisk app-tilkobling, gratisgrense, organisasjonsstatus og isolert skrivebevis er dokumentert uten destruktive inngrep.
5. **Private roller:** Supabase Auth, AHA-autorisasjon, restaurantkrav og Pro-sesjoner må forbli separate. Service-nøkler skal aldri ligge i offentlig klient, kildekode eller testlogger.

## Målrettet isolert skrivebevis i PR #1233

`.github/workflows/fysen-private-persistence-proof.yml` bruker **kun en disponibel PostgreSQL 17 + PostGIS-service på GitHub-runneren**. Den gjør ingen Supabase-tilkobling og har ingen Supabase secrets.

Stegene er: installer og bygg det eksisterende databaseprosjektet; opprett skjema og **migrasjonsregister** gjennom ordinære migrasjoner; kjør `verify:production`; kjør tre eksisterende integrasjonssuiter i sekvens:
- `aha-min-mat.integration.test.ts`
- `restaurant-claims.integration.test.ts`
- `fysen-pro.integration.test.ts`

Disse testene bruker TRUNCATE og skriver oppdiktede lokale testdata, derfor er det avgjørende at de **aldri** kjøres mot original eller recovery. En grønn isolert kjøring beviser kodefunksjonene med et rent og fullt migrert lokalt skjema, ikke at recovery-prosjektet er produksjonsklart.

## Videre port før overgang

- Isolert grønn privat funksjonstest, ordinær CI og arkivsøk/Mobile QA.
- Dokumentert migrasjonsdiff og reverserbar reetablering av historikk i *egen* isolert prøvekopi.
- Egen løsning for «Min mat»-arkividentitet og samkjøring av restaurant-/Pro-grants.
- Kontrollert appforbindelse og test av konkret nødvendig skriving når kvote og rettigheter er bekreftet, uten å overstyre beskyttelser eller endre gammel database.
- Separat eksplisitt beslutning før bytte av `DATABASE_URL`, deploy eller opprydding.

**Ikke tillatt automatisk:** betale/oppgradere, deaktivere Spend Cap, tvinge gjennom read-only, kjøre destruktive oppryddinger, «reparere» manglende migrasjonshistorikk ved å stemple inn usjekkede migrasjoner eller aktivere booking/betaling basert på offentlig arkiv.

Se [gratis driftsplan](fysen-zero-cost-operating-plan-2026-11-12.md), [storage-recovery](fysen-storage-readonly-recovery-2026-11-02.md), [deploy-invariant](deployment.md) og [arkivlesing](github-pages-functional-search.md).
