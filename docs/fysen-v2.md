# Fysen v2 — personlig, forklarbar matoppdagelse

## Beslutning

Fysen v2 skal ikke være en generell restaurantguide, en ratings-/reviewplattform, et kart-first-produkt eller en generell AI-chat.

V2 skal utvikle det dish-first produktløftet fra:

> Jeg vet hva jeg vil spise. Hvor får jeg det nå?

til:

> Fysen forstår hva slags mat jeg eksplisitt liker og hjelper meg å oppdage den — med bevis for hvor den serveres nå.

Personaliseringen skal være aktivt valgt, privat og forklarbar. Fysen skal ikke bygge en skjult smaksprofil fra søkehistorikk.

## Inngangsport: Oslo v1 må være production-closed

Ingen stor v2-feature kan starte før alle åtte portene i [`fysen-oslo-v1-closeout.md`](./fysen-oslo-v1-closeout.md) er grønne på samme produksjons-SHA.

Det innebærer blant annet:

- canonical consumer catalog live;
- `/min-mat`, Claim Restaurant og Fysen Pro live;
- stateful Min mat/AHA-pilot bevist;
- én faktisk restaurantpilot gjennom Claim → setup → Pro-dashboard;
- de fem mobile brukerreisene bevist;
- representativ production E2E grønn;
- web og API bekreftet på forventet `main`;
- releasekontrakten på maksimalt to deployvinduer per døgn bevart.

Restaurant-onboarding fortsetter som løpende innholdsproduksjon og er ikke en generell v2-blocker.

## Produktvurdering ved v1-grensen

| Område | Vurdering | Konsekvens |
|---|---|---|
| Produktavgrensning | God | Dish-first løser ett tydelig behov uten å bli en generell restaurantkatalog. |
| Teknisk fundament | Profesjonelt | Ferskhet, kildebelegg, canonical identitet, fail-closed publication og permanente produksjonsporter er riktige valg. |
| Forbrukeropplevelse | Nesten production-closed | Live-release, mobilbevis og stateful piloter må lukkes før produktet omtales som komplett. |
| Innovasjon | Sterk i kombinasjonen | Det særegne er rett → ferskt menybevis → restaurant → kunnskap → handling → privat samling. |
| Enkeltfeatures | Ikke alene unike | Søk, lagring og booking finnes andre steder; differensieringen ligger i den beviste sammenhengen. |

Fysen skal derfor ikke markedsføres som ferdig bare fordi kode og CI er grønne. Den profesjonelle standarden er at samme produktfortelling fungerer og er bevist i produksjon.

## Funksjonsgrense

### Ferdig i Oslo v1 når produksjonsportene er grønne

- konkret rettsøk og moderate stavevariasjoner;
- restaurant, pris, menybevis og ferskhet;
- geolokasjon og avstand;
- verifisert booking/order;
- Matlyst og canonical «Alle retter»;
- matleksikon koblet til serveringssteder;
- Min mat og eksplisitt AHA-handoff;
- Claim Restaurant og Fysen Pro v1.

### Bevisst utenfor v1

- avansert personalisering;
- ratings og reviews;
- sosial feed;
- map-first restaurantguide;
- generell AI-chat;
- automatiske anbefalinger fra skjult søkehistorikk;
- betaling, partneroppgjør og sponsede retter;
- generell flerbylansering.

Disse punktene er ikke v1-mangler. Bare de eksplisitt valgte v2-sporene under skal bygges videre.

## V2-prinsipper

1. **Eksplisitte signaler først.** Smak, behov og preferanser kommer fra brukerens valg, ikke skjult inferens.
2. **Forklarbare forslag.** Hvert forslag skal kunne si hvorfor det vises og hvilket ferskt menybevis det bygger på.
3. **Rett er fortsatt hovedidentiteten.** Personalisering må aldri gjøre Fysen restaurant-first.
4. **Bevis før anbefaling.** En anbefalt rett må fortsatt ha en fersk, sporbar forekomst når Fysen sier at den kan spises nå.
5. **Ingen kommersiell korrupsjon.** Betaling eller sponsing kan aldri endre organisk eligibility eller påstå tilgjengelighet.
6. **Kontrollert dataminimering.** Smaksprofilen skal kunne forstås, redigeres, eksporteres og slettes av brukeren.
7. **Én canonical modell.** V2 bygger på de samme rettene, restaurantene, menybevisene og kunnskapsprofilene som v1.

## Arbeidspakker i anbefalt rekkefølge

### V2.0 — preference contract og kontrollflate

Bygg den minimale canonical modellen for eksplisitte preferanser:

- likte retter og kjøkken;
- styrke, smak og tekstur;
- ingredienser eller kategorier brukeren ikke ønsker;
- kostbehov/allergener som brukeren selv legger inn;
- ønsket prisnivå og avstand;
- tydelig «hvorfor ser jeg dette?»;
- rediger, eksportér og slett profil.

**Ferdig når:** en bruker kan opprette, forstå og fjerne hele profilen uten at søkehistorikk importeres eller skjulte signaler oppstår.

### V2.1 — navngitte samlinger

Utvid Min mat fra én flat liste til brukerdefinerte samlinger, for eksempel «Vil prøve», «Favoritter» eller «Middag med venner».

- samme rett kan inngå i flere samlinger uten å duplisere canonical menydata;
- hver samling kan sendes eksplisitt til AHA;
- AHA-handoff beholder preview, 50-cap, personvernsflagg og one-time-token;
- tomme, utløpte og slettede samlinger feiler kontrollert.

**Ferdig når:** lagre → organiser → åpne på ny session → velg samling → AHA fungerer ende til ende på mobil.

### V2.2 — kontekstuell og forklarbar discovery

Gi strukturerte innganger som:

- raskt i nærheten;
- rimelig mat nå;
- sterkt og vegetarisk;
- middag for to;
- en ny rett som ligner noe brukeren har lagret.

Dette skal være forklarbare discovery-moduler, ikke en fri AI-chat. Resultatene bruker samme søke-/publication-regler som v1.

**Ferdig når:** alle forslag kan spores til eksplisitte preferanser, canonical rettsrelasjoner og ferskt menybevis, og null-resultat håndteres uten oppdiktede alternativer.

### V2.3 — retts- og smaksgraf

Utvid canonical rettskunnskap med dokumenterte forbindelser:

- lignende retter;
- kjøkken og region;
- sentrale ingredienser;
- smak, tekstur og styrke;
- vegetariske eller mildere alternativer;
- kunnskapsprofil der redaksjonell dekning finnes;
- restauranter som serverer retten nå.

Relasjoner skal være kuraterte eller kildebelagte. Fuzzy tekstlikhet alene oppretter ikke en semantisk relasjon.

**Ferdig når:** en bruker kan gå rett → forstå → relatert rett → ferske serveringssteder uten tom eller kunstig leksikonopplevelse.

### V2.4 — følg og varsler

Brukeren kan eksplisitt følge:

- en rett;
- et kjøkken;
- en restaurant;
- nye treff innen valgt avstand;
- dokumenterte meny- eller prisendringer.

Varsler sendes bare for canonical publiserte endringer og må kunne pauses eller slettes per abonnement.

**Ferdig når:** watcher-endring → validert publication → deduplisert varsel → relevant deeplink er bevist uten varsler fra karantenerte eller tilbakeviste ekstraksjoner.

### V2.5 — replikerbar flerbymodell

Flere byer er en utrulling av den beviste modellen, ikke en ny produktarkitektur.

- samme source-, catalog-, quality- og production-proof-kontrakter;
- city-scopet discovery og geografi;
- ingen parallell bydatabase;
- åpning først når byen har et troverdig, ferskt og handlingsklart kjernesett;
- restaurantantall brukes ikke som vilkårlig lanseringskvote.

**Ferdig når:** en ny by passerer de samme representative søke-, action-, katalog- og integrity-portene som Oslo.

## Separat spor: Fysen Pro v2

Pro v2 starter først etter at Pro v1 har én faktisk, dokumentert restaurantpilot. Det skal ikke blokkere consumer v2.

Mulig videre scope:

- bedre menyhelse og source-status;
- attribuerte impressions og handlinger;
- etterspørselsgap med personvernsterskel;
- restaurantstyrte profilfelt;
- senere betaling, partneroppgjør og tydelig merket sponsing.

Sponsing kan aldri gjøre en udokumentert rett søkbar, endre canonical match-type eller overstyre organisk rangering.

## Eksplisitte non-goals for v2

- ingen anonym eller offentlig ratings-/reviewdatabase;
- ingen sosial feed;
- ingen restaurant-first katalog som erstatter dish-first;
- ingen generell samtaleassistent som skjuler søke- og kildebevis;
- ingen dark-pattern-personalisering;
- ingen automatisk profilbygging fra all søkehistorikk;
- ingen kommersiell pay-to-rank i organiske treff.

## Prioritert videre arbeid

1. Lukk ordinær Oslo v1-release og kjør production proof.
2. Kjør stateful Min mat/AHA-pilot med ekte AHA-identitet.
3. Kjør én faktisk Claim → Pro-restaurantpilot.
4. Fullfør de fem mobile live-reisene og erklær v1 bare dersom alle åtte porter er grønne.
5. Frys v1 permanent og opprett V2.0 preference-contract som første v2-epic.
6. Lever navngitte samlinger før anbefalingslogikk, slik at brukeren først får kontroll over signalene.
7. Bygg forklarbar discovery på de eksplisitte signalene.
8. Utvid retts-/smaksgrafen og deretter følger/varsler.
9. Velg første nye by først når Oslo-modellen er stabil i drift.
10. Behandle Pro v2 som separat kommersielt spor etter dokumentert Pro v1-pilot.

Det skal ikke åpnes arbeid på punkt 5–10 før punkt 1–4 er production-closed.

## V2-ferdigdefinisjon

Fysen v2 er ferdig når en bruker kan:

1. oppgi og kontrollere egne matpreferanser;
2. organisere retter i navngitte samlinger;
3. få forklarbare forslag basert på eksplisitte signaler;
4. forstå forbindelsen mellom rett, smak, kunnskap og alternativer;
5. finne ferske, sporbare serveringssteder for forslaget;
6. følge valgte retter eller menyendringer uten støy;
7. slette profil, samlinger og abonnementer uten skjult restprofil.

V2 er ikke ferdig på grunnlag av antall anbefalinger, byer, restauranter eller profiler. Den er ferdig når personlig discovery og produksjonsintegritet er bevist sammen.
