# Etablerte Oslo-restauranter — menykontroll 31. oktober 2026

Denne kontrollen sammenligner publiserte førstepartskilder med parserens faktiske uttrekk. Den er kilde-/parserbevis, ikke en attest på at kandidater er publisert eller at hele Oslo er dekket. CI, strict livevalidering, katalogopptak, materialisering og offentlig søk bekreftes separat.

| Restaurant | Kontrollerte mattilbud/varianter | Resultat og avgrensning |
| --- | ---: | --- |
| Restaurant Schrøder | 19 | Eksisterende manifest bestod mot ferskt uttrekk. Rakfisk har to størrelser, indrefilet to gramvekter, og pannen viser pris per person/minimum to. Tre-retters, saus og mat-/portvinkombinasjon teller ikke som ordinære retter. |
| Dovrehallen | 48 | Eksisterende manifest bestod mot ferskt uttrekk, inkludert tre karbonadevarianter. Kilden publiserer 43 ordinære og fem særskilt merkede juleretter; den oppgir ingen separat aktiveringsdato for disse. |
| The Salmon | 47 | Alle prisede vintermenyvarianter er bevart. Iskrem og sorbet får eksplisitt «per kule» i navn, beskrivelse og kildebevis. Meny 1–3 er tre-retters pakker, ikke enkeltretter. |
| Engebret Café | 20 | Alle navngitte/prisede retter i **oktober-à la carte** er gjenfunnet med egne priser. Separate lunsj-, smørbrød-, selskaps- og november-/julemenyer er ikke med i dette kildeomfanget. Den uspesifiserte vegetarforretten/hovedretten med to priser er ikke gjort om til oppdiktede rettnavn. Kandidat; ennå ikke produksjonsattestert. |
| Lofoten Fiskerestaurant | 23 | Ordinær lunsj/middag fra **engelsk førstepartsmeny**. To suppestørrelser, tre østersporsjoner og stort skalldyrfat per person/minimum to/forhåndsbestilling beholdes. Kilo-priset fersk hummer settes til side; selskap, sesongmenyer, vinpakker og kursbundler er ikke ordinære enkeltretter. Kandidat; ennå ikke produksjonsattestert. |

## Kilder og identitet

- Schrøder: <https://www.xn--restaurant-schrder-u4b.no/meny/>
- Dovrehallen: <https://www.dovrehallen.no/var-meny>
- The Salmon: <https://www.thesalmon.com/menu/>
- Engebret: <https://www.engebret-cafe.no/menymenu>, identitet/kart <https://www.engebret-cafe.no/nordbestilling>.
- Lofoten: <https://www.lofoten-fiskerestaurant.no/menu-eng>, identitet/kart <https://www.lofoten-fiskerestaurant.no/>.

Engebrets egne kartdata angir Bankplassen 1, 0151 Oslo og 59.9089512, 10.742127100000062. Lofotens egne steddata angir Stranden 75, 0250 Oslo og 59.90871809999999, 10.724512799999957. Det opprettes ikke nye identiteter for navnealiasene Engebret Cafe eller Lofoten Fish Restaurant.

Lofotens norske og engelske sider har enkelte ulike priser/utvalg. Den nye kandidaten følger den eksplisitt oppgitte engelske kilde-URL-en; priser blandes ikke på tvers av språkversjoner. Engebrets kilde gjelder oktober, og novembermenyen må kontrolleres som et eget aktuelt kildebytte når den trer i kraft.

## Parserendringer og bevis

- Direkte fete titler bindes til prisen på samme linje/blokk, med linjeskift som grense mot allergener og oversettelse. Globale lengde-/beskrivelsesfiltre er ikke lempet.
- Semantiske Squarespace-menykort leses fra eksplisitte ordinære lunsj-/middagspaneler. Speilede prisfelt må stemme. Størrelser og pris-/antallsvektorer må ha entydig lokal sammenheng. Prisinnhold utenfor komponenten utløser konservativ tilbakefallshåndtering.
- «Per kule» godtas bare fra en synlig, lokalt navngitt prispost som stemmer med rettens pris. Motstridende pris-/enhetsfelt settes til side; en løs nabopris brukes ikke som bevis.
- Alternative priser får ikke bli en oppdiktet enkeltpris, heller ikke etter at en tidligere parser har forkortet navnet.

Alle 20 og 23 navn/prispar er sammenlignet med uavhengige, bokstavelige forventninger i regresjonstestene, og med nytt fullstendig HTML-uttak. De nøyaktige parene, kildehashene og omfanget ligger i [kildeoversikten](research/oslo-established-coverage-20261031.sources.json).

Kandidatene har 12 konkrete prisassertasjoner hver og normale antallsbuffere: 18 av 20 hos Engebret og 20 av 23 hos Lofoten. Forskningsinntaket krever fortsatt de komplette, observerte 20/23 tilbudene ved dette kildebeviset. The Salmon beholder alle tidligere kontroller, oppdaterer Sorbet til korrekt enhetsnavn og legger til Iskrem som egen kontroll; minimum 47 er uendret.

Lokal verifisering: 106 testfiler / 811 tester bestått, TypeScript typekontroll, bygg, ESLint og `git diff --check`. Exact-head GitHub-kontroller og produksjonsbevis kommer i tillegg. De to nye kandidatene skal kopieres byte-identisk til katalogen i separat opptak etter godkjent parser/livevalidering.
