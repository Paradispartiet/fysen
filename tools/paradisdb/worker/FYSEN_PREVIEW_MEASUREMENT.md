# ParadisDB for Fysen – isolert Cloudflare Free-måleprøve

**Status: ekstern skrive-/lesetest, FTS5 trigram-søk og første faktiske D1-forbruksmåling BESTÅTT (4 syntetiske retter, 2 riktige ramen-treff). Representative fullskalamålinger av Fysens menyarkiv og Worker-trafikk GJENSTÅR.** De neste handlingene må gjøres manuelt av Cloudflare-kontoeieren. GitHub-PR-en inneholder ingen Cloudflare-token og starter ingen D1-operasjoner mot kontoens database.

## Hvorfor to databaser?

- **Permanent, ikke endre:** `paradisdb-fysen-public` (`882a3393-71c3-43f9-9dec-efc2bbcab409`). Bekreftet tom for egendefinerte tabeller. 13. nov. 2026 kl. 23.37 CET: siste 24 timer **2 queries**, **3 rows read**, **0 rows written**, **12,29 kB lagring**.
- **Ny og midlertidig:** `paradisdb-fysen-preview` er manuelt **opprettet** på den samme Workers Free-kontoen, med **EU-jurisdiksjon**, region Eastern Europe og read replication Disabled. Previewens database-ID er ikke verifisert i GitHub. **Ikke** gjenbruk den permanente database-ID-en som testdatabase.

En tom D1 kan inneholde `_cf_KV`, som er Cloudflares reserverte interne systemtabell. Den må ikke slettes.

## 1. Før måling: sjekk Free-konto og skriv ned baseline

I Cloudflare Dashboard → **D1 SQL Database**, kontroller at Workers fortsatt er **Free**, at ikke-betalende plan er aktiv, og at det er rom for database nr. 2 (Free: 10 databaser, 500 MB per database, 5 GB samlet). Ikke trykk Upgrade eller registrer betaling. Opprett **kun** `paradisdb-fysen-preview`, med jurisdiksjon **The European Union**, og la read replication være Disabled.

På previewens **Overview → Last 24 hours**: noter tidspunkt, Total queries, Rows read, Rows written, Storage used. Ta også et baseline-bilde av **kontoens totale D1-forbruk** i D1-oversikten/Billing → Billable Usage. Merk at rullerende 24-timers grafer og daglige Free-kvoter ikke er identiske.

### Registrert startmåling – 13. november 2026 kl. 23.51 CET

Eierens Cloudflare Overview → Last 24 hours for **`paradisdb-fysen-preview`** viser **0 SQL-spørringer**, **0 leste rader**, **0 skrevne rader**, **0 brukertabeller** og **12,29 kB grunnlagring**. Settings bekrefter The European Union / Eastern Europe og read replication Disabled. Dette er en **førmåling**, ikke en vellykket fjern-FTS5-skriveprøve. Kontototalene etter opprettelsen er ikke dokumentert i samme skjermbilde.

## 2. Bekreft at preview ikke har brukerdata

Kjør på **previewens** Console (bekreft databasens navn i toppen før hver spørring):

```sql
SELECT name FROM sqlite_master
WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name <> '_cf_KV'
ORDER BY name;
```

Forvent **ingen rader**. Hvis andre tabeller vises: **STOPP**. Ikke opprett eller skriv over noe.

## 3. Gjør en svært liten skrive-/søkekontroll (preview ONLY)

Kjør følgende **én etter én** i previewens Console. Ingen private data, ingen offentlig API, ingen full arkivimport.

```sql
CREATE TABLE fysen_probe_items (
  item_index INTEGER PRIMARY KEY,
  city TEXT NOT NULL,
  normalized_name TEXT NOT NULL
);
```

```sql
INSERT INTO fysen_probe_items(item_index, city, normalized_name) VALUES
  (1, 'oslo', 'ramen shoyu'),
  (2, 'oslo', 'pizza margherita'),
  (3, 'oslo', 'ramen tofu'),
  (4, 'oslo', 'sushi laks');
```

```sql
CREATE VIRTUAL TABLE fysen_probe_trigrams USING fts5(
  normalized_name,
  content='fysen_probe_items',
  content_rowid='item_index',
  tokenize='trigram'
);
```

```sql
INSERT INTO fysen_probe_trigrams(fysen_probe_trigrams) VALUES('rebuild');
```

```sql
SELECT COUNT(*) AS hits FROM fysen_probe_trigrams
WHERE normalized_name LIKE '%ramen%';
```

**Forventet og eksternt bekreftet 13. november:** `hits = 2`. FTS5-søket mot den virkelige Cloudflare D1-previewen er nå bestått. **Ikke** kjør `CREATE VIRTUAL TABLE`, `INSERT ... rebuild` eller de tidligere testinnsettingene på nytt. Slike handlinger kan gi feil og ekstra skriverader.

### Registrert fjernprøve – 13. november 2026 kl. 23.54 CET

Cloudflare Console for **`paradisdb-fysen-preview`** viste:

- `CREATE TABLE fysen_probe_items (...)` — **success**
- `INSERT INTO fysen_probe_items ... VALUES` — **success** for fire syntetiske retter
- `SELECT COUNT(*) AS antall_retter FROM fysen_probe_items` — **4** forventet og observert

Dette beviser at den isolerte Free-previewen kan opprette en egendefinert tabell, skrive noen rader og lese dem. Det er **ikke** en test av FTS5, og det finnes ennå ingen dokumenterte etter-målinger av `Rows read` eller `Rows written`. Før neste steg: **ikke kjør CREATE TABLE eller INSERT med de fire retter på nytt**, ellers får vi uryddig testtilstand. Fortsett bare med de tre FTS5-kommandoene ovenfor, én av gangen, og stopp hvis en feiler.

### Registrert FTS5-fjernprøve – 13. november 2026 kl. 23.57 CET

Eierens Cloudflare Console viste at alle følgende kommandoer ble utført **uten feil** i **`paradisdb-fysen-preview`**:

- `CREATE VIRTUAL TABLE fysen_probe_trigrams USING fts5(... tokenize='trigram')` — **success**
- `INSERT INTO fysen_probe_trigrams(fysen_probe_trigrams) VALUES('rebuild')` — **success**
- `SELECT COUNT(*) AS treff FROM fysen_probe_trigrams WHERE normalized_name LIKE '%ramen%'` — **2 treff**, som forventet for `ramen shoyu` og `ramen tofu`

**PASS:** ekte ekstern D1 / FTS5-trigramindeks / riktig søketreff. **IKKE MÅLT ENNÅ:** endelig `rows_read`, `rows_written`, antall queries og plassforbruk etter testen. Disse må hentes fra **previewens** Cloudflare Overview, ikke estimeres ut fra fire logiske dataelementer. En test med fire retter sier ikke nok om full import av 47 270 offentlige menyer eller ressursforbruk for en typisk søkebruker.

### Målt etter test – 14. november 2026 kl. 04.10 CET

Cloudflare **Overview → Last 24 hours** for den *midlertidige* `paradisdb-fysen-preview` viste etter SQL/FTS5-prøven:

| Måling | Før, 13. nov. 23.51 | Etter, 14. nov. 04.10 |
| --- | ---: | ---: |
| Total queries | 0 | **6** |
| Rows read | 0 | **12** |
| Rows written | 0 | **9** |
| Storage used (current) | 12,29 kB | **32,77 kB** |
| Number of Tables (Dashboard) | 0 | **6** |

Dette er en forskjell på **20,48 kB** i lagring. FTS5 oppretter flere skyggetabeller, så seks tabeller betyr ikke seks egendefinerte appdomener. Merk at dette er en **samlet rullerende 24-timersmåling for én testdatabase**; skjermbildet viser ikke separate rows-read/rows-written-tall per SQL-statement, og sier ikke noe om full importkostnad, Workers-forespørsler eller samlet konto-forbruk. Tidsrommet krysser midnatt, og 24-timersdata må ikke forveksles med én bestemt Free-kvotedag.

**Beslutning:** PASS for *første ekstern Free-preview skrive-/lese-/FTS5-funksjon og samlet testforbruk*. **FORTSATT BLOCKED** for reell menymigrering, fullarkivimport og aktivering av `PARADISDB_PUBLIC_ENABLED`; det krever kontrollerte fullskala-prognoser og faktisk fjerntelemetri på en representativ prøve. Ikke gjenta oppretting/innsetting/rebuild på denne eksisterende testdatabasen for å måle det samme en gang til.

### Kontroll av kontoens samlede D1 Free-forbruk – 14. november 2026 kl. 05.02 CET

Cloudflare **D1 Database → Daily** for datoen **14. november** viser:

| Konto-måling | Faktisk dashboard-verdi | Free-grense |
| --- | ---: | ---: |
| Databaser | **2** | 10 |
| Rows read, kalenderdagen | **0** | 5 000 000 |
| Rows written, kalenderdagen | **0** | 100 000 |
| Samlet D1-lagring | **45,06 kB** | 5 GB |

Listen viser begge databasene: `paradisdb-fysen-public` og `paradisdb-fysen-preview`. Den samlede lagringen stemmer med tidligere individuelle tall (12,29 + 32,77 = **45,06 kB**). De to SQL-testene i den permanente databasen og seks i previewen ble gjort sent **13. november**. Derfor er **0/0 på dagsvisningen 14. november** forenlig med at previewens **Last 24 hours** kl. 04.10 viste **12 leste / 9 skrevne rader**. Dette må ikke tolkes som at tidligere målt forbruk er forsvunnet, eller som at en framtidig full import er gratis.

**Kontonivå-baseline dokumentert: PASS for antall databaser og samlet lagring på Free.** Det gjenstår fremdeles å måle Worker-forespørsler, representativt søk, fullverdige arkivrader og skrivekostnad for FTS5 ved større import. **Ikke importer ~47 270 menyposter eller aktiver API basert på denne 4-raders prøven.**

## 4. Les reelle Cloudflare-målinger etter test

Gå tilbake til previewens **Overview** og noter tidspunkt, `Total queries`, `Rows read`, `Rows written`, `Storage used`. Vent til tallene er oppdatert. Sammenlign med baseline; SQL-konsollspørringene kan gi ulikt antall leste/skrevne rader, og FTS5 oppretter egne interne indekstabeller. Ikke bruk `INSERT` på nytt bare for å få flere målinger. Ta skjermbilde og registrer *kontoens* D1-forbruk etterpå.

**Ingen automatisk godkjenning:** Denne mini-prøven viser at D1 kan skrive/lage en FTS5-indeks/søke på virkelig Free-konto, men kan **ikke** anslå full import eller Fysen-trafikk pålitelig. Før en full verifisert import kreves egen, styrt test med faktiske offentlige arkivrader, FTS5-skrivekostnad, per-søk-`rows_read`, Worker-forespørsler, total-konto-baseline og `free_budget_gate.py`. Rate limiter er per lokasjon, ikke en global hardkostnadssperre.

## 5. Sikkerhets- og gjenopprettingshensyn

- Ikke kjør disse `CREATE`- eller `INSERT`-kommandoene på `paradisdb-fysen-public`.
- Ikke deploy Workeren, endre `PARADISDB_PUBLIC_ENABLED=false`, eller flytt Supabase/Fysen-ruting.
- Ikke lim inn Cloudflare API-tokens eller passord.
- Cloudflare Free avviser D1-spørringer etter daglige grensebrudd. Ikke oppgrader automatisk.
- [Cloudflare 12. nov. 2026](https://developers.cloudflare.com/changelog/post/2026-11-12-d1-export-virtual-tables/) tillater eksport av FTS5-virtuelle tabeller som `sqlite3_cli_only`-dump, **men denne dumpen kan ikke importeres direkte tilbake til D1**. Vår egen verifiserte offentlige kilde + deterministiske D1 SQL-eksport må beholdes, og restore må testes separat i tom database før produksjon.

Kilder: [D1 Metrics](https://developers.cloudflare.com/d1/observability/metrics-analytics/), [D1 Pricing](https://developers.cloudflare.com/d1/platform/pricing/), [D1 Limits](https://developers.cloudflare.com/d1/platform/limits/), [D1 virtual table export limitation](https://developers.cloudflare.com/changelog/post/2026-11-12-d1-export-virtual-tables/).
