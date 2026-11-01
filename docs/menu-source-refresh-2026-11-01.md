# Menykilder og produksjonskontroller — 1. november 2026

Denne runden retter kilde-/parserfeil og dokumenterte menyendringer ved månedsskiftet. To nye restauranter klargjøres som kandidater; syv eksisterende restaurantidentiteter oppdateres. Full Oslo-dekning er ikke ferdig kildeavstemt.

| Restaurant | Observerte matrader | Minimum | Konkrete navn/prispar | Endring |
| --- | ---: | ---: | ---: | --- |
| Gamle Raadhus Restaurant | 14 | 12 | 14 | Norske navn, pris og seksjon fra lokalt avsnittskort. Ny kandidat. |
| Den Glade Gris | 25 | 22 | 20 | 24 prissatte matrader, hvorav 19 måltider og fem sideretter, samt engelsk gjentakelse av svinesvor. Ny kandidat. |
| Engebret Café | 15 | 13 | 15 | Kilde datert fra 1. november erstatter oktobermenyen; serveringsvilkår beholdes. |
| Lorry | 9 | 8 | 9 | Tidligere middagsside gir 404; offisielt lenket Julemeny med ni selvstendige tilbud erstatter den. Ingen startdato er oppdiktet. |
| Dinner Barcode | 47 | 42 | 8 | Fire kontroller oppdateres mot publisert meny; DAMPET Seabass får rettnavnet sitt i stedet for seksjonsoverskriften. |
| Dinner Nationaltheatret | 43 | 43 | 8 | Fire dokumenterte navn-/prisendringer; minimum uendret. |
| 67Grill | 23 | 20 | 8 | To fjernede kontrollretter erstattes; antallsbuffer basert på dagens kvalifiserte utvalg. |
| Karachi Street Food | 46 | 41 | 7 | Fem fjernede kontrollretter erstattes med kildebekreftede tilbud; antallsbuffer for vanlig variasjon. |
| Nordvegan | 25 | 8 | 10 | Spinatsuppe er borte fra kilden; dagens Creamy Pumpkin Soup kontrolleres til 149 kr. Minimum uendret. |

Original parser på `main` og den første rettelsescommiten ga identiske resultater på de samme råkildene hos Dinner og de tre Wolt-stedene. De observerte kontrollfeilene var derfor ikke introdusert av de nye parserendringene. Dinner hadde samtidig en eldre, reprodusert feil der en kort rett med kinesisk oversettelse ble tolket som beskrivelse. Lorrys eksplisitte menyfelter ble tidligere overstyrt av ingrediensgjetting; dette ga Ribbe og Vegetarisk Bratwürst som falske tilbud og mistet beskrivelser med «2 serveringer».

De generiske rettelsene har ingen vertsnavn- eller sidenummerbetingelser. Full erstatning av heuristisk output krever entydig lokal prisbinding og at uavklarte priser ikke finnes andre steder. Regresjoner dekker blant annet ekstra bare priser, overskrifter med pris, utenlandsk valuta, tusenskilletegn, motstridende identiteter, skjult HTML, kolonnegrenser og kontaktfelt som også inneholder matpriser. Oppdaterte runtime-identiteter sørger for ny henting av gamle snapshots.

## Verifikasjon og kilder

Lokal samlet kontroll: **111 testfiler / 881 tester bestått**, TypeScript-bygg, ESLint, YAML-parsing og whitespacekontroll. Fersk kjøring av produksjonsruntime mot de komplette lagrede råkildene gir **247 matrader** og består **99 konkrete navn/priskontroller** uten manglende eller forbudte retter. De 247 radene er ikke 247 uavhengige måltider eller en attest på hele restaurantens serveringstilbud. Uavhengig kodegjennomgang har ingen gjenstående viktige funn.

Detaljerte kildebevis, rådata-IDer og avgrensninger:

- [Gamle Raadhus / Den Glade Gris](oslo-raadhus-gris-coverage-2026-10-31.md)
- [Engebret november](engebret-november-menu-2026-11-01.md)
- [Lorrys gjeldende kilde](lorry-current-menu-refresh-2026-11-01.md)
- [Dinner](dinner-menu-control-refresh-2026-11-01.md)
- [Wolt-kontrollene](wolt-menu-control-refresh-2026-11-01.md)

67Grills numeriske pizzatittel `26. 67` er fortsatt satt til side av det eksisterende navnefilteret; ingrediensene brukes ikke til å finne på et navn. Det er ikke påstått full dekning av alle rå matprodukter hos dette stedet. Wolt-priser er leveringspriser. Lunsj, selskapsmenyer, conditional/reduced-menyer, drikkepakker og menyer uten individuelt prisede tilbud blandes ikke inn uten kildebevis.

Endelig godkjenning krever fortsatt CI og direkte livebevis på den konkrete commiten, helkatalogkontroll, separat byte-identisk kandidatopptak for de to nye restaurantene, materialisering, production reconcile og offentlig søk. Katalogstatus alene teller ikke som produksjonsbevis.

## Helkatalograpport og tre siste kilder

Kjøring [41270052806](https://github.com/Paradispartiet/fysen/actions/runs/41270052806) på `1dfa501` godkjente **980/983** kilder. De ni restaurantene ovenfor bestod, også de direkte enkeltkontrollene. Tre gjenværende avvik er behandlet separat:

- [La Tornata](la-tornata-control-refresh-2026-11-01.md): to fjernede retter erstattes med publiserte tilbud; seks kontroller og minimum 18 beholdes. Alle 39 kvalifiserte råposter er kontrollert.
- [Burger King Hegdehaugsveien og Domino Grorud](wolt-source-response-budgets-2026-11-01.md): eksplisitt kildebudsjett på 8 MiB gjennom eksisterende HTTP-støtte. Den globale 2 MiB-standarden er uendret; alle tjue konkrete kontroller og begge minimumskrav er bevart.

Dette er kilde-/konfigurasjonsendringer. Parserkode og den beståtte 881-testers regresjonen er uendret fra `1dfa501`. Alle tre oppdaterte manifester er skjemavalidert og gjennomgått uavhengig; ny direkte livekontroll og helkatalograpport gjenstår før merge.
