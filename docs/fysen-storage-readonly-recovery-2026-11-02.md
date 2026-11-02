# Fysen production storage recovery — 2 November 2026

## Verified incident and current blocker

- Supabase project: `fysen`, project ref `voglczxxtbwcxjrbffbt`, organization on **Free**.
- PostgreSQL primary: `pg_is_in_recovery() = false`, but `transaction_read_only = on` and `default_transaction_read_only = on` (verified 2 November 2026 at 14:32 UTC).
- Database content: **1,582 MB**. Supabase documents **500 MB of database size on Free**, distinct from its 1 GB allocated disk. The 500 MB quota is already exceeded by >3x; this is not merely a transient session-pooler issue.
- `fysen.menu_items`: **1,323 MB**, approximately 722 MB heap + 601 MB indexes. Other large tables: `menu_snapshots` 102 MB, `menu_changes` 92 MB, `menu_watch_runs` 35 MB.
- Approximate live menu-item count from exact read-only query: **1,997,348 items across 40,707 snapshots and 1,154 sources**. The latest snapshot for each source holds 55,813 items.
- `fysen.restaurants` has 1,116 rows, 973 active. Git contains 987 canonical manifests. `havsmak-opera-oslo` is on `main` but **not** in the production restaurant table. Folkvang, Gamle Raadhus, and Den Glade Gris are present and active. Neither Git catalog size nor the active count proves complete public search.
- Materialization [run #41442918649](https://github.com/Paradispartiet/fysen/actions/runs/41442918649) encountered `SQLSTATE 25006`, producing 842 follow-on failures. Fail-fast PR [#1087](https://github.com/Paradispartiet/fysen/pull/1087), merged at `55e58510`, prevented repeat writes: [run #41454224815](https://github.com/Paradispartiet/fysen/actions/runs/41454224815) stopped at database preflight without touching restaurant rows.
- Reference: [Supabase database size and read-only policy](https://supabase.com/docs/guides/platform/database-size).

## Read-only snapshot-retention assessment — not a deletion plan

Exact non-mutating PostgreSQL read on 2 November 2026:

| Selection, *not yet approved as retention* | Number of retained menu-item records |
|---|---:|
| Most recent snapshot per source | 55,813 |
| Most recent per source plus past 1 day | 103,575 |
| Most recent per source plus past 3 days | 233,490 |
| Most recent per source plus past 7 days | 498,588 |
| All history currently stored | 1,997,348 |

The last seven days plus one latest snapshot per source would leave **498,588** items, and exclude **1,498,760** older item rows. **These are row counts, not measured disk savings, and NOT permission to remove any data.** Indexes, historical changes, WAL, and physical table bloat affect real disk size; ordinary `DELETE` does not immediately shrink PostgreSQL files.

The latest snapshot can itself be quarantined or rejected; before any retention policy is written, identify **latest last-known-good** snapshots and their related authoritative sources. Do not assume a single most recent snapshot is sufficient for safe public search.

### Referential dependencies — reason blind deletion is unsafe

Verified against production `pg_constraint`:

- `fysen.menu_items.snapshot_id → fysen.menu_snapshots.id ON DELETE CASCADE`.
- `fysen.menu_changes.current_snapshot_id → fysen.menu_snapshots.id ON DELETE CASCADE`: deleting snapshots **also deletes price/change history**.
- `fysen.menu_changes.previous_snapshot_id → fysen.menu_snapshots.id ON DELETE SET NULL`: earlier provenance is lost.
- `fysen.menu_watch_runs.snapshot_id → fysen.menu_snapshots.id ON DELETE SET NULL`: watch-run provenance is lost.
- `fysen.search_result_impressions.menu_item_id → fysen.menu_items.id ON DELETE SET NULL`: search-result provenance is lost.

An external historical archive must preserve and verify all relevant `menu_snapshots`, `menu_items`, `menu_changes`, `menu_watch_runs`, and references before any production deletion is considered. GitHub Actions' temporary artifacts are **not** an adequate sole archive or long-term backup.

## Decision gates (approval required)

**A. Preserve all live history:** Obtain explicit user approval for a Supabase paid-plan upgrade and its cost, then check PostgreSQL write mode again. Keep the entire archive intact. This is the most direct route to supporting growth beyond the Free database quota.

**B. Stay on Free:** Obtain explicit user approval for a *specific* off-database archival destination/retention policy and subsequent destructive pruning. Export with resumable batches; validate counts, checksums, readable restoration, current-source integrity, and complete `menu_changes` provenance. Only after independently verified archival, an approved deletion scope, and a rollback plan may a controlled write-session override, pruning and space reclamation occur. On PostgreSQL, some reclamation requires table/index rewrite and free disk headroom; do not blindly run `VACUUM FULL` on a space-constrained production instance.

Google Drive archival was subsequently authorized and completed as verified below. No billing action, database deletion, transaction-mode override or retention change has been authorized. **Do not run any of them from this document.**

## Safe completion criteria after either approved path

1. Observe `transaction_read_only = off`, `default_transaction_read_only = off`, and `pg_is_in_recovery() = false`. Do not start a 987-source run while the preflight is failing.
2. Recheck free space and test an isolated approved write in the proper production transaction context; do not disable the fail-fast guard.
3. Run the existing **normal materialization once**, not repeated ad hoc full-catalog verification.
4. Require successful production reconcile, then verify `havsmak-opera-oslo` exists as **active** in PostgreSQL with current price/source metadata.
5. Verify **both** public Fysen API and consumer search on Havsmak. Source-backed "skalldyrfat" must be **NOK 1,095 per person, minimum two**, while the individually priced menu has 21 named dishes / 22 quantity-variant offers as observed on 2 November.
6. Ensure no previously active restaurant was deactivated as a side effect. Preserve source evidence.

## Read-only SQL audit — safe to rerun

```sql
SELECT current_setting('transaction_read_only') AS transaction_read_only,
       current_setting('default_transaction_read_only') AS default_transaction_read_only,
       pg_is_in_recovery() AS in_recovery,
       pg_size_pretty(pg_database_size(current_database())) AS database_size;

SELECT c.relname AS table_name,
       pg_size_pretty(pg_total_relation_size(c.oid)) AS total_size
FROM pg_class c JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'fysen' AND c.relkind IN ('r','p')
ORDER BY pg_total_relation_size(c.oid) DESC LIMIT 8;

WITH numbered AS (
  SELECT id, menu_source_id, fetched_at,
         row_number() OVER (
           PARTITION BY menu_source_id ORDER BY fetched_at DESC, id DESC
         ) AS ordinal
  FROM fysen.menu_snapshots
)
SELECT count(*) AS total_snapshots,
       count(*) FILTER (WHERE ordinal = 1) AS latest_per_source,
       count(*) FILTER (WHERE fetched_at >= now() - interval '7 days'
                         OR ordinal = 1) AS latest_plus_7_days
FROM numbered;
```

No mutation is performed by any of these three queries.

## Verified archive export and physical restore (2 November 2026, later update)

The user explicitly chose Google Drive for the historical archive. The backup **has now been exported** and validated:

- Private [Google Drive archive folder](https://drive.google.com/drive/folders/1Ml52aXi2qr_2-smBrEXvgxGhBqgclIUW). Four ZIP files (parts 000–003) uploaded and verified present/not publicly shared using Google Drive metadata.
- All four ZIPs were downloaded back from Google Drive, unpacked, verified by individual SHA-256 hashes and reassembled byte-for-byte. Original PostgreSQL custom-format dump: 276,269,297 bytes; SHA-256 `1fd0385d2194ff6bcb80bc10cf04f577b4c970c9524a7c38a5f1382a7fefba0e`.
- [Isolated PostgreSQL 17 + PostGIS restore #41510938739](https://github.com/Paradispartiet/fysen/actions/runs/41510938739) **succeeded** after enabling `pg_trgm`. `pg_restore --exit-on-error` completed, including index and constraint rebuilding. Exact restored record counts matched read-only production SQL: 1,116 restaurants; 1,154 menu sources; 40,707 snapshots; 1,997,348 menu items; 100,172 changes; 111,963 menu watch runs.
- The backup contains the six named history tables, **not an entire database/cluster or app-user backup**. No live Supabase deletion or table modification occurred. Read-only mode remains enabled on the Free project.

### More conservative retention candidates (read-only analysis, not approved deletion)

All 1,154 latest snapshots are nonempty and carry successful HTTP statuses in the current production data. Each source also has a last good snapshot. A read-only analysis on the frozen source data found:

| Candidate retained in Supabase | Snapshots | Menu items |
|---|---:|---:|
| Latest successful snapshot/source plus past 1 day | 1,309 | 63,653 |
| Latest successful snapshot/source plus past 3 days | 3,096 | 151,408 |
| Current archive before deletion | 40,707 | 1,997,348 |

These counts are *not* actual disk savings; keeping 3 days does not guarantee getting below Free's 500 MB database-content quota. Changing historical snapshots cascades changes to `fysen.menu_changes` and may remove history required by live application logic. Disk reclamation may require maintenance locks and adequate spare space. A deletion procedure and restoration/rollback plan require separate review, explicit user confirmation of a retention period, and a staging rehearsal. The archive by itself is not authorization to delete.
