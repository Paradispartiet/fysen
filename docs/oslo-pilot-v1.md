# Fysen Oslo Pilot v1

## Formål

Fysen Oslo Pilot v1 skal bevise at Fysen kan brukes av folk i Oslo til å finne en konkret rett de har lyst på, basert på ferske og sporbare restaurantmenyer.

Pilotens north star er dish-first:

> Brukeren skriver retten. Fysen viser restauranter som kan dokumenteres å ha retten på en fersk meny nå.

Fysen skal først og fremst hjelpe brukeren å finne **hvor en rett faktisk kan spises**, samtidig som verifiserte booking- og bestillingsmuligheter kan gjøre resultatet handlingsklart.

Piloten skal ikke optimaliseres for flest mulig restauranter eller flest mulig menyitems. Den skal optimaliseres for:

- pålitelige treff;
- nyttig Oslo-dekning;
- ferske og kildebelagte menydata;
- målbar, ekte brukerintensjon;
- tydelig skille mellom hva restauranten selv publiserer og hva en leverings-/bestillingstjeneste dokumenterer;
- en tydelig vei fra oppdagelse til restaurant, booking eller bestilling der dette er verifisert.

Restaurant-onboarding er en løpende coverage-maskin. Nye restauranter prioriteres når etterspørsel, geografi, kjøkken eller en nødvendig kildetype viser et reelt gap.

## Status 20. august 2026

### Canonical produksjonskatalog

`apps/menu-worker/catalog/` er den eneste canonicale produksjonslisten. Dokumentasjonen skal ikke vedlikeholde et parallelt, håndskrevet restauranttall eller en katalogkopi som raskt blir utdatert.

Den operative batchmetoden og daterte, kildebundne kontrollmålinger dokumenteres i [`restaurant-production.md`](restaurant-production.md). Disse målingene er produksjonsbevis, ikke en alternativ katalog.

Antall restauranter er heller ikke et produktmål. En restaurant teller offentlig først når canonical manifest, production DB, watcher-state, søkeindeks, API og webflate er konsistente.

## Kildehierarki for restaurantmenyer

Fysen skal velge kilden som best dokumenterer hva restauranten faktisk serverer nå. Kildehierarkiet er:

1. **Restaurantens egen aktuelle meny er førstevalg.** Dette kan være first-party HTML, JSON-LD, PDF eller annen offisiell menypublikasjon.
2. Andre aktuelle first-party-flater kan brukes for identitet, rettsinformasjon, åpningstider og handlinger når de faktisk publiserer den relevante informasjonen.
3. **Foodora, Wolt eller tilsvarende kan brukes som sekundær priset service-meny** når restaurantens egen meny ikke er maskinlesbar, ikke publiserer priser pålitelig, eller restauranten eksplisitt bruker tjenesten som bestillingsflate.
4. En service-/delivery-meny beviser bare de rettene og prisene som faktisk finnes på den tjenesten. Den skal ikke omtales som restaurantens komplette dine-in-meny uten selvstendig bevis for dette.
5. Søkemotor-snutter, cachede/indexerte kopier og ikke-tilknyttede aggregatorsider er research-signaler, ikke canonical erstatning for en nåværende live-kilde.

At en restaurant mangler egen nettside er **ikke** i seg selv en avvisningsgrunn. Identiteten må fortsatt være sikkert etablert, og den valgte menyflaten må passere de samme live source-, safety- og quality-portene.

Denne modellen er viktig fordi Fysen ikke er en Foodora-/Wolt-katalog. Produktet skal kunne fortelle brukeren hvor en rett kan spises, også når den best maskinlesbare prisflaten tilfeldigvis er en leveringstjeneste.

## `minimumExpectedItems`: integritetsport, ikke kvote

`minimumExpectedItems` er fortsatt en hard fail-closed port. Men tallet skal representere **kildebevist minimumsdekning**, ikke hvor mange retter vi mener en restaurant burde ha.

Reglene er:

- minimumet skal begrunnes i den aktuelle canonical live-kilden og være høyt nok til å oppdage reelt parser-/kildetap;
- vi setter ikke vilkårlige terskler som 20 eller 30 bare fordi en restaurant eller et kjøkken forventes å være stort;
- en legitim kort meny kan være fullverdig Fysen-dekning dersom rettene er aktuelle, prisede og pålitelig ekstrahert;
- dersom direkte live-kildebevis viser at en tidligere rett faktisk er fjernet, skal en stale required-assertion og det source-backed minimumet oppdateres;
- minimumet skal **aldri** senkes for å skjule at parseren bare materialiserer en del av en kilde som fortsatt inneholder flere retter;
- representative dish-/price-assertions og forbidden assertions beholdes som separate kvalitetsporter.

Forskjellen er avgjørende: **en mindre faktisk meny er gyldig; parser-loss er ikke gyldig.**

## Kildetyper og transport

Piloten dekker flere reelle kildeklasser og parser-/transportvarianter:

- vanlige HTML-menyer;
- strukturert JSON-LD;
- PDF-meny;
- browser-renderte JavaScript-kilder;
- sekundære service-menyer når first-party meny ikke kan materialiseres forsvarlig;
- first-party booking-/order-handlinger der de kan verifiseres;
- separate og branch-scopede åpningstidskilder;
- eksplisitte redirect- og browser-data-origins gjennom `sourceSupport`.

Browser-fetch er ikke automatisk fallback. Det brukes bare når manifestet eksplisitt sier `fetchMode: "browser"`, vanlig HTTP ikke er tilstrekkelig, robots/sikkerhetsportene tillater det og origin-policyen er eksplisitt.

`sourceSupport` er en eksplisitt transportutvidelse, ikke en generell allowlist. Bare nødvendige, konkrete HTTPS-origins kan deklareres, og offentlig-nettverk/IP-validering gjelder fortsatt.

## Meny, åpningstider og handlinger er separate bevis

Menybevis skal ikke blokkeres av at kjøkkentidene er usikre, og åpningstidene skal ikke diktes opp fra vanlige venue-hours.

Når en first-party side publiserer åpningstider, men canonical hours-worker ikke sikkert kan tolke dem som kjøkkentider, kan manifestet bruke eksplisitt `provisional` eller `unverified` hours-status. Da kan den verifiserte menyen fortsatt være søkbar, men Fysen skal vise `opening: unknown` til kjøkkentidene faktisk er verifisert.

Booking/order deklareres bare når destinasjonen kan verifiseres. En delivery-plattform som brukes som menybevis blir ikke automatisk en canonical handling uten egen action-verifikasjon.

## Restaurant-onboarding

Onboardingflyten er manifestbasert:

`candidate manifest -> source/safety -> live extraction -> source-backed minimum + dish/price assertions -> action verification -> hours gate/audit -> merge -> separat byte-identisk promotion -> production materialization/proof`

Viktige regler:

- `candidates/` er read-only staging og aktiverer aldri en restaurant i produksjon;
- live candidate-gaten bruker samme runtime-primitiver som production watcher;
- den aktuelle live-kilden, ikke et gammelt søkeindeksutdrag, bestemmer hvilke assertions som er sanne;
- parser-/transportfeil løses generisk med regresjonstester, aldri med restaurantspesifikke runtime-unntak;
- parser-/sikkerhetsgrenser svekkes ikke for å få en kandidat grønn;
- en god kandidat skal heller ikke forkastes fordi et historisk eller vilkårlig item-tall er høyere enn den faktiske menyen;
- promotion skjer i en separat PR som flytter eksakt samme validerte manifest byte-for-byte fra `candidates/` til `catalog/`;
- etter promotion må production DB, watcher, production-search, API og web inngå i produksjonsbeviset før restauranten kalles offentlig ferdig.

## Production proof

Repo-merge og grønn CI er ikke alene offentlig produksjonsbevis.

Den permanente production proof-porten skal blant annet kontrollere:

1. aktiv restaurant i production DB;
2. riktig canonical menu-source og enabled source;
3. fersk source-state;
4. publisert latest snapshot over manifestets source-backed minimum;
5. akseptert siste menu-watch;
6. representative direkte `searchDishes`-smokes uten Revenue/search-funnel-events;
7. offentlig browse-API;
8. offentlig webflate.

Production proof skal være rødt dersom lagene ikke er synkrone. Vercel-release beholdes batchet for å unngå unødvendig deployforbruk; proof-porten skal avdekke drift, ikke omgå release-kontrakten.

Den samlede closeout-kontrakten, mobilreisene og de representative produksjonsgatene er låst i [`fysen-oslo-v1-closeout.md`](./fysen-oslo-v1-closeout.md).

## Utforsk Oslo / Alle retter

`/search?city=Oslo` uten `q` er discovery-flaten over den samme ferske rettindeksen som søkeproduktet. Det skal ikke finnes en parallell restaurant- eller rettdatabase for discovery.

Forsiden og Alle retter bruker den ikke-attribuerende browse-indeksen. Bakgrunnsvisninger skal derfor ikke skape `search_events` eller impressions; bare eksplisitte brukersøk inngår i demand-funnelen.

Canonical dish concepts og kuraterte aliaser brukes når identiteten faktisk er bevist. Fuzzy/semantisk likhet alene skal aldri gjøre en annen rett til et sikkert treff.

Browse-flaten er en forbrukerkatalog, ikke en dump av parseroutput. API-et skal derfor klassifisere og telle drikke, saus/tilbehør, modifier, allergen-/informasjon, menyoverskrifter og ugyldige fragmenter før publisering. Bare faktiske retter canonicaliseres og vises.

## Demand-loop

Videre coverage styres av ekte, fortsatt uløste behov:

1. samle eksplisitte brukersøk;
2. replay historiske null-/fuzzy-signaler mot dagens ferske indeks;
3. fjern signaler som nå løses sikkert;
4. prioriter gjenværende reelle gap;
5. avgjør om gapet best løses med alias/canonicalisering, parserforbedring, ny restaurant eller bredere geografisk/kjøkkenmessig dekning.

Historiske nulltreff er etterspørselsdata, ikke automatisk backlog. På samme måte er restaurantantall og menyantall kvalitetsdata, ikke kvoter.

## Produktmål

Ved avslutning av Oslo Pilot v1 skal Fysen kunne:

1. indeksere et representativt sett Oslo-restauranter fra flere reelle menykildetyper;
2. vise en navigerbar oversikt over ferske retter i Oslo;
3. forstå trygge aliaser og moderate stavevariasjoner uten å dikte opp rettelikhet;
4. vise avstand og støtte nærhetsrangering når brukeren deler posisjon;
5. vise åpningstilstand bare når den er kildebelagt og fersk, ellers `unknown`;
6. vise rett, pris, restaurant, menyferskhet og kilde tydelig;
7. skille restaurantens egen meny fra sekundær delivery/service-meny når dette er relevant for provenance;
8. gjøre det lett å gå videre til restaurant, veibeskrivelse, booking eller bestilling når handlingen er verifisert;
9. måle ekte etterspørsel uten at QA eller discovery forurenser dataene;
10. bruke reelle demand-gap til å styre videre coverage.

## Kommersiell rekkefølge

Revenue Layer R1/R2 etablerer funnel-måling og verifiserte handlinger. Deretter følger Claim Restaurant og Fysen Pro på den samme canonical restaurantidentiteten. Betalt plassering eller sponsing skal aldri kunne dikte opp rettetilgjengelighet eller overstyre kilde-/ferskhetsbevis.

## Suksesskriterium

Piloten er vellykket når en bruker i Oslo kan søke eller utforske en konkret rett og få et **troverdig, ferskt og handlingsklart resultat** som viser hvor retten faktisk kan spises, med tydelig provenance og uten at tekniske kvoter forveksles med produktkvalitet.

Revenue- og konverteringsdelen er spesifisert i [`revenue-layer-v1.md`](./revenue-layer-v1.md).
