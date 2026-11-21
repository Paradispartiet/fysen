# Matlyst – kildevurdering: grønn curry og bánh mì (21. november 2026)

**Status: KUN KANDIDATER. Ingen godkjenning, ingen katalogaktivering, ingen Vercel-publisering.**

Kildejobb i [PR #1283](https://github.com/Paradispartiet/fysen/pull/1283) har lastet ned og kontrollert fire ekte originalfotografier. Samtlige har kilde-side, fotograf, lisenslenke, eksakte originale pikselmål og SHA-256. Filer for gjennomgang ligger som GitHub Actions-artifact, mens små forhåndsvisninger, ekte 1400×1400-pikslers kildeutsnitt og review.json er på utkastgrenen.

## Grønn curry med kylling – kandidat A

- **Fotograf og kilde:** Max Griss / [Pexels](https://www.pexels.com/photo/delicious-thai-green-curry-with-chicken-38906797/); [Pexels-lisens](https://www.pexels.com/license/).
- **Original:** 3017 × 3771 px. Original JPEG SHA-256: `105814ed9d3638846610fdc3735327c4bc1530b33a5590ebb84872c1562a5a25`.
- **Forhåndsvurdering:** Hel mørk serveringsskål med synlige kyllingstykker i grønn saus og thaibasilikum. Motivets kjerne er komplett. En avskåret annen skål i høyrekanten og bakgrunn må fjernes ved eventuell frilegging.
- **Videre krav:** Sammenlign en ren helskål-maske mot originalen i 1400×1400 native-utsnitt. Kontroller keramikkant, at ingenting av maten kuttes, helsvart bakgrunn, ingen oppskalering eller KI-genererte matpiksler. Ingen ingrediens utover det synlige skal påstås.
- **Beslutning:** Lovende kandidat for neste maskeringskontroll; IKKE godkjent.

## Bánh mì – kandidat A (Theodore Nguyen)

- **Fotograf og kilde:** Theodore Nguyen / [Pexels](https://www.pexels.com/photo/a-sandwich-with-meat-and-vegetables-on-top-of-a-paper-bag-26619988/).
- **Original:** 4000 × 6000 px. JPEG SHA-256: `fda4ad2e4a42d9b94be6cd77232359ffaaf3f70f1fcbfa6739fa87db8408bc3f`.
- **Forhåndsvurdering:** Tydelig kjøtt og grønnsaker, men svært tett utsnitt og baguetten går mot bildekanten. Papirpose og snor dekker mye av formen.
- **Beslutning:** Ikke velg som storbilde uten dokumentert full servering; for tiden avvent/revurder.

## Bánh mì – kandidat B (Hậu Mai)

- **Fotograf og kilde:** Hậu Mai / [Pexels](https://www.pexels.com/photo/vibrant-vietnamese-banh-mi-sandwich-close-up-32961648/).
- **Original:** 6000 × 4000 px. JPEG SHA-256: `53af16347a42bc40286c416ed11da534faf09605433c0f03ff97311951ef900f`.
- **Forhåndsvurdering:** To store baguetteutsnitt og grønt tilbehør i lyssetting, men sidegarnityr og ekstra sandwich i kanten gjør motivet sammensatt. Ingen ubekreftet kjøtttype eller pâté påstås.
- **Beslutning:** Ikke godkjent. Må dokumentere et rent motiv uten andre rettdeler før mulig bruk.

## Bánh mì – kandidat C (Andy Li, CC0)

- **Fotograf og kilde:** Andy Li / [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Special_Baguette_(B%C3%A1nh_m%C3%AC)_-_Banh_Mi_Ancient_Saigon_2024-12-20.jpg), [CC0 1.0](https://creativecommons.org/publicdomain/zero/1.0/).
- **Original:** 8160 × 6144 px. JPEG SHA-256: `a767191b3c4acf116b6dd9ea88d6568225eaaa214b8c09d2414fe37478b2b27a`.
- **Forhåndsvurdering:** To komplette baguettehalvdeler i serveringskurv. Kilden oppgir svinebuk, pork roll og pâté. Bildeutsnittet har mye papir, drikke og bord.
- **Videre krav:** Vurder om begge halvdeler kan frilegges uten å ødelegge baguettkontur og uten å ta med restauranten rundt. Bildet må bare brukes som **redaksjonelt rettfoto**, aldri som bilde fra en Fysen-restaurant eller bevis på menytilbud.
- **Beslutning:** En aktuell alternativ kandidat, men krevende bakgrunnsfrilegging. Ikke godkjent.

## Felles kvalitetsport

- Før godkjenning: full original og ekte 1400×1400-pikslers detalj vurderes visuelt, inkludert motiv, skål/ baguettekontur og faktisk rettvariant.
- Fremstill ikke originalen som Fysens egen restaurantfotografering. Ingen sammenblanding av grønnsakcurry og kyllingcurry; ingen vegetarisk bánh mì ut fra kjøttbildene.
- Godkjent svartbakgrunnsforhåndsvisning, separat AVIF-master og 512-pikslers miniatyr kreves før manifest- og testendringer.
- Disse fire kildene endrer **ikke** antallet 24 av 44 høyoppløselige bilder i nyeste rene bildeutkast, og alle review-filer forblir `approved_for_fysen=false` og `published=false`.
