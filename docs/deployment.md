# Fysen production database deployment

Fysen deploys PostgreSQL/PostGIS schema changes from GitHub. The ChatGPT Supabase connector is not part of the production deployment path.

## Production invariant

The repository is the source of truth for database schema.

```text
feature branch
  -> CI quality + PostGIS database test
  -> merge main
  -> CI quality + PostGIS database test
  -> Deploy Fysen database
  -> migration advisory lock + transaction
  -> production verification
```

Do not create or alter Fysen canonical tables manually in the Supabase Dashboard. Add a versioned SQL file under `packages/database/migrations/` instead.

## Required GitHub configuration

Configure these once in `Paradispartiet/fysen` under **Settings -> Secrets and variables -> Actions**.

### Repository secret

`FYSEN_PRODUCTION_DATABASE_URL`

Use the Fysen Supabase project's **Session pooler** PostgreSQL connection URI. Keep the URI only in GitHub Secrets; never commit it, paste it into issues, or put it in workflow YAML.

The production workflow sets `DATABASE_SSL=verify-full`. The database client verifies both the certificate authority and server hostname against the bundled public Supabase Root 2021 CA at `packages/database/certs/supabase-root-2021-ca.crt`. The certificate is a public trust anchor, not a credential. The workflow also pins its SHA-256 certificate fingerprint and rejects a changed or near-expiry certificate.

Connection-string TLS query parameters (`sslmode`, `sslcert`, `sslkey`, `sslrootcert`) are stripped before creating the Node `pg` pool. TLS policy therefore has one canonical owner: the explicit `ssl` object in `@fysen/database`.

`DATABASE_SSL_CA_PATH` can override the bundled CA during a future Supabase CA rotation. A rotation must be handled as a reviewed code/config change, never by setting `rejectUnauthorized=false`.

### Repository variable

`FYSEN_DATABASE_DEPLOY_ENABLED=true`

Automatic production deployment remains disabled while this variable is absent or not equal to `true`.

## First deployment

After the secret is configured:

1. Open **Actions -> Deploy Fysen database**.
2. Choose **Run workflow**.
3. Enter `DEPLOY` in the confirmation input.
4. Confirm that `Validate bundled Supabase root CA` succeeds.
5. Confirm that `Apply pending production migrations` succeeds.
6. Confirm that `Verify production database` succeeds.

After the first successful deployment, set `FYSEN_DATABASE_DEPLOY_ENABLED=true` if it is not already set. Future successful `main` CI runs will deploy pending migrations automatically.

## Safety properties

- Production deploy never starts from a failed CI run.
- Pull-request CI never touches production.
- Production database deploys are serialized with `cancel-in-progress: false`.
- Database transport uses certificate and hostname verification; TLS verification is never disabled to work around provider certificates.
- The database migrator uses an advisory lock, so concurrent schema migration attempts cannot apply the same pending migration in parallel.
- Every migration is transactional and recorded in `fysen.schema_migrations`.
- Post-deploy verification fails if repository migrations and remote migration history diverge.
- Post-deploy verification requires `pgcrypto`, `postgis`, `pg_trgm`, and all canonical Fysen menu-index tables.
- No Supabase account access token is required by this deployment path.

## Rollback policy

Do not edit an already-applied migration. Create a new forward migration that repairs the schema. Production database resets are forbidden.

If a migration fails, the transaction is rolled back and the GitHub job becomes red. Diagnose the failing migration, add a forward fix on a branch, pass CI, and merge normally.

## Production project

Current Fysen Supabase project ref: `voglczzxtbwcxjrbffbt`.

The project ref is an identifier, not a credential. Database passwords and connection strings remain secrets.
