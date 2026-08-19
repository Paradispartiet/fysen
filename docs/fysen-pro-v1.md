# Fysen Pro v1

Fysen Pro v1 er Revenue R4: et grant-skopet restaurantdashboard over målt etterspørsel, resultatytelse og kildehelse. Det bygger på den verifiserte virksomhetstilknytningen fra Claim Restaurant v1 og endrer ikke Fysens organiske søk eller kildebevis.

## Tilgangsmodell for piloten

Repoet har foreløpig ingen generell konto-/auth-plattform. R4 introduserer derfor ikke en ny ekstern auth-leverandør bare for piloten og åpner heller ikke et usikret dashboard basert på restaurant-slug.

Tilgangen er:

```text
verified restaurant claim
  -> active restaurant_access_grant
      -> reviewer-issued one-time setup token
          -> HttpOnly Fysen Pro session
              -> dashboard for exactly one restaurant
```

### Setup token

Setup-token utstedes bare gjennom den interne databasefunksjonen `issueRestaurantProSetupToken()` av en privilegert reviewer/operator.

- tokenen har 256 bits tilfeldig entropi;
- bare SHA-256-hash lagres i databasen;
- standard levetid er 24 timer;
- den kan brukes én gang;
- ny setup-token revokerer tidligere ubrukte tokens for samme access grant;
- utstedelse og redemption journalføres;
- det finnes ingen offentlig HTTP-route som kan utstede setup-token.

Den rå setup-tokenen skal leveres out-of-band til den verifiserte restaurantrepresentanten. Den skal ikke skrives til GitHub Actions-logg, artifact, commit eller databasefelt i klartekst.

### Pro session

En gyldig setup-token kan redeemed én gang til en syvdagers Pro-session.

- bare session-hashen lagres i databasen;
- web-laget mottar tokenen server-to-server og legger den i en `HttpOnly`, `SameSite=Lax` cookie;
- klient-JavaScript får aldri session-tokenen i JSON-responsen;
- hver dashboard-request krever både aktiv, uutløpt session og fortsatt aktivt `restaurant_access_grant`;
- dersom R3-access-granten revokeres, blir en ellers gyldig Pro-session ugyldig umiddelbart;
- logout revokerer server-sessionen og sletter lokal cookie fail-closed.

Dette er en kontrollert pilotmodell. Selvbetjent login, teammedlemmer, recovery og eventuell ekstern identity-provider vurderes senere dersom behovet er bevist.

## Offentlig Pro-API

Under API-ets globale `/v1`-prefix finnes bare:

- `POST /pro/sessions` — redeem en eksisterende setup-token;
- `GET /pro/dashboard` — krever `Authorization: Bearer <session>`;
- `DELETE /pro/sessions/current` — revoker gjeldende session.

Det finnes med hensikt ingen offentlig route for:

- å utstede setup-token;
- å verifisere claims;
- å opprette access grants;
- å bytte restaurant på en eksisterende session.

## Dashboard v1

Dashboardet viser en fast 30-dagersperiode for restauranten som sessionens access grant eier.

### Resultatytelse

- result impressions;
- registrerte handlinger;
- engasjert CTR;
- handlinger fordelt på meny, restaurant, veibeskrivelse, booking og bestilling.

`engasjert CTR` er:

```text
distinct impressions med minst én registrert handling
------------------------------------------------------
                    impressions
```

Dermed kan flere klikk fra samme impression aldri gjøre CTR høyere enn 100 %.

### Toppretter

Inntil ti retter sorteres etter impressions, deretter handlinger. Tallene kommer fra Fysens egne impression-/conversion-events og skal ikke presenteres som restaurantens totale salg eller totale trafikk.

### Menyhelse

Per canonical menykilde vises:

- source URL;
- enabled-status;
- siste kontroll;
- ferskhetsgrense;
- antall sammenhengende feil;
- siste watcher-outcome.

Ferskhetsgrensen bruker samme kontrakt som søket: `max(check_interval * 3, 1440 minutter)`.

### Booking og bestilling

Dashboardet viser verifikasjonsstatus for canonical `restaurant_actions`:

- booking;
- order;
- verified-at;
- expires-at;
- om handlingen akkurat nå er publishable.

### Demand Loop

Pro kan vise inntil fem uløste trusted Demand Loop-signaler for restaurantens by. Dette er **markedssignaler for byen**, ikke påstander om at akkurat denne restauranten mangler retten.

Personverngrensen er strengere enn den interne Demand Loop-rapporten:

- bare `demand_source = explicit_search` inngår i Demand Loop;
- signalet må fortsatt være uløst mot dagens ferske indeks;
- Pro-API-et viser aldri rå query dersom den har færre enn **3 signalsøk siste 7 dager**;
- lavvolumssøk forblir interne og deles ikke med restauranten.

## Data- og tillitsgrense

Fysen Pro kan ikke gjennom sessionen:

- omskrive historiske menu snapshots;
- endre menu source-bevis;
- endre watcher-/parserhistorikk;
- endre organisk ranking;
- kjøpe seg inn i organic results;
- gjøre en utløpt booking-/order-destinasjon publishable;
- lese claimant-PII fra andre claims;
- lese en annen restaurants dashboard.

R4 er derfor et innsiktslag over eksisterende canonical data, ikke en alternativ sannhetskilde.

## Audit

`restaurant_pro_access_audit_log` journalfører:

- `setup_token_issued`;
- `setup_token_redeemed`;
- `session_created`;
- `session_revoked`.

Rå tokens inngår aldri i auditmetadata.

## Testkontrakt

Databaseintegrasjonen skal bevise at:

1. setup-token bare lagres som 64-tegns hash;
2. setup-token er one-time;
3. Pro-session bare lagres som hash;
4. en gyldig session bare kan lese restauranten i sitt access grant;
5. 30-dagers impressions, handlinger, topprett, menu health og actions materialiseres riktig;
6. logout revokerer sessionen;
7. revokert R3-access grant invaliderer en ellers aktiv Pro-session.

API-testene skal i tillegg bevise at:

1. Bearer-format valideres strengt;
2. den offentlige controlleren ikke har issue/invite/grant/review-operasjoner;
3. demand-gap med færre enn tre signalsøk filtreres før offentlig Pro-respons.

## Produksjon

Kode på `main` er ikke det samme som offentlig produksjon. R4 følger Fysens eksisterende eksplisitte database- og Vercel-releaseporter. Ingen ekstra Vercel-deploy skal tvinges bare for R4 dersom det bryter den etablerte batch-/kvotemodellen.
