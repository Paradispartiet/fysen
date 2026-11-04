# Fysen Free – kontrollert identitetskarantene

Formål: Hindre at menyer med dokumentert feil eller ubekreftet restaurantidentitet vises som sikre offentlig søketreff. Dette er en **manuell, kildebasert beslutning**, ikke en automatisk reaksjon på 404, valutafeil eller parsersvikt.

## Register

- Endre `apps/menu-worker/free-identity-quarantines.json` i en egen PR.
- Hvert vedtak må ha entydig restaurant-`slug`, **eksakt eksisterende kildeadresse** (`expectedSourceUrl`), kanonisk GitHub-issue i dette repoet, faktisk vedtaksdato (`quarantinedAt`) og `code: "identity-unverified"`.
- Dokumenter i saken hvor restaurantens **navn, kontaktopplysninger og adresse** er bekreftet eller motsagt. Kontorbedrifter på samme adresse eller en nabokantine er ikke automatisk samme restaurant.
- Fysens validering avviser duplikater, ugyldige datoer, manglende saksreferanse, usikre URL-er og endringer som ikke samsvarer med allerede publisert kildeslot/katalog.
- Uten et spesifikt godkjent vedtak skjer **ingen automatisk identitetskarantene** basert bare på kildefeil.

## Virkning

Ved neste begrensede gratisoppdatering blir bare denne kildens menyrader skjult fra **aktiv statisk søkeindeks**. Restaurant og kilde beholder plass og indeksnummer. Git-historikken i `fysen-free-public-index` bevarer tidligere innhold. Manifestet lagrer karantenekode, restaurant, issue, dato og antall skjulte retter. Kilden forsøkes ikke automatisk oppdatert mens vedtaket gjelder. De øvrige kildene fortsetter innenfor vanlig 12-kildersbudsjett.

En etterfølgende rutinemessig re-henting kan **ikke** automatisk fjerne karantenen. Å slette en aktiv regel uten godkjent gjenåpningslogikk gir en feil i stedet for å vise gamle retter igjen.

## Gjenåpning

Lag et separat PR-vedtak med dokumentert rett restaurantidentitet, korrekte priser i NOK, kildebevis for alle obligatoriske rett- og prisankre og en ny test av gjenåpning. Først da kan kilden frigjøres gjennom en eksplisitt, testet gjenåpningsmekanisme. **Ikke** fjern bare JSON-regelen.

## Vedtak 2026-11-05

City Work, Akersgata 34: [issue #1133](https://github.com/Paradispartiet/fysen/issues/1133). Både dansk og norsk SE MENY-variant ga 31/31 ikke-NOK-rader. Telefon og adresse peker også til en annen virksomhet. [PR #1137](https://github.com/Paradispartiet/fysen/pull/1137) skjulte 31 aktive menyposter uten å fjerne kildehistorikken. Ingen annen restaurant berøres av vedtaket.

## Vedtak 2026-11-05 – Falafel Station

[Falafel Station-sak #1139](https://github.com/Paradispartiet/fysen/issues/1139): SE MENY-kilden oppgav en dansk kyllingmeny med **66/66 fremmedvaluta-merkede** retter og kontaktinformasjon for King Falafel. [Brønnøysundregistrene](https://virksomhet.brreg.no/nb/oppslag/underenheter/823399332) registrerer King Falafel AS på Brugata 1, og [King Falafels egen kontakt](https://kingfalafel.no/contact) bekrefter samme telefon. Fysen har allerede en separat, kildekontrollert King Falafel-oppføring. Vi skjuler kun Falafel Stations uverifiserte menyposter fra aktivt søk; King Falafel, kildehistorikken og de andre restaurantene skal ikke endres. Dette avgjør ikke om navnet Falafel Station historisk har vært i drift. Gjenåpning krever selvstendig identitet og norsk menybevis.
