# Fysen – felles bildekø

Én redaksjonell rett-ID, ett godkjent motiv, gjenbruk i Matlyst, Matleksikon og menytreff der identiteten stemmer. Bildene er ikke bevis for en restaurants faktiske servering.

## Automatisk status

Fra repo-roten etter installasjon:

    pnpm --filter @fysen/web run images:queue
    pnpm --filter @fysen/web run images:queue --json

Køen beregnes ved hver kjøring fra rettskatalogen, Matleksikonets artikkelmanifest, bildemanifestet og de eksplisitte aliasene i DishEditorialImage. Nye retter dukker opp uten manuell køregistrering. Testen inngår i ordinær web-CI. Rekkefølge: brutt bildereferanse, miniatyr uten storbilde, deretter manglende bilde; Matleksikonets artikkelrekkefølge prioriteres innen hver gruppe.

Statusene master, thumbnail, missing og broken gjelder GitHub-koden, ikke Vercel. Master krever en eksisterende separat fil og aktivert storbilde; eksisterende native-oppløsnings- og kildekrav testes fortsatt separat. Ingen tekstbasert gjetning av rettidentitet.

## Produksjon og publisering

- Sambar: avslutt opprinnelig serie på 44, kildearbeid i #1361.
- Nye retter: gjenbruk de dokumenterte kandidatene i #1349 når originalfilene er tilgjengelige og kontrollert. Dokumenterte kandidatbilder som ikke finnes i aktivt manifest, telles fortsatt som manglende.
- Behold original og separat 512px AVIF, svart bakgrunn, nøyaktig variant og synlig kreditering i detaljvisningen. Illustrasjoner merkes som illustrasjoner. Ikke oppskaler for å oppfylle native-krav.
- Det opprinnelige 44-motiversgalleriet er en egen kuratert visning. Nye rettbilder må få en kontrollert utvidelse av det eksisterende bilderegisteret og galleri-/bevaringstestene; denne køendringen aktiverer ingen bilder og endrer ikke 44-grensen.
- Ferdige bildeendringer bygges og testes i GitHub; Vercel-publisering håndteres samlet i #1206 innen eksisterende gratis kvote. Ingen workflow- eller databaseendring i denne PR-en.
