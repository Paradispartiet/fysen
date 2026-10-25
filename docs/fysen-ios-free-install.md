# Fysen på iPhone og iPad – gratis

Fysen er tilgjengelig som webapp uten App Store, TestFlight, Apple Developer Program eller kostnad.

## Installer på iPhone/iPad

1. Åpne Fysens nettadresse **https://fysen.vercel.app/** i **Safari** på iPhone eller iPad. Dersom adressen viser Vercel-innlogging eller en feil, er nettsiden ikke offentlig tilgjengelig; dette må rettes på vertssiden først.
2. Trykk på **Del** i Safari (på noen iOS-versjoner: sidemenyen → Del).
3. Velg **Legg til på Hjem-skjermen**.
4. Behold **Åpne som webapp** aktivert og trykk **Legg til**.
5. Åpne Fysen-ikonet på Hjem-skjermen. Den bruker nettsidens søk og oppdaterte menyer med nettilgang.

Dette gir egen app-åpning og et Fysen-ikon, men teknisk er det en **nettapp**, ikke React Native-utgaven eller en signert Apple IPA. Ingen betaling eller Apple-testsertifikat er nødvendig.

## Hva er forskjellen fra iOS Native?

- **Gratis nå:** Fysen-nettappen på Hjem-skjermen. Krever internett til ferske menydata.
- **Også gratis med egen Mac:** Xcode + Apple Personal Team kan installere en personlig testbuild på din iPhone. Apples utviklingsprofiler utløper etter 7 dager og appen må reprovisjoneres; dette er **ikke** TestFlight og ikke et realistisk distribusjonsalternativ for andre.
- **TestFlight/App Store senere:** EAS-profil og workflow finnes i prosjektet, men signering/distribusjon for andre krever Apple Developer Program og riktig konto/sertifikater.

Apples instruksjon: https://support.apple.com/guide/iphone/open-as-web-app-iphea86e5236/ios

Apple Personal Team: https://developer.apple.com/help/account/basics/about-your-developer-account

WebKit iOS 26: https://webkit.org/blog/17333/webkit-features-in-safari-26-0/
