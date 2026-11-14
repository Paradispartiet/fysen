# Fysen – kontrollert, verifisert 500-raders prøve før eventuell fjernimport

**Status:** Kun eksportkode, tester og lokal CI. **Ingen ekstern import, API-aktivering eller betaling.**

## Hvorfor gjør vi dette?

Den virkelige Cloudflare Free-testen med fire syntetiske retter var vellykket: 6 SQL-spørringer, 12 leste og 9 skrevne rader, 32,77 kB lagring etter testen. D1-kontoen hadde da to databaser og samlet 45,06 kB lagring. Dette beviser kun en svært liten prøve, ikke kostnaden ved en full import av ~47 270 offentlige menyposter.

Den eksisterende `paradisdb-fysen-public` forblir tom. `paradisdb-fysen-preview` inneholder allerede `fysen_probe_items` og `fysen_probe_trigrams`, så vi må **ikke** kjøre full eksport beregnet på en tom database der.

## Hva er implementert?

`export_sample_d1.py` gjør en *rent lokal* operasjon:

1. Kontrollerer hele manifestet og komprimert arkiv med Fysens SHA-256 og ekskluderer kilder med identitetskarantene via `verified_fysen_rows`.
2. Velger inntil **500 offentlige poster** deterministisk ved hashing på original rad-ID og restaurant-slug. Det er et spredt testutvalg, ikke en statistisk garanti for alle menytyper.
3. Skriver kun `fysen_sample_items`, `fysen_sample_meta` og `fysen_sample_trigrams` med FTS5-trigram. Ingen `documents`, private data eller `public_ready`.
4. Skriver **aldri over** en eksisterende SQL-fil, bruker maks **1 MB** SQL og maks **64 kB per INSERT-setning**. SQL-en krever at preview-tabellen `fysen_probe_items` finnes, som en ekstra beskyttelse mot feilmålretting.
5. Skriver en lokal JSON-kvittering med antall utvalgte rader, antall restauranter, kildehash og utvalgshash.

## Kun lokalt/CI: Generer 500-raders prøve

Fra repo-roten med en sjekket ut `fysen-free-public-index` i `verified-index/`:

```bash
python3 tools/paradisdb/worker/export_sample_d1.py \
  verified-index/manifest.json \
  verified-index/index.json.gz \
  /tmp/paradisdb-fysen-500-preview.sql --rows 500
```

GitHub Actions jobben `ParadisDB local-only SQLite pilot` kjører denne eksporten mot de verifiserte offentlige filene og importerer resultatet **kun til isolert lokal SQLite**. Den kontrollerer 500 rader og FTS5-søkeparitet. Den publiserer ikke SQL-filen som en tilgjengelig Cloudflare-kommando eller bruker hemmelige tokens.

## Før ekstern kjøring må følgende bekreftes

- **STOPP** dersom kontoen ikke lenger har Workers Free, kapasitet eller uventet annet D1-forbruk.
- Kontroller previewens eksakte database-ID og at den er **forskjellig** fra den permanente `882a3393-71c3-43f9-9dec-efc2bbcab409`.
- Ta fersk baseline av **kontoens daglige** D1-rader lest/skrevet og **previewens** lagring.
- Bekreft SQL-filens SHA-256, maksimumsgrenser, kildekvittering og at alle tre `fysen_sample_*`-tabeller mangler i previewen.
- Lag en eksplisitt import-/måleprosedyre som kan stoppe mellom trinnene, og test at søk bare bruker den **nye** FTS5-indeksen. For hver spørring trengs faktisk `rows_read` og `rows_written` fra D1-metadata/Cloudflare Analytics.
- **Ingen automatisk remote-import** bare fordi de lokale CI-testene er grønne. Importen krever separat godkjenning, full måling og tilbakeføringsplan.
- Ved feil i testimporten: *ikke* kjør hele SQL-filen på nytt. Behold tilstanden for diagnose; den ferdige, offentlige databasen er uberørt.
- Ikke fjern Supabase, endre Fysen-ruting, slå på `PARADISDB_PUBLIC_ENABLED` eller oppgrader til Workers Paid.

**Daglige Free-kvoter nullstilles ved midnatt UTC**, ikke nødvendigvis på norsk midnatt. En 24-timersgraf er derfor ikke samme periode som kontoens daglige forbruksoversikt.

Offisielle kilder: [D1 Free-grenser](https://developers.cloudflare.com/d1/platform/limits/), [D1-målinger](https://developers.cloudflare.com/d1/worker-api/return-object/), [D1 Free-grensehåndheving](https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/).
