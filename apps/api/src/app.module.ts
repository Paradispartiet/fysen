import { Module } from "@nestjs/common";
import { DatabaseService } from "./database.service.js";
import { DishSearchController } from "./dish-search.controller.js";
import { DishSearchService } from "./dish-search.service.js";
import { FunnelController } from "./funnel.controller.js";
import { FunnelService } from "./funnel.service.js";
import { HealthController } from "./health.controller.js";

@Module({
  controllers: [HealthController, DishSearchController, FunnelController],
  providers: [DatabaseService, DishSearchService, FunnelService],
})
export class AppModule {}
