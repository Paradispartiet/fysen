import { Module } from "@nestjs/common";
import { AhaMinMatController } from "./aha-min-mat.controller.js";
import { AhaMinMatService } from "./aha-min-mat.service.js";
import { DatabaseService } from "./database.service.js";
import { DishSearchController } from "./dish-search.controller.js";
import { DishSearchService } from "./dish-search.service.js";
import { FunnelController } from "./funnel.controller.js";
import { FunnelService } from "./funnel.service.js";
import { FysenProController } from "./fysen-pro.controller.js";
import { FysenProService } from "./fysen-pro.service.js";
import { HealthController } from "./health.controller.js";
import { RestaurantClaimsController } from "./restaurant-claims.controller.js";
import { RestaurantClaimsService } from "./restaurant-claims.service.js";

@Module({
  controllers: [
    HealthController,
    DishSearchController,
    FunnelController,
    RestaurantClaimsController,
    FysenProController,
    AhaMinMatController,
  ],
  providers: [
    DatabaseService,
    DishSearchService,
    FunnelService,
    RestaurantClaimsService,
    FysenProService,
    AhaMinMatService,
  ],
})
export class AppModule {}
