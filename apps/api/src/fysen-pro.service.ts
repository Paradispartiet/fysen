import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import {
  fysenProDashboardSchema,
  fysenProLogoutReceiptSchema,
  fysenProSessionReceiptSchema,
  type FysenProDashboard,
  type FysenProLogoutReceipt,
  type FysenProSessionReceipt,
} from "@fysen/contracts/fysen-pro";
import {
  getRestaurantProDashboard,
  redeemRestaurantProSetupToken,
  revokeRestaurantProSession,
} from "@fysen/database";
import { DatabaseService } from "./database.service.js";

export const FYSEN_PRO_DEMAND_GAP_MIN_SEARCHES = 3;

export function protectFysenProDashboard(dashboard: FysenProDashboard): FysenProDashboard {
  return {
    ...dashboard,
    cityDemandGaps: dashboard.cityDemandGaps.filter(
      (gap) => gap.searches7d >= FYSEN_PRO_DEMAND_GAP_MIN_SEARCHES,
    ),
  };
}

@Injectable()
export class FysenProService {
  constructor(@Inject(DatabaseService) private readonly database: DatabaseService) {}

  async redeem(setupToken: string): Promise<FysenProSessionReceipt> {
    const receipt = await redeemRestaurantProSetupToken(this.database.pool(), setupToken);
    if (!receipt) {
      throw new UnauthorizedException({ code: "INVALID_PRO_SETUP_TOKEN", message: "Invalid or expired setup token." });
    }
    return fysenProSessionReceiptSchema.parse(receipt);
  }

  async dashboard(sessionToken: string): Promise<FysenProDashboard> {
    const dashboard = await getRestaurantProDashboard(this.database.pool(), sessionToken);
    if (!dashboard) {
      throw new UnauthorizedException({ code: "INVALID_PRO_SESSION", message: "Invalid or expired Pro session." });
    }
    return fysenProDashboardSchema.parse({
      ...dashboard,
      cityDemandGaps: dashboard.cityDemandGaps.filter(
        (gap) => gap.searches7d >= FYSEN_PRO_DEMAND_GAP_MIN_SEARCHES,
      ),
    });
  }

  async logout(sessionToken: string): Promise<FysenProLogoutReceipt> {
    await revokeRestaurantProSession(this.database.pool(), sessionToken);
    return fysenProLogoutReceiptSchema.parse({ accepted: true });
  }
}
