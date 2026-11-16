# Fysen – målt, manuell import av 500 offentlige menyposter i Cloudflare Preview

**Status 16. november 2026: kun forberedelse, IKKE gjennomført på Cloudflare D1.** Dette er en valgfri manuell test på en bevisst isolert testdatabase. Den permanente Fysen-databasen og Supabase skal ikke røres.

## Eksakte mål

| Bruk | Cloudflare D1-navn | Database-ID |
|---|---|---|
| **Test (ENESTE tillatte importmål)** | `paradisdb-fysen-preview` | `8b6616b4-11df-4ddc-9817-378f51ee0b69` |
| **Produksjon (SKAL IKKE IMPORTERES)** | `paradisdb-fysen-public` | `882a3393-71c3-43f9-9dec-efc2bbcab409` |

Siste bekreftede kontobaseline (D1 Daily, **16. november kl. 10.38 CET**): **2** databaser, **15** leste rader, **0** skrevne rader, **45,06 kB** total lagring. Dette er en historisk måling, ikke en garanti for restkvoten på et senere tidspunkt.

Ved **16. november kl. 09.50 CET** ble følgende kontroll i **preview** utført:
```sql
SELECT name, type FROM sqlite_master
WHERE name IN ('fysen_sample_items', 'fysen_sample_meta', 'fysen_sample_trigrams')
ORDER BY name;
```
Cloudflare returnerte **ingen rader**. 500-raders-tabellene fantes ikke på tidspunktet for kontrollen.

## Verifisert kildemateriale

Godkjent offline-artifact fra [ParadisDB GitHub Actions-kjøring #43842440677](https://github.com/Paradispartiet/fysen/actions/runs/43842440677):
- Fil: `paradisdb-500-preview.sql` (**118 405 bytes**).
- SHA-256: `cb65cc6e9109a80fff0db9efb9b9d6e3b1a60050ae160e19a2b39a6748633832`.
- **500** SHA-verifiserte offentlige menyposter fra **368** restauranter; kildearkivet hadde **47 339** offentlige menyposter på eksporttidspunktet.
- Filen inneholder bare de separate `fysen_sample_items`, `fysen_sample_meta` og `fysen_sample_trigrams`-tabellene. Ingen private dokumenttabeller eller `public_ready`.
- Artifact-navn: **`fysen-500-preview-offline-only`**. GitHub Actions-artifact utløper etter **7 dager**, og må genereres på nytt for senere testing.

## Foreslått manuell framgangsmåte (iPad/Cloudflare Console)

Dette er **ikke** en anbefaling om å lime inn hele SQL-filen i ett felt. Gjør heller operasjonene trinnvis, med stoppkriterier.

1. Bekreft preview-navnet og den **eksakte** preview-ID-en i nettadressen før hver skriveoperasjon.
2. Ta fersk konto-baseline på **D1 Database → Daily**, og fersk per-database-baseline på **preview → Overview**.
3. Bekreft at de tre `fysen_sample_*`-tabellene fortsatt mangler. Kontroller at `fysen_probe_items` inneholder de fire tidligere syntetiske retter. Stopp ved avvik.
4. Opprett **bare** `fysen_sample_items` og `fysen_sample_meta` i preview, deretter legg inn kilde- og utvalgskontrollsummer i sample-meta.
5. Kjør **kun den første** SQL INSERT-batchen av 50 ekte menyposter. Bekreft `SELECT COUNT(*) FROM fysen_sample_items` = **50**.
6. **MÅLESTOPP:** registrer fersk per-database og kontototal for leste/skrevne rader og lagring. Hvis en feil oppstår eller kostnadsforbruk virker uventet: **stopp**, ikke gjenta tidligere batch.
7. Etter eksplisitt kontroll av målingen: importer de resterende ni batchene av 50 (maks **500** totalt), og bekreft **500 poster fra 368 restauranter**.
8. **NY MÅLESTOPP:** dokumenter antall skrevne/leste rader og lagring **før** FTS5; bygg først så `fysen_sample_trigrams` og kjør rebuild **én gang**. FTS5 har separate skyggetabeller og kan påvirke skrivekvoten mer enn den logiske radmengden.
9. Bekreft eksempelvis lokal-testet `LIKE '%pizza%'`-søk = **12** treff i dette eksakte prøveutvalget. Merk `sample_ready='true'` først etter riktig resultat.
10. Ta siste Cloudflare-målinger. Skill lagring/import/FTS5-skriving og søkelesing fra andre kontooperasjoner. Bruk faktiske observasjoner i `free_budget_gate.py` før man vurderer en representativ større fjernprøve.

**Viktig:** Ved manuelle Console-kommandoer finnes det ingen pålitelig, automatisk mekanisme i denne oppskriften som kan garantere at en bruker velger riktig database. Kontroller URL + navnet selv. En Fysen-spesifikk Wrangler-kommando kan ha strengere ID-kontroll ved senere automatisering, men er ikke aktivert her.

**IKKE** kjør `CREATE`/`INSERT` fra dette dokumentet på `paradisdb-fysen-public`. Hvis en skrivemelding feiler, ikke forsøk å starte hele importen på nytt; avklar faktisk tabelltilstand først. Ikke aktiver Worker, fjern Supabase, oppgrader Free-plan eller merk PR #1204 som publiseringsklar.

## Betingelser for produksjonslansering

En 500-raders test på Free viser en faktisk *prøve*, men garanterer ikke at full import og typisk trafikk passer i Free-grensene. Før nettlansering kreves fremdeles målt representativt søkeforbruk/Worker-trafikk, sikkerhetskontroller, fullskala-budsjett, gjenoppretting og eksplisitt godkjenning.

Cloudflare dokumenterer filimport med `wrangler d1 execute --remote --file`, men dokumenterer ikke at manuelle flerstegskommandoer i Console er en atomisk, gjenopprettbar fullimport. Derfor skal **måling og stopp** brukes under testingen fremfor å anta automatisk tilbakeføring.

Kilder: [Import/export D1](https://developers.cloudflare.com/d1/best-practices/import-export-data/), [D1 CLI](https://developers.cloudflare.com/d1/wrangler-commands/), [D1 analytics](https://developers.cloudflare.com/d1/observability/metrics-analytics/).
