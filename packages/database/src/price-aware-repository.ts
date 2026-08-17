import type { Pool, QueryResultRow } from "pg";
import {
  MenuIndexRepository as LegacyMenuIndexRepository,
  type SnapshotWriteInput,
  type StoredSnapshot,
} from "./repository.js";

export type StoredMenuPriceKind = "exact" | "from" | "multiple";

interface StoredPriceRow extends QueryResultRow {
  source_key: string;
  price_kind: StoredMenuPriceKind;
  price_max_minor: number | null;
}

interface PricedSnapshotItem {
  readonly sourceKey: string;
  readonly priceKind?: StoredMenuPriceKind;
  readonly priceMaxMinor?: number | null;
}

export class PriceAwareMenuIndexRepository extends LegacyMenuIndexRepository {
  constructor(private readonly pricePool: Pool) {
    super(pricePool);
  }

  override async recordSnapshot(input: SnapshotWriteInput): Promise<string> {
    const snapshotId = await super.recordSnapshot(input);
    const payload = input.items.map((item) => {
      const priced = item as typeof item & PricedSnapshotItem;
      return {
        source_key: item.sourceKey,
        price_kind: priced.priceKind ?? "exact",
        price_max_minor: priced.priceMaxMinor ?? null,
      };
    });

    const result = await this.pricePool.query(
      `UPDATE fysen.menu_items AS item
          SET price_kind = payload.price_kind,
              price_max_minor = payload.price_max_minor
         FROM jsonb_to_recordset($2::jsonb) AS payload(
           source_key text,
           price_kind text,
           price_max_minor integer
         )
        WHERE item.snapshot_id = $1
          AND item.source_key = payload.source_key`,
      [snapshotId, JSON.stringify(payload)],
    );

    if ((result.rowCount ?? 0) !== payload.length) {
      throw new Error(
        `Price semantics persistence mismatch for snapshot ${snapshotId}: updated ${result.rowCount ?? 0} of ${payload.length} items`,
      );
    }

    return snapshotId;
  }

  override async getLatestSnapshotWithItems(menuSourceId: string): Promise<StoredSnapshot | null> {
    const snapshot = await super.getLatestSnapshotWithItems(menuSourceId);
    if (!snapshot) return null;

    const prices = await this.pricePool.query<StoredPriceRow>(
      `SELECT source_key, price_kind, price_max_minor
         FROM fysen.menu_items
        WHERE snapshot_id = $1`,
      [snapshot.id],
    );
    const bySourceKey = new Map(prices.rows.map((row) => [row.source_key, row]));

    return {
      ...snapshot,
      items: snapshot.items.map((item) => {
        const price = bySourceKey.get(item.sourceKey);
        return {
          ...item,
          priceKind: price?.price_kind ?? "exact",
          priceMaxMinor: price?.price_max_minor ?? null,
        };
      }),
    };
  }
}
