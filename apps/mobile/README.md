# Fysen Native – iOS og Android

Dette er en **egen React Native-app**, ikke en WebView eller en innpakket nettside.
Nettsiden og mobilappen gjenbruker det samme Fysen-API-et og restaurantdatabasen.

## Kjøre lokalt

Krev Node 22.13+ og pnpm 11 (se rotprosjektet).
Fra roten:

1. corepack pnpm install --no-frozen-lockfile
2. corepack pnpm --filter @fysen/contracts build
3. corepack pnpm --filter @fysen/mobile start
4. Åpne utviklings-QR i Expo Go, eller en lokal iOS/Android-simulator med riktig Expo SDK.

Expo SDK 57 / React Native 0.86 brukes. Ved inkompatibilitet i Expo Go, bruk en utviklingsbuild.
Det kreves ikke betalt Apple-medlemskap for å utvikle appen, men installasjon av en selvsignert iOS-utviklingsbuild krever Xcode/macOS. TestFlight og App Store krever normalt Apple Developer Program.

## Mobilfunksjoner i første versjon

- Tre native faner: Søk, Matlyst, Favoritter.
- Søk via Fysens offentlige GET /v1/dishes/search (Oslo) med ferske menyopplysninger.
- Matlyst via ny, kompakt GET /v1/dishes/featured (8 nye retter og inntil 6 mest søkte).
- Favoritter lagres lokalt på den aktuelle mobilen (ingen konto eller synkronisering).
- Lenker til kilde, restaurantens bestilling, booking og veibeskrivelse; kun sikre HTTPS-adresser åpnes.
- Intet GPS-samtykke, ingen annonser eller skjulte betalinger.

**Viktig:** Uten nett vises feilmelding; appen viser ikke gamle menypriser som om de var nye. Favorittene er snarveier til nye søk, ikke et mellomlager med restaurant- eller menypriser.

## Før offentlig lansering

Fullfør native ikon/splash i Fysen-design, fysisk QA på iPhone/Android, tilgjengelighet, App Store/Play Store personvernmateriale, signert bygg og butikkutgivelse. App-ID-ene er foreløpige; bekreft eierskap før signering. Apple-avgift/Google Play-avgift er ikke betalt og blir ikke omgått av dette prosjektet.
