#!/usr/bin/env bash
# Manual-only encrypted full Fysen schema backup. Nothing is uploaded by this script.
set +x
set -euo pipefail
umask 077

error() { printf 'Fysen backup refused: %s\n' "$*" >&2; exit 1; }

# Never allow a GitHub runner to turn private rows into CI artifacts or logs.
[[ "${GITHUB_ACTIONS:-}" != "true" && "${CI:-}" != "true" ]] || error "run only on a trusted local machine, not CI"
for program in pg_dump age sha256sum date mv stat; do
  command -v "$program" >/dev/null 2>&1 || error "required program missing: $program"
done

[[ -n "${PGHOST:-}" && -n "${PGUSER:-}" && -n "${PGDATABASE:-}" ]] || error "set PGHOST, PGUSER and PGDATABASE"
[[ "${PGDATABASE}" == "postgres" ]] || error "PGDATABASE must be postgres"
# libpq may connect to PGHOSTADDR instead of the checked PGHOST, or inherit
# parameters from a named connection service. Refuse both override mechanisms.
[[ -z "${PGHOSTADDR:-}" && -z "${PGSERVICE:-}" && -z "${PGSERVICEFILE:-}" ]] || error "PGHOSTADDR and PGSERVICE overrides are forbidden"

# Match complete Supabase endpoints, not just a project-ref substring. The
# session pooler needs the project suffix on the username as well.
source_ref="voglczxxtbwcxjrbffbt"
if [[ "${PGHOST,,}" == "db.${source_ref}.supabase.co" ]]; then
  [[ "${PGUSER,,}" == "postgres" ]] || error "direct connection requires postgres user"
elif [[ "${PGHOST,,}" =~ ^aws-[0-9]+-[a-z0-9-]+\.pooler\.supabase\.com$ ]]; then
  [[ "${PGUSER,,}" == "postgres.${source_ref}" ]] || error "pooler connection requires the original project's postgres user"
else
  error "host must be the exact original Supabase direct host or an official session-pooler host"
fi
[[ "${PGPORT:-5432}" == "5432" ]] || error "use port 5432 (direct or session pooler), not transaction pooling"
[[ -n "${PGPASSWORD:-}" || -n "${PGPASSFILE:-}" ]] || error "set PGPASSFILE (preferred) or PGPASSWORD securely"

# Database dumps contain private records: encryption alone is insufficient
# without authenticating the database server's certificate and hostname.
[[ "${PGSSLMODE:-}" == "verify-full" ]] || error "PGSSLMODE=verify-full is required"
[[ "${PGSSLROOTCERT:-}" == /* && -f "${PGSSLROOTCERT:-}" && -r "${PGSSLROOTCERT:-}" ]] || error "PGSSLROOTCERT must be an absolute path to a readable trusted Supabase CA certificate"
[[ -n "${FYSEN_BACKUP_AGE_RECIPIENT:-}" ]] || error "FYSEN_BACKUP_AGE_RECIPIENT is required"
[[ "${FYSEN_BACKUP_AGE_RECIPIENT}" == age1* ]] || error "use an age X25519 public recipient (age1...)"
[[ -n "${FYSEN_BACKUP_DEST:-}" && "${FYSEN_BACKUP_DEST}" == /* ]] || error "FYSEN_BACKUP_DEST must be an existing absolute directory"
[[ -d "${FYSEN_BACKUP_DEST}" && -w "${FYSEN_BACKUP_DEST}" && ! -L "${FYSEN_BACKUP_DEST}" ]] || error "backup destination must be an existing writable real directory"
[[ "$(stat -c '%u' -- "$FYSEN_BACKUP_DEST")" == "$EUID" && "$(stat -c '%a' -- "$FYSEN_BACKUP_DEST")" == "700" ]] || error "backup destination must be owned by the current user and have mode 0700"

# Use the PostgreSQL 17 client for the PostgreSQL 17 source. Avoid accidental
# client-server major incompatibility when restoring into a comparable staging DB.
pg_version="$(pg_dump --version)" || error "pg_dump version check failed"
[[ "$pg_version" == *"PostgreSQL) 17."* ]] || error "PostgreSQL 17 pg_dump required (observed: $pg_version)"

export PGCONNECT_TIMEOUT="${PGCONNECT_TIMEOUT:-15}"
export PGOPTIONS='-c default_transaction_read_only=on'
stamp="$(date -u +%Y%m%dT%H%M%SZ)"
base="fysen-original-${stamp}-${BASHPID}.pgdump.age"
archive="${FYSEN_BACKUP_DEST%/}/$base"
partial="${archive}.partial"
[[ ! -e "$archive" && ! -e "$partial" && ! -e "${archive}.sha256" ]] || error "backup name already exists; refusing to overwrite"
trap 'rm -f -- "$partial"' EXIT

# No unencrypted dump is ever written to a file. pg_dump creates a consistent
# read-only snapshot; the only persisted bytes are age ciphertext.
pg_dump --no-password --format=custom --compress=6 --schema=fysen --lock-wait-timeout=5s \
  | age -r "$FYSEN_BACKUP_AGE_RECIPIENT" > "$partial"
[[ -s "$partial" ]] || error "encrypted output is empty"
mv -- "$partial" "$archive"
(
  cd -- "$FYSEN_BACKUP_DEST"
  sha256sum -- "$base" > "${base}.sha256"
)
trap - EXIT
printf 'Encrypted Fysen schema backup saved: %s\n' "$archive"
printf 'SHA-256 manifest saved: %s.sha256\n' "$archive"
printf 'Not yet restore-verified; decrypt and restore only on secured staging.\n'
