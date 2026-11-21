"""Synthetic unit tests only. No Cloudflare credentials, real usage or remote launch."""
import importlib.util
import json
import tempfile
import unittest
from datetime import datetime, timedelta, timezone
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1] / "worker" / "free_budget_gate.py"
spec = importlib.util.spec_from_file_location("paradisdb_free_budget", SOURCE)
gate = importlib.util.module_from_spec(spec)
spec.loader.exec_module(gate)


class BudgetGateTests(unittest.TestCase):
    def setUp(self):
        self.now = datetime(2026, 11, 12, 18, 0, tzinfo=timezone.utc)
        self.report = {
            "source": "cloudflare-d1-remote",  # Synthetic fixtures in these tests.
            "plan": "workers-free",
            "measuredAt": self.now.isoformat(),
            "measurements": {
                "searchRowsRead": 100, "statusRowsRead": 10,
                "searchRowsWritten": 0, "statusRowsWritten": 0,
                "initialImportRowsRead": 0, "initialImportRowsWritten": 40000,
            },
            "baselineToday": {
                "rowsRead": 10000, "rowsWritten": 200, "workerRequests": 500
            },
            "forecastToday": {
                "searches": 1000, "statusRequests": 200, "initialImports": 0
            },
            "databaseBytesAfterImport": 16000000,
            "accountDatabaseBytesAfterImport": 16000000,
            "accountDatabasesAfterImport": 1,
        }

    def test_small_remote_projection_fits_conservative_budgets(self):
        report = gate.check(self.report, now=self.now)
        self.assertTrue(report["admitted"])
        self.assertEqual(report["projected"]["rowsRead"], 112000)
        self.assertEqual(report["projected"]["rowsWritten"], 200)
        self.assertEqual(report["projected"]["workerRequests"], 1700)

    def test_many_read_requests_trigger_soft_budget(self):
        self.report["forecastToday"]["searches"] = 26000
        result = gate.check(self.report, now=self.now)
        self.assertFalse(result["admitted"])
        self.assertIn("rowsRead", result["overSoftBudget"])
        self.assertLess(result["projected"]["rowsRead"], gate.FREE_LIMITS["rowsRead"])

    def test_initial_import_write_volume_triggers_soft_budget(self):
        self.report["forecastToday"]["initialImports"] = 2
        result = gate.check(self.report, now=self.now)
        self.assertFalse(result["admitted"])
        self.assertIn("rowsWritten", result["overSoftBudget"])

    def test_worker_request_and_storage_soft_budgets_trigger(self):
        self.report["forecastToday"]["searches"] = 42000
        self.report["measurements"]["searchRowsRead"] = 1
        self.report["databaseBytesAfterImport"] = 350000000
        # Account total must include the database under test.
        self.report["accountDatabaseBytesAfterImport"] = 350000000
        result = gate.check(self.report, now=self.now)
        self.assertFalse(result["admitted"])
        self.assertIn("workerRequests", result["overSoftBudget"])
        self.assertIn("databaseBytes", result["overSoftBudget"])

    def test_no_or_untrusted_source_fails_closed(self):
        for source in (None, "synthetic", "local-wrangler", "cloudflare-worker-emulator"):
            self.report["source"] = source
            with self.assertRaises(ValueError):
                gate.check(self.report, now=self.now)

    def test_missing_or_invalid_metrics_fail_closed(self):
        del self.report["measurements"]["searchRowsRead"]
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)
        self.report["measurements"]["searchRowsRead"] = False
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)
        self.report["measurements"]["searchRowsRead"] = -1
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)

    def test_stale_timestamp_and_wrong_plan_rejected(self):
        self.report["measuredAt"] = (self.now - timedelta(days=9)).isoformat()
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)
        self.report["measuredAt"] = self.now.isoformat()
        self.report["plan"] = "workers-paid"
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)

    def test_zero_unmeasured_reads_rejected(self):
        self.report["measurements"]["statusRowsRead"] = 0
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)


    def test_account_wide_database_count_and_storage_budgets(self):
        self.report["accountDatabasesAfterImport"] = 9
        self.report["accountDatabaseBytesAfterImport"] = 3100000000
        result = gate.check(self.report, now=self.now)
        self.assertFalse(result["admitted"])
        self.assertIn("accountDatabases", result["overSoftBudget"])
        self.assertIn("accountDatabaseBytes", result["overSoftBudget"])
        self.assertNotIn("accountDatabases", result["overHardLimit"])
        self.report["accountDatabasesAfterImport"] = 11
        self.report["accountDatabaseBytesAfterImport"] = 5100000000
        hard = gate.check(self.report, now=self.now)
        self.assertIn("accountDatabases", hard["overHardLimit"])
        self.assertIn("accountDatabaseBytes", hard["overHardLimit"])

    def test_account_metrics_required_and_consistent(self):
        for field in ("accountDatabasesAfterImport", "accountDatabaseBytesAfterImport"):
            original = self.report.pop(field)
            with self.assertRaises(ValueError):
                gate.check(self.report, now=self.now)
            self.report[field] = original
        self.report["accountDatabaseBytesAfterImport"] = 1
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)
        self.report["accountDatabaseBytesAfterImport"] = 16000000
        self.report["accountDatabasesAfterImport"] = 0
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)

    def test_import_forecast_needs_measured_writes(self):
        self.report["forecastToday"]["initialImports"] = 1
        self.report["measurements"]["initialImportRowsWritten"] = 0
        with self.assertRaises(ValueError):
            gate.check(self.report, now=self.now)

if __name__ == "__main__":
    unittest.main()
