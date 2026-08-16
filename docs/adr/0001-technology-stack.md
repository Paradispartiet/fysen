# ADR 0001 — Technology stack

- Status: Accepted
- Date: 2026-08-16

## Decision

Fysen is TypeScript-first.

- Node.js 24 LTS
- React 19 + Next.js 16 for consumer web
- NestJS 11 + Fastify for the versioned API
- pnpm workspace + Turborepo
- Zod 4 for runtime contracts
- Vitest for domain tests
- PostgreSQL + PostGIS for persistence/geospatial queries (next delivery)
- Playwright only when a menu cannot be fetched without a browser (next delivery)

## Why

The product is dominated by web ingestion, API contracts, search-facing types and UI. One strict TypeScript codebase reduces translation boundaries and allows domain contracts to be shared safely without coupling the domain to the transport or database.

## Explicit non-decisions

We are not starting with microservices, Kubernetes, Elasticsearch or Python services. Each can be introduced only when a measured requirement justifies the operational complexity.
