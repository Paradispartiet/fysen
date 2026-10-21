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

I Expo Go på en fysisk iPhone må Expo Go og Expo CLI være innlogget med samme gratis Expo-konto.
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

## Installasjonsbygg / gratis test

- Kildekode uten native installasjonsfil: Expo Go på telefon og 'pnpm --filter @fysen/mobile start' på utviklingsmaskinen.
- Android APK med gratis EAS-kvote: opprett gratis Expo-konto, logg inn med 'npx eas-cli login' og kjør fra 'apps/mobile': 'npx eas-cli build -p android --profile preview'. Dette bygger APK som kan installeres direkte, uten Google Play.
- iOS-simulator: 'npx eas-cli build -p ios --profile preview' (simulator-bygg, ikke IPA til fysisk iPhone).
- Fysisk iPhone: Expo Go for utvikling; signert distribusjon gjennom TestFlight/App Store krever normalt betalt Apple Developer Program.

Ved hver mobil-PR kontrollerer '.github/workflows/native-js-bundle.yml' at iOS- og Android-JavaScript faktisk kan pakkes. Det er **ikke** en signert app eller en fysisk funksjonstest.

## Gratis Android APK fra GitHub

En signert Android-testfil kan bygges uten Expo-konto og uten Google Play-avgift:

1. Åpne **Actions → Fysen Android installable test APK** i GitHub.
2. Velg **Run workflow** fra `main`, etter at PR-en med workflowen er merget.
3. Åpne vellykket kjøring og hent artefakten `fysen-android-qa-apk`.
4. Pakk ut `app-release.apk`, overfør til Android-telefon og godkjenn installasjon fra den valgte filbehandleren om nødvendig.

Første PR som legger til workflowen utløser én kontrollbygging. Deretter kjøres den **bare ved manuell bestilling**, for ikke å sløse med GitHub Actions.

Denne APK-en bygges i release-modus, har JS-koden innbakt og verifiseres med Android `apksigner`, men er signert med **utviklingsnøkkel**. Den er til intern kvalitetskontroll, ikke til Play Store eller offentlig distribusjon. Eksterne lenker, ferske søk og Matlyst krever fremdeles nett.

På iPhone kan man teste React Native-appen med en kompatibel Expo Go-versjon og en aktiv Metro-server. Gratis GitHub-bygging gir **ikke** en signert iOS-app for installasjon på andres iPhone; Apple krever normalt et betalt utviklermedlemskap for distribusjon.

## iPhone-simulator uten Apple-abonnement

GitHub Actions-jobben **Fysen iPhone simulator smoke** bruker en macOS 26-runner med Xcode.
Ved første PR-kontroll og senere manuelle kjøringer bygger den en `Release-iphonesimulator/Fysen.app` med JavaScript innebygd, uten Apple-signatur eller utviklerkonto. Deretter forsøker den å starte appen i en iPhone-simulator og lagrer et skjermbilde og ZIP i `fysen-iphone-simulator-qa`.

Når workflowen er på `main`: GitHub → Actions → **Fysen iPhone simulator smoke** → **Run workflow**. Nedlastingspakken er en simulator-app for macOS/Xcode, **ikke en IPA som kan installeres på en vanlig iPhone**.

For å teste på en fysisk iPhone uten betaling: bruk en kompatibel utgave av Expo Go og kjør Metro med `pnpm --filter @fysen/mobile start -- --tunnel` fra en utviklingsmaskin. Expo Go må støtte samme SDK; SDK 57 kan kreve Expo sin alternative distribusjon av Expo Go før Apple har godkjent oppdateringen. Det oppsettet gir utviklingstesting, ikke fri offentlig iOS-distribusjon. En egen iPhone-installasjonsfil for offentlig distribusjon krever normalt betalt Apple Developer Program.

GitHub Actions på et offentlig repo bruker GitHubs inkluderte standardressurser. Ikke aktiver større/betalte runners.

## Visuell identitet

Native iOS og Android bruker nå et faktisk 1024 × 1024 Fysen-appikon med den grønne bollen fra Fysens eksisterende merkevare. Rastersymbolet er lagret i `assets/icon.png`, og redigerbar vektorkilde finnes i `assets/icon-source.svg`. Appens splashbakgrunn er mørk, som resten av Fysen. Ikonet må kontrolleres visuelt på både iPhone-simulator og Android før butikkpublisering.

## Native lenker og utvidet iOS-test

Fysen har egne app-lenker som fungerer når appen er installert:

- `fysen://matlyst` åpner Matlyst.
- `fysen://favorites` åpner lokalt lagrede favoritter.
- `fysen://search?q=ramen` søker på nytt i ferske menyer.

Dette er et egendefinert appskjema, **ikke** verifiserte universal links fra nettsiden. Bare kjente ruter og søk på 2–80 tegn aksepteres.

Simulatorjobben kontrollerer oppstart samt navigasjon til Matlyst og et ramensøk, og lagrer tre skjermbilder til manuell kontroll. Skjermbildene er ikke en erstatning for testing av trykkflater og favorittlagring på en fysisk iPhone.

## Kompakt søk på små skjermer

Resultatkort viser pris før beskrivelse. Lange menytitler og beskrivelser beholdes i datakilden, men beskrivelsen vises i inntil tre linjer først; «Les mer» gir hele teksten. Søket beholder API-ets rekkefølge i hver gruppe og skiller fuzzy-/lignende treff fra ordinære treff, med tydelig beskjed om å kontrollere menyen. Det endrer ikke API-ets fasit, kategorisering eller data.
