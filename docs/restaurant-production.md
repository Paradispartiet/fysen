# Restaurant production

Dette dokumentet beskriver den permanente produksjonsmetoden for restaurantdekning. `apps/menu-worker/catalog/`, production DB og materializer-/watcher-resultatene er sannhetskilden. Tallene nedenfor er en datert kontrollmåling, ikke en parallell katalog eller en fast lanseringskvote.

## Verifisert Oslo-status 2026-08-20

Siste eksakte production-reconcile etter parsermerge `d60bf00a9a8b9f785af8f4698fc8c6e5b9a0030a` og etterfølgende legacy-opprydding viser:

- **45 canonical produksjonsmanifester** i `apps/menu-worker/catalog/`;
- **45/45 aktive canonical restauranter** i production DB;
- **45 aktive restaurant-rader totalt**;
- **45 enabled menu sources**;
- **0 inactive canonical** restauranter;
- **0 active-not-catalog** restaurant-rader.

Dette er den operative restaurantproduksjonsbaselinen. Den tidligere aktive legacy-raden `rodeo-oslo` hadde ikke canonical katalogmanifest og ble derfor satt `active=false`; dens ene menu source, hours source og action ble samtidig quiescet. Raden beholdes for referanseintegritet, men inngår ikke i aktiv produksjonsdekning.

Confusion by Mr. Fish, Kain Neo-Filipino Bistro og Tyrkisk Kjøkken er eksplisitt kontrollert etter den siste parser-/transportoppryddingen:

- Confusion: `active=true`, source enabled, HTTP 200, `consecutive_failures=0`, siste watcher `unchanged`;
- Kain: `active=true`, source enabled, HTTP 200, `consecutive_failures=0`, siste watcher `unchanged`;
- Tyrkisk Kjøkken: `active=true`, source enabled, siste HTTP 304, `consecutive_failures=0`, siste watcher `not_modified`.

Production-status må skilles fra rå DB-historikk: en deaktivert legacy-rad kan fortsatt eksistere, men teller ikke som aktiv restaurant. Den canonicale integritetsmålingen er derfor alltid `catalog slug -> active restaurant -> enabled menu source -> frisk watcher`, pluss eksplisitt kontroll av at ingen aktiv restaurant ligger utenfor katalogen.

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

### Rødlistelukkingen før og etter batch 01

Følgende tidligere produksjonsfeil er lukket:

- **Confusion sourceKey-duplikater:** generisk canonical source-key-dedup ble merget i PR #279. Senere output-lekkasje ble lukket generisk i PR #300 med `non-dish-v8` + `beverage-v7` og fail-closed forbidden assertions.
- **Hrimnir:** redundant duplicate Oslo-manifest ble fjernet i PR #283; det eksisterende canonicale Hrimnir-manifestet forble publisert.
- **La Mayor:** den kildebeviste runtime-flooren ble justert fra 17 til 16 observerte items, mens alle eksplisitte rett-/prisassertions ble beholdt.
- **Café Sara:** ble ikke tvunget grønn. Den gamle førstpartsmenyen ga HTTP 404, og alternativene beviste ikke en komplett maskinlesbar canonical meny. Restauranten ble derfor fjernet fra aktiv katalog fail-closed i PR #287 og skal først komme tilbake når en fullverdig kilde kan bevises.
- **Coyo:** to `NETWORK_ERROR`-watcher ble isolert som transportfeil; samme canonical PDF besto live runtime med HTTP 200 og 73 items og fikk deretter frisk production-watch.
- **Kain / Tyrkisk / Confusion inactive drift:** source-gatene var grønne, men tidligere transportfeil hadde etterlatt dem inactive. Kain ble re-onboardet kontrollert; Confusion/Tyrkisk ble lukket gjennom permanent parserherding og etterfølgende materializer/watcher. Slutt-reconcile viser 45/45 aktive canonical restauranter.

Som ekstern størrelsesreferanse viste Mattilsynets Smilefjes-oversikt 1 345 spisesteder i Oslo ved kontroll 2026-08-20: <https://smilefjes.mattilsynet.no/kommune/oslo/>. Dette omfatter flere typer spisesteder og er ikke Fysens canonical backlog. Baseline på 45 betyr derfor ikke «45 av alle Oslo-restauranter er ferdige»; den beskriver det nåværende verifiserte produksjonssettet.

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
14. reconcile krever at alle katalog-slugs er aktive, at canonical sources er enabled, og at ingen aktiv restaurant ligger utenfor katalogen uten en eksplisitt begrunnelse.

En batch kan dermed publisere de enkle restaurantene selv om krevende kilder må videre til adapter-/parserkøen. Ingen batchkommando senker assertions, hopper over live source-gaten eller aktiverer filer i `candidates/`.

## Output-quality-porten

Batch 01 viste at en kilde kan være teknisk `accepted=true` og likevel ha semantisk dårlig output. Produksjonsporten skal derfor skille mellom:

- **source/runtime green:** nettverk, extraction, minimum, assertions, hours og action består;
- **output clean:** de observerte canonicale navnene er faktisk retter og ikke UI-/metadata-/drikkestøy;
- **production active:** samme manifest er materialisert, restaurant/source er aktivert og watcher-status er frisk.

Hvis en output-feil gjelder et mønster som kan forekomme hos flere restauranter, skal den fikses én gang i parser/runtime. Eksempler fra batcharbeidet er `top of page`, allergen-only labels, `Spør oss`, seksjonstitler, `stk`/`biter`-fragmenter og tydelige cocktail-/drikkebeskrivelser.

Positive regresjoner er like viktige som negative: filtre for ord som `gin`, `rum`, `bourbon`, `orange` eller `vegan` må samtidig bevise at reelle rettnavn ikke filtreres bort.

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
3. at forventet menu source er enabled;
4. at watcher har fingerprint og `consecutive_failures=0`;
5. at siste watcher-outcome er akseptert (`changed`, `unchanged` eller `not_modified`);
6. at det ikke finnes active-not-catalog drift;
7. at legacy-rader uten katalogdekning er eksplisitt quiescet dersom de ikke lenger er canonical.

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
