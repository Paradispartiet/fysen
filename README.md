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
- **Database (neste leveranse):** PostgreSQL + PostGIS
- **Search (neste leveranse):** PostgreSQL FTS + `pg_trgm`
- **Browser crawling (neste leveranse):** Playwright som fallback etter vanlig HTTP

Se [`docs/architecture.md`](docs/architecture.md) og [`docs/adr/0001-technology-stack.md`](docs/adr/0001-technology-stack.md).

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

## Monorepo

```text
apps/
  web/          Fysen for brukere
  api/          versjonert offentlig API
  menu-worker/  menyinnhenting og endringspipeline
packages/
  contracts/    canonical runtime-validerte kontrakter
  menu-core/    deterministisk meny-/rettlogikk
```

Fysen er foreløpig et privat kommersielt prosjekt. Ingen lisens er gitt for gjenbruk av kildekoden.
