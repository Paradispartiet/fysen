# Fysen — lanseringskvalitet fra 19. oktober 2026

## Retningsvalg

Forbrukerappen prioriteres foran generell Oslo-utvidelse. De **979 manifestene på `main` er ikke et verifisert tall for aktive/søkbare restauranter**. Vi setter bred restaurantjakt på pause og bruker omtrent 90 % av innsatsen på brukerflyt, korrekt produksjonsdata, mobil, reelle brukertester og driftskvalitet. De resterende 10 % går til vedlikehold og målrettede dekninghull. Pro-partnerpilot er et eget spor og blokkerer ikke forbrukerappen.

## Observasjon og avvik

- PR #988 ble merget 19.10.2026, men [materialisering #39184713865](https://github.com/Paradispartiet/fysen/actions/runs/39184713865) feilet: **11 blokkerende onboarding-assertasjoner**.
- Berørte kilder: Alex Sushi, Big Horn Møllergata, Castello Sørenga, KosKos, Peppes Lambertseter/Nydalen/Oslo S/Røa/Skøyen, SKAAL Matbar, Statholdergaarden.
- Brasserie France hadde separat `extraction_error` i refresh-watch, uten å være blant de 11 blocking onboarding-utfallene.
- Oppdatert manifestbevis i denne PR-en forsøker å rette konkrete navneendringer, prissatte duplikatnavn og Peppes-kombopakker. Alle meny-URL-er, `minimumExpectedItems`-gulv, antall navngitte prisassertasjoner og kildekrav beholdes. Peppes-kombopakker markeres som ikke-individuelle retter i `forbiddenDishNames`, men kildeuttrekk og matrettassertasjoner må fortsatt bestå live før publisering.

## Etterprøvbar evidens fra offentlige menyflater

- [Alex Sushi](https://alexsushi.no/meny): `Havabbor` har forskjellige priser for sashimi og nigiri; unik `Nori taco` 315 kr brukes som navngitt kontroll.
- [Big Horn Møllergata](https://bighorn.no/restauranter/mollergata/): `No. 59 Red wine sauce` 45 kr er publisert navn (ikke lenger `Rødvinsaus`).
- [Castello Sørenga](https://www.castellorestaurant.no/oslo/hovedmeny): `Fiskesuppe` har både brunsj- og hovedrettpris; `Fish & chips` 279 kr erstatter tvetydig variant.
- [KosKos](https://www.koskososlo.no/meny): `Fatouche` brukes i ulike matseksjoner med ulike priser; `Chorbet Ades` 149 kr brukes som unik prisassertasjon.
- [Peppes på Wolt](https://wolt.com/nb/nor/oslo/restaurant/peppes-pizza-nydalen): komboene `Solo Deal`, `Duo Deal`, `Group Deal` er pakker med drikke/dressing og skal ikke kreves som enkeltretter. Lokalpriser må bevises av PR-ens strenge liveport, ikke antas ut fra en annen filial.
- [SKAAL](https://www.skaalmatbar.no/): aktuell `"Lasagne"` 235 kr, tidligere kalt `"SKAAL Lasagne"`.
- [Statholdergaarden](https://statholdergaarden.no/statholdergaarden/meny/alacarte): gyldig 7. oktober–10. november 2026, `Torsk` 695 kr erstatter `Skate`.

## Publiseringsporter

1. **Katalog:** Målrettet livevalidering av alle endrede manifester på eksakt PR-head, uten svakere terskler. CI grønn; ingen merge hvis én kilde feiler.
2. **Prod-data:** Materialisering på `main` må være grønn. Reconcile bekrefter faktisk aktive, enabled og søkbare restauranter; aldri konverter manifestantall direkte til prod-dekning.
3. **Reell brukerreise:** På liten mobil: startside → presist rettsøk → filtrering → riktig restaurantkort → menybevis og pris → bestill/besøk/veibeskrivelse. Kontroller også tomme treff, manglende pris, nettfeil og tilbake-navigasjon.
4. **Design/mobil:** Søkefelt, filterchips, rettnavn, prismerking, kart, CTA og synlig fokus/lesbarhet ved 320–390 px; ingen avkuttet handling eller horisontal scroll.
5. **Lansering:** Feilgrenser, responstid og tilgjengelighet overvåkes for faktisk produksjonsruntime. Realistiske tester med mennesker må gjennomføres og dokumenteres; automatiske nettlesertester alene er ikke slike tester.

**Ferdigdefinisjon:** En ny bruker kan søke etter en bestemt rett, se en fersk og korrekt pris knyttet til riktig restaurant, og fullføre et meningsfullt neste steg uten hjelp. Inntil ny produksjonskontroll er bestått er status *publisering av katalog blokkert*, ikke *979 live*.

## Produktbolk: søk og mobil (PR etter #989)

- Søkefeltet på resultatsiden viderefører valgt breddegrad, lengdegrad og avstandssortering ved nytt søk. Brukeren skal ikke måtte dele posisjonen flere ganger i samme søkeflyt.
- Posiskjonskontroller navigerer med `withPublicBasePath`, så GitHub Pages-preview med base path ikke hopper ut av appen.
- Resultatsiden skiller eksplisitt sikre menymatcher fra fuzzy-navnelikhet; en lignende rett presenteres aldri som dokumentasjon for at den søkte retten serveres.
- Priskilden merkes: Wolt/Foodora-beløp er leveringspriser og kan avvike fra bordpriser. Ingen antatt eller utfylt pris når kilden mangler tall.
- CTA for bestilling får minst 44 px berøringsflate, og sortering/posisjonsknapper får tydelig tastaturfokus og mobiltilpasning.
- Test med ekte brukere og endelig produksjonsavstemming står fortsatt åpent; automatisk CI erstatter ikke dette.

## Kataloghelse etter #989 og videre kildebevis

Materialiseringsjobb [#39186491171](https://github.com/Paradispartiet/fysen/actions/runs/39186491171) bekreftet **0 blokkerende onboarding-feil** etter #989, men **6 blokkerende health-repair-feil**. Det er ikke det samme som 979 aktive/søkbare restauranter.

Tre kilder med ferske uttrekk, men utdaterte navn/priskontroller, er oppdatert i denne bolken:

- **Bamboo Skøyen:** Fire nye enkeltretter med eksplisitte priser fra [Wolt-menyen](https://wolt.com/en/nor/oslo/restaurant/bamboo-skoyen). Eksisterende uttrekk var 86/86, men prisvariantene for noen dupliserte navn var ikke entydige.
- **The Fragrance of the Heart:** [Wolt-menyen](https://wolt.com/en/nor/oslo/restaurant/the-fragrance-of-the-heart-majorstuen) dokumenterer `Fragrance of the Heart Bowl` 289 kr og `Power Bowl` 249 kr. Tidligere dessertbevis for `Raw Cake` og `Banana Bread` finnes i offentlig Wolt-meny, men manglet i det siste canonicale uttrekket; erstattet med de to entydige bowl-variantene.
- **Rolis Bodega:** [Nåværende førstehåndsmeny](https://www.rolis-bodega.no/meny) dokumenterer at flere tapas- og hovedretter er skiftet ut. Nye kontroller bruker dokumenterte retter og priser. `Ungarsk gulasj` har både lunsj- og middagspris og erstattes som tvetydig kontroll. Andre kildekrav og forbudte overskrifter beholdes.

Tre **separate, fortsatt uløste** feil gjelder `extraction_error` ved health-repair for Dr. Crunchy Kiellands, Eckers Løkka og Nordic Sushi & Wok. Ingen annen kilde eller parserstrategi erstattes uten live-bevis; disse er fortsatt kildehelseblokkerere frem til verifisert ny uthenting.

Målrettet livevalidering på eksakt PR-commit er obligatorisk før merge. Kvalitetsgulv, menykilde-URL, antall navngitte priskontroller og fail-closed-krav er uendret.


## Produktbolk: filtre, kart og navigasjon (etter PR #991)

- Pris, kjøkkenstatus og (ved delt posisjon) avstand filtreres på **de inntil 20 returnerte resultatene**, ikke i hele databasen. Alle filtrerte tellere og hjelpetekster opplyser om denne begrensningen.
- Manglende prispunkt, kjøkkenstatus eller avstand regnes ikke som sikkert match for det filteret. Filtreringen kan nullstilles direkte uten nytt API-kall.
- Sikre menytreff og lignende navnetreff forblir egne lister også etter filtrering. Lignende retter fremstilles aldri som sikre.
- Et valgfritt kart viser besøkskoordinatene for valgt restaurant. Kart fra OpenStreetMap lastes først ved eksplisitt åpning, viser én markør av gangen og gir lenker til større kart og veibeskrivelse.
- Brukerflyten skal verifiseres i produksjon på 320–390 px mobil; en vellykket TypeScript/CI-kjøring er ikke tilstrekkelig lanseringsbevis.

## Forbrukeropplevelse etter Brasserie-reparasjonen (PR #1000)

- Brasserie France: streng livevalidering av 28/26 kanoniske retter med samtlige åtte prisassertasjoner bestått. Parserrettelsen er publisert på main som `1bd814b987fca72ee0d404aed0e6d5c1281981b8`; produksjonsmaterialisering må fremdeles avstemmes separat.
- Nordic Sushi & Wok: tidligere gyldig snapshot beholdes. Ingen omgåelse av tilgangskontroll eller kravsenking; kilden blir egen feil-/kildekø.

## Mobilflyt: direkte restaurantkort → kart og forhåndsvisningsparitet

- Hvert konkret rett-/restaurantkort kan nå velge sin egen restaurantmarkør og åpne kartpanelet i én handling, også fra listen over lignende retter.
- Kartpanelet har returlenke til det valgte rettetreffet; 44 px målflate og tastaturfokus er definert for kartknappen.
- Den statiske søkeforhåndsvisningen gjenbruker samme SearchResults-komponent som hovedappen, med samme lokale filtre, kart og skille mellom sikre/lignende treff.
- En målrettet automatisk mobilproof er utvidet til 320 og 390 px og til å kontrollere markeringsvalg og returlenke. Den er en testspesifikasjon frem til den faktisk er kjørt på tilgjengelig produksjons- eller previewmiljø.
- Endelig lanseringsgodkjenning krever fremdeles én praktisk ende-til-ende-test på ekte mobil, faktisk produksjonsavstemming og synliggjøring av reelle katalogavvik.
