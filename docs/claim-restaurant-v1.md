# Claim Restaurant v1

Claim Restaurant er Revenue R3 i Fysen. Formålet er å etablere verifiserbar virksomhetstilknytning og et tydelig eierskapsskille før Fysen Pro bygges.

## Produktgrense

En offentlig claim kan bare opprette en `pending` forespørsel. Ingen offentlig HTTP-rute kan verifisere en claim, gi tilgang eller skrive restauranteide canonical felt.

Verifikasjon skjer som en intern review-operasjon. Først etter verifikasjon opprettes et aktivt `restaurant_access_grant`.

Claiming gir aldri rett til å:

- endre historiske menu snapshots;
- endre menu source-bevis;
- omskrive parser-/watcherhistorikk;
- kjøpe eller overstyre organisk rangering;
- markere en uverifisert meny eller handling som verifisert.

## Datamodell

### `restaurant_claims`

Lagrer selve forespørselen:

- restaurant;
- navn og jobb-e-post;
- rolle: `owner`, `manager` eller `authorized_agent`;
- verifikasjonslenke og/eller forklaring;
- status: `pending`, `verified`, `rejected` eller `withdrawn`;
- reviewtid og reviewnotat.

E-post normaliseres til lowercase. Samme restaurant + e-post kan bare ha én samtidig pending claim. Retries returnerer den eksisterende forespørselen i stedet for å lage duplikater.

### `restaurant_access_grants`

Opprettes bare etter intern verifikasjon. Et grant binder en verifisert principal til én restaurant og én claim. Grants kan revokeres fail-closed.

### `restaurant_owned_profiles`

Restauranteide felt lagres separat fra Fysens kildebaserte restaurant- og menydata. Første felt er:

- display name;
- offentlig kontakt-e-post;
- offentlig telefon;
- website URL;
- kort presentasjonstekst.

R3 etablerer lagrings- og tilgangsgrensen. Disse feltene skal ikke automatisk overstyre canonical søkedata før en senere, eksplisitt publiseringskontrakt er etablert.

### `restaurant_claim_audit_log`

Journalfører:

- claim submitted;
- verified/rejected;
- access granted/revoked;
- owner fields updated.

Auditmetadata inneholder hendelsesinformasjon, ikke kopier av alle feltverdier.

## Offentlig API

- `GET /v1/restaurants/:slug/claim` returnerer restaurant + offentlig claim-state: `unclaimed`, `under_review` eller `claimed`. Ingen claimant-PII returneres.
- `POST /v1/restaurants/:slug/claims` validerer og oppretter bare en pending claim.

Det finnes med hensikt ingen offentlig verify/review/grant-rute.

## Web

Søkeresultater viser en diskret `Driver du <restaurant>?`-inngang. Denne er ikke en consumer funnel-event.

Claim-siden:

- viser hvilken canonical restaurant forespørselen gjelder;
- krever navn, jobb-e-post og rolle;
- krever en HTTPS-verifikasjonslenke eller en forklaring som kan kontrolleres;
- forklarer at forespørselen behandles manuelt;
- forklarer at claiming ikke endrer historiske kildebevis eller organisk rangering.

## Verifikasjon

Før en claim settes til `verified` skal reviewer kunne dokumentere virksomhetstilknytningen via en uavhengig, troverdig kanal. En e-postadresse på restaurantens domene er ikke alene et automatisk eierskapsbevis.

R3 automatiserer derfor ikke verifikasjon. Det er et bevisst sikkerhetsvalg.

## Testkontrakt

Databaseintegrasjonen skal bevise at:

1. offentlig claim-context er PII-fri;
2. duplicate pending claims for samme restaurant/e-post er idempotente;
3. uverifisert principal ikke kan skrive owner fields;
4. verifisert grant kan skrive bare de separate owner fields;
5. canonical restaurantnavn, website, snapshot-hash og menu item forblir uendret;
6. audit-loggen inneholder claim/access/profile-hendelser;
7. revokert grant mister skriverett umiddelbart.

## Neste lag

R4 — Fysen Pro dashboard — skal bygges rundt de verifiserte access grants. Innlogging, teammedlemmer, innsiktsvisning og selvbetjent profilredigering hører hjemme der, ikke i Claim Restaurant v1.
