# Oslo-restauranter — samlet arbeidsliste (13. oktober 2026)

**Åpne én fil:** [Oslo-restaurantlisten (CSV)](./oslo-restaurant-master-2026-10-13.csv).

Dette er **én sammenstilt, alfabetisk liste**, ikke en parallell produksjonskatalog. Den dekker alle **749 av 749** restaurantmanifester i Fysens katalog på commit `08c748003d1748a8282917cbd43198509a89e822` og **206** eksterne/eldre research-oppføringer: totalt **955 rader**. Slug brukes som unik identitet for alle 749 registrerte steder. Noen av kandidatene kan være aliaser, dubletter, ikke ordinære restauranter eller stengt og må kontrolleres før opptak. Tallet 955 er **ikke** antallet unike, aktive eller gode Oslo-restauranter og ikke bevis på at alle er funnet.

| Felt | Bruk |
|---|---|
| navn / adresse | Stedets navn og kjent adresse; tomt felt betyr uavklart |
| bydel | Presist plassert bare når manifestets koordinater traff bydelsgrensen; ellers `IKKE_KLASSIFISERT`, `UAVKLART` eller `GRENSE_UAVKLART` |
| tilstede_i_fysen | `JA` = bekreftet canonical; `IKKE_IDENTIFISERT` = tidligere research til vurdering; `KANDIDAT_NETT` = ferskt eksternt navn som må matches; `MULIG_ALIAS` = sannsynlig navnevariant |
| redaksjonell_status | Egen vurderingsakse: `PUBLISERT_I_FYSEN`, `MICHELIN_GUIDE_RELEVANT_DRIFT_UAVKLART`, `KILDEBEKREFTET_RELEVANT`, `VISITOSLO_GUIDE_RELEVANT_DRIFT_UAVKLART`, `MULIG_ALIAS`, `UAVKLART`. Dette er ikke en teknisk publiseringsbeslutning eller driftsgaranti |
| katalog_slug | Eksakt canonical identitet når `JA`; mulig match ved `MULIG_ALIAS` |
| kilde / notat | Opphav og kontrollbehov; historiske research-data er ikke ferskt driftsbevis |

**Bydeler:** Alle 15 Oslo-bydeler og Sentrum brukes som geografiske kontrollområder. Plassering er bare sikker der koordinater er tilgjengelige og passer geometri fra [offentlig tilgjengelig kartdatasett over Oslo-bydeler](https://github.com/AnalyseABO/Kart-fylker-og-kommuner-json/blob/main/Bydeler_Oslo_u_marka-S.json). **Bare 70 av de 749 canonical radene** hadde koordinater hentet i dette uttrekket; av disse var 3 uten entydig polygonmatch. Resten står bevisst uten klassifisert bydel, ikke i vilkårlige postnummerbaserte bydeler.

**Eksterne lister:** Research-kandidatene bygger på [Fysens tidligere Oslo-census](./oslo-coverage-census-2026-09-21.md), [VisitOSLOs restaurantoversikt](https://www.visitoslo.com/restaurants-nightlife/restaurants), [VisitOSLOs tilgjengelige restauranter](https://www.visitoslo.com/no/oslo-for-deg/tilgjengelighet/tilgjengelige-restauranter) og [VisitOSLOs utvalg på forsiden](https://www.visitoslo.com/no). En oppføring her er ikke bevis for aktiv drift, selvstendig gateadresse eller tilstrekkelig restaurantkvalitet.

**Hva er ferdig og hva mangler?** Selve sammenslåingen av **749 eksisterende + 206 registrerte eksterne kandidater** er ferdig. For en påstand om **alle gode og ordinære restauranter i Oslo** må fortsatt den brede VisitOSLO-listen (330 oppføringer ved oktoberkontrollen), bydelsvise lokale kilder, aliaser, aktualitet og manglende koordinater avstemmes. Ikke bruk summen 954 som en dekningsprosent. Ingen endringer er gjort i produksjonskatalog, menyuttrekk, søk eller valideringsregler.

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

**Nåværende hovedlistetall:** **955 rader = 749 JA + 196 IKKE_IDENTIFISERT + 8 KANDIDAT_NETT + 2 MULIG_ALIAS**. Fem nye kandidater kom til i dette passet. Ingen publiserte restauranter eller produksjonsregler er endret. Alle nye adresser ligger foreløpig med `UAVKLART` bydel inntil polygon- eller adresseverifisering; de er ikke gjettet fra postnummer.

**Gjenstående før målet om alle relevante Oslo-restauranter kan erklæres oppfylt:** avstemme resten av VisitOSLOs 330 oppføringer, kontrollere ytterligere bydelsvise uavhengige kilder, verifisere identitet for de 196 eldre kandidatene, undersøke canonical-duplikatene og fastsette bydeler geografisk. Det skal gjøres i **den samme hovedlisten**, ikke i en parallell katalog.

## Redaksjonell avstemming av én hovedliste – 13. oktober 2026

Den samme CSV-en har nå **en egen redaksjonell statuskolonne**, adskilt fra produksjonsstatusen. Derved blandes ikke «er god/relevant restaurant» med «har teknisk publiserbar, priset meny».

| Redaksjonell status | Antall rader | Betydning |
| --- | ---: | --- |
| `PUBLISERT_I_FYSEN` | 749 | Eksisterende katalogposter, uten endret teknisk publisering |
| `MICHELIN_GUIDE_RELEVANT_DRIFT_UAVKLART` | 18 | Aktuelt oppført i Michelin Guide, men ikke katalogisert; aktuell drift/meny må kontrolleres (gjelder også Hot Shop) |
| `KILDEBEKREFTET_RELEVANT` | 13 | Restaurantidentitet og restaurantservering dokumentert med aktuell offisiell kilde eller VisitOSLO; fremdeles ikke produksjonspublisert |
| `VISITOSLO_GUIDE_RELEVANT_DRIFT_UAVKLART` | 56 | Navngitt på nyere VisitOSLO-restaurantguider; redaksjonelt aktuelt, men drift og produksjonsmeny ikke ferdig verifisert |
| `MULIG_ALIAS` | 2 | Mulige navnevarianter som må avstemmes |
| `UAVKLART` | 117 | Resterende eksterne forsknings-/kandidatposter uten avsluttet redaksjonell vurdering |
| **Totalt** | **955** | **749 i katalogen, 206 øvrige** |

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
- De **117 `UAVKLART`** krever kildeverifisering, eksklusjonsbeslutning eller aliasmatch. De 18 Michelin-restaurantene krever kontroll av aktiv drift før produksjonsopptak.
- Mange av de 749 Fysen-radene mangler verifisert bydel. Ikke gjett bydel ut fra postnummer.
- Feil i søkevisning av rettnavn og tegn-/tallsortering er et **separat produktproblem** og er ikke endret i dette restaurantoversiktspasset.

### Kontroll av VisitOSLOs navngitte restaurantguider

I én sammenhengende gjennomgang er **56 allerede kjente, men ikke publiserte restauranter** flyttet fra generell `UAVKLART` til `VISITOSLO_GUIDE_RELEVANT_DRIFT_UAVKLART`. Dette bygger på konkrete oppføringer i nyere VisitOSLO-guider, ikke på antagelser om postnummer, restaurantkvalitet eller dagens publiserte meny. Eksempel: Brasserie Coucou, Brasserie Opera, Den Glade Gris, Ekebergrestauranten, Fish Me, KUMI Gamlebyen, KUMI Oslobukta, Keyser Social, KöD Frogner, Louise, Basso Social og Stortorvets Gjæstgiveri. Oppføringene har nå relevante kildelenker direkte i `notat` i **samme CSV**. De er ikke lagt til Fysen-produksjonskatalogen.

De kontrollerte sidene er blant andre [VisitOSLOs lokalfavoritter](https://www.visitoslo.com/restaurants-nightlife/the-taste-of-oslo/local-foodies), [utesteder med servering](https://www.visitoslo.com/no/spise-og-drikke/uteserveringer), [Michelin](https://www.visitoslo.com/no/spise-og-drikke/smaken-av-oslo/michelin), [restauranter i sentrum](https://www.visitoslo.com/no/aktiviteter-og-attraksjoner/omraader/sentrum/restauranter), [rimelige restauranter](https://www.visitoslo.com/no/oslo-for-deg/billig-oslo/billige-restauranter), [vegetar og vegansk](https://www.visitoslo.com/restaurants-nightlife/vegan-vegetarian), [hotellrestauranter](https://www.visitoslo.com/no/spise-og-drikke/lettvint-og-for-alle/hotellrestauranter) og [skjulte perler](https://www.visitoslo.com/no/oslo-for-deg/oslo-for-foodies/skjulte-perler). Flere oppføringer er omtalt på mer enn én side, men telles bare én gang i dette kontrollpasset. Kategoriene inkluderer dessuten noen serveringsformer som trenger egen vurdering mot Fysens vanlige restaurantmål. De er derfor fortsatt separat klassifisert, ikke automatisk godkjent.

### Ytterligere 14 navnematchede spisesteder – 13. oktober 2026

Et nytt kryssøk av VisitOSLOs guider ga **14 eksisterende kandidater** som kunne få dokumentert guide-relevans uten å legge til en ny rad: seks fra [fine dining](https://www.visitoslo.com/your-oslo/oslo-for-foodies/fine-dining) (Palace Grill, Kastellet, Code Restaurant, TAK Oslo, Feinschmecker og Restaurant Eik Annen Etage), fem fra [norsk restaurantmat](https://www.visitoslo.com/no/artikler/norske-restauranter) (Engebret Café, Karlsborg Spiseforretning, Havsmak, Lofotstua og Skur 33), og tre fra [lunsj](https://www.visitoslo.com/restaurants-nightlife/convenient/lunch) (Vespa & Humla, Amundsen Bryggeri & Spiseri og Hitchhiker).

Guideoppføringer gir **ikke** automatisk nåværende driftsstatus. Eksempelvis er «Restaurant À L’aise» eksplisitt merket «closed» i en VisitOSLO-oversikt og er ikke lagt inn som en ny aktiv restaurant. Verifiserte navnevarianter eller paraplyoppføringer skal ikke gi nye rader: «Südøst Restaurant»/SüdØst, «Lofoten Fish Restaurant»/Lofoten Fiskerestaurant, «Restaurant Kontrast»/Kontrast, «Credo Restaurant»/Credo og fellesoppføringen «Plah & Ahaan». Det er lagt inn presiseringer på respektive eksisterende rader.

**Status etter dette passet:** 955 oppføringer: 749 i Fysen, 18 Michelin-guideoppføringer uten Fysen-status, 56 VisitOSLO-guideoppføringer uten Fysen-status, 13 særskilt kildebekreftede kandidater, 117 øvrige uavklarte og 2 mulige aliaser. Hver navnerad finnes fortsatt bare i én hovedliste. Den paginerte hovedoversikten på 330 VisitOSLO-oppføringer er ennå **ikke kontrollert i sin helhet**, så listen er ikke dokumentert uttømmende. Restaurantenes aktuelle åpning og eventuell menyimport krever separat kontroll.
