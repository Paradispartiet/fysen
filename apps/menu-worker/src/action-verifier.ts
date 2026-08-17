import {
  createDatabasePool,
  listRestaurantActionsForReverification,
  recordRestaurantActionVerificationFailure,
  recordRestaurantActionVerificationSuccess,
  type RestaurantActionVerificationTarget,
} from "@fysen/database";
import { HttpMenuClient, MenuFetchError, type MenuHttpFetchResult } from "./http-client.js";

interface ActionHttpClient {
  fetchSource(source: {
    readonly url: string;
    readonly userAgent: string;
    readonly etag: null;
    readonly lastModified: null;
  }): Promise<MenuHttpFetchResult>;
}

export interface RestaurantActionVerificationSummary {
  readonly dueCount: number;
  readonly verifiedCount: number;
  readonly failedCount: number;
  readonly results: readonly {
    readonly actionId: string;
    readonly actionType: RestaurantActionVerificationTarget["actionType"];
    readonly outcome: "verified" | "fetch_error";
    readonly httpStatus: number | null;
    readonly errorCode: string | null;
  }[];
}

function addDays(isoDate: string, days: number): string {
  return new Date(new Date(isoDate).getTime() + days * 24 * 60 * 60 * 1000).toISOString();
}

export async function runRestaurantActionVerification(
  limit = 25,
  options: {
    readonly client?: ActionHttpClient;
    readonly userAgent?: string;
  } = {},
): Promise<RestaurantActionVerificationSummary> {
  const pool = createDatabasePool({ maxConnections: 2 });
  const client = options.client ?? new HttpMenuClient();
  const userAgent = options.userAgent ?? process.env.FYSEN_MENU_BOT_USER_AGENT?.trim() || "FysenMenuBot/0.1";

  try {
    const due = await listRestaurantActionsForReverification(pool, limit);
    const results: Array<RestaurantActionVerificationSummary["results"][number]> = [];

    for (const action of due) {
      const startedAt = new Date().toISOString();
      try {
        const response = await client.fetchSource({
          url: action.url,
          userAgent,
          etag: null,
          lastModified: null,
        });
        const completedAt = new Date().toISOString();
        const verifiedAt = response.fetchedAt;
        const httpStatus = response.status;
        await recordRestaurantActionVerificationSuccess(pool, {
          actionId: action.id,
          startedAt,
          completedAt,
          httpStatus,
          verifiedAt,
          expiresAt: addDays(verifiedAt, 30),
        });
        results.push({
          actionId: action.id,
          actionType: action.actionType,
          outcome: "verified",
          httpStatus,
          errorCode: null,
        });
      } catch (error) {
        const completedAt = new Date().toISOString();
        const menuError = error instanceof MenuFetchError ? error : null;
        await recordRestaurantActionVerificationFailure(pool, {
          actionId: action.id,
          startedAt,
          completedAt,
          httpStatus: menuError?.httpStatus ?? null,
          errorCode: menuError?.code ?? "UNEXPECTED_ERROR",
          errorMessage: error instanceof Error ? error.message : String(error),
        });
        results.push({
          actionId: action.id,
          actionType: action.actionType,
          outcome: "fetch_error",
          httpStatus: menuError?.httpStatus ?? null,
          errorCode: menuError?.code ?? "UNEXPECTED_ERROR",
        });
      }
    }

    return {
      dueCount: due.length,
      verifiedCount: results.filter((result) => result.outcome === "verified").length,
      failedCount: results.filter((result) => result.outcome === "fetch_error").length,
      results,
    };
  } finally {
    await pool.end();
  }
}
