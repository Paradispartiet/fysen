#!/usr/bin/env bash
# Real LOCAL Cloudflare D1 + workerd test. No account, deploy or credentials.
set -euo pipefail
: "${RUNNER_TEMP:?RUNNER_TEMP must point to isolated CI temp files}"
: "${PARADISDB_PUBLIC_SQL:?Set path to existing local verified public SQL export}"
test -f "$PARADISDB_PUBLIC_SQL"
unset CLOUDFLARE_API_TOKEN CLOUDFLARE_ACCOUNT_ID CF_API_TOKEN CF_ACCOUNT_ID
export WRANGLER_SEND_METRICS=false
export NO_COLOR=1

config="$PWD/tools/paradisdb/worker/wrangler.local-ci.jsonc"
persist="$(mktemp -d "$RUNNER_TEMP/paradisdb-real-d1-XXXXXX")"
log="$RUNNER_TEMP/paradisdb-real-d1-workerd.log"
port=18739
server_pid=""

cleanup() {
  if [[ -n "$server_pid" ]]; then
    kill "$server_pid" 2>/dev/null || true
    wait "$server_pid" 2>/dev/null || true
  fi
  rm -f "$config"
}
trap cleanup EXIT

# Synthetic UUID, meaningful only in the local Wrangler runtime.
cat > "$config" <<'JSON'
{
  "name": "paradisdb-local-only-verification",
  "main": "worker.mjs",
  "compatibility_date": "2026-11-12",
  "vars": {"PARADISDB_PUBLIC_ENABLED": "true"},
  "ratelimits": [{
    "name": "PUBLIC_RATE_LIMITER",
    "namespace_id": "100001",
    "simple": {"limit": 20, "period": 60}
  }],
  "d1_databases": [{
    "binding": "PUBLIC_DB",
    "database_name": "paradisdb-local-only-verification",
    "database_id": "00000000-0000-4000-8000-000000000001"
  }]
}
JSON

wrangler=(npx --yes wrangler@4.161.0)
"${wrangler[@]}" --version

# These commands must always include --local. No Cloudflare token is passed.
timeout 420s "${wrangler[@]}" d1 execute paradisdb-local-only-verification \
  --local --config "$config" --persist-to "$persist" \
  --file "$PARADISDB_PUBLIC_SQL" --yes \
  > "$RUNNER_TEMP/paradisdb-real-d1-import.log" 2>&1 || {
    echo "Local D1 import failed; final diagnostic lines:"
    tail -n 50 "$RUNNER_TEMP/paradisdb-real-d1-import.log" || true
    exit 1
  }

timeout 60s "${wrangler[@]}" d1 execute paradisdb-local-only-verification \
  --local --config "$config" --persist-to "$persist" \
  --command="SELECT COUNT(*) AS total FROM fysen_public_items" --json \
  > "$RUNNER_TEMP/paradisdb-real-d1-count.json"

python3 - <<'PY'
import json, os, pathlib
report = json.loads((pathlib.Path(os.environ["RUNNER_TEMP"]) / "paradisdb-real-d1-count.json").read_text())
items = report if isinstance(report, list) else [report]
counts = [row["total"] for item in items for row in item.get("results", []) if "total" in row]
assert counts == [47265], counts
print("PASS: actual local Cloudflare D1 stores 47,265 public menu records")
PY

# Compare index and full-scan read budgets in real local D1 before
# serving traffic. Read metrics are indicative, not a production billing proof.
timeout 60s "${wrangler[@]}" d1 execute paradisdb-local-only-verification \
  --local --config "$config" --persist-to "$persist" --json \
  --command="SELECT COUNT(*) AS matches FROM fysen_public_items WHERE instr(normalized_name, 'ramen') > 0" \
  > "$RUNNER_TEMP/paradisdb-d1-fullscan-metrics.json"
timeout 60s "${wrangler[@]}" d1 execute paradisdb-local-only-verification \
  --local --config "$config" --persist-to "$persist" --json \
  --command="SELECT COUNT(*) AS matches FROM fysen_public_trigrams WHERE normalized_name LIKE '%ramen%'" \
  > "$RUNNER_TEMP/paradisdb-d1-fts5-metrics.json"

python3 - <<'PY'
import json, os, pathlib
root = pathlib.Path(os.environ["RUNNER_TEMP"])
def record(name):
    doc = json.loads((root / name).read_text())
    doc = doc[0] if isinstance(doc,list) else doc
    return doc["results"][0]["matches"], doc.get("meta", {}).get("rows_read")
baseline = record("paradisdb-d1-fullscan-metrics.json")
indexed = record("paradisdb-d1-fts5-metrics.json")
assert baseline[0] == indexed[0] and baseline[0] > 0, (baseline,indexed)
if isinstance(baseline[1], int) and isinstance(indexed[1], int) and baseline[1] > 0:
    assert indexed[1] < baseline[1], (baseline,indexed)
    print(f"PASS: D1 search exact-match parity; rows read full scan={baseline[1]}, FTS5={indexed[1]}")
else:
    print("PASS: D1 FTS5 search parity; local D1 billing metrics unavailable, index plan is verified separately")
PY

timeout 120s "${wrangler[@]}" dev --local --config "$config" \
  --persist-to "$persist" --ip 127.0.0.1 --port "$port" \
  > "$log" 2>&1 &
server_pid=$!

for attempt in {1..50}; do
  if curl --silent --fail --max-time 2 "http://127.0.0.1:$port/v1/dishes/archive/status" \
     > "$RUNNER_TEMP/paradisdb-real-d1-status.json"; then
    break
  fi
  if ! kill -0 "$server_pid" 2>/dev/null; then
    echo "Local Wrangler dev exited unexpectedly:"
    tail -n 50 "$log" || true
    exit 1
  fi
  sleep 1
done
test -s "$RUNNER_TEMP/paradisdb-real-d1-status.json"

python3 - "$port" <<'PY'
import json, sys, urllib.request, urllib.parse, urllib.error
port = int(sys.argv[1])
base = "http://127.0.0.1:" + str(port)
def request(path, method="GET"):
    req = urllib.request.Request(base + path, method=method)
    try:
        with urllib.request.urlopen(req, timeout=10) as response:
            return response.status, json.loads(response.read().decode())
    except urllib.error.HTTPError as exc:
        return exc.code, json.loads(exc.read().decode())
status, meta = request("/v1/dishes/archive/status")
assert status == 200, (status, meta)
assert meta["source"] == "verified-menu-archive" and meta["realtime"] is False
assert meta["restaurants"] == 973 and meta["menuItems"] == 47265
assert meta["identityQuarantines"] == 4
assert len(meta["sha256"]) == 64 and len(meta["publicRowsSha256"]) == 64
query = "/v1/dishes/archive/search?q=ramen&city=Oslo&limit=20"
search_status, search = request(query)
assert search_status == 200 and 0 < search["count"] <= 20, (search_status,search)
assert search["realtime"] is False
assert all(x["restaurant"]["city"] == "Oslo" and
           x["menu"]["sourceUrl"].startswith(("https://","http://")) and
           x["menu"]["observedAt"] for x in search["results"])
attack = urllib.parse.quote("ramen' OR 1=1--")
injection_status, injection = request("/v1/dishes/archive/search?q=" + attack)
assert injection_status == 200 and injection["count"] == 0
assert request("/v1/dishes/archive/search?q=ol")[0] == 400
assert request("/api/aha/documents")[0] == 404
assert request("/v1/private")[0] == 404
assert request(query, method="POST")[0] == 405
assert request(query, method="DELETE")[0] == 405
print("PASS: real workerd + local D1 search, SQL injection guard, no private API or writes")
PY
