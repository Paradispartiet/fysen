# Fysen Design v2.1

Design v2.1 er den visuelle fasiten for Fysen.

## Produktuttrykk

Fysen skal føles som moderne matoppdagelse kombinert med en presis søkemotor: mørkt, rolig, appetittvekkende og lett å skanne. Det skal ikke se ut som en generisk tech-startup eller en ratingsdrevet restaurantguide.

## Brand

Ordmerket skrives alltid `fysen`, uten punktum. Punktum skal ikke brukes som del av logoen eller det visuelle ordmerket.

## Farger

- Hovedbakgrunn: nær sort, `#060706`
- Kort/paneler: sort eller nesten sort, aldri brungrønne flater
- Primærtekst: `#F1F4EF`
- Sekundærtekst: `#ABB3AA`
- Fysen-grønn: `#79C987`
- Grønn hover: `#8BD999`

Grønt er en signalfarge, ikke en flatefarge. Det brukes på tynne rammer, fokus, ferskhet, enkelte etiketter, CTA og noen få illustrasjonsdetaljer. Resultatkort, forslag, ingrediensfelt og andre informasjonsbokser skal ikke ha grønn bakgrunn.

Oransje skal ikke brukes som generell fokusramme, primær CTA eller dominerende dekorasjon.

## Typografi

Primær font er DM Sans Variable, men uttrykket skal være åpnere enn i v2. Hovedoverskriften skal ha lavere vekt, mer linjeavstand og mindre negativ tracking. Resultattitler og logo skal også være lettere. Målet er høy lesbarhet fremfor kompakt displaytypografi.

## Forside

Forsiden består av:

1. global header med `fysen` og Oslo;
2. luftig «Hva har du lyst på?»-hero;
3. én tydelig, ren matillustrasjon i sin egen plass, aldri over søkefelt eller CTA;
4. stort, sort søkefelt med grønn CTA og subtil grønn focus state;
5. proof-tekst om ferske, sporbare menyer;
6. permanent `SuggestionRail` med «Forslag akkurat nå».

Heroillustrasjonen skal være tydelig matspesifikk, ha færre og renere streker, lys hovedstrek og bare noen få grønne detaljer. Den skal ikke bruke tilfeldige doodle-elementer eller overlappe funksjonelle kontroller.

## SuggestionRail

Forslagsflaten skal være sort med en tynn grønn outline. Forslagskortene er kompakte, sorte og har tynn grønn outline. Editoriale forslag skal ikke repetere etiketten `Forslag` på hvert kort. Bare faktisk betalt innhold merkes `Sponset`.

Forslagsflaten er sponsor-klar. Sponsing kan påvirke plassering, men aldri menybevis, pris, tilgjengelighet, ferskhet eller matchscore.

## Søk

Søkefeltet har mørk nøytral ramme i hvile. Først ved fokus blir rammen diskret grønn. Det skal aldri oppstå en oransje fokusramme. `Finn retten` er grønn, men skal være mindre og mindre avrundet enn i v2.

## Søkeresultater

Hvert resultat er et tydelig, sort kort med:

- sort bakgrunn uten grønn fill;
- tynn grønn outline;
- 12–14 px radius;
- klar topp-rad med rett og pris;
- restaurant som tydelig sekundærinformasjon;
- beskrivelse;
- eventuell `DishComposition`;
- ryddig metadata;
- separate statusindikatorer for ferskhet og åpning;
- egen handlingfooter.

Kortene kan få en sterkere grønn outline ved hover, men bakgrunnen forblir sort.

## DishComposition

`I denne retten` kan bare vises når menybeskrivelsen selv gir et tilstrekkelig strukturerbart grunnlag. Komponenten skal aldri fylle inn generelle oppskriftsingredienser som om de var restaurantens faktiske ingredienser.

Selve boksen og ingrediens-chips skal være sorte/transparente med tynne grønne rammer, ikke grønne flater.

## Metadata og status

Adresse, avstand og menyseksjon vises som vanlig metadata uten unødvendig understreking. Åpent/stengt-status og ferskhet vises som kompakte status-pills med sort bakgrunn og tynn kant. Grønt brukes sterkest når statusen faktisk er positiv eller fersk.

## Handlinger

Primær konverteringshandling, som `Bestill bord` eller `Bestill mat`, bruker Fysen-grønn. Sekundære handlinger skal være færre og roligere: `Meny`, `Åpningstider` og `Gå dit`. Restaurantens navn kan selv være lenke til restaurantens nettsted når en verifisert URL finnes.

## Rytme og radius

Bruk et konsekvent spacing-system basert på 8/12/16/24/32/48/64 px. Kort og paneler skal generelt ha mindre radius enn v2; Fysen skal føles mer editorial/gastronomisk og mindre som et generisk SaaS-grensesnitt.

## Responsivitet

Design v2.1 skal behandles som tre reelle viewport-klasser:

- desktop ca. 1440×900;
- iPad ca. 1024×1366;
- mobil ca. 390×844.

På iPad skal heroillustrasjonen ha sin egen kolonne og ikke kunne krysse søkefeltet. På mobil flyttes illustrasjonen til en egen plass under hovedinnholdet. Forslag kan scrolles horisontalt og resultathandlinger kan wrappe.

## Skal ikke brukes

Ingen kremgul/beige hovedpalett, brungrønne kortflater, grønne fills i informasjonsbokser, ratings/stjerner, stockfoto, glassmorphism, neon, store tilfeldige shadows, skjult sponsing, generiske AI-markedsføringspåstander eller udokumenterte «beste»-påstander.
