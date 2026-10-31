# Oslo-restauranter — samlet arbeidsliste (13. oktober 2026)

## Menykontroll og katalogavstemming 31. oktober 2026

Engebret Café og Lofoten Fiskerestaurant tas inn fra de to validerte kandidatfilene uten byteendringer. Katalogen øker fra **981 til 983**. De allerede kanoniske Restaurant Schrøder, Dovrehallen og The Salmon kobles til sine eksisterende masterrader; ingen nye dublettrader opprettes. To-Tos tidligere menyidentitet er markert **ARKIVERT**, i tråd med den allerede gjennomførte katalogpensjoneringen.

Etter opptaket inneholder arbeidslisten fortsatt **1198 rader**, hvor **983 JA-rader** samsvarer nøyaktig med de aktive katalogslugene. De øvrige 215 radene er ikke aktiv kanonisk dekning. Dette er katalog-/listeavstemming, ikke en komplett Oslo-census eller produksjonsattest. Menyomfang, pris-/porsjonskontroller og avgrensninger ligger i [kontrollen av de fem etablerte restaurantene](oslo-established-menu-coverage-2026-10-31.md). Materialisering og offentlig søk må bekreftes separat etter merge.


## Produksjonsbolk 17. oktober 2026 – PR #968

**10 nye Oslo-restauranter** med dokumenterte Wolt-matretter og konkrete priser. 26 live-kilder innhentet samlet: 4 adressefeil, 11 kilder oversteg 2 MB-grensen for kildehenting, 1 kilde ga bare én unik prissatt rett, og 10 står klare for publiseringsvalidering (to tidligere godkjente kilder endret størrelse før sluttkontroll) og redaksjonell kontroll av rett-/prisassertasjoner. Det er ikke endret parser eller innhentingsgrense for å presse flere kandidater gjennom. Katalogen øker fra **827 til 837** ved merge. Wolt-leveringspriser er ikke nødvendigvis spisesalpriser, og produksjonsdatasynk er ikke særskilt attestert.

**Godkjente restauranter:** Albertino, Domino's Pizza Nydalen, Jafs Stovner, Karachi Street Food, Koi Sushi & Wok Vollebekk, Marajah Indisk Restaurant, Pizzeria Valentino, Sugar & Spice, Tasty Grill & Pizza, Tiki Sushi.


## Produksjonsbolk 17. oktober 2026 – PR #967

**24 nye Oslo-restauranter** er hentet fra lokasjonsspesifikke Wolt-menyer, verifisert mot Kartverket og målrettet livekontrollert med åtte rettsnavn/prisassertasjoner per restaurant. Katalogen øker fra **803 til 827** ved merge. Av 26 kandidatsteder bestod 24 adresse- og livekontroll; Dino's Pizza og Buoni Amici ble holdt utenfor fordi publisert adresse ikke ga godkjent Kartverket-koordinat. Prisene er hentet fra Wolt-leveringsmenyene, ikke garantert bordpriser. Åpningstider og produksjonsdatasynkronisering er ikke særskilt verifisert.

**Restauranter:** Afghan House, Asiamix, Bambus Byporten, Biryani Express, Curry and Ketchup, Estar Sushi, The Fragrance of the Heart Majorstuen, Fukuya, Gate of India, Gorgonzo, Gregor Pizza, Indi Gastro Bar, Indique Flavours, Jaffna Food Corner, Jordal Haveli, Kryddern, Mr. Fish Colosseum, Pizza Mesteren, Roma Pizza Vinderen, Sushi Rose Majorstua, Verona Pizza, Vinny's Kebab, Wasabi Sushi og Wok, Zeytouna Grill-House.


## Produksjonsbolk 17. oktober 2026 – PR #966

15 nye katalogmanifester er generert fra prissatte, lokasjonsspesifikke Wolt-menyer og valgt etter målrettet livevalidering. Oslo-katalogen øker fra **788 til 803** restauranter ved merge. Av 21 undersøkte kilder fikk 19 Kartverket-adressepunkt; 18 ga teknisk validert menyuttak, én (Stangeriet) ga ingen kanoniske retter, og tre teknisk gyldige menyer ble holdt tilbake etter semantisk vurdering av drikke-/nikotininnhold. De to uavklarte adressene ble også holdt utenfor. Både restaurantidentitet og priser gjelder den dokumenterte Wolt-leveringskilden. Åpningstider og synkronisering til produksjonsdatabasen er ikke særskilt bekreftet. Ingen ekstra full katalogregresjon er planlagt.

**Publiserte steder i bolken:** 88 Street Burger Storgata, Alibaba Grill & Steak House Stovner, Döner Berlin Oslo, Dr. Crunchy Kiellands, Flamenco Pizza Ammerud, Haveli Tandoori, Jønk Frysja, Jønk Grorud, Kebab Kompaniet Stovner, Kompis Lillo Gård, Linderud Pizza & Grill, Papa Rosa Pizza Kalbakken, Tasty Thai Grønland, Tiffany's Løren, Vestlibua.


## Produksjonsbolk 17. oktober 2026 – 13 nye prissatte restauranter

PR #965 legger til **13 selvstendige Oslo-restauranter** i canonical katalog og oppdaterer samme hovedliste fra **775 til 788 katalogposter**. I alt 22 kilder ble forsøkt etter deduplisering; 20 bestod Kartverket-/liveinntak, og sju av disse ble holdt tilbake ved semantisk vurdering eller kildeendringer (inkludert begge Zorba-kildene). To kilder ble avvist på uavklart Kartverket-adresse. Prisene er dokumentert fra Wolt-leveringsmenyer og er ikke attestert som spisesalpriser. Åpningstider og produksjonsdatabasesynkronisering er ikke særskilt verifisert.

**Publisert i denne bolken:** Big Bite Byporten, Digg Pizza Grønland, Eckers Løkka, Eckers Ullevål, FALAFEL n' JUICE Majorstuen, Golden Gyros, Injera Restaurant, Jordbærpikene Byporten, Kitchen Afrique, Pronto di Olivia Storo, Tasty Thai Bislett, Thai Food Frogner, Undercover Burger, Detaljene og rett-/prisassertasjonene ligger i katalogmanifestene. CI og målrettet endringsvalidering er publiseringsportene; ingen full katalogregresjon i denne bolken.


## Produksjonsbolk 16. oktober 2026 – 18 prissatte Wolt-restauranter

Denne endringen øker canonical katalog fra **757 til 775** Oslo-restauranter, og oppdaterer masterlisten fra **981 til 997 rader** (775 canonical + 222 øvrige kandidater). 23 kilder bestod samlet live- og adressevalidering; 18 ble promotert etter semantisk vurdering av representativt mat-/prisuttak, mens fem ble holdt utenfor. De prissatte kildene er **Wolt-leveringsmenyer**, ikke attestert fullstendige spisesalmenyer eller kjøkkentider. Kildene blir overvåket gjennom eksisterende Fysen-løype uten parserendringer. Bevis: [PR #964](https://github.com/Paradispartiet/fysen/pull/964) og [intake-artifact](https://github.com/Paradispartiet/fysen/actions/runs/38955216354/artifacts/12069613999). Tidligere avsnitt nedenfor dokumenterer historiske baseliner, ikke gjeldende totalsum.


**Åpne én fil:** [Oslo-restaurantlisten (CSV)](./oslo-restaurant-master-2026-10-13.csv).

Dette er **én sammenstilt, alfabetisk liste**, ikke en parallell produksjonskatalog. Den dekker alle **757 av 757** restaurantmanifester i Fysens katalog etter bolken 14. oktober 2026 og **224** eksterne/eldre research-oppføringer: totalt **981 rader**. Slug brukes som unik identitet for alle 757 registrerte steder. Noen av kandidatene kan være aliaser, dubletter, ikke ordinære restauranter eller stengt og må kontrolleres før opptak. Tallet 981 er **ikke** antallet unike, aktive eller gode Oslo-restauranter og ikke bevis på at alle er funnet.

| Felt | Bruk |
|---|---|
| navn / adresse | Stedets navn og kjent adresse; tomt felt betyr uavklart |
| bydel | Presist plassert bare når manifestets koordinater traff bydelsgrensen; ellers `IKKE_KLASSIFISERT`, `UAVKLART` eller `GRENSE_UAVKLART` |
| tilstede_i_fysen | `JA` = bekreftet canonical; `IKKE_IDENTIFISERT` = tidligere research til vurdering; `KANDIDAT_NETT` = ferskt eksternt navn som må matches; `MULIG_ALIAS` = sannsynlig navnevariant; `ARKIVERT` = tidligere kanonisk menyidentitet tatt ut av aktiv dekning |
| redaksjonell_status | Egen vurderingsakse: `PUBLISERT_I_FYSEN`, `ARKIVERT`, `MICHELIN_GUIDE_RELEVANT_DRIFT_UAVKLART`, `KILDEBEKREFTET_RELEVANT`, `VISITOSLO_GUIDE_RELEVANT_DRIFT_UAVKLART`, `MULIG_ALIAS`, `MATHALL_FLERE_MATAKTORER`, `PARAPLYNAVN_FLERE_FILIALER`, `SERVERINGSARENA_FLERE_KONSEPTER`, `KOMBINERT_OPPFORING`, `VINBAR_UTENFOR_RESTAURANTUTVALG`, `BAR_UTENFOR_RESTAURANTUTVALG`, `KAFE_BAKERI_UTENFOR_RESTAURANTUTVALG`, `UAVKLART`. Dette er ikke en teknisk publiseringsbeslutning eller driftsgaranti |
| katalog_slug | Eksakt canonical identitet når `JA`; mulig match ved `MULIG_ALIAS`; tidligere identitet ved `ARKIVERT` |
| kilde / notat | Opphav og kontrollbehov; historiske research-data er ikke ferskt driftsbevis |

**Bydeler:** Alle 15 Oslo-bydeler og Sentrum brukes som geografiske kontrollområder. Plassering er bare sikker der koordinater er tilgjengelige og passer geometri fra [offentlig tilgjengelig kartdatasett over Oslo-bydeler](https://github.com/AnalyseABO/Kart-fylker-og-kommuner-json/blob/main/Bydeler_Oslo_u_marka-S.json). **Ved det første grunnlagsuttrekket hadde bare 70 av 749 canonical rader** hentede koordinater; av disse var 3 uten entydig polygonmatch. Resten står bevisst uten klassifisert bydel, ikke i vilkårlige postnummerbaserte bydeler.

**Eksterne lister:** Research-kandidatene bygger på [Fysens tidligere Oslo-census](./oslo-coverage-census-2026-09-21.md), [VisitOSLOs restaurantoversikt](https://www.visitoslo.com/restaurants-nightlife/restaurants), [VisitOSLOs tilgjengelige restauranter](https://www.visitoslo.com/no/oslo-for-deg/tilgjengelighet/tilgjengelige-restauranter) og [VisitOSLOs utvalg på forsiden](https://www.visitoslo.com/no). En oppføring her er ikke bevis for aktiv drift, selvstendig gateadresse eller tilstrekkelig restaurantkvalitet.

**Hva er ferdig og hva mangler?** Selve sammenslåingen av **757 eksisterende + 224 registrerte eksterne oppføringer** er ferdig. For en påstand om **alle gode og ordinære restauranter i Oslo** må fortsatt de ikke-verifiserte delene av VisitOSLOs 330-oppføringers oversikt, bydelsvise lokale kilder, aliaser, aktualitet og manglende koordinater avstemmes. Ikke bruk antall rader som en dekningsprosent. Ingen endringer er gjort i produksjonskatalog, menyuttrekk, søk eller valideringsregler.


**Siste avstemming – Borggården 13. oktober 2026:** Researchraden «Borggården» var en faktisk dublett av eksisterende canonical `borggarden-biffrestaurant-oslo` («Borggården Biffrestaurant»), med identisk besøksadresse og førstegangsmeny. Den overflødige researchraden er fjernet, og navnealiaset er dokumentert på canonical rad. Derfor er gjeldende totalsum **980** (749 publisert + 231 øvrige) og **102** kildebekreftede relevante eksterne kandidater. Ingen ny Borggården-post opprettes.


**Batch 16. oktober 2026 – Girotondo:** Kartverket-verifisert restaurantadresse Youngs gate 19 (0301/0181) og 44 innhentede pristekster, hvor to feilklassifiserte tilleggs-/beskrivelseslinjer filtreres bort slik at 42 faktiske matposter gjenstår fra operatørens egen HTML-meny, med åtte kildedokumenterte rett-/prisassertasjoner. Ved godkjent livevalidering og merge oppdateres fordelingen til **757 canonical + 224 øvrige**, uendret **981 totalt**. Research-PR #961 dokumenterer at Casbars SE MENY-tilbud ikke tilsvarer operatørens gjeldende navn/priser, at Corso krever HTML-parservurdering (0 kanoniske retter i forsøket), og at Eataly må ha avklart Kartverket-adresse før produksjonsopptak. Ingen av de tre får publiseringsstatus gjennom denne endringen. Åpningstider og produksjonsdatabase er ikke uavhengig kontrollert.

**Batch 16. oktober 2026 – Carmel Grill:** Kandidatens egen restaurantidentitet er bekreftet av Brønnøysundregistrene, med prissatte retter i Wolt-leveringsmenyen. Ett nytt canonical manifest føres med åtte konkrete prisassertasjoner. Oslo-masterlisten beholder **981 rader** fordelt på **756 canonical + 225 øvrige** ved godkjent merge. Bygdøy Vertshus forblir kildebekreftet forskningskandidat fordi målrettet liveuttak fant bare 7 retter, manglet flere hovedretter og feiltolket allergen som egen rett. 1947 Gandhi holdes også tilbake på grunn av rettsbeskrivelser feilaktig klassifisert som retter. Wolt-leveringspriser er ikke attestert som spisesalpriser, koordinatene er ikke Kartverket-verifiserte, og produksjonsdatabase er ikke kontrollert.

**Batch #959 – Subway Lambertseter (14. oktober 2026):** En ny selvstendig katalogpost på Cecilie Thoresens vei 17 har Kartverket-koordinater og åtte konkrete rett-/prisassertasjoner fra Semeny (82 prisede mat-/tilbehørsposter, sekundær menyformidler). Oslo-masterlisten øker med én rad til **981 totalt**, **755 canonical**, **226 øvrige**. Lamberts, NAMI Asian Fusion og Smash by Ghost Town ble gjenkjent som eksisterende canonical menykilder under andre research-slugs; ingen dubletter ble opprettet. Jagger Storgata er research-only fordi menyen omfatter «Lunch Offer (Not Available)» og disse tilbudene ennå ikke er sikkert filtrert. Åpningstidene er ikke uavhengig verifisert.

**Batch #957 – to nye kildebaserte katalogposter (14. oktober 2026):** Grisen og Campo de' Fiori er innført som to selvstendige restauranter med dokumenterte Kartverket-koordinater, minimumskrav til faktiske matretter og åtte konkrete rett/prisassertasjoner hver. Begge var allerede registrert som forskningskandidater; den samme masterlisten er derfor fortsatt **980 rader** med **754 katalogposter og 226 øvrige oppføringer**. Grisen er ikke Den Glade Gris; Campo de' Fiori er ikke Brasserie Blanche selv om begge oppgir Josefines gate 23. Åpningstider er fortsatt uverifisert. **Chicago Pizza & Brew er fortsatt bare forskningskandidat:** HTTP-uttrekket dokumenterer sju L-priser, men henter ennå ikke alle XL-prisvariantene og må ikke publiseres uten dem.

**Batch #953 – Oslo-katalogtillegg (13. oktober 2026):** Tre nye kanoniske restauranter er lagt til fra prissatt operatørmeny: Alex Sushi, Big Horn Aker Brygge og Big Horn Møllergata. Alle har Kartverket-punkter og åtte uttrekksbaserte rett/prisassertasjoner hver. Oppdatert oversikt etter merge: 752 publiserte + 228 øvrige = 980 rader, hvorav 99 eksterne er kildebekreftede relevante.

**Parseravvik, holdt utenfor katalogen:** 1947 Gandhi (noen pris-paringer knyttet til ingrediens-/tekstfragmenter), Brasserie Nouvelle (fragmenter som rettsnavn), Casbar (cocktailer fremfor pizza), Grilleriet (bestillingsknapp/fragmenter), Teatro og Teatro Terrasse (bare 2 unike prisede retter per kilde i dagens parser), The Broker (HTTP 404 på HTML-kilde). Disse sju forblir eksterne forskningskandidater inntil de kan verifiseres teknisk; feilinnhold blir ikke publisert.

## Tidligere etterkontroll 13. oktober 2026

- **17 adresser** for eldre restaurantkandidater er kontrollert mot aktuelle førstegangskilder (primært restaurantenes offisielle sider; lenkene ligger i `notat` på hver rad). Ingen av disse er dermed automatisk lagt til Fysens publiserte katalog.
- **Fire bekreftede navnedubletter** er slått sammen innenfor denne ene listen, med aliaset dokumentert på beholdt rad: Dovrehallen Bar & Restaurant → Dovrehallen; Le Benjamin Bar & Bistro → Le Benjamin; Lofoten Fish Restaurant → Lofoten Fiskerestaurant; Mathallen Oslo → Mathallen Food Hall. Disse var kandidater, ikke kanoniske oppføringer.
- Etter den opprinnelige sammenslåingen: **749 JA, 196 IKKE_IDENTIFISERT, 3 KANDIDAT_NETT, 2 MULIG_ALIAS** (950 rader). Dette er fremdeles ikke en fullstendig Oslo-census. Bydel settes ikke fra postnummer eller gjetning.

## VisitOSLO-avstemming – dokumentert delkontroll 13. oktober 2026

**Omfang:** De første synlige restaurantnavnene fra VisitOSLOs nasjonale Oslo-oversikt (12 av 330 på første side), i tillegg til synlige navn på VisitOSLOs områdesider for Sentrum, Grünerløkka, Oslo øst og Oslo vest, forsiden og tilretteleggingsguiden. Dette er **ikke** en gjennomgang av alle 330 oppføringer. Sidene viser en paginert liste, og senere sider er ikke verifisert i dette kontrollpasset. Sammenligningen ble gjort mot både restaurantnavn, adresse og eksisterende canonical aliaser. VisitOSLOs brede kategorier omfatter også kafeer, barer, mathaller og selskapsservering som ikke automatisk faller innenfor Fysens mål.

**Fem nye kildeverifiserte kandidater, ikke publisert i Fysen:**

| Restaurant | Kontrollert gateadresse | Førstehåndskilde |
| --- | --- | --- |
| 1947 Gandhi Indisk Restaurant | Majorstuveien 41A, 0367 Oslo | https://www.1947gandhi.no/ |
| 26 North Restaurant & Social Club | Holbergs gate 30, 0166 Oslo | https://www.radissonhotels.com/no-no/hoteller/radisson-blu-oslo-scandinavia/restaurant-bar/26-north |
| Boho House | Skovveien 1, 0257 Oslo | https://www.visitoslo.com/no/servering/boho-house |
| Campo de' Fiori | Josefines gate 23, 0351 Oslo | https://www.campo.no/ |
| Grisen | Torshovgata 2, 0476 Oslo | https://www.oslogrisen.no/ |

**Kontrollerte eksisterende kandidater:** Ahaan (Sommerrogata 1), Apostrophe (Kirkegårdsgata 7A) og Maaemo (Dronning Eufemias gate 23) fikk kildebasert adresse og notat. Alle er fremdeles **ikke identifisert som canonical i Fysen**.

**Kjente navnevarianter:** CiCi Osteria Kirkegata = canonical *CiCi Kirkegata* på Kirkegata 23; Delicatessen Tapasbar Majorstuen = canonical *Delicatessen Majorstuen*. Begge er dokumentert på eksisterende rad, uten å lage ny kandidat. Grisen i Torshovgata 2 må ikke blandes med Den Glade Gris i St. Olavs gate.

**Mulige doble canonical identiteter:** To slugs hver for Haandtryk og Viet Kitchen deler navn og adresse. Begge er flagget i notat, men ingen manifest, slug eller produksjons-ID er slettet. Katalogen må kontrolleres før eventuell sammenslåing.

**Historisk hovedlistetall etter første avstemmingspass:** **955 rader = 749 JA + 196 IKKE_IDENTIFISERT + 8 KANDIDAT_NETT + 2 MULIG_ALIAS**. Fem nye kandidater kom til i dette passet. Ingen publiserte restauranter eller produksjonsregler er endret. Alle nye adresser ligger foreløpig med `UAVKLART` bydel inntil polygon- eller adresseverifisering; de er ikke gjettet fra postnummer.

**Gjenstående før målet om alle relevante Oslo-restauranter kan erklæres oppfylt:** avstemme resten av VisitOSLOs 330 oppføringer, kontrollere ytterligere bydelsvise uavhengige kilder, verifisere identitet for de 196 eldre kandidatene, undersøke canonical-duplikatene og fastsette bydeler geografisk. Det skal gjøres i **den samme hovedlisten**, ikke i en parallell katalog.

## Redaksjonell status i én hovedliste – gjeldende kontroll 14. oktober 2026

Den samme CSV-en har **en egen redaksjonell statuskolonne**, adskilt fra produksjonsstatusen. Tabellen nedenfor er gjeldende; etterkontrollnotater lenger ned inneholder også daterte mellomresultater. Derved blandes ikke «er god/relevant restaurant» med «har teknisk publiserbar, priset meny».

| Redaksjonell status | Antall rader | Betydning |
| --- | ---: | --- |
| `PUBLISERT_I_FYSEN` | 757 | Eksisterende katalogposter, uten endret teknisk publisering |
| `MICHELIN_GUIDE_RELEVANT_DRIFT_UAVKLART` | 18 | Aktuelt oppført i Michelin Guide, men ikke katalogisert; aktuell drift/meny må kontrolleres (gjelder også Hot Shop) |
| `KILDEBEKREFTET_RELEVANT` | 95 | Restaurantidentitet og restaurantservering dokumentert med aktuell offisiell kilde eller VisitOSLO; fremdeles ikke produksjonspublisert |
| `VISITOSLO_GUIDE_RELEVANT_DRIFT_UAVKLART` | 56 | Navngitt på nyere VisitOSLO-restaurantguider; redaksjonelt aktuelt, men drift og produksjonsmeny ikke ferdig verifisert |
| `MULIG_ALIAS` | 8 | Mulige navnevarianter som må avstemmes |
| `UAVKLART` | 0 | Resterende eksterne forsknings-/kandidatposter uten avsluttet redaksjonell vurdering |
| `MATHALL_FLERE_MATAKTORER` | 5 | Mathaller med flere matboder, ikke én selvstendig restaurant |
| `PARAPLYNAVN_FLERE_FILIALER` | 4 | Samle-/merkevarenavn som ellers ville dobbeltelt filialer |
| `SERVERINGSARENA_FLERE_KONSEPTER` | 7 | Serveringsarena med flere typer matkonsepter, ikke én restaurant |
| `KOMBINERT_OPPFORING` | 1 | VisitOSLO omtaler to restaurantkonsepter under ett fellesnavn |
| `VINBAR_UTENFOR_RESTAURANTUTVALG` | 7 | Dokumenterte vinbarer; fortsatt synlige i researchlisten, men ikke telt som ordinære restauranter |
| `BAR_UTENFOR_RESTAURANTUTVALG` | 9 | Cocktail-/hotellbarer med eventuell snacksservering |
| `KAFE_BAKERI_UTENFOR_RESTAURANTUTVALG` | 14 | Bakerier, konditorier, tesalong og kafé med avgrenset matservering |
| **Totalt** | **981** | **757 i katalogen, 224 øvrige** |


### Siste type- og identitetskontroll 13. oktober 2026

Ytterligere **11 av de 12 åpne forskningsradene** er nå kildekontrollert i samme CSV, og antallet rader med redaksjonell status `UAVKLART` er **1**. **Khab Thai Barcode og Tabuno** er dokumenterte, relevante restauranter som ennå ikke er Fysen-katalogposter. **Braud Bakeri og Kafé Villa Grande** er klassifisert som bakeri/kafé; **Bar Babylon, Rikkes Hage og Skaugum** som bar-/utelivssteder. **Sushi Restaurant Alex** og **Istanbul Restaurant Grünerløkka** er merket `MULIG_ALIAS`, men fysisk identitet må fortsatt kontrolleres i sistnevnte tilfelle fordi Fysen- og operatøradressen avviker. **Illegal Burger** og **Stykke** som generiske navn er paraplyoppføringer og blir ikke telt som selvstendige restauranter. Hver rad har kilde, vurdering og uavklarte forbehold direkte i `notat`.

**Den tidligere åpne posten «[Vin] Tjuvholmen» er nå dokumentert som vinbar på Lille Stranden 4.** Det gjenstår ingen rader med redaksjonell status `UAVKLART`, men mange øvrige kandidater har fremdeles uavklart drift og teknisk kildeegnethet. Dette betyr ikke at 980-listen er uttømmende: De 330 paginerte VisitOSLO-resultatene, de separate Michelin-/guide-kandidatene, kilde- og menyopptak og bydelsplassering gjenstår. **749/749 produksjonsmanifester er uendret.**


### Supplerende restauranter oppdaget i åpne områdeguider – 13. oktober 2026

**Åtte nye, separat kildebekreftede besøkssteder** er lagt til i **samme** hovedliste: **Brasserie Nouvelle** (Tjuvholmen allé 5), **Cordial** (Frognerveien 12B), **Lille Dilli** (Tjuvholmen allé 4), **Restaurant Teatro** (Stortingsgata 16), **Teatro Terrasse** (Dronning Mauds gate 1), **The Broker** (Bogstadveien 27), **Vadio** (Briskebyveien 26A) og **Villa Heftye** (Munkedamsveien 62A). Alle er dokumentert med operatørens egne sider, priset meny der tilgjengelig eller oppdatert områdeside; kildene og forbeholdene ligger i hver CSV-rad.

**Status nå: 972 poster**, av disse **749 publisert i Fysen**, **94 eksterne kildebekreftede restaurant-/matstedsidentiteter** og **én redaksjonelt uavklart researchpost**. Ingen av de åtte er teknisk publisert. Lille Dilli er en matbar/tasting-lab, The Broker en pub med omfattende meny; dette forklares fremfor å fremstille dem som fullservicerestauranter. Restaurant Teatro og Teatro Terrasse er **to fysisk forskjellige** pizzarestauranter og skal ikke dedupliseres som én lokasjon.

**VisitOSLOs paginerte 330-liste er fortsatt ikke uttømmende kontrollert.** Automatisk Chrome-kjøring i [PR #944](https://github.com/Paradispartiet/fysen/pull/944) ble stoppet av nettstedets Cloudflare-verifisering (HTTP 403). Den PR-en er lukket uten merge. Kildekontroll må bygge på tilgjengelige offentlige sider, og full 330/330-avstemming kan ikke hevdes gjennomført.

### Kontroll av nyere Oslo-restauranter og filialflytting – 13. oktober 2026

I denne kilderunden er **10 nye, særskilt identifiserte matserveringssteder** lagt inn i **den eksisterende CSV-en**, uten å endre de 749 aktive Fysen-postene: Bygdøy Vertshus, Der Peppern Gror Aker Brygge, Donna Ristorante, Lasarett Matbar, Manci, Marani, MoMo Ghar, Oslo Sandwich Shop Vulkan, Phin. Restaurant Løren og Spice Bazaar. Alle har selvstendig navneidentitet og verifisert gateadresse; dokumentasjonen, offisielle lenker og eventuelle adresse- og konseptforbehold ligger på hver rad.

**Tidligere status (før Bogstadveien/Aker Brygge-avstemming): 982 oppføringer = 749 Fysen-poster + 233 eksterne researchoppføringer.** Av de eksterne var **104 kildebekreftede, relevante spisesteder**, men ingen er dermed teknisk publisert. Null researchoppføringer har nå status `UAVKLART`: [VIN] Tjuvholmen er identifisert som vinbar på Lille Stranden 4. Dette betyr ikke at alle andre kandidater er teknisk verifisert eller at listen dekker hele Oslo.

**Tidligere identitetskontroll:** Operatøren oppgir at **Der Peppern Gror Bogstadveien er stengt og har flyttet til Bryggetorget 6**; den gamle publiserte Fysen-posten må derfor revideres teknisk. Den tidligere antatte dubletten **Der Peppern Gror – VIA Village / Rådhusplassen er avkreftet**: VIA Village-matboden har dokumentert inngang fra Munkedamsveien 29 og en egen Wolt-meny, mens Rådhusplassen ligger på Fridtjof Nansens plass 7. Katalogens VIA-adresse og koordinater var feil og er korrigert, uten å fjerne noen slug. **Donna og Olivia Aker Brygge** oppgir begge Stranden 3 og er bekreftet som separate restauranter, mens **Phin. Restaurant og Massimo Pizza** bruker Lørenveien 60 som gateadresse og må holdes atskilt. Ingen manifest eller produksjonssøk er endret.

**Dekningsbegrensning:** VisitOSLOs brede restaurantkatalog er fortsatt ikke kontrollert 330/330. GitHub-nettleserforsøket i [PR #944](https://github.com/Paradispartiet/fysen/pull/944) feilet med HTTP 403 og ble lukket uten merge. Arbeidet fortsetter med tilgjengelige restaurantguider, operatørkilder og bydelsvis dekningskontroll, uten å oppgi falsk dekningsprosent.

### Siste identitetsavklaring: begge [VIN]-barene – 13. oktober 2026

Både **[VIN] Tjuvholmen (Lille Stranden 4, 0252 Oslo)** og **[VIN] Bjørvika (Operagata 11, 0194 Oslo)** er bekreftet av operatørens [filialoversikt](https://www.vinoslo.no/). VisitOSLOs [egen produktprofil](https://www.visitoslo.com/eat/vin-tjuvholmen) beskriver [VIN] Tjuvholmen som vinbar. Begge forblir `VINBAR_UTENFOR_RESTAURANTUTVALG` i redaksjonell klassifisering. Den siste `UAVKLART`-posten er dermed avklart: **982 totalt, 749 publisert, 0 med status `UAVKLART`.** Dette gir ikke full katalogdekning; de 56 VisitOSLO-guidekandidatene, 18 Michelin-kandidatene, teknisk menyimport og bydelsavstemming gjenstår.

### Bogstadveien flyttet til Aker Brygge – katalogavstemming 13. oktober 2026

Operatøren bekrefter at **Bogstadveien-avdelingen er stengt og flyttet til Bryggetorget 6, 0250 Oslo**. [Wolts aktive Aker Brygge-butikk](https://wolt.com/nb/nor/oslo/restaurant/der-peppern-gror-bogstadveien) benytter fortsatt den gamle `bogstadveien`-URL-en, men viser **Der Peppern Gror Aker Brygge** og en ny meny med oppdaterte priser. Den tidligere SeMeny-siden for Bogstadveien viser fremdeles den nedlagte adressen og eldre priser; den er ikke lenger egnet som nåværende menykilde. Katalogposten beholder derfor stabil `der-peppern-gror-bogstadveien-oslo`-slug, men navn, adresse og omtrentlig [kartpunkt](https://mapcarta.com/N14125728410) er oppdatert. Første live-validering mot Wolt ble kansellert etter 20 minutters heng (GitHub Actions run 38436157837), uten verifisert ekstraksjonsresultat. Katalogens kanoniske menykilde er derfor endret til [operatørens egen prisede HTML-meny](https://akerbrygge.derpepperngror.no/meny-norsk/) med 30-retters minstekrav og åtte kildebelagte navn/pris-assertions. Leveringsprisene på Wolt og serveringsprisene hos operatøren er ikke identiske; bland dem ikke. Ny live-validering må bestås før merge. Ingen ekstra katalogpost er opprettet. Operatørkilde: https://akerbrygge.derpepperngror.no/stengt/ .

Den separate researchraden for Aker Brygge er slått sammen med den eksisterende katalogidentiteten. **Historisk 2026-10-13 etter Aker Brygge-rettelsen: 981 rader = 749 katalogposter og 232 eksterne researchoppføringer**, der **103 var kildebekreftede relevante**. Tidligere 982-/104-tall nedenfor er historiske kontrollbilder. Rettingen skal bare merges ved grønn live-menykontroll; merge i GitHub og publisering/oppfriskning av produksjonsdata er separate hendelser.

### Retting av VIA Village-kartpunkt – 13. oktober 2026

Eldre Fysen-data hadde feilaktig plassert **Der Peppern Gror – VIA Village** på **Fridtjof Nansens plass 7**, identisk med **Der Peppern Gror Rådhusplassen**. Det var en **adresse- og koordinatfeil, ikke dokumentert dobbeltregistrering**. Stedets egen Wolt-butikk oppgir [Munkedamsveien 29, 0251 Oslo](https://wolt.com/nb/nor/oslo/restaurant/der-peppern-gror-via-village), og [VisitOSLOs VIA Village-profil](https://www.visitoslo.com/eat/via-village) bekrefter Der Peppern Gror som selvstendig matbod i foodcourten. Et uavhengig [VIA Village-adressepunkt](https://norgeguide.com/oslo/rask-mat-og-gatekjokken/via-village-food-court/) gir omtrentlig koordinat **59.91218, 10.72662** (områdepunkt, ikke oppmålt inngang). Katalogmanifest og eksisterende CSV er oppdatert. **Begge restaurantenes slugs, forskjellige menybevis og kvalitetsassertions beholdes.**

**Påfølgende avklaring:** Bogstadveien-avdelingen er [oppgitt flyttet til Aker Brygge](https://akerbrygge.derpepperngror.no/stengt/); det er nå rettet i en separat katalogendring, omtalt i seksjonen over.

### Hele Michelin-utvalget er navnematchet

Michelins **offisielle 2026 Oslo-side har 28 restauranter** ([kilde](https://guide.michelin.com/no/en/oslo-region/oslo/restaurants)). **28/28 er nå funnet i samme masterliste**. Av disse er **10** merket som Fysen-katalogposter og **18** som eksterne research-oppføringer. De 18 er markert separat i kolonnen `redaksjonell_status` og har eksplisitt lenke til Michelin i `notat`. Michelin-anerkjennelse viser redaksjonell relevans, men er ikke tilstrekkelig teknisk bevis for menyparser eller drift. Ikke ekskluder dem fordi de kun publiserer sesongbaserte smaksmenyer eller pakkepriser.

Den eksisterende masterlisten inneholder også samtlige **21 restaurantnavn** på [VisitOSLOs lokalfavorittliste](https://www.visitoslo.com/restaurants-nightlife/the-taste-of-oslo/local-foodies), hvor noen er navnevarianter av samme fysisk sted. Forkortelsen «Izakaya» i VisitOSLO er *ikke* behandlet som bevist alias for «Izakaya by Vladimir Pak».

### Samme adresse betyr ikke samme restaurant

Disse er kontrollert separat mot førstegangskilder og skal **ikke** slås sammen kun ut fra postadresse:

- **Baltazar Ristorante & Enoteca** og **Café Cathedral**, Dronningens gate 27: [Baltazar](https://baltazar.no/baltazar-kontakt/) / [Café Cathedral](https://cafecathedral.no/kontakt/).
- **Campo de' Fiori** og **Brasserie Blanche**, Josefines gate 23: [Campo](https://www.campo.no/) / [Blanche](https://blanche.no/).
- **Grand Café** og **Palmen Restaurant**, Karl Johans gate 31: [Grand Hotel](https://grand.no/om-grand) / [Palmen](https://grand.no/content/palmen-restaurant).
- **Mother India** og **Pizza Baronen Bislett**, Pilestredet 63: [Mother India](https://motherindiaoslo.no/bislett/) / [Pizza Baronen](https://wolt.com/nb/nor/oslo/restaurant/pizza-baronen-bislett).

To andre par, **Haandtryk** og **Viet Kitchen**, deler navn, adresse og tilnærmet samme koordinater *og* har ulike katalog-slugs med forskjellige menykilder i sine respektive manifester. Dette er reelle potensielle doble katalogidentiteter, men man må bevare originalmanifestene frem til én trygg produksjonsmigrering kan dokumenteres. At kildene er ulike rettferdiggjør ikke to fysiske restauranter i en oversikt over unike steder.

### Utestående før fullstendighet kan erklæres

- Hovedlisten på VisitOSLO har 330 paginerte resultater. Den første siden og tilgjengelige fritt viste redaksjonelle/områdevise lister er kontrollert; **hele de 330 er ikke uttømmende høstet eller matchet**. Ingen dekningsprosent kan derfor oppgis.
- Den **ene gjenværende `UAVKLART`** krever kildeverifisering, eksklusjonsbeslutning eller aliasmatch. De 18 Michelin-restaurantene krever kontroll av aktiv drift før produksjonsopptak.
- Mange av de 749 Fysen-radene mangler verifisert bydel. Ikke gjett bydel ut fra postnummer.
- Rettelse av rettnavn og alfabetisering er separat implementert, testet, merget og publisert i [PR #941](https://github.com/Paradispartiet/fysen/pull/941). Restaurantkatalogen er fortsatt uendret.

### Kontroll av VisitOSLOs navngitte restaurantguider

I én sammenhengende gjennomgang er **56 allerede kjente, men ikke publiserte restauranter** flyttet fra generell `UAVKLART` til `VISITOSLO_GUIDE_RELEVANT_DRIFT_UAVKLART`. Dette bygger på konkrete oppføringer i nyere VisitOSLO-guider, ikke på antagelser om postnummer, restaurantkvalitet eller dagens publiserte meny. Eksempel: Brasserie Coucou, Brasserie Opera, Den Glade Gris, Ekebergrestauranten, Fish Me, KUMI Gamlebyen, KUMI Oslobukta, Keyser Social, KöD Frogner, Louise, Basso Social og Stortorvets Gjæstgiveri. Oppføringene har nå relevante kildelenker direkte i `notat` i **samme CSV**. De er ikke lagt til Fysen-produksjonskatalogen.

De kontrollerte sidene er blant andre [VisitOSLOs lokalfavoritter](https://www.visitoslo.com/restaurants-nightlife/the-taste-of-oslo/local-foodies), [utesteder med servering](https://www.visitoslo.com/no/spise-og-drikke/uteserveringer), [Michelin](https://www.visitoslo.com/no/spise-og-drikke/smaken-av-oslo/michelin), [restauranter i sentrum](https://www.visitoslo.com/no/aktiviteter-og-attraksjoner/omraader/sentrum/restauranter), [rimelige restauranter](https://www.visitoslo.com/no/oslo-for-deg/billig-oslo/billige-restauranter), [vegetar og vegansk](https://www.visitoslo.com/restaurants-nightlife/vegan-vegetarian), [hotellrestauranter](https://www.visitoslo.com/no/spise-og-drikke/lettvint-og-for-alle/hotellrestauranter) og [skjulte perler](https://www.visitoslo.com/no/oslo-for-deg/oslo-for-foodies/skjulte-perler). Flere oppføringer er omtalt på mer enn én side, men telles bare én gang i dette kontrollpasset. Kategoriene inkluderer dessuten noen serveringsformer som trenger egen vurdering mot Fysens vanlige restaurantmål. De er derfor fortsatt separat klassifisert, ikke automatisk godkjent.

### Ytterligere 14 navnematchede spisesteder – 13. oktober 2026

Et nytt kryssøk av VisitOSLOs guider ga **14 eksisterende kandidater** som kunne få dokumentert guide-relevans uten å legge til en ny rad: seks fra [fine dining](https://www.visitoslo.com/your-oslo/oslo-for-foodies/fine-dining) (Palace Grill, Kastellet, Code Restaurant, TAK Oslo, Feinschmecker og Restaurant Eik Annen Etage), fem fra [norsk restaurantmat](https://www.visitoslo.com/no/artikler/norske-restauranter) (Engebret Café, Karlsborg Spiseforretning, Havsmak, Lofotstua og Skur 33), og tre fra [lunsj](https://www.visitoslo.com/restaurants-nightlife/convenient/lunch) (Vespa & Humla, Amundsen Bryggeri & Spiseri og Hitchhiker).

Guideoppføringer gir **ikke** automatisk nåværende driftsstatus. Eksempelvis er «Restaurant À L’aise» eksplisitt merket «closed» i en VisitOSLO-oversikt og er ikke lagt inn som en ny aktiv restaurant. Verifiserte navnevarianter eller paraplyoppføringer skal ikke gi nye rader: «Südøst Restaurant»/SüdØst, «Lofoten Fish Restaurant»/Lofoten Fiskerestaurant, «Restaurant Kontrast»/Kontrast, «Credo Restaurant»/Credo og fellesoppføringen «Plah & Ahaan». Det er lagt inn presiseringer på respektive eksisterende rader.

**Historisk status etter dette delpasset:** 955 oppføringer: 749 i Fysen, 18 Michelin-guideoppføringer uten Fysen-status, 56 VisitOSLO-guideoppføringer uten Fysen-status, 13 særskilt kildebekreftede kandidater, 117 øvrige uavklarte og 2 mulige aliaser. Hver navnerad finnes fortsatt bare i én hovedliste. Den paginerte hovedoversikten på 330 VisitOSLO-oppføringer er ennå **ikke kontrollert i sin helhet**, så listen er ikke dokumentert uttømmende. Restaurantenes aktuelle åpning og eventuell menyimport krever separat kontroll.

## Tidligere kildekontroll: selvstendige restauranter og mathaller – 13. oktober 2026

Hovedlisten er oppdatert i samme fil, uten en ny parallell restaurantliste:

- **20 allerede navngitte restauranter** ble undersøkt mot deres egne restauranter/kjeders nettsider eller en spesifikk VisitOSLO-produktprofil: Hos Thea, Kafé Celsius, Grilleriet, Lille Herbern, Punk Royale, Trattoria Popolare, Koie Ramen Torggata, Koie Ramen Munch, Liminal, Trancher Grünerløkka, Grønland Boulebar, Kongen Marina, Substans, Vinoteket, STOCK Restaurant, THIEF RESTAURANT, Ruffino Ristorante Italiano, Lysebu Restaurant, Holmenkollen Restaurant og Piazza Italia. Kontrollert gateadresse og lenke står på hver rad, og status er nå `KILDEBEKREFTET_RELEVANT`.
- **Seks nye fysiske restaurantkandidater** ble funnet med uavhengig adresse: Koie Ramen Løkka (Thorvald Meyers gate 44), Agora Lilleborg (Ivan Bjørndals gate 23), Corso (Rostockgata 61), Big Horn Steakhouse Aker Brygge (Fjordalléen 2), Big Horn Steakhouse Møllergata (Møllergata 10) og Scala Restaurant (Dronning Eufemias gate 4). Kildene er henholdsvis https://koieramen.no/ , https://agoralilleborg.no/mat-drikke/ , https://www.corso.no/ , https://bighorn.no/restauranter/aker-brygge/ , https://bighorn.no/restauranter/ og https://www.visitoslo.com/eat/scala-restaurant . De er **kandidater**, ikke publisert i Fysen.
- **Koie Ramen** uten filial er en samlebetegnelse; offisiell filialliste bekrefter tre ulike adresser i Oslo (Torggata/Osterhausgate 13, Munch Brygge/Operagata 39 og Løkka/Thorvald Meyers gate 44). Samlebetegnelsen telles ikke som en fjerde restaurant.
- **Fem mathaller** er skilt fra selvstendige spisesteder: Mathallen Food Hall, Barcode Street Food, Oslo Street Food, Vippa Oslo og VIA Village. De består av forskjellige mataktører. Navnene beholdes som bakgrunnskilder, ikke som én restaurantenhet hver.
- **Mat på SALT Art & Music** er klassifisert som serveringsarena med flere tilbud. Den engelske oppføringen **Food at SALT Art & Music** er dokumentert som samme arena, ikke et nytt sted. **Plah & Ahaan** er en kombinert oppføring, ikke et tredje selvstendig konsept utover Plah og Ahaan.
- **Lille Herbern** er sesongrestaurant; offisiell sommerinformasjon dokumenterer ikke at den er åpen i oktober. Kildebekreftet relevans betyr ikke alltid at stedet er åpent på kontrolltidspunktet.

Historisk fordeling etter dette delpasset: **961 råoppføringer, hvorav 749 kanoniske Fysen-manifester, 39 kildebekreftede eksterne restaurantkandidater, 56 andre VisitOSLO-guidekandidater, 18 Michelin-kandidater, 88 uavklarte, 3 mulige aliaser og 8 paraply-/mathall-/kombinasjonsoppføringer**. Antall rader er ikke lik antall distinkte restauranter: to kanoniske navne-/adressepar (Haandtryk og Viet Kitchen) trenger fremdeles katalogmigrasjonskontroll, og noen researchposter er uttrykkelig ikke egne restauranter.

**Metodebegrensning:** VisitOSLOs hovedkatalog viser 330 treff fordelt på 28 sider, men tilgangen i dette passet viste ikke de 27 etterfølgende paginerte treffsidene. Derfor er det fortsatt ikke dokumentert at alle 330 treff er direkte sammenlignet. Aktuelle restauranter er i tillegg verifisert på særskilte produkt-/restaurant-/områdesider. Tallet 330 er ikke en absolutt eller komplett restaurantcensus for hele Oslo. De **88 gjenstående `UAVKLART`-oppføringene** trenger egen avklaring. Alle nye bydelsfelt er satt til `UAVKLART` inntil korrekt geografisk klassifisering; adressene er ikke konvertert til bydel ved gjetning.

## Kildekontroll runde 2 – 13. oktober 2026

**Tolv tidligere uavklarte restaurantkandidater** er verifisert mot spesifikke offisielle restaurantsider: Brasserie Rivoli, Girotondo, Hard Rock Cafe Oslo, Kafeteria August, Stranden 30, Grotto, Lekter'n, Lindo's, Michaels, Seaport, Roze Gastro og Pastis Bistrobar. Besøksadresse og førstehåndskilde står nå direkte i hver CSV-rad; `redaksjonell_status` er `KILDEBEKREFTET_RELEVANT`. Lekter'n er sesong-/væravhengig, og kildebekreftelse betyr ikke at den er åpen på vilkårlig kontrolltidspunkt.

**Yokoso:** Restaurantens [offisielle kontakt- og filialside](https://www.yokosorestaurant.no/kontakt) bekrefter to forskjellige restauranter: Aker Brygge, Stranden 63, og Østbanehallen, Jernbanetorget 1. **Yokoso Østbanehallen er lagt til som selvstendig kandidat**, ikke som kanonisk Fysen-post. Eksisterende researchpost «Yokoso Restaurant Aker Brygge» er markert `MULIG_ALIAS` til kanonisk «Yokoso», ikke som en ny uavhengig restaurant. **Viktig avvik:** canonical Fysen-posten oppgir «Stranden 15», mens offisiell restaurantside oppgir «Stranden 63». Katalogmanifestet er uendret inntil identitet/adresse er undersøkt. Ikke konkluder med at dette er et tredje sted eller en verifisert kanonisk gateadresse.

**Historisk hovedliste etter forrige delkontroll:** **962 råoppføringer** – 749 Fysen-poster, 52 særskilt kildebekreftede kandidater, 56 VisitOSLO-guidekandidater, 18 Michelin-guidekandidater, 75 ennå uavklarte, fire aliaser og åtte mathall-/paraply-/kombinasjonsoppføringer. Hovedlisten inneholder ikke 962 dokumenterte unike aktive restauranter; publiseringsstatus er en separat vurdering.

Den paginerte VisitOSLO-listen med 330 oppføringer er fortsatt ikke gjennomgått uttømmende. Fullstendig bydelsfordeling og de 75 øvrige kandidatene gjenstår. Feilen med symboler/tall i rettnavn på Fysens søkeside er **ikke endret i denne dokumentasjonskontrollen**, i henhold til arbeidsrekkefølgen.

## Gjeldende delkontroll: ordinære restauranter mot andre serveringssteder – 13. oktober 2026

I den **samme master-CSV-en** er 24 uavklarte rader gjennomgått mot identifiserbare VisitOSLO-produktsider og restaurant-/hotellkilder. Hver oppdatert rad inneholder kildelenke og kort begrunnelse. De er fordelt slik:

- **5 relevante restaurantkandidater**: Mett på MUNCH (egen MUNCH Restaurant med middag), Nasjonalmuseet Kafe (også middagsretter), Ostebutikken Deli & Bistro (supper/retter), The Top Terrace (egen sesong-/takterrassemeny, drift må kontrolleres) og Anne på landet – Frognerparken (lunsj- og middagsretter). Disse er `KILDEBEKREFTET_RELEVANT`, ikke automatisk publiserte i Fysen. MUNCHs [egen restaurantside](https://www.munch.no/mat-drikke-MUNCH/), [VisitOSLOs Nasjonalmuseet Kafe](https://www.visitoslo.com/eat/nasjonalmuseet-kafe), [Ostebutikken](https://www.visitoslo.com/misc/ostebutikken-deli-bistro), [The Top Terrace](https://www.visitoslo.com/eat/the-top-terrace) og [Anne på landet](https://www.visitoslo.com/eat/anne-p-landet-frognerparken) viser kildene.
- **To nye, fysisk selvstendige matsteder**: [Maschmanns Bakery and Pizzeria](https://www.maschmanns.no/) og [Chicago Pizza & Brew](https://www.chicagopizza.no/). Førstnevnte er et bakeri *og* en selvstendig pizzeria innenfor Maschmanns matmarked; markedet selv er en serveringsarena og ikke en ekstra restaurant. Begge er foreløpig kun kandidater.
- **5 vinbarer, 4 cocktail-/hotellbarer og 7 kafé-/bakeri-/konditorioppføringer** er klassifisert separat. Dette er ikke slettede bedrifter, men restauranthovedlisten behandler dem ikke som ordinære middagsrestauranter. Kildegrunnlag: [VisitOSLO vinbarer](https://www.visitoslo.com/restaurants-nightlife/nightlife/wine-bars-in-oslo), [cocktailbarer](https://www.visitoslo.com/your-oslo/oslo-for-foodies/cocktail-scene), [kafeer](https://www.visitoslo.com/restaurants-nightlife/cafe) og de enkelte produktoppslagene i radene.
- **Godt Brød bakery** er identifisert som en felles kjedeoppføring med seks ulike filialer ([VisitOSLO](https://www.visitoslo.com/eat/godt-br-d-bakery)). **Maschmanns Food Market** er markert som serveringsarena med flere konsepter ([VisitOSLO](https://www.visitoslo.com/misc/maschmanns-food-market)). Navnevarianten **Ostebutikken Delikatesse & Bistro** er markert som mulig alias til Ostebutikken Deli & Bistro, ikke et automatisk ekstra sted.
- Postnummeret til **Maschmanns** er satt til **0279** i henhold til [restaurantens egen side](https://www.maschmanns.no/), som avviker fra 0278 på VisitOSLO. **Becco** er registrert i **0164** ifølge [Brønnøysundregistrene](https://virksomhet.brreg.no/nb/oppslag/enheter/926195190), selv om VisitOSLO har en annen postnummeroppføring.

**Historisk totalt etter dette delpasset:** **964 oppføringer**: 749 Fysen, 59 kildebekreftede restaurantkandidater, 56 VisitOSLO-guidekandidater, 18 Michelin-guidekandidater, 51 uavklarte, 5 mulige aliaser, 5 mathaller, 2 paraplynavn, 2 serveringsarenaer, 1 kombinasjonsoppføring, 5 vinbarer, 4 cocktailbarer og 7 kafé-/bakerioppføringer. **Dette er ikke 964 unike ordinære restauranter.**

**Viktig gjenværende avgrensning:** VisitOSLOs brede restaurantliste viser 330 treff på 28 paginerte sider. Bare første side ble tilgjengelig direkte i denne kontrollen; forsøk på ordinære `?page=2` og `?start=12`-URL-er ga ikke tilgang til side 2. Dette passet må derfor ikke omtales som full avstemming av samtlige 330. De **37 resterende `UAVKLART`** må undersøkes med konkrete kilder. Bydelsklassifisering uten verifiserte koordinater gjenstår. Aktiv Fysen-katalog og søkegrensesnitt er ikke endret.

## Kildekontroll av flere spisesteder – 13. oktober 2026

Ytterligere **14 eksisterende rader** i samme CSV er avklart med direkte produktprofiler. Blant disse er **8 restauranter/spisesteder med dokumentert tilberedt måltidsservering** som nå er `KILDEBEKREFTET_RELEVANT`: Farine (kveldspizza), Grünerløkka Brygghus (gastropub med eget kjøkken), Dattera til Hagen (burgere, pasta og tapas), Eataly Ristorante (italiensk restaurant), Peloton (egen pizzameny), Spor av Nord (nordnorsk middagsservering), Raadhuset (meksikanske retter i aktivitetsbar) og Frognerseteren Kafé Seterstua (selvbetjening med varme middagsretter, separat fra Finstua). Kildene ligger på hver rad og er fra VisitOSLOs egne besøksprofiler. Disse stedene er **ikke** automatisk produksjonsklare.

Av de øvrige seks radene er Åpent Bakeri Barcode, Åpent Bakeri Inkognito terrasse og Kafé Vigeland dokumentert som kafé-/bakerioppføringer, Voksenåsen Bar & Terrace som hotellbar med enklere matservering, Posthallen Drinkhub som **barhall med åtte barer** (ikke en individuell restaurant), og Jimmy's som et sannsynlig navnealias til Fysens eksisterende Jimmy's Restaurant & Bar på Leirfallsgata 6. Ingen av radene er slettet.

**Ny redaksjonell status:** 964 oppføringer, 749 i Fysen, 67 særskilt kildebekreftede restauranter, 56 VisitOSLO-guidekandidater, 18 Michelin-kandidater, 37 uavklarte, 6 mulige aliaser, 5 vinbarer, 5 barer, 10 kafé-/bakerioppføringer, 5 mathaller, 3 serveringsarenaer, 2 paraplynavn og 1 kombinert oppføring. Den paginerte 330-listen hos VisitOSLO og full bydelsgeografi er fortsatt ikke dokumentert ferdig. Ingen Fysen-søk eller produksjonsdata er endret.

### Ny kildekontroll – 25 tidligere uavklarte oppføringer (13. oktober 2026)

25 eksisterende researchrader er avstemt mot nylig tilgjengelige kilder. Redaksjonell status `UAVKLART` går **37 → 12**, uten å øke antallet oppføringer eller endre aktive restauranter i Fysen. Hver endret rad har konkret kildelenke, typevurdering og besøksadresse der denne kunne verifiseres. Endringen er **kun CSV og denne dokumentasjonen**, ikke ny katalogimport.

Kildebekreftede restaurant-/matsteder: Bistro Fourrage, Borggården, Carmel Grill, Casbar, Crow Bar & Brewery, Falafel Me, Fox and Loaf, Jakobs Hage (sesong), Kunstnernes Jur, Palate, Papa Rosa, Pascal Henrik Ibsens gate, Riviera Restaurant & Bar, Shutter by Sky (sesong), Stangeriet, Syverkiosken og Waaberi (adressestrid). Kafé/bakeri: Bakeriet ved Credo og Daegens. Vinbar/pub: Vinkassen og Store Stå Pub. Flerkonsepts- eller serveringsarenaer: Brygg, Carls, Feast at MUNCH og Underground Golf Club. Klassene er redaksjonelle og ingen restaurant får produksjonsstatus av dette.

**Gjenstående:** 12 `UAVKLART`, samtlige 330 paginerte VisitOSLO-treff er ennå ikke uttømmende navne-/adresseavstemt, samt manglende verifisert bydel, aliaser og drift/menyimport for researchkandidater.
