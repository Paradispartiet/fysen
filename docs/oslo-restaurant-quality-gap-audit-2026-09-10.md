# Oslo restaurant quality-gap audit — 2026-09-10

## Formål

Denne auditen følger den canonical dish-first coverage-policyen i `oslo-pilot-v1.md` og `restaurant-production.md`. Den skal ikke etablere en restaurantkvote. Formålet er å finne konkrete Oslo-restauranter som sannsynligvis tilfører høy marginal rettverdi, samtidig som eksisterende katalogredundans identifiseres.

Audit-snapshot:

- canonical catalog ref: `0b6a7c1770749663e3fab2eed2080ad3bb03f993`;
- canonical catalog manifests: **836**;
- benchmark-union: **100 unike kuraterte Oslo-steder**;
- direkte/eksplisitt aliasmatchet mot catalog: **15**;
- ikke funnet i catalog ved deterministisk navn/alias-match: **85**;
- av de 85: **30 Tier A**, **42 Tier B**, **13 Tier C/review**;
- Hot Shop er fortsatt med i samtidens guidegrunnlag, men har varslet permanent stenging 19. desember 2026 og skal derfor behandles som `sunset/review`, ikke langsiktig onboarding;
- langsiktig A/B research-backlog etter Hot Shop-sunset: **71 konkrete kandidater**;
- verifisert nedre grense for faktiske dobbeltmanifester i eksisterende catalog: **30 overskytende manifestpar**, pluss én separat sannsynlig identitetskollisjon som krever eksplisitt beslutning.

**Viktig:** 71 er en research-backlog, ikke et mål og ikke et løfte om 71 nye canonical restauranter. Hver kandidat må fortsatt bevise aktiv drift, fysisk Oslo-identitet, meny-/source-fit, rettdifferensiering og marginal coverage value før intake.

## Benchmark-kilder

Benchmarken er en union av flere redaksjonelle perspektiver for å unngå at «kvalitet» betyr bare fine dining:

- MICHELIN Guide, Oslo restaurant selection: https://guide.michelin.com/lv/en/oslo-region/restaurants
- VisitOSLO, lokale foodies: https://www.visitoslo.com/restaurants-nightlife/the-taste-of-oslo/local-foodies
- VisitOSLO, norske restauranter/tradisjonsmat: https://www.visitoslo.com/no/artikler/norske-restauranter
- VisitOSLO, vegan/vegetarian: https://www.visitoslo.com/restaurants-nightlife/vegan-vegetarian
- VisitOSLO, hotellrestauranter: https://www.visitoslo.com/no/spise-og-drikke/lettvint-og-for-alle/hotellrestauranter
- VisitOSLO, brunch-guide: https://www.visitoslo.com/de/restaurants-und-nachtleben/kaffee-kuchen/brunch
- Anders Husa, The Ultimate Oslo Dining Guide: https://andershusa.com/the-ultimate-oslo-dining-guide-find-the-best-restaurants-and-bars/

MICHELIN-siden viste 29 Oslo-oppføringer ved audit, men À L’aise ble ekskludert fordi restauranten ble bekreftet nedlagt i august 2026: https://borsen.dagbladet.no/nyheter/bekrefter-stenger-dorene/84985657

Hot Shop beholdes i snapshotet som et nåværende kvalitetsreferansepunkt, men markeres `sunset/review` fordi restauranten har varslet siste serveringsdag 19. desember 2026: https://vink.aftenposten.no/artikkel/xrrGmR/hot-shop-stengr-doerene

## Matchmetode

Catalog ble lest fra eksakt Git-tree på audit-ref. Benchmarknavn ble matchet med eksplisitte, konservative aliaser mot canonical catalog-slugs. Fuzzy substring-treff ble ikke akseptert som bevis; dette forhindrer falske treff som `Cru` mot `crispy-crust`.

Et `missing`-resultat betyr derfor **ikke funnet i canonical catalog med deterministisk navn/alias-identitet**. Før onboarding må identiteten likevel kontrolleres mot navn, adresse og aktiv drift; en kandidat kan vise seg å finnes under et uventet historisk navn og skal da reconciles, ikke dupliseres.

## Resultat per benchmarkflate

| Benchmark | Unike i flaten | Direkte funnet | Ikke funnet |
| --- | ---: | ---: | ---: |
| MICHELIN (À L’aise ekskludert) | 28 | 0 | 28 |
| VisitOSLO lokale foodies | 21 | 2 | 19 |
| VisitOSLO norsk/tradisjon | 15 | 3 | 12 |
| VisitOSLO sjømat | 11 | 1 | 10 |
| VisitOSLO plantebaserte spesialister | 6 | 3 | 3 |
| VisitOSLO hotellrestauranter | 10 | 0 | 10 |
| VisitOSLO brunch | 10 | 1 | 9 |
| Anders Husa Oslo dining guide-utvalg | 28 | 6 | 22 |

Flatene overlapper. Unionen er derfor 100, ikke summen av radene.

## Tier A — høyeste research-prioritet

Tier A krever sterk kvalitetsstøtte: MICHELIN og/eller flere uavhengige kuraterte kilder. Kandidatene skal research-es før generiske volumrestauranter.

1. Arakataka — MICHELIN + VisitOSLO lokale foodies + Anders Husa
2. Betong — MICHELIN + VisitOSLO lokale foodies + Anders Husa
3. Eero — MICHELIN + VisitOSLO lokale foodies + Anders Husa
4. Madonna — MICHELIN + VisitOSLO lokale foodies + Anders Husa
5. The Little Pickle — MICHELIN + VisitOSLO lokale foodies + Anders Husa
6. Vaaghals — MICHELIN + VisitOSLO lokale foodies + Anders Husa
7. SAVAGE — MICHELIN + VisitOSLO hotell + Anders Husa
8. Izakaya by Vladimir Pak — MICHELIN + VisitOSLO lokale foodies
9. Kolonialen Bislett — MICHELIN + VisitOSLO lokale foodies
10. Kontrast — MICHELIN + Anders Husa
11. Maaemo — MICHELIN + Anders Husa
12. Mon Oncle — MICHELIN + Anders Husa
13. Sabi Omakase Oslo — MICHELIN + VisitOSLO sjømat
14. Sjømagasinet — MICHELIN + VisitOSLO sjømat
15. Smalhans — MICHELIN + VisitOSLO norsk/tradisjon
16. Le Benjamin — VisitOSLO lokale foodies + Anders Husa
17. PANU — VisitOSLO lokale foodies + Anders Husa
18. Brasserie Blanche — MICHELIN
19. Brasserie Hansken — MICHELIN
20. Credo — MICHELIN
21. Cru — MICHELIN
22. Festningen Restaurant — MICHELIN
23. Frances Vinbar — MICHELIN
24. FYR Bistronomi & Bar — MICHELIN
25. Hot Shop — MICHELIN; **sunset/review, varslet stenging 19.12.2026**
26. Plah — MICHELIN
27. Stallen — MICHELIN
28. Statholderens Mat og Vinkjeller — MICHELIN
29. Statholdergaarden — MICHELIN
30. Varemottaket — MICHELIN

## Tier B — tydelige coverage-kandidater

Tier B har relevant kuratert støtte eller fyller viktige kjøkken-/tradisjon-/sjømat-/plantebaserte hull. De skal vurderes etter Tier A og etter dokumentert dish-value.

1. Bristol Grill
2. KUMI Gamlebyen
3. KUMI Oslobukta
4. Basso Social
5. Brasserie France
6. Fox and Loaf
7. Happolati
8. J2 Modern Korean
9. Kafeteria August
10. Keyser Social
11. KöD Frogner
12. KöD Posthallen
13. Koie Ramen
14. Konoji
15. Nektar
16. Palace Grill
17. Punk Royale
18. St. Lars
19. Stranden 30
20. Substans
21. Tabuno
22. Theatercaféen
23. Tomodomo
24. Den Glade Gris
25. Dovrehallen
26. Engebret Café
27. Fiskeriet Bjørvika
28. Frognerseteren Finstua
29. Gamle Raadhus Restaurant
30. Havsmak
31. Kaffistova
32. Lofoten Fiskerestaurant
33. Lofotstua
34. Lorry Restaurant
35. Louise
36. Nordvegan
37. Restaurant Schrøder
38. Rorbua
39. Skur 33
40. Solsiden Restaurant
41. Stortorvets Gjæstgiveri
42. The Salmon

## Tier C — review, ikke automatisk onboarding

Disse kommer fra én smalere benchmarkflate eller har svakere dokumentert marginal rettverdi. De skal bare onboardes dersom aktuell meny og coverage-analyse viser et konkret gap.

1. About Contrasts
2. Åpent Bakeri Barcode
3. Atlas Brasserie
4. Bar Boman
5. Ekspedisjonshallen
6. Katla
7. Mauriske Salonger
8. Norda
9. Palmen Restaurant
10. Skaal Matbar
11. The Top Restaurant
12. To Søstre
13. Vintage Kitchen

## 15 benchmarksteder som allerede har direkte catalog-match

Dette er positive kontroller og skal ikke re-onboardes:

- ZZ Pizza
- Jewel of India
- Helt Vilt
- Bønder i byen
- Asylet
- Fiskeriet Youngstorget
- Håndbakt
- Oslo Raw
- Krishnas Cuisine
- Bon Bon
- Corral’s Tacos
- Ugly Duckling
- Hrímnir Ramen
- Hot Temper
- Haralds Vaffel

Flere av disse har allerede mer enn ett manifest/lokasjon og kan samtidig være dedupe- eller consolidation-kandidater. «Present» er derfor ikke det samme som «catalog-identiteten er optimal».

## Redundanssignal i dagens 836

En konservativ slug-audit viser:

- **246/836** catalog-manifester har minst ett av `pizza`, `kebab`, `sushi`, `burger` eller `grill` i sluggen;
- 21 åpenbare kjedefamilier utgjør **129 manifester** alene;
- dette er **ikke en sletteliste**. Det er et signal om at katalogen er volumtung i noen generiske rettfamilier og at neste produksjon ikke skal velges derfra uten dokumentert marginal verdi.

De 21 eksplisitt telte kjedefamiliene var Bislett Kebab House, Burger King, McDonald’s, Peppes Pizza, LETT, Joe & The Juice, Espresso House, Fly Chicken, Los Tacos, Sumo, Olivia, Egon, Pizza Pancetta, Subway, Sabi Sushi, Sabrura, Jagger, Døgnvill, El Camino, Bambus og Delicatessen.

## Verifiserte dobbeltmanifester — nedre grense

En målrettet kontroll av høylikhetspar ble verifisert med manifestenes restaurantnavn, adresse og menu source. Følgende **30 par** representerer samme fysiske restaurantidentitet og gir derfor minst 30 overskytende canonical manifester som må reconciles før katalogstørrelse brukes som fysisk restauranttall:

1. Heim St. Hanshaugen
2. Hy’s Sushi & Bubble Tea Ensjø
3. Kinabolle Ensjø
4. Kjøkken & Kaffe Oslo S
5. Lambertseter Kro – Kinesisk Restaurant
6. Lofthus Samvirkelag Torshov
7. O’Learys Oslo Vika
8. Oslo Kebab & Pizzahus
9. Oslo Raw Frogner
10. Oslo Tran Sushi
11. Otsu Sushi & Poke Bowl Sagene
12. Sushi og Thai Torshov
13. Texas Grill Og Pizza
14. Yaya’s Restaurant Vika
15. Aften Pizza & Grill
16. Atelier Asian Tapas
17. July Tea & Food
18. La Pizza La Pasta
19. Meraki Via Village
20. New Winny Kebab
21. Pizzeria la Pietra
22. Roots Of India
23. Golden Mountain Restaurant
24. Green Taste
25. Grill’s Ville
26. Happy Time
27. Helt Vilt
28. Hoa Sen
29. Kim’s Kitchen
30. Kverneriet Solli / Solli Plass

I tillegg er `dinner-sushi-oslo` versus `sushi-dinner-oslo` en sannsynlig identitetskollisjon på Hegdehaugsveien 1 som skal avgjøres eksplisitt før sletting. Et kontrollpar, Hungry Birds, viste at høylike navn også kan være to faktiske lokasjoner; fuzzy dedupe skal derfor aldri slette automatisk.

Dette er en **verifisert nedre grense**, ikke en uttømmende 836/836-adressededupe. Fysisk unik restaurantbestand er dermed høyst 806 før ytterligere duplikater er kontrollert, men dette tallet skal ikke brukes som endelig catalog-reconcile før full adresse-/identitetsaudit er kjørt.

## Beslutning for videre produksjon

1. **Stopp blind SE MENY-volumproduksjon.** Ingen Batch 51 skal fylles med tilfeldige maskinlesbare kandidater bare for throughput.
2. **Research Tier A først.** Hver kandidat må ha aktiv status, Oslo-identitet, menybevis og marginal dish-value. Hot Shop er `sunset/review`.
3. **Research Tier B etterpå** for cuisine-, tradisjon-, sjømat-, plantebasert- og geografiske gap.
4. **Tier C forblir review**, ikke backlog som automatisk skal tømmes.
5. **Kjør dedupe-reconcile separat** for de minst 30 bekreftede dobbeltmanifestene. Bevar beste canonical source/evidens; ikke slett blindt.
6. **Kjedelokasjoner konsolideres konseptuelt** bare der menyen er praktisk talt identisk. Fysisk lokasjon kan fortsatt være nødvendig for nærhet, åpningstid, booking/order og avstand.
7. Nye restauranter prioriteres bare når de løser et dokumentert rett-, kjøkken-, kvalitets-, etterspørsels- eller geografisk gap.

## Hva betyr dette for «hvor mange mangler?»

Det tidligere grove anslaget 150–250 bør ikke lenger brukes. Denne auditen gir et konkret, navngitt grunnlag:

- **85** benchmarksteder er ikke funnet i canonical catalog ved konservativ match;
- **72** av dem ligger i Tier A/B;
- etter at Hot Shop behandles som varslet sunset, er **71** langsiktige A/B research-kandidater;
- **13** er Tier C/review;
- minst **30** eksisterende manifester er samtidig bekreftede fysiske duplikater.

Det mest forsvarlige operative bildet er derfor: **71 konkrete high/medium-value kandidater å undersøke, ikke 71 restauranter som automatisk skal legges til**. Etter source-fit, faktisk menyverdi, identitetsreconcile og kjedededupe forventes det reelle tilleggsbehovet å være lavere; et foreløpig sannsynlig intervall er omtrent **55–70 nye verdifulle restauranter**, men dette intervallet er en prognose, ikke en quota.

Den permanente fasiten skal være kandidat-for-kandidat-beslutninger med status `add`, `keep`, `consolidate`, `duplicate`, `review` eller `exclude`, ikke et forhåndsbestemt restauranttall.
