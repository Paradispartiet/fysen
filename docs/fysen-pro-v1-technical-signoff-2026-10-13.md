# Fysen Pro v1 — teknisk godkjenning 13. oktober 2026

**Beslutning: TEKNISK LEVERANSEKLAR innenfor pilotmodellens tekniske kontrakt. IKKE PARTNERVERIFISERT.**

Fysen Pro v1 kan ferdigstilles og vedlikeholdes teknisk uten restaurantrepresentant. Ingen ekte restauranttilgang er tildelt som del av denne godkjenningen. Den separate forbrukerleveransen er allerede [produksjonsgodkjent](./fysen-consumer-oslo-v1-signoff-2026-10-13.md).

## Hva som faktisk er godkjent

| Område | Bevis | Resultat |
|---|---|---|
| Claim Restaurant | [Database-CI #36514385344](https://github.com/Paradispartiet/fysen/actions/runs/36514385344), `restaurant-claims.integration.test.ts` | **2/2 bestått**: forespørsel, deduplisering, skjermede personopplysninger, godkjenning/access grants og sperrede eierfelt uten grant |
| Pro-token, sesjon og dashboard | Samme database-CI, `fysen-pro.integration.test.ts` | **2/2 bestått**: 256-bit engangskode, hash-only lagring, én gangs innløsning, sesjonshash, restaurantbundet dashboard, aggregerte tall, logout og grant-revokering |
| API-kontrakter | Samme CI, `fysen-pro.controller.test.ts`, `fysen-pro.service.test.ts` og `restaurant-claims.controller.test.ts` | **7/7 bestått**: krav til Authorization/Bearer, avgrenset offentlig controller og filtrering av lavvolums Demand Loop-signaler |
| Pro-kontroll av cookies/bevisformat | `fysen-pro-pilot-proof.test.ts` (ordinær databasepakke-test) | Kontroller for `HttpOnly`, `Secure`, `SameSite=Lax`, restaurant-skoping, lavvolumsvern og at rå tokens aldri returneres i public acknowledgment |
| Produksjonens R3/R4-skjemagrense | [Revenue-proof i release #38377180722](https://github.com/Paradispartiet/fysen/actions/runs/38377180722) | **Verified**, `mutatingProductionRequests=false`, nødvendige tabeller finnes, tokenlagring hash-only, `failures=[]` |
| Offentlig Claim og Pro | Samme revenue-proof | Offentlig Claim-context er PII-fri; Claim-siden og Pro-login rendres; `GET /v1/pro/dashboard` returnerer `401` uten session; `/pro` sender uautentisert bruker til `/pro/login` |
| Kode / release | [Forbruker-signoff](./fysen-consumer-oslo-v1-signoff-2026-10-13.md) og [release #38377180722](https://github.com/Paradispartiet/fysen/actions/runs/38377180722) | Pro web-/API-kode er deployet. Nyere dokumentasjons- og menyendringer er ikke et krav om omdeploy av uendret appkode |

Databaseintegrasjonstestene bruker **syntetiske restauranter, krav og test-eiere i en isolert PostgreSQL-instans**, ikke ekte restaurantrepresentanter i produksjonsdatabasen.

## Godkjenningens grenser

Denne beslutningen er en teknisk leveransegodkjenning av den **eksisterende Pro v1-pilotløsningen**, ikke dokumentasjon på at en restaurant faktisk er innlogget:

- En autentisert, ekte Pro-session via den offentlige webklienten og en komplett klikkbasert produksjonspilot er **ikke kjørt**. Browser-/web-laget er verifisert uautentisert i produksjon; den autentiserte sesjons- og dashboardkjeden er verifisert i databaseintegrasjon og testassertions.
- Før første faktiske restaurantbruk kreves uavhengig kontroll av representantens virksomhetstilknytning og en kontrollert `pro:pilot-proof` via [operatørprosedyren](./fysen-pro-pilot-operator.md).
- En syntetisk test kan aldri erstatte virksomhetsverifisering, og det opprettes ingen fiktive claims, grants eller produksjonsbrukere bare for å få grønn status.
- Selvbetjent kontogjenoppretting, restaurantteam, betaling, sponsing og Pro v2 er **utenfor Pro v1**. Teknisk godkjenning åpner ikke R5.

## Driftsmodell frem til første restaurant

- Oppretthold Claim/Pro som eksisterende, sikrede endepunkter. Offentlig claim kan bare opprette en `pending` forespørsel; publikum kan ikke godkjenne en claim eller utstede setup-tokens.
- Ved første legitime forespørsel brukes ordinær manuell review. Først en verifisert access grant kan motta en separat utstedt engangskode.
- Hold Pro-partnerpilot som egen status **AVVENTER PARTNER**. Dette er ingen blokkering for [Fysen forbruker Oslo v1](./fysen-consumer-oslo-v1-signoff-2026-10-13.md) eller forbruker-v2.
- Dersom Pro-runtimen endres, kjøres relevante isolerte integrasjonstester, kvalitetsporter og en ny ikke-muterende live-proof. Denne godkjenningen gir ikke fritak fra regresjonskontroll.

**Oppsummert:** Implementasjonen er teknisk leveranseklar etter den avtalte pilotkontrakten, mens reell partnerakseptanse, autentisert produksjonsbruk og kommersiell utrulling gjenstår som egne milepæler.
