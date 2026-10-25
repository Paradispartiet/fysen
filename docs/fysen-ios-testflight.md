# Fysen Native – iPhone/iPad via TestFlight

**Mål:** En faktisk installerbar iOS-app på iPhone/iPad, ikke en simulator-ZIP, Android-APK eller en WebView.

**Status 25.10.2026:** Native iOS-kompilering, oppstart, lenkenavigasjon og iPad-simulator er verifisert i eksisterende CI. Apples distribusjonssignering, Expo-prosjekttilknytning og TestFlight-tilgang er **ikke bekreftet**. En offentlig installasjonslenke finnes derfor ikke før Apple har mottatt og behandlet en signert IPA.

## 1. Det som allerede er klart

- Expo/React Native: `apps/mobile/`.
- iOS bundle-ID: `no.fysen.app` (må tilhøre riktig Apple-utviklerteam før første signering).
- Fysen-appikon, mørk splash, deep links, live Oslo-søk, Matlyst og lokale favoritter.
- Støtte for iPad og rotasjon; iPhone/iPad Release-simulatorer testes av `.github/workflows/native-ios-simulator.yml`.
- EAS-profil `testflight` i `apps/mobile/eas.json` bygger for fysisk iPhone/iPad: `distribution: store` og `ios.simulator: false`. Dette er **ikke** den eldre `preview`-profilen (simulator-only).

## 2. Engangsoppsett hos Apple og Expo (må gjøres av kontoeier)

1. Ha et aktivt **Apple Developer Program**-medlemskap og en **Expo-konto**. TestFlight krever Apple-utviklertilgang.
2. Bekreft i Apple Developer at den ønskede app-ID-en `no.fysen.app` er tilgjengelig og eid av riktig team. Registrer Fysen i [App Store Connect](https://appstoreconnect.apple.com/) og noter den **numeriske Apple-app-ID-en** (`ascAppId`). Hvis bundle-ID-en ikke er tilgjengelig, må appkonfigurasjonen endres før signering; ikke overta en annens app.
3. I et lokalt terminalmiljø med prosjektet sjekket ut: kjør `cd apps/mobile`, `npx eas-cli@latest login`, deretter `npx eas-cli@latest init`. Dette knytter Fysen til én Expo EAS-prosjekt-ID. Noter UUID-en fra `extra.eas.projectId` i `app.json` / Expo-dashbordet. **Ikke opprett nye EAS-prosjekter for hver utgivelse.**
4. Konfigurer første gangs iOS-signering med `npx eas-cli@latest credentials -p ios`. Velg **testflight** / distribusjon og riktig Apple-team. Expo kan lagre sertifikat og provisioning-profil sikkert hos EAS. Ikke legg .p12, .mobileprovision, Apple-passord eller privatnøkler i GitHub.
5. Sett opp en **App Store Connect API-nøkkel for EAS Submit** under riktig Apple-team, via EAS CLI. En ikke-interaktiv CI-opplasting kan ikke opprette nøkkelen første gang.
6. Opprett en Expo *access token* i Expo-kontoen og legg det som **GitHub repository Actions secret**: `EXPO_TOKEN`. Det må tilhøre en Expo-bruker med tilgang til dette EAS-prosjektet.
7. Under **GitHub → Settings → Secrets and variables → Actions → Variables** sett `EAS_PROJECT_ID` (Expo UUID) og `APP_STORE_CONNECT_APP_ID` (numerisk Apple-app-ID). Dette er bare prosjekt-ID-er, ikke passord. Hold App Store Connect API-nøkkel og Apple-sertifikater hos EAS.
8. Verifiser at appens rettigheter, Fysen-navn, ikon, ansvarlig utgiver, personvern og eventuell eksport-/krypteringsdeklarasjon stemmer før innsending.

## 3. Bygg uten å bruke en Mac lokalt

Når kontoeier har gjennomført engangsoppsettet:

1. Åpne [Fysen – GitHub Actions](https://github.com/Paradispartiet/fysen/actions/workflows/native-ios-testflight.yml).
2. Velg **Run workflow**, branch `main`, delivery `testflight`. Jobben sjekker tilgangen og sender et **signert iOS-bygg av eksakt main-commit** til EAS Build.
3. EAS `--auto-submit` skal deretter levere det **samme bygget** til App Store Connect/TestFlight. GitHub-jobben avsluttes når byggingen er **bestilt**, ikke når Apple har godkjent eller behandlet appen.
4. Kontroller reell fullføring i [Expo EAS Builds](https://expo.dev/accounts) og [App Store Connect → TestFlight](https://appstoreconnect.apple.com/). Legg testeren til i en intern testgruppe (eller opprett ekstern test med Apples eventuelle gjennomgang).
5. På iPhone/iPad: installer Apples **TestFlight**-app, åpne invitasjonen, trykk **Installer**. Ingen Android-APK eller utviklersertifikater skal installeres manuelt.

Hvis kontoeier ønsker et **signert IPA-bygg uten automatisk innsending**, velges delivery `build-only`. Et slikt IPA er fortsatt for App Store Connect, ikke en fritt nedlastbar iPhone-app.

## 4. Publiseringsporter

- [x] React Native-prosjekt med native iOS-skjerm og Fysen API
- [x] iPhone- og iPad-simulatoroppstart og API-/navigasjonskontroller
- [x] Konfigurert `testflight`-profil og **manuell** CI-jobb med hemmelighetskontroll
- [ ] Aktiv Apple Developer-konto og bekreftet eierskap til bundle-ID
- [ ] Expo EAS-prosjekt og iOS-distribusjonssertifikat/provisioning-profil
- [ ] App Store Connect-app-ID og API-nøkkel koblet til EAS
- [ ] Vellykket **signert** iOS-bygg med eksakt kildebevis
- [ ] Vellykket Apple-behandlet TestFlight-opplasting og testgruppeinvitasjon
- [ ] Fysisk iPhone/iPad-testing: søk, Matlyst, favoritter, rotasjon, tilgjengelighet og nettfeil
- [ ] Personvern- og butikkmateriell for eventuell offentlig App Store-utgivelse

**Avgrensning:** Apple Developer-medlemskap, betalingsopplysninger, App Store Connect-tilgang og Apple-signering kan ikke erstattes av gratis GitHub Actions eller en usignert `.app` fra simulatoren. Det finnes ingen generell offentlig IPA-lenke som lovlig omgår Apples signering og installasjonssystem.

**Kilder:** [Expo: iOS production builds](https://docs.expo.dev/tutorial/eas/ios-production-build/), [Expo: Submit iOS](https://docs.expo.dev/submit/ios/), [Expo: TestFlight](https://docs.expo.dev/submit/testflight/).
