# Supabase-prosjektregister – Fysen, AHA og EchoNet

Status: 11. november 2026. **Dette er et identifikasjonsregister, ikke bekreftet oversikt over medlemskap i alle innloggingskontoer.** De registrerte prosjekt-ID-ene kommer fra GitHub-kode, tidligere verifiserte driftssjekker og Supabase-varsler. Ingen produksjonsdatabase er endret som følge av dette dokumentet.

## Kjente prosjekter

| System | Prosjektnavn / rolle | Supabase project ref | Bekreftet organisasjon | Merknad |
|---|---|---|---|---|
| **Fysen** | `fysen`, opprinnelig PostgreSQL produksjon | `voglczxxtbwcxjrbffbt` | **Ikke fastslått** | 2. nov.: 1 582 MB databaseinnhold, Free-kvote overskredet, `transaction_read_only=on`. 8. nov.: `ECONNREFUSED` ved ufarlig SELECT, selv om Supabase-panelet oppga aktivt prosjekt. |
| **Fysen** | Separat gratis gjenopprettingsprosjekt | `txaopscyxjvvmwawsphk` | **Ikke fastslått** | 8. nov.: ca. 62 MB; historiske, kompakte gjenopprettingsdata. Må **ikke** automatisk erstatte opprinnelig `DATABASE_URL` eller regnes som fersk live-produksjon. |
| **AHA / EchoNet** | `AHA`, frontend Supabase Auth / valgfri MVP-sync | `wshmybqyksrwkawqleiz` | **EchoNet**, org `kepuwrsiqhqwfgijzpev` | Prosjekt og org bekreftet i Supabase-varsler; AHA frontend-konfigurasjon bruker prosjektet. Tidligere pausevarsel. |
| **AHA / EchoNet** | `AHA Staging` | `sstuzwppsheivczyqrim` | **EchoNet**, org `kepuwrsiqhqwfgijzpev` | Tidligere pausevarsel. Ikke forveksle med dedikert Azure production PostgreSQL. |

**Organisasjonsobservasjon 11. november 2026 (brukerens Dashboard-skjermbilde):** Innlogget Supabase-visning med organisasjonsnavnet `Aha EchoNet` viser de to prosjektnavnene **`fysen`** og **`fysen-recovery-free`** (begge `eu-west-1`, `NANO`). Samme visning varsler **`Services restricted`** og viser samlet `Database size` **1 682 / 500 MB** i inneværende fakturaperiode. **Dette bekrefter tilgang til disse prosjektnavnene fra den viste innloggingen**, men bildet viser *ikke* deres project ref eller organisasjonens ID. Først når prosjektets Dashboard URL / General Settings er sjekket, kan man koble navnene sikkert til `voglczxxtbwcxjrbffbt` og `txaopscyxjvvmwawsphk`.

**Dokumenterte organisasjoner:** `Aha EchoNet` har tidligere vært knyttet til org ID `conidfhuuaueyoxwklae` med kvote-/egressbegrensninger; `EchoNet` er knyttet til org ID `kepuwrsiqhqwfgijzpev`. Organisasjons-ID-en til den **nå viste** `Aha EchoNet`-visningen er fremdeles ubekreftet fra bildet. Én innloggingskonto kan være medlem av flere organisasjoner; to organisasjoner er ikke bevis på to kontoer. **Ikke forveksle Fair Use-tjenestesperre (organisasjonskvote) med PostgreSQL read-only som kan utløses av fysisk diskbruk.**

## Hvor finner vi Fysen?

- Opprinnelig prosjekt: https://supabase.com/dashboard/project/voglczxxtbwcxjrbffbt
- Gjenopprettingsprosjekt: https://supabase.com/dashboard/project/txaopscyxjvvmwawsphk
- AHA: https://supabase.com/dashboard/project/wshmybqyksrwkawqleiz
- AHA Staging: https://supabase.com/dashboard/project/sstuzwppsheivczyqrim
- Dokumentert organisasjon EchoNet: https://supabase.com/dashboard/org/kepuwrsiqhqwfgijzpev
- Dokumentert organisasjon Aha EchoNet: https://supabase.com/dashboard/org/conidfhuuaueyoxwklae/usage

Hvis et prosjekt ikke vises fra én innlogging, sjekk den andre Supabase-innloggingen og organisasjonsvelgeren før prosjektet merkes som slettet. Prosjekt-ID og organisasjonstilhørighet må bekreftes fra Dashboard / Management API med autorisert tilgang.

**Dokumentasjonsfeil korrigert:** `docs/deployment.md` brukte tidligere det feilskrevne `voglczzxtbwcxjrbffbt`. Opprinnelig referanse er `voglczxxtbwcxjrbffbt`, konsistent med [lagerhendelsen 2. november](fysen-storage-readonly-recovery-2026-11-02.md) og [PR #1165](https://github.com/Paradispartiet/fysen/pull/1165).

## Sikring av gamle Fysen-data

Historiske data ble eksportert og restaurert i isolert PostgreSQL 17 + PostGIS-test 2. november 2026. Se [verifisert gjenopprettingsrapport](fysen-storage-readonly-recovery-2026-11-02.md) og [isolert restore-kjøring](https://github.com/Paradispartiet/fysen/actions/runs/41510938739).

- Privat sikkerhetskopi: https://drive.google.com/drive/folders/1Ml52aXi2qr_2-smBrEXvgxGhBqgclIUW (fire ZIP-deler, kontrollert 2. november).
- Reassemblert `.pgdump` SHA-256: `1fd0385d2194ff6bcb80bc10cf04f577b4c970c9524a7c38a5f1382a7fefba0e`.
- Gjenopprettet: **1 116 restauranter**, **1 154 menykilder**, **40 707 snapshots**, **1 997 348 menyposter**, **100 172 menyendringer** og **111 963 watcher-kjøringer**.
- **Avgrensning:** Kopien omfatter seks historie-/menytabeller, **ikke** hele Supabase-instansen, auth-/brukerkontoer, lagringsobjekter eller samtlige applikasjonstabeller. Ny fullstendig backup kan være nødvendig før migrering.

Tallene er verifisert på den oppgitte datoen, ikke en live-status fra 11. november.

## Sikker avklaring – neste operatørkontroll

1. Logg inn på **begge** Supabase-identitetene og noter hvilken identitet som har tilgang til hvert prosjekt, samt hvilken organisasjon, rolle og fakturaplan prosjektet tilhører. Ingen passord eller tokens skal lagres i repoet.
2. Åpne det opprinnelige Fysen-prosjektet med korrekt ID, kontroller status, `transaction_read_only`, diskbruk og tilkoblingsmulighet med **read-only** operasjoner.
3. Noter andre prosjekter på begge kontoene; kartlegg hvilke apper og GitHub-miljøer som benytter hver database eller Supabase Auth. Ikke forveksle `EchoNet` med `Aha EchoNet`.
4. Kontroller om backup på Google Drive fortsatt er tilgjengelig, komplett og tilstrekkelig for nødvendig gjenoppretting.
5. Velg deretter en sikker driftsstrategi: reparer opprinnelig database, eller bygg separat databaseuavhengig offentlig søk. Bevar produksjonsdata og private API-funksjoner underveis.

**Forbud uten egen risiko-/kostnadsbeslutning:** Ikke bytt `FYSEN_PRODUCTION_DATABASE_URL` blindt, ikke slett tabeller eller snapshots, ikke tilbakestill Supabase Auth, ikke oppgrader betalt plan og ikke kopier credentials inn i GitHub-kode. Kodeendringer skal gå gjennom PR, tester og eksplisitt utrulling.

## Relatert API-arbeid

[PR #1165](https://github.com/Paradispartiet/fysen/pull/1165) oppretter et **lesebasert arkiv-API** som ikke krever den gamle databasen. Det erstatter **ikke** produksjonens database eller private API-er og må testes/deployes separat. Det er ingen grunn til å miste originaldata fordi et offentlig fallback-API fungerer.
