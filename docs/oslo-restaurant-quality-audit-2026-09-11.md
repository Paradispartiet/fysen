# Oslo restaurant quality audit — 2026-09-11

Dette er en **dish-first kvalitetsaudit**, ikke en census over alle serveringssteder i Oslo. Formålet er å finne hvilke restauranter som gir Fysen ny rettverdi, hvilke hull som er åpenbare, og hvor dagens katalog er redundant.

Snapshot:

- canonical `main` ved auditstart: `3df54b60b97caa63309d8144c4aa0ea410003904`;
- canonical restaurantmanifester: **836**;
- filnavn som inneholder `pizza`, `kebab`, `sushi`, `burger` eller `grill`: **246 / 836**;
- 21 eksplisitt målte kjedefamilier: **129 lokasjonsmanifester**;
- verifiserte objektive dublettpar i første pass: **31**, tilsvarende minst **31 overflødige canonical manifester** dersom hvert par konsolideres korrekt;
- kuratert benchmark-union: **100 unike Oslo-steder**;
- direkte canonical treff i benchmarken: **15**;
- benchmark-steder uten canonical treff: **85**.

## Konklusjon

Dagens problem er ikke for få restauranter totalt, men feil sammensetning. Fysen har betydelig volum innen generisk pizza/kebab/sushi/burger/grill og mange kjedelokasjoner, samtidig som store deler av Oslos viktigste restauranter innen norsk mat, sjømat, moderne kjøkken, hotellrestaurant, plantebasert og gastronomisk særpreg mangler.

Det finnes derfor **ingen begrunnelse for å fortsette med volumstyrte SE MENY-batcher** før denne køen er behandlet. Neste restaurantarbeid skal komme fra dokumenterte kvalitets-/rettgap.

### Hva tallene betyr

- **85** er et navngitt, dokumentert minimumsgap mot denne benchmarken. Det er ikke et estimat på hele Oslos kvalitetsgap.
- **52 P0** er første researchkø: MICHELIN-steder, norske/sjømat-ankere eller steder støttet av flere uavhengige kuraterte signaler.
- **33 P1** er review-kø: relevante kandidater, men de skal ikke onboardes før meny, faktisk rettbidrag og marginal verdi er bevist.
- **31 dublettpar** er teknisk/canonical hygiene og skal behandles separat fra redaksjonell kvalitetsvurdering.

## Benchmark-kilder

Benchmarken er bevisst sammensatt av flere typer kuratering slik at «kvalitet» ikke blir synonymt med fine dining:

- MICHELIN Guide Oslo: https://guide.michelin.com/no/en/oslo-region/restaurants — **28 aktive Oslo-restauranter** ved kontroll 2026-09-11.
- VisitOSLO «Do as the local foodies»: https://www.visitoslo.com/restaurants-nightlife/the-taste-of-oslo/local-foodies — **21** steder.
- VisitOSLO norsk/tradisjonsmat: https://www.visitoslo.com/no/artikler/norske-restauranter — **15** steder.
- VisitOSLO sjømat: samme guideflate — **11** steder.
- VisitOSLO hotellrestauranter: https://www.visitoslo.com/restaurants-nightlife/convenient/hotel-restaurants — **10** steder.
- VisitOSLOs øvrige foodie-/brunsj-/plantebaserte temaflater.
- Anders Husa Oslo-anbefalinger som separat redaksjonelt signal.

Eksterne guider er **research-signaler**, ikke canonical sannhet. En plassering i en guide gir ikke automatisk onboarding. Kandidaten må fortsatt bestå Fysens kilde-, meny-, rettverdi- og production-gater.

## P0 — research først

Disse 52 mangler canonical treff og har sterkest coverage-begrunnelse i første pass:

1. Mon Oncle
2. Maaemo
3. Kontrast
4. Stallen
5. Hot Shop
6. SAVAGE
7. Sabi Omakase Oslo
8. Credo
9. Statholdergaarden
10. The Little Pickle
11. Frances Vinbar
12. Izakaya by Vladimir Pak
13. Betong
14. Sjømagasinet
15. Statholderens Mat og Vinkjeller
16. Brasserie Hansken
17. Varemottaket
18. Kolonialen Bislett
19. Cru
20. Vaaghals
21. Smalhans
22. Arakataka
23. Plah
24. Brasserie Blanche
25. Madonna
26. Festningen Restaurant
27. FYR Bistronomi & Bar
28. Eero
29. PANU
30. Le Benjamin
31. Kaffistova
32. Rorbua
33. Stortorvets Gjæstgiveri
34. Gamle Raadhus Restaurant
35. Frognerseteren Finstua
36. Bristol Grill
37. Restaurant Schrøder
38. Den Glade Gris
39. Lorry Restaurant
40. Engebret Café
41. Dovrehallen
42. The Salmon
43. Louise
44. Lofoten Fiskerestaurant
45. Havsmak
46. Lofotstua
47. Skur 33
48. Solsiden Restaurant
49. Fiskeriet Bjørvika
50. KUMI Gamlebyen
51. KUMI Oslobukta
52. Theatercaféen

**P0 betyr ikke automatisk ADD.** For hvert sted skal research bevise: aktiv identitet, offentlig aktuell meny, canonical rettoutput, marginal rett-/kjøkkenverdi og eventuelle handlinger. Et sted kan ende som `review` eller `reject` dersom menyen ikke gir Fysen brukbar dish-first-verdi.

## P1 — review før eventuell onboarding

Disse 33 mangler canonical treff, men har svakere eller mer kontekstavhengig marginal-value-bevis:

1. Basso Social
2. Keyser Social
3. KöD Frogner
4. St. Lars
5. Konoji
6. Happolati
7. J2 Modern Korean
8. KöD Posthallen
9. Brasserie France
10. Nordvegan
11. Norda
12. Ekspedisjonshallen
13. Bar Boman
14. To Søstre
15. Atlas Brasserie
16. Palmen Restaurant
17. The Top Restaurant
18. Mauriske Salonger
19. Katla
20. Vintage Kitchen
21. About Contrasts
22. Åpent Bakeri Barcode
23. Skaal Matbar
24. Tabuno
25. Koie Ramen
26. Substans
27. Stranden 30
28. Palace Grill
29. Punk Royale
30. Kafeteria August
31. Tomodomo
32. Fox and Loaf
33. Nektar

Hotellbarer, vinbarer, bakerier og andre hybridsteder skal ikke tas inn bare fordi de finnes i en guide. De må ha en reell offentlig matmeny med retter som brukeren faktisk kan søke etter.

## Verifiserte canonical-dubletter

Følgende 31 par er kontrollert som samme fysiske restaurantidentitet gjennom navn + adresse og/eller samme canonical menykilde. De skal **ikke slettes blindt**. For hvert par skal én canonical vinner velges, beste kilde/proveniens beholdes, eventuelle nyere assertions flyttes, og production DB/search/watcher re-konsolideres før taper-manifestet fjernes.

1. `dinner-sushi-oslo` ↔ `sushi-dinner-oslo`
2. `heim-st-hanshaugen-oslo` ↔ `heim-st-hanshaugen`
3. `hys-sushi-bubble-tea-ensjo-oslo` ↔ `hys-sushi-bubble-tea-ensjo`
4. `kinabolle-ensjo-oslo` ↔ `kinabolle-ensjo`
5. `kjokken-kaffe-oslo-s-oslo` ↔ `kjokken-kaffe-oslo-s`
6. `lambertseter-kro-kinesisk-oslo` ↔ `lambertseter-kro-kinesisk-restaurant-oslo`
7. `lofthus-samvirkelag-torshov-oslo` ↔ `lofthus-samvirkelag-torshov`
8. `olearys-oslo-vika-oslo` ↔ `olearys-vika-oslo`
9. `oslo-kebab-pizzahus-oslo` ↔ `oslo-kebab-pizzahus`
10. `oslo-raw-frogner-oslo` ↔ `oslo-raw-frogner`
11. `oslo-tran-sushi-oslo` ↔ `oslo-tran-sushi`
12. `otsu-sushi-poke-bowl-sagene-oslo` ↔ `otsu-sushi-poke-bowl-sagene`
13. `sushi-og-thai-torshov-oslo` ↔ `sushi-thai-torshov`
14. `texas-grill-og-pizza-oslo` ↔ `texas-grill-pizza-oslo`
15. `yayas-restaurant-vika-oslo` ↔ `yayas-vika-oslo`
16. `aften-pizza-grill-oslo` ↔ `aften-pizza-grill-storgata-oslo`
17. `atelier-asian-tapas-mathallen-oslo` ↔ `atelier-asian-tapas-oslo`
18. `july-tea-food-oslo` ↔ `july-tea-food-pilestredet-oslo`
19. `la-pizza-la-pasta-majorstuen-oslo` ↔ `la-pizza-la-pasta-oslo`
20. `meraki-via-village-oslo` ↔ `meraki-via-village-vika-oslo`
21. `new-winny-kebab-grefsen-oslo` ↔ `new-winny-kebab-oslo`
22. `pizzeria-la-pietra-oslo` ↔ `pizzeria-la-pietra-valerenga-oslo`
23. `roots-of-india-grefsen-oslo` ↔ `roots-of-india-oslo`
24. `golden-mountain-radhusplassen-oslo` ↔ `golden-mountain-restaurant-oslo`
25. `green-taste-gamlebyen-oslo` ↔ `green-taste-oslo`
26. `grills-ville-frogner-oslo` ↔ `grills-ville-oslo`
27. `happy-time-grunerlokka-oslo` ↔ `happy-time-oslo`
28. `helt-vilt-oslo` ↔ `helt-vilt-vulkan-oslo`
29. `hoa-sen-hammersborggata-oslo` ↔ `hoa-sen-oslo`
30. `kims-kitchen-bislett-oslo` ↔ `kims-kitchen-oslo`
31. `kverneriet-solli-oslo` ↔ `kverneriet-solli-plass-oslo`

Kontrollpar som **ikke** var dublett: `hungry-birds-oslo` og `hungry-birds-resturant-oslo` representerer ulike adresser og skal ikke slås sammen uten nytt identitetsbevis.

## Volum- og kjedesignal

Slug-basert diagnose på 836-manifestkatalogen:

- pizza: **76**;
- kebab: **33**;
- sushi: **81**;
- burger: **40**;
- grill: **38**;
- union av disse ordene: **246** manifester.

Dette er ikke en sletteliste. En god pizzeria, sushirestaurant eller kebabrestaurant kan være `core`. Tallet brukes bare som signal om at videre produksjon i disse kategoriene må bevise ny marginal verdi.

Eksempel på målte kjedefamilier:

- Peppes Pizza: **13** lokasjonsmanifester;
- Bislett Kebab House: **9** lokasjonsmanifester;
- McDonald's: **9** lokasjonsmanifester;
- Lett: **9** lokasjonsmanifester;
- Joe & The Juice: **9** lokasjonsmanifester;
- Espresso House: **8** lokasjonsmanifester;
- Subway: **8** lokasjonsmanifester;
- Fly Chicken: **7** lokasjonsmanifester;
- Los Tacos: **7** lokasjonsmanifester;
- Burger King: **6** lokasjonsmanifester;
- Pizza Pancetta: **6** lokasjonsmanifester;
- Sumo: **5** lokasjonsmanifester;
- Olivia: **5** lokasjonsmanifester;
- Egon: **5** lokasjonsmanifester;
- El Camino: **4** lokasjonsmanifester;
- Sabi Sushi: **4** lokasjonsmanifester;
- Bambus: **3** lokasjonsmanifester;
- Delicatessen: **3** lokasjonsmanifester;
- Døgnvill: **3** lokasjonsmanifester;
- Jagger: **3** lokasjonsmanifester;
- Sabrura: **3** lokasjonsmanifester;

Totalt: **129** manifester i disse 21 familiene. Kjedelokasjoner kan fortsatt ha stor geografisk verdi, men identisk meny skal ikke regnes som 13 ganger ny rettdekning.

## Operativ klassifisering

Hver eksisterende eller ny restaurant skal kunne havne i én av disse statusene:

- `core`: høy rett-/kjøkkenverdi, sterk identitet og god kildekvalitet; skal beholdes/prioriteres.
- `coverage`: ordinært sted som fyller et reelt geografisk, pris-, kostholds- eller demand-gap.
- `redundant`: tilfører svært lite ny rettverdi relativt til eksisterende dekning; kandidat for konsolidering/nedprioritering.
- `dedupe`: samme fysiske restaurant finnes allerede som annen canonical identitet.
- `review`: verdi eller identitet er ikke godt nok bevist ennå.
- `reject`: bør ikke inn i dish-first-katalogen, for eksempel catering-only, lukket kantine, ren bar uten substansiell matmeny, kiosk/dagligvare som sideprodukt eller rent virtuelt duplikatbrand.

## Neste rekkefølge

1. **Dedupe først:** behandle de 31 verifiserte parene med canonical-vinner + production-safe migrering.
2. **P0 research:** ikke mer enn 10–15 steder per researchrunde; velg først bredde på kjøkken og rettverdi, ikke letteste parserkilde.
3. **P1 review:** sorter bort steder uten substansiell eller søkbar matmeny før intake.
4. **Eksisterende 836-audit:** klassifiser i `core / coverage / redundant`; ikke fjern geografisk nyttige lokasjoner bare fordi de er kjeder.
5. **Utvid benchmarken:** bruk VisitOSLOs brede restaurantkatalog og demand-data for å finne viktige hull som ikke finnes i denne første 100-steders unionen.

## Estimat etter første audit

Det **sikre navngitte gapet er 85** mot den kuraterte benchmarken. Fordi benchmarken bare er et kvalitetsutvalg og ikke dekker alle gode nabolagsrestauranter, regionale kjøkken eller etterspørselsdrevne hull, er et forsvarlig arbeidsestimat at Fysen fortsatt mangler omtrent **120–180 restauranter med reell marginal verdi**.

Dette er ikke et mål om å legge til 120–180. Samtidig har katalogen minst 31 objektive dublettmanifester og sannsynligvis ytterligere produktredundans. Netto canonical restaurantantall kan derfor ende nær dagens nivå selv etter at kvalitetsgapene er fylt.

Den operative sannheten er dermed:

> **Fysen trenger færre redundante restauranter og flere riktige restauranter.**
