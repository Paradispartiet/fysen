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
- Resultatflaten har meny, restaurant, veibeskrivelse og nå verifisert booking/bestilling når slike canonical handlinger finnes.
- Rodeos førsteparts booking-side er første verifiserte `Bestill bord`-handling og re-verifiseres automatisk før den utløper.
- Avstand fra bruker, åpningstider, bredere coverage og quality dashboard er neste pilotarbeid.

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

### 3. Avstand og nærhet

PostGIS skal brukes som domeneinfrastruktur, ikke bare lagring. Piloten skal støtte:

- brukerposisjon etter eksplisitt samtykke;
- avstand i meter/kilometer;
- sortering/rangering på nærhet;
- ingen skjult eller permanent posisjonssporing som standard.

### 4. Åpningstider

Åpningstider blir en egen kildebelagt datastrøm. Fysen skal skille mellom:

- kjent åpen;
- kjent stengt;
- ukjent.

«Åpent nå» skal ikke gjettes når kilden mangler eller er utdatert.

### 5. Resultatflate

Et ordinært treff skal kunne vise:

`rett -> pris -> restaurant -> avstand -> åpent/stengt -> ferskhet -> handlinger -> kilde`

Første handlinger er:

- se meny;
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
