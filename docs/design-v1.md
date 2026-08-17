# Fysen Design v1

## 1. Formål

Fysen skal være den raskeste og mest troverdige måten å svare på ett spørsmål:

**Hva har du lyst på – og hvor får du det?**

Produktet er **dish-first**. Brukeren søker etter en rett. Fysen finner konkrete forekomster av retten på ferske, sporbare restaurantmenyer.

Designet skal derfor aldri gli over i en generell restaurantguide.

Fysen er ikke:

- Tripadvisor
- Google Maps
- Wolt
- Foodora
- en restaurantblogg
- en AI-anbefalingschat

Fysen skal føles som en kombinasjon av:

**søkemotor + meny + presist oppslagsverk.**

## 2. Designprinsipper

### 2.1 Retten først

Visuelt hierarki:

1. rett
2. pris
3. restaurant
4. beskrivelse
5. sted
6. ferskhet
7. kilde

Restaurantnavnet skal aldri dominere over retten i et søkeresultat.

### 2.2 Store svar, små bevis

Fysen skal ikke bombardere brukeren med teknisk informasjon om snapshots, confidence eller matching.

Bevisene skal likevel alltid finnes.

Eksempel:

**Biff tartar**  
245 kr  
Rodeo

*Okse, kapers, dijon og eggeplomme*

**Sjekket i dag 21:03** · Se meny

### 2.3 Ingen påstander Fysen ikke kan bevise

Designet skal aldri tvinge frem funksjoner backend ikke har datagrunnlag for.

Ikke vis:

- «Åpent nå» uten åpningstidsdata
- avstand uten posisjonsgrunnlag
- vegetar/vegan uten verifisert klassifisering
- anmeldelser uten anmeldelsessystem
- «populær» uten reelle popularitetsdata
- bilder som ikke viser den faktiske retten eller restauranten

Døde eller falske kontroller skal ikke eksistere.

### 2.4 Rolig selvsikkerhet

Fysen skal ha få elementer på skjermen.

Unngå:

- store mengder kort
- unødvendige rammer
- gradienter
- store skygger
- badges overalt
- karuseller
- hero-fotografier
- onboardingforklaringer
- kampanjeflater

Whitespacet er en del av designet.

## 3. Visuell identitet

### 3.1 Ordmerke

Ordmerket er:

**fysen.**

Alltid lowercase.

Punktum beholdes.

Ingen symbol-logo i v1.

Ingen:

- tallerken
- gaffel
- kokkelue
- kartnål
- flamme

Ordmerket skal fungere alene.

#### Logo desktop

- størrelse: 34 px
- font-weight: 900
- tracking: `-0.065em`
- line-height: 1
- farge: Ink

#### Logo mobil

- størrelse: 27 px
- samme vekt og tracking

## 4. Farger

### Grunnpalett

| Token | Verdi | Bruk |
|---|---:|---|
| `--color-bg` | `#F4F0E8` | hovedbakgrunn |
| `--color-paper` | `#FCFAF5` | søk, sheets, enkelte flater |
| `--color-ink` | `#171713` | primær tekst |
| `--color-muted` | `#69675F` | sekundær tekst |
| `--color-soft` | `#89867C` | tertiær metadata |
| `--color-line` | `rgba(23,23,19,.14)` | skillelinjer |
| `--color-line-strong` | `rgba(23,23,19,.26)` | aktive skiller |

### Merkeaksent

`--color-accent: #C84A31`

Dyp tomat/paprika.

Brukes sparsomt til:

- fokusmarkering
- aktive kontroller
- små merkeelementer
- feilretting eller forslag der det passer

Den skal **ikke** dominere store flater.

### Semantisk ferskhet

`--color-fresh: #3F674E`

Brukes bare på en liten ferskhetsindikator når data faktisk er ferske.

Fargen alene skal aldri bære betydningen.

## 5. Typografi

### Font

Én hovedfamilie i v1:

**Inter Tight Variable**

Fallback:

```css
"Inter Tight", Inter, ui-sans-serif, system-ui, sans-serif
```

Én familie holder produktet konsistent og reduserer teknisk kompleksitet.

### Typografisk skala

#### Display XL

Forsideoverskrift.

Desktop:

- 104 px
- 850
- line-height: 0.88
- tracking: `-0.065em`

Tablet:

- 80 px

Mobil:

- 58 px
- line-height: 0.92

#### Display L

Søkeresultatets hovedrett / restaurantside.

- desktop: 64 px
- mobil: 44 px
- weight: 820
- line-height: 0.94
- tracking: `-0.05em`

#### Result title

Rettnavn i resultatliste.

- desktop: 32 px
- mobil: 27 px
- weight: 760
- line-height: 1.03
- tracking: `-0.035em`

#### Price

- desktop: 22 px
- mobil: 20 px
- weight: 760
- tabular numbers

#### Body L

- 20 px
- line-height: 1.45

#### Body

- 16 px
- line-height: 1.5

#### Metadata

- 14 px
- line-height: 1.35

#### Eyebrow

- 12–13 px
- weight: 720
- tracking: `0.05em`
- ikke automatisk uppercase overalt

## 6. Spacing

Grunnsystem:

```text
4
8
12
16
20
24
32
40
48
64
80
96
128
```

Ingen tilfeldige 27 px-, 37 px- eller 53 px-avstander.

## 7. Radius

Fysen skal ha mindre «bubble UI» enn dagens prototype.

```text
--radius-sm:      8px
--radius-md:     12px
--radius-lg:     16px
--radius-round: 999px
```

Resultatlister har **ingen kort-radius**.

Søkeinput kan bruke 16 px.

Filterchips bruker round.

## 8. Skygger

Skygger er unntaket.

Standardflate:

**ingen skygge**

Søkefelt ved fokus:

```css
box-shadow: 0 8px 28px rgba(23,23,19,.08);
```

Modal/sheet:

```css
box-shadow: 0 20px 60px rgba(23,23,19,.14);
```

## 9. Breakpoints

```text
Mobile:    0–639 px
Tablet:    640–1023 px
Desktop:   1024 px+
Wide:      1440 px+
```

Designet skal være mobil-først.

## 10. Globale bredder

### Side

Maksimal global bredde:

`1200 px`

### Søkeresultater

Maks:

`920 px`

### Tekstinnhold

Maks:

`680 px`

### Forsidehero

Maks:

`960 px`

## 11. Global header

### Forside desktop

Høyde:

`80 px`

Padding:

`32 px 40 px`

Layout:

```text
fysen.                                         Oslo
```

Så lenge Fysen bare støtter Oslo skal `Oslo` være tekst, **ikke en falsk dropdown**.

Når flere byer støttes blir den en ekte `LocationControl`.

### Forside mobil

Høyde:

`64 px`

Padding:

`20 px`

```text
fysen.                            Oslo
```

## 12. Forsiden `/`

### Mål

Brukeren skal forstå produktet og kunne søke innen få sekunder.

Ingen sekundær oppgave skal konkurrere med søket.

### Desktop-layout

```text
┌────────────────────────────────────────────────────────────┐
│ fysen.                                               Oslo │
│                                                            │
│                                                            │
│                                                            │
│ Hva har du                                                 │
│ lyst på?                                                   │
│                                                            │
│ ┌────────────────────────────────────────────────────────┐ │
│ │ Biff tartar, ramen, carbonara …          Finn retten │ │
│ └────────────────────────────────────────────────────────┘ │
│                                                            │
│ Søk i ferske, sporbare restaurantmenyer.                  │
│                                                            │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

Hero skal ligge omtrent rundt den optiske midten, men litt høyere enn matematisk sentrum.

### Desktopmål

Hero:

- width: min(960 px, tilgjengelig)
- horisontal padding: 40 px
- margin-top omtrent 11–15 vh etter header

H1:

- maks bredde omtrent 800 px

Søk:

- margin-top: 40 px
- max-width: 820 px
- height: 72 px
- background: Paper
- border: 1 px line
- radius: 16 px
- padding: 7 px

Input:

- min 0
- 20 px tekst
- padding 0 20 px
- ingen egen border

Knapp:

- høyde: 56 px
- min-width: 136 px
- radius: 12 px
- Ink background
- Paper text
- 16 px / 720

Proof:

- margin-top: 16 px
- 14 px muted

## 13. Forsiden mobil

```text
fysen.                         Oslo


Hva har du
lyst på?


┌─────────────────────────────┐
│ Ramen, pizza, biff tartar … │
│                             │
│        Finn retten          │
└─────────────────────────────┘

Søk i ferske restaurantmenyer.
```

Men søket skal fortsatt visuelt oppfattes som én komponent.

### Mål

Sidepadding:

`20 px`

Hero-top:

ca. `15vh`

Søkeinput:

- min 16 px skrift for å unngå iOS zoom
- knapp full bredde under feltet ved ≤420 px
- total radius 16 px

H1:

`58 px`

På svært smale skjermer:

`52 px`

## 14. Forsidetekst

Primær:

**Hva har du lyst på?**

Sekundær:

**Søk i ferske, sporbare restaurantmenyer.**

Placeholder:

**Biff tartar, ramen, carbonara …**

CTA:

**Finn retten**

Ikke bruk:

> Finn din neste matopplevelse.

Ikke bruk:

> Oppdag Oslos beste restauranter.

Det er feil produkt.

## 15. Søkeresultatsiden `/search`

Dette er Fysens viktigste produktflate.

## 16. Sticky søkeresultathode

### Desktop

Høyde:

`88 px`

Sticky:

`top: 0`

Bakgrunn:

Fysen Cream med 96–98 % opasitet og lett backdrop-blur.

Layout:

```text
fysen.      [ biff tartar                    Søk ]      Oslo
```

Maks bredde:

1200 px

Search max-width:

680 px

### Mobil

To rader:

```text
fysen.                              Oslo

[ biff tartar                       × ]
```

Header:

- sticky
- total høyde rundt 124 px
- logo-rad: 56 px
- søke-rad: 56 px
- gap: 8 px

Søkeknappen kan ligge integrert som ikon/kompakt knapp når feltet allerede inneholder et søk.

## 17. Resultatintro

Desktop:

```text
OSLO

Biff tartar

8 menytreff
```

Ikke sett selve søket i anførselstegn.

Hovedretten skal føles som en overskrift, ikke en teknisk query.

### Avstander

Fra sticky header:

`64 px`

Eyebrow → title:

`10 px`

Title → count:

`18 px`

Intro → første resultat:

`44 px`

## 18. Resultatlisten

Ingen store hvite kort.

Listen består av innhold + skillelinje.

```text
Biff tartar                                      245 kr
Rodeo

Okse · kapers · dijon · eggeplomme

Torggata 16, Oslo
● Sjekket i dag 21:03                       Se meny →

────────────────────────────────────────────────────────
```

## 19. Resultatrad desktop

Padding:

`30 px 0 32 px`

Grid:

```text
1fr auto
```

Topplinje:

- dish title venstre
- pris høyre
- gap minimum 32 px

Rettnavn:

32 px / 760

Pris:

22 px / 760

Restaurant:

- margin-top: 8 px
- 14 px
- 700
- Ink eller muted, ikke svak grå

Beskrivelse:

- margin-top: 14 px
- max-width: 680 px
- 16 px
- Ink 80 %

Metadata:

- margin-top: 22 px
- flex-wrap
- gap: 10 px 20 px

Bunnlinje:

- adresse
- ferskhet
- menu action

Skillelinje:

1 px line.

## 20. Resultatrad mobil

```text
Biff tartar                           245 kr
Rodeo

Okse · kapers · dijon · eggeplomme

Torggata 16
● Sjekket i dag

Se meny →
────────────────────────────────
```

Padding:

`24 px 0`

Rettnavn:

27 px

Pris:

20 px

Restaurant:

14 px

Beskrivelse:

15–16 px

Metadata brytes naturlig over to linjer.

Touchmål:

minimum 44 × 44 px.

## 21. Pris

Pris skal stå uten unødvendig visuell dekor.

Norsk visning:

**245 kr**

Ikke:

**NOK 245**

Ikke:

**kr 245,00**

Når pris mangler:

**Pris ikke oppgitt**

Dette skal være tydelig svakere enn en faktisk pris.

## 22. Ferskhet

Ferskhet skal være et særtrekk ved Fysen.

### Nivå 1

Nylig kontrollert:

**● Sjekket for 18 min siden**

### Nivå 2

Samme dag:

**● Sjekket i dag 21:03**

### Nivå 3

Dagen før:

**Sjekket i går 18:42**

### Nivå 4

Eldre:

**Sist kontrollert 13. august**

Det skal aldri manipuleres til å virke ferskere enn datagrunnlaget.

## 23. FreshnessStatus-komponent

Anatomi:

```text
[dot] [label]
```

Dot:

8 px

Label:

13–14 px

For ferske data kan dot bruke `--color-fresh`.

Eldre data bruker muted og ingen grønn indikator.

Ikke bruk gigantiske:

- VERIFIED
- LIVE
- FRESH

badges.

## 24. Menybelegg

Primær handling:

**Se meny**

Sekundær forklaring ved behov:

**Dette fant Fysen**

Når brukeren åpner belegg, skal et lite sheet/drawer kunne vise:

```text
Dette fant Fysen

Biff tartar
Rodeo · 245 kr

Sist kontrollert
I dag 21:03

Kilde
Restaurantens meny

Åpne originalmenyen ↗
```

På desktop kan dette være popover/dialog.

På mobil bottom sheet.

## 25. Matchkvalitet

Fysen skal ikke late som fuzzy-søk er et eksakt rettetreff.

### Primærgruppe

- exact
- trygg prefix/contains når rettidentiteten er åpenbar

### Separat gruppe

Ved fuzzy treff:

#### Nære treff

```text
Ingen sikre treff på «carbonara burger».

Nære treff

Carbonara
Carbonara pizza
...
```

UI-et skal ikke vise tekniske scores.

Ingen:

`Match 0.83`

## 26. Null treff

Null treff skal være rolig og presist.

```text
Ingen ferske treff på
«tonkotsu ramen»

Vi finner ikke retten på en fersk meny
i Oslo akkurat nå.
```

Hvis vi har et reelt alternativ:

**Prøv «ramen»**

Hvis ikke:

ingen oppdiktede forslag.

## 27. Søkevalidering

Ett tegn:

**Skriv minst to tegn for å søke.**

Tomt søk:

ingen feilmelding.

Vis vanlig søkeinngang.

## 28. Feiltilstand

Ved API-feil:

```text
Søket virker ikke akkurat nå.

Prøv igjen om litt.
```

Handling:

**Prøv igjen**

Ikke eksponer tekniske backenddetaljer.

## 29. Loading

Resultatsiden skal ha egen `loading.tsx`.

Ikke spinner midt på skjermen.

Bruk tekst-/linjeskeleton med samme layout som resultatene.

Eksempel:

```text
█████████████████                 █████
███████

████████████████████████
██████████████

──────────────────────────────────────
```

Animert svært subtilt.

Ved `prefers-reduced-motion`:

ingen puls.

## 30. Søkefelt

### Normal

Paper background  
1 px line  
Ink text

### Hover desktop

border blir line-strong.

### Focus

- 2 px accent outline
- offset 2 px
- mild shadow

### Error

Ikke rød flate.

Border + hjelpetekst.

## 31. Search autocomplete

Når vi faktisk har datagrunnlaget for forslag:

```text
ram
────────────────────────
Ramen
Ramen tonkotsu
Ramen shoyu
```

Forslag skal komme fra:

- canonical dishes
- faktiske aliases
- relevante indexerte rettnavn

Ikke genereres fritt av AI.

Autocomplete er en forbedring etter første visuelle redesign.

## 32. Filterbar

Designes nå, men vises bare når funksjonene finnes.

Desktop:

```text
[ Nærmest ] [ Pris ] [ Åpent nå ]
```

Mobil:

horisontalt scrollbar chip-felt.

Chip:

- height 40 px
- horizontal padding 15 px
- 14 px / 650
- 1 px border
- radius round

Aktiv:

Ink background / Cream text.

## 33. Filtre som ikke skal vises ennå

Ikke implementer UI før datagrunnlaget finnes for:

- Åpent nå
- avstand
- nærmest
- vegetar
- vegan
- glutenfri
- prisintervaller på aggregert nivå

Ingen disabled placeholder-knapper.

## 34. Liste / kart

Når kart kommer:

```text
Liste | Kart
```

Segmentert kontroll.

Default:

**Liste**

Kartet er sekundært.

Kartet skal svare:

> Hvor får jeg denne retten?

Ikke:

> Hvilke restauranter finnes i Oslo?

## 35. Kartmarkører

Når pris finnes:

```text
245
198
225
```

Pris kan være selve markøren.

Ved klikk:

```text
Biff tartar · 245 kr
Rodeo

Sjekket i dag
```

Klikk videre åpner resultatdetalj/restaurantside.

## 36. Restaurantsiden

Route:

`/restaurant/[slug]`

Målet er ikke å lage en restaurantportal.

Målet er:

**Hva vet Fysen faktisk om menyen her?**

## 37. Restaurant desktop

```text
fysen.                                      Oslo


RODEO

Torggata 16 · Oslo
Restaurantens nettside ↗


På menyen

Biff tartar                              245 kr
Okse · kapers · dijon · eggeplomme
─────────────────────────────────────────────

Ribeye                                   495 kr
...
─────────────────────────────────────────────


Menygrunnlag

Sist kontrollert i dag 21:03
Åpne originalmenyen ↗
```

Restaurantnavnet kan være stort her fordi restauranten nå faktisk er sideobjektet.

## 38. Restaurantside typografi

Restaurantnavn:

- desktop 64 px
- mobil 44 px
- 820

Adresse:

16 px muted

Seksjon:

24–28 px / 760

Retter:

samme grunnstil som søkeresultat, men noe mer kompakt.

## 39. Ingen restaurantfyllstoff

Ikke generer beskrivelser som:

> Trendy restaurant med moderne atmosfære.

Ikke vis:

- rating
- «best for»
- stemningsscore
- prisnivå basert på gjetning
- AI-oppsummeringer av anmeldelser

Hvis Fysen ikke vet det, står det ikke der.

## 40. Bilder

### v1

Designet skal fungere uten ett eneste bilde.

Forsiden:

ingen bildehero.

Søk:

ingen generiske matbilder.

Restaurant:

ingen stockfoto.

Dette er et bevisst designvalg.

Ekte dokumenterte bilder kan senere få en egen modell.

## 41. Motion

Motion skal gjøre systemet roligere, ikke mer spektakulært.

Standard:

`160–220 ms`

Easing:

```css
cubic-bezier(.2,.8,.2,1)
```

Bruk på:

- focus
- hover
- sheets
- filtervalg
- autocomplete

Ikke bruk:

- bounce
- flyvende kort
- store zooms
- scroll-jacking

## 42. Accessibility

Minimum:

- WCAG AA kontrast
- alle interaktive mål minst 44 × 44 px
- synlig keyboard focus
- korrekte labels
- `aria-live` for resultattall
- semantisk `<main>`, `<header>`, `<section>`, `<article>`
- `<button>` for handlinger
- `<a>` bare når handlingen faktisk navigerer
- redusert motion støttes
- input minst 16 px på mobil

Ikke bruk farge alene til status.

## 43. Responsivitet

### Mobile

20 px sidepadding.

### Tablet

32 px.

### Desktop

40–48 px.

### Wide

Content beholdes sentrert.

Fysen skal aldri spre resultattekst over hele en 1800 px-skjerm.

## 44. Design tokens

Foreslått struktur:

```css
:root {
  --color-bg: #f4f0e8;
  --color-paper: #fcfaf5;
  --color-ink: #171713;
  --color-muted: #69675f;
  --color-soft: #89867c;
  --color-line: rgba(23, 23, 19, 0.14);
  --color-line-strong: rgba(23, 23, 19, 0.26);
  --color-accent: #c84a31;
  --color-fresh: #3f674e;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  --space-32: 128px;

  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-round: 999px;

  --content-wide: 1200px;
  --content-results: 920px;
  --content-text: 680px;
}
```

## 45. Komponentstruktur

Første designsystem bør bestå av faktiske produktkomponenter, ikke et abstrakt UI-kit.

```text
components/
  FysenLogo
  GlobalHeader
  DishSearch
  SearchButton
  ResultIntro
  DishResult
  FreshnessStatus
  EvidenceLink
  EvidenceSheet
  EmptyState
  ErrorState
  LoadingResult
```

Senere:

```text
LocationControl
FilterChip
FilterBar
ListMapToggle
RestaurantMenu
Distance
OpenStatus
```

## 46. Filstruktur

Foreslått frontend:

```text
apps/web/
  app/
    globals.css
    layout.tsx
    page.tsx

    search/
      page.tsx
      loading.tsx

    restaurant/
      [slug]/
        page.tsx
        loading.tsx

  components/
    fysen-logo.tsx
    global-header.tsx
    dish-search.tsx
    dish-result.tsx
    freshness-status.tsx
    evidence-link.tsx
    evidence-sheet.tsx
    empty-state.tsx
    error-state.tsx

  styles/
    tokens.css
```

## 47. Metadata

Dagens:

> Fysen — finn retten

kan beholdes som basis.

Forsiden:

**Fysen — finn retten du har lyst på**

Description:

**Søk etter en rett og finn restauranter som har den på en fersk, sporbar meny.**

Ikke bruk «serverer den nå» før Fysen faktisk kan bevise sanntidstilgjengelighet.

## 48. Microcopy-regler

Språket skal være:

- kort
- konkret
- norsk
- lite reklamepreget
- uten AI-språk

Bra:

**Se meny**

**Sjekket i dag**

**Ingen ferske treff**

**Pris ikke oppgitt**

Dårlig:

**Utforsk spennende kulinariske alternativer**

**Oppdag dine nye favoritter**

**Vi har håndplukket disse resultatene for deg**

## 49. Ord vi bør bruke konsekvent

Bruk:

**rett**

**meny**

**treff**

**restaurant**

**sjekket**

**fersk**

**kilde**

Unngå unødvendige synonymer som gjør produktet mindre presist.

## 50. V1-sidekart

Første komplette produkt:

```text
/
  → dish search

/search
  → result intro
  → dish results
  → freshness
  → source evidence
  → empty state
  → error state

/restaurant/[slug]
  → restaurant facts
  → Fysen-observed menu
  → original menu source
```

Det er nok.

## 51. Funksjoner som eksplisitt ikke tilhører Design v1

Ikke bygg nå:

- konto
- innlogging
- favoritter
- reviews
- ratings
- sosial feed
- reservasjon
- bestilling
- betaling
- annonser
- sponsede treff
- AI-chat
- trending
- kategorikaruseller
- restaurantartikler
- personalisering

## 52. Implementeringsfase 1 — Fundament

Første kodeleveranse skal:

1. etablere tokens
2. laste Inter Tight
3. bygge FysenLogo
4. bygge global header
5. normalisere focus states
6. etablere responsive widths
7. redusere dagens store border-radius og skygger

Ingen produktlogikk endres.

## 53. Implementeringsfase 2 — Forsiden

Bygg forsiden ferdig etter spec:

- ny header
- ny hero
- ny typografi
- raffinert søk
- korrekt microcopy
- mobiltilpasning
- alle fokus-/keyboard states

Forsiden skal etter denne fasen være produksjonsverdig.

## 54. Implementeringsfase 3 — Search v1 redesign

Bygg:

- sticky result header
- kompakt søk
- result intro
- line-based DishResult
- pris
- restaurant
- description
- address
- FreshnessStatus
- EvidenceLink
- mobile layout
- desktop layout

Fjern dagens store resultCard-estetikk.

## 55. Implementeringsfase 4 — Tilstander

Bygg og test:

- tom query
- ett tegn
- null treff
- eksakte treff
- fuzzy treff
- manglende pris
- manglende description
- manglende website
- API-feil
- loading
- lange rettnavn
- lange restaurantnavn
- 20 resultater
- svært smal mobil

## 56. Implementeringsfase 5 — Restaurant

Først når vi har API-ruten som trengs.

Bygg:

`/restaurant/[slug]`

Ikke legg restaurantdetaljer inn som oppdiktede mockdata i produksjons-UI.

## 57. Implementeringsfase 6 — Geografi

Når datagrunnlaget er klart:

- faktisk location control
- brukerposisjon
- distance
- nearest sort
- map
- Liste | Kart

Dette skal være en utvidelse av dish-first-modellen, ikke en ny produktretning.

## 58. QA-matrise

Design v1 er ikke ferdig før minst disse viewportene er kontrollert:

```text
320 × 568
375 × 667
390 × 844
430 × 932
768 × 1024
1024 × 768
1280 × 800
1440 × 900
1728 × 1117
```

Særlig viktig:

- iPhone Safari
- Chrome mobil
- desktop Safari
- desktop Chrome

## 59. Visuell QA

Kontroller:

- ingen horisontal scroll
- logo flytter seg ikke mellom sider
- søk er lett å finne etter scrolling
- prisen kolliderer aldri med rettnavnet
- lange beskrivelser ødelegger ikke layout
- ferskhetsstatus er lesbar uten farge
- source action har minst 44 px touchområde
- ingen tekst får dårlig kontrast på Cream
- resultatskillet er synlig, men diskret
- sideskift føles som samme produkt

## 60. Produkt-QA

Et nytt design skal ikke gjøre Fysen mindre sannferdig.

Kontroller spesielt:

- «nå» brukes ikke der vi bare vet «sist observert»
- fuzzy treff ser ikke ut som sikre treff
- manglende pris blir ikke tolket som gratis
- restaurantens nettside er ikke det samme som menybelegg
- ferskhetsstatus bruker riktig timestamp
- source URL er fortsatt tilgjengelig
- UI-et introduserer ingen nye udokumenterte attributter

## 61. Sluttmål

Når Fysen Design v1 er ferdig skal en ny bruker kunne åpne siden og forstå produktet uten forklaring:

**Jeg skriver maten jeg vil ha.**

**Jeg får konkrete retter.**

**Jeg ser hva de koster.**

**Jeg ser hvor de finnes.**

**Jeg ser hvor fersk informasjonen er.**

**Jeg kan kontrollere kilden.**

Alt annet er sekundært.

Den visuelle regelen som skal styre hele produktet er:

# Store retter. Små bevis. Veldig lite støy.

Det er Fysen.
