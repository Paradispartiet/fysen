# ParadisDB: nettadapter for offentlig Fysen-arkiv (ikke deployet)

**Fase v0.1, 12. november 2026: kun kode, tester og lokal eksport.** Dette er en mulig nettbasert lesetjeneste, **ikke** en sikker multi-bruker-DB eller erstatning for Supabase Auth. Cloudflare Workers + D1 er én valgfri senere driftstjeneste; vi er ikke knyttet til den.

## Sikkerhetsgrensen

- `worker.mjs` eksponerer bare offentlige, kildebelagte Fysen-menyposter over **GET**:
  - `/v1/dishes/archive/status`: kilde, antall, datoer og SHA-256-fingeravtrykk.
  - `/v1/dishes/archive/search?q=ramen&city=Oslo&limit=20`: rettsøk med observasjonsdato/kildelenke. Aldri sanntidspåstand.
- Alle HTTP `POST`, `PUT`, `PATCH` og `DELETE` mot kjente ruter får 405. Private Aha-/History GO-/Fysen-brukerdokumenter har **ingen** HTTP-rute.
- `PUBLIC_DB` er en **separat offentlig D1-binding**. Ikke bind denne Workeren til Aha/Supabase, private historikkbackuper eller produksjonsdatabasen.
- Søkeord og resultatantall valideres, SQL-parametere bindes og spørringen henter høyst 500 kandidat-rader per kall. D1 tillater maks **50 UTF-8 bytes i et LIKE-mønster**; derfor avvises normaliserte søk over 48 bytes før databasekall (to bytes brukes av jokertegnene `%`). Dette gjelder også norske bokstaver som bruker flere UTF-8 bytes. Ingen offentlig feilmelding inneholder SQL-internt innhold.
- Et uferdig D1-importforsøk avvises (503), fordi `public_ready` skrives som **siste SQL-setning** i eksporten.
- Dette er *ikke* autentisering eller kryptering. Datakilden er bare offentlig. En framtidig privat API krever separat identitetsløsning, tilgangskontroll, misbrukskontroll, audit og isolerte sikkerhetstester.

## Lokal prøving uten Cloudflare-konto

Fra Fysen-repoets rot, med **frosne offentlige filer** fra `fysen-free-public-index`:

    python3 tools/paradisdb/paradisdb.py init /tmp/paradisdb-public.sqlite
    python3 tools/paradisdb/paradisdb.py import-fysen /tmp/paradisdb-public.sqlite /tmp/paradisdb-index/manifest.json /tmp/paradisdb-index/index.json.gz
    python3 tools/paradisdb/worker/export_d1.py /tmp/paradisdb-public.sqlite /tmp/paradisdb-fysen-public.sql
    node --test tools/paradisdb/worker/tests/worker.test.mjs

SQL-filen inneholder bare det offentlige `public_archive_meta`, `fysen_public_items` og søkeindeksen `fysen_public_trigrams` med tilhørende FTS5-interntabeller. Den inneholder **ikke** et `documents`-skjema, brukerdata, passord eller autentiseringstoken.

Det går også an å åpne SQL-filen med lokal SQLite uten Cloudflare:

    sqlite3 /tmp/paradisdb-fysen-public-test.sqlite < /tmp/paradisdb-fysen-public.sql
    sqlite3 /tmp/paradisdb-fysen-public-test.sqlite 'SELECT COUNT(*) FROM fysen_public_items;'
    sqlite3 /tmp/paradisdb-fysen-public-test.sqlite "SELECT value FROM public_archive_meta WHERE key='public_ready';"

GitHub Actions kontrollerer eksport/import med Python og tester også en ekte lokal Cloudflare D1-runtime med Wrangler, uten konto eller produksjonsnøkler.

## Test med faktisk lokal Cloudflare D1 (ingen konto)

En egen CI-prøve kjører `tools/paradisdb/worker/tests/local-wrangler-d1-proof.sh` med en **syntetisk** database-ID, isolert persistensmappe og eksplisitte `--local`-flagg. Den bruker Wrangler **4.161.0** og importerer kun verifisert offentlig SQL. Den starter også Worker-runtime på `127.0.0.1` og kontrollerer status, dokumenterte søkeresultater, SQL-injeksjonsvern og at private/write-endepunkter er stengt. Testen trenger ingen Cloudflare-konto eller API-token.

Dette er en **ytterligere kompatibilitetsport**, ikke en driftssetting: bruk av `wrangler d1 execute --remote`, `wrangler deploy` eller en ekte Cloudflare database-ID er ikke del av denne prøven. `wrangler dev` og `d1 execute --local` bruker samme, midlertidige lokale lagringsmappe. Alt slettes automatisk når GitHub-runneren fjernes.

Eldre Wrangler **4.45.0** utløste en intern `workerd`-feil i SQL statement-cache under den første reelle lokale D1-importprøven. Derfor testes en nyere, eksplisitt pinnet versjon. Den tidligere SQLite-adapterprøven er grønn, men **beviser ikke at D1-importen fungerer**. En ny D1-prøve må være grønn før kompatibilitet anses verifisert.

## Søkeindeks og gratisdrift

Den tidligere spørringen brukte `instr(normalized_name, ?)` over hele menylisten, noe som kan gi en full tabellskanning. **D1 måler skannede rader**, ikke bare treffene, og dette kan raskt bruke opp gratiskvoten på **5 millioner leste rader per dag**. Gratisplanen har også **100 000 skrevne rader per dag**, **500 MB per database** og **5 GB samlet lagring**, med grenser på blant annet søke- og SQL-operasjoner. [Cloudflare D1-priser](https://developers.cloudflare.com/d1/platform/pricing/) og [D1-grenser](https://developers.cloudflare.com/d1/platform/limits/).

For uttrykk på minst tre normaliserte tegn bruker v0.2 en **FTS5 trigram-indeks**, bygd etter importen og før `public_ready`. Den er ikke et nytt privat datalager. Den tidligere to-tegns fallback-spørringen er nå **deaktivert i det offentlige API-et**: slike søk avvises før D1, fordi de kan utløse mange leste rader. En isolert kontroll av de 47 265 offentlige menypostene fant samme treffmengde for åtte testuttrykk og en fysisk SQLite-størrelse på omtrent **15,1 MB** med FTS-indeks. Dette er **ikke** et kostnadsbevis fra Cloudflare i produksjon.

**Merk:** Opprettelse og rebuild av FTS-indekser medfører ekstra rader skrevet og kan gjøre at en full førstegangsimport overskrider Free-planens daglige skrivekvote. Derfor må `rows_read`/`rows_written` fra reell D1 observeres og et **faktisk** Free-prosjekt kontrolleres før en eventuell remote-import. Testene i denne PR-en bruker kun lokal D1 uten fakturering. Ingen automatisk betalt oppgradering, ingen fjernimport og ingen bytting av produksjonspekere.

## Kostnadssperrer og release-gate (v0.3)

**Hele den offentlige nettadapteren er av som standard.** `PARADISDB_PUBLIC_ENABLED` må være `"true"`, og bindingen `PUBLIC_RATE_LIMITER` må finnes. Ingen av delene kan erstattes av private Aha-kontoer eller gamle Supabase-variabler. En manglende bryter eller limiter gir 503 **uten D1-lesing**; en overskredet lokal rate limit gir 429. Eksempelkonfigurasjonen har `workers_dev=false` og `PARADISDB_PUBLIC_ENABLED=false`.

Cloudflares rate limiting er *omtrentlig per datasenter*, og det finnes ingen streng global gratisgrense i denne adapteren. Før enhver fjernpreview må reelle eksterne målinger vurderes med `free_budget_gate.py`; verktøyet nekter `null`, manglende målinger eller for høyt forventet forbruk. Se [FREE_PLAN_RELEASE_GATE.md](./FREE_PLAN_RELEASE_GATE.md) for mål, kvoter, kildekrav, manuelle kontroller og tilbakeføring.

## Framtidig, kun etter uttrykkelig godkjenning

Cloudflare D1 kan importere SQLite-SQL via `wrangler d1 execute <db> --file=... --local` for lokal database eller med `--remote` for en virkelig konto. Disse kommandoene kjøres **ikke** i denne PR-en. `wrangler.jsonc.example` er en mal uten ekte database-ID og må ikke bli en automatisk produksjonsdeploy.

For en eventuell gratis pilot:

1. Kontroller nåværende gratiskvoter og at ingen betalte tjenester aktiveres automatisk. Avklar hvilken Cloudflare-konto/organisasjon som eier dataene.
2. Opprett separat **tom** D1-database i EU om mulig; aldri bruk private produksjonsdatabaser.
3. Test SQL-import lokalt og i separat D1-preview. Sammenlign antall, SHA-256, kildekarantener, søk og avvisning av private/skrive-API-er. En delvis import må aldri markeres som klar.
4. Først etter dokumentert sikkerhets- og kostnadsgodkjenning: vurder publisering. Legg inn en manuell stopp og rollback før du endrer Fysens eksisterende API-ruting.

**Viktig begrensning:** Eksporten er for **en tom database**, ikke for å oppdatere et eksisterende D1-skjema. Ved senere inkrementelle oppdateringer må det bygges staging-tabeller og atomisk versjonsbytte. Denne løsningen skal ikke kjøres med `--remote` mot levende data uten egen designgjennomgang.

Kilder: [Cloudflare D1 Worker Binding API](https://developers.cloudflare.com/d1/worker-api/), [D1 import/eksport](https://developers.cloudflare.com/d1/best-practices/import-export-data/), [Cloudflare Workers-grenser](https://developers.cloudflare.com/workers/platform/limits/).

## Hva som fortsatt ikke er løst

- Private leselister, spillagring, felles innlogging, RLS og frakoblet synkronisering har **ikke** noen nett-API.
- Det finnes ikke en bekreftet gratis, vedvarende produksjonsinstans for ParadisDB.
- 0 kroner er et abonnementmål, **ikke** en garanti mot kapasitetsgrenser eller krav til infrastruktur. Selv på Free kan forbruket gjøre at tjenesten midlertidig avviser forespørsler.
