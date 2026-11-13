# Fysen / ParadisDB – første sikre Cloudflare-kontroll

**Fase:** Verifisering av den allerede opprettede D1-databasen. **Ikke** migrering, API-deploy, eller skriveprøve.

## Identifisert database

- Navn: `paradisdb-fysen-public`
- D1 database-ID: `882a3393-71c3-43f9-9dec-efc2bbcab409`
- Cloudflare-kontoeier har vist **Workers Free**, ingen betalingsmetode, og den nye D1-databasen.
- Cloudflare Settings viser **jurisdiction: The European Union**, region: Eastern Europe, og read replication: Disabled.
- Cloudflare Overview viste **0 tabeller**, 0 spørringer, 0 leste og 0 skrevne rader, samt ~12,29 kB grunnlagring ved opprettelse.

Opplysningene om Free og plassering stammer fra manuell dashboard-kontroll. GitHub har **ikke** kontakt med Cloudflare-kontoen, og ID i en konfigurasjonsmal er ingen aktiv Worker-binding.

## Trinn 1 – ufarlig, skrivebeskyttet kontroll fra iPad/nettleser

1. Åpne den identifiserte databasen i Cloudflare-dashboardet og velg **Console**.
2. Kjør **kun** denne SQL-spørringen:

```sql
SELECT COUNT(*) AS user_tables
FROM sqlite_master
WHERE type = 'table' AND name NOT LIKE 'sqlite_%';
```

3. **Forventet resultat: `user_tables = 0`.** Hvis resultatet er noe annet enn 0, stopp og undersøk. Ikke importer noe i en database som allerede har tabeller.
4. Gå tilbake til **Overview** og velg **Last 24 hours**. Noter *Total queries*, *Rows read*, *Rows written* og *Storage used*. SQL-console-spørringen kan registreres med null skannede rader selv om antall spørringer øker. Målingene kan være forsinket.
5. Dokumenter tall og tidspunkt, men del aldri API-token, passord, betaling eller andre hemmeligheter.

Det er **ikke** nødvendig å opprette en prøve-tabell. Det er viktig at den varige Fysen-databasen forblir tom til vi har en kontrollert importplan.

## Trinn 2 – hva denne prøven **ikke** beviser

En enkel metadata-spørring tester tilgang til virkelig D1, men sier **ikke** hvor mange rader et Fysen-søk leser eller hvor mye FTS5-indeksbygging skriver. Den kan ikke alene oppfylle kravene i `FREE_PLAN_RELEASE_GATE.md` eller slå på `PARADISDB_PUBLIC_ENABLED`.

For faktisk prøving av skrive- og søkekostnad anbefales etter egen godkjenning en **separat, midlertidig D1-preview** på samme Free-konto, f.eks. `paradisdb-fysen-preview`. Den varige databasen skal ikke brukes til eksperimenter med delvise importer. Previewen må ha eget database-ID/binding, ingen private data, strengt begrensede søk og ingen automatisk deploy.

Før vi vurderer den ferdige offentlige importen må vi måle *rows_read* og *rows_written* (også FTS5-rebuild), sørge for plass til andre databasers forbruk og kjøre `free_budget_gate.py` med faktisk fjerntelemetri og dokumentert opprinnelse. Cloudflares rate limiter er per lokasjon og garanterer ikke global daglig kvote.

## Sikkerhetssperrer

- **Ikke** kjør SQL `CREATE`, `INSERT`, `DROP`, `DELETE`, `UPDATE` eller `ALTER` på `paradisdb-fysen-public` under denne første kontrollen.
- **Ikke** kjør `wrangler deploy` eller `wrangler d1 execute --remote --file` på den varige databasen.
- Ikke aktivér Workers Paid, R2, privat API, Supabase-auth-migrering eller Fysen-ruting.
- Behold `PARADISDB_PUBLIC_ENABLED=false`, `workers_dev=false` og PR #1204 som draft.
- Cloudflares Free-plan kan avvise D1-spørringer når daglige kvoter er oppbrukt; dette er ikke en garanti for ubegrenset tjeneste.

Kilder: [D1 metrics](https://developers.cloudflare.com/d1/observability/metrics-analytics/), [D1 Free limits](https://developers.cloudflare.com/d1/platform/limits/), [D1 Free tier enforcement](https://developers.cloudflare.com/changelog/post/2026-09-01-d1-free-tier-limit-enforcement/).
