# Oslo-restauranter — samlet arbeidsliste (13. oktober 2026)

**Åpne én fil:** [Oslo-restaurantlisten (CSV)](./oslo-restaurant-master-2026-10-13.csv).

Dette er **én sammenstilt, alfabetisk liste**, ikke en parallell produksjonskatalog. Den dekker alle **749 av 749** restaurantmanifester i Fysens katalog på commit `08c748003d1748a8282917cbd43198509a89e822` og **201** eksterne/eldre research-oppføringer: totalt **950 rader**. Slug brukes som unik identitet for alle 749 registrerte steder. Noen av kandidatene kan være aliaser, dubletter, ikke ordinære restauranter eller stengt og må kontrolleres før opptak. Tallet 954 er **ikke** antallet unike, aktive eller gode Oslo-restauranter og ikke bevis på at alle er funnet.

| Felt | Bruk |
|---|---|
| navn / adresse | Stedets navn og kjent adresse; tomt felt betyr uavklart |
| bydel | Presist plassert bare når manifestets koordinater traff bydelsgrensen; ellers `IKKE_KLASSIFISERT`, `UAVKLART` eller `GRENSE_UAVKLART` |
| tilstede_i_fysen | `JA` = bekreftet canonical; `IKKE_IDENTIFISERT` = tidligere research til vurdering; `KANDIDAT_NETT` = ferskt eksternt navn som må matches; `MULIG_ALIAS` = sannsynlig navnevariant |
| katalog_slug | Eksakt canonical identitet når `JA`; mulig match ved `MULIG_ALIAS` |
| kilde / notat | Opphav og kontrollbehov; historiske research-data er ikke ferskt driftsbevis |

**Bydeler:** Alle 15 Oslo-bydeler og Sentrum brukes som geografiske kontrollområder. Plassering er bare sikker der koordinater er tilgjengelige og passer geometri fra [offentlig tilgjengelig kartdatasett over Oslo-bydeler](https://github.com/AnalyseABO/Kart-fylker-og-kommuner-json/blob/main/Bydeler_Oslo_u_marka-S.json). **Bare 70 av de 749 canonical radene** hadde koordinater hentet i dette uttrekket; av disse var 3 uten entydig polygonmatch. Resten står bevisst uten klassifisert bydel, ikke i vilkårlige postnummerbaserte bydeler.

**Eksterne lister:** Research-kandidatene bygger på [Fysens tidligere Oslo-census](./oslo-coverage-census-2026-09-21.md), [VisitOSLOs restaurantoversikt](https://www.visitoslo.com/restaurants-nightlife/restaurants), [VisitOSLOs tilgjengelige restauranter](https://www.visitoslo.com/no/oslo-for-deg/tilgjengelighet/tilgjengelige-restauranter) og [VisitOSLOs utvalg på forsiden](https://www.visitoslo.com/no). En oppføring her er ikke bevis for aktiv drift, selvstendig gateadresse eller tilstrekkelig restaurantkvalitet.

**Hva er ferdig og hva mangler?** Selve sammenslåingen av **749 eksisterende + 201 kjente eksterne kandidater** er ferdig. For en påstand om **alle gode og ordinære restauranter i Oslo** må fortsatt den brede VisitOSLO-listen (330 oppføringer ved oktoberkontrollen), bydelsvise lokale kilder, aliaser, aktualitet og manglende koordinater avstemmes. Ikke bruk summen 954 som en dekningsprosent. Ingen endringer er gjort i produksjonskatalog, menyuttrekk, søk eller valideringsregler.

## Etterkontroll 13. oktober 2026

- **17 adresser** for eldre restaurantkandidater er kontrollert mot aktuelle førstegangskilder (primært restaurantenes offisielle sider; lenkene ligger i `notat` på hver rad). Ingen av disse er dermed automatisk lagt til Fysens publiserte katalog.
- **Fire bekreftede navnedubletter** er slått sammen innenfor denne ene listen, med aliaset dokumentert på beholdt rad: Dovrehallen Bar & Restaurant → Dovrehallen; Le Benjamin Bar & Bistro → Le Benjamin; Lofoten Fish Restaurant → Lofoten Fiskerestaurant; Mathallen Oslo → Mathallen Food Hall. Disse var kandidater, ikke kanoniske oppføringer.
- Etter sammenslåing: **749 JA, 196 IKKE_IDENTIFISERT, 3 KANDIDAT_NETT, 2 MULIG_ALIAS**. Dette er fremdeles ikke en fullstendig Oslo-census. Bydel settes ikke fra postnummer eller gjetning.
