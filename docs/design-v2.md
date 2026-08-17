# Fysen Design v2.2

Design v2.2 er den visuelle og redaksjonelle fasiten for Fysen.

## Produktuttrykk

Fysen er fortsatt en presis, dish-first søkemotor: brukeren søker på retten og får restauranter som faktisk har den på en fersk, sporbar meny. I v2.2 blir forsiden i tillegg et sted for matoppdagelse og lett læring. Målet er at det skal være gøy å bli fysen på noe man ikke kjente fra før, uten at generell matkunnskap blandes sammen med restaurantens menybevis.

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

Hver kjøkkenboks inneholder:

- kjøkkentittel;
- kort region-/kontekstlinje;
- 3–5 konkrete rettforslag som leder til ekte Fysen-søk;
- én liten faktalinje som lærer brukeren noe om tradisjonen.

Brede samlebetegnelser skal ikke late som om de er én homogen matkultur. For eksempel skal «Asiatisk» eksplisitt vise at rettene kommer fra ulike kjøkkentradisjoner. `Fast food` beskrives som serveringsform, ikke som én kultur.

Kjøkkenkortene er sorte med tynn grønn outline. På mobil kan de scrolles horisontalt.

## Lær en ny rett

Forsiden har en egen, mer editorial seksjon for korte matnotater. Første kort er Ramen, Biryani og Falafel.

Disse kortene kan forklare:

- opprinnelse eller region;
- hva retten grunnleggende er;
- viktige variasjoner;
- lenke til søk etter retten.

Det skal ikke påstås at en bestemt restaurant bruker disse ingrediensene eller denne varianten.

## Læring på søkeresultater

For kuraterte, kjente søk kan Fysen vise en liten `DishKnowledgeNote` før resultatlisten, for eksempel:

- Tartar — serveres vanligvis rå og finhakket;
- Ramen — japansk nudelsuppe med røtter i kinesiske nudeltradisjoner;
- Carbonara — særlig forbundet med Roma;
- Biryani — sørasiatisk risrett med mange regionale varianter;
- Falafel — kikerter eller favabønner avhengig av tradisjon.

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

På desktop ligger heroillustrasjonen til høyre for overskriften. På iPad skaleres den ned i samme rad. På mobil forblir den i overskriftsraden i en liten, tydelig størrelse. Kjøkken- og læringskort kan bli horisontale scrolleflater på mobil.

## Skal ikke brukes

Ingen `fysen.`, kremgul/beige hovedpalett, brungrønne kortflater, grønne fills i informasjonsbokser, ratings/stjerner, stockfoto, glassmorphism, neon, store tilfeldige shadows, skjult sponsing, generiske AI-markedsføringspåstander eller udokumenterte «beste»-påstander.
