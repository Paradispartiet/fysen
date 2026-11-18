# GitHub Pages – databaseuavhengig Fysen-søk

Den offentlige `fysen-preview`-siden er en statisk eksport av Fysen-webappen. Det vanlige Oslo-søket og «Alle retter» bruker nå den eksisterende kvalitetssikrede, offentlige menyindeksen, ikke PostgreSQL.

## Kilder og klienter

- **Produksjonsweb på Vercel** leser det checksum-verifiserte `fysen-free-public-index` via `getPublicMenuArchive`, og bruker `searchPublicMenuArchive` og `browseArchivedMenuDishes` for Oslo.
- **GitHub Pages-preview** bruker `browsePublicArchiveClient` og `searchPublicArchiveClient` mot `/v1/dishes/archive/browse` og `/v1/dishes/archive/search` på `fysen-api.vercel.app`. Den validerer `source: verified-menu-archive`, `realtime: false` og grunnleggende dataform før visning.
- Begge klientene viser samme arkivbaserte resultatkomponenter med restaurantnavn, rett, dokumentert pris og en lenke til den opprinnelige menykilden.
- `NEXT_PUBLIC_FYSEN_API_BASE_URL` kan overstyre API-base for preview. `NEXT_PUBLIC_FYSEN_BASE_PATH` utløser standardadressen `https://fysen-api.vercel.app` når ingen eksplisitt API-base er satt.
- En ekte tom treffliste i arkivet regnes som tom; den skal **ikke** starte et søk i den gamle databasen. Ved utilgjengelig preview-API kan forhåndsvisningen sende brukeren til produksjonsnettsiden, som leser arkivet direkte.
- Kjøkkenutforskning på forsiden bruker arkivdekning; den forsøker ikke databasesøk dersom arkivet er utilgjengelig.

## Avgrensninger og sikkerhet

- Indeksen inneholder historiske kildeobservasjoner. `lastRefreshAt` er ikke det samme som kildens `observedAt`, og ingen av dem dokumenterer tilgjengelighet i sanntid.
- Søke-API-et støtter ordinær relevans, ikke verifisert avstand eller bordtilgjengelighet. Eksplisitt avstandssortering og søk utenfor Oslo går fortsatt via den eksisterende, separate databasebaserte ruten på produksjonswebben inntil en verifisert arkivadapter finnes.
- Private funksjoner («Min mat», AHA-kobling, restaurantkrav og Fysen Pro), conversion events, autentisering og skriving forblir uendret og får **ikke** oppdiktede meny-/database-ID-er fra arkivet.
- Identitetskarantene, checksums og kildelenker skal beholdes. Ingen privat historikk, brukerdata eller PostgreSQL-dump lastes opp til offentlig dataindeks.
- Backend-, database- og serverkode publiseres ikke i preview-repoet. CORS er begrenset til forventede origins; dette endres ikke her.
- Dette er **ikke** et vedtak om migrering av database, oppgradering av Supabase, endring av secrets eller sletting av opprinnelig historikk.

## Kontroll før produksjon

1. Kjør webens typecheck, test og build i PR.
2. Test Oslo-søk med treff, uten treff og med identitetskarantene, samt «Alle retter» og Matlyst på mobil og nettbrett.
3. Kontroller at GitHub Pages faktisk bruker `/archive/search` og `/archive/browse`, og at nettsiden ikke kaller ordinært PostgreSQL-søk i arkivmodus.
4. Kontroller at eksplisitt avstandssortering ikke later som om arkivet gir koordinater.
5. Hold produksjon og Supabase-konfigurasjon uendret til egen utrullingsbeslutning.

Se også [Fysens kostnadsfrie driftsplan](fysen-zero-cost-operating-plan-2026-11-12.md) og [historikkarkivet](fysen-storage-readonly-recovery-2026-11-02.md).
