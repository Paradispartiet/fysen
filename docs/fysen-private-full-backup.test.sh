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
[[ "${PGSSLMODE:-}" == 'require' ]] || exit 83
if [[ "${MOCK_DUMP_FAIL:-}" == 1 ]]; then echo 'mock dump failure' >&2; exit 67; fi
printf 'TEST-DUMP-CONTENT-NOT-PRIVATE'
MOCK
cat > "$work/bin/age" <<'MOCK'
#!/usr/bin/env bash
set -euo pipefail
[[ "$1" == '-r' && "$2" == age1* ]] || exit 84
printf 'MOCK-ENCRYPTED-'
cat
MOCK
chmod 700 "$work/bin/pg_dump" "$work/bin/age"
export PATH="$work/bin:$PATH"
export PGHOST='db.voglczxxtbwcxjrbffbt.supabase.co'
export PGUSER=postgres
export PGDATABASE=postgres
export PGPASSWORD='fake-test-password'
export PGSSLMODE=require
export FYSEN_BACKUP_AGE_RECIPIENT='age1fakepublickeyfortests'
export FYSEN_BACKUP_DEST="$work/archive"
unset CI GITHUB_ACTIONS || true
bash "$script" > "$work/out"
test "$(find "$work/archive" -type f -name '*.pgdump.age' | wc -l)" -eq 1
file="$(find "$work/archive" -type f -name '*.pgdump.age')"
test "$(cat "$file")" = 'MOCK-ENCRYPTED-TEST-DUMP-CONTENT-NOT-PRIVATE'
( cd "$work/archive" && sha256sum -c "$(basename "$file").sha256" ) >/dev/null

# Wrong source must be refused without writing ciphertext.
export PGHOST='db.txaopscyxjvvmwawsphk.supabase.co'
if bash "$script" > /dev/null 2>&1; then echo 'wrong source accepted' >&2; exit 1; fi
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

# Weak TLS mode must be refused.
export PGSSLMODE=prefer
if bash "$script" > /dev/null 2>&1; then echo 'weak TLS accepted' >&2; exit 1; fi

echo 'PASS: local encrypted-stream backup success, SHA256, wrong-project guard, CI guard, failure cleanup and TLS guard'
