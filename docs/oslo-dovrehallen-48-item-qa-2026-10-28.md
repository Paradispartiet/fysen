# Dovrehallen — full semantic menu QA (28.10.2026)

Kilde: https://www.dovrehallen.no/var-meny  
Mål: **48 individuelt prisede matvalg**. Regresjonen fra 43 til 48 er reparert, uten å redusere katalogens krav.

## Full kilde- og artefaktsammenligning

| Menygruppe | Antall kildevalg | Kontroll |
| --- | ---: | --- |
| Julemeny | 5 | Lutefisk 599, juletallerken 495, pinnekjøtt 599, kalkun 455, hjort 495 |
| Forretter | 4 | Løksuppe 115, rekecocktail 160, jacket potatoes 165, blandet salat 155 |
| Smørbrød | 10 | Biffsmørbrød 152, karbonade 140/140/175 med separate toppings, torskerogn 140, egg og bacon 140, rekesmørbrød 155, biff tartar 210, røkt laks 165, sursild 140 |
| Dagens retter | 7 | Mandag–søndag: 189, 225, 199, 235, 199, 215, 225 |
| Hovedretter kjøtt | 11 | Wienersnitzel 230, stekt kylling 230, salt kjøtt og flesk 249, husets biff 319, karbonademiddag 230, spagetti bolognaise 198, biffsnadder 280, Fileto al Pepe 345, svinekoteletter 230, reinsdyrkarbonader 275, vegetarsnadder 275 |
| Hovedretter fisk | 4 | Stekt hellefisk 265, kokt hellefisk 265, ørret 260, kryddersild 245 |
| Omeletter | 3 | Naturell 155, etter valg 170, spansk 165 |
| Desserter | 4 | Varm eplekake 125, blandet iskrem 125, karamellpudding 130, riskrem 135 |
| **Sum** | **48** | **48 kildepriste valg matchet** |

Priser er oppgitt i kroner og gjelder nettstedets aktuelle meny; ikke bekreftede serveringspriser på tidspunktet for et senere søk.

## Tidligere mangler rettet

- `Blandet salat / Mixed salad` (155): nå rettnavn, ikke beskrivelseslinje.
- `Salt Kjøtt og Flesk / Salted beef and pork` (249): den lange tospråklige tittelen behandles som rettnavn.
- `Blandet iskrem / Mixed ice cream` (125): reell dessert, ikke generisk tekst.
- `Karbonade / Minced steak`: tre direkte prisede varianter 140, 140, 175 med dokumenterte toppings, ikke én feilaktig deduplisert rett.

## Godkjenning og begrensninger

Eksakt PR-head `47d4edd7`: GitHub Actions `Validate Fysen restaurant changes`, run [#40679500001](https://github.com/Paradispartiet/fysen/actions/runs/40679500001) rapporterer `accepted=true`, `itemCount=48`, `minimumExpectedItems=48`, `missingRequiredDishes=[]`, `forbiddenDishesPresent=[]`.

Hele observerte listen med 48 navn/priser er sammenlignet med den navngitte førstehåndsmenyen, inkludert hver karbonadevariant. Juleretter og dagens retter skal ikke presenteres som bekreftet tilgjengelige til enhver tid. Åpningstider og time-spesifikk tilgjengelighet er ikke verifisert. Kataloggodkjenning bekrefter kildetro menyliste, ikke produksjonsmaterialisering, API eller søk.

Neste trinn: ny HEAD-CI og live-regresjonspakke, merge, materialisering og produksjonssøk.
