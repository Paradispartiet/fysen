# Fysen forbruker Oslo v1 — produksjonsgodkjenning 13. oktober 2026

**Beslutning: GODKJENT / production-closed for forbruker Oslo v1.**

Denne godkjenningen gjelder utelukkende den forbrukerrettede Oslo v1-leveransen etter den separate kontrakten i [`fysen-oslo-v1-closeout.md`](./fysen-oslo-v1-closeout.md). Den omfatter **ikke** en partnerverifisert Fysen Pro-pilot, Pro v2, R5, betaling eller AHA/Min mat-pilot.

## Kontrollert produksjonsgrunnlag

- Canonical `main`-revisjon ved sluttkontrollen: `edc1824daa67bc7167311516fb2275d23547b08d`. Senere dokumentasjons-commits innebærer ikke automatisk ny runtime.
- **Web produksjon:** Vercel `READY`, deploy `dpl_HZoYWxNZh2TBndG4YNsq8iRnuTo5`, kilde `067db3cd462ae4cec36a29ae6d8c65cb385dfd9c` (13. oktober). [Release-workflow #38377180722](https://github.com/Paradispartiet/fysen/actions/runs/38377180722).
- **API produksjon:** Vercel `READY`, deploy `dpl_EnQCbyJd8GyKRNZ82AZgZGEkELo2`, kilde `0f955c770f4a07fccf1cc8956b1817a7ae01eef5` (30. september). Sammenligning `0f955c77...edc1824daa67bc7167311516fb2275d23547b08d` viser ingen endringer i `apps/api/` eller delte pakker. Den eneste endringen i `apps/web/` er en browser-test; nyere katalog-/meny- og dokumentasjonsendringer krever ingen ny API-/web-runtime. [Sammenlign commits](https://github.com/Paradispartiet/fysen/compare/0f955c770f4a07fccf1cc8956b1817a7ae01eef5...edc1824daa67bc7167311516fb2275d23547b08d).
- Den påfølgende release-workflowen for dokumentasjonsrevisjonen, [#38379267182](https://github.com/Paradispartiet/fysen/actions/runs/38379267182), **hoppet over web/API-deploy og proof** i tråd med batch-/scope-kontrakten. Grønn workflow-overskrift brukes ikke som selvstendig bevis for ny release.

## Seks operative porter

| Port | Resultat | Produksjonsbevis |
|---|---|---|
| 1. Web/API og release | **GODKJENT** | Vercel READY web/API; web sluppet med `067db3cd`, uendret API runtime; [release + consumer-/revenue-proof #38377180722](https://github.com/Paradispartiet/fysen/actions/runs/38377180722), begge proof-jobber grønne. Offentlig web og API bekreftet; Min mat viser pause, uten innloggingsforsøk. |
| 2. Restaurantintegritet | **GODKJENT** | [Fullkatalog #38364566185](https://github.com/Paradispartiet/fysen/actions/runs/38364566185): 749/749. [Materialisering #38364566314](https://github.com/Paradispartiet/fysen/actions/runs/38364566314) grønn. [Reconcile #38371310300](https://github.com/Paradispartiet/fysen/actions/runs/38371310300): 749 canonical = 749 aktive = 749 enabled = 749 friske kilder; 0 inaktive, 0 aktive utenfor katalog, 0 manglende/ekstra/doblede kilder, 0 kildehelsefeil. |
| 3. Consumer catalog | **GODKJENT** | [Production proof #38377180722](https://github.com/Paradispartiet/fysen/actions/runs/38377180722): `consumer-v1`; 37 298 rå menyoppføringer → 31 766 gyldige → 16 752 canonical retter, med 5 532 ekskluderte ikke-retter og 15 014 forsiktig dedupliserte identiteter. Offentlig browse-API og serverrendret Alle retter bekreftet. |
| 4. Matleksikon og stedslenker | **GODKJENT** | [Live mobilproof #38377534427](https://github.com/Paradispartiet/fysen/actions/runs/38377534427) viser at kunnskapsdialogen for Ramen åpnes, inneholder lenker til aktuelle serveringssteder og lukkes tilbake til treff. Production proof krever både `concept:`- og `menu:`-identiteter i live browse-API. Web-koden i `apps/web/components/dish-browse.tsx` gir søkeresultatlenke til alle retter og kunnskapslenke bare når et dekket kunnskapsemne er knyttet til retten. Dette er en representativ kontroll, ikke en manuell åpning av samtlige 16 752 retter. |
| 5. Mobil finish | **GODKJENT** | [Post-deploy browser-proof #38377534427](https://github.com/Paradispartiet/fysen/actions/runs/38377534427), `390×844`, **4/4**: søk → restaurant/meny/booking; kunnskapsdialog → steder → tilbake; Matlyst → kjøkken → rett → resultat; Alle retter → rett → resultat. Mobilproofen ble kjørt **etter** web-deployen fra `067db3cd`. |
| 6. Representative E2E | **GODKJENT** | [Production pilot proof #38377180722](https://github.com/Paradispartiet/fysen/actions/runs/38377180722) rapporterer `status=verified`, `recordedRevenueEvents=false`, alle 749 katalogrestauranter og **9 søkescenarioer**: Punjabi Mix Grill (order), Valentes (booking/provisorisk åpning), Collett's (browser-kilde/åpning), Margherita, ramen, pizza, Butter Chicken, `margerita` fuzzy og avstand/geolokasjon. Separat revenue-proof `status=verified`, `mutatingProductionRequests=false`, `failures=[]` og korrekt Min mat-pause. |

**Port 7 – sluttgodkjenning:** Operative porter 1–6 har sammenfallende produksjonsbevis og ingen dokumenterte blokkere. Fysen forbruker Oslo v1 er derfor **GODKJENT** under den gjeldende kontrakten. Katalog og watcher fortsetter ordinær drift; dette er ikke en garanti for at eksterne menyer aldri endrer seg.

## Andre leveranser og avgrensninger

- **Fysen Pro v1, teknisk:** Claim, grant, engangskode, hashing, scoping, session, dashboard, logout og revokering er integrasjonstestet med syntetiske data på isolert PostgreSQL: [database-CI #36514385344](https://github.com/Paradispartiet/fysen/actions/runs/36514385344). [Revenue-proof i #38377180722](https://github.com/Paradispartiet/fysen/actions/runs/38377180722) bekrefter offentlig Claim/Pro og fail-closed uautentisert tilgang. Pro har egen teknisk godkjenning og er ikke del av denne forbrukersigneringen.
- **Fysen Pro, partnerakseptanse:** **Ikke gjennomført**. Ingen autorisert restaurantrepresentant er tilgjengelig. Ingen syntetiske claims, access grants, brukere eller tokens opprettes i produksjon for å simulere dette. Pro v2/R5/betaling/sponsing forblir låst.
- **Min mat/AHA:** Piloten er satt på pause og inngår ikke i forbruker-v1. Reaktivering krever egen beslutning.
- **Forbruker-v2:** Kan planlegges/startes etter denne forbrukergodkjenningen, i tråd med [`fysen-v2.md`](./fysen-v2.md); Pro-partnerpiloten blokkerer ikke videre forbrukerproduktarbeid.

Denne sluttkontrollen erstatter ikke fremtidig hendelsesovervåkning, sikkerhetsoppfølging eller kontroll ved senere runtime-endringer.
