#!/usr/bin/env python3
"""ParadisDB Free-plan admission control using operator-supplied D1 metrics.

This CLI never contacts Cloudflare and does not activate/deploy anything.
A PASS means only that the *provided estimate* fits conservative thresholds;
it is not proof of real-world usage or a zero-cost guarantee.
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path

FREE_LIMITS = {
    "rowsRead": 5_000_000,
    "rowsWritten": 100_000,
    "workerRequests": 100_000,
    "databaseBytes": 500_000_000,
}
# Leave headroom for other apps, surprise traffic and query variation.
SOFT_BUDGETS = {
    "rowsRead": 2_500_000,
    "rowsWritten": 50_000,
    "workerRequests": 40_000,
    "databaseBytes": 300_000_000,
}
METRIC_FIELDS = (
    "searchRowsRead", "statusRowsRead", "searchRowsWritten",
    "statusRowsWritten", "initialImportRowsRead", "initialImportRowsWritten",
)
def unsigned_int(value, field: str) -> int:
    if type(value) is not int or value < 0:
        raise ValueError(field + " must be a nonnegative integer, not a guess or string")
    return value

def measured_at_utc(value: object, now: datetime) -> str:
    if not isinstance(value, str):
        raise ValueError("measuredAt is required")
    try:
        measured = datetime.fromisoformat(value.replace("Z", "+00:00"))
    except ValueError as exc:
        raise ValueError("measuredAt must be a valid ISO timestamp") from exc
    if measured.tzinfo is None:
        raise ValueError("measuredAt must include a timezone")
    measured = measured.astimezone(timezone.utc)
    if measured > now + timedelta(minutes=5) or measured < now - timedelta(days=7):
        raise ValueError("Real measurements must be no older than seven days")
    return measured.isoformat()

def check(report: dict, now: datetime | None = None) -> dict:
    now = now or datetime.now(timezone.utc)
    if not isinstance(report, dict):
        raise ValueError("Expected a JSON object")
    if report.get("source") != "cloudflare-d1-remote":
        raise ValueError("Only measured Cloudflare remote D1 telemetry can pass this release gate")
    if report.get("plan") != "workers-free":
        raise ValueError("This gate models Workers Free only")
    measured_at = measured_at_utc(report.get("measuredAt"), now)
    measurements = report.get("measurements")
    baseline = report.get("baselineToday")
    forecast = report.get("forecastToday")
    if not all(isinstance(x, dict) for x in (measurements, baseline, forecast)):
        raise ValueError("Missing measurements, baselineToday or forecastToday")
    m = {key: unsigned_int(measurements.get(key), "measurements." + key)
         for key in METRIC_FIELDS}
    b = {key: unsigned_int(baseline.get(key), "baselineToday." + key)
         for key in ("rowsRead", "rowsWritten", "workerRequests")}
    f = {key: unsigned_int(forecast.get(key), "forecastToday." + key)
         for key in ("searches", "statusRequests", "initialImports")}
    storage = unsigned_int(report.get("databaseBytesAfterImport"), "databaseBytesAfterImport")
    if m["searchRowsRead"] == 0 or m["statusRowsRead"] == 0:
        raise ValueError("Remote read samples must have nonzero measured rows")
    projected = {
        "rowsRead": (
            b["rowsRead"] + f["searches"] * m["searchRowsRead"]
            + f["statusRequests"] * m["statusRowsRead"]
            + f["initialImports"] * m["initialImportRowsRead"]
        ),
        "rowsWritten": (
            b["rowsWritten"] + f["searches"] * m["searchRowsWritten"]
            + f["statusRequests"] * m["statusRowsWritten"]
            + f["initialImports"] * m["initialImportRowsWritten"]
        ),
        "workerRequests": b["workerRequests"] + f["searches"] + f["statusRequests"],
        "databaseBytes": storage,
    }
    over = {field: {"projected":value,"softLimit":SOFT_BUDGETS[field]}
            for field, value in projected.items() if value > SOFT_BUDGETS[field]}
    hard = {field: {"projected":value,"freeLimit":FREE_LIMITS[field]}
            for field, value in projected.items() if value > FREE_LIMITS[field]}
    return {
        "admitted": not bool(over),
        "source": "operator-supplied-cloudflare-remote-telemetry",
        "measuredAt": measured_at,
        "projected": projected,
        "softBudgets": SOFT_BUDGETS,
        "hardFreeLimits": FREE_LIMITS,
        "overSoftBudget": over,
        "overHardLimit": hard,
        "disclaimer": (
            "Estimate only; approximate per-location rate limiting is not a "
            "global daily cap. Check actual dashboard account totals and "
            "Free-plan activation before any remote deployment."
        )
    }

def main() -> int:
    parser = argparse.ArgumentParser(description="Offline Cloudflare D1 Free-plan admission estimate")
    parser.add_argument("report", type=Path, help="Operator-supplied remote metrics JSON")
    args = parser.parse_args()
    try:
        result = check(json.loads(args.report.read_text(encoding="utf-8")))
    except (OSError, ValueError, TypeError) as error:
        print("ParadisDB free release blocked: " + str(error), file=sys.stderr)
        return 2
    print(json.dumps(result, ensure_ascii=False, indent=2))
    return 0 if result["admitted"] else 2

if __name__ == "__main__":
    raise SystemExit(main())
