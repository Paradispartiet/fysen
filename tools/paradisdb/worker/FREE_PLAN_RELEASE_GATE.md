# ParadisDB – utgivelsesport for 0-kroners drift (D1 Free)

**Status: utkast, ingen Cloudflare-konto eller fjernimport opprettet.** Dette dokumentet viser hva som må være målt og godkjent før vi kan aktivere `PARADISDB_PUBLIC_ENABLED=true`. Den offentlige Fysen-indeksen forblir tilgjengelig via dagens statiske gratisløsning.

## Hvorfor må dette være en sperre?

Cloudflare D1 Free (kontrollert mot offisiell dokumentasjon 12. november 2026):

| Kvotetype | Gratisgrense per konto | Vår konservative prøvegrense |
| --- | ---: | ---: |
| D1-rader lest | 5 000 000 per dag | 2 500 000 per dag |
| D1-rader skrevet | 100 000 per dag | 50 000 per dag |
| Workers-forespørsler | 100 000 per dag | 40 000 per dag |
| Lagring per D1-database | 500 MB | 300 MB |
| Lagring på hele D1-kontoen | 5 GB | 3 GB |
| D1-databaser på hele kontoen | 10 | 8 |

Kildene er [D1-priser](https://developers.cloudflare.com/d1/platform/pricing/), [D1-grenser](https://developers.cloudflare.com/d1/platform/limits/) og [Workers-grenser](https://developers.cloudflare.com/workers/platform/limits/). Kravene for kontolagring og databaseantall er nå del av selve beregningsporten, ikke bare en manuell fotnote. Tallene må fortsatt kontrolleres mot den faktiske Cloudflare-kontoen.

Overskrides D1 Free-grensene, blir forespørsler avvist. Det er likevel feil å kalle denne løsningen «garantert gratis» uten å kjenne kontoplan og faktisk bruk. **Ikke** aktiver Workers Paid, betalende R2 eller annen betalt backend for å løse en blokkert import automatisk.

## Innebygde tekniske sperrer

- `PARADISDB_PUBLIC_ENABLED` må være strengen `"true"` for at Worker i det hele tatt skal spørre D1. Eksempelkonfigurasjonen har den satt til `"false"`.
- En binding `PUBLIC_RATE_LIMITER` med `limit()` **må** finnes. Ellers blir resultatet **503 uten noen D1-spørring**.
- Enheten `PUBLIC_RATE_LIMITER` er konfigurert for **20 kall per 60 sekunder per Cloudflare-lokasjon**, med en felles nøkkel for søk. Rate limiting er **ikke global, ikke helt nøyaktig og ikke en faktureringsgrense**: Cloudflare kan slippe gjennom flere kall under synkronisering mellom lokasjoner.
- Søk på færre enn **tre** normaliserte tegn avvises med HTTP 400 før D1. Lengre søk bruker FTS5 trigram-indeks. Normaliserte søk over **48 UTF-8 bytes** avvises også før D1, siden wildcard-mønsteret med to prosenttegn må holde seg innen D1s 50-byte `LIKE`-grense. Dermed unngår vi både det kjente fullscan-sporet for to tegn og unødvendige D1-feil for lange søk.
- Alle private ruter og HTTP-skrivemetoder er stengt. D1-bindingen kan bare peke mot en **separat offentlig** testdatabase. Ingen privat Aha-, History GO- eller Fysen-informasjon følger med.
- Skytjenesten serverer ingenting før en fullført, verifisert arkivimport har satt `public_ready` som siste SQL-setning.

## Mål for en senere fjernprøve

Før noe fjernforsøk må den som eier kontoen **bekrefte Free-planen og gi eksplisitt tillatelse til opprettelse av en tom, isolert offentlig test-D1**. Vår kode gjør **ikke** dette på egen hånd.

For D1-målinger bruker man `meta.rows_read` og `meta.rows_written` fra faktiske Worker-spørringer (inkludert manifestoppslag) eller Cloudflare Analytics, sammen med dagens konto-totaler. Mål flere typiske søk og bruk konservative verdier, ikke gjennomsnitt fra den lokale SQL-simulatoren. [D1 observability](https://developers.cloudflare.com/d1/observability/find-expensive-queries/).

`tools/paradisdb/worker/free_budget_gate.py` tar en JSON-fil med følgende felt. Opprett filen **lokalt, uten tokens eller passord**, basert på virkelige målinger:

```json
{
  "source": "cloudflare-d1-remote",
  "plan": "workers-free",
  "measuredAt": null,
  "measurements": {
    "searchRowsRead": null,
    "statusRowsRead": null,
    "searchRowsWritten": null,
    "statusRowsWritten": null,
    "initialImportRowsRead": null,
    "initialImportRowsWritten": null
  },
  "baselineToday": {
    "rowsRead": null,
    "rowsWritten": null,
    "workerRequests": null
  },
  "forecastToday": {
    "searches": null,
    "statusRequests": null,
    "initialImports": null
  },
  "databaseBytesAfterImport": null,
  "accountDatabaseBytesAfterImport": null,
  "accountDatabasesAfterImport": null
}
```

`null` er med hensikt: **verktøyet nekter å godkjenne uten målinger**. `measuredAt` må være en reell, tidssonebasert ISO-dato fra de siste syv dagene. `initialImportRowsWritten` må inkludere FTS5-oppbyggingen; hvis man planlegger import, kan ikke denne målingen være null eller 0. `accountDatabaseBytesAfterImport` betyr kontoens samlede D1-lagring etter planlagt import, og `accountDatabasesAfterImport` teller alle D1-databaser etter at previewen er opprettet. Disse feltene er påkrevde; kontoens lagring kan ikke være mindre enn størrelsen på testdatabasen. Prognosene må regne med samtlige apper på samme Cloudflare-konto, ikke bare Fysen. Oppgitte kildemerker er ikke kryptografisk bevis for fjernmålinger, så operatøren må kontrollere tallene i kontoen før godkjenning. En positiv prognose er ikke en fakturagaranti.

Kjør offline:

```bash
python3 tools/paradisdb/worker/free_budget_gate.py /sti/til/ekte-malinger.json
```

Avviste eller manglende målinger gir exitkode 2. Bestått prognose gir exitkode 0, men **betyr fortsatt ikke at en konto eller global daglig begrensning er verifisert**. Det kreves dokumentert manuel konto-/tilgangskontroll og en plan for tilbakeføring.

## Endelig beslutningsliste

1. Hele CI for siste PR-HEAD skal være grønn, inkludert ekte lokal Wrangler D1.
2. Cloudflare-kontoens prisplan må være verifisert til Free, uten uønskede betalinger.
3. Import og lagring under Free-grensene skal være målt i en egen fjern-preview; FTS5 kan gjøre første import dyrere enn 47 265 rader skrevet.
4. Ekte kontotall skal bestå `free_budget_gate.py`, inkludert **alle databaser**, samlet lagring, rader og Workers-forespørsler, med rom for andre apper og misbruk.
5. Rate-limiter, av/på-bryter, offentlig schema, ingen private data og beredskap for `503`/kvotebrudd kontrolleres.
6. Først etter eksplisitt publiseringsgodkjenning kan produksjonspekere eventuelt endres. Den eksisterende statiske menyindeksen skal være enkel å rulle tilbake til.

**Viktig:** Dette gjelder bare det offentlige Fysen-arkivet. ParadisDB må få en separat sikker autentiserings- og tilgangsmodell før private data for Aha, History GO, Paradisavisa eller spill kan synkroniseres over nett. Supabase-innlogging er ikke byttet ut.
