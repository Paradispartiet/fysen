# Restaurant production

Dette dokumentet beskriver den permanente produksjonsmetoden for restaurantdekning. `apps/menu-worker/catalog/`, production DB og materializer-/watcher-resultatene er sannhetskilden. Tallene nedenfor er daterte kontrollmålinger, ikke en parallell katalog eller en fast lanseringskvote.

## Aktuell Oslo-status 2026-08-24

Canonical `main` etter fullført Oslo Batch 03 er `b935d4d8a323108b2c26de550c77a0e90c50e07f` (`Promote Oslo restaurant Batch 03`, PR #488).

- **85 unike canonical restaurantmanifester** er nå den dokumenterte Git-baselinen: 65 fra lukket Batch 02 + 20 nye manifestfiler i PR #488;
- **Batch-03-residualen for den valgte 20-restaurantsseeden er 0**: alle 20 ble generert, output-kvalitetssikret, exact-head livevalidert, promotert og deretter funnet direkte i production search;
- permanent intake/proof ble etablert i PR #486 og brukt videre uten disposable TEMP-/proof-PR-er;
- endelig parser-/output-herding ble merget i PR #487 etter full CI, exact-head changed-manifest proof og ny 20/20 batch-intake på head `3ef5b8ccf5ee6d4e5b4534975b4f16eec160776e`;
- den endelige intake-artifacten var `restaurant-batch-intake-3ef5b8ccf5ee6d4e5b4534975b4f16eec160776e`, digest `sha256:bd42fda78d2544f51fdb8bd31db3b4253dbc6bb611e457e27cc73af7db77a97c`, med **20 requested / 20 generated / 0 failed**;
- PR #488 promoterte nøyaktig de 20 bevist rene manifestene og passerte exact-head livevalidering av alle endrede katalogfiler før merge;
- post-merge public production-search viste **alle 20 nye restaurant-slugs** med ferske snapshots etter promotion-mergen. Den observerte materialiseringssekvensen lå fra `2026-08-24T08:34:10Z` til `2026-08-24T08:39:20Z` i `observedAt`/`lastCheckedAt` for de nye restaurantene;
- production-beviset omfatter 5 DIGG, 5 Sumo, 4 Olivia, 2 Dinner, Delicatessen Aker Brygge, Hanami, Nodee Sky og Villa Paradiso Frogner;
- representative production-søk bekreftet blant annet `Pesto & potet` **99 kr** hos alle fem DIGG, `Sim-Sim Poké` **269 kr** hos alle fem Sumo, `Panna cotta` **145 kr** hos de nye Olivia-lokasjonene, `VÅRRULLER` **169 kr** hos begge Dinner, `Plato de Ibérico` **255 kr** hos Delicatessen Aker Brygge, Hanamis signatursalat **179 kr**, Nodee Sky `MYSTERY GARDEN` **279 kr** og Villa Paradiso Frogner `Fusilli alla Montecarlo` **275 kr**.

Denne statusen skiller bevisst mellom **catalog baseline = 85** og et eksplisitt **fullt 85/85 DB-reconcile**. De 20 nye restaurantene er direkte production-bevist etter merge, men dokumentasjonen skal ikke konvertere Git-katalogtellingen eller et 20/20 promotion-bevis til et påstått fullreconcile-resultat for alle 85 uten at `production-pilot-proof`/catalog-health faktisk har fanget den målingen.

### Oslo Batch 03 — 65 -> 85

Batch 03 brukte 65-katalogen som dedupe-baseline og endte med følgende 20 canonical restauranter:

1. Olivia Hegdehaugsveien;
2. Olivia Tjuvholmen;
3. Olivia Østbanehallen;
4. Olivia Eger;
5. Sumo Karl Johan;
6. Sumo Storo;
7. Sumo Hegdehaugsveien;
8. Sumo Solli Plass;
9. Sumo Bjørvika;
10. DIGG Majorstuen;
11. DIGG Torggata;
12. DIGG Storo;
13. DIGG Grünerløkka;
14. DIGG Bislett;
15. Dinner Nationaltheatret;
16. Dinner Barcode;
17. Delicatessen Aker Brygge;
18. Villa Paradiso Frogner;
19. Nodee Sky;
20. Hanami Tjuvholmen.

Egon og Los Tacos/Ninito ble **ikke** tvunget inn for å nå et batchtall. Egon-kilden ga ikke canonical matoutput i den valgte statiske flaten, og Ninito var allerede dokumentert robots-/source-blokkert. De ble erstattet av kilder som kunne bestå den samme fail-closed-produksjonskontrakten uten nye unntak.

Endelig clean artifact hadde følgende observerte canonical item-dekning før promotion:

- Olivia: 53 / 53 / 58 / 53;
- Sumo: 71 per lokasjon;
- DIGG: 13 per lokasjon;
- Dinner: 45 Nationaltheatret / 43 Barcode;
- Delicatessen Aker Brygge: 58;
- Villa Paradiso Frogner: 49;
- Nodee Sky: 25;
- Hanami: 37.

Artifact-inspeksjon var en egen kvalitetsport, ikke pynt etter grønn CI. Før #487 ble blant annet vin/øl/sake-rader fra feil seksjonsproveniens, `– Head Chef`, `Barnemeny`, `Hanamis spesialiteter`, `6 Slices •`, donasjons-/serviceinnhold og `Orujos / Liquors`-innhold identifisert som ikke-canonical output. Dette ble løst generisk før promotion.

### Permanente produksjonskontrakter etter Batch 03

Batch 03 videreførte Batch-02-reglene og gjorde flere av dem mer effektive:

- `.github/workflows/restaurant-batch-intake.yml` er permanent writer/proof for batch research seeds. Den geokoder mot Kartverket, deduper mot canonical katalog, genererer fra live kilder, krever full generering og kjører strict validation med `maxAttempts=1`;
- parser-/runtime-PR-er kan deklarere `Batch-intake seed: apps/menu-worker/research/<batch>.seed.json` i PR-body og få ny exact-head batch-reproof uten meningsløse seed-touch-commits eller TEMP-brancher;
- Kartverket-resolusjon er fail-closed på publisert postnummer. Sumo Hegdehaugsveien ble derfor korrigert til dokumentert `Hegdehaugsveien 31, 0352 Oslo` i seed-data i stedet for at geokoderen ble svekket;
- HTML scoped output revalideres også mot fullside-seksjonsproveniens (`text-section-scope-v10`). Et element som bare har beverage-evidens på fullsiden faller ut selv om scoped fragment mistet `Drinks`-overskriften; ekte food-evidens kan fortsatt vinne;
- layoutfragmenter, rolle-signaturer, rene seksjonstitler og konservativt identifiserbare trailing allergenkoder fjernes uten å strippe semantiske dash-kvalifikatorer;
- `public-menu-api-v3` viderefører offentlig Favrit-/WeOrder-støtte og filtrerer rekursivt drikke-, retail-, donasjons-/veldedighets- og liquor/liqueur/orujo-seksjoner. `doner` brukes bevisst **ikke** som donasjonsmatch fordi `Doner kebab` er en reell rett;
- exact-head restaurantproof på den faktiske permanente PR-en er promotion-gaten. Full live-katalog eies separat av catalog-health/reconcile, slik at urelatert transport-health ikke ugyldiggjør korrekt proof for nye restauranter;
- full katalog-health skal fortsatt være synlig og fail-closed for deterministiske feil. Skillet mellom promotion-proof og health er ikke en terskelsvekkelse.

## Historisk fullreconcile 2026-08-22

Siste eksplisitt arkiverte fullreconcile før 65- og 85-katalogene brukte production revision `2e57e1d324415f2a296b43b54c13e58cb23d4292`. Run `32600667247` / artifact `9483248543` viste:

- **56 canonical produksjonsmanifester**;
- **56/56 aktive canonical restauranter** i production DB;
- **56 aktive restaurant-rader totalt**;
- **56 enabled menu sources**;
- **0 inactive canonical**;
- **0 active-not-catalog**;
- nøyaktig én enabled canonical menu source per katalogrestaurant;
- fersk snapshot-/watcher-dekning for de promoterte kildene.

Dette er fortsatt referansepunktet for hva ordet **fullreconcile** betyr. Senere 65- og 85-baseliner skal ikke beskrives som fullreconcilet før en tilsvarende eksplisitt måling er fanget.

## Oslo Batch 01

PR #294 (`700d24cb3c1e96a8fb5db5f2aa5f2457132d24c5`) var første reelle høy-throughput-batch etter at batchlinjen ble etablert.

- 20 restauranter ble researchet samlet og 20/20 adresser geokodet med kildebevis;
- første intake genererte 13 kandidater, mens syv gikk direkte til source/parser-kø;
- teknisk grønne kandidater ble kontrollert for faktisk output-kvalitet;
- generisk non-dish-/beverage-herding fjernet allergenlabels, navigasjonsmetadata, seksjonstitler, tillegg og mengdefragmenter;
- Tatakii falt korrekt ut fordi kilden ikke hadde minst tre reelle prisede canonical retter;
- Castello ble holdt tilbake på parserlekkasje;
- sluttresultatet var **7 nye production-klare restauranter**: Dalat Café, Kebabish Original, Kinabolle Ensjø, Kinabolle Grønland, Oche Aker Brygge, Oche Torggata og Villa Paradiso Tivoli.

Batch 01 etablerte dermed prinsippet som fortsatt gjelder: en batch kan promotere den rene delmengden mens vanskelige kilder forblir fail-closed.

## Oslo Batch 02 — cleanup og sluttføring

Batch 02 startet med 20 seed-restauranter og utviklet store deler av den generiske parser-/proof-infrastrukturen som Batch 03 bygger videre på.

Viktige permanente milepæler:

- PR #365: generisk output-cleanup etter A/B-isolering, inkludert mat-/drikkescope, allergenkoder, duplicate/CTA-/mengdefragmenter og konservativ skjult-DOM-håndtering;
- autoritativ proof #393 / run `32596872644` / artifact `9481858862`, digest `sha256:fef15609a9b0f98e381fb1127501d4c497e90b83ce2b39f6315d49cc95eba436`, med 50/50 eksisterende catalog i primary serial pass og 5/5 fresh kandidater uten output-quality-feil;
- #395 promoterte fem byte-identiske kandidatmanifester og løftet daværende production-baseline til 55;
- New Delhi ble deretter promotert via #408 etter `titles-v14` + `beverage-v9`, med 81-item proof og production search-bevis;
- historisk read-only #409 beviste **56 active / 56 enabled** og null drift på den daværende baselinen;
- PR #446 promoterte Delicatessen Grünerløkka og Majorstuen via offentlig Favrit API;
- PR #457 promoterte Der Peppern Gror Rådhusplassen via offentlig WeOrder;
- PR #460 promoterte Benares, Golden Chimp, Kverneriet Majorstua og Kverneriet Solli;
- PR #468 gjorde validatorbudsjettet eksplisitt og muliggjorde bokstavelig `maxAttempts=1` proof;
- PR #471 innførte bounded, persistért HTTP `maxResponseBytes`, slik at Sawan kunne bruke 3 MiB uten å heve standardgrensen globalt;
- Viet Kitchen- og Registan-drift som sluttgatene oppdaget ble reparert separat uten svekkede assertions;
- Mesob ble sluttbevist med 22 items og Sawan med 44 items;
- PR #475 promoterte Mesob og Sawan og løftet canonical katalog til **65**;
- PR #481 etablerte den permanente proof-modellen: exact-head livevalidering av restaurantene som faktisk endres, med full catalog-health separat.

**Batch-02 residual count er 0.** Senere feil på de 65 gamle restaurantene er catalog-health/source-drift og skal behandles som egne driftsfeil, ikke som gjenåpnet Batch 02.

## Rødlistelukking og source-drift

Tidligere produksjonsfeil viser hvordan fail-closed-regelen skal brukes:

- **Confusion:** sourceKey-/outputlekkasje ble lukket med generisk canonical dedupe og non-dish/beverage-herding;
- **Hrimnir:** redundant duplicate Oslo-manifest ble fjernet mens canonical manifest forble publisert;
- **La Mayor:** runtime-floor ble justert til faktisk observert kildebevis uten å fjerne rett-/prisassertions;
- **Café Sara:** gammel førstpartsmeny ga 404 og alternativer beviste ikke full canonical meny. Restauranten ble derfor fjernet fra aktiv katalog i stedet for å tvinges grønn;
- **Coyo:** transport-/bookingflak skal rapporteres i catalog-health og ikke blokkere en urelatert promotion. Deterministiske Coyo-feil skal fortsatt stoppe health-gaten;
- **Kain / Tyrkisk / Confusion inactive drift:** ble reparert gjennom kontrollert re-onboarding/parserherding, ikke gjennom manuell DB-maskering.

Som ekstern størrelsesreferanse viste Mattilsynets Smilefjes-oversikt 1 345 spisesteder i Oslo ved kontroll 2026-08-20: <https://smilefjes.mattilsynet.no/kommune/oslo/>. Dette omfatter flere typer spisesteder og er ikke Fysens canonical backlog. Katalogbaseline på **85** betyr derfor ikke «85 av alle Oslo-restauranter er ferdige»; den beskriver det nåværende canonicale produksjonssettet som skal utvides batchvis.

## Produksjonslinjen

Restaurantarbeidet kjøres som batcher, mens hver restaurant fortsatt består eller feiler uavhengig:

1. research låser identitet, adresse, koordinater og canonical meny-/timer-/handlingskilder for en gruppe restauranter;
2. intake kjøres normalt i grupper på **20–30 restauranter**;
3. 65/85-katalogen brukes som dedupe-baseline før nye kandidater kan genereres;
4. `intake:batch` henter flere menyer med avgrenset parallellitet og genererer candidate-manifester fra faktisk observerte retter;
5. standard parallellitet er **4**; høyere parallellitet brukes bare når kilder og nettverksporter tåler det;
6. generatoren setter `minimumExpectedItems` til hele det observerte canonicale item-antallet og velger spredte, prisede retter som permanente assertions;
7. batch-validatoren kjører full runtime-port med stabil resultatorden og lar ugyldige/utilgjengelige kandidater feile uavhengig;
8. feil grupperes som `manifest`, `transport`, `extraction`, `menu_assertions`, `hours`, `action` eller `unknown`;
9. parser-, transport- og scope-feil løses generisk med regresjonstester før berørte kandidater kjøres på nytt;
10. **teknisk grønn er nødvendig, men ikke tilstrekkelig**: artifact/output inspiseres også for UI-tekst, drikke, seksjonsoverskrifter, beskrivelser, allergen-/mengdefragmenter og andre falske rettenavn;
11. systematiske lekkasjer løses i felles runtime med versjonsbump og positive/negative regresjoner; restaurantspesielle hacks unngås;
12. source-spesifikke `forbiddenDishNames` kan brukes som fail-closed regresjonsperre når en konkret lekkasje er observert;
13. bare output-rene, blocking-grønne kandidater promoteres til `catalog/`;
14. candidate -> catalog skal være byte-for-byte når manifestet allerede er bevist;
15. endrede candidate/catalog-manifester live-valideres på **eksakt permanent PR-head**;
16. runtime/parser-endringer skal deklarere konkrete `Live-proof manifests:` og/eller `Batch-intake seed:` på samme PR når relevant;
17. transportflak håndteres per source. Deterministiske extraction/menu-assertion/hours-feil kan aldri retryes bort;
18. merge etterfølges av den serialiserte production-materializeren og konkret production-bevis for de nye restaurantene;
19. hele live-katalogen kontrolleres separat av permanent `restaurant-catalog-health`/`production-pilot-proof`;
20. et batch-closeout skal eksplisitt skille `canonical manifests`, `new promotion materialized` og `full DB reconcile`.

Ingen batchkommando senker assertions, hopper over live source-gaten eller aktiverer filer i `candidates/`.

## Output-quality-porten

Batcharbeidet har vist at en kilde kan være teknisk `accepted=true` og likevel ha semantisk dårlig output. Produksjonsporten skiller derfor mellom:

- **source/runtime green:** nettverk, extraction, minimum, assertions, hours og action består;
- **output clean:** observerte canonical navn er faktisk matretter, ikke UI-/metadata-/drikkestøy;
- **promotion exact-head green:** de filene som skal merges er livevalidert på den eksakte PR-headen;
- **production materialized:** samme manifest finnes i production med fersk snapshot/watcher etter merge;
- **catalog fullreconciled:** alle canonical slugs, active/enabled sources, snapshots og active-not-catalog er eksplisitt målt samlet.

Positive regresjoner er like viktige som negative. Et filter som fjerner `wine`, `liquor`, `gin`, `rum`, `beer`, `donation` eller allergenkoder skal samtidig bevise at reelle matnavn med overlappende språk ikke blir filtrert bort. Batch 03 låser blant annet at `Morudoba Sake` kan være mat, at `Doner kebab` ikke blir tolket som donasjon, og at semantiske dash-kvalifikatorer ikke forsvinner.

## Kommandoer

En intake-plan kan inneholde opptil 100 restauranter. Standard parallellitet er fire og maksimum er åtte:

```bash
pnpm --filter @fysen/menu-worker build
pnpm --filter @fysen/menu-worker intake:batch -- intake/oslo-batch-01.json
pnpm --filter @fysen/menu-worker validate:candidates:batch
```

Generatoren nekter å overskrive eksisterende kandidatfiler. En restaurant må ha minst tre unike, prisede retter i live-kilden før et automatisk manifest kan genereres. `from`- og flerpris-semantikk kopieres inn i assertionene og forblir fail-closed.

På pull requests er den permanente `Validate Fysen restaurant changes`-workflowen autoritativ for exact-head livevalidering av endrede manifestfiler. `Restaurant batch intake` er autoritativ for seed-basert research/intake reproof. Full catalog-health kjøres separat; disposable proof-workflows skal ikke opprettes for normal drift.

## Post-merge production proof

Et restaurantarbeid er ikke ferdig ved grønn PR-CI. Etter merge skal produksjonsbevis kontrollere minst:

1. antall unike canonical manifest-slugs;
2. at nye canonical restauranter faktisk kan materialiseres;
3. at forventet canonical menu source er enabled for det som bevises;
4. at siste snapshot møter manifestets minimum og extractor-identitet;
5. at watcher har frisk, ikke-blokkerende status og operativ failure-telemetri;
6. representative retter i production search har korrekt restaurant-slug, pris og canonical source URL;
7. `observedAt`/`lastCheckedAt` er etter promotion når beviset påstår post-merge materialisering;
8. fullreconcile, når det påstås, må i tillegg bevise alle catalog slugs active, nøyaktig forventede enabled sources og **0 active-not-catalog** drift.

Production-proof skal som hovedregel være read-only. Materialisering skjer gjennom den permanente, serialiserte `Materialize Fysen production catalog`-workflowen, ikke gjennom direkte SQL-aktivering eller manuell snapshot-skriving. `scripts/production-pilot-proof.mjs` og permanent catalog-health er de autoritative fullkatalogkontrollene; public API-søk er et sterkt tillegg for å bevise konkrete nye promotions etter merge, men erstatter ikke et fullreconcile.

Web/API-deploy er en separat releaseflate. Restaurantmaterialisering og DB/watcher-proof skal ikke brukes som grunn til å bryte den låste Vercel-regelen på maksimalt to ordinære produksjonsdeployvinduer per døgn.

## Prioritering mot Oslo-dekning

Dekning bygges i trinn, ikke ved å gjøre hele Oslo til én blokkende kø:

- hold den aktive produksjonsbaselinen grønn før hver ny batch;
- kjør nye research-/intake-batcher på 20–30 restauranter;
- prioriter geografisk og kulinarisk bredde samt dokumentert brukeretterspørsel;
- bygg generiske adaptere når samme plattformfeil gjentas;
- promoter den grønne delmengden samlet i stedet for å vente på vanskelige kilder;
- mål både `canonical manifests`, `new promotion materialized`, `active canonical`, `enabled sources` og `active-not-catalog` med riktig bevisnivå;
- behold ubeviste restauranter fail-closed i source/parser-køen fremfor å senke kvalitetskravene.

Et planleggingsnivå på omtrent 200 strategisk valgte, production-green Oslo-restauranter kan brukes som dekningsmilepæl. Det er ikke en kvalitetsport og erstatter ikke etterspørsels-, kilde- eller ferskhetsmålingene i Oslo-piloten.
