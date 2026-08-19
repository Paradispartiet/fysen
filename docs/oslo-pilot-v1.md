# Fysen Oslo Pilot v1

## Formål

Fysen Oslo Pilot v1 skal bevise at Fysen kan brukes av folk i Oslo til å finne en konkret rett de har lyst på, basert på ferske og sporbare restaurantmenyer.

Pilotens north star er fortsatt dish-first:

> Brukeren skriver retten. Fysen viser restauranter som kan dokumenteres å ha retten på en fersk meny nå.

Piloten skal **ikke** optimaliseres for flest mulig restauranter. Den skal optimaliseres for:

- pålitelige treff;
- nyttig Oslo-dekning;
- ferske og kildebelagte menydata;
- målbar, ekte brukerintensjon;
- en tydelig vei fra oppdagelse til restaurant, booking eller bestilling der dette er verifisert.

Restaurant-onboarding er derfor en løpende coverage-maskin, ikke lenger pilotens hovedarbeid. Nye restauranter skal primært prioriteres når faktisk etterspørsel, geografi, kjøkken eller en nødvendig kildetype viser et reelt gap.

## Status 19. august 2026

### Canonical produksjonskatalog

Den canonicale katalogen i `apps/menu-worker/catalog/` inneholder **22 restauranter**:

1. `aura-oscars-gate-oslo`
2. `bambus-lambertseter-oslo`
3. `borggarden-biffrestaurant-oslo`
4. `cafe-sara-hausmann-oslo`
5. `colletts-parkservering-oslo`
6. `confusion-oslo`
7. `cue-thorvald-meyers-gate-oslo`
8. `district4-sagene-oslo`
9. `haandtryk-skippergata-oslo`
10. `habibi-mollergata-oslo`
11. `hrimnir-ramen-storgata`
12. `il-colosseo-sorkedalsveien-oslo`
13. `koskos-grensen-oslo`
14. `lahori-dera-gronland-oslo`
15. `mathus-chicken-vestli-oslo`
16. `noods-klingenberggata-oslo`
17. `olivia-aker-brygge-oslo`
18. `parthenon-osterhaus-oslo`
19. `punjab-tandoori-gronland-oslo`
20. `roll-sushi-majorstua-oslo`
21. `valentes-vika-oslo`
22. `way-down-south-oslo`

Katalogtallet er ikke i seg selv et produksjonsbevis. En restaurant teller offentlig først når den canonicale manifestdefinisjonen, production DB, watcher-state, søkeindeks, API og webflate er konsistente.

### Kildetyper som nå er bevist

Piloten dekker flere reelle kildeklasser og parser-/transportvarianter:

- vanlige HTML-menyer;
- strukturert JSON-LD;
- PDF-meny;
- browser-renderte JavaScript-kilder;
- førsteparthandlinger for `booking` og `order`;
- separate og branch-scopede åpningstidskilder;
- mer krevende redirect- og browser-data-origins gjennom eksplisitt `sourceSupport`.

Rodeo er fortsatt golden live-kilde for den opprinnelige ende-til-ende-kontrakten. Senere restauranter har utvidet beviset til andre transport-, parser-, pris-, hours- og action-varianter.

### Første reelle browser-case

Browser-fetch er ikke automatisk fallback. Det brukes bare når manifestet eksplisitt sier `fetchMode: "browser"`, vanlig HTTP ikke er tilstrekkelig, robots/sikkerhetsportene tillater det og origin-policyen er eksplisitt.

**Collett's Parkservering er det første reelle produksjonscaset som beviser browser-kilden i katalogen.** Kilden trenger rendering, har eksplisitte minimums- og dish/pris-assertions og er beholdt som browser-source i canonical manifest.

Valentes bruker også browser-mode og beviser i tillegg `sourceSupport.browserDataOrigins` for en eksplisitt Shopify-dataorigin.

### `sourceSupport`-kontrakten

`sourceSupport` er manifestets eksplisitte transportutvidelse for en ellers fail-closed source policy. Den er **ikke** en generell allowlist og skal aldri brukes som automatisk fallback.

Kontrakten brukes for to avgrensede behov:

- `redirectOrigins`: eksplisitt tillatte HTTPS-origins når en canonical kilde faktisk redirecter til en annen first-party/forventet origin;
- `browserDataOrigins`: eksplisitt tillatte HTTPS-origins som en browser-rendering trenger for XHR/fetch-data.

Sikkerhetsreglene gjelder fortsatt:

- origin må være eksplisitt deklarert;
- bare HTTPS-origins godtas;
- offentlig-nettverk/IP-validering gjelder;
- udeklaredte origins feiler lukket;
- browser-data-origin gir ikke generell navigasjonsrett;
- støtten persisteres per `menu_source` og inngår i den canonicale kildedefinisjonen.

Punjab Tandoori er et konkret produksjonsbevis for `redirectOrigins`. Valentes er et konkret produksjonsbevis for `browserDataOrigins`.

### Provisional opening hours

Menybevis og åpningstidsbevis er separate.

Når en first-party side publiserer åpningstider, men dagens canonical hours-worker ikke kan re-ekstrahere eller tolke service-/kjøkkentidssemantikken sikkert, kan manifestet eksplisitt bruke:

```json
{
  "verification": {
    "hours": {
      "status": "provisional",
      "checkedAt": "YYYY-MM-DD",
      "note": "..."
    }
  }
}
```

`provisional` er en dokumentert, ikke-blokkerende usikkerhet — ikke et grønt hours-bevis. Konsekvensen er:

- den verifiserte menyen kan fortsatt være søkbar;
- Fysen skal ikke utlede `open` eller `closed` fra den provisional kilden;
- search-resultatet skal vise åpningstilstand `unknown` til canonical hours-ekstraksjon er sikker;
- menu-, identity-, quality- og action-gatene svekkes ikke.

Valentes og Collett's Parkservering er konkrete katalogcase for denne modellen.

## Production proof

Et produktsteg i Oslo-piloten er ikke offentlig ferdig bare fordi repo og CI er grønne.

Den permanente workflowen `production-pilot-proof.yml` etablerer én samlet production proof-port. Den leser katalogen dynamisk og skal for hver canonical restaurant verifisere:

1. aktiv restaurant i production DB;
2. riktig canonical menu-source URL og enabled source;
3. fersk source-state;
4. publisert latest snapshot med minst manifestets minimum antall items;
5. akseptert siste menu-watch (`changed`, `unchanged` eller `not_modified`);
6. representative direkte `searchDishes`-treff mot production DB;
7. offentlig browse-API;
8. offentlig webflate.

Representative production-search-smokes inkluderer blant annet:

- Punjab Tandoori / `Punjabi Mix Grill` + verifisert order;
- Valentes / `Valentes Spesial` + `opening: unknown` for provisional hours;
- Collett's / `Wienerschnitzel (Kalv)` + browser/provisional-hours-case;
- en vanlig rett som `Margherita` for bredere dekning.

Disse QA-søkene kaller `searchDishes` direkte og registrerer **ikke** `recordSearchFunnel`. De skal aldri skape falske demand-signaler.

### Gjeldende deployment-status

Production proof skal rapporteres rødt dersom lagene ikke er synkrone. Per 19. august 2026 var production API/DB foran den offentlige web-deployen: browse-API-et eksponerte nyere katalogdata, mens den offentlige `/search?city=Oslo` fortsatt renderte en eldre «Finn en rett»-flate.

Dette skal **ikke** dokumenteres som et grønt offentlig produksjonsbevis før web-deployen faktisk er synkron og den samlede porten passerer. Vercel-release beholdes eksplisitt/batchet for å unngå unødvendig deployforbruk; production proof skal avdekke versjonsdrift, ikke omgå release-kontrakten.

## Utforsk Oslo / Alle retter v1

Restaurantkatalogen er nå stor og variert nok til at neste hovedetappe er produktoppdagelse, ikke tilfeldig onboarding.

`/search?city=Oslo` uten `q` er den navigerbare **Alle retter i Oslo**-flaten. Den bygger på den samme ferske browse-indeksen som søkeproduktet — ingen ny database og ingen parallell rettidentitet.

Utforsk Oslo v1 gir:

- tekstfilter på ferske rettidentiteter;
- kjøkken → region/land via eksisterende Food Knowledge-/CuisineExplorer-katalog;
- fersk Oslo-dekning som sekundært discovery-signal;
- restaurantantall når dette kan oppgis konservativt fra live-indeksen;
- klikk på rett → samme ordinære søkeresultatside som et vanlig eksplisitt søk;
- `Lær om retten` der Food Knowledge finnes;
- canonical/redaksjonelle matprofiler med fersk dekning først;
- live «På menyen nå»-liste over de faktisk søkbare menyidentitetene.

### Én kilde til live discovery

`CuisineExplorer` skal ikke kjøre automatiske `/search`-forespørsler i bakgrunnen for å finne «På menyen nå».

Forsiden og Alle retter bruker i stedet den ikke-attribuerende `GET /v1/dishes/browse`-indeksen. Dermed:

- discovery kan vise faktisk fersk dekning;
- bakgrunnsvisninger skaper ikke `search_events` eller impressions;
- bare eksplisitte brukersøk går gjennom vanlig search-funnel;
- demand-dataene kan senere brukes som en reell prioriteringskø.

Matching mellom redaksjonelle matprofiler og live menyidentiteter er deterministisk normalisert exact/frase-matching, ikke fuzzy semantikk. Dersom flere live stavemåter kan overlappe den samme restauranten, summeres de ikke ukritisk; UI viser et konservativt minimum fremfor å overdrive dekningen.

## Søkemodell og rettidentitet

Søk bygger videre på:

- exact;
- canonical;
- prefix;
- contains;
- trigram/fuzzy som sekundært forslagsspor.

Semantisk eller fuzzy likhet skal aldri alene gjøre en annen rett til et sikkert treff.

Canonical dish concepts og kuraterte aliaser brukes der identiteten faktisk er bevist. Raw menyidentiteter kan fortsatt vises i live browse dersom de er ferske og søkbare; det er bedre å vise en sporbar menyidentitet enn å tvinge den inn i feil canonical rett.

Food Knowledge er et redaksjonelt kunnskapslag over de samme rettene. Det skal ikke opprette konkurrerende restaurantdekning eller en egen søkeindeks.

## Demand-loop

Revenue Layer måler ekte brukersøk, impressions og attribuerte handlinger uten permanent brukerprofil.

Arbeidsregelen for videre coverage er:

1. samle faktiske søk;
2. replay historiske fuzzy- og nulltreff mot **dagens** ferske indeks;
3. fjern signaler som nå løses sikkert som `exact`, `canonical`, `prefix` eller `contains`;
4. prioriter bare gap som fortsatt faktisk finnes;
5. vurder deretter om gapet best løses med alias/canonicalisering, parserforbedring, ny restaurant eller bredere geografisk/kjøkkenmessig dekning.

Historiske null-/fuzzy-rader er etterspørselsdata, ikke automatisk backlog. De skal aldri fortsette å styre arbeid etter at dagens indeks allerede løser dem.

Det samme gjelder restaurant-onboarding: neste restaurant skal komme fordi den dekker et reelt behov eller viktig representativt hull — ikke fordi katalogen skal nå et vilkårlig tall som 30 eller 50.

## Restaurant-onboarding

Onboardingflyten er eksplisitt og manifestbasert:

`candidate manifest -> active=false -> source/safety -> first watch -> minimum + dish/price assertions -> second watch -> action verification -> hours gate/audit -> active=true`

Viktige regler:

- en kandidat kan ha lagrede snapshots uten å være søkbar;
- første og andre menu-watch må være aksepterte;
- latest snapshot må passere manifestets minimum og konkrete quality assertions;
- booking/order må verifiseres mot canonical first-party source når handlingen deklareres;
- verified hours må passere hours-gaten før de kan brukes som open/closed-bevis;
- eksplisitt provisional-hours følger modellen over og gir `unknown`, ikke oppdiktet åpningstilstand;
- mislykkede inaktive kandidater quiesces slik at menu/hours/actions ikke fortsetter som unødvendig due-trafikk;
- allerede publiserte restauranter beholder refresh/recovery-reglene;
- browser brukes bare når manifestet eksplisitt trenger det og alle safety/sourceSupport-gater passerer.

## Produktmål

Ved avslutning av Oslo Pilot v1 skal Fysen kunne:

1. indeksere et representativt sett Oslo-restauranter med flere reelle menykildetyper;
2. vise en navigerbar oversikt over ferske retter i Oslo, ikke bare kreve at brukeren kjenner eksakt søkeord på forhånd;
3. forstå trygge aliaser og moderate stavevariasjoner uten å dikte opp rettelikhet;
4. vise avstand og støtte nærhetsrangering når brukeren eksplisitt deler posisjon;
5. vise åpningstilstand bare når den er kildebelagt og fersk, ellers `unknown`;
6. vise rett, pris, restaurant, avstand, menyferskhet og kilde i en tydelig resultatflate;
7. gjøre det lett å gå videre til meny, restaurant, veibeskrivelse, booking eller bestilling når slike handlinger er verifisert;
8. gi intern oversikt over crawlerhelse, kildeferskhet, quarantine og dekning;
9. måle hvilke retter folk faktisk søker etter og hvilke treff som fører til handling, uten at QA eller discovery-bakgrunnskall forurenser dataene;
10. bruke ekte demand-gap som grunnlag for videre aliasarbeid, coverage og restaurant-onboarding.

## Kommersiell rekkefølge

Revenue Layer R1 og R2 etablerer funnel-måling og verifiserte booking/order-destinasjoner.

Neste kommersielle hovedfaser etter demand-loop er:

### R3 — Claim Restaurant

En restaurant skal kunne claime sin **eksisterende** canonical Fysen-profil. Claim skal ha:

- verifikasjon;
- eksplisitt tilgangskontroll;
- audit-logg;
- ingen ny parallell restaurantidentitet.

### R4 — Fysen Pro

Et claima restaurant-dashboard kan deretter vise blant annet:

- impressions;
- klikk/attribuerte handlinger;
- populære retter;
- etterspørselsgap;
- menyhelse og ferskhet.

Pris, betalte leads eller sponsede retter skal først testes etter at claim/eierskap og målingen er troverdig. Sponsing må aldri få lov til å dikte opp tilgjengelighet eller overstyre ferskhets-/kildebeviset.

## Prioritert videre arbeid

Rekkefølgen for Oslo-piloten er nå:

1. **Production proof** — hold DB, watcher, production-search, API og web konsistente og eksplisitt verifiserte.
2. **Utforsk Oslo / Alle retter** — videreutvikle discovery på den samme canonical/live-indeksen.
3. **Ekte demand-loop** — la uløste, replay-verifiserte søkegap styre coverage-arbeidet.
4. **Claim Restaurant (R3)** — claim eksisterende profiler med verifikasjon og audit.
5. **Fysen Pro (R4)** — gi claima restauranter innsikt i faktisk etterspørsel, treff og menyhelse.
6. **Kontinuerlig restaurantdekning** — sekundært og gapstyrt, aldri en ren tallkonkurranse.

## Suksesskriterium

Piloten er vellykket når en ny bruker i Oslo kan åpne Fysen, enten søke direkte eller utforske ferske retter, og få et **troverdig, ferskt og handlingsklart resultat** — samtidig som Fysen kan skille ekte brukeretterspørsel fra intern QA/discovery og bruke de gjenværende reelle gapene til å styre videre arbeid.

Revenue- og konverteringsdelen er spesifisert i [`revenue-layer-v1.md`](./revenue-layer-v1.md).
