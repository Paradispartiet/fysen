# Matlyst – rettetypeillustrasjoner

Dette er et lite, kuratert bildebibliotek med 33 KI-genererte motiver.
Motivene har helt svart bakgrunn. De viser rettetyper, **ikke den
faktiske serveringen på en bestemt restaurant**.

## Visning

- `collection.avif` har de første 24 motivene i 6 kolonner × 4 rader.
- `series-04.avif` har de neste 9 motivene i 3 kolonner × 3 rader.
- `manifest.json` angir nøyaktig hva hvert felt i bildekartet viser, og hvor det brukes.
- `DishPhotoGallery` bruker den faste rekkefølgen fra manifestet i Matlyst.
- Et trykk på et bilde åpner Fysens eksisterende rettsøk, uten å
  opprette menytreff eller påstå at retten finnes hos en restaurant.
- Bildene er ikke knyttet til individuelle restaurantmenyer.
- Andre retter får ikke et tilfeldig bilde fra en annen rett.

## Kvalitet og videre produksjon

Dette er lette forhåndsvisningsbilder (128 × 128 piksler per motiv) for
små kort. Ved senere publisering av større produktbilder bør hvert
godkjente motiv erstattes av sin originale WebP-fil. Originalene og
bildemanifestet ble levert i samtalen som `fysen_rettebilder_24_bibliotek.zip`.
Flere motiver fra serie 02–03 er utsnitt av bildekollasjer og bør senere byttes mot separate høyoppløselige illustrasjoner.
Første bildeatlas er 768 × 512 piksler (ca. 20,5 KB), det andre er 384 × 384 piksler (ca. 7,1 KB). Hvert miniatyrbilde er 128 × 128 piksler. Disse er ikke fulloppløselige originaler.

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
