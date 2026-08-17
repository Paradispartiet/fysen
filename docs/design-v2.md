# Fysen Design v2

Design v2 er den visuelle fasiten for Fysen.

## Produktuttrykk

Fysen skal føles som moderne matoppdagelse kombinert med en presis søkemotor: mørkt, rolig, appetittvekkende og lett å skanne. Det skal ikke se ut som en generisk tech-startup eller en ratingsdrevet restaurantguide.

## Farger

- Hovedbakgrunn: `#090B09`
- Surface 1: `#101510`
- Surface 2: `#151C16`
- Surface 3: `#1B241C`
- Primærtekst: `#F1F4EF`
- Sekundærtekst: `#ABB3AA`
- Fysen-grønn: `#79C987`
- Grønn hover: `#8BD999`
- Mataksent: `#C96C48`, kun som liten illustrasjonsdetalj

Grønt er primær identitets- og interaksjonsfarge. Oransje skal aldri brukes som generell fokusramme eller primær CTA.

## Typografi

Primær font er DM Sans Variable. Hovedoverskriften skal være stor, men ikke kompakt eller tung: ca. 620–650 i vekt, linjehøyde rundt 1.02 og moderat negativ tracking. Resultattitler skal være 620–650, ikke 800+.

## Forside

Forsiden består av:

1. global header med `fysen.` og Oslo;
2. stor «Hva har du lyst på?»-hero;
3. tydelig, organisk matillustrasjon;
4. stort søkefelt med grønn CTA og subtil grønn focus state;
5. proof-tekst om ferske, sporbare menyer;
6. permanent `SuggestionRail` med «Forslag akkurat nå».

Forslagsflaten er sponsor-klar. Betalte forslag skal alltid merkes eksplisitt som `Sponset`. Sponsing kan påvirke plassering, men aldri menybevis, pris, tilgjengelighet, ferskhet eller matchscore.

## Matillustrasjon

Bruk én tydelig heroillustrasjon og færre sekundære elementer. Illustrasjonen skal være organisk og matspesifikk, med lys strek, tydelig grønn detaljering og svært sparsom terracotta. Den gamle spredte doodle-komposisjonen er avviklet.

## Søkeresultater

Hvert resultat skal være et tydelig kort:

- mørk grønnsvart surface;
- synlig, men rolig kant;
- 18 px radius;
- god intern padding;
- klar header med rett, restaurant og pris;
- beskrivelse;
- eventuell `DishComposition`;
- metadata;
- egen footer for ferskhet og handlinger.

Resultatkortene skal være visuelt separerte; resultatsiden skal ikke oppleves som én flytende tekstkolonne.

## DishComposition

`I denne retten` kan bare vises når menybeskrivelsen selv gir et tilstrekkelig strukturerbart grunnlag. Komponenten skal aldri fylle inn generelle oppskriftsingredienser som om de var restaurantens faktiske ingredienser. UI-et skal eksplisitt vise at informasjonen kommer fra menybeskrivelsen.

## Handlinger

Primær konverteringshandling, som `Bestill bord` eller `Bestill mat`, bruker Fysen-grønn. Sekundære evidens- og navigasjonslenker er teksthandlinger i kortets footer.

## Responsivitet

Design v2 skal behandles som tre reelle viewport-klasser:

- desktop ca. 1440×900;
- iPad ca. 1024×1366;
- mobil ca. 390×844.

På mobil kan forslag scrolles horisontalt, resultathandlinger wrappe, og heroen viser kun hovedillustrasjonen.

## Skal ikke brukes

Ingen kremgul/beige hovedpalett, ratings/stjerner, stockfoto, glassmorphism, neon, store tilfeldige shadows, skjult sponsing, generiske AI-markedsføringspåstander eller udokumenterte «beste»-påstander.
