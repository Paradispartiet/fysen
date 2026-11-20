# Kebab i pita – kildekontroll og bildeutvalg, 19. november 2026

**Status: IKKE GODKJENT.** PR #1253 er et utkast, stablet oppå PR #1252. Ingen ny stororiginal skal telles, og ingen produksjonspublisering eller merge er autorisert.

## Hva som er gjort

- Kildejobben har hentet **11 originale Pexels-fotografier** til midlertidige GitHub Actions-artifakter, med SHA-256, originalformat, kildepikselmål, 1100px forhåndsvisning og 1400×1400 native-detaljutsnitt.
- Ytterligere Wikimedia Commons-bilder ble forsøkt via både Special:FilePath og direkte original-URL-er, men returnerte **HTTP 429**; ikke fremstilt som hentede eller kontrollerte kilder.
- Den beste reelle pitakandidaten ble `doner-fresh-vegetables`, Pexels-foto **29306504** av **Nano Erdozain**, 4000 × 7112 originale piksler. Kilde: https://www.pexels.com/photo/delicious-doner-kebab-with-fresh-vegetables-29306504/ ; vilkår: https://www.pexels.com/license/ ; original SHA-256: `17b367c89b9ec073b1da27505dae02c3e2641f34db586b66028ee8ac1bc4b750`.
- To maskeringsforhåndsvisninger ble generert fra eksakt, SHA-kontrollert original med originalmatpikslene bevart, og svart bakgrunn. Ingen bildesyntese, oppskalering, nytt fyll eller endret mat.
- **Begge maskeringene er visuelt avvist:** papir med logo og restkanter er fortsatt synlig ved brødet, og bunnen av pitabrødet er ikke fotografert som én hel sammenhengende servering. En ny maske alene vil ikke kunne gjenopprette ukjent skjult mat uten uakseptabel syntese.
- Andre kandidater er enten rulle-wraps, sandwich med ost/salami, tallerken med grillmat i stedet for fylt pita, ekstra drikke/pommes frites som ikke lar seg skille naturlig, eller visuelt for myke. Ingen av dem er promotert.

## Beslutning og avgrensning

**Avvist som stort Fysen-bilde.** IKKE sett `largeViewEnabled`, endre manifest, kopier artifakter til `apps/web/public` eller omtal dette som 12/44. Staging og bildeeksperiment er fullført; kvalitetsgodkjenning og publisering er ikke gjennomført.

Fortsett med en **ny, faktisk hel pita fylt med kebabkjøtt, salat, tomat og eventuelt saus**, fotografert uten emballasje på et visuelt separerbart underlag, native minst 1600 × 1600, med dokumenterte bruksrettigheter. Få en faktisk svart sluttvisning uten kutt og papir, en egen 512px miniatyr, oppdater den eksakte manifestoppføringen og kjør bare de to relevante galleri-/storbildekontrollene.

**Status ved kontroll:** `main` = 10/44, PR #1252 = 11/44 (upublisert), PR #1253 = fortsatt 11/44 før en ny kebab-original er godkjent. PR #1253 merges ikke direkte til main.

## 20. november 2026 – to nye originaler og separat Commons-sjekk

- **Pexels 6941000**: `gyro-pita-with-fries`, ekte 4160 × 6240 bildepiksler, original SHA-256 `962b99ef7ea4d5b92321bb7db3a71cd7ec97089c85fdbb314d49290bca8e1c72`. Visuell kildekontroll: en rett med pommes frites **inne i** en delvis åpen gyros/pita, men pitabrødet ligger fortsatt på og delvis i dekorert papir. Papiret overlapper brødets bunn og vil gi unaturlig avskjæring. **Avvist** for svart sluttbakgrunn, selv om bildets oppløsning er god.
  Kilde: https://www.pexels.com/photo/gyro-with-pita-and-french-fries-with-vegetables-and-herbs-6941000/
- **Pexels 5191848**: `grilled-kebab-on-pita`, ekte 2500 × 2255 bildepiksler, original SHA-256 `31ba5e8e8c04c4bcd4fa6e04002dbf866502d2c6ca63d2ce799b9d2a23682553`. Visuell kildekontroll: grillspyd og kjøttstykker på et flatt pitabrød, **ikke fylt pita med kebab og grønnsaker**; deler av salatfatet er også avkuttet. **Avvist som feil rettvariant**, uavhengig av oppløsning.
  Kilde: https://www.pexels.com/photo/grilled-kebab-with-pita-bread-5191848/
- Wikimedia Commons-originalene `Gyros.jpg` (3024 × 2016), `Gyro meat.jpg` (2304 × 2880), `Gyro with fries.jpg` (3072 × 2304), `Pita giros.JPG` (3072 × 2304), og `Gyros pita.jpg` (4288 × 2848) har fotorettigheter oppgitt på Commons, men viser enten papir/folie rundt maten, en åpen kjøtt-tallerken eller flere serveringer. De løser ikke kravene for **én hel emballasjefri fylt kebab-pita**. Ingen Commons-filer lastet ned til PR i denne runden, og tidligere 429-grense er fortsatt en praktisk hindring.

**Beslutning:** Fremdeles ingen kvalitetsgodkjent kandidat. Ikke oppdater `manifest.json`, ikke merk rett 12 som ferdig, og ikke merge denne PR-en til `main`. Å lage en kunstig fylling eller bunndel for å skjule papiret er eksplisitt utelukket.
