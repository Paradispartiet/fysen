# ParadisDB: nettadapter for offentlig Fysen-arkiv (ikke deployet)

**Fase v0.1, 12. november 2026: kun kode, tester og lokal eksport.** Dette er en mulig nettbasert lesetjeneste, **ikke** en sikker multi-bruker-DB eller erstatning for Supabase Auth. Cloudflare Workers + D1 er én valgfri senere driftstjeneste; vi er ikke knyttet til den.

## Sikkerhetsgrensen

- \`worker.mjs\` eksponerer bare offentlige, kildebelagte Fysen-menyposter over **GET**:
  - \`/v1/dishes/archive/status\`: kilde, antall, datoer og SHA-256-fingeravtrykk.
  - \`/v1/dishes/archive/search?q=ramen&city=Oslo&limit=20\`: rettsøk med observasjonsdato/kildelenke. Aldri sanntidspåstand.
- Alle HTTP \`POST\`, \`PUT\`, \`PATCH\` og \`DELETE\` mot kjente ruter får 405. Private Aha-/History GO-/Fysen-brukerdokumenter har **ingen** HTTP-rute.
- \`PUBLIC_DB\` er en **separat offentlig D1-binding**. Ikke bind denne Workeren til Aha/Supabase, private historikkbackuper eller produksjonsdatabasen.
- Søkeord og resultatantall valideres, SQL-parametere bindes og spørringen henter høyst 500 kandidat-rader per kall. Ingen offentlig feilmelding inneholder SQL-internt innhold.
- Et uferdig D1-importforsøk avvises (503), fordi \`public_ready\` skrives som **siste SQL-setning** i eksporten.
- Dette er *ikke* autentisering eller kryptering. Datakilden er bare offentlig. En framtidig privat API krever separat identitetsløsning, tilgangskontroll, misbrukskontroll, audit og isolerte sikkerhetstester.

## Lokal prøving uten Cloudflare-konto

Fra Fysen-repoets rot, med **frosne offentlige filer** fra \`fysen-free-public-index\`:

    python3 tools/paradisdb/paradisdb.py init /tmp/paradisdb-public.sqlite
    python3 tools/paradisdb/paradisdb.py import-fysen /tmp/paradisdb-public.sqlite /tmp/paradisdb-index/manifest.json /tmp/paradisdb-index/index.json.gz
    python3 tools/paradisdb/worker/export_d1.py /tmp/paradisdb-public.sqlite /tmp/paradisdb-fysen-public.sql
    node --test tools/paradisdb/worker/tests/worker.test.mjs

SQL-filen inneholder bare \`public_archive_meta\` og \`fysen_public_items\`. Det er **ikke** med et \`documents\`-skjema eller noen brukerdata, passord eller autentiseringstoken.

Det går også an å åpne SQL-filen med lokal SQLite uten Cloudflare:

    sqlite3 /tmp/paradisdb-fysen-public-test.sqlite < /tmp/paradisdb-fysen-public.sql
    sqlite3 /tmp/paradisdb-fysen-public-test.sqlite 'SELECT COUNT(*) FROM fysen_public_items;'
    sqlite3 /tmp/paradisdb-fysen-public-test.sqlite "SELECT value FROM public_archive_meta WHERE key='public_ready';"

GitHub Actions gjør den samme import- og SQL-kontrollen med Python uten å installere Wrangler.

## Test med faktisk lokal Cloudflare D1 (ingen konto)

En egen CI-prøve kjører `tools/paradisdb/worker/tests/local-wrangler-d1-proof.sh` med en **syntetisk** database-ID, isolert persistensmappe og eksplisitte `--local`-flagg. Den bruker Wrangler **4.161.0** og importerer kun verifisert offentlig SQL. Den starter også Worker-runtime på `127.0.0.1` og kontrollerer status, dokumenterte søkeresultater, SQL-injeksjonsvern og at private/write-endepunkter er stengt. Testen trenger ingen Cloudflare-konto eller API-token.

Dette er en **ytterligere kompatibilitetsport**, ikke en driftssetting: bruk av `wrangler d1 execute --remote`, `wrangler deploy` eller en ekte Cloudflare database-ID er ikke del av denne prøven. `wrangler dev` og `d1 execute --local` bruker samme, midlertidige lokale lagringsmappe. Alt slettes automatisk når GitHub-runneren fjernes.

Eldre Wrangler **4.45.0** utløste en intern `workerd`-feil i SQL statement-cache under den første reelle lokale D1-importprøven. Derfor testes en nyere, eksplisitt pinnet versjon. Den tidligere SQLite-adapterprøven er grønn, men **beviser ikke at D1-importen fungerer**. En ny D1-prøve må være grønn før kompatibilitet anses verifisert.

## Framtidig, kun etter uttrykkelig godkjenning

Cloudflare D1 kan importere SQLite-SQL via \`wrangler d1 execute <db> --file=... --local\` for lokal database eller med \`--remote\` for en virkelig konto. Disse kommandoene kjøres **ikke** i denne PR-en. \`wrangler.jsonc.example\` er en mal uten ekte database-ID og må ikke bli en automatisk produksjonsdeploy.

For en eventuell gratis pilot:

1. Kontroller nåværende gratiskvoter og at ingen betalte tjenester aktiveres automatisk. Avklar hvilken Cloudflare-konto/organisasjon som eier dataene.
2. Opprett separat **tom** D1-database i EU om mulig; aldri bruk private produksjonsdatabaser.
3. Test SQL-import lokalt og i separat D1-preview. Sammenlign antall, SHA-256, kildekarantener, søk og avvisning av private/skrive-API-er. En delvis import må aldri markeres som klar.
4. Først etter dokumentert sikkerhets- og kostnadsgodkjenning: vurder publisering. Legg inn en manuell stopp og rollback før du endrer Fysens eksisterende API-ruting.

**Viktig begrensning:** Eksporten er for **en tom database**, ikke for å oppdatere et eksisterende D1-skjema. Ved senere inkrementelle oppdateringer må det bygges staging-tabeller og atomisk versjonsbytte. Denne løsningen skal ikke kjøres med \`--remote\` mot levende data uten egen designgjennomgang.

Kilder: [Cloudflare D1 Worker Binding API](https://developers.cloudflare.com/d1/worker-api/), [D1 import/eksport](https://developers.cloudflare.com/d1/best-practices/import-export-data/), [Cloudflare Workers-grenser](https://developers.cloudflare.com/workers/platform/limits/).

## Hva som fortsatt ikke er løst

- Private leselister, spillagring, felles innlogging, RLS og frakoblet synkronisering har **ikke** noen nett-API.
- Det finnes ikke en bekreftet gratis, vedvarende produksjonsinstans for ParadisDB.
- 0 kroner er et abonnementmål, **ikke** en garanti mot kapasitetsgrenser eller krav til infrastruktur. Selv på Free kan forbruket gjøre at tjenesten midlertidig avviser forespørsler.
