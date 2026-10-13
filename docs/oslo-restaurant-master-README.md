# Oslo-restauranter — samlet arbeidsliste (13. oktober 2026)

**Åpne én fil:** [Oslo-restaurantlisten (CSV)](./oslo-restaurant-master-2026-10-13.csv).

Dette er **én sammenstilt, alfabetisk liste**, ikke en parallell produksjonskatalog. Den dekker alle **749 av 749** restaurantmanifester i Fysens katalog på commit `08c748003d1748a8282917cbd43198509a89e822` og **206** eksterne/eldre research-oppføringer: totalt **955 rader**. Slug brukes som unik identitet for alle 749 registrerte steder. Noen av kandidatene kan være aliaser, dubletter, ikke ordinære restauranter eller stengt og må kontrolleres før opptak. Tallet 955 er **ikke** antallet unike, aktive eller gode Oslo-restauranter og ikke bevis på at alle er funnet.

| Felt | Bruk |
|---|---|
| navn / adresse | Stedets navn og kjent adresse; tomt felt betyr uavklart |
| bydel | Presist plassert bare når manifestets koordinater traff bydelsgrensen; ellers `IKKE_KLASSIFISERT`, `UAVKLART` eller `GRENSE_UAVKLART` |
| tilstede_i_fysen | `JA` = bekreftet canonical; `IKKE_IDENTIFISERT` = tidligere research til vurdering; `KANDIDAT_NETT` = ferskt eksternt navn som må matches; `MULIG_ALIAS` = sannsynlig navnevariant |
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
