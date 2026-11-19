# Pizza med prosciutto – bildegjennomgang 19. november 2026

**Status: Utkast – ikke kvalitetsgodkjent, ikke merget, ikke publisert.**
Fysens godkjente skarpe rettbilder er fortsatt **10 av 44** i `main`.
Arbeidet skjer bare i PR #1252; denne retten teller ikke før ferdig godkjent storbilde og miniatyr.

## Verifisert kildearbeid

Bilder er hentet direkte fra `images.pexels.com` med innholdets SHA-256, opprinnelig pikseloppløsning, 1100px forhåndsvisning, og utsnitt på 1400×1400 **ekte originalpiksler**. Opprinnelig JPEG lagres kun som midlertidig GitHub Actions-artefakt. Pexels-bildesider og tillatelse må bekreftes for valgt sluttbilde.

Kandidatvurderinger av faktisk bildemateriale:
- **16677739 og 16677744** – hel pizza med spekeskinke/ruccola. 1:1 detaljutsnitt er tydelig mykere enn ønsket; ikke skarphetsgodkjent.
- **14866675** – hender og bestikk dekker pizzaen. Avvist som selvstendig redaksjonelt rettbilde.
- **5903268** – beskåret pizza og enda en pizza i bakgrunnen. Avvist.
- **32764492** – bare del av pizzaen vises. Avvist.
- **4748439** – ikke hel pizza, flaske på bildet. Avvist.
- **4748451** – hele serveringen er ikke bevart innenfor bildet; støyende bord/utstyr. Ikke godkjent.
- **16677733** – pizzaen er delvis utenfor bildekanten. Ikke godkjent.
- **18285316** – **Valeria Boltneva, Pexels**, 5464 × 8192, SHA-256 `ff1d08bd7b5b665ae15139a39c80dd0473a0d342338c89b95147df385278003d`.
  Originalen har godt bevarte prosciutto-/ruccola-detaljer i 1:1 utsnitt. Første maskeforsøk produserte svart bakgrunn, men beholdt papir, skjærefjøl, en hånd og uønskede kantrester. **Avvist som sluttbilde**, selv om GitHub Actions-jobben bestod teknisk.
  Kilde: https://www.pexels.com/photo/delicious-pizza-on-board-on-wooden-table-18285316/
- **34413630, 16677741, 16677736, 29807155 og 5903308** – ytterligere kilder legges til for alternativ visuell gjennomgang. Ingen automatisk godkjenning.

## Sperrer før produksjon

1. Velg kun en faktisk kilde med hele pizzaen, korrekt prosciutto-variant, klar 1:1-skarphet og etterprøvbar lisens/fotograf.
2. Fjern bord/bakepapir/hender og annen bakgrunn til ekte svart **uten å klippe pizzaen**, uten generering av matdetaljer og uten oppskalering. Vurder sluttresultatet visuelt på normal og 1:1 størrelse.
3. Først deretter: behold native master i minst 1600 px AVIF, separat 512×512 AVIF-miniatyr, lisens- og kildebevis, en enkelt manifest- og gallerikobling og kun `dish-image-large-view-quality.test.mjs` samt `dish-photo-gallery.test.mjs`.
4. Ingen endring i hovedgalleri, restaurantmenyer, `main`, Vercel-deploy eller økonomiske tjenester før godkjenning.

Ikke sett `approved_for_fysen=true` ut fra en grønn GitHub Actions-jobb. En faktisk tilfredsstillende visuell sluttkontroll kreves.
