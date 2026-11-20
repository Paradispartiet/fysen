#!/usr/bin/env bash
# Focused, offline safety tests: fake programs, no Supabase connection, no private rows.
set -euo pipefail
root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
script="$root/fysen-private-full-backup.sh"
work="$(mktemp -d)"
trap 'rm -rf -- "$work"' EXIT
mkdir -p "$work/bin" "$work/archive"
cat > "$work/bin/pg_dump" <<'MOCK'
#!/usr/bin/env bash
set -euo pipefail
if [[ "${1:-}" == "--version" ]]; then echo 'pg_dump (PostgreSQL) 17.6'; exit 0; fi
[[ " $* " == *" --schema=fysen "* ]] || exit 80
[[ " $* " == *" --no-password "* ]] || exit 81
[[ "${PGOPTIONS:-}" == '-c default_transaction_read_only=on' ]] || exit 82
[[ "${PGSSLMODE:-}" == 'verify-full' ]] || exit 83
if [[ "${MOCK_DUMP_FAIL:-}" == 1 ]]; then echo 'mock dump failure' >&2; exit 67; fi
printf 'TEST-DUMP-CONTENT-NOT-PRIVATE'
MOCK
cat > "$work/bin/age" <<'MOCK'
#!/usr/bin/env bash
set -euo pipefail
[[ "$1" == '-r' && "$2" == age1* ]] || exit 84
if [[ "${MOCK_AGE_FAIL:-}" == 1 ]]; then echo 'mock encryption failure' >&2; exit 75; fi
printf 'MOCK-ENCRYPTED-'
cat
MOCK
chmod 700 "$work/bin/pg_dump" "$work/bin/age"
export PATH="$work/bin:$PATH"
export PGHOST='db.voglczxxtbwcxjrbffbt.supabase.co'
export PGUSER=postgres
export PGDATABASE=postgres
export PGPASSWORD='fake-test-password'
export PGSSLMODE=verify-full
printf 'FAKE-CA-FOR-TESTS\n' > "$work/fake-ca.crt"
export PGSSLROOTCERT="$work/fake-ca.crt"
export FYSEN_BACKUP_AGE_RECIPIENT='age1fakepublickeyfortests'
export FYSEN_BACKUP_DEST="$work/archive"
chmod 700 "$FYSEN_BACKUP_DEST"
unset CI GITHUB_ACTIONS || true
bash "$script" > "$work/out"
test "$(find "$work/archive" -type f -name '*.pgdump.age' | wc -l)" -eq 1
file="$(find "$work/archive" -type f -name '*.pgdump.age')"
test "$(cat "$file")" = 'MOCK-ENCRYPTED-TEST-DUMP-CONTENT-NOT-PRIVATE'
( cd "$work/archive" && sha256sum -c "$(basename "$file").sha256" ) >/dev/null

# Wrong source must be refused without writing ciphertext.
export PGHOST='db.txaopscyxjvvmwawsphk.supabase.co'
if bash "$script" > /dev/null 2>&1; then echo 'wrong source accepted' >&2; exit 1; fi
export PGHOST='db.voglczxxtbwcxjrbffbt.supabase.co.attacker.example'
if bash "$script" > /dev/null 2>&1; then echo 'hostname suffix spoof accepted' >&2; exit 1; fi
export PGHOST='db.voglczxxtbwcxjrbffbt.supabase.co'
export PGHOSTADDR='203.0.113.9'
if bash "$script" > /dev/null 2>&1; then echo 'PGHOSTADDR redirect accepted' >&2; exit 1; fi
unset PGHOSTADDR
export PGSERVICE='attacker'
if bash "$script" > /dev/null 2>&1; then echo 'PGSERVICE override accepted' >&2; exit 1; fi
unset PGSERVICE
export PGPORT=6543
if bash "$script" > /dev/null 2>&1; then echo 'transaction pooler port accepted' >&2; exit 1; fi
unset PGPORT
export PGHOST='aws-0-eu-west-1.pooler.supabase.com'
export PGUSER='postgres.voglczxxtbwcxjrbffbt'
bash "$script" > /dev/null
export PGHOST='db.voglczxxtbwcxjrbffbt.supabase.co'
export PGUSER='postgres'
export PGHOST='db.voglczxxtbwcxjrbffbt.supabase.co'
export PGUSER='postgres.txaopscyxjvvmwawsphk'
if bash "$script" > /dev/null 2>&1; then echo 'mixed recovery credentials accepted' >&2; exit 1; fi
export PGUSER='postgres'

# No backup invocation from GitHub Actions.
export GITHUB_ACTIONS=true
if bash "$script" > /dev/null 2>&1; then echo 'CI context accepted' >&2; exit 1; fi
unset GITHUB_ACTIONS

# Failed pg_dump must remove partial file and must not publish an archive.
before="$(find "$work/archive" -type f -name '*.pgdump.age' | wc -l)"
export MOCK_DUMP_FAIL=1
if bash "$script" > /dev/null 2>&1; then echo 'failed dump accepted' >&2; exit 1; fi
after="$(find "$work/archive" -type f -name '*.pgdump.age' | wc -l)"
test "$before" -eq "$after"
test "$(find "$work/archive" -name '*.partial' | wc -l)" -eq 0
unset MOCK_DUMP_FAIL

# Interrupted encryption must not leave a completed or partial archive.
before="$(find "$work/archive" -type f -name '*.pgdump.age' | wc -l)"
export MOCK_AGE_FAIL=1
if bash "$script" > /dev/null 2>&1; then echo 'failed age encryption accepted' >&2; exit 1; fi
after="$(find "$work/archive" -type f -name '*.pgdump.age' | wc -l)"
test "$before" -eq "$after"
test "$(find "$work/archive" -name '*.partial' | wc -l)" -eq 0
unset MOCK_AGE_FAIL

# No group/world-readable storage location is permitted.
chmod 755 "$work/archive"
if bash "$script" > /dev/null 2>&1; then echo 'insecure backup directory accepted' >&2; exit 1; fi
chmod 700 "$work/archive"

# Weak TLS mode must be refused.
export PGSSLMODE=require
if bash "$script" > /dev/null 2>&1; then echo 'weak TLS accepted' >&2; exit 1; fi

echo 'PASS: encrypted-stream mock, SHA256, exact source/pooler, redirect and CI blocks, private dir, dump/age cleanup, verified TLS'
