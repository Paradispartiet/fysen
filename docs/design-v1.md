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
- store skygger
- badges overalt
- karuseller
- hero-fotografier
- onboardingforklaringer
- kampanjeflater

Luft og mørke flater er en del av designet.

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
- font-weight: 870
- tracking: `-0.045em`
- line-height: 1
- farge: varm krem

#### Logo mobil

- størrelse: 27 px
- samme vekt og tracking

## 4. Farger

Fysen er mørk som standard. Det finnes ingen lys standardflate eller tema-toggle i v1.

### Grunnpalett

| Token | Verdi | Bruk |
|---|---:|---|
| `--color-bg` | `#0F0F0C` | hovedbakgrunn |
| `--color-paper` | `#181814` | søk og mørke flater |
| `--color-ink` | `#EEE8DC` | primær tekst |
| `--color-muted` | `#AAA397` | sekundær tekst |
| `--color-soft` | `#7F796F` | tertiær metadata |
| `--color-line` | `rgba(238,232,220,.12)` | skillelinjer |
| `--color-line-strong` | `rgba(238,232,220,.22)` | aktive skiller |
| `--color-action` | `#DED5C7` | viktigste handling |
| `--color-action-ink` | `#171510` | tekst på handling |

### Merkeaksent

`--color-accent: #D47A55`

Dempet paprika.

Brukes sparsomt til:

- fokusmarkering
- aktive kontroller
- små merkeelementer
- diskrete statusmarkører

Den skal **ikke** dominere store flater.

### Semantisk ferskhet

`--color-fresh: #78A985`

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

### Hero

Overskriften skal være stor uten å være sammenklemt.

- to eksplisitte linjer: «Hva har du» / «lyst på?»
- desktop: opptil 96 px
- mobil: opptil 62 px
- font-weight rundt 810
- line-height rundt `0.97` desktop og `0.99` mobil
- tracking rundt `-0.042em` desktop og `-0.035em` mobil

### Result title

- desktop: 32 px
- mobil: 27 px
- weight: 770
- line-height: ca. 1.08
- tracking: ca. `-0.025em`

### Price

- desktop: 22 px
- mobil: 20 px
- weight: 760
- tabular numbers

### Body

- 16 px
- line-height: 1.5

### Metadata

- 13–14 px
- line-height: 1.35

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

Ingen tilfeldige avstander.

## 7. Radius

```text
--radius-sm:      8px
--radius-md:     12px
--radius-lg:     18px
--radius-round: 999px
```

Resultatlister har ingen kort-radius.

Søkeinput kan bruke 18 px.

## 8. Skygger

Skygger er unntaket og skal være subtile. Søk kan få en svak mørk dybdeskygge, men Fysen skal ikke få kort-estetikk.

## 9. Forsiden `/`

Forsiden består av:

- `fysen.` øverst til venstre
- `Oslo` øverst til høyre så lenge Oslo er eneste støttede by
- hero: «Hva har du» / «lyst på?»
- ett stort søk
- én bevistekst: «Søk i ferske, sporbare restaurantmenyer.»

Ingen sekundær oppgave skal konkurrere med søket.

Heroen skal ligge høyt nok til å føles komponert, ikke sentrert i en stor tom flate. På større skjermer brukes omtrent `8vh` vertikal hero-padding før overskriften. På mobil omtrent `9vh`, innenfor begrensede min-/maksverdier.

## 10. Søkeresultater

Søkeresultatet er Fysens viktigste produktflate.

Hierarki:

**rett → pris → restaurant → beskrivelse → sted → ferskhet → kilde**

Resultatene vises som en typografisk liste med skillelinjer, ikke store kort.

Fuzzy treff skal aldri fremstilles som sikre treff. Usikre treff skilles ut under «Nære treff».

## 11. Ferskhet og belegg

Ferskhet skal presenteres menneskelig:

- «Sjekket for 18 min siden»
- «Sjekket i dag 21:03»
- «Sjekket i går 18:42»
- eldre dato når nødvendig

Kildehandling:

**Se meny**

Fysen skal aldri manipulere gammel informasjon til å se ferskere ut.

## 12. Bilder

Designet skal fungere uten bilder.

Ingen stockbilder eller generiske bilder av retter brukes som om de dokumenterer den konkrete retten.

## 13. Accessibility

Minimum:

- WCAG AA kontrast
- interaktive mål minst 44 × 44 px
- synlig keyboard focus
- korrekte labels
- `aria-live` for resultater
- semantiske HTML-elementer
- `prefers-reduced-motion` støttes
- input minst 16 px på mobil

Farge alene skal ikke kommunisere status.

## 14. Komponentstruktur

```text
FysenLogo
GlobalHeader
DishSearch
ResultIntro
DishResult
FreshnessStatus
EvidenceLink
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

## 15. Funksjoner som ikke tilhører Design v1

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

## 16. QA

Kontroller minst:

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
- iPad/Safari
- Chrome mobil
- desktop Safari
- desktop Chrome

Visuell QA skal kontrollere at overskriften ikke oppleves sammenklemt, at store lyse flater unngås, at kremknappen ikke blir blendende, og at søket fortsatt er den tydeligste handlingen.

## 17. Sluttmål

Når Fysen Design v1 er ferdig skal en ny bruker kunne åpne siden og forstå produktet uten forklaring:

**Jeg skriver maten jeg vil ha.**

**Jeg får konkrete retter.**

**Jeg ser hva de koster.**

**Jeg ser hvor de finnes.**

**Jeg ser hvor fersk informasjonen er.**

**Jeg kan kontrollere kilden.**

Den visuelle regelen som skal styre hele produktet er:

# Store retter. Små bevis. Veldig lite støy.
