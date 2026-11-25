# Nordisk ekspansjon – fase 1

Mål: samme rett-først-søk i Oslo, København, Stockholm og Helsinki. Ingen fiktive treff.

Fase 1 er navigasjon og et byregister med lokal valuta. Den eksisterende Oslo-dekningen beholdes. De nye byene skal ikke markedsføres som dekket før reelle menyer er verifisert. Denne PR-en er et utkast.

## Før produksjon

- Opprett byspesifikke restaurantkataloger og kilder med korrekt land, fysisk adresse, lokale åpningstider, tidssone og valuta (DKK, SEK, EUR).
- Gjør arkivformat, prisparser, API, søk og visning by- og valutasikre; dagens offentlige arkiv er Oslo-spesifikt. Ikke tolk utenlandske priser som NOK.
- Bruk nyeste verifiserte meny per restaurant. Vis dato for menyobservasjon; ikke skjul eldre tilgjengelige menyer bare på grunn av alder. Ikke bland utdaterte priser inn i nyere menyer.
- Bevar alle relevante restauranttreff; bruk paginering eller last flere fremfor å skjule dem.
- Støtt lokale rettnavn, norske aliaser og København/Copenhagen/Kobenhavn, Stockholm, Helsinki/Helsingfors.
- Bygg restaurantdekning batchvis med offisielle menykilder; mål faktisk dekning separat for hver by.
- Verifiser søk, tomtilstander, mobil/desktop, prisformat, byisolasjon og Oslo-regresjon før publisering. Native iOS-klient må også kontrolleres.
