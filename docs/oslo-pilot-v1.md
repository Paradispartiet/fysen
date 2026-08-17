# Fysen Oslo Pilot v1

## Formål

Fysen Oslo Pilot v1 skal gjøre Fysen fra en fungerende ende-til-ende demonstrasjon til et produkt som faktisk kan brukes av folk i Oslo for å finne en konkret rett de har lyst på akkurat nå.

Pilotens north star er fortsatt dish-first:

> Brukeren skriver retten. Fysen viser restauranter som kan dokumenteres å ha retten på en fersk meny nå.

Piloten skal ikke optimaliseres for flest mulig restauranter. Den skal optimaliseres for **pålitelige treff, nyttig dekning og målbar brukerintensjon**.

## Implementasjonsstatus

- Rodeo er golden live-kilde med produksjonsaktiv menyovervåkning.
- Søket har exact/prefix/contains/trigram og skiller fuzzy «nære treff» fra sikrere treff.
- Revenue funnel måler søk, impressions og attribuerte handlinger uten permanent brukerprofil.
- Resultatflaten har meny, restaurant, veibeskrivelse og verifisert booking/bestilling når slike canonical handlinger finnes.
- Rodeos førsteparts booking-side er første verifiserte `Bestill bord`-handling og re-verifiseres automatisk før den utløper.
- Avstand og nærhet er implementert med eksplisitt posisjonssamtykke, PostGIS-avstand, meter/kilometer i resultatet og valg mellom `Beste treff` og `Nærmest`.
- Presis posisjon lagres ikke i Revenue Layer search-events; koordinatene brukes i den konkrete søkeforespørselen og avrundes før søk.
- Åpningstider er implementert som en egen kildebelagt kjøkkentids-strøm med immutable snapshots, ferskhet og `open | closed | unknown` i dish search.
- En ukjent eller utdatert åpningstidskilde gir alltid `unknown`; Fysen gjetter ikke «åpent nå».
- Bredere coverage, videre dish matching og quality dashboard er neste pilotarbeid.

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

Rodeo er første produksjonsbevis og beholdes som golden live-kilde.

## Arbeidspakker

### 1. Restaurant onboarding og coverage

Bygg en eksplisitt onboardingflyt for nye kilder:

`restaurant -> kilde -> robots/sikkerhet -> første watch -> kvalitetsport -> publiserbar meny`

Ingen restaurant regnes som dekket før minst ett akseptert snapshot finnes og watcheren kan kjøre gjentatte ganger uten manuell spesialbehandling.

### 2. Dish matching v1

Søkerangeringen bygges videre fra dagens exact/prefix/contains/trigram-modell med:

- canonical dish-identitet;
- kuraterte aliaser;
- bøynings-/normaliseringsregler;
- norsk/engelsk navnevariasjon der identiteten er trygg;
- eksplisitt skille mellom sikkert rettetreff og «nære treff».

Semantisk likhet skal aldri alene gjøre en annen rett til et sikkert treff.

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
- åpningstidskilde direkte tilgjengelig fra resultatkortet.

Parseren er bevisst konservativ. En tekst som sier «late» er ikke nok til å etablere matserveringens slutt. Dersom siden oppgir en eksakt kjøkkenstenging, brukes den; ellers feiler ekstraksjonen lukket.

Rodeos førsteside er pilotens første hours-source. Den publiseres først etter at worker har hentet og parsret den reelle siden; migrasjonen legger ikke inn et manuelt hours-snapshot.

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

Booking-/ordrehandlinger er egne canonical records med kilde, verifikasjon og utløp. En utløpt handling skal ikke vises selv om URL-en fortsatt ligger i databasen.

### 6. Quality dashboard

Intern driftsoverflate skal minst vise:

- restaurant og kilde;
- siste kontroll;
- siste endring;
- antall aksepterte retter;
- consecutive failures;
- quarantine-status og årsak;
- neste kontroll;
- åpningstidskildens siste kontroll og status;
- booking-/ordrehandlingers verifikasjonsstatus;
- nulltreff/etterspørsel som peker på manglende dekning.

### 7. Demand loop

Søkeatferd brukes til å prioritere videre coverage. Fysen skal aggregere:

- normaliserte søk;
- antall treff;
- nulltreff;
- result impressions;
- klikk/konverteringshandlinger.

Første versjon skal ikke lagre IP-adresse, brukeragent, kontoidentitet eller permanent personlig profil for denne analysen.

## Kvalitetsporter

Pilotdata publiseres bare når:

- menykilden er tillatt å hente;
- fetch og parser passerer sikkerhetsportene;
- snapshotet passerer minimums- og suspicious-drop-regler;
- kilden er innenfor definert ferskhetsvindu;
- retten kan spores til konkret snapshot og kilde;
- åpningstilstand kan spores til et ferskt hours-snapshot, ellers vises `unknown`;
- kommersielle handlinger har ikke utløpt verifikasjon.

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
