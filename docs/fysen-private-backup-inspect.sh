#!/usr/bin/env bash
# Inspect an existing Fysen age-encrypted pg_dump without writing plaintext to disk.
set +x
set -euo pipefail
umask 077
error() { printf 'Fysen archive inspection refused: %s\n' "$*" >&2; exit 1; }
[[ "${GITHUB_ACTIONS:-}" != 'true' && "${CI:-}" != 'true' ]] || error 'run on trusted private machine, not CI'
[[ $# -eq 2 ]] || error 'usage: bash fysen-private-backup-inspect.sh /absolute/archive.pgdump.age /absolute/private-age-identity'
archive="$1"
identity="$2"
[[ "$archive" == /* && "$identity" == /* ]] || error 'archive and identity paths must be absolute'
[[ -f "$archive" && ! -L "$archive" && -r "$archive" ]] || error 'encrypted archive missing, unreadable or symlink'
[[ -f "${archive}.sha256" && ! -L "${archive}.sha256" ]] || error 'checksum manifest missing or symlink'
[[ -f "$identity" && ! -L "$identity" && -r "$identity" ]] || error 'private identity missing or symlink'
[[ "$(stat -c '%a' -- "$identity")" == 600 ]] || error 'private age identity must have mode 0600'
for program in age pg_restore sha256sum stat awk; do
  command -v "$program" >/dev/null 2>&1 || error "required program missing: $program"
done
base="$(basename -- "$archive")"
[[ "$base" =~ ^fysen-original-[0-9]{8}T[0-9]{6}Z-[0-9]+\.pgdump\.age$ ]] || error 'unexpected archive filename'
manifest_line="$(cat -- "${archive}.sha256")"
[[ "$(wc -l < "${archive}.sha256")" == 1 ]] || error 'checksum manifest must have one line'
expected_hash="${manifest_line%%  *}"
expected_name="${manifest_line#*  }"
[[ "$expected_hash" =~ ^[0-9a-f]{64}$ && "$expected_name" == "$base" ]] || error 'checksum manifest filename or digest mismatch'
( cd -- "$(dirname -- "$archive")" && sha256sum --status -c -- "${base}.sha256" ) || error 'encrypted archive SHA-256 mismatch'
# Pipe is read-only; neither the dump nor private key is ever printed or stored.
toc="$(age -d -i "$identity" "$archive" | pg_restore --list)" || error 'decryption or pg_restore listing failed'
expected_tables=(
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
count="$(printf '%s\n' "$toc" | awk '$1 ~ /^[0-9]+;$/ && $4 == "TABLE" && $5 == "DATA" && $6 == "fysen" { n++ } END { print n + 0 }')"
[[ "$count" -eq "${#expected_tables[@]}" ]] || error 'archive must contain exactly 30 fysen TABLE DATA entries (29 app tables + migration ledger)'
for table in "${expected_tables[@]}"; do
  printf '%s\n' "$toc" | awk -v name="$table" '$1 ~ /^[0-9]+;$/ && $4 == "TABLE" && $5 == "DATA" && $6 == "fysen" && $7 == name { n++ } END { exit n == 1 ? 0 : 1 }' || error "archive missing or duplicated expected table: $table"
done
printf 'PASS: encrypted archive checksum, age decryption and all 29 Fysen table manifests plus migration ledger.\n'
printf 'This is metadata inspection ONLY. A protected isolated PostgreSQL restore and row-level checks are still required.\n'
