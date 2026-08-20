# Fysen Pro pilotoperator

Dette dokumentet beskriver den privilegerte operatørflyten som kobler Claim Restaurant R3 til Fysen Pro R4 i piloten. Den erstatter ikke sikkerhetskontraktene i `claim-restaurant-v1.md` eller `fysen-pro-v1.md`.

## Sikkerhetsgrense

Operatørflyten er lokal og privilegert. Den skal ikke kjøres i GitHub Actions, Vercel-builds eller andre delte CI-/artifact-miljøer.

- Claim-listen inneholder claimant-PII og skal behandles som intern review-informasjon.
- Verifikasjon krever fortsatt en uavhengig, troverdig kanal. Restaurantdomene i e-post er ikke automatisk bevis.
- `verify` oppretter bare det eksisterende `restaurant_access_grant` gjennom canonical review-logikk.
- Setup-token utstedes i et separat eksplisitt steg etter verifisering.
- Rå setup-token vises én gang lokalt og skal leveres out-of-band.
- Rå setup-/session-token skal aldri legges i database, GitHub-logg, workflow artifact, commit, issue eller PR-kommentar.
- Det finnes fortsatt ingen offentlig HTTP-route for claim review, access grant eller setup-token-utstedelse.

Begge privilegerte CLI-ene nekter å kjøre når `GITHUB_ACTIONS=true`.

## Forutsetninger

Kjør fra en betrodd lokal checkout med produksjonsdatabasetilgang konfigurert etter eksisterende databasekontrakt. Bygg databasepakken før operatørkommandoene brukes:

```bash
pnpm --filter @fysen/database build
```

## 1. Se pending claims

```bash
pnpm --filter @fysen/database claim:operator -- list
```

Valgfri grense, 1–100:

```bash
pnpm --filter @fysen/database claim:operator -- list 50
```

Listen viser restaurant, claimant, rolle og innsendt evidens. Ikke kopier output til delte logger eller artifacts.

## 2. Gjør ekstern verifikasjon

Reviewer kontrollerer virksomhetstilknytningen utenfor Fysen gjennom en uavhengig, troverdig kanal. Reviewnotatet skal kort dokumentere hva som faktisk ble kontrollert.

Ingen CLI-kommando skal brukes som erstatning for denne vurderingen.

## 3. Verifiser eller avvis claim

Verifiser:

```bash
pnpm --filter @fysen/database claim:operator -- verify <claimId> <reviewer> "<reviewnotat>"
```

Avvis:

```bash
pnpm --filter @fysen/database claim:operator -- reject <claimId> <reviewer> "<reviewnotat>"
```

Ved verifisering returneres `accessGrantId`. Kommandoen utsteder ikke setup-token og kan derfor ikke lekke Pro-hemmeligheten som en sideeffekt av review.

## 4. Utsted én setup-token eksplisitt

Bare etter verifisert claim og aktivt access grant:

```bash
pnpm --filter @fysen/database pro:issue-setup -- <accessGrantId> <reviewer>
```

Denne kommandoen viser den rå setup-tokenen én gang. Bare SHA-256-hashen lagres i databasen. Lever tokenen direkte til den verifiserte restaurantrepresentanten gjennom en egnet out-of-band-kanal.

## 5. Restaurantrepresentanten logger inn

Representanten bruker setup-tokenen på Fysen Pro-login. Web-laget redeemer tokenen server-to-server og setter Pro-sessionen i en `HttpOnly`, `SameSite=Lax` cookie. Klient-JavaScript skal aldri motta session-tokenen.

Etter login skal dashboardet være skopet til restauranten i det aktive access grantet. Logout revokerer server-sessionen. Senere revokering av access grant skal også invalidere en ellers aktiv Pro-session umiddelbart.

## Pilotbevis før R5

Denne operatørflyten gjør R3 → R4 praktisk kjørbar, men åpner ikke R5. Før pris, partnerbetaling eller sponsing kan startes skal production proof fortsatt vise at de offentlige R1–R4-flatene er stabile, og minst én kontrollert pilot skal bevise:

```text
verified claim
  -> active grant
      -> one-time setup token
          -> HttpOnly Pro session
              -> authenticated dashboard
                  -> logout/revocation
```

Bevisføringen skal kontrollere token-/PII-grensene uten å lagre de rå hemmelighetene i logger eller artifacts.
