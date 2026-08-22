# Restaurant production

Dette dokumentet beskriver den permanente produksjonsmetoden for restaurantdekning. `apps/menu-worker/catalog/`, production DB og materializer-/watcher-resultatene er sannhetskilden. Tallene nedenfor er en datert kontrollmåling, ikke en parallell katalog eller en fast lanseringskvote.

## Verifisert Oslo-status 2026-08-22

Siste read-only production-proof etter parsercleanup #365, fem-restaurant-promotion #395 og New Delhi-promotion #408 bruker production revision `2e57e1d324415f2a296b43b54c13e58cb23d4292` som autoritativ katalogrevision. Run `32600667247` / artifact `9483248543` viser:

- **56 canonical produksjonsmanifester** i `apps/menu-worker/catalog/`;
- **56/56 aktive canonical restauranter** i production DB;
- **56 aktive restaurant-rader totalt**;
- **56 enabled menu sources**;
- **0 inactive canonical** restauranter;
- **0 active-not-catalog** restaurant-rader;
- nøyaktig **én enabled canonical menu source per katalogrestaurant**;
- de fem tidligere Batch-02-kildene og New Delhi har bevist production coverage; New Delhi har `consecutive_failures=0` og 81-item snapshot;
- production search returnerer representative retter fra de fem tidligere restaurantene samt New Delhi med korrekt canonical source URL.

De fem nye source-bevisene er:

- Døgnvill Bjørvika: **35 items**, HTTP 304, siste watcher `not_modified`;
- Døgnvill Tjuvholmen: **35 items**, HTTP 304, siste watcher `not_modified`;
- Døgnvill Vulkan: **35 items**, HTTP 304, siste watcher `not_modified`;
- IndiSpice: **48 items**, HTTP 304, siste watcher `not_modified`;
- Jaipur: **44 items**, HTTP 200, siste watcher `unchanged`.

Etter 55-baselinen ble også **New Delhi Tjuvholmen** promotert byte-for-byte via #408. Permanent `titles-v14` + `beverage-v9` ble først bevist mot eksisterende catalog **55/55** og New Delhi **81/81** i #402. Read-only production-proof #409 / run `32600667247` / artifact `9483248543` med digest `sha256:dadd04d28d955526fdcbb028cb548c87e4bd7ecdef8da4710d376e7a2b2a112d` viser New Delhi som enabled canonical source med **81 items**, HTTP 200, `consecutive_failures=0`, siste watcher `unchanged`, og production-search for `Mixed Ice Cream` **129 kr** og `Murgh Malai Chicken Tikka` **149 kr** fra korrekt canonical source. Dette løftet den operative baselinen til **56/56/56**.

Dette er den operative restaurantproduksjonsbaselinen. Production-status må skilles fra rå DB-historikk: deaktiverte legacy-rader kan fortsatt eksistere for referanseintegritet, men teller ikke som aktive restauranter. Den canonicale integritetsmålingen er alltid `catalog slug -> active restaurant -> nøyaktig én enabled menu source -> frisk snapshot/watcher`, pluss eksplisitt kontroll av at ingen aktiv restaurant ligger utenfor katalogen.

### Oslo batch 01

PR #294 (`700d24cb3c1e96a8fb5db5f2aa5f2457132d24c5`) var første reelle høy-throughput-batch etter at batchlinjen ble etablert.

Input og resultat:

- 20 restauranter ble researchet samlet;
- 20/20 adresser ble geokodet med kildebevis;
- batch-intake kjørte med parallellitet fire;
- første intake genererte 13 kandidater, mens syv gikk direkte til source/parser-kø uten å blokkere resten;
- alle genererte kandidater kjørte uavhengig live source-gate;
- teknisk grønne kandidater ble deretter kontrollert for faktisk output-kvalitet, ikke bare `accepted=true`;
- generisk `non-dish-v7`-herding fjernet blant annet allergen-only labels, navigasjonsmetadata, seksjonstitler, tillegg og `stk`/`biter`-fragmenter;
- Tatakii falt korrekt ut da filtreringen viste at kilden ikke hadde minst tre reelle, prisede canonical retter;
- Castello ble holdt tilbake fordi en sammenklistret parserverdi fortsatt lekket gjennom;
- sluttresultatet ble **7 nye production-klare restauranter**, mens 13 eksplisitt ble stående i source/parser/quality-kø.

De syv som ble promotert samlet var:

1. Dalat Café;
2. Kebabish Original;
3. Kinabolle Ensjø;
4. Kinabolle Grønland;
5. Oche Aker Brygge;
6. Oche Torggata;
7. Villa Paradiso Tivoli.

Manifestene ble flyttet byte-for-byte fra staging til `catalog/`. Post-merge production proof viste at alle syv var active/enabled med fingerprint, null consecutive failures og ikke-blokkerende watcher-status.

### Oslo batch 02 — cleanup og fem nye production-restauranter

Batch 02 startet med 20 seed-restauranter. Etter tidligere promotion var 15 fortsatt utenfor katalogen. En fersk residualrunde mot den ferdige runtimeen ga **15 requested -> 6 generated -> 6/6 live-valid**, men output-inspeksjonen holdt alle seks igjen: Mesob hadde bare tre desserter og var derfor et source-dekningsproblem, mens Jaipur, IndiSpice og Døgnvill x3 hadde strukturell parserstøy.

Permanent cleanup i PR #365 ble først merget etter A/B-isolering av regressjoner og en autoritativ sluttgate. Den generiske løsningen låser blant annet:

- mat-scopet versus full-page beverage-evidence;
- kompakte allergenkoder uten å strippe vilkårlige parentetiske ord;
- canonical output-dedupe for speilede CTA-er, mengdefragmenter og add-on-duplikater;
- eksakt mengdetittel som `90 GRAM HAMBURGER`;
- smal Webflow-sanitizering av `.w-condition-invisible`, uten å forkaste legitime generiske `[hidden]`/`aria-hidden`-containere.

Autoritativ pre-merge proof var #393 / run `32596872644` / artifact `9481858862` med digest `sha256:fef15609a9b0f98e381fb1127501d4c497e90b83ce2b39f6315d49cc95eba436`:

- hele eksisterende catalog: **50/50 i primary serial pass**, ingen retry nødvendig;
- fresh intake av Jaipur + IndiSpice + Døgnvill x3: **5/5**;
- separat live revalidation av samme fem: **5/5**;
- observed-output-gaten: **0 quality failures**;
- Døgnvill: **35 items per lokasjon** og eksakt `90 GRAM HAMBURGER`;
- IndiSpice: **48 items**;
- Jaipur: **44 items**.

De fem manifestene ble deretter staged i PR #394 med byte-identiske Git blobs og live candidate-gate. PR #395 flyttet dem fra `candidates/` til `catalog/` som fem rene Git-renames med **0 additions / 0 deletions / 0 content changes**. Post-merge auto-materializer ga den historiske production-baselinen 55/55/55.

New Delhi var den eneste av de neste ti residualene som genererte et fullverdig manifest på 55-baselinen. Pipeline-debug #399 isolerte tapet av `Mixed Ice Cream`; permanent #400 innførte inline-priset title-provenance (`titles-v14`) og `beverage-v9`. #402 beviste eksisterende catalog **55/55**, New Delhi **81/81** i fresh intake og separat validation, `Mixed Ice Cream` **12900**, `Murgh Malai Chicken Tikka` **14900** og ingen `With wine package`. Candidate og catalog beholdt blob `d4d9e139a8ae6a145bf565f009ae36edda2663e6`; #408 promoterte filen som ren rename. Canonical `onboard:catalog` publiserte deretter New Delhi med første watch `changed` 81 og andre watch `unchanged` 81. En samtidig Habibi-refresh ble quarantined, men refresh-sikkerheten beholdt siste gyldige published coverage. Read-only #409 beviste deretter **56 active / 56 enabled**, null drift og korrekt New Delhi production-search.

Mesob og de øvrige åtte residualene forblir fail-closed i source-/transportkøen.

### Rødlistelukkingen før og etter batch 01

Følgende tidligere produksjonsfeil er lukket:

- **Confusion sourceKey-duplikater:** generisk canonical source-key-dedup ble merget i PR #279. Senere output-lekkasje ble lukket generisk i PR #300 med `non-dish-v8` + `beverage-v7` og fail-closed forbidden assertions.
- **Hrimnir:** redundant duplicate Oslo-manifest ble fjernet i PR #283; det eksisterende canonicale Hrimnir-manifestet forble publisert.
- **La Mayor:** den kildebeviste runtime-flooren ble justert fra 17 til 16 observerte items, mens alle eksplisitte rett-/prisassertions ble beholdt.
- **Café Sara:** ble ikke tvunget grønn. Den gamle førstpartsmenyen ga HTTP 404, og alternativene beviste ikke en komplett maskinlesbar canonical meny. Restauranten ble derfor fjernet fra aktiv katalog fail-closed i PR #287 og skal først komme tilbake når en fullverdig kilde kan bevises.
- **Coyo:** to `NETWORK_ERROR`-watcher ble isolert som transportfeil; samme canonical kilde besto live runtime og fikk deretter frisk production-watch.
- **Kain / Tyrkisk / Confusion inactive drift:** source-gatene var grønne, men tidligere transportfeil hadde etterlatt dem inactive. Kain ble re-onboardet kontrollert; Confusion/Tyrkisk ble lukket gjennom permanent parserherding og etterfølgende materializer/watcher. Batch-01-reconcile viste 45/45 aktive canonical restauranter; siste production-proof 2026-08-22 viser 56/56.

Som ekstern størrelsesreferanse viste Mattilsynets Smilefjes-oversikt 1 345 spisesteder i Oslo ved kontroll 2026-08-20: <https://smilefjes.mattilsynet.no/kommune/oslo/>. Dette omfatter flere typer spisesteder og er ikke Fysens canonical backlog. Baseline på 56 betyr derfor ikke «56 av alle Oslo-restauranter er ferdige»; den beskriver det nåværende verifiserte produksjonssettet.

## Produksjonslinjen

Restaurantarbeidet kjøres som batcher, mens hver restaurant fortsatt består eller feiler uavhengig:

1. research låser identitet, adresse, koordinater og canonical meny-/timer-/handlingskilder for en gruppe restauranter;
2. research/intake kjøres normalt i grupper på **20–30 restauranter**, ikke som én lang restaurant-for-restaurant-runde;
3. `intake:batch` henter flere menyer med avgrenset parallellitet og genererer candidate-manifester fra faktisk observerte retter;
4. standard parallellitet er **4**; høyere parallellitet brukes bare når kildeplattformene og nettverksportene tåler det;
5. generatoren setter `minimumExpectedItems` til hele det observerte canonicale item-antallet og velger spredte, prisede retter som permanente assertions;
6. `validate:candidates:batch` kjører full runtime-port parallelt, beholder stabil resultatorden og lar ugyldige eller utilgjengelige kandidater feile uten å stoppe resten;
7. feil grupperes som `manifest`, `transport`, `extraction`, `menu_assertions`, `hours`, `action` eller `unknown`;
8. parser-, transport- og scope-feil løses generisk med regresjonstester før berørte kandidater kjøres på nytt;
9. **teknisk grønn er nødvendig, men ikke tilstrekkelig**: batchen inspiseres også for parserlekkasje som UI-tekst, allergenlinjer, drikke, seksjonsoverskrifter, beskrivelser eller fragmenter som feilaktig er blitt rettenavn;
10. systematiske lekkasjer løses i felles runtime med versjonsbump og positive/negative regresjonstester; restaurantspesielle hacks unngås;
11. source-spesifikke `forbiddenDishNames` brukes som fail-closed regressionsperre når en konkret lekkasje er observert;
12. bare output-rene, blocking-grønne kandidater promoteres byte-for-byte til `catalog/`;
13. full CI, fersk `main`, merge og post-merge materializer/watcher-bevis må følges av en canonical DB-reconcile;
14. reconcile krever at alle katalog-slugs er aktive, at canonical sources er enabled, og at ingen aktiv restaurant ligger utenfor katalogen uten en eksplisitt begrunnelse;
15. når en parser-/extractorendring kan påvirke runtime-identiteten, kjøres en **serial full-catalog live-gate** før merge; en target-subset-gate er ikke tilstrekkelig;
16. transportflak håndteres per source: allerede grønne primary-resultater beholdes, og bare kilder som feiler utelukkende med `transport`/`action` kan få én identisk retry; `extraction`, `menu_assertions` og `hours` kan aldri retryes bort;
17. candidate -> catalog promotion skal være byte-for-byte når manifestet allerede er bevist; ren Git rename med uendret blob foretrekkes fremfor ny serialisering.

En batch kan dermed publisere de enkle restaurantene selv om krevende kilder må videre til adapter-/parserkøen. Ingen batchkommando senker assertions, hopper over live source-gaten eller aktiverer filer i `candidates/`.

## Output-quality-porten

Batcharbeidet har vist at en kilde kan være teknisk `accepted=true` og likevel ha semantisk dårlig output. Produksjonsporten skal derfor skille mellom:

- **source/runtime green:** nettverk, extraction, minimum, assertions, hours og action består;
- **output clean:** de observerte canonicale navnene er faktisk retter og ikke UI-/metadata-/drikkestøy;
- **production active:** samme manifest er materialisert, restaurant/source er aktivert og watcher-status er frisk.

Hvis en output-feil gjelder et mønster som kan forekomme hos flere restauranter, skal den fikses én gang i parser/runtime. Eksempler fra batcharbeidet er `top of page`, allergen-only labels, `Spør oss`, seksjonstitler, `stk`/`biter`-fragmenter, speilede CTA-er, mengdefragmenter og tydelige cocktail-/drikkebeskrivelser.

Positive regresjoner er like viktige som negative: filtre for ord som `gin`, `rum`, `bourbon`, `orange` eller `vegan` må samtidig bevise at reelle rettnavn ikke filtreres bort. Skjult DOM må også behandles etter dokumentert kildekontrakt; generiske `hidden`-attributter skal ikke antas å bety «ikke menydata».

## Kommandoer

En intake-plan kan inneholde opptil 100 restauranter. Standard parallellitet er fire og maksimum er åtte:

```bash
pnpm --filter @fysen/menu-worker build
pnpm --filter @fysen/menu-worker intake:batch -- intake/oslo-batch-01.json
pnpm --filter @fysen/menu-worker validate:candidates:batch
```

Generatoren nekter å overskrive eksisterende kandidatfiler. En restaurant må ha minst tre unike, prisede retter i live-kilden før et automatisk manifest kan genereres. `from`- og flerpris-semantikk kopieres inn i assertionene og forblir fail-closed.

## Post-merge production proof

Et restaurantarbeid er ikke ferdig ved grønn PR-CI. Etter merge skal produksjonsbeviset kontrollere minst:

1. antall unike canonical manifest-slugs;
2. at hver canonical restaurant er `active=true`;
3. at nøyaktig én forventet canonical menu source er enabled;
4. at siste snapshot møter manifestets minimum og har extractor-identitet;
5. at watcher har `consecutive_failures=0` og en ikke-blokkerende status;
6. at det ikke finnes active-not-catalog drift;
7. at representative retter kan finnes gjennom production search med korrekt canonical source URL;
8. at legacy-rader uten katalogdekning er eksplisitt quiescet dersom de ikke lenger er canonical.

Production-proofen skal som hovedregel være read-only. Materialisering skal skje gjennom den permanente, serialiserte `Materialize Fysen production catalog`-workflowen, ikke gjennom direkte SQL-aktivering eller manuell snapshot-skriving.

Web/API-deploy er en separat releaseflate. Restaurantmaterialisering og DB/watcher-proof skal ikke brukes som grunn til å bryte den låste Vercel-regelen på maksimalt to ordinære produksjonsdeployvinduer per døgn.

## Prioritering mot Oslo-dekning

Dekning bygges i trinn, ikke ved å gjøre alle 1 345 steder til én blokkende kø:

- hold den aktive produksjonsbaselinen grønn før hver ny batch;
- kjør nye research-/intake-batcher på 20–30 restauranter;
- prioriter geografisk og kulinarisk bredde samt dokumentert brukeretterspørsel;
- bygg generiske adaptere når samme plattformfeil gjentas;
- promoter den grønne delmengden samlet i stedet for å vente på vanskelige kilder;
- mål både `canonical manifests`, `active canonical`, `enabled sources` og `active-not-catalog` etter hver post-merge materializer;
- behold ubeviste restauranter fail-closed i source/parser-køen fremfor å senke kvalitetskravene.

Et planleggingsnivå på omtrent 200 strategisk valgte, production-green Oslo-restauranter kan brukes som dekningsmilepæl. Det er ikke en kvalitetsport og erstatter ikke etterspørsels-, kilde- eller ferskhetsmålingene i Oslo-piloten.
