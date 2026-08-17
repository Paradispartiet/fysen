# GitHub Pages functional search

Den offentlige `fysen-preview`-siden er en statisk eksport av den private Fysen-webappen. Produksjonsappen på Vercel beholder server-side søk, mens Pages-previewen bruker en egen klientadapter mot `https://fysen-api.vercel.app`.

## Sikkerhetsgrenser

- Backend-, database- og serverkode publiseres ikke i preview-repoet.
- API-CORS er avgrenset til `https://paradispartiet.github.io` og localhost i utvikling.
- Previewen validerer API-responsen med samme `dishSearchResponseSchema` som produksjonswebben.
- Funnel-tracking er deaktivert i offentlig preview for å unngå testtrafikk i konverteringsdata.
- Pages-bygg feiler hvis den statiske `/search/`-ruten eller API-koblingen mangler.

Dette er en preview-adapter, ikke en alternativ søkemotor eller separat produktkontrakt.
