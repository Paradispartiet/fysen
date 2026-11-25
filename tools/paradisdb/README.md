# ParadisDB – første gratis, lokal databasepilot

**Status 12. november 2026: eksperiment, ikke produksjon.** Dette er et felles databaseformat og et lite administrasjonsprogram bygget inne i Fysen-repoets egen utviklingsgren. Flytt prosjektet til et separat ParadisDB-repo når et nytt repository kan opprettes. Ingen Supabase-prosjekter, eksisterende databasekoblinger, brukerøkter eller publiserte sider endres.

## Hva fungerer i v0?

- Én fil på disk: standard SQLite (åpent, flyttbart format); ingen npm-, Python- eller databasetjenesteavhengigheter.
- Seks **logisk adskilte app-navnerom**: fysen, aha, historygo, paradisavisa, civication og footballmanager. Dokumenter legges inn og hentes **bare fra lokal CLI**, uten nettverks-API for private data.
- Fysen-arkivadapter som tar **frosne lokale filer**, verifiserer SHA-256, gzip-størrelse, antall rader, source-datoer og identitetskarantene **før** import. Import skjer i én transaksjon. Kan kun importere Fysens *offentlige* verifiserte indeks; ikke Supabase-dumper eller brukerdatabaser.
- Lesbart restaurant-/rettsøk med eksplisitt "realtime: false", observert kildedato og menykildelenke. Avviste restaurantidentiteter ekskluderes.
- Automatisk SQLite-backup via SQLite backup API, SHA-256-manifest, integritetskontroll og gjenoppretting bare til en ny fil. Aldri overskriv eksisterende database eller backup.
- Lokal lesebasert adminside på 127.0.0.1:8765 og to **kun offentlige** HTTP-GET-endepunkter. Alle HTTP-skriveforsøk avvises. Ingen innlogging eller offentlig tilgang inngår i denne piloten.

## Kom i gang uten ekstra kostnader

Krav: Python 3.11+ installert lokalt; ingen konto, pakkeinstallasjon, betalt API eller server nødvendig.

Kjør fra Fysen-repoets rot, med databasefil **utenfor repoet**:

    python3 tools/paradisdb/paradisdb.py init /tmp/paradisdb.sqlite

Prøv logisk atskilte app-data fra en lokal fil:

    echo '{"note":"Min lokale test – ikke privat produksjonsdata"}' > /tmp/paradisdb-demo.json
    python3 tools/paradisdb/paradisdb.py put /tmp/paradisdb.sqlite aha eksempel /tmp/paradisdb-demo.json
    python3 tools/paradisdb/paradisdb.py get /tmp/paradisdb.sqlite aha eksempel
    python3 tools/paradisdb/paradisdb.py status /tmp/paradisdb.sqlite

For å importere **den eksisterende offentlige Fysen-indeksen** (ikke hele historikken) trenger du to filer fra den separate Git-grenen "fysen-free-public-index": manifest.json og index.json.gz. Behold bytes uendret; ingen data lastes ned automatisk av programmet.

    git fetch origin fysen-free-public-index
    mkdir -p /tmp/paradisdb-index
    git show origin/fysen-free-public-index:manifest.json > /tmp/paradisdb-index/manifest.json
    git show origin/fysen-free-public-index:index.json.gz > /tmp/paradisdb-index/index.json.gz
    python3 tools/paradisdb/paradisdb.py import-fysen /tmp/paradisdb.sqlite /tmp/paradisdb-index/manifest.json /tmp/paradisdb-index/index.json.gz

Søk i lokalt arkiv:

    python3 tools/paradisdb/paradisdb.py search /tmp/paradisdb.sqlite ramen
    python3 tools/paradisdb/paradisdb.py serve /tmp/paradisdb.sqlite --port 8765

Åpne deretter http://127.0.0.1:8765/. Merk: URL-en fungerer bare **på datamaskinen som kjører programmet**. Dette er ikke et publisert nettsted.

## Backup/restore uten skjulte kostnader

Bruk en annen mappe eller fysisk enhet for backup. For en faktisk backup må den også kopieres til et separat medium; en SQLite-fil ved siden av originalen beskytter ikke mot diskhavari.

    python3 tools/paradisdb/paradisdb.py backup /tmp/paradisdb.sqlite /tmp/paradisdb-backups/kopi.sqlite
    python3 tools/paradisdb/paradisdb.py verify-backup /tmp/paradisdb-backups/kopi.sqlite /tmp/paradisdb-backups/kopi.sqlite.sha256.json
    python3 tools/paradisdb/paradisdb.py restore /tmp/paradisdb-backups/kopi.sqlite /tmp/paradisdb-backups/kopi.sqlite.sha256.json /tmp/paradisdb-restored.sqlite
    python3 tools/paradisdb/paradisdb.py status /tmp/paradisdb-restored.sqlite

En sjekksum kontrollerer bit-identitet, **ikke** at en fil har en troverdig avsender. Oppbevar manifestet og backupen sikkert, og test gjenoppretting regelmessig.

## Sikkerhetsgrense

ParadisDB v0 er **ikke** en fungerende Supabase-erstatning for apper på internett. SQLite-filen finnes på én maskin. Den har ikke skypålogging, OAuth, autentiserte multi-user API-er, row-level security, sanntidssynk, geografisk replikering eller en offentlig driftstjeneste. Lokale CLI-brukere med tilgang til databasefilen kan lese alle navnerom. Dette er **logisk**, ikke kryptografisk eller brukerautentisert isolasjon.

Den lokale HTTP-visningen viser kun status og offentlige menyposter, aldri private dokumentverdier. Den binder bare til loopback og avviser andre Host-headere, men den er ikke ment for bruk på delt eller kompromittert datamaskin.

**Ingen** eksisterende Aha/History GO Auth flyttes. Innlogging fortsetter på eksisterende Supabase til en egen sikker identitetsløsning er valgt og verifisert. Fysen-arkiv, privat 2-millioner-posters backup og produksjonstabeller forblir urørt.

### Hvorfor denne arkitekturen?

- Åpne filformater og gjenoppretting gir en **reell exit** fra dyr databasehosting.
- Små offentlige datasett kan være statiske eller SQLite-baserte i stedet for store, indekserte historikktabeller.
- SQLite passer godt for én maskin/lite antall skrivere. Ved mange samtidige klienter over internett trenger vi et API og en sikker, vedvarende driftstjeneste. Ikke del SQLite-filen direkte via nettverksdisk.
- Cloudflare D1 er en *mulig senere* SQLite-kompatibel driftstjeneste med gratis kvoter, men opprettelse av konto, kvoter og driftskostnader må kontrolleres før bruk. Ingen D1-tjeneste opprettes eller aktiveres her.

## Sikker videre plan

1. Bekreft at alle lokale tester og backup/restore er grønne i denne PR-en.
2. Kjør prøveimport av den **faktiske** offentlige Fysen-indeksen, verifiser antall, karantener, observasjonsdatoer og kildelenker. Ingen privat data, ingen produksjonsbryter.
3. Lag et eget ParadisDB-repo når GitHub-tilgang tillater det, med tydelig lisens- og vedlikeholdsvalg. Flytt koden med historikk.
4. Lag API-kontrakt og en **separat autentiserings- og rettighetsmodell** før noen private appdata kan lese/skrives via nettverk.
5. Velg gratis, vedvarende hosting eller lokalt drevet server; mål kapasitetsgrenser og sikkerhetskopier. Null månedlige abonnement kan være et mål, ikke et løfte om ubegrenset drift.
6. Migrer **én app om gangen**, med parallell lesetest, dokumentert reversering og eksplisitt godkjenning før produksjonsendringer.

Teknisk grunnlag: Fysen sin eksisterende verificerte indeks beskrives i apps/api/src/verified-public-menu-archive.ts og docs/fysen-zero-cost-operating-plan-2026-11-12.md. Dette pilotverktøyet bruker samme manifest-, hash- og karanteneprinsipper.
