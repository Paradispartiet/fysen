#!/usr/bin/env bash
# Offline QA only: synthetic archive, mocked decryption and pg_restore; no private bytes.
set -euo pipefail
root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
script="$root/fysen-private-backup-inspect.sh"
work="$(mktemp -d)"
trap 'rm -rf -- "$work"' EXIT
chmod 700 "$work"
mkdir -p "$work/bin" "$work/archive"
chmod 700 "$work/archive"
archive="$work/archive/fysen-original-20261121T040000Z-1234.pgdump.age"
identity="$work/age-identity.txt"
printf 'FAKE-ENCRYPTED-CONTENT-NOT-A-REAL-BACKUP' > "$archive"
printf 'FAKE-PRIVATE-KEY-NOT-REAL' > "$identity"
chmod 600 "$identity"
(cd "$(dirname "$archive")" && sha256sum "$(basename "$archive")" > "$(basename "$archive").sha256")
tables=(
  aha_analysis_handoffs aha_consumer_audit_log aha_consumer_sessions conversion_events
  dish_aliases dish_concepts menu_changes menu_items menu_snapshots
  menu_source_support_origins menu_sources menu_watch_runs min_mat_items
  restaurant_access_grants restaurant_action_verification_runs restaurant_actions
  restaurant_claim_audit_log restaurant_claims restaurant_hours_intervals
  restaurant_hours_snapshots restaurant_hours_sources restaurant_hours_watch_runs
  restaurant_owned_profiles restaurant_pro_access_audit_log restaurant_pro_sessions
  restaurant_pro_setup_tokens restaurants search_events search_result_impressions
  schema_migrations
)
i=1000
for name in "${tables[@]}"; do
  printf '%s; 0 0 TABLE DATA fysen %s postgres\n' "$i" "$name" >> "$work/toc"
  i=$((i+1))
done
cat > "$work/bin/age" <<'MOCK'
#!/usr/bin/env bash
set -euo pipefail
[[ "$1" == "-d" && "$2" == "-i" && -f "$3" && -f "$4" ]] || exit 89
if [[ "${MOCK_DECRYPT_FAIL:-}" == 1 ]]; then exit 88; fi
cat "$4"
MOCK
cat > "$work/bin/pg_restore" <<'MOCK'
#!/usr/bin/env bash
set -euo pipefail
[[ "$1" == "--list" ]] || exit 90
cat >/dev/null
if [[ "${MOCK_RESTORE_FAIL:-}" == 1 ]]; then exit 91; fi
cat "$MOCK_TOC"
MOCK
chmod 700 "$work/bin/age" "$work/bin/pg_restore"
export PATH="$work/bin:$PATH" MOCK_TOC="$work/toc"
unset GITHUB_ACTIONS CI || true
bash "$script" "$archive" "$identity" > "$work/output"
grep -q '^PASS:' "$work/output"
deny() {
  if bash "$script" "$archive" "$identity" > /dev/null 2>&1; then
    printf 'Unexpectedly accepted invalid archive: %s\n' "$1" >&2
    exit 1
  fi
}
printf 'TAMPER' >> "$archive"
deny 'bad SHA-256'
printf 'FAKE-ENCRYPTED-CONTENT-NOT-A-REAL-BACKUP' > "$archive"
chmod 644 "$identity"
deny 'insecure age identity'
chmod 600 "$identity"
if GITHUB_ACTIONS=true bash "$script" "$archive" "$identity" > /dev/null 2>&1; then echo 'CI accepted' >&2; exit 1; fi
if MOCK_DECRYPT_FAIL=1 bash "$script" "$archive" "$identity" > /dev/null 2>&1; then echo 'decryption failure accepted' >&2; exit 1; fi
if MOCK_RESTORE_FAIL=1 bash "$script" "$archive" "$identity" > /dev/null 2>&1; then echo 'pg_restore failure accepted' >&2; exit 1; fi
cp "$work/toc" "$work/toc-ok"
grep -v 'schema_migrations' "$work/toc-ok" > "$work/toc"
deny 'missing migration ledger'
cp "$work/toc-ok" "$work/toc"
echo '9999; 0 0 TABLE DATA fysen restaurants postgres' >> "$work/toc"
deny 'duplicated table entry'
echo 'PASS: offline archive SHA-256, decryption, TOC manifest, failure and CI guards'
