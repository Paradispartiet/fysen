# Restaurant production

Dette dokumentet beskriver den permanente produksjonsmetoden for restaurantdekning. `apps/menu-worker/catalog/`, production DB og materializer-/watcher-resultatene er fortsatt sannhetskilden. Tallene nedenfor er en datert kontrollmåling, ikke en parallell katalog.

## Verifisert Oslo-status 2026-08-20

Siste eksakte materializer på `ef1693ff5315fda7327553791655a88d8142a212` leste 40 produksjonsmanifester:

- 1 ny publisering;
- 29 allerede publiserte;
- 30 production-green totalt;
- 10 feilede manifester.

Den operative rødlisten fra samme kjøring var Aura, Café Sara, Confusion, Eat Thai Steen & Strøm, Haandtryk, Habibi, Il Colosseo, Lahori Dera, Rolis Bodega og Roll Sushi Majorstua. En materializer kan avslutte med status 1 selv om bare enkelte manifester feiler; resultatlisten, ikke bare jobbstatusen, avgjør hvilke restauranter som er grønne.

Som ekstern størrelsesreferanse viste Mattilsynets Smilefjes-oversikt 1 345 spisesteder i Oslo ved kontroll 2026-08-20: <https://smilefjes.mattilsynet.no/kommune/oslo/>. Dette omfatter flere typer spisesteder og er ikke Fysens canonical backlog. Målingen betyr at 40-manifestgruppen bare er den nåværende produksjonsgruppen, ikke «alle restauranter i Oslo».

## Produksjonslinjen

Restaurantarbeidet kjøres som batcher, mens hver restaurant fortsatt består eller feiler uavhengig:

1. research låser identitet, adresse, koordinater og canonical meny-/timer-/handlingskilder;
2. `intake:batch` henter flere menyer med avgrenset parallellitet og genererer candidate-manifester fra faktisk observerte retter;
3. generatoren setter `minimumExpectedItems` til hele det observerte canonicale item-antallet og velger spredte, prisede retter som permanente assertions;
4. `validate:candidates:batch` kjører full runtime-port parallelt, beholder stabil resultatorden og lar ugyldige eller utilgjengelige kandidater feile uten å stoppe resten;
5. feil grupperes som `manifest`, `transport`, `extraction`, `menu_assertions`, `hours`, `action` eller `unknown`;
6. parser-, transport- og scope-feil løses generisk med regresjonstester før berørte kandidater kjøres på nytt;
7. bare grønne kandidater promoteres byte-for-byte til `catalog/`;
8. full CI, fersk `main`, merge og eksakt post-merge production materializer må følges av watcher-/søke-bevis.

En batch kan dermed publisere de enkle restaurantene selv om krevende kilder må videre til adapter-/parserkøen. Ingen batchkommando senker assertions, hopper over live source-gaten eller aktiverer filer i `candidates/`.

## Kommandoer

En intake-plan kan inneholde opptil 100 restauranter. Standard parallellitet er fire og maksimum er åtte:

```bash
pnpm --filter @fysen/menu-worker build
pnpm --filter @fysen/menu-worker intake:batch -- intake/oslo-batch-01.json
pnpm --filter @fysen/menu-worker validate:candidates:batch
```

Generatoren nekter å overskrive eksisterende kandidatfiler. En restaurant må ha minst tre unike, prisede retter i live-kilden før et automatisk manifest kan genereres. `from`- og flerpris-semantikk kopieres inn i assertionene og forblir fail-closed.

## Prioritering mot Oslo-dekning

Dekning bygges i trinn, ikke ved å gjøre alle 1 345 steder til én blokkende kø:

- lukk aktiv produksjonsrødliste etter feilfamilie;
- kjør nye research-/intake-batcher på 20–30 restauranter;
- prioriter geografisk og kulinarisk bredde samt dokumentert brukeretterspørsel;
- bygg generiske adaptere når samme plattformfeil gjentas;
- mål antall production-green etter hver post-merge materializer.

Et planleggingsnivå på omtrent 200 strategisk valgte, production-green Oslo-restauranter kan brukes som dekningsmilepæl. Det er ikke en kvalitetsport og erstatter ikke etterspørsels-, kilde- eller ferskhetsmålingene i Oslo-piloten.
