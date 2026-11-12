# Matlyst – dekning av rettetypebilder

Kontroll 12. november 2026, basert på den redaksjonelle matkatalogen i `apps/web/content/food-knowledge/catalog.ts`.

- **84 redaksjonelle rettetyper** totalt.
- **26 rettetyper** med eksakt ID-koblet illustrasjon i Matlyst-kortene.
- **58 rettetyper** uten slik kobling.
- Det frittstående galleriet viser 36 illustrative motiv, hvorav flere ikke er entydige katalog-ID-er.
- **Dette er ikke 84 restaurantretter**: restaurantmenyer og varianter er egne data og får ikke automatisk slike KI-bilder.

## Motiver som mangler eksakt katalogkobling

### Asiatisk (2)

`bun-cha` · `vietnamese-spring-rolls`

### Indisk (10)

`tandoori` · `naan` · `dal-makhani` · `idli` · `sambar` · `vada` · `biryani` · `haleem` · `kebab-india` · `mirchi-ka-salan`

### Fast food (11)

`cheeseburger` · `smashburger` · `chicken-burger` · `veggie-burger` · `fried-chicken` · `chicken-wings` · `chicken-tenders` · `hot-chicken` · `hot-dog` · `chili-dog` · `corn-dog`

### Italiensk (8)

`amatriciana` · `saltimbocca` · `frittatina` · `sfogliatella` · `arancini` · `pasta-alla-norma` · `caponata` · `cannoli`

### Midtøsten (12)

`shawarma` · `hummus` · `manakish` · `fattoush` · `taameya` · `koshari` · `ful-medames` · `fattah` · `doner` · `pide` · `lahmacun` · `manti`

### Mexicansk (15)

`quesadilla` · `pozole` · `tlacoyo` · `birria` · `torta-ahogada` · `carne-en-su-jugo` · `pozole-rojo` · `cochinita-pibil` · `sopa-de-lima` · `panuchos` · `papadzules` · `fish-taco` · `shrimp-taco` · `ceviche` · `tostada`

## Regel for videre produksjon

1. Finn rettens kanoniske navn og typiske ingredienser i katalogen.
2. Lag naturtro illustrasjon på helsvart bakgrunn. Unngå tilbehør som endrer retten til en annen variant.
3. Godkjenn motivet og registrer én eksakt rett-ID; ikke gjett fra søkestreng eller enkeltord.
4. Oppdater bildet, atlasets rekkefølge, test, manifest og bildekilde samlet.
5. Ikke merk illustrasjoner som fotografier av den aktuelle restaurantens rett.

6. **Ingen godkjente bilder skal bli liggende upublisert.** Bildet, manifestet og synlig Matlyst-komponent må følge samme PR, og offentlig deploy skal bekreftes.
