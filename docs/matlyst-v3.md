# Matlyst v3

Matlyst v3 er Fysens oppdagelseslag for mat. Produktet har to parallelle innganger som begge ender i den samme ferske Oslo-indeksen:

1. **Hva frister?** → brukerintensjon → canonical rett → vanlige Fysen-treff.
2. **Matkulturer** → verdensdel → kulinarisk region → kjøkken → canonical rett → vanlige Fysen-treff.

Matlyst oppretter ingen egen restaurantdatabase, ingen parallell søkeindeks og ingen egne restauranttall.

## Hvorfor tre taksonominivåer

En enkelt kategori som `Asiatisk` er intuitiv som inngang, men for grov som kjøkkenkategori. V3 bruker derfor tre navigasjonsnivåer:

1. **Verdensdel / hovedregion** – Asia, Europa, Afrika, Amerika og Oseania.
2. **Kulinarisk/geokulturell region** – for eksempel Øst-Asia, Sør-Asia, Norden, Iberia eller Øst-Afrika.
3. **Kjøkken / mattradisjon** – for eksempel Japansk, Indisk, Norsk, Spansk eller Etiopisk.

Verdensdel og kulinarisk region er navigasjon. Det er kjøkkenet som kobles til canonical retter og live Oslo-dekning.

Det finnes ingen universell naturvitenskapelig fasit for verdens kjøkken. Fysen bruker derfor en eksplisitt hybridmodell:

- FNs M49-regioner brukes som geografisk kontroll og grunnstruktur.
- Kulinariske regioner får avvike fra ren statistisk geografi når det er nødvendig for en meningsfull matkulturell modell.
- Matforskning som analyserer regionale kjøkken og kulinariske «fingerprints» støtter at kjøkken bør forstås i geo-kulturelle klynger, ikke bare som kontinenter eller land.
- Norden behandles som en legitim kulinarisk region, samtidig som norsk, svensk, dansk, finsk og islandsk mat forblir egne kjøkken/tradisjoner.

Referanser:

- UN Statistics Division, M49 geographic regions: https://unstats.un.org/unsd/methodology/m49/
- Ahn et al., *Flavor network and the principles of food pairing*, Scientific Reports 1, 196 (2011), DOI 10.1038/srep00196.
- Caprioli et al., *The networks of ingredient combinations as culinary fingerprints of world cuisines*, npj Science of Food (2025), PMID 41266345.
- Nordic Council of Ministers, *The emergence of a new Nordic food culture* (2015).
- *Health and Nutritional Perspectives on Nordic Food Traditions—An Approach Through Food Culture and History* (2018), DOI 10.1016/B978-0-12-809416-7.00001-9.

## Verdensnivå

Følgende hovednoder finnes i taksonomien:

- **Asia**
- **Europa**
- **Afrika**
- **Amerika**
- **Oseania**

Forsiden viser bare verdensnoder som har minst ett aktivt, dokumentert kjøkken. Oseania er derfor definert i modellen, men skal ikke oppta forsideplass før Fysen har reell dekning der.

## Asia

- **Øst-Asia** → Japansk, Kinesisk, Koreansk
- **Sørøst-Asia** → Thai, Vietnamesisk, Filippinsk
- **Sør-Asia** → Indisk, Pakistansk, Nepalsk
- **Sentral-Asia** → Usbekisk
- **Vest-Asia** → Tyrkisk, Persisk, Levantinsk

Dette betyr at `Asia` kan være en enkel inngang på forsiden uten at Fysen later som «asiatisk» er ett kjøkken.

## Europa

Europa er eksplisitt modellert med regioner som kan vokse uten at vi må endre navigasjonsarkitekturen:

- **Norden** → Norsk, Svensk, Dansk, Finsk, Islandsk
- **Storbritannia & Irland** → Britisk, Irsk
- **Vest-Europa** → Fransk, Belgisk, Nederlandsk
- **Sentral-Europa** → Tysk, Østerriksk, Sveitsisk, Tsjekkisk
- **Iberia** → Spansk, Portugisisk
- **Sør-Europa** → Italiensk, Gresk
- **Øst-Europa** → Polsk, Ukrainsk, Rumensk

`Nordisk`, `britisk`, `fransk` og `spansk/portugisisk` er dermed ikke konkurrerende kategorier på samme nivå:

- Norden er nivå 2.
- Britisk og Fransk er nivå 3.
- Iberia er nivå 2, mens Spansk og Portugisisk er to separate nivå-3-kjøkken.

## Afrika

- **Nord-Afrika** → Egyptisk, senere blant annet Marokkansk og Tunisisk
- **Øst-Afrika** → Etiopisk, senere blant annet Eritreisk
- **Vest-Afrika** → blant annet Nigeriansk, Ghanesisk og Senegalesisk når dokumentert
- **Sørlige Afrika** → blant annet Sørafrikansk når dokumentert

## Amerika

- **Latin-Amerika** → Mexicansk, Brasiliansk; senere blant annet Peruansk, Argentinsk og Colombiansk
- **Karibia** → blant annet Jamaicansk og Kubansk når dokumentert
- **Nord-Amerika** → blant annet Amerikansk og Kanadisk når dokumentert

`Amerika` brukes som intuitiv toppnode. `Latin-Amerika` er en geo-kulturell region under denne, ikke et kontinent og ikke ett kjøkken.

## Oseania

Taksonomien er klar for:

- **Australia & New Zealand** → Australsk, Newzealandsk
- **Stillehavet** → blant annet Polynesisk

Disse er ikke aktive før produksjonsgrunnlaget finnes.

## Aktiv vs definert taksonomi

V3 skiller eksplisitt mellom to ting:

- **Definert taksonomi**: hvor et kjøkken faglig/navigasjonsmessig hører hjemme.
- **Aktivt kjøkken**: et kjøkken som Fysen faktisk kan underbygge med canonical retter og dokumentert Oslo-dekning.

Det gjør at brukeren kan se for eksempel:

`Europa → Norden → Norsk`

selv om Norsk foreløpig er merket som ikke aktivert. Fysen skal aldri late som en slik node har live dekning før source-gaten er oppfylt.

## Aktiv Matlyst-dekning ved v3

V3 har 19 aktive kjøkkenpresentasjoner:

- Japansk
- Kinesisk
- Koreansk
- Thai
- Vietnamesisk
- Filippinsk
- Indisk
- Pakistansk
- Nepalsk
- Usbekisk
- Tyrkisk
- Persisk
- Levantinsk
- Italiensk
- Polsk
- Egyptisk
- Etiopisk
- Mexicansk
- Brasiliansk

Tallet går fra 18 til 19 fordi den gamle presentasjonskategorien **Midtøsten** ikke lenger brukes som ett kjøkken. Eksisterende canonical data beholdes, men presenteres som:

- `Midtøsten / Levanten` → **Levantinsk** under Asia → Vest-Asia.
- `Midtøsten / Egypt` → **Egyptisk** under Afrika → Nord-Afrika.

Dette er en presentasjons- og taksonomiendring, ikke en duplisering av restaurant- eller rettsdata.

## Kjøkken med interne regionale nivåer

Tre-nivå verdensmodellen erstatter ikke kjøkkenets egne interne regioner. Etter at brukeren har valgt et kjøkken kan Fysen fortsatt vise mer detaljert proveniens, for eksempel:

- Italiensk → Roma / Napoli / Sicilia
- Indisk → Nord-India / Sør-India / Hyderabad
- Mexicansk → Sentral-Mexico / Jalisco / Yucatán / Baja

Dette er intern kjøkkenproveniens og er ikke et fjerde obligatorisk navigasjonsnivå på forsiden.

## Forsidekontrakt

Forsiden viser:

1. **Hva frister?** – dagens 11 lystinnganger.
2. **Matkulturer / Utforsk verden** – aktive verdensdeler som store kort.
3. **Alle kjøkken** – direkte, filtrerbar power-user-katalog over bare aktive kjøkken.

Verdenskort viser kun konservative live-signaler hentet fra `DishBrowseResponse`. Rekkefølgen på verdensdelene er stabil og geografisk; live dekning brukes som bevis inne i kortet, ikke til å stokke verdensdelene.

## Alle kjøkken

`Alle kjøkken` er fortsatt en snarvei for brukere som vet hva de leter etter. Katalogen kan filtreres på:

- verdensdel,
- kulinarisk region,
- kjøkken,
- interne kjøkkenregioner,
- canonical rett og alias.

Eksempler: `Asia`, `Iberia`, `japansk`, `ramen`, `momo`, `pierogi`.

Bare aktive kjøkken vises i denne katalogen. Planlagte taksonominoder vises gjennom verdensdel → region-flyten og er tydelig merket som ikke aktivert.

## Source-gate

Et kjøkken blir ikke aktivt fordi navnet finnes i taksonomien. Aktivering krever fortsatt:

1. canonical retter som kan beskrive kjøkkenet forsvarlig,
2. faktisk produksjonsmeny/dekning i Oslo,
3. konservative aliases som matcher menyidentiteter,
4. samme live browse-/search-infrastruktur som resten av Fysen.

Restaurantnavn alene er ikke bevis. Derfor er for eksempel Gresk fortsatt definert under Europa → Sør-Europa, men ikke aktivert bare fordi en restaurant heter Parthenon.

## Datagrense

Matlyst v3 bruker fortsatt:

1. restaurantkatalogen,
2. materialisert menydata,
3. `foodDishCatalog`,
4. `foodDiscoveryCatalog`,
5. `matlystDiscoveryCatalog`,
6. den samme ferske browse-indeksen som «Alle retter».

Den nye taksonomien inneholder kun navigasjonsrelasjoner og status for aktive/inaktive kjøkken. Den kopierer ingen restaurantdata.
