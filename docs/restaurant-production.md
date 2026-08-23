# Restaurant production

Dette dokumentet beskriver den permanente produksjonsmetoden for restaurantdekning. `apps/menu-worker/catalog/`, production DB og materializer-/watcher-resultatene er sannhetskilden. Tallene nedenfor er daterte kontrollmålinger, ikke en parallell katalog eller en fast lanseringskvote.

## Aktuell Oslo-status 2026-08-23

Canonical `main` etter fullført Batch 02 er `b799763e58bdf345b899d659ec7c713791204706` (`Promote Mesob and Sawan from completed Batch 02`, PR #475).

- **65 unike canonical restaurantmanifester** ligger i `apps/menu-worker/catalog/`;
- den dokumenterte **Batch-02-residualkøen er 0**;
- de siste ni katalogtilleggene fra 56-baselinen er Delicatessen Grünerløkka, Delicatessen Majorstuen, Der Peppern Gror Rådhusplassen, Benares, Golden Chimp, Kverneriet Majorstua, Kverneriet Solli, Mesob og Sawan;
- Mesob er live-validert med **22 canonical items** og er post-merge synlig i production search med `KITFO / ክትፎ` **349 kr** fra korrekt canonical kilde;
- Sawan er live-validert med **44 canonical items**, 13 låste semantiske navn/pris-par og er post-merge synlig i production search med `Chicken satay` **220 kr** fra `https://www.sawan.no/meny`;
- begge de to siste promotionene har production `observedAt`/`lastCheckedAt` etter #475-mergen, som beviser at de er materialisert og kontrollert i production og ikke bare finnes i Git-katalogen;
- full katalog-health eies nå av den permanente `restaurant-catalog-health`-workflowen på `main`/schedule/manual. En urelatert Coyo booking-action har sist vist transient transport-degradering selv om den offentlige bookingflaten er oppe; dette er et source-health-signal, ikke en grunn til å ugyldiggjøre exact-head proof for andre restauranter.

Denne statusen skiller bevisst mellom **catalog baseline = 65** og en full DB-reconcile av alle 65. De to siste restaurantene er direkte production-bevist etter merge. Hele katalogens aktive/enabled/snapshot-integritet skal fortsatt rapporteres av den permanente catalog-health/production-pilot-flyten; dokumentasjonen skal ikke konvertere en Git-katalogtelling til et påstått fullreconcile-resultat uten et slikt bevis.

### Nye permanente produksjonskontrakter fra Batch 02

Batch-02-lukkingen ga flere generiske kapabiliteter som skal brukes videre:

- `strong-title-price-v1` for semantiske strong-title + pris-menyer uten restaurantspesielle regler;
- `public-menu-api-v2` for strukturerte offentlige meny-API-er, inkludert de beviste Favrit- og WeOrder-familiene, med eksplisitt `sourceType: "api"` og fail-closed mat-/prisfiltrering;
- eksplisitt validatorbudsjett `maxAttempts` **1..3**: vanlig drift beholder robust default 3, mens strict proof kan bruke `maxAttempts=1` og dermed dokumentere et reelt enkeltforsøk;
- generisk, persistért HTTP `maxResponseBytes` per menu source: **64 KiB..4 MiB**, bare for HTTP-kilder. Manglende override beholder standard **2 MiB**. Sawan bruker eksplisitt **3 MiB**; dette endrer ikke globalgrensen;
- exact-head restaurantproof på den faktiske permanente PR-en. Full live-katalog er fra PR #481 flyttet til separat health/release-verifikasjon, slik at deterministiske katalogfeil fortsatt er fail-closed uten at et urelatert transportflak blokkerer en korrekt restaurantpromotion;
- TEMP/proof/writer/rebase-PR-er skal ikke lenger være normal produksjonsmetode. Gjenbrukbar proof-funksjonalitet skal være permanent workflow/testkontrakt.

### Historisk fullreconcile 2026-08-22

Siste eksplisitt arkiverte fullreconcile før 65-katalogen var read-only production-proof etter parsercleanup #365, fem-restaurant-promotion #395 og New Delhi-promotion #408. Den brukte production revision `2e57e1d324415f2a296b43b54c13e58cb23d4292`. Run `32600667247` / artifact `9483248543` viste:

- **56 canonical produksjonsmanifester** i `apps/menu-worker/catalog/`;
- **56/56 aktive canonical restauranter** i production DB;
- **56 aktive restaurant-rader totalt**;
- **56 enabled menu sources**;
- **0 inactive canonical** restauranter;
- **0 active-not-catalog** restaurant-rader;
- nøyaktig **én enabled canonical menu source per katalogrestaurant**;
- de fem tidligere Batch-02-kildene og New Delhi hadde bevist production coverage; New Delhi hadde `consecutive_failures=0` og 81-item snapshot;
- production search returnerte representative retter fra de fem tidligere restaurantene samt New Delhi med korrekt canonical source URL.

De fem nye source-bevisene i den historiske målingen var:

- Døgnvill Bjørvika: **35 items**, HTTP 304, siste watcher `not_modified`;
- Døgnvill Tjuvholmen: **35 items**, HTTP 304, siste watcher `not_modified`;
- Døgnvill Vulkan: **35 items**, HTTP 304, siste watcher `not_modified`;
- IndiSpice: **48 items**, HTTP 304, siste watcher `not_modified`;
- Jaipur: **44 items**, HTTP 200, siste watcher `unchanged`.

Etter 55-baselinen ble også **New Delhi Tjuvholmen** promotert byte-for-byte via #408. Permanent `titles-v14` + `beverage-v9` ble først bevist mot eksisterende catalog **55/55** og New Delhi **81/81** i #402. Read-only production-proof #409 / run `32600667247` / artifact `9483248543` med digest `sha256:dadd04d28d955526fdcbb028cb548c87e4bd7ecdef8da4710d376e7a2b2a112d` viste New Delhi som enabled canonical source med **81 items**, HTTP 200, `consecutive_failures=0`, siste watcher `unchanged`, og production-search for `Mixed Ice Cream` **129 kr** og `Murgh Malai Chicken Tikka` **149 kr** fra korrekt canonical source. Dette løftet den daværende operative baselinen til **56/56/56**.

Production-status må skilles fra rå DB-historikk: deaktiverte legacy-rader kan fortsatt eksistere for referanseintegritet, men teller ikke som aktive restauranter. Den canonicale integritetsmålingen er alltid `catalog slug -> active restaurant -> nøyaktig én enabled menu source -> frisk snapshot/watcher`, pluss eksplisitt kontroll av at ingen aktiv restaurant ligger utenfor katalogen.

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

### Oslo batch 02 — cleanup og sluttføring

Batch 02 startet med 20 seed-restauranter. Etter tidligere promotion var 15 fortsatt utenfor katalogen. En fersk residualrunde mot den daværende runtimeen ga **15 requested -> 6 generated -> 6/6 live-valid**, men output-inspeksjonen holdt alle seks igjen: Mesob hadde bare tre desserter og var derfor et source-dekningsproblem, mens Jaipur, IndiSpice og Døgnvill x3 hadde strukturell parserstøy.

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

New Delhi var den eneste av de neste ti residualene som genererte et fullverdig manifest på 55-baselinen. Pipeline-debug #399 isolerte tapet av `Mixed Ice Cream`; permanent #400 innførte inline-priset title-provenance (`titles-v14`) og `beverage-v9`. #402 beviste eksisterende catalog **55/55**, New Delhi **81/81** i fresh intake og separat validation, `Mixed Ice Cream` **12900**, `Murgh Malai Chicken Tikka` **14900** og ingen `With wine package`. Candidate og catalog beholdt blob `d4d9e139a8ae6a145bf565f009ae36edda2663e6`; #408 promoterte filen som ren rename. Canonical `onboard:catalog` publiserte deretter New Delhi med første watch `changed` 81 og andre watch `unchanged` 81. En samtidig Habibi-refresh ble quarantined, men refresh-sikkerheten beholdt siste gyldige published coverage. PR #411 skilte deretter permanent mellom `failedCount` og `blockingFailedCount`: en eksplisitt extractor-refresh-feil med bevist safe-fallback-restore for en allerede publisert restaurant forblir synlig source-health-telemetri, men blokkerer ikke hele catalog-materializeringen; nye restauranter, manifest-/quality-feil og refresh uten trygg restore er fortsatt blocking/fail-closed. Read-only #409 beviste deretter **56 active / 56 enabled**, null drift og korrekt New Delhi production-search.

Dette var status ved 56-baselinen. Per 2026-08-23 er den dokumenterte Batch-02-residualkøen lukket.

#### Batch 02 sluttføring: 56 -> 65 canonical manifester

Sluttføringen skjedde uten å svekke source-, parser- eller output-portene:

- PR #446 promoterte **Delicatessen Grünerløkka** og **Delicatessen Majorstuen** via den generiske offentlige Favrit API-familien;
- PR #457 promoterte **Der Peppern Gror Rådhusplassen** via restaurantens offentlige WeOrder-kanal;
- de generiske API-familiene ble samlet i `public-menu-api-v2`, med mat-scope, positive prisbevis og fail-closed filtrering uten restaurant-ID/hostname-regler i extractoren;
- PR #460 promoterte **Benares**, **Golden Chimp**, **Kverneriet Majorstua** og **Kverneriet Solli** etter fresh source/output-proof;
- PR #468 gjorde validatorens forsøkstall eksplisitt og gjorde `maxAttempts=1` mulig for bokstavelige ett-forsøksbevis;
- PR #471 innførte den persistente, bounded HTTP-responsegrensen som lot Sawan bruke 3 MiB uten å heve standardgrensen på 2 MiB;
- eksisterende live-drift ble reparert separat og strengere, ikke maskert: **Delicatessen Majorstuen** til stabilt 52-item manifest, **Viet Kitchen** fra stale minimum 20 til faktisk 66 items i PR #479, og **Registan** fra 24 til 25 items med dagens Plov-identitet i PR #482;
- **Mesob** ble sluttbevist med 22 items;
- **Sawan** ble sluttbevist med 44 items og 13 semantiske navn/pris-par;
- PR #475 promoterte Mesob og Sawan som de to siste Batch-02-manifestene og løftet canonical katalog til **65**;
- PR #481 flyttet fullkatalog-health ut av urelaterte mergegates, men beholdt exact-head livevalidering av endrede manifester og fail-closed deterministic health-signaler.

**Batch-02 residual count er dermed 0.** Nye problemer på eksisterende restauranter er catalog-health/source-drift og skal behandles som egne feil, ikke gjenåpne den avsluttede residuallisten.

### Rødlistelukkingen før og etter batch 01

Følgende tidligere produksjonsfeil er lukket eller eksplisitt klassifisert:

- **Confusion sourceKey-duplikater:** generisk canonical source-key-dedup ble merget i PR #279. Senere output-lekkasje ble lukket generisk i PR #300 med `non-dish-v8` + `beverage-v7` og fail-closed forbidden assertions.
- **Hrimnir:** redundant duplicate Oslo-manifest ble fjernet i PR #283; det eksisterende canonicale Hrimnir-manifestet forble publisert.
- **La Mayor:** den kildebeviste runtime-flooren ble justert fra 17 til 16 observerte items, mens alle eksplisitte rett-/prisassertions ble beholdt.
- **Café Sara:** ble ikke tvunget grønn. Den gamle førstpartsmenyen ga HTTP 404, og alternativene beviste ikke en komplett maskinlesbar canonical meny. Restauranten ble derfor fjernet fra aktiv katalog fail-closed i PR #287 og skal først komme tilbake når en fullverdig kilde kan bevises.
- **Coyo:** tidligere `NETWORK_ERROR`-watcher ble isolert som transportfeil. I Batch-02-sluttføringen viste booking-actionen igjen transient transportfeil fra runner selv om den offentlige bookingflaten var oppe. Fra #481 rapporteres dette i catalog-health og kan ikke blokkere en urelatert restaurantpromotion; deterministic Coyo-feil skal fortsatt stoppe health-gaten.
- **Kain / Tyrkisk / Confusion inactive drift:** source-gatene var grønne, men tidligere transportfeil hadde etterlatt dem inactive. Kain ble re-onboardet kontrollert; Confusion/Tyrkisk ble lukket gjennom permanent parserherding og etterfølgende materializer/watcher. Batch-01-reconcile viste 45/45 aktive canonical restauranter; det historiske fullreconcile-beviset 2026-08-22 viste 56/56.

Som ekstern størrelsesreferanse viste Mattilsynets Smilefjes-oversikt 1 345 spisesteder i Oslo ved kontroll 2026-08-20: <https://smilefjes.mattilsynet.no/kommune/oslo/>. Dette omfatter flere typer spisesteder og er ikke Fysens canonical backlog. Katalogbaseline på 65 betyr derfor ikke «65 av alle Oslo-restauranter er ferdige»; den beskriver det nåværende canonicale produksjonssettet som videre skal utvides batchvis.

## Produksjonslinjen

Restaurantarbeidet kjøres som batcher, mens hver restaurant fortsatt består eller feiler uavhengig:

1. research låser identitet, adresse, koordinater og canonical meny-/timer-/handlingskilder for en gruppe restauranter;
2. research/intake kjøres normalt i grupper på **20–30 restauranter**, ikke som én lang restaurant-for-restaurant-runde;
3. `intake:batch` henter flere menyer med avgrenset parallellitet og genererer candidate-manifester fra faktisk observerte retter;
4. standard parallellitet er **4**; høyere parallellitet brukes bare når kildeplattformene og nettverksportene tåler det;
5. generatoren setter `minimumExpectedItems` til hele det observerte canonicale item-antallet og velger spredte, prisede retter som permanente assertions;
6. batch-validatoren kjører full runtime-port med stabil resultatorden og lar ugyldige eller utilgjengelige kandidater feile uten å stoppe resten;
7. feil grupperes som `manifest`, `transport`, `extraction`, `menu_assertions`, `hours`, `action` eller `unknown`;
8. parser-, transport- og scope-feil løses generisk med regresjonstester før berørte kandidater kjøres på nytt;
9. **teknisk grønn er nødvendig, men ikke tilstrekkelig**: batchen inspiseres også for parserlekkasje som UI-tekst, allergenlinjer, drikke, seksjonsoverskrifter, beskrivelser eller fragmenter som feilaktig er blitt rettenavn;
10. systematiske lekkasjer løses i felles runtime med versjonsbump og positive/negative regresjonstester; restaurantspesielle hacks unngås;
11. source-spesifikke `forbiddenDishNames` brukes som fail-closed regressionsperre når en konkret lekkasje er observert;
12. bare output-rene, blocking-grønne kandidater promoteres byte-for-byte til `catalog/`;
13. scope-aware CI, fersk `main`, merge og post-merge materializer/watcher-bevis må følges av canonical production health/reconcile;
14. reconcile krever at alle katalog-slugs er aktive, at canonical sources er enabled, og at ingen aktiv restaurant ligger utenfor katalogen uten en eksplisitt begrunnelse;
15. endrede candidate/catalog-manifester live-valideres på **eksakt permanent PR-head**. Runtime/parser-endringer skal liste konkrete `Live-proof manifests:` på den samme PR-en når slike source-proofs er relevante; det skal ikke opprettes en separat TEMP proof-PR;
16. transportflak håndteres per source: allerede grønne primary-resultater beholdes, og bare kilder som feiler utelukkende med `transport`/`action` kan få én identisk retry. `extraction`, `menu_assertions` og deterministiske `hours`-feil kan aldri retryes bort;
17. candidate -> catalog promotion skal være byte-for-byte når manifestet allerede er bevist; ren Git rename med uendret blob foretrekkes fremfor ny serialisering;
18. hele live-katalogen kontrolleres separat av den permanente `restaurant-catalog-health`-flyten på `main`/schedule/manual. Deterministisk eksisterende drift skal repareres som egen source/catalog-feil; urelatert transport-health skal være synlig uten å retroaktivt ugyldiggjøre en korrekt PR.

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

På pull requests er den permanente `Validate Fysen restaurant changes`-workflowen autoritativ for exact-head livevalidering av endrede manifester. Full katalog-health kjøres separat; disposable proof-workflows skal ikke opprettes for normal drift.

## Post-merge production proof

Et restaurantarbeid er ikke ferdig ved grønn PR-CI. Etter merge skal produksjonsbeviset kontrollere minst:

1. antall unike canonical manifest-slugs;
2. at hver canonical restaurant er `active=true`;
3. at nøyaktig én forventet canonical menu source er enabled;
4. at siste snapshot møter manifestets minimum og har extractor-identitet;
5. at watcher har frisk, ikke-blokkerende status og operativ failure-telemetri;
6. at det ikke finnes active-not-catalog drift;
7. at representative retter kan finnes gjennom production search med korrekt canonical source URL;
8. at legacy-rader uten katalogdekning er eksplisitt quiescet dersom de ikke lenger er canonical.

Production-proofen skal som hovedregel være read-only. Materialisering skal skje gjennom den permanente, serialiserte `Materialize Fysen production catalog`-workflowen, ikke gjennom direkte SQL-aktivering eller manuell snapshot-skriving. `scripts/production-pilot-proof.mjs` og permanent catalog-health er de autoritative fullkatalogkontrollene; representative public API-søk kan brukes som tillegg for å bevise konkrete nye promotioner etter merge.

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
