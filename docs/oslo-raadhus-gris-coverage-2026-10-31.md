# Gamle Raadhus og Den Glade Gris — kildebevis 31. oktober 2026

Denne runden omfatter to dokumenterte hull i Oslo-katalogen. Kandidater er ikke publisert før separat katalogopptak, materialisering og offentlig søk er bekreftet.

## Avstemt utgangspunkt

`main` ved `8a3f813a4691aec72d1f8cc7437c5b51f55fbeec` har 983 kanoniske restaurantmanifester. Alle 983 `JA`-slugger i masterregisteret svarer én-til-én til katalogen; ingen ekstra eller manglende slugger. Registerets Git-blob er `ced5aaeb845bd54e8e82e854f24c8f9091fa2a7f`.

Av 1198 registerrader har 983 status `JA`, 184 `IKKE_IDENTIFISERT`, 28 `KANDIDAT_NETT`, to `MULIG_ALIAS` og én `ARKIVERT`. Blant upubliserte rader er 91 redaksjonelt kildebekreftet relevante, 50 VisitOSLO-relevante med uavklart drift og 18 Michelin-relevante med uavklart drift. Dette er en arbeidskø, ikke 159 bekreftede aktive publiseringsklare restauranter. Hele Oslo-universet er fortsatt ikke avstemt.

Den forrige runden er produksjonsbekreftet: 983/983 kilder friske, 76/76 konkrete offentlige navn-/pris-/kildekontroller, alle 20 Engebret-retter synlige, og vellykket production reconcile. [Siste offentlige Matlyst-bevis](https://github.com/Paradispartiet/fysen/actions/runs/41220775177), forsøk 2. Schrøder, Dovrehallen, The Salmon, Engebret og Lofoten skal derfor ikke behandles som uopptatte kandidater fra den historiske køen 28. oktober.

## To nye kilder

| Restaurant | Kilde og avgrensning | Manuell kontroll | Kandidatkrav |
| --- | --- | --- | --- |
| Gamle Raadhus Restaurant | Offisiell kveldsmeny, gjeldende 29. oktober 2026. Lunsj/selskapsmenyer er utenfor dette kildeomfanget. | 14 norske rettnavn/priser: tre forretter, seks hovedretter, fem desserter. «Servert 2 ganger» er ett samlet pristilbud. | Minimum 12; alle 14 navn/prispar kontrolleres. |
| Den Glade Gris | Oktober 2026-PDF lenket fra restaurantens nettside. | Alle 24 prissatte matrader på side 6–7: 19 måltidstilbud og fem sideretter. Barnemenyen er ett alternativtilbud til 215 kr. Uttrekket har også en engelsk gjentakelse av svinesvor på side 8; 25 rader betyr ikke 25 unike retter. | Minimum 22 av dagens 25 matrader; alle 19 måltidstilbud og én siderett kontrolleres med navn/pris. |

Adressene er bekreftet hos restaurantene. Koordinater er hentet fra Kartverkets adresseregister, EPSG:4258 (© Kartverket, CC BY 4.0). Den Glade Gris er en annen fysisk restaurant enn Grisen på Torshov. Gamle Raadhus dedupliseres også mot å/aa-aliaser. Åpningstider er ikke særskilt verifisert.

Kilder, kildehasher, koordinater og alle 38 manuelt kontrollerte navn/prispar ligger i [kildeoversikten](research/oslo-raadhus-gris-20261031.sources.json).

## Generiske parserrettelser

HTML-kort krever to lokale fremhevinger: norsk tittel først, én eksplisitt NOK-pris sist, og en gjenkjent matseksjon. Beskrivelser/oversettelser blir ikke rettnavn. Helhetsutskifting krever minst tre entydige kort og ingen uavklarte synlige priser utenfor kortene, inkludert bare tall og utenlandsk valuta. Motstridende priser gir tilbakefall til øvrig behandling.

PDF-kort bruker typografi, posisjon og kolonnegrenser før linjerekonstruksjon. Tittel og pris må høre til samme kort. Konkurrerende lokale priser avvises. Mat-/drikkeseksjoner kan skifte på samme side; øl, drikkepakker, tre-retters anbefaling og bacon-tillegg blir ikke selvstendige måltider. Verken vertsnavn eller sidenummer brukes som parserbetingelse. Eksisterende parser er tilbakefall for andre layouttyper.

Runtime-identiteter oppdateres for HTML og PDF slik at tidligere feiltolkede snapshots blir hentet på nytt. Eksisterende krav beholdes utenom det uttrykkelig daterte [kildebyttet hos Engebret fra 1. november](engebret-november-menu-2026-11-01.md), som erstatter oktoberkontrollene med alle 15 tilbud i den aktuelle menyen. Full katalogregresjon bestilles eksplisitt i PR-beskrivelsen; den strenge direkte kontrollen av endrede manifester beholdes.

## Verifikasjon og videre porter

Lokal verifikasjon 1. november: 109 testfiler / 837 tester bestått, TypeScript-bygg, ESLint, YAML-parsing og `git diff --check`. Uavhengig kodegjennomgang har ingen gjenstående viktige funn.

Lokal kildefangst gir nøyaktig 14/25 matrader og samsvar med alle 38 manuelle navn/prispar. Regresjonstestene omfatter ugyldige/konkurrerende priser, kolonnegrenser, oversettelser, skjult HTML og drikkescope. Direkte livehenting i arbeidsmiljøet feiler med DNS `EAI_AGAIN`; dette er ingen kildegodkjenning. Livebevis skal derfor kjøres fra GitHub Actions på den konkrete commiten, inkludert hele eksisterende katalog.

Først etter grønn CI, kodegjennomgang og livebevis kan kandidatene kopieres byte-identisk til katalogen i en separat PR. Deretter må materialisering, production reconcile og offentlig søk bekreftes før disse to regnes som levert. Havsmak, Skur 33, FYR, Vaaghals og øvrige uløste registerrader er fortsatt selvstendige kilde-/kvalitetsoppgaver. Smaksmenypakker får ikke oppdiktede enkeltrettpriser.
