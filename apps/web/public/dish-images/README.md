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

- `idli-512.avif` er et separat 512 × 512-bilde av dampede ris- og linsekaker med sambar og chutney. Serveringsvariant, ikke restaurantfoto.

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
