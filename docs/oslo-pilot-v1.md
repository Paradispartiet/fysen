# Fysen Oslo Pilot v1

## Formål

Fysen Oslo Pilot v1 skal bevise at Fysen kan brukes av folk i Oslo til å finne en konkret rett de har lyst på, basert på ferske og sporbare restaurantmenyer.

Pilotens north star er dish-first:

> Brukeren skriver retten. Fysen viser restauranter som kan dokumenteres å ha retten på en fersk meny nå.

Fysen skal først og fremst hjelpe brukeren å finne **hvor en rett faktisk kan spises**, samtidig som verifiserte booking- og bestillingsmuligheter kan gjøre resultatet handlingsklart.

Piloten skal ikke optimaliseres for flest mulig restauranter eller flest mulig menyitems. Den skal optimaliseres for:

- pålitelige treff;
- nyttig Oslo-dekning;
- ferske og kildebelagte menydata;
- målbar, ekte brukerintensjon;
- tydelig skille mellom hva restauranten selv publiserer og hva en leverings-/bestillingstjeneste dokumenterer;
- en tydelig vei fra oppdagelse til restaurant, booking eller bestilling der dette er verifisert.

Restaurant-onboarding er en løpende dekningsoppgave. **Beslutning 13. oktober 2026:** Fysen skal sikte mot **alle gode og ordinære restauranter i Oslo kommune**. Dette gjelder også etablerte nabolagsrestauranter som ikke er prisbelønt, ikke omtalt i internasjonale guider og serverer kjente retter. Dish-first søk er fremdeles produktløftet, men «unik marginal rettverdi» er **ikke lenger et vilkår for restaurantens relevans**.

## Dekningsbeslutning 28. oktober 2026 — alle anerkjente restauranter i Oslo

**Målet er full dekning av alle dokumenterbart anerkjente, aktive restauranter i Oslo kommune**, i tillegg til de gode ordinære restaurantene. Anerkjennelse kan dokumenteres gjennom MICHELIN, VisitOSLO, redaksjonelle Oslo-guider, lokale restaurantanmeldelser og flere uavhengige kilder; Michelin-stjerne eller en bestemt Google-score er ikke et vilkår. Kontroller faktisk adresse og driftsstatus før hver opptaksbeslutning.

Dette er en **dekningsforpliktelse, ikke en påstand om at vi allerede er ferdige**:

1. Alle bekreftet anerkjente restauranter skal identifiseres og spores med kilde, sjekkdato og fysisk Oslo-identitet. En gjenkjent restaurant kan ikke forsvinne fra arbeidskøen fordi menyen er vanskelig å lese.
2. Hver får én redaksjonell beslutning (relevant / uavklart / dokumentert utenfor) og én **separat** publiseringsstatus (`canonical`, `review`, `missing`, eller dokumentert `excluded` der identiteten virkelig faller utenfor). `review` er et synlig dekningsgap, ikke en godkjenning.
3. Mangel på individuell rettpris, vanskelig PDF/HTML, robots-blokkering og smaksmeny uten publiserte retter er **tekniske hindringer**, ikke grunnlag for å avvise anerkjente restauranter.
4. Reparasjoner av kilde/transport/semantikk skal foregå i felles parser og ha positive og negative regresjonstester. Ikke senk live-validasjon, minstekrav, robots-/sikkerhetspolicy eller semantisk QA for å øke dekningstallet.
5. Publisering som **søkbar rett** krever fortsatt faktisk, fersk, kildestøttet rett og korrekt prissemantikk. Restaurant-only profiler for relevante smaksmenysteder uten individuelt prisede retter er et separat, ennå ikke godkjent produktarbeid; de skal ikke skjules eller tildeles oppdiktede retter.
6. Ferdigdekning skal måles som **verifiserte relevante restauranter publisert / alle verifiserte relevante restauranter**, med eksplisitt separat oversikt over `review`, `missing`, usikkerhet og kildedato. Et stort manifestantall eller grønn watcher er aldri fullgodt bevis.

Praktisk gjenopprettingskø for 28. oktober: [anerkjente Oslo-restauranter](./oslo-recognized-restaurants-recovery-2026-10-28.md). Den eksisterende [coverage census](./oslo-coverage-census-2026-09-21.md) forblir research-ledger; `apps/menu-worker/catalog/` forblir eneste produksjonskatalog.

## Coverage-policy: bred dekning av gode, ordinære restauranter

### Hvilke restauranter tilhører dekningsmålet?

Et sted er normalt innenfor når det er en aktiv, offentlig tilgjengelig, fysisk restaurant i Oslo kommune, tilbyr et reelt måltidstilbud og det finnes konkrete holdepunkter for at det er et godt eller relevant restaurantvalg. Vi skal dekke hele spennet:

- gode, vanlige bydels- og nabolagsrestauranter med bordservering eller et reelt spisetilbud;
- norsk/tradisjon, sjømat, europeiske og internasjonale kjøkken, familierestauranter og regionale spesialister;
- rimelige og mellomprisede steder **på lik linje med** fine dining, tasting-menu-restauranter og Michelin-restauranter;
- gode uavhengige pizzeriaer, sushi-, burger- og lignende restauranter når de har dokumenterbar kvalitet, særpreg eller er viktige lokale alternativer.

**Overlapp er ikke grunn til utelukkelse.** To gode italienske restauranter i samme bydel er fortsatt to relevante restauranter, selv når begge serverer pizza og pasta. Om stedet tilfører nye rettnavn, kan påvirke *arbeidsrekkefølge*, ikke om det hører hjemme i dekningsuniverset.

### Slik vurderer vi «god»

«God» er en dokumentert kvalitativ vurdering, ikke et vilkårlig krav om Michelin-stjerne, høy pris eller én bestemt Google-rating. Bruk samlet og etterprøvbar dokumentasjon:

1. Etabler faktisk identitet, adresse i Oslo, åpen drift og ordinært, vesentlig mattilbud.
2. Undersøk restaurantens egen profil/meny, kjøkken, faglige særpreg, normal drift, prisnivå og relevant serveringsform.
3. Vurder bredere kvalitets- og omdømmesignaler: VisitOSLO, Michelin, uavhengige restaurantguider, troverdige lokale redaksjoner, vedvarende lokal etterspørsel og flere konkrete gjesteerfaringer. Én listeplassering eller score er verken nødvendig eller tilstrekkelig.
4. Ta med reelle nabolagsfavoritter selv om de mangler guideomtale, dersom flere uavhengige holdepunkter støtter at de er gode ordinære restauranter.
5. Noter usikkerhet eller motstridende kilder som `review` i dekningsanalysen; ikke oppgi egen preferanse eller manglende kjennskap som bevis for «dårlig».

### Hva skal vi ikke samle ukritisk?

Vi skal **ikke** telle alle generiske pizza-, kebab-, burger- eller takeawayutsalg, alle kjedelokasjoner med nesten identisk tilbud eller alle serveringsregistrerte virksomheter bare for å øke antallet. Ren bar uten substansiell matservering, catering-only, lukket kantine, butikk/kiosk med mat som sideprodukt, virtuelt duplikatkjøkken, ikke-aktivt eller feilgeografisk sted er normalt utenfor.

Dette er en kvalitets-/serveringsvurdering, **ikke** et forbud mot kjøkkentyper. En særpreget eller veldrevet pizzeria kan være `core`; en generisk lavverdiavdeling skal ikke automatisk bli canonical. Steder uten klar klassifisering holdes i `review`, ikke avvises automatisk.

### To uavhengige porter: relevans og publiserbart menybevis

**Port A — redaksjonell restaurantdekning:** Er dette en god, ordinær restaurant som bør inngå i Oslo-universet? Her er et bekreftet tasting-/pakke-menykonsept, bildemeny, robotblokkert PDF eller manglende individuell rettpris **ikke** grunnlag for å kalle restauranten irrelevant.

**Port B — teknisk publisering:** Kan Fysen publisere faktiske retter, priser og menybevis trygt gjennom eksisterende canonical source/quality-gater? Bare steder som består Port B legges i `apps/menu-worker/catalog/` og materialiseres som søkbare restauranter under dagens arkitektur. Hvis Port A er bestått, men B feiler, skal stedet forbli **relevant / review / ikke publisert** med navngitt kildehindring – ikke `excluded` og ikke et oppdiktet menytreff.

Denne beslutningen oppretter **ikke** en alternativ produksjonskatalog eller en usikret restaurant-only-publisering. Eventuell fremtidig publisering av dokumentert restaurantprofil uten individuelle rettpriser krever egen datamodell- og UI-beslutning.

### Dekningskontroll og prioritering

- Kartlegg hele Oslo kommune systematisk per bydel, prisnivå og serverings-/kjøkkentype, med sentrum som eget søkeområde.
- Sammenhold hele den brede VisitOSLO-restaurantlisten, relevante temaguider, Michelin, uavhengige Oslo-guider, lokale kilder og konkret etterspørsel; identitet må kontrolleres mot faktisk adresse.
- Alle kandidater får `canonical`, `review`, `missing` eller begrunnet `excluded` i research-ledgeren. `review` teller **ikke** som dekket.
- Prioriter de viktigste uavklarte restaurantene først; marginal rettdekning og lett tilgjengelig parserkilde brukes som *rekkefølge-*, aldri som *utelukkelseskriterium*.
- Revisjoner skal rapportere både **andel relevante restauranter identifisert/klassifisert** og **andel relevante restauranter trygt publisert med søkbar meny**. Et høyt antall aksepterte kilder alene beviser ikke komplett restaurantdekning.

Det finnes ingen kunstig Oslo-kvote. Ambisjonen er **alle dokumenterbart gode ordinære restauranter**, mens en ferdigerklæring krever systematisk og kildebelagt avstemming av dekning – ikke bare en grønn fullkatalogtest. Gjeldende research-ledger er [Oslo coverage census](./oslo-coverage-census-2026-09-21.md).

## Status 20. august 2026

### Canonical produksjonskatalog

`apps/menu-worker/catalog/` er den eneste canonicale produksjonslisten. Dokumentasjonen skal ikke vedlikeholde et parallelt, håndskrevet restauranttall eller en katalogkopi som raskt blir utdatert.

Den operative batchmetoden og daterte, kildebundne kontrollmålinger dokumenteres i [`restaurant-production.md`](restaurant-production.md). Disse målingene er produksjonsbevis, ikke en alternativ katalog.

Antall restauranter er heller ikke et produktmål. En restaurant teller offentlig først når canonical manifest, production DB, watcher-state, søkeindeks, API og webflate er konsistente.

## Kildehierarki for restaurantmenyer

Fysen skal velge kilden som best dokumenterer hva restauranten faktisk serverer nå. Kildehierarkiet er:

1. **Restaurantens egen aktuelle meny er førstevalg.** Dette kan være first-party HTML, JSON-LD, PDF eller annen offisiell menypublikasjon.
2. Andre aktuelle first-party-flater kan brukes for identitet, rettsinformasjon, åpningstider og handlinger når de faktisk publiserer den relevante informasjonen.
3. **Foodora, Wolt eller tilsvarende kan brukes som sekundær priset service-meny** når restaurantens egen meny ikke er maskinlesbar, ikke publiserer priser pålitelig, eller restauranten eksplisitt bruker tjenesten som bestillingsflate.
4. En service-/delivery-meny beviser bare de rettene og prisene som faktisk finnes på den tjenesten. Den skal ikke omtales som restaurantens komplette dine-in-meny uten selvstendig bevis for dette.
5. Søkemotor-snutter, cachede/indexerte kopier og ikke-tilknyttede aggregatorsider er research-signaler, ikke canonical erstatning for en nåværende live-kilde.

At en restaurant mangler egen nettside er **ikke** i seg selv en avvisningsgrunn. Identiteten må fortsatt være sikkert etablert, og den valgte menyflaten må passere de samme live source-, safety- og quality-portene.

Denne modellen er viktig fordi Fysen ikke er en Foodora-/Wolt-katalog. Produktet skal kunne fortelle brukeren hvor en rett kan spises, også når den best maskinlesbare prisflaten tilfeldigvis er en leveringstjeneste.

## `minimumExpectedItems`: integritetsport, ikke kvote

`minimumExpectedItems` er fortsatt en hard fail-closed port. Men tallet skal representere **kildebevist minimumsdekning**, ikke hvor mange retter vi mener en restaurant burde ha.

Reglene er:

- minimumet skal begrunnes i den aktuelle canonical live-kilden og være høyt nok til å oppdage reelt parser-/kildetap;
- vi setter ikke vilkårlige terskler som 20 eller 30 bare fordi en restaurant eller et kjøkken forventes å være stort;
- en legitim kort meny kan være fullverdig Fysen-dekning dersom rettene er aktuelle, prisede og pålitelig ekstrahert;
- dersom direkte live-kildebevis viser at en tidligere rett faktisk er fjernet, skal en stale required-assertion og det source-backed minimumet oppdateres;
- minimumet skal **aldri** senkes for å skjule at parseren bare materialiserer en del av en kilde som fortsatt inneholder flere retter;
- representative dish-/price-assertions og forbidden assertions beholdes som separate kvalitetsporter.

Forskjellen er avgjørende: **en mindre faktisk meny er gyldig; parser-loss er ikke gyldig.**

## Kildetyper og transport

Piloten dekker flere reelle kildeklasser og parser-/transportvarianter:

- vanlige HTML-menyer;
- strukturert JSON-LD;
- PDF-meny;
- browser-renderte JavaScript-kilder;
- sekundære service-menyer når first-party meny ikke kan materialiseres forsvarlig;
- first-party booking-/order-handlinger der de kan verifiseres;
- separate og branch-scopede åpningstidskilder;
- eksplisitte redirect- og browser-data-origins gjennom `sourceSupport`.

Browser-fetch er ikke automatisk fallback. Det brukes bare når manifestet eksplisitt sier `fetchMode: "browser"`, vanlig HTTP ikke er tilstrekkelig, robots/sikkerhetsportene tillater det og origin-policyen er eksplisitt.

`sourceSupport` er en eksplisitt transportutvidelse, ikke en generell allowlist. Bare nødvendige, konkrete HTTPS-origins kan deklareres, og offentlig-nettverk/IP-validering gjelder fortsatt.

## Meny, åpningstider og handlinger er separate bevis

Menybevis skal ikke blokkeres av at kjøkkentidene er usikre, og åpningstidene skal ikke diktes opp fra vanlige venue-hours.

Når en first-party side publiserer åpningstider, men canonical hours-worker ikke sikkert kan tolke dem som kjøkkentider, kan manifestet bruke eksplisitt `provisional` eller `unverified` hours-status. Da kan den verifiserte menyen fortsatt være søkbar, men Fysen skal vise `opening: unknown` til kjøkkentidene faktisk er verifisert.

Booking/order deklareres bare når destinasjonen kan verifiseres. En delivery-plattform som brukes som menybevis blir ikke automatisk en canonical handling uten egen action-verifikasjon.

## Restaurant-onboarding

Onboardingflyten er manifestbasert:

`candidate manifest -> source/safety -> live extraction -> source-backed minimum + dish/price assertions -> action verification -> hours gate/audit -> merge -> separat byte-identisk promotion -> production materialization/proof`

Viktige regler:

- `candidates/` er read-only staging og aktiverer aldri en restaurant i produksjon;
- live candidate-gaten bruker samme runtime-primitiver som production watcher;
- den aktuelle live-kilden, ikke et gammelt søkeindeksutdrag, bestemmer hvilke assertions som er sanne;
- parser-/transportfeil løses generisk med regresjonstester, aldri med restaurantspesifikke runtime-unntak;
- parser-/sikkerhetsgrenser svekkes ikke for å få en kandidat grønn;
- en god kandidat skal heller ikke forkastes fordi et historisk eller vilkårlig item-tall er høyere enn den faktiske menyen;
- promotion skjer i en separat PR som flytter eksakt samme validerte manifest byte-for-byte fra `candidates/` til `catalog/`;
- etter promotion må production DB, watcher, production-search, API og web inngå i produksjonsbeviset før restauranten kalles offentlig ferdig.

## Production proof

Repo-merge og grønn CI er ikke alene offentlig produksjonsbevis.

Den permanente production proof-porten skal blant annet kontrollere:

1. aktiv restaurant i production DB;
2. riktig canonical menu-source og enabled source;
3. fersk source-state;
4. publisert latest snapshot over manifestets source-backed minimum;
5. akseptert siste menu-watch;
6. representative direkte `searchDishes`-smokes uten Revenue/search-funnel-events;
7. offentlig browse-API;
8. offentlig webflate.

Production proof skal være rødt dersom lagene ikke er synkrone. Vercel-release beholdes batchet for å unngå unødvendig deployforbruk; proof-porten skal avdekke drift, ikke omgå release-kontrakten.

Den samlede closeout-kontrakten, mobilreisene og de representative produksjonsgatene er låst i [`fysen-oslo-v1-closeout.md`](./fysen-oslo-v1-closeout.md).

## Utforsk Oslo / Alle retter

`/search?city=Oslo` uten `q` er discovery-flaten over den samme ferske rettindeksen som søkeproduktet. Det skal ikke finnes en parallell restaurant- eller rettdatabase for discovery.

Forsiden og Alle retter bruker den ikke-attribuerende browse-indeksen. Bakgrunnsvisninger skal derfor ikke skape `search_events` eller impressions; bare eksplisitte brukersøk inngår i demand-funnelen.

Canonical dish concepts og kuraterte aliaser brukes når identiteten faktisk er bevist. Fuzzy/semantisk likhet alene skal aldri gjøre en annen rett til et sikkert treff.

Browse-flaten er en forbrukerkatalog, ikke en dump av parseroutput. API-et skal derfor klassifisere og telle drikke, saus/tilbehør, modifier, allergen-/informasjon, menyoverskrifter og ugyldige fragmenter før publisering. Bare faktiske retter canonicaliseres og vises.

## Demand-loop

Videre coverage styres av ekte, fortsatt uløste behov:

1. samle eksplisitte brukersøk;
2. replay historiske null-/fuzzy-signaler mot dagens ferske indeks;
3. fjern signaler som nå løses sikkert;
4. prioriter gjenværende reelle gap;
5. avgjør om gapet best løses med alias/canonicalisering, parserforbedring, ny restaurant eller bredere geografisk/kjøkkenmessig dekning.

Historiske nulltreff er etterspørselsdata, ikke automatisk backlog. På samme måte er restaurantantall og menyantall kvalitetsdata, ikke kvoter.

## Produktmål

Ved avslutning av Oslo Pilot v1 skal Fysen kunne:

1. indeksere et representativt sett Oslo-restauranter fra flere reelle menykildetyper;
2. vise en navigerbar oversikt over ferske retter i Oslo;
3. forstå trygge aliaser og moderate stavevariasjoner uten å dikte opp rettelikhet;
4. vise avstand og støtte nærhetsrangering når brukeren deler posisjon;
5. vise åpningstilstand bare når den er kildebelagt og fersk, ellers `unknown`;
6. vise rett, pris, restaurant, menyferskhet og kilde tydelig;
7. skille restaurantens egen meny fra sekundær delivery/service-meny når dette er relevant for provenance;
8. gjøre det lett å gå videre til restaurant, veibeskrivelse, booking eller bestilling når handlingen er verifisert;
9. måle ekte etterspørsel uten at QA eller discovery forurenser dataene;
10. bruke reelle demand-gap til å styre videre coverage.

## Kommersiell rekkefølge

Revenue Layer R1/R2 etablerer funnel-måling og verifiserte handlinger. Deretter følger Claim Restaurant og Fysen Pro på den samme canonical restaurantidentiteten. Betalt plassering eller sponsing skal aldri kunne dikte opp rettetilgjengelighet eller overstyre kilde-/ferskhetsbevis.

## Suksesskriterium

Piloten er vellykket når en bruker i Oslo kan søke eller utforske en konkret rett og få et **troverdig, ferskt og handlingsklart resultat** som viser hvor retten faktisk kan spises, med tydelig provenance og uten at tekniske kvoter forveksles med produktkvalitet.

Revenue- og konverteringsdelen er spesifisert i [`revenue-layer-v1.md`](./revenue-layer-v1.md).

## Hva som skjer etter Oslo v1

Oslo-piloten skal production-lukkes før neste store consumerfase starter. Videre restaurant-onboarding er da løpende innholdsproduksjon, ikke en produktblocker.

Fysen v2 er definert i [`fysen-v2.md`](./fysen-v2.md) som personlig og forklarbar matoppdagelse basert på eksplisitte brukersignaler. Planen åpner ikke ratings/reviews, sosial feed, map-first restaurantguide eller generell AI-chat. Flere byer og Pro v2 følger som separate spor etter at Oslo v1 er bevist stabil.
