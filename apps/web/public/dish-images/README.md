# Matlyst – rettetypeillustrasjoner

Dette er et lite, kuratert bildebibliotek med 44 KI-genererte motiver.
Motivene har helt svart bakgrunn. De viser rettetyper, **ikke den
faktiske serveringen på en bestemt restaurant**.

## Visning

- `collection.avif` har de første 24 motivene i 6 kolonner × 4 rader.
- `pizza-margherita-512.avif` er et selvstendig 512 × 512-bilde som nå erstatter atlasrute 0 i visningen (tomat, mozzarella, basilikum, ikke restaurantfoto).
- `cheeseburger-bacon-512.avif` er et selvstendig 512 × 512-bilde som nå erstatter atlasrute 1 i det åpnbare galleriet (bacon/storfekjøtt, ikke vegetar- eller restaurantfoto).
- `pho-512.avif` er en separat 512 × 512-illustrasjon av phở bò med storfekjøtt og urter som erstatter atlasrute 18 i Matlyst.
- `grillet-laks-512.avif` er en selvstendig 512 × 512-illustrasjon av grillet laks med asparges, potetmos, sitron, dill og tomat som erstatter atlasrute 2 i det åpnbare galleriet. Det er ikke et restaurantfoto.
- `grillet-biff-512.avif` er en egen 512 × 512-illustrasjon av storfebiff med småpoteter og tomat, og erstatter atlasrute 3 bare i det åpnbare galleriet.
- `rekesmorbrod-512.avif` er en egen 512 × 512-illustrasjon av reker på brød med dill, sitron og rødløk, og erstatter atlasrute 4 bare i det åpnbare galleriet. Ingen av illustrasjonene er restaurantfoto.
- `series-04.avif` har de neste 9 motivene i 3 kolonner × 3 rader.
- `tom-yum-512.avif` er ett separat, skarpt 512 × 512-bilde på svart bakgrunn, med reker.
- `pad-kra-pao-384.avif` er et separat 384 × 384-bilde av pad kra pao med kjøtt, ris, thaibasilikum og speilegg.
- `banh-mi-512.avif` er et separat skarpt 512 × 512-bilde av vietnamesisk baguette med kjøtt, pâté og syltede grønnsaker.
- `bun-cha-512.avif` er et separat 512 × 512-bilde av vietnamesisk bún chả med grillet svinekjøtt, risnudler, friske urter og dipping-saus.
- `goi-cuon-768.avif` er et eget skarpt 768 × 768-bilde av ferske vietnamesiske rispapirruller med reker, risnudler, urter og peanøttsaus. Ikke et restaurantfoto, og ikke egnet for vegetariske eller nøttefrie varianter.
- `tandoori-chicken-768.avif` viser tandoorigrillet kylling på svart bakgrunn (768 × 768), og skal ikke brukes for vegetariske tandooriretter eller andre kjøttsorter.
- `naan-768.avif` er en egen 768 × 768-illustrasjon av naanbrød med smør og urter, på helsvart bakgrunn. Den representerer ikke vegan- eller allergivennlig naan.
- `dal-makhani-768.avif` er et separat skarpt 768 × 768-bilde av svarte linser i kremet saus med smør og fløte på svart bakgrunn. Det er ikke vegansk eller melkefritt og viser ikke en konkret restaurants servering.
- `manifest.json` angir nøyaktig hva hvert felt i bildekartet viser, og hvor det brukes.
- `DishPhotoGallery` bruker den faste rekkefølgen fra manifestet i Matlyst.
- Et trykk på et bilde åpner Fysens eksisterende rettsøk, uten å
  opprette menytreff eller påstå at retten finnes hos en restaurant.
- I «Alle retter»-listen vises en liten illustrasjon bare når det levende rettnavnet har eksakt samsvar med katalogens kanoniske navn eller søkefrase. Vage/fuzzy søketreff får ingen illustrasjon.
- Bildene er ikke knyttet til individuelle restaurantmenyer.
- Andre retter får ikke et tilfeldig bilde fra en annen rett.

## Kvalitet og videre produksjon

### Ny akseptanseport: skarphet også i stor visning (17. november 2026)

Kravet gjelder **alle** rettbildene, ikke bare bildene i den kompakte oversikten.
Nåværende 384/512/768px-filer er nyttige som miniatyrer, men er **ikke**
dokumentert skarpe i stor visning. At 44 av 44 har egne AVIF-filer betyr
ikke at 44 av 44 har godkjente storvisningsoriginaler. PR #1212 holdes
som **draft** og skal ikke publiseres før denne porten er oppfylt.

- Lag en **selvstendig original av hver rett** med minst **1600 × 1600
  opprinnelige detaljpiksler**, beregnet for inntil 800 CSS-piksler bredde
  ved 2× pikseltetthet på iPad. Gjerne 2048 × 2048 for ekstra margin.
- Utsnitt fra triptyker, 2×3-komposisjoner eller atlasfiler, og
  oppskalering av små originaler, teller **ikke** som ny skarp original.
  Bruk ny enkeltrett-generering eller virkelig detaljert høyoppløselig
  nytegning; ikke bare forstørr eksportstørrelsen.
- Fortsett å servere separate små AVIF-miniatyrer i oversikten; store
  filer lastes bare når en stor bildevisning faktisk trengs. Ikke la
  miniatyrens lavere filoppløsning erstatte originalen i storvisning.
- Legg inn en egen `largeSource`-AVIF for hvert manifest-ID, med
  `largeSourceNativeWidth`, `largeSourceNativeHeight`,
  `largeSourceMethod` (`independent-original` eller
  `high-resolution-redraw`) og `largeSourceSha256` (SHA-256 av den
  faktiske AVIF-filen), basert på dokumentert kildeproduksjon.
  Den faktiske **PNG-originalen** lagres i `assets/fysen-dish-originals/<rett-id>.png`,
  utenfor appens public-mappe. Importeren oppdaterer `largeSourceOriginalPath`
  og `largeSourceOriginalSha256` i manifestet. CI åpner den beholdte PNG-filen
  og sammenligner faktiske kildepiksler og sjekksum mot metadataene.
  Slik kan ingen få godkjent et oppskalert lite utsnitt bare med 1600px i navnet.
  Hashkontrollen er likevel ikke i seg selv bevis på visuell skarphet.
  Den automatiske kontrollen
  `apps/web/tests/dish-image-large-view-quality.test.mjs` må være grønn.
- I tillegg kreves manuell kontroll i **stor visning på iPad og mobil**:
  skarphet på matens tekstur, tydelige detaljer, ingen kompresjonsgrøt,
  ingen feil rett/ingredienser og helsvart bakgrunn. Metadata og
  dimensjoner alene kan ikke garantere reell bildeskarphet.
- Når store bilder eksponeres i appen, skal egne bilde-URL-er brukes ved
  storvisning, og offentlig bildeinnhold/hash samt visuell gjengivelse
  kontrolleres etter deploy.

**Status:** 44 miniatyr-/gallerifiler finnes i PR, men **0 av 44**
storvisningsoriginaler er godkjent etter den nye porten. Eksisterende
768px-komposisjonsutsnitt må produseres på nytt i tilstrekkelig detalj.


### Lisensierte fotografier – ny godkjent original (18. november 2026)

**Sushi assortert** er første fullstendig innleste stororiginal uten Runway.
Den opprinnelige Pexels-kilden fra Mony Cruz er 3000 × 3000 piksler.
Et visuelt kontrollert, ikke-oppskalert **2100 × 2100-utsnitt** er
arkivert i `assets/fysen-dish-originals/sushi.png`, og
`sushi-master-2100.avif` ligger i appens bildemappe. Den kompakte
oversikten bruker separat `sushi-thumb-512.avif`. Kilde, lisens og
sjekksummer er dokumentert i `docs/fysen-image-reviews/sushi.md`
og `manifest.json`.

**Storvisningsregelen er nå selektiv, ikke svekket:** Bare retter med
`largeViewEnabled: true` og en dokumentert original på minst 1600
kildepiksler kan vises store. De øvrige 43 rettene forblir
**miniatyrbilder** og må ikke forstørres til storvisning. CI
kontrollerer alle retter som er aktivert for stor visning og blokkerer
manglende original, falsk oppløsning, feil SHA og manglende kildevurdering.

**Sushi:** 1/44 kvalifisert. **Ramen, pasta carbonara, butter chicken:**
lisensierte kandidater i `assets/fysen-image-candidates/`, men ikke
visuelt godkjent. Ramen har en brun/grå bakgrunn og mykt fokus,
carbonara trenger en mer presis rett-/teksturvurdering, og butter chicken
viser et bordmiljø som ikke er helsvart. Ingen av disse tre er promotert.

### Runway 2K-kandidater – 18. november 2026

Fire separate kvadratiske 2K-bilder er **generert i Runway** og ligger i
Runway-arbeidsområdet. Dette er **kandidater**, ikke godkjente originaler,
fordi original-PNG-bytene foreløpig ikke er hentet inn for inspeksjon,
signering, AVIF-eksport eller GitHub-import.

| Rett-ID | Runway oppgave-ID | Produksjon | Kvalitetsstatus |
| --- | --- | --- | --- |
| `sushi` | `e1d7351c-4a37-4128-8b85-4e677038e573` | 2K ferdig | Ikke godkjent |
| `ramen` | `222648db-5176-4a06-a4d6-0a953c904cf6` | 2K ferdig | Ikke godkjent |
| `pasta-carbonara` | `0377dcbe-bfcc-402b-8660-5df178ca1d27` | 2K ferdig | Ikke godkjent |
| `butter-chicken` | `25b56078-95c1-4316-b604-881ea5c0d17d` | 2K ferdig | Ikke godkjent |

Neste obligatoriske kontroll er å hente original-PNG fra Runway og
verifisere **faktisk bildeoppløsning ved dekoding** (minst 1600 × 1600),
hel svart bakgrunn, riktig rett, synlig naturlig detalj i stor størrelse
og ingen utilsiktet oppskalering. Bare godkjente originaler kan
konverteres til AVIF, arkiveres med originalhash og føres inn med
`scripts/import-dish-large-master.mjs`.

**Ingen bilder er merget til `main` eller publisert på grunnlag av
disse oppgavene.** Ingen signerte Runway-URL-er lagres i GitHub.

### Hente ferdige Runway-originaler (uten å publisere)

Runway har fullført fire 2K-bildeoppgaver (se tabellen ovenfor).
Bilde-URL-ene er signerte og skal ikke lagres i repo, issuekommentarer
eller testlogger. For å hente en original i et utviklingsmiljø med
nettverkstilgang: åpne den relevante Runway-oppgaven, kopier bildets
signerte fil-URL, og kjør følgende i Bash:

```bash
read -rs RUNWAY_IMAGE_URL
export RUNWAY_IMAGE_URL
node scripts/stage-runway-dish-image.mjs sushi
unset RUNWAY_IMAGE_URL
```

Lim inn den signerte URL-en i den usynlige `read`-prompten og trykk Enter.
Bytt `sushi` mot manifestets eksakte rett-ID for neste bilde.
Hentede kandidater lagres i **ignorerte** `.fysen-candidates/`,
ikke i `public/` eller bildebiblioteket, og blir aldri automatisk
godkjent. Skriptet avviser uventede verter, manglende PNG-signatur,
ugyldige dimensjoner og større filer. Det oppgir SHA-256 og
**faktiske pikselmål fra PNG-headeren**.

Skriptet krever nettilgang og en gyldig signert fil-URL. ChatGPTs
nåværende kontrollmiljø får ikke overført de signerte Runway-filene;
disse fire bildekandidatene er derfor fortsatt **ikke** kontrollert
eller integrert. Ikke marker dem som godkjent før originalfilen er
hentet, avkodet, inspisert i stor visning og ført gjennom den vanlige
importeren `scripts/import-dish-large-master.mjs`.

### Før du konverterer en ny bildefil

Kontroller **PNG-originalen først**. Dermed kan vi stoppe uegnede
kandidater uten å bruke tid på eksport, review-tekst og Git-opplasting:

```bash
node scripts/check-dish-image-source.mjs /sti/til/nytt-rettbilde.png
```

Den raske kontrollen skriver kildens pikselmål og største sikre
visningsbredde ved 2× pikseltetthet. Eksempel: En original på
1254 × 1254 piksler har bare nok piksler til omtrent 627 CSS-piksler
ved 2×. Det er **ikke nok** til målet på 800 CSS-piksler, og den avvises
som storvisningsmaster.

Dette er bare en **forhåndskontroll av filtype og dimensjoner**.
Den kan ikke avgjøre om et bilde egentlig ble oppskalert fra et lite
utsnitt, om filen dekodes korrekt, eller om teksturene er skarpe.
Originalens opphav, avkodbarhet og visuell kvalitet må bekreftes
separat før `scripts/import-dish-large-master.mjs` brukes.

### Innlesing av ekte stororiginal

Når det foreligger en kontrollert, **selvstendig** kilde i minst
1600 × 1600 ekte piksler:

1. Oppbevar originalen som PNG. Lag en AVIF av **samme pikselmål**,
   uten å skalere eller forstørre originalen. Importeren beholder også
   originalen i `assets/fysen-dish-originals/<rett-id>.png`.
2. Skriv en kort gjennomgang i `review.md` med kildeopphav og konkret
   vurdering av tekstur, konturer og riktig rett i 800px storvisning.
   Gjennomgangen må inneholde SHA-256 fra **original-PNG** og linjene
   `Reviewed for full-size display: yes`,
   `No collage crop or upscale: yes` og
   `Correct dish and black background: yes`.
3. Kjør fra repo-roten:

   ```bash
   node scripts/import-dish-large-master.mjs pizza-margherita \
     /sti/til/pizza-original.png /sti/til/pizza-master.avif \
     /sti/til/review.md independent-original
   ```

4. Importeren avviser for små PNG-kilder, AVIF-er med andre
   dimensjoner, manglende visuell gjennomgang og gjenbruk av samme
   storfil for flere rett-ID-er. Den legger storfilen og dokumentert
   gjennomgang i PR-en og oppdaterer kun riktig manifestoppføring.
5. Til slutt må både filkontroll, storvisning i nettleser og offentlig
   publiseringskontroll bestås. **Godkjenn aldri bare fordi et 2048-tall
   står i filnavnet eller metadata.**

Den nye importeren **genererer ikke** høyoppløselige originaler og
hevder ikke å kontrollere optisk skarphet automatisk. Det krever
godkjent originalkilde og visuell fagkontroll.


Bildeatlasene ble oppgradert fra 128 × 128 piksler per rett til **320 × 320** for
de første 24 motivene og **384 × 384** for de siste 9. Atlasene har
henholdsvis 1920 × 1280 piksler (ca. 89,6 KiB) og 1152 × 1152
piksler (ca. 50,8 KiB), kodet som AVIF. Kortbildene holdes til høyst
150 CSS-piksler på store skjermer og 144 CSS-piksler på mobil, slik at
bildene beholder minst 2 × kildetetthet, også på retina-skjermer.

Bilde-URL-ene har versjonsnøkler for å unngå at nettlesere beholder de
gamle 128px-filene i mellomlageret. Produksjonsbeviset sammenligner
begge offentlige bildefiler med eksakt SHA-256 fra kildefilene etter deploy.

De godkjente originalene er fra serien levert som
`fysen_rettebilder_24_bibliotek.zip` og `fysen_rettebilder_serie_04.zip`.
Pizza margherita og bacon-cheeseburger er oppgradert med egne kildeoriginaler. De gamle motivene blir liggende i atlasfilen fordi de øvrige rettene fortsatt bruker den.

Fire nye separate 768 × 768 AVIF-illustrasjoner er lagt til for
`sushi`, `ramen`, `pasta-carbonara` og `butter-chicken`.
Motivene viser laks/tunfisk, ramen med svin og egg, carbonara med
speket svinekjøtt og kremet kyllingcurry med naan. Dette er
rettetypeillustrasjoner, ikke restaurantfoto. Eksisterende `pho-512.avif`
beholdes. Et nytt kyllingtaco-motiv er ikke brukt til
`tacos-al-pastor` fordi det viser feil variant.
Noen bilder fra serie 02–03 er fortsatt utsnitt fra komposittbilder,
og bør senere erstattes med enkeltstående, opprinnelig høyoppløselige
motiver. Flere kildeoriginaler er ikke 320/384px i reell motivdetalj
selv om bildeflaten nå har denne oppløsningen.

Bildesekvensen er:
1. Pizza margherita
2. Cheeseburger med bacon
3. Grillet laks
4. Grillet biff
5. Rekesmørbrød
6. Sushi
7. Ramen
8. Pasta bolognese
9. Pizza prosciutto
10. Kebab i pita
11. Carbonara
12. Butter chicken
13. Pad thai med reker
14. Stekt hvit fisk
15. Tiramisu
16. Pizza marinara
17. Cacio e pepe
18. Gyoza
19. Phở bò
20. Bibimbap (foreløpig ikke registrert som eget redaksjonelt katalogoppslag)
21. Falafel med hummus
22. Tacos al pastor
23. Chana masala
24. Masala dosa
25. Chicken katsu
26. Yakitori (kylling)
27. Udon med reketempura
28. Bao med braisert kjøtt
29. Dumplings (fyll uspesifisert)
30. Mapo tofu med kjøtt
31. Pekingand
32. Dan dan-nudler med kjøtt og peanøtter
33. Grønn curry med kylling
34. Tom yum med reker, sopp og lime
35. Pad kra pao med kjøtt, thaibasilikum, ris og speilegg
36. Bánh mì med kjøtt, pâté, syltede grønnsaker, agurk og koriander
37. Bún chả med grillet svinekjøtt, risnudler, urter og dipping-saus
38. Gỏi cuốn med reker, risnudler, urter og peanøttsaus
39. Tandoorikylling med kryddermarinade, løk og sitron
40. Naan med smør og friske urter
41. Dal makhani av svarte linser med smør og fløte
42. Idli med sambar, kokoschutney og rød chutney
43. Sambar med linser og grønnsaker
44. Medu vada med sambar og chutney, tamarind, karriblader og chili

Ved utvidelse må motiv, rettnavn og eventuell ingrediensvariant være
entydig; for eksempel må vegetarramen ikke få bilde av ramen med svin.

## Kvalitet og kildekontroll

- Galleri-kort kan åpne Fysens søk, men de **viser ingen verifisert tilgjengelighet**.
- Bildene i redaksjonelle katalogkort krever eksakt rett-ID og er bare koblet
  når motivet samsvarer med oppslaget.
- Bibimbap vises foreløpig kun i det illustrative galleriet, ikke som katalogoppslag.
- Menyrettene i restaurantdatabasen får ikke generiske bilder ut fra delstrenger,
  fordi dette kan forveksle ingredienser, tilbehør eller matpreferanser.
- Ved ny serie skal bildekartets rekkefølge, navn, kilde og egen filkontroll
  oppdateres samtidig med komponent og tester.


## Obligatorisk publiseringsregel – gjelder alle nye Fysen-bilder

Et godkjent bilde er **ikke ferdig** når filen er generert eller lagt i en ZIP.
Følgende skal være del av den samme produksjonsbolken, og må fullføres:

1. Lag et naturtro, tydelig motiv på helsvart bakgrunn. Registrer rettens ID, eventuelle ingredienser og bildets opprinnelse.
2. Legg **selve bildefilen** inn i `apps/web/public/dish-images/`, og registrer den i `manifest.json`. Et lokalt ZIP-arkiv er aldri publisering.
3. La bildet bli synlig i Matlyst-galleriet. Bruk også illustrasjonen i redaksjonelle rettetypekort når ID/variant faktisk passer; aldri tving den inn på feil restaurantrett.
4. Sikre at tester verifiserer at alle bildene i manifestet finnes og faktisk vises i appen. Ingen foreldreløse, usynlige bilder.
5. Merge først etter grønne tester. Følg Vercel-release og utfør kontroll av den offentlige siden og bildefilens HTTP-respons. Merk tydelig `integrert`, `deployet` og `verifisert i app` hver for seg.

Eksempelbilder kan aldri presenteres som dokumentasjon på hvordan en restaurant serverer sin rett.
En variant med svin, kylling, sjømat, peanøtter eller annet særskilt innhold skal heller ikke brukes ukritisk om andre varianter.

Pad thai har eksakt katalogkobling til det allerede godkjente 128px-miniatyrbildet «Pad thai med reker» (galleriindeks 12). Nye uklare utsnitt erstatter ikke godkjente bilder. Bildet er kun en representativ rekevariant, og skal ikke brukes som vegetar- eller kyllingversjon.

- `idli-thumb-512.avif` viser to idli med sambar og kokoschutney. Storbilde: `idli-master-3072.avif`. Fotograf: Sarathprabhavu / Wikimedia Commons ([CC BY 4.0 og kilde](idli-LICENSE.txt)).

- `sambar-768.avif` er et separat skarpt 768 × 768-bilde av sørindisk sambar, og viser ikke idli som hovedrett. Oppskrifter og ingredienser varierer; KI-illustrasjonen er ikke et restaurantfotografi.

- `medu-vada-768.avif` er et separat 768 × 768-bilde av medu vada med sambar og chutney. Det viser varianten med sprøstekte linsekaker og er ikke et restaurantfoto.

Ny separat **768 × 768 AVIF** for `gyoza` (atlasplass 17): pannestekte gyoza med soyadipp og vårløk. Variant/fyll er ikke kjent fra bildet; dette er KI-illustrasjon, ikke et restaurantfoto. Bilde er lagt til i PR #1212 før samlet utrulling.

To ekstra separate **768 × 768 AVIF** i PR #1212:
- `pad-thai-reker-768.avif` erstatter bildekartplass 12 bare i Matlyst-galleriet og viser pad thai **med reker og egg**. Den må ikke kobles generisk til vegetarisk eller uspesifisert pad thai i restaurantmenyer.
- `tiramisu-768.avif` erstatter bildekartplass 14 bare i Matlyst-galleriet; illustrert tiramisu med kakao og mascarpone. Ikke dokumentasjon av en bestemt restaurants dessert.

To nye **768 × 768 AVIF-bilder** i PR #1212:
- `pizza-marinara-768.avif` viser napolitansk pizza marinara med tomat, hvitløk, olivenolje og oregano, **uten ost**. Brukes kun for eksakt `pizza-marinara`-ID (indeks 15), aldri som margherita.
- `falafel-768.avif` viser falafel med hummus og grønnsaker, kun for eksakt `falafel`-ID (indeks 20). Retten kan ha andre tilbehør hos restauranter.

Begge er redaksjonelle KI-illustrasjoner, ikke restaurantfotografier. Originale bildekart bevares for andre retter. Ingen deploy eller databaseendringer gjøres som del av PR-arbeidet.

Tre ekstra separate **768 × 768 AVIF**-rettbilder i PR #1212 (før eventuell samlet deploy):
- `cacio-e-pepe-768.avif` erstatter kun bildeplass 16 for eksakt `cacio-e-pepe`. KI-illustrasjon av cacio e pepe med pecorino-ost, pasta og sort pepper. Inneholder melk. Ikke restaurantfoto; tilberedning og ingredienser hos den enkelte restaurant kan variere.
- `chana-masala-768.avif` erstatter kun bildeplass 22 for eksakt `chana-masala`. KI-illustrasjon av chana masala med kikerter, tomat, krydder og koriander. Ikke restaurantfoto; alle ingredienser på den enkelte restaurant må kontrolleres separat.
- `masala-dosa-768.avif` erstatter kun bildeplass 23 for eksakt `dosa`. KI-illustrasjon av masala dosa med potetfyll, sambar og kokoschutney. Tilbehør kan inneholde kokos og varierende allergener. Ikke restaurantfoto eller bekreftelse på en bestemt restaurants variant.
Alle tre stammer fra nye, separat utskårne motiver i én høyoppløselig KI-generert triptyk (ca. 700 × 700 kildeskarpe piksler før 768-eksport), ikke fra gamle atlasfiler. Gammelt bildekart bevares for øvrige retter. Ingen Vercel-deploy eller databaseendringer.

Tre separate 768 × 768 AVIF-bilder i PR #1212: `pasta-bolognese-768.avif`, `pizza-prosciutto-768.avif` og `kebab-pita-768.avif`. Erstattet galleriindeks 7–9; ingen automatisk kobling til restaurantretter. Bolognese inneholder kjøttsaus og ost; prosciutto inneholder svinekjøtt og mozzarella; kebabfyllets kjøttype er ikke kjent. Nye KI-genererte enkeltmotiver fra en trepanelskomposisjon (~724 × 724 faktiske kildepiksler per motiv før 768-eksport), ikke eldre lavoppløselige bildekart. Ingen deploy eller databaseendring.

Bilder med lavere effektiv kildeoppløsning enn eksportformatet skal beskrives med begge tall; 768 × 768 filformat betyr ikke 768 uavhengige kildedetaljpiksler. Kontroll av fotorealistisk kvalitet erstatter ikke verifikasjon av rett-ID, ingredienser eller allergener.

Tre separate **768 × 768 AVIF** KI-illustrasjoner i PR #1212 (ingen merge/deploy):
- `stekt-hvit-fisk-768.avif`: Kun galleriindeks 13; hvit fisk, poteter, brokkolini, tomater og sitron. Fiskeart er ikke bekreftet. Ikke redaksjonell generisk restaurantkobling.
- `bibimbap-768.avif`: Kun galleriindeks 19; kjøttvariant med storfekjøtt, egg, ris, grønnsaker og sesam. Ikke vegetarvariant eller restaurantfoto.
- `tacos-al-pastor-768.avif`: Galleriindeks 21 og redaksjonelt kort med nøyaktig ID `tacos-al-pastor`; marinert svinekjøtt, ananas, løk, koriander og maislefser. Ikke for kylling/vegetar.
Motivene er tre enkeltutsnitt fra en ny høyoppløselig KI-generert triptyk med omtrent 715 × 717 bildepiksler per motiv før 768-eksport, aldri fra gamle atlasfiler. Ingen endring i Supabase, menyhistorikk, kostnader eller produksjon.

**Kontrollpunkt for denne bildegruppen:** Alle tre filer må være direkte tilgjengelige under `/dish-images/` fra en bygget testversjon før senere produksjonspublisering; 768 × 768 er eksportformat, ikke et løfte om mer enn de opprinnelige ca. 715 × 717 kildepikslene.

Tre nye separate **768 × 768 AVIF**-illustrasjoner for eksakte japanske retter (PR #1212):
- `chicken-katsu-768.avif`: Chicken katsu (indeks 24), panert kylling med ris, kål og saus – ikke tonkatsu av svin.
- `yakitori-768.avif`: Yakitori (indeks 25), grillede kyllingspyd med saus og vårløk – ikke vegetarspyd.
- `udon-tempura-768.avif`: Udon med reketempura (indeks 26), nudler, reketempura, sjøgress og vårløk – ikke vegansk eller skalldyrfri variant.

Hvert motiv er et eget utsnitt fra en ny KI-generert trepanelskomposisjon på svart bakgrunn, omtrent 694–696 piksler bredt i kildemotivet før eksport til 768 × 768. Ikke bruk disse som restaurantfoto eller bevis for ingredienser hos en bestemt restaurant. Gammelt `series-04.avif` bevares for de øvrige seks rettene. Ingen deploy, databaseendring eller endring av menyhistorikken.

## De siste seks bildene – PR #1212

- `bao-768.avif` (galleriindeks 27, `bao`): KI-illustrasjon av bao med braisert svinekjøtt, agurk og syltet rødløk. Inneholder kjøtt og er ikke vegetarisk; ikke restaurantfoto.
- `dumplings-768.avif` (galleriindeks 28, `dumplings`): KI-illustrasjon av dumplings med chili- og soyadipp. Fyllet er ikke dokumentert; vegetarstatus og allergener må bekreftes separat. Ikke restaurantfoto.
- `mapo-tofu-768.avif` (galleriindeks 29, `mapo-tofu`): KI-illustrasjon av mapo tofu med tofu, kjøttdeig, chili og vårløk. Dette er ikke vegetarvarianten og ikke restaurantfoto.
- `peking-duck-768.avif` (galleriindeks 30, `peking-duck`): KI-illustrasjon av pekingand med andekjøtt, tynne pannekaker, agurk, vårløk og hoisinsaus. Ikke restaurantfoto.
- `dan-dan-noodles-768.avif` (galleriindeks 31, `dan-dan-noodles`): KI-illustrasjon av dan dan-nudler med kjøttdeig, chiliolje, grønnsaker og peanøtter. Ikke vegetarisk eller nøttefri, og ikke restaurantfoto.
- `green-curry-768.avif` (galleriindeks 32, `green-curry`): KI-illustrasjon av grønn thaicurry med kylling, kokosmelk, grønnsaker, thaibasilikum og ris. Ikke vegetarcurry eller restaurantfoto.

Alle 44 registrerte rettillustrasjoner har nå separate filer i bilderegisteret. De tre siste motivene er utsnitt fra en seksdelt KI-komposisjon med lavere effektiv kildedetalj enn eksportfilens 768 × 768; for å bevare serveringen er motivene plassert på svart kvadratisk bakgrunn. Det gamle bildekartet beholdes for sikker tilbakerulling. Ingen deploy, databaseendring eller betaling.

### Butter chicken – 3000px foto med svart bakgrunn

Originalt lisensiert Pexels-foto av Prabal Pratap Singh (ID 9609844) i 4608 × 3456. Retten er et kyllinglår med kremet saus, ikke en benfri variant. Et 3000 × 3000 utsnitt i opprinnelig detaljoppløsning maskerer bort duk, bakgrunn og tilbehør rundt skålen. Stor AVIF og en separat 512px miniatyr produseres uten oppskalering. Kilde og visuell vurdering ligger i `docs/fysen-image-reviews/butter-chicken.md`.

**Godkjent etter importkontroll:** Sushi 2100 × 2100 og butter chicken 3000 × 3000 har hver sin verifiserte, ikke-oppskalerte original og separate 512px miniatyrer. Totalt 2/44 godkjente stororiginaler. Ramen og carbonara er fortsatt kun bildekandidater.

### Pasta carbonara – 2600px redaksjonelt foto (19. november 2026)

Skarpt lisensiert foto fra Froimar Andrea Rodriguez / Pexels (foto 12116165).
Original 2768 × 3460, kontrollert som carbonara med bacon, ost, eggesaus
og sort pepper. Et 2600 × 2600 utsnitt i ekte kildedetaljer med mørk
tallerken og helsvart ytterbakgrunn; ingen oppskalering eller KI-tilført
mattekstur. Egen AVIF-master og 512px miniatyr. Kilde- og bildebevis
lagres i `docs/fysen-image-reviews/pasta-carbonara.md`.

Ny fullstørrelseslenke åpner originalen først når brukeren velger den.

**Godkjent etter importkontroll:** Sushi (2100×2100), pasta carbonara (2600×2600) og butter chicken (3000×3000). Alle har kildebevarte originaler og separate 512px miniatyrer. Totalt 3 av 44 godkjente stororiginaler. Resten har bare miniatyrvisning.

### Ramen med svin og egg – godkjent fotokandidat for import (19. november 2026)

Fotograf Connor Scott McManus / Pexels, kilde-ID 35773142, original 7364 × 4909.
Det eldre, mykfokuserte ramen-bildet ble ikke godkjent for storvisning.
Ny original viser chashu-svin, to halve egg, nori, vårløk og kraft i en
hvit skål. Bildet er visuelt vurdert i faktisk kildeoppløsning.
Omgivelsene utenfor mat og skål blir selektivt maskert til ren svart;
matens detaljer forblir originale kildepiksler, uten oppskalering.
En separat kvadratisk 512px AVIF brukes i kompakt visning, mens
`ramen-master-7364.avif` åpnes ved brukerklikk. Kilde, SHA og vurdering
føres i `docs/fysen-image-reviews/ramen.md`.

**Oppdatert status:** Importen og kildekontrollen er bestått. Ramen ligger nå i `main` med original på 7364 × 4909 og separat 512px miniatyr. Samlet **4 av 44 godkjente stororiginaler**, hvorav alle fire kan åpnes fra bildegalleriet.
