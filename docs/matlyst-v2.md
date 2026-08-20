# Matlyst v2

Matlyst er Fysens oppdagelseslag for mat. Det skal hjelpe brukeren å finne en rett både når brukeren vet hvilket kjøkken de ønsker, og når de bare vet hva som frister.

## Produktkontrakt

Matlyst har to separate innganger:

1. **Hva frister?** organiserer etter brukerintensjon og rettstype, for eksempel pizza, burger, nudler, curry, dumplings, tacos, fried chicken og vegetar.
2. **Kjøkken** organiserer etter mattradisjon. Det er ikke en erstatning for rettsøk og skal ikke ha en parallell restaurantdatabase.

Begge innganger skal ende i den samme canonical rettsøk-/browse-flaten som resten av Fysen. Live-dekning beregnes fra `DishBrowseResponse`; Matlyst skal ikke fabrikkere restauranttall eller summere overlappende menyvarianter.

## Taksonomi v2

Den gamle toppkategorien `Asiatisk` var for bred og inkonsistent med at `Indisk` allerede var et eget kjøkken. V2 presenterer derfor eksisterende canonical innhold som egne kjøkken uten å migrere matkunnskapsdata unødvendig:

- Japansk → eksisterende `Asiatisk / Japan`
- Kinesisk → eksisterende `Asiatisk / Kina`
- Thai → eksisterende `Asiatisk / Thailand`
- Vietnamesisk → eksisterende `Asiatisk / Vietnam`
- Indisk → Nord-India, Sør-India og Hyderabad
- Italiensk → Roma, Napoli og Sicilia
- Midtøsten → Levanten og Egypt
- Tyrkisk → eksisterende `Midtøsten / Tyrkia`
- Mexicansk → Sentral-Mexico, Jalisco, Yucatán og Baja

`Fast food` er ikke lenger et kjøkken i Matlyst. Burger og fried chicken er brukerintensjoner under **Hva frister?**.

## Live-dekning og rangering

Når browse-data er tilgjengelig, rangeres kjøkken etter beste dokumenterte ferske dekning blant kjøkkenets canonical retter. De åtte best rangerte vises først, mens resten ligger bak **Flere kjøkken**. Når live-data mangler, brukes den eksplisitte produktrekkefølgen som stabil fallback.

Kortene under **Hva frister?** bruker canonical retter som representative signaler. Kortet viser ett ferskt eksempel med et konservativt restaurantminimum, men lenken går til et vanlig brukersøk for hele lystbegrepet.

## Datagrense

Produksjonskatalogen for restauranter har allerede bredere kjøkkenrepresentasjon enn canonical Matlyst-data. Blant annet finnes menygrunnlag for brasiliansk, koreansk og filippinsk mat. Disse skal ikke hardkodes direkte inn i UI-et. Neste utvidelse skal først legge representative retter inn i canonical rettskatalogen og deretter aktivere kjøkkenet i Matlyst. Slik unngår vi en ny parallell taksonomi.

## Neste utvidelser

Prioritert videre arbeid er å utvide canonical rettskatalog og Matlyst med kjøkken som allerede har reell Oslo-produksjonsdekning, først koreansk, filippinsk, brasiliansk, pakistansk/nepalsk og persisk/sentralasiatisk. Deretter kan vi vurdere norsk/nordisk, fransk, spansk, gresk, etiopisk/eritreisk og andre kjøkken når retts- og restaurantdekningen kan underbygges.

Matlyst skal fortsatt være en oppdagelsesflate over Fysens eksisterende sannhetskilder: restaurantkatalog, materialisert menydata, canonical retter og den samme ferske browse-indeksen som «Alle retter».
