# Fysen Oslo Pilot v1

## Formål

Fysen Oslo Pilot v1 skal gjøre Fysen fra en fungerende ende-til-ende demonstrasjon til et produkt som faktisk kan brukes av folk i Oslo for å finne en konkret rett de har lyst på akkurat nå.

Pilotens north star er fortsatt dish-first:

> Brukeren skriver retten. Fysen viser restauranter som kan dokumenteres å ha retten på en fersk meny nå.

Piloten skal ikke optimaliseres for flest mulig restauranter. Den skal optimaliseres for **pålitelige treff, nyttig dekning og målbar brukerintensjon**.

## Implementasjonsstatus

- Rodeo er golden live-kilde med produksjonsaktiv menyovervåkning: 16 aktuelle retter, healthy kjøkkentider og verifisert booking.
- Way Down South er produksjonsgodkjent med 20 retter, to aksepterte watches, healthy kjøkkentider og verifisert booking.
- Hrimnir Ramen Storgata beviser shared-section-price og branch-scoped hours: 12 aktuelle retter, eksplisitt fellespris på 260 kr, 7 healthy kjøkkenintervaller og verifisert booking.
- Olivia Aker Brygge beviser PDF-meny som produksjonskilde: 53 aktuelle retter, separat voksen- og barnevariant av Pasta carbonara, 7 healthy kjøkkenintervaller og verifisert booking. PDF-parseroppgraderinger er fail-closed og tvinger ny ekstraksjon før en stale parser får fortsette å være publisert.
- Mathus Chicken på Vestli er første produksjonsverifiserte `order`-destinasjon og første ytre-øst-kilde i katalogen: 89 aktuelle retter, to aksepterte watches, verifisert bestill-mat-handling og 7 healthy kjøkkenintervaller.
- Roll Sushi Majorstua er første produksjonsbevis for strukturert `json_ld`: 76 aktuelle retter, `confidence: 0.99` på item-nivå, eksplisitte prisassertions, verifisert `order` og 7 kjøkkenintervaller. Rå HTTP og Chromium ga samme 76 JSON-LD-items, så produksjonen bruker den billigere og sikrere HTTP-kilden i stedet for browser.
- Lahori Dera Tandoori på Grønland er produksjonsaktiv som første pakistanske/Grønland-kilde. Den passerte 30+-minimum, fem eksplisitte navn/priser, to aksepterte menu-watches, verifisert `order` og 7 kjøkkenintervaller. Offentlig API viser blant annet `Lahori Lam Karahi Fresh` som exact til 209 kr med fersk meny og åpningstilstand.
- Den aktive produksjonskatalogen har nå **7 restauranter**. De seks foregående, eksplisitt dokumenterte snapshot-tallene summerte til 266 retter; Lahori er i tillegg produksjonsaktiv, men eksakt samlet item-count skal hentes fra fersk Quality Dashboard-artifact i stedet for å hardkodes fra kildeantakelser.
- Nye coverage-kandidater registreres som `active=false` og blir ikke søkbare før to aksepterte menywatches, minimumskrav, eksplisitte dish/pris-assertions, deklarerte kommersielle handlinger og første kjøkkentids-watch er bestått.
- Mislykkede kandidater som var inaktive ved onboardingstart går nå i operativ dvale: menu-, hours- og action-kilder deaktiveres slik at de ikke fortsetter som due/reverification-trafikk. Snapshot- og watch-historikken beholdes, og en senere eksplisitt onboarding kan reaktivere kandidaten kontrollert.
- Browser-fetch finnes som eksplisitt `fetch_mode=browser` med system-Chrome, offentlig-IP-validering, service-worker-blokkering, request-/DOM-grenser og fail-closed origin-policy. Det brukes aldri som automatisk fallback. Ingen produksjonsrestaurant trenger browser-mode ennå: Tunco/Ninito ble avvist fordi canonical Ninito-kilde forbød Fysen i `robots.txt`, mens Hos Victoria/Wix viste en for tung multi-origin-rendering til å være et godt første produksjonscase.
- HTML-ekstraksjonen støtter norske prisformater som `kr 70,00` uten å senke den etablerte sikkerhetsgrensen for plausible menypriser.
- Åpningstidsparseren støtter norske ukedagsforkortelser/ranges og 12-timers klokke med `am/pm`. Når en side har flere ulabelede opening-hours-blokker, kan parseren velge én bare dersom nøyaktig én blokk inneholder en gyldig standard ukeplan; flere parsebare blokker forblir tvetydige og feiler lukket.
- Søket har exact/prefix/contains/trigram og kuraterte canonical-konsepter. Quality Dashboard replay-er historiske fuzzy- og nulltreff mot dagens ferske, søkbare indeks før de brukes som arbeidskø.
- Siste dokumenterte replay viste **0 uløste fuzzy-signaler**: `shoyu ramen` og `chicken ceasar burger` løses som `exact`, mens `biff tartar` løses som `canonical`.
- Siste dokumenterte replay viste **1 historisk nulltreff, men 0 uløste nulltreff**: `carbonara` beholdes som historisk etterspørselsdata, men Olivia-indeksen løser søket sikkert som `contains` via `Pasta carbonara`.
- Revenue funnel måler ekte brukersøk, impressions og attribuerte handlinger uten permanent brukerprofil.
- Produksjons-QA har en separat, intern GitHub Actions-smoke som kjører `searchDishes` direkte mot production DB og aldri kaller `recordSearchFunnel`. QA-søk skal derfor ikke forurense fuzzy-/nulltreff-/coverage-signaler.
- Resultatflaten har meny, restaurant, veibeskrivelse og verifisert booking/bestilling når slike canonical handlinger finnes.
- Avstand og nærhet er implementert med eksplisitt posisjonssamtykke, PostGIS-avstand, meter/kilometer i resultatet og valg mellom `Beste treff` og `Nærmest`.
- Presis posisjon lagres ikke i Revenue Layer search-events; koordinatene brukes i den konkrete søkeforespørselen og avrundes før søk.
- Åpningstider er en egen kildebelagt kjøkkentids-strøm med immutable snapshots, ferskhet og `open | closed | unknown` i dish search.
- En ukjent eller utdatert åpningstidskilde gir alltid `unknown`; Fysen gjetter ikke «åpent nå».
- Multi-branch hours bruker source-URL og canonical restaurantidentitet som eksplisitte scope-hints og feiler lukket dersom én avdeling ikke kan bestemmes entydig.
- Quality Dashboard v1 er en privat GitHub Actions-driftsoverflate med lesbar job summary og maskinlesbar JSON-artifact etter produksjonswatch.
- Fordi siste dokumenterte demand-review ikke hadde uløste fuzzy- eller coverage-signaler, skal neste pilotutvidelse velges ut fra representativ Oslo-dekning, kildetyper og faktisk ny etterspørsel — ikke historiske problemer som allerede er løst.

## Produktmål

Ved avslutning av Oslo Pilot v1 skal Fysen kunne:

1. indeksere et representativt sett Oslo-restauranter med flere menykildetyper;
2. forstå vanlige skrivemåter, aliaser og moderate stavefeil uten å dikte opp rettelikhet;
3. vise avstand fra brukeren og støtte nærhetsrangering;
4. vise åpningstilstand når den er kildebelagt og fersk;
5. vise rett, pris, restaurant, avstand, åpent/stengt, menyferskhet og kilde i én tydelig resultatflate;
6. gjøre det lett å gå videre til meny, restaurant, veibeskrivelse, booking eller bestilling når slike handlinger finnes;
7. gi intern oversikt over crawlerhelse, kildeferskhet, quarantine og dekning;
8. måle hvilke retter brukerne faktisk søker etter, hvilke søk som gir null treff og hvilke treff som fører til handling — uten at interne QA-søk blandes inn i etterspørselsdataene.

## Pilotdekning

Dekningen skal bygges kvalitativt, ikke som en vilkårlig tallkvote. Restaurantene velges slik at piloten tester:

- ulike bydeler i Oslo;
- ulike prisnivåer;
- ulike kjøkken og rettetyper;
- vanlige HTML-menyer;
- JSON-LD der det finnes;
- PDF-menyer;
- mer krevende JavaScript-baserte kilder der Playwright/browser-fetch faktisk er nødvendig og tillatt;
- restauranter med og uten direkte booking-/bestillingslenker.

Rodeo er golden live-kilde. Way Down South beviser den generelle onboardingporten. Hrimnir Ramen Storgata beviser felles seksjonspris, kjedeside-scope og canonical branch-hints uten restaurantspesialkode i søket. Olivia Aker Brygge beviser bounded PDF-fetch, tekstbasert PDF-ekstraksjon og fail-closed parseroppgradering. Mathus Chicken beviser norsk desimalprisformat, forkortede ukedagsintervaller, ytre-øst-dekning og verifisert `order`-handling. Roll Sushi Majorstua beviser item-level JSON-LD via vanlig sikker HTTP og viser at browser ikke skal brukes når råkilden allerede gir samme strukturerte menydata. Lahori Dera Tandoori beviser Grønland-/pakistansk-dekning, en komplett førstegangs-HTML-meny, 12-timers åpningstider og verifisert first-party `order` uten restaurantspesialkode.

Browser-foundationen er bygget og produksjonsmigrert, men et browser-case teller først som produksjonsbevis når en konkret tillatt kilde faktisk trenger rendering. Tunco/Ninito ble korrekt avvist av robots-porten, og Hos Victoria/Wix ble ikke valgt fordi en diagnose krevde flere Wix-origins og mer enn standard request-grense før menyen kunne evalueres.

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
- kandidatfeil skjer etter vedlikehold av eksisterende menu/hours/actions, så en ny dårlig kilde kan ikke hindre produksjonsvedlikeholdet for godkjente restauranter;
- en mislykket kandidat som var inaktiv ved start får sine operative menu-, hours- og action-kilder deaktivert etter feilen; historikken beholdes, mens en senere eksplisitt retry kan reaktivere kildene gjennom den normale onboardingflyten;
- allerede publiserte restauranter er ikke omfattet av kandidat-dvale og beholder egne refresh/recovery-regler.

Way Down South var første generelle produksjonsbevis: 20 retter ble hentet, andre watch var uendret, alle obligatoriske dish-assertions ble funnet og restauranten ble deretter åpnet for søk.

Hrimnir Ramen Storgata beviste shared-price-parseren: første watch publiserte 12 konkrete retter, andre watch bekreftet samme kilde, booking ble verifisert og den eksplisitte seksjonsprisen ble knyttet til konkrete ramen-retter i stedet for å publisere en falsk generisk «Ramen»-rett.

Olivia Aker Brygge beviste PDF-løpet. En reell beskrivelsesgrensefeil ble fanget etter første produksjonskjøring. `pdf-text-v2` rettet grensen, extractor-versjonen ble gjort reindekserbar selv ved conditional HTTP, og aktive restauranter med stale extractor deaktiveres midlertidig og må bestå to nye watches før reaktivering.

Mathus Chicken beviste den strengere full-gaten i én produksjonskjøring: første menu-watch ga 89 retter, andre watch bekreftet samme 89, alle obligatoriske dish/pris-assertions passerte, `order` ble verifisert og første hours-watch publiserte 7 intervaller før `active=true`.

Roll Sushi Majorstua beviste samme full-gate med en annen kildetype: rå HTTP ga 76 `json_ld`-items, minimum 70 og fem eksplisitte navn/priser passerte, andre watch bekreftet kilden, `order` ble verifisert og hours-porten passerte før aktivering. Offentlig produksjons-API viser blant annet `43. Crispy Scampi 12 biter` til 169 kr og `Roll's Nigiri 2 stk` til 49 kr som exact-treff med `confidence: 0.99`.

Lahori Dera Tandoori passerte full-gaten etter at et generisk hours-gap ble rettet i `hours-visible-v7`. Kilden måtte ha minst 30 retter og inneholde `Kylling Tikka Masala` 209 kr, `Lahori Lam Karahi Fresh` 209 kr, `Chapli Kebab` 194 kr, `Saag Paneer` 169 kr og `Mix Grill` 379 kr. Først etter to menu-watches, same-origin order-verifikasjon og 7 parsebare AM/PM-hours ble Grønland-kilden aktivert.

### 2. Dish matching v1

Søkerangeringen bygges videre fra dagens exact/prefix/contains/trigram-modell med:

- canonical dish-identitet;
- kuraterte aliaser;
- bøynings-/normaliseringsregler;
- norsk/engelsk navnevariasjon der identiteten er trygg;
- eksplisitt skille mellom sikkert rettetreff og «nære treff».

Semantisk likhet skal aldri alene gjøre en annen rett til et sikkert treff.

De første canonical-konseptene er etablert for `beef-tartare` og `chicken-caesar-burger`, med kuraterte query- og menyaliaser. Historiske fuzzy impressions beholdes som etterspørsels- og kvalitetsdata, men Quality Dashboard replay-er dem mot dagens ferske indeks før de sendes til manuell review. Replay bruker bare `exact -> canonical -> prefix -> contains` som sikre løsningsnivåer; fuzzy kan aldri markere et problem som løst.

Siste dokumenterte produksjonsbevis hadde 10 historiske fuzzy impressions, men **ingen uløste fuzzy-signaler**: `shoyu ramen -> exact`, `chicken ceasar burger -> exact` og `biff tartar -> canonical`. Det betyr at neste aliasarbeid ikke skal opprettes fra disse radene. Nye canonical aliases krever et fortsatt reproducerbart gap i dagens indeks og manuell kuratering.

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
- norske ukedagsforkortelser og ranges, blant annet `Man–Tor`, `Fre–Lør`, `Søn` og `Man - Søn`;
- sikker 12-timers klokke med `am/pm`, inkludert korrekt `12am -> 00:00` og `12pm -> 12:00`;
- fail-closed håndtering av dupliserte ulabelede opening-hours-blokker: én unik parsebar blokk kan velges, mens flere parsebare blokker forblir tvetydige.

Parseren er bevisst konservativ. En tekst som sier «late» er ikke nok til å etablere matserveringens slutt. Dersom siden oppgir en eksakt kjøkkenstenging, brukes den; ellers feiler ekstraksjonen lukket. Dersom en kjedeside inneholder flere åpningstidsseksjoner, må nøyaktig én avdeling kunne bestemmes fra canonical scope-hints, sideidentitet eller en unik parsebar standardplan; ellers publiseres ingen åpningstilstand.

Rodeo og Way Down South har fem healthy kjøkkenintervaller hver. Hrimnir Ramen Storgata, Olivia Aker Brygge, Mathus Chicken, Roll Sushi Majorstua og Lahori Dera har syv hver. Hrimnir ble publisert etter at en reell multi-branch scope-feil først ble fanget som `AMBIGUOUS_HOURS_SECTION`; Mathus, Roll Sushi og Lahori ble ikke aktivert før første 7-intervalls-watch var grønn.

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

Booking-/ordrehandlinger er egne canonical records med kilde, verifikasjon og utløp. En utløpt handling skal ikke vises selv om URL-en fortsatt ligger i databasen. Mathus Chicken var første produksjonsbevis på den canonical `order`-handlingen; Roll Sushi Majorstua er andre live `order`-kilde og første som kombinerer den med JSON-LD-meny; Lahori Dera er tredje og beviser first-party shop på Grønland.

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
- canonical concepts og fuzzy-history med separat current-index resolution;
- historiske nulltreff og separat antall/nulltreff som fortsatt er uløst i dagens indeks;
- egne seksjoner for «til manuell vurdering» og «historisk løst» i både fuzzy- og coverage-review;
- en lesbar GitHub Actions Summary og JSON-artifact med 14 dagers retention.

Replay er byspesifikk og bruker bare ferske snapshots fra aktive restauranter og enabled menykilder. `exact`, kuratert `canonical`, `prefix` og `contains` kan løse et historisk signal; fuzzy alene kan ikke gjøre det.

Rapporten beholder Revenue Layers dataminimering: ingen IP-adresser, user-agent, konto-ID eller permanent brukerprofil tilføres.

Den aktive produksjonskatalogen består nå av 7 restauranter. Roll Sushi står offentlig med fersk JSON-LD-meny, `confidence: 0.99`, healthy opening-state og verifisert `order`; Lahori Dera står offentlig med exact 209-kroners Lam Karahi-treff, fersk opening-state og verifisert `order`. Eksakt samlet rettetall er dashboard-eid og skal ikke utledes fra kildeantall når ferskt artifact ikke er lest.

### 7. Demand loop

Søkeatferd brukes til å prioritere videre coverage og matching. Fysen aggregerer:

- normaliserte søk;
- antall treff;
- nulltreff;
- result impressions;
- match type;
- klikk/konverteringshandlinger.

Historikk og aktiv arbeidskø er bevisst skilt. Et fuzzy impression eller nulltreff blir ikke slettet når produktet senere forbedres. I stedet replayes signalet mot dagens ferske indeks:

- historisk fuzzy med sikkert treff flyttes ut av alias-review;
- historisk nulltreff med sikkert treff flyttes ut av coverage-review;
- fuzzy alene kan aldri markere et signal som løst;
- bare signaler som fortsatt er uløste i samme by prioriteres som aktive gap.

Siste dokumenterte produksjonsdashboard hadde tre historiske fuzzy-grupper som alle var løst (`shoyu ramen -> exact`, `chicken ceasar burger -> exact`, `biff tartar -> canonical`) og ett historisk nulltreff (`carbonara`) som ble løst som `contains`. Den aktive review-køen var dermed tom på begge dimensjoner. Nye produksjons-QA-søk skal ikke blandes inn i denne arbeidskøen: de kjøres gjennom intern non-recording smoke.

Første versjon lagrer ikke IP-adresse, brukeragent, kontoidentitet eller permanent personlig profil for denne analysen.

## Deploy- og produksjonsgate

Database- og watcher-kjeden har eksplisitte GitHub Actions-porter, men offentlig API og web må i tillegg være på en Vercel-production deployment som er konsistent med den aktuelle `main`-kontrakten.

Et produktsteg regnes derfor ikke som fullført offentlig før:

- `main` CI er grønn;
- produksjonsdatabasen er verifisert og eventuelle migrasjoner er anvendt;
- produksjonswatcheren er grønn og eventuelle nye kilder har canonical snapshots;
- Quality Dashboard er grønt uten uavklarte coverage-feil;
- intern production-search-smoke kan bekrefte aktuelle data uten å skrive Revenue-events når en slik smoke er nødvendig;
- `fysen-api` production svarer med den forventede aktuelle responskontrakten;
- `fysen` production rendrer samme kontrakt uten rolling-deploy-skjevhet.

Vercel-preview er nyttig som buildbevis, men teller ikke som offentlig produksjonsbevis. Hvis Git-integrasjonen stopper på build-rate-limit, skal eksisterende production beholdes fungerende og deploy-avviket behandles eksplisitt i stedet for å late som ny funksjonalitet er offentlig.

Offentlige API-søk skal ikke brukes som normal intern QA-loop fordi de med hensikt registrerer ekte search/impression-events. De brukes bare når selve den offentlige brukerflaten må bevises. Gjentatt intern QA går via den private GitHub Actions-smoken som leser production search-data direkte.

## Kvalitetsporter

Pilotdata publiseres bare når:

- menykilden er tillatt å hente;
- fetch og parser passerer sikkerhetsportene;
- snapshotet passerer minimums- og suspicious-drop-regler;
- onboardingkandidaten har passert to aksepterte menu-watches og sine dish/pris-assertions;
- deklarert booking/order er verifisert og ikke utløpt;
- en ny kandidat med hours-kilde har bestått første hours-watch og minimumsintervallene før `active=true`;
- en mislykket inaktiv kandidat har fått operative menu-/hours-/action-kilder deaktivert før neste ordinære due/reverification-runde;
- en eksplisitt `json_ld`-kilde faktisk ekstraheres som `json_ld` og ikke faller skjult tilbake til heuristisk HTML;
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

Piloten er vellykket når en ny bruker i Oslo kan åpne Fysen, søke en konkret rett og få et **troverdig, ferskt og handlingsklart resultat**, samtidig som vi kan måle hvilke ekte brukersøk som skaper etterspørsel og hvilke restauranttreff som faktisk sender brukeren videre.

Revenue- og konverteringsdelen av piloten er spesifisert i [`revenue-layer-v1.md`](./revenue-layer-v1.md).
