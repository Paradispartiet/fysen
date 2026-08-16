import type { Pool } from "pg";
import { describe, expect, it, vi } from "vitest";
import { listDueMenuSourceIds } from "./due-sources.js";

describe("due menu sources", () => {
  it("returns due source ids in database order", async () => {
    const query = vi.fn().mockResolvedValue({ rows: [{ id: "source-a" }, { id: "source-b" }] });
    const pool = { query } as unknown as Pool;

    await expect(listDueMenuSourceIds(pool, 10)).resolves.toEqual(["source-a", "source-b"]);
    expect(query).toHaveBeenCalledOnce();
    expect(query.mock.calls[0]?.[1]).toEqual([10]);
  });

  it("rejects unsafe batch sizes before querying", async () => {
    const query = vi.fn();
    const pool = { query } as unknown as Pool;

    await expect(listDueMenuSourceIds(pool, 0)).rejects.toThrow(/between 1 and 100/);
    await expect(listDueMenuSourceIds(pool, 101)).rejects.toThrow(/between 1 and 100/);
    expect(query).not.toHaveBeenCalled();
  });
});
