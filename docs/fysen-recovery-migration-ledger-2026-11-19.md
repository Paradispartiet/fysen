# Fysen – recovery og migrasjonshistorikk (19. november 2026)

**Status: Sperret for direkte migrering, ikke reparert.** Denne kontrollen er kun read-only. Ikke bruk `packages/database migrate` mot Supabase recovery før en egen, isolert skjema- og historikkrevisjon er godkjent.

## Verifisert mot begge Fysen-prosjekter med read-only SQL

| Punkt | Opprinnelig `fysen` | `fysen-recovery-free` |
|---|---|---|
| Prosjektref | `voglczxxtbwcxjrbffbt` | `txaopscyxjvvmwawsphk` |
| Migrasjonstabell `fysen.schema_migrations` | Finnes | **Mangler** |
| Registrerte migrasjoner | 0001–0022 (22 stk.) | Kan ikke fastslås |
| Migrasjonsfiler i repoet | 0001–0023 (23 stk.) | 0001–0023 (23 stk.) |
| Fysen-tabeller | 30 | 29 |
| Fysen-indekser | 89 | 87 |
| Utvidelser `postgis`, `pgcrypto`, `pg_trgm` | Alle | Alle |
| Rettsaliaser / prisbegrensning | Verifisert | Verifisert |
| Menyposter | 1 709 517 | 42 000 |
| Søkehendelser | 1 327 | 0 |
| Visninger av søkeresultat | 7 261 | 0 |

### Viktige indeksavvik

*Originalens indekser som ikke finnes i recovery:*
- `menu_changes_current_snapshot_id_idx`
- `menu_changes_previous_snapshot_id_idx`
- `menu_watch_runs_snapshot_id_idx`
- `schema_migrations_pkey` (fordi selve ledgeren mangler)

*Recoverys indekser som ikke finnes i originalen:*
- `menu_changes_added_date_idx`
- `menu_changes_added_source_key_idx`

De to siste blir opprettet av `0023_recent_menu_additions.sql` i repoet. Originalen har dokumentert migrasjonshistorikk til og med `0022`, mens recovery mangler hele registeret. Indeksene viser dermed allerede **ulikt schema**, og det er uforsvarlig å kopiere originalens 22 registreringer til recovery, eller markere alle 23 som gjennomført uten nærmere kontroll.

## Beskyttelse i koden

`packages/database/src/migrate.ts` blokkerer nå migrering **før enhver CREATE/INSERT** når den møter eksisterende Fysen-tabeller uten `fysen.schema_migrations`. Feilmeldingen er `FYSEN_UNVERIFIED_MIGRATION_HISTORY`. En helt ny, tom database skal fortsatt kunne migreres normalt.

Dette endrer ikke eksisterende data, og er ikke en automatisk reparasjon.

## Forsvarlig gjenopprettingssekvens

1. Lag en separat, **disponibel** prøvekopi av recovery-struktur og nødvendige testdata. Ikke kjør TRUNCATE, `migrate` eller andre integrasjonstester på noen av de to faktiske Supabase-prosjektene.
2. Sammenlign eksakt tabellstruktur, typer, NOT NULL/DEFAULT, fremmednøkler, CHECK-begrensninger, indekser, triggers og extensions med en ny, korrekt migrert database bygd fra `0001`–`0023`.
3. Dokumenter hvilken migrasjon som faktisk tilsvarer hver restituert komponent. `0023` kan ikke bestemmes utelukkende fra to indeksnavn. Behandle gamle og nye indekser som separate avvik, ikke som automatisk uønsket overflødig data.
4. Vurder en særskilt, eksplisitt godkjent reconciler som først sjekker eksakt schema-fingerprint, deretter trygt oppretter migrasjonsregister i en prøvekopi. Kjør `verify:production` og nødvendige AHA/Pro/claims-integrasjonstester isolert etterpå.
5. Dokumenter historikken fra den opprinnelige databasen i privat backup og test gjenopprettingen; recovery skal ikke erstatte eller slette originalarkivet.
6. Først etter akseptert prøve, sikkerhetsgjennomgang av privat schema og faktiske gratis-/Fair Use-/skrivetester kan en egen produksjons-PR foreslå endring av tilkobling.

**Hard sperre:** Ingen migrasjonshistorikk er satt inn i live recovery, ingen produksjonsnøkkel er byttet, ingen databasetabeller er slettet og ingen betaling er aktivert.

## «Min mat» og arkivretter

Offentlige arkivretter har ikke kanoniske `menuItemId`-UUID-er. Den nye AHA-begrensede koblingen verifiserer restaurant-slug, eksakt menykilde-URL, observasjonsdato, normalisert rett, pris og prisform først mot den sjekksumsikrede indeksen og deretter mot nøyaktig én aktiv kanonisk menyoppføring i PostgreSQL. Bare da brukes eksisterende Min mat-skriving og personvernlogg. Manglende/tvetydig match returnerer feil uten å lagre eller finne på ID-er.

Dette er **begrenset kompatibilitetsstøtte**, ikke lagring av alle historiske arkivretter. For full arkiv-only «Min mat» kreves egen dokumentert identitets- og lagringskontrakt, uavhengig av menyhistorikkens UUID-er.

Se også [Fysen gratisdrift](fysen-zero-cost-operating-plan-2026-11-12.md), [sikkerhetsgrenser](fysen-private-free-readiness-2026-11-18.md) og [arkivbasert søk](github-pages-functional-search.md).
