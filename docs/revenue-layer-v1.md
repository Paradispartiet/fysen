# Fysen Revenue Layer v1

## Formål

Fysen skal ikke være avhengig av at forbrukeren betaler for å søke etter mat. Det gratis dish-first-søket er distribusjonsmotoren. Revenue Layer v1 gjør brukerens høye kjøpsintensjon målbar og gjør restauranten til den naturlige betalende kunden.

## Forretningsmodell

Revenue Layer v1 bygges i fire lag.

### 1. Gratis forbrukersøk

Brukeren kan uten konto:

- søke etter en konkret rett;
- finne dokumenterte ferske menytreff;
- se pris, restaurant, ferskhet og etter hvert avstand/åpent nå;
- gå videre til restaurant, meny, veibeskrivelse, booking eller bestilling.

Det gratis søket skal maksimere relevans og tillit, ikke kortsiktig annonseinntekt.

### 2. Fysen Pro for restauranter

Restauranter skal senere kunne claime en eksisterende Fysen-profil og få en betalt drifts-/innsiktstjeneste med blant annet:

- verifisert restaurantprofil;
- kontroll over canonical kontakt-, booking- og ordrelenker;
- meny- og kildehelse;
- hvilke retter som skaper impressions og klikk;
- hvilke relevante søk som ikke gir restauranten treff;
- trafikk og konverteringshandlinger Fysen har sendt;
- senere pris-/markedssignaler på aggregert nivå.

Pris skal markedstestes. Ingen pris er hardkodet som produktkontrakt i v1.

### 3. Betaling for målbar konvertering

Når Fysen kan attribuere en brukerhandling til et konkret søkeresultat, åpnes grunnlaget for senere:

- booking-lead;
- ordre-lead;
- partnerprovisjon;
- CPC/CPA-lignende avtaler med klare definisjoner.

Revenue Layer v1 skal først **måle** denne trakten. Fakturering bygges ikke før målingen er pålitelig.

### 4. Sponset rett

En restaurant kan senere kjøpe tydelig merket plassering på et relevant rettsøk bare når:

- restauranten faktisk har retten på en fersk, akseptert meny;
- sponsorplasseringen er visuelt merket;
- organisk rangering fortsatt beregnes uavhengig;
- sponsing aldri kan gjøre en irrelevant eller uverifisert rett til et treff.

## Ufravikelige prinsipper

1. **Organisk relevans er ikke til salgs.**
2. **Ingen annonse uten ferskt rettsbevis.**
3. **Attribusjon må være målbar før vi priser den.**
4. **Dataminimering først.** Første funnelversjon trenger ikke IP, user-agent, konto eller permanent brukerprofil.
5. **Restaurantinnsikt skal bygge på aggregert etterspørsel og dokumenterte resultater.**
6. **Claiming gir redigeringsrett til virksomhetsdata, ikke rett til å omskrive historiske kildebevis.**

## Revenue funnel v1

Første canonical trakt er:

```text
search
  -> result impression
      -> menu click
      -> restaurant click
      -> directions click
      -> booking click   (når URL finnes)
      -> order click     (når URL finnes)
```

### Search event

Lagrer kun det vi trenger for etterspørselsanalyse:

- normalisert rettsøk;
- by;
- antall publiserte resultater;
- tidspunkt.

Nulltreff er `result_count = 0`, ikke en egen personlig profilhendelse.

### Result impression

Hvert returnerte søkeresultat får en impression-ID som binder sammen:

- search event;
- restaurant;
- menu item;
- rangering;
- match type og score.

Dette gir en etterprøvbar denominator for CTR og restaurantinnsikt.

### Conversion event

Et klikk peker på en konkret impression-ID og en eksplisitt handlingstype. Første typer:

- `menu_clicked`;
- `restaurant_clicked`;
- `directions_clicked`;
- `booking_clicked`;
- `order_clicked`.

Klienthendelser har en tilfeldig `client_event_id` slik at retry/sendBeacon ikke dobbeltteller samme handling.

## Privacy v1

Første funnelversjon skal ikke lagre:

- IP-adresse;
- user-agent;
- e-post;
- telefonnummer;
- innlogget brukeridentitet;
- presis brukerposisjon;
- permanent cross-site-identifikator.

Målet er å forstå **etterspørsel og resultatytelse**, ikke å bygge en reklameprofil på enkeltpersoner.

## Leveransefaser

### R1 — Funnel foundation

- database for search events, impressions og conversion events;
- søke-API returnerer tracking-ID-er uten at tracking kan gjøre søket utilgjengelig;
- klikk på meny, restaurant og veibeskrivelse registreres;
- nulltreff kan aggregeres direkte fra search events;
- deduplisering av klientklikk.

### R2 — Conversion destinations

Utvid restaurantmodellen med canonical, verifiserte:

- booking URL;
- order URL;
- eventuelt telefon/andre handlingskanaler senere.

Kun tilgjengelige handlinger vises i produktet.

### R3 — Claim restaurant

Bygg:

- claim request;
- verifikasjonsstatus;
- virksomhetseier/tilgang;
- audit-logg for endringer;
- skille mellom kildebevis og restauranteide canonical felt.

### R4 — Fysen Pro dashboard

Første dashboard viser per restaurant:

- impressions;
- meny-/restaurant-/directions-/booking-/order clicks;
- CTR;
- mest etterspurte retter;
- nulltreff/etterspørselsgap;
- menyferskhet og watcherhelse.

### R5 — Commercial experiments

Først når R1–R4 er stabile:

- pilotpris for Fysen Pro;
- booking-/ordrepartner;
- tydelig merket sponsored dish;
- måling av incremental value før skalering.

## Hva vi ikke bygger først

- forbrukerabonnement som primær inntekt;
- pay-to-win organisk ranking;
- skjult annonseplassering;
- avansert ad-tech/profilering;
- fakturering før attribusjon er bevist;
- egen delivery-logistikk.

## Suksesskriterium

Revenue Layer v1 er bevist når Fysen kan svare troverdig på:

1. Hva søker folk etter?
2. Hvilke søk mangler dekning?
3. Hvilke restauranter og retter blir faktisk vist?
4. Hvilke visninger skaper handling?
5. Hvor mye målbar etterspørsel sender Fysen til en restaurant?

Da har Fysen et reelt grunnlag for Pro-abonnement, lead-/partnerbetaling og sponsede plasseringer uten å ødelegge tilliten i det organiske søket.
