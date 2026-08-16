# Fysen

**Søk på retten. Finn stedet.**

Fysen er en rett-først søketjeneste for restauranter. Brukeren skriver retten de har lyst på, og Fysen viser restauranter som faktisk har retten på en fersk, sporbar meny.

## Produktløfte

> Jeg vet hva jeg vil spise. Hvor får jeg det nå?

Fysen skal svare med høy presisjon, ferskhet og kildebelegg. En rett skal aldri vises som tilgjengelig bare fordi en modell antar at restauranten sannsynligvis serverer den.

## Arkitektur

- **Web:** React + Next.js + TypeScript
- **API:** NestJS + Fastify + TypeScript
- **Menu Watcher:** separat TypeScript-worker
- **Canonical contracts:** Zod + TypeScript
- **Database:** PostgreSQL 17 + PostGIS i eget `fysen`-schema
- **Search foundation:** `pg_trgm` + geografisk GIST-indeks
- **HTTP ingestion:** robots-aware HTTP først, strukturert JSON-LD før heuristikk
- **Browser crawling:** Playwright kommer senere som kontrollert fallback for JavaScript-menyer

Se [`docs/architecture.md`](docs/architecture.md), [`docs/menu-watcher-v1.md`](docs/menu-watcher-v1.md) og arkitekturbeslutningene under [`docs/adr`](docs/adr).

## Kom i gang

Krav: Node.js 24 LTS og pnpm 11.

```bash
pnpm install
pnpm dev
```

Kvalitetsport:

```bash
pnpm check
```

Database lokalt:

```bash
cp .env.example .env
pnpm db:migrate
pnpm db:test:integration
```

Manuell, ikke-publiserende menyprobe:

```bash
pnpm --filter @fysen/menu-worker probe -- https://restaurant.example/menu
```

Den første Oslo-piloten er eksplisitt manuell og krever `DATABASE_URL`:

```bash
pnpm --filter @fysen/menu-worker pilot:rodeo
```

## Monorepo

```text
apps/
  web/          Fysen for brukere
  api/          versjonert offentlig API
  menu-worker/  menyinnhenting og endringspipeline
packages/
  contracts/    canonical runtime-validerte kontrakter
  database/     migrasjoner og persistence
  menu-core/    deterministisk meny-/rettlogikk
```

## Datakvalitetsregler

- ingen søkbar rett uten sporbar kilde og verifiseringstidspunkt
- AI får ikke opprette tilgjengelighet ved søketid
- en dramatisk nedgang i ekstraherte retter går i karantene i stedet for å bli publisert
- rå HTML er transportbelegg, ikke canonical domenedata
- live restaurantnettsteder er aldri en nødvendig avhengighet for CI

Fysen er foreløpig et privat kommersielt prosjekt. Ingen lisens er gitt for gjenbruk av kildekoden.
