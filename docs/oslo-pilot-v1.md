# Fysen Oslo Pilot v1

## Formål

Fysen Oslo Pilot v1 skal gjøre Fysen fra en fungerende ende-til-ende demonstrasjon til et produkt som faktisk kan brukes av folk i Oslo for å finne en konkret rett de har lyst på akkurat nå.

Pilotens north star er fortsatt dish-first:

> Brukeren skriver retten. Fysen viser restauranter som kan dokumenteres å ha retten på en fersk meny nå.

Piloten skal ikke optimaliseres for flest mulig restauranter. Den skal optimaliseres for **pålitelige treff, nyttig dekning og målbar brukerintensjon**.

## Implementasjonsstatus

- Rodeo er golden live-kilde med produksjonsaktiv menyovervåkning: 16 aktuelle retter, healthy kjøkkentider og verifisert booking.
- Way Down South er andre produksjonsgodkjente Oslo-restaurant og første bevis på den generelle onboardingporten: 20 retter, to aksepterte watches, healthy kjøkkentider og verifisert booking.
- Hrimnir Ramen Storgata beviser shared-section-price og branch-scoped hours: 12 aktuelle retter, eksplisitt fellespris på 260 kr, 7 healthy kjøkkenintervaller og verifisert booking.
- Olivia Aker Brygge beviser PDF-meny som produksjonskilde: 53 aktuelle retter, separat voksen- og barnevariant av Pasta carbonara, 7 healthy kjøkkenintervaller og verifisert booking. PDF-parseroppgraderinger er fail-closed og tvinger ny ekstraksjon før en stale parser får fortsette å være publisert.
- Mathus Chicken på Vestli er første produksjonsverifiserte `order`-destinasjon og første ytre-øst-kilde i katalogen: 89 aktuelle retter, to aksepterte watches, verifisert bestill-mat-handling og 7 healthy kjøkkenintervaller.
- Siste produksjonsdashboard viser **5 aktive restauranter, 5/5 healthy menykilder, 190 aktuelle retter, 0 candidate-restauranter og 0 degraded menykilder**.
- Nye coverage-kandidater registreres som `active=false` og blir ikke søkbare før to aksepterte menywatches, minimumskrav, eksplisitte dish/pris-assertions, deklarerte kommersielle handlinger og første kjøkkentids-watch er bestått.
- HTML-ekstraksjonen støtter nå også norske prisformater som `kr 70,00` uten å senke den etablerte sikkerhetsgrensen for plausible menypriser. Åpningstidsparseren støtter norske ukedagsforkortelser som `Man - Søn`.
- Søket har exact/prefix/contains/trigram og skiller fuzzy «nære treff» fra sikrere treff. Canonical matching har kuraterte konsepter for blant annet Biff tartar og Chicken Caesar Burger, men fuzzy-review-signalet viser at `shoyu ramen` er neste tydelige matching-gap.
- Revenue funnel måler søk, impressions og attribuerte handlinger uten permanent brukerprofil.
- Resultatflaten har meny, restaurant, veibeskrivelse og verifisert booking/bestilling når slike canonical handlinger finnes.
- Avstand og nærhet er implementert med eksplisitt posisjonssamtykke, PostGIS-avstand, meter/kilometer i resultatet og valg mellom `Beste treff` og `Nærmest`.
- Presis posisjon lagres ikke i Revenue Layer search-events; koordinatene brukes i den konkrete søkeforespørselen og avrundes før søk.
- Åpningstider er implementert som en egen kildebelagt kjøkkentids-strøm med immutable snapshots, ferskhet og `open | closed | unknown` i dish search.
- En ukjent eller utdatert åpningstidskilde gir alltid `unknown`; Fysen gjetter ikke «åpent nå».
- Multi-branch hours bruker source-URL og canonical restaurantidentitet som eksplisitte scope-hints og feiler fortsatt lukket dersom én avdeling ikke kan bestemmes entydig.
- Quality Dashboard v1 er en privat GitHub Actions-driftsoverflate med lesbar job summary og maskinlesbar JSON-artifact etter produksjonswatch.
- Videre dish matching/canonical aliases og bredere representativ Oslo-coverage er neste pilotarbeid.

## Produktmål

Ved avslutning av Oslo Pilot v1 skal Fysen kunne:

1. indeksere et representativt sett Oslo-restauranter med flere menykildetyper;
2. forstå vanlige skrivemåter, aliaser og moderate stavefeil uten å dikte opp rettelikhet;
3. vise avstand fra brukeren og støtte nærhetsrangering;
4. vise åpningstilstand når den er kildebelagt og fersk;
5. vise rett, pris, restaurant, avstand, åpent/stengt, menyferskhet og kilde i én tydelig resultatflate;
6. gjøre det lett å gå videre til meny, restaurant, veibeskrivelse, booking eller bestilling når slike handlinger finnes;
7. gi intern oversikt over crawlerhelse, kildeferskhet, quarantine og dekning;
8. måle hvilke retter brukerne søker etter, hvilke søk som gir null treff og hvilke treff som fører til handling.

## Pilotdekning

Dekningen skal bygges kvalitativt, ikke som en vilkårlig tallkvote. Restaurantene velges slik at piloten tester:

- ulike bydeler i Oslo;
- ulike prisnivåer;
- ulike kjøkken og rettetyper;
- vanlige HTML-menyer;
- JSON-LD der det finnes;
- PDF-menyer;
- mer krevende JavaScript-baserte kilder der Playwright-fallback faktisk er nødvendig;
- restauranter med og uten direkte booking-/bestillingslenker.

Rodeo er golden live-kilde. Way Down South beviser den generelle onboardingporten. Hrimnir Ramen Storgata beviser felles seksjonspris, kjedeside-scope og canonical branch-hints uten restaurantspesialkode i søket. Olivia Aker Brygge beviser bounded PDF-fetch, tekstbasert PDF-ekstraksjon og fail-closed parseroppgradering. Mathus Chicken beviser norsk desimalprisformat, forkortede ukedagsintervaller, ytre-øst-dekning og verifisert `order`-handling.

## Arbeidspakker

### 1. Restaurant onboarding og coverage — implementert

Onboardingflyten er eksplisitt og manifestbasert:

`candidate manifest -> active=false -> kilde -> robots/sikkerhet -> første watch -> minimum + dish/pris assertions -> andre watch -> action-verifikasjon -> første hours-watch + minimum -> active=true`

Det betyr:

- en kandidat kan ha lagrede snapshots uten å være søkbar;
- første watch må være `changed`, `unchanged` eller `not_modified`;
- siste accepted snapshot må ha minst manifestets minimum antall retter;
- konkrete, normaliserte dish smoke-assertions og eventuelle prisassertions må finnes i snapshotet;
- en andre watch må også passere for å bevise gjentakbarhet;
- deklarert booking/order verifiseres mot sin canonical førstepartskilde;
- når kandidaten har hours-kilde, må første eksplisitte hours-watch passere før aktivering; manifestets minimumsintervaller håndheves av hours-laget;
- først deretter åpnes coverage-gaten ved å sette restauranten aktiv;
- kandidatfeil skjer etter vedlikehold av eksisterende menu/hours/actions, så en ny dårlig kilde kan ikke hindre produksjonsvedlikeholdet for godkjente restauranter.

Way Down South var første generelle produksjonsbevis: 20 retter ble hentet, andre watch var uendret, alle obligatoriske dish-assertions ble funnet og restauranten ble deretter åpnet for søk.

Hrimnir Ramen Storgata beviste shared-price-parseren: første watch publiserte 12 konkrete retter, andre watch bekreftet samme kilde, booking ble verifisert og den eksplisitte seksjonsprisen ble knyttet til konkrete ramen-retter i stedet for å publisere en falsk generisk «Ramen»-rett.

Olivia Aker Brygge beviste PDF-løpet. En reell beskrivelsesgrensefeil ble fanget etter første produksjonskjøring. `pdf-text-v2` rettet grensen, extractor-versjonen ble gjort reindekserbar selv ved conditional HTTP, og aktive restauranter med stale extractor deaktiveres midlertidig og må bestå to nye watches før reaktivering.

Mathus Chicken beviste den strengere full-gaten i én produksjonskjøring: første menu-watch ga 89 retter, andre watch bekreftet samme 89, alle obligatoriske dish/pris-assertions passerte, `order` ble verifisert og første hours-watch publiserte 7 intervaller før `active=true`.

### 2. Dish matching v1

Søkerangeringen bygges videre fra dagens exact/prefix/contains/trigram-modell med:

- canonical dish-identitet;
- kuraterte aliaser;
- bøynings-/normaliseringsregler;
- norsk/engelsk navnevariasjon der identiteten er trygg;
- eksplisitt skille mellom sikkert rettetreff og «nære treff».

Semantisk likhet skal aldri alene gjøre en annen rett til et sikkert treff.

De første canonical-konseptene er etablert for `beef-tartare` og `chicken-caesar-burger`, med kuraterte query- og menyaliaser. Quality Dashboard viser fortsatt 0 canonical impressions i det målte 7-dagersvinduet, mens `shoyu ramen` er største fuzzy-review-signal med 3 søk og 6 fuzzy impressions. Neste matchingport skal derfor ta utgangspunkt i denne faktiske etterspørselen, ikke opprette aliaser automatisk fra fuzzy-data.

### 3. Avstand og nærhet — implementert

PostGIS brukes nå som aktiv domeneinfrastruktur. Leveransen støtter:

- brukerposisjon kun etter eksplisitt knappetrykk/samtykke;
- koordinater avrundet til fire desimaler før søk;
- avstand i meter/kilometer via `ST_Distance` på geography-punkter;
- `Beste treff`, der matchrelevans fortsatt er primær og avstand kan bryte likhet;
- `Nærmest`, der avstand rangerer treffene;
- mulighet til å fjerne posisjonen igjen;
- ingen lagring av koordinater i Revenue Layer search-events.

### 4. Åpningstider — implementert

Åpningstider er en egen kildebelagt datastrøm for **kjøkkenets serveringstid**, fordi det er dette som avgjør om et dish-treff faktisk kan spises nå.

Implementasjonen har:

- `restaurant_hours_sources` med kilde-URL, IANA-tidssone, extractor, kontrollintervall og operativ status;
- immutable `restaurant_hours_snapshots` uten lagring av rå HTML;
- canonical ukedagsintervaller i `restaurant_hours_intervals`;
- `restaurant_hours_watch_runs` for suksess, feil og quarantine;
- conditional HTTP, fingerprint og automatisk ny kontroll gjennom eksisterende sikre worker;
- minimumsregel og suspicious-collapse quarantine før nye tider publiseres;
- `open`, `closed` og `unknown` som eksplisitte API-tilstander;
- rolling-deploy-safe default til `unknown` for eldre API-responser;
- åpningstidskilde direkte tilgjengelig fra resultatkortet;
- canonical restaurantnavn/slug og source-URL som scope-hints på multi-branch kilder;
- umiddelbar requeue ved onboarding når en hours-kilde aldri har hatt en vellykket kontroll;
- eksplisitt single-source-watch som kan kjøres inne i onboarding før en ny restaurant blir aktiv;
- norske ukedagsforkortelser, blant annet `Man - Søn`, i den canonical ukeparseren.

Parseren er bevisst konservativ. En tekst som sier «late» er ikke nok til å etablere matserveringens slutt. Dersom siden oppgir en eksakt kjøkkenstenging, brukes den; ellers feiler ekstraksjonen lukket. Dersom en kjedeside inneholder flere åpningstidsseksjoner, må nøyaktig én avdeling kunne bestemmes fra canonical scope-hints eller sideidentitet; ellers publiseres ingen åpningstilstand.

Rodeo og Way Down South har fem healthy kjøkkenintervaller hver. Hrimnir Ramen Storgata, Olivia Aker Brygge og Mathus Chicken har syv hver. Hrimnir ble publisert etter at en reell multi-branch scope-feil først ble fanget som `AMBIGUOUS_HOURS_SECTION`; Mathus ble ikke aktivert før første 7-intervalls-watch var grønn.

### 5. Resultatflate

Et ordinært treff skal kunne vise:

`rett -> pris -> restaurant -> avstand -> åpent/stengt -> ferskhet -> handlinger -> kilde`

Første handlinger er:

- se meny;
- åpningstidskilde;
- restaurantens nettside;
- veibeskrivelse;
- bestill bord, når verifisert booking-URL finnes;
- bestill mat, når verifisert ordre-URL finnes.

Booking-/ordrehandlinger er egne canonical records med kilde, verifikasjon og utløp. En utløpt handling skal ikke vises selv om URL-en fortsatt ligger i databasen. Mathus Chicken er første produksjonsbevis på den canonical `order`-handlingen.

### 6. Quality dashboard — implementert

Den interne driftsoverflaten ligger i det private GitHub-repoet og genereres etter produksjonswatch. Den eksponeres ikke som en ubeskyttet offentlig adminside.

Rapporten leverer:

- restaurant og publiserings-/candidate-status;
- alle menykilder med `healthy | degraded | stale | unverified | disabled`;
- siste kontroll, siste endring, ferskhetsvindu og neste kontroll;
- antall retter i siste snapshot;
- consecutive failures, siste watcher-outcome og error code/quarantine;
- hours-kildens helse, intervalltall og siste feil;
- booking-/ordrehandlingers `verified | expiring | expired | disabled`;
- impressions og conversions siste 7 dager per restaurant;
- matching-fordeling på exact/canonical/prefix/contains/fuzzy;
- canonical concepts og fuzzy queries til manuell vurdering;
- toppliste over normaliserte nulltreff siste 7 dager som signal for videre coverage;
- en lesbar GitHub Actions Summary og JSON-artifact med 14 dagers retention.

Rapporten beholder Revenue Layers dataminimering: ingen IP-adresser, user-agent, konto-ID eller permanent brukerprofil tilføres.

Siste produksjonsbevis etter Mathus-onboarding viser 5 aktive restauranter, 190 aktuelle retter, 5 healthy menykilder, 0 degraded menykilder og healthy hours for alle fem. Mathus står med 89 retter, 7 intervaller, 0 consecutive failures og verifisert `order`.

### 7. Demand loop

Søkeatferd brukes til å prioritere videre coverage og matching. Fysen aggregerer:

- normaliserte søk;
- antall treff;
- nulltreff;
- result impressions;
- match type;
- klikk/konverteringshandlinger.

Fuzzy-listen er bare et review-signal. Den oppretter aldri aliaser automatisk. Siste dashboard peker konkret på `shoyu ramen` som neste matching-review, mens nulltrefflisten har ett eldre `carbonara`-nulltreff fra før Olivia-dekningen kom på plass.

Første versjon lagrer ikke IP-adresse, brukeragent, kontoidentitet eller permanent personlig profil for denne analysen.

## Deploy- og produksjonsgate

Database- og watcher-kjeden har eksplisitte GitHub Actions-porter, men offentlig API og web må i tillegg være på en Vercel-production deployment som er konsistent med den aktuelle `main`-kontrakten.

Et produktsteg regnes derfor ikke som fullført offentlig før:

- `main` CI er grønn;
- produksjonsdatabasen er verifisert og eventuelle migrasjoner er anvendt;
- produksjonswatcheren er grønn og eventuelle nye kilder har canonical snapshots;
- Quality Dashboard er grønt uten uavklarte coverage-feil;
- `fysen-api` production svarer med den forventede aktuelle responskontrakten;
- `fysen` production rendrer samme kontrakt uten rolling-deploy-skjevhet.

Vercel-preview er nyttig som buildbevis, men teller ikke som offentlig produksjonsbevis. Hvis Git-integrasjonen stopper på build-rate-limit, skal eksisterende production beholdes fungerende og deploy-avviket behandles eksplisitt i stedet for å late som ny funksjonalitet er offentlig.

## Kvalitetsporter

Pilotdata publiseres bare når:

- menykilden er tillatt å hente;
- fetch og parser passerer sikkerhetsportene;
- snapshotet passerer minimums- og suspicious-drop-regler;
- onboardingkandidaten har passert to aksepterte menu-watches og sine dish/pris-assertions;
- deklarert booking/order er verifisert og ikke utløpt;
- en ny kandidat med hours-kilde har bestått første hours-watch og minimumsintervallene før `active=true`;
- kilden er innenfor definert ferskhetsvindu;
- retten kan spores til konkret snapshot og kilde;
- åpningstilstand kan spores til et ferskt hours-snapshot, ellers vises `unknown`.

False positives er fortsatt dyrere enn false negatives.

## Ikke i Oslo Pilot v1

Følgende er bevisst utsatt:

- native iOS/Android-app;
- brukerkonto som krav for søk;
- anmeldelser og stjerner som primær rangering;
- AI-chat som søkegrensesnitt;
- personalisert feed;
- lojalitetsprogram;
- landsdekkende skalering før Oslo-modellen er bevist.

## Suksesskriterium

Piloten er vellykket når en ny bruker i Oslo kan åpne Fysen, søke en konkret rett og få et **troverdig, ferskt og handlingsklart resultat**, samtidig som vi kan måle hvilke søk som skaper etterspørsel og hvilke restauranttreff som faktisk sender brukeren videre.

Revenue- og konverteringsdelen av piloten er spesifisert i [`revenue-layer-v1.md`](./revenue-layer-v1.md).
