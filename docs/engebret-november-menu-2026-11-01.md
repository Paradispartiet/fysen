# Engebret — kildebytte 1. november 2026

Engebrets offentlige julemeny sier uttrykkelig «SERVERES FRA 1. NOVEMBER FREM TIL JUL». Den tidligere Fysen-kilden er merket oktober. Den kan fortsatt være teknisk tilgjengelig og bestå gamle kontroller uten å være den aktuelle middagsmenyen. Derfor erstattes kilde-URLen med [restaurantens november-/desembermeny](https://www.engebret-cafe.no/julemeny-i-november-og-desember).

Det opprettes ingen ny restaurantidentitet. Adresse og koordinater beholdes. Lunsj, julelunsj fra 23. november og selskapsmenyer blandes ikke inn i denne middagskilden.

## Kildekontroll

15 individuelt prisede tilbud er manuelt kontrollert: fire forretter, syv hovedretter og fire desserter. Alle 15 beholdes som konkrete navn-/priskontroller. Minimum 13 gir normal variasjonsbuffer. Det lavere antallet enn oktober skyldes en ny, uttrykkelig datert meny, ikke en nedjustering for å godkjenne et ufullstendig uttrekk.

Lutefisken til 875 kr serveres så mange ganger gjesten ønsker. Juletallerken, pinnekjøtt, smalahove og hovedretten rakørret serveres to ganger til sine oppgitte samlede priser. Disse vilkårene beholdes i navn og beskrivelse; ingen pris per servering er utledet. Kalix løyrom beholder oppgitt 30g. Den uspesifiserte vegetarforretten/hovedretten uten egen pris og tre-retters julemenyen til 1345 kr er ikke enkeltretter.

Alle par og kildehash finnes i [kildebeviset](research/engebret-november-20261101.sources.json).

## Parser og sikker overgang

Flere prisede retter deler ett fetmarkert avsnitt, med kursivmarkering og linjeskift inni. Den tidligere parseren leste bare første linje, lekket allergenkoder og koblet potetbeskrivelsen til prisen på breiflabb. Generisk linjebinding krever at hele avsnittet eies av fetmarkeringen, at hvert tilbud har sin egen eksplisitte pris, og at alle synlige priser er forklart før resultatet kan erstatte et større, men feilaktig uttrekk. Bare en separat overskrift som eksplisitt beskriver en flerretters pakke kan unntas fra enkeltrettene.

Rettelser skal ikke avhenge av vertsnavn eller dato. Uavklarte prisalternativer, løse priser, fremmed valuta og ekstra prisede retter blokkerer komplettdekning. Eksplisitte vekter, serveringsantall og kildegjenkjennelige kontakt-/åpningstidsfelt blir ikke tolket som rettpriser. Også en ekstra matpris inne i en kontaktbeholder blokkerer; hele kontaktbeholdere slettes ikke for å oppnå godkjenning.

Regresjoner dekker både menyblokken og nettsidens kontakt-/åpningstidsramme. Hele råkilden er kjørt gjennom produksjonsruntime og gir nøyaktig 15 kontrollerte navn/priser, uten potetfragment, dubletter, løse allergenkoder eller pakkepris. Oktoberregresjonene beholdes som historiske parsertester.

Eksisterende kildebytteprosedyre validerer den nye kilden før den erstatter aktiv publisert kilde. Katalogmaterialisering og offentlig søk må fortsatt bekreftes etter merge. Historiske oktoberbevis er ikke en attest på novembermenyen.
