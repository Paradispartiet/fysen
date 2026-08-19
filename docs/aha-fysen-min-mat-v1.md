# AHA × Fysen — Min mat v1

## Produktgrense

AHA eier identitet og analyse. Fysen eier den eksplisitte private matsamlingen `Min mat`.

Dette laget kobler ikke Fysen-søkehistorikk eller Demand Loop til AHA-identiteten. AHA consumer session er fysisk og logisk separat fra Restaurant Claim, `restaurant_access_grants`, Fysen Pro setup-tokens og Pro-sessions.

## Delegert innlogging

Fysen starter PKCE fra `/api/aha/connect` og lagrer verifier, state og en lokal retursti i kortlivede HttpOnly-cookies. Browseren sendes til AHA sin `authorize-fysen.html` med eksakt callback URI.

AHA utsteder en kortlivet kode bundet til AHA-subject, `client=fysen`, callback, PKCE, scopes og policy. Fysen web sender koden + HttpOnly PKCE verifier til Fysen API. API-et veksler koden server-to-server mot det faste AHA production API-et.

Fysen lagrer aldri AHA Supabase access token. Den lager en egen 30-dagers consumer session. Bare SHA-256-hash lagres i DB. `aha_authorization_id` er unik, så samme AHA-kode kan ikke opprette to Fysen-sessions selv om AHA exchange-koden skulle forsøkes replayet med riktig verifier.

Produksjonsaktivering krever at AHA API-integrasjonen er aktivert og allowlister Fysen sin eksakte callback. `FYSEN_PUBLIC_WEB_URL` kan settes eksplisitt; production fallback er den canonical Vercel-webadressen.

## Min mat

Klienten kan bare sende `menuItemId`. Fysen API slår selv opp:

`menu_items → menu_snapshots → menu_sources → restaurants`

og materialiserer en privat personlig snapshot med rettnavn, restaurant, by, pris og canonical provenance-ID-er. Tabellen har ingen fremmednøkler tilbake som kan gjøre privat brukerdata i stand til å blokkere canonical kildeopprydding. Lagre/fjerne muterer aldri restaurant-, menykilde-, snapshot-, menyitem- eller funneldata.

## Analyse i AHA

`POST /v1/min-mat/handoffs` lager en 5-minutters engangscapability. Rå token lagres ikke. Handoff-en fryser de opptil 50 valgte `min_mat_items.id` ved utstedelse, slik at senere samlingsendringer ikke kan utvide en allerede utstedt handoff.

Fysen web svarer med 303 til AHA `fysen.html#handoff=...`; tokenet trenger derfor ikke lagres i React-state. AHA løser tokenet mot `/api/aha/handoff`, som har CORS låst til `https://paradispartiet.github.io`, ingen cookies og `Cache-Control: no-store`.

Payloaden er alltid `fysen_food_collection_v1` med:

- `scope = private_user`
- `includesSearchHistory = false`
- `publicSharing = false`
- `modelTrainingAllowed = false`

AHA viser payloaden før brukeren velger `Analyser i AHA`. Den eksisterende pending-prompt-mekanismen pre-fyller chatten uten auto-send eller auto-ingest.
