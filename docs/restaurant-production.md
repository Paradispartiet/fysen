# Restaurant production

Dette dokumentet beskriver den permanente produksjonsmetoden for restaurantdekning. `apps/menu-worker/catalog/`, production DB og materializer-/watcher-resultatene er sannhetskilden. Tallene nedenfor er daterte kontrollmålinger, ikke en parallell katalog eller en fast lanseringskvote.

## Aktuell Oslo-status 2026-08-24

Canonical `main` etter fullført Oslo Batch 04 er `19ad53c4a7588487ad0314aec1d7553691e1b275` (`Promote Oslo restaurant Batch 04 Peppes`, PR #492).

- **97 unike canonical restaurantmanifester** er nå den dokumenterte Git-baselinen: 85 fra lukket Batch 03 + 12 nye Peppes-manifester i PR #492;
- **Batch-04-residualen for den valgte 12-restaurantsseeden er 0**: alle 12 ble generert, output-kvalitetssikret, strict livevalidert, promotert og deretter funnet direkte i production search;
- intake-PR #491 ble merget fra exact head `2a237421b186afb4d9c334d81ed36f14137e0b6a` etter grønn CI og `Restaurant batch intake`;
- endelig intake-artifact var `restaurant-batch-intake-2a237421b186afb4d9c334d81ed36f14137e0b6a`, digest `sha256:fcf4ae3d69c96a3fc8c902350c78408c45f6df6895cbfbb8b1369eea206b475c`, med **12 requested / 12 generated / 12 strict live-valid / 0 failed** og `maxAttempts=1`;
- alle 12 hadde **8 prisbundne quality assertions**. Observerte menyfloors var 59 items for ti lokasjoner, 58 for Løren og 42 for Nydalen; den mindre Nydalen-menyen ble bevart som faktisk live-kilde, ikke fylt kunstig opp;
- PR #492 promoterte nøyaktig 12 nye catalog-manifester og ingen andre filer. Exact promotion head `e78503d16a7e7b3aee7d1d5ddcab53a5916d3752` bestod både ordinær CI og `Validate Fysen restaurant changes`, inkludert `Strictly validate changed/requested manifests`;
- post-merge production-materialisering ble observert fra Ensjø `observedAt=2026-08-24T10:53:41.736Z` til Tåsen `lastCheckedAt=2026-08-24T10:57:32.442Z`;
- public production search returnerte til slutt **12/12 nye Peppes-slugs** for den eksakte retten `49. New Dehli Supreme`, pris **238 kr**, med korrekt lokasjonsspesifikk Wolt-kilde og ferske post-merge snapshots;
- Peppes Karl Johan og Peppes Aker Brygge er **ikke** med i denne promotionen. Karl Johan mangler entydig støtte i den valgte nåværende Wolt-familien, mens Aker Brygge har motstridende aktuell identitet/aktiv-status. Begge forblir fail-closed til separat kildebevis finnes;
- Gardermoen og Lysaker ble korrekt ekskludert fordi de ligger utenfor Oslo kommune.

Denne statusen skiller bevisst mellom **catalog baseline = 97**, **12/12 new promotion materialized** og et eksplisitt **fullt 97/97 DB-reconcile**. Batch 04 beviser de tolv nye restaurantene direkte etter merge, men er ikke et samlet bevis for at alle 97 canonical slugs samtidig er active, har nøyaktig forventet enabled source og at `active-not-catalog=0`. Et slikt utsagn krever egen `production-pilot-proof`/catalog-health-måling.

### Oslo Batch 04 — 85 -> 97

Batch 04 brukte 85-katalogen som dedupe-baseline og promoterte følgende 12 canonical restauranter:

1. Peppes Pizza Stortingsgata;
2. Peppes Pizza Oslo S;
3. Peppes Pizza Solli plass;
4. Peppes Pizza Ensjø;
5. Peppes Pizza Skøyen;
6. Peppes Pizza Tåsen;
7. Peppes Pizza Løren;
8. Peppes Pizza Nydalen;
9. Peppes Pizza Røa;
10. Peppes Pizza Lambertseter;
11. Peppes Pizza Hauketo;
12. Peppes Pizza Grorud.

Batch 04 bekreftet gjennomstrømningsmodellen uten å redusere kvalitetskravene:

- én research-seed kunne representere en dokumentert restaurantfamilie med lokasjonsspesifikke kilder;
- geokoding og canonical adressekontroll forble fail-closed mot Kartverket og publisert postnummer;
- en utgått Peppes-PDF og en utilstrekkelig statisk førstpartsside ble ikke tvunget gjennom parseren; produksjonen flyttet til aktuelle Wolt-restaurantflater som allerede er en støttet Fysen-kildefamilie;
- et mislykket browser-eksperiment ble fullstendig revertet før final proof; Batch 04 krevde ingen browser-runtime-endring;
- ingen minstekrav, assertions eller validatorbudsjett ble senket;
- teknisk grønn output ble kontrollert semantisk før promotion. Observerte navn var reelle Peppes-retter/tilbehør, ikke rolle-, layout-, navigasjons- eller drikkestøy;
- promotion-gaten ble kjørt på den faktiske catalog-headen, ikke bare på intake-artifactet;
- materializeren fikk arbeide serialisert etter merge, og production API ble brukt som konkret post-merge-bevis for alle tolv.

## Oslo Batch 03 — 65 -> 85

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

Endelig clean Batch-03-artifact hadde følgende observerte canonical item-dekning før promotion:

- Olivia: 53 / 53 / 58 / 53;
- Sumo: 71 per lokasjon;
- DIGG: 13 per lokasjon;
- Dinner: 45 Nationaltheatret / 43 Barcode;
- Delicatessen Aker Brygge: 58;
- Villa Paradiso Frogner: 49;
- Nodee Sky: 25;
- Hanami: 37.

Artifact-inspeksjon var en egen kvalitetsport, ikke pynt etter grønn CI. Før #487 ble blant annet vin/øl/sake-rader fra feil seksjonsproveniens, `– Head Chef`, `Barnemeny`, `Hanamis spesialiteter`, `6 Slices •`, donasjons-/serviceinnhold og `Orujos / Liquors` identifisert som ikke-canonical output. Dette ble løst generisk før promotion.

Batch 03 etablerte eller herdede følgende permanente kontrakter:

- `.github/workflows/restaurant-batch-intake.yml` er permanent writer/proof for batch research seeds. Den geokoder mot Kartverket, deduper mot canonical katalog, genererer fra live kilder, krever full generering og kjører strict validation med `maxAttempts=1`;
- parser-/runtime-PR-er kan deklarere `Batch-intake seed: apps/menu-worker/research/<batch>.seed.json` i PR-body og få ny exact-head batch-reproof uten seed-touch-commits eller disposable TEMP-/proof-PR-er;
- Kartverket-resolusjon er fail-closed på publisert postnummer;
- HTML scoped output revalideres mot fullside-seksjonsproveniens (`text-section-scope-v10`), slik at beverage-evidens ikke blir mat bare fordi en scoped overskrift forsvinner;
- layoutfragmenter, rolle-signaturer, rene seksjonstitler og konservativt identifiserbare trailing allergenkoder filtreres uten å strippe semantiske dash-kvalifikatorer;
- `public-menu-api-v3` filtrerer rekursivt drikke-, retail-, donasjons-/veldedighets- og liquor/liqueur/orujo-seksjoner. `Doner kebab` er eksplisitt positiv kontroll mot falsk donasjonsmatching;
- exact-head restaurantproof på den permanente promotion-PR-en er gaten for det som endres. Full live-katalog eies separat av catalog-health/reconcile.

## Historisk fullreconcile 2026-08-22

Siste eksplisitt arkiverte fullreconcile før 65-, 85- og 97-katalogene brukte production revision `2e57e1d324415f2a296b43b54c13e58cb23d4292`. Run `32600667247` / artifact `9483248543` viste:

- **56 canonical produksjonsmanifester**;
- **56/56 aktive canonical restauranter** i production DB;
- **56 aktive restaurant-rader totalt**;
- **56 enabled menu sources**;
- **0 inactive canonical**;
- **0 active-not-catalog**;
- nøyaktig én enabled canonical menu source per katalogrestaurant;
- fersk snapshot-/watcher-dekning for de promoterte kildene.

Dette er referansepunktet for hva ordet **fullreconcile** betyr. Senere baseliner skal ikke beskrives som fullreconcilet før en tilsvarende eksplisitt måling er fanget.

## Oslo Batch 01

PR #294 (`700d24cb3c1e96a8fb5db5f2aa5f2457132d24c5`) var første reelle høy-throughput-batch etter at batchlinjen ble etablert.

- 20 restauranter ble researchet samlet og 20/20 adresser geokodet med kildebevis;
- første intake genererte 13 kandidater, mens syv gikk direkte til source/parser-kø;
- teknisk grønne kandidater ble kontrollert for faktisk output-kvalitet;
- generisk non-dish-/beverage-herding fjernet allergenlabels, navigasjonsmetadata, seksjonstitler, tillegg og mengdefragmenter;
- Tatakii falt korrekt ut fordi kilden ikke hadde minst tre reelle prisede canonical retter;
- Castello ble holdt tilbake på parserlekkasje;
- sluttresultatet var **7 nye production-klare restauranter**: Dalat Café, Kebabish Original, Kinabolle Ensjø, Kinabolle Grønland, Oche Aker Brygge, Oche Torggata og Villa Paradiso Tivoli.

Batch 01 etablerte prinsippet som fortsatt gjelder: en batch kan promotere den rene delmengden mens vanskelige kilder forblir fail-closed.

## Oslo Batch 02 — cleanup og sluttføring

Batch 02 startet med 20 seed-restauranter og utviklet store deler av den generiske parser-/proof-infrastrukturen som senere batcher bygger videre på.

Viktige permanente milepæler:

- PR #365: generisk output-cleanup etter A/B-isolering, inkludert mat-/drikkescope, allergenkoder, duplicate/CTA-/mengdefragmenter og konservativ skjult-DOM-håndtering;
- autoritativ proof #393 / run `32596872644` / artifact `9481858862`, digest `sha256:fef15609a9b0f98e381fb1127501d4c497e90b83ce2b39f6315d49cc95eba436`, med 50/50 eksisterende catalog i primary serial pass og 5/5 fresh kandidater uten output-quality-feil;
- #395 promoterte fem byte-identiske kandidatmanifester og løftet daværende baseline til 55;
- New Delhi ble promotert via #408 etter `titles-v14` + `beverage-v9`, med 81-item proof og production search-bevis;
- historisk read-only #409 beviste **56 active / 56 enabled** og null drift på den daværende baselinen;
- PR #446 promoterte Delicatessen Grünerløkka og Majorstuen via offentlig Favrit API;
- PR #457 promoterte Der Peppern Gror Rådhusplassen via offentlig WeOrder;
- PR #460 promoterte Benares, Golden Chimp, Kverneriet Majorstua og Kverneriet Solli;
- PR #468 gjorde validatorbudsjettet eksplisitt og muliggjorde bokstavelig `maxAttempts=1` proof;
- PR #471 innførte bounded, persistért HTTP `maxResponseBytes`, slik at Sawan kunne bruke 3 MiB uten å heve standardgrensen globalt;
- Viet Kitchen- og Registan-drift ble reparert separat uten svekkede assertions;
- Mesob ble sluttbevist med 22 items og Sawan med 44 items;
- PR #475 promoterte Mesob og Sawan og løftet canonical katalog til **65**;
- PR #481 etablerte den permanente proof-modellen: exact-head livevalidering av restaurantene som faktisk endres, med full catalog-health separat.

**Batch-02 residual count er 0.** Senere feil på gamle restauranter er catalog-health/source-drift og skal behandles som egne driftsfeil, ikke som gjenåpnet batch.

## Rødlistelukking og source-drift

Tidligere produksjonsfeil viser hvordan fail-closed-regelen skal brukes:

- **Confusion:** sourceKey-/outputlekkasje ble lukket med generisk canonical dedupe og non-dish/beverage-herding;
- **Hrimnir:** redundant duplicate Oslo-manifest ble fjernet mens canonical manifest forble publisert;
- **La Mayor:** runtime-floor ble justert til faktisk observert kildebevis uten å fjerne rett-/prisassertions;
- **Café Sara:** gammel førstpartsmeny ga 404 og alternativer beviste ikke full canonical meny. Restauranten ble derfor fjernet fra aktiv katalog i stedet for å tvinges grønn;
- **Coyo:** transport-/bookingflak rapporteres i catalog-health og skal ikke blokkere en urelatert promotion. Deterministiske feil skal fortsatt stoppe health-gaten;
- **Kain / Tyrkisk / Confusion inactive drift:** ble reparert gjennom kontrollert re-onboarding/parserherding, ikke gjennom manuell DB-maskering.

Som ekstern størrelsesreferanse viste Mattilsynets Smilefjes-oversikt 1 345 spisesteder i Oslo ved kontroll 2026-08-20: <https://smilefjes.mattilsynet.no/kommune/oslo/>. Dette omfatter flere typer spisesteder og er ikke Fysens canonical backlog. Katalogbaseline på **97** betyr derfor ikke «97 av alle Oslo-restauranter er ferdige»; den beskriver det nåværende canonicale produksjonssettet som skal utvides batchvis.

## Produksjonslinjen

Restaurantarbeidet kjøres som batcher, mens hver restaurant fortsatt består eller feiler uavhengig:

1. research låser identitet, adresse, koordinater og canonical meny-/timer-/handlingskilder for en gruppe restauranter;
2. intake kjøres normalt i grupper på **20–30 restauranter**, men en mindre source-familiebatch er riktig når identitet og kilder tilsier det;
3. den **aktuelle canonical katalogen** brukes som dedupe-baseline før nye kandidater kan genereres;
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
14. candidate -> catalog skal være semantisk identisk med det beviste manifestet; formatering alene skal ikke endre produksjonskontrakten;
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

Web/API-deploy er en separat releaseflate. Restaurantmaterialisering og DB/watcher-proof skal ikke brukes som grunn til å bryte den låste Vercel-regelen på maksimalt tre endringskvalifiserte produksjonsbatcher per Europe/Oslo-døgn, uten faste klokkeslett.

## Prioritering mot Oslo-dekning

Dekning bygges i trinn, ikke ved å gjøre hele Oslo til én blokkende kø:

- hold den aktive produksjonsbaselinen grønn før hver ny batch;
- kjør nye research-/intake-batcher normalt på 20–30 restauranter, eller som dokumenterte source-familier når det gir høyere gjennomstrømning uten kvalitetsreduksjon;
- prioriter geografisk og kulinarisk bredde samt dokumentert brukeretterspørsel;
- bygg generiske adaptere når samme plattformfeil gjentas;
- promoter den grønne delmengden samlet i stedet for å vente på vanskelige kilder;
- mål både `canonical manifests`, `new promotion materialized`, `active canonical`, `enabled sources` og `active-not-catalog` med riktig bevisnivå;
- behold ubeviste restauranter fail-closed i source/parser-køen fremfor å senke kvalitetskravene.

Et planleggingsnivå på omtrent 200 strategisk valgte, production-green Oslo-restauranter kan brukes som dekningsmilepæl. Det er ikke en kvalitetsport og erstatter ikke etterspørsels-, kilde- eller ferskhetsmålingene i Oslo-piloten.
