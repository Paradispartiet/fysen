# Fysen Design v2.2

Design v2.2 er den visuelle og redaksjonelle fasiten for Fysen.

## Produktuttrykk

Fysen er fortsatt en presis, dish-first søkemotor: brukeren søker på retten og får restauranter som faktisk har den på en fersk, sporbar meny. I v2.2 blir forsiden i tillegg et sted for matoppdagelse og læring. Målet er at det skal være gøy å bli fysen på noe man ikke kjente fra før, uten at generell matkunnskap blandes sammen med restaurantens menybevis.

## Brand

Ordmerket skrives alltid `fysen`, uten punktum.

Brand lockup består av:

- den godkjente Fysen-maskoten: en sulten/siklende smiley med bestikk;
- ordmerket `fysen` ved siden av maskoten;
- Oslo eller valgt by på motsatt side av headeren.

Maskoten kan brukes alene som ikon, favicon/appikon og liten UI-signatur. I headeren brukes en forenklet/croppet ikonvariant av den godkjente maskoten, slik at den fortsatt er lesbar i liten størrelse.

## Farger

- Hovedbakgrunn: nær sort, `#060706`
- Kort/paneler: sort eller nesten sort, aldri brungrønne flater
- Primærtekst: `#F1F4EF`
- Sekundærtekst: `#ABB3AA`
- Fysen-grønn: `#79C987`
- Grønn hover: `#8BD999`

Grønt er en signalfarge, ikke en flatefarge. Det brukes på tynne rammer, fokus, ferskhet, etiketter, CTA, chips og enkelte illustrasjons-/logoaksenter. Informasjonskort skal ikke få grønn bakgrunn.

## Typografi

Primær font er DM Sans Variable. Uttrykket skal være åpent, rolig og lett å skanne. Hovedoverskrifter skal ha moderat vekt og romslig linjehøyde. Fysen skal føles mer gastronomisk/editorial enn SaaS.

## Hero

Heroen består av:

1. `Hva har du lyst på?` til venstre;
2. ramen-/suppeillustrasjonen på samme visuelle nivå, til høyre for overskriften;
3. søkefeltet under overskriftsraden;
4. proof-tekst om ferske, sporbare restaurantmenyer.

Ramenillustrasjonen skal aldri ligge nede alene i en stor tom flate og skal aldri overlappe søkefelt eller CTA. På mobil skaleres den ned, men forblir ved siden av overskriften.

## Utforsk kjøkken

Den gamle flate listen «Forslag akkurat nå» erstattes av `CuisineExplorer`.

Første kjøkkenfamilier er:

- Asiatisk
- Indisk
- Fast food
- Italiensk
- Midtøsten
- Mexicansk

Kjøkkenkortene er handlingsflater, ikke faktabokser. Hvert kort inneholder:

- kjøkkentittel og kort geografisk eller typologisk kontekst;
- noen konkrete retteksempler fra det canonicale rettregisteret;
- `På menyen nå` med ferske restauranttreff fra Fysens egne menykilder;
- egne knapper for regioner, land eller relevante kjøkkenvarianter.

Hele hovedflaten i kortet kan åpne kjøkkenet. Region-/variantknappene kan åpne samme utforsker direkte på valgt område. Utforskeren viser canonicale retter sortert etter redaksjonell relevans og, per rett, opptil noen få restauranter som faktisk har et ferskt ikke-fuzzy menytreff. Hvis første prioriterte rett mangler dekning, kan Fysen prøve neste relevante rett i samme kjøkken før kortet konkluderer med at ingen ferske treff finnes.

Brede samlebetegnelser skal ikke late som om de er én homogen matkultur. «Asiatisk» brytes derfor ned i blant annet Japan, Kina, Thailand og Vietnam. `Fast food` brytes ned i typer og serveringsformer i stedet for å behandles som én geografisk kultur.

Generiske `Visste du?`-bokser skal ikke brukes. Matfakta skal inngå i den relevante `Lær om retten`-artikkelen der de får kontekst, kilder og sammenheng.

Kjøkkenkortene er sorte med tynn grønn outline. På mobil kan de scrolles horisontalt. Den interaktive utforskeren bruker native dialog-semantikk og skal fungere med tastatur, fokusretur og små skjermer.

## Fysen Food Knowledge v1

Matkunnskap eies av ett canonicalt rettregister. En rett har én identitet med navn, søkequery, aliaser, kjøkkenfamilie, region og `explorerPriority`. Utforsk kjøkken, `Lær en ny rett` og søkeresultatenes `DishKnowledgeNote` skal lese fra samme register i stedet for å vedlikeholde parallelle lister.

Første Food Knowledge-bølge består av 32 fullartikler. Seks fremheves på forsiden som standard, mens brukeren kan åpne alle 32 uten at forsiden blir en permanent vegg av kort.

En full `Lær om retten`-artikkel inneholder:

- kort forklaring av hva retten er;
- bakgrunn, opprinnelse og matkulturell kontekst, med tydelig språk når opprinnelsen er omdiskutert;
- smak og tekstur;
- sentrale bestanddeler;
- teknikken som faktisk gjør forskjell;
- en tydelig merket hjemmeoppskrift med ingredienser og trinnvis fremgangsmåte;
- vanlige regionale eller tekniske varianter;
- hvordan retten vanligvis serveres;
- vanlige feil ved tilberedning;
- relaterte canonicale retter;
- redaksjonelle kilder til matkunnskapen;
- direkte lenke tilbake til ferske Fysen-menytreff.

Oppskriften skal beskrives som en hjemmevariant når retten er en bred matfamilie og ikke har én canonical oppskrift. Det skal aldri påstås at en bestemt restaurant bruker ingrediensene, teknikken eller varianten i kunnskapspopupen.

Retter i Utforsk som har en fullartikkel får en direkte `Lær om retten`-inngang. Matkunnskap og restaurantens menybevis er fortsatt separate bevislag: kun live menydata kan si hvem som faktisk serverer retten, til hvilken pris og med hvilke restaurantspesifikke ingredienser.

Kunnskapspopupen bruker native dialog-semantikk, kan lukkes med tastatur, har tydelig fokus, fungerer på mobil og kan navigere videre til relaterte retter uten å duplisere innhold.

## Læring på søkeresultater

For søk som matcher en canonical rett med Food Knowledge-artikkel kan Fysen vise en liten `DishKnowledgeNote` før resultatlisten. Notatet bruker samme navn, region og sammendrag som matkunnskapsregisteret. Tartar beholdes foreløpig som et eksplisitt legacy-unntak til retten eventuelt tas inn i registeret.

Denne informasjonen skal alltid merkes `Generell matkunnskap · ikke menybevis`. Restaurantspesifikke fakta, ingredienser, pris, tilgjengelighet og åpningstid må fortsatt komme fra sporbare kilder.

## Søk og søkeresultater

Søkefelt og resultatside følger v2.1-kontrakten:

- sort bakgrunn;
- grønn CTA;
- ingen oransje focus state;
- sorte resultatkort med tynne grønne rammer;
- `I denne retten` bare fra menybeskrivelsen;
- ferskhet og åpning som egne statusindikatorer;
- restaurantfakta og generell matkunnskap holdes eksplisitt adskilt.

## Sponsing

Fysen kan senere ha sponsede rettforslag og kjøkkenplasseringer, men sponsing kan bare påvirke plassering. Sponsing kan aldri endre menybevis, pris, matchscore, ferskhet, tilgjengelighet eller matkunnskap. Alt betalt innhold skal merkes tydelig `Sponset`.

## Responsivitet

Design v2.2 behandles som tre reelle viewport-klasser:

- desktop ca. 1440×900;
- iPad ca. 1024×1366;
- mobil ca. 390×844.

På desktop ligger heroillustrasjonen til høyre for overskriften. På iPad skaleres den ned i samme rad. På mobil forblir den i overskriftsraden i en liten, tydelig størrelse. Kjøkken- og læringskort kan bli horisontale scrolleflater på mobil. Når alle kunnskapsartiklene er utvidet, går læringskortene over til en ryddig énkolonne-layout på mobil. Kunnskaps- og kjøkkenpopupene bruker bred desktopflate, men går over til én kolonne og nesten full skjermbredde på mobil.

## Skal ikke brukes

Ingen `fysen.`, kremgul/beige hovedpalett, brungrønne kortflater, grønne fills i informasjonsbokser, ratings/stjerner, stockfoto, glassmorphism, neon, store tilfeldige shadows, skjult sponsing, generiske AI-markedsføringspåstander eller udokumenterte «beste»-påstander.
