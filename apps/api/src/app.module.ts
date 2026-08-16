import { Module } from "@nestjs/common";
import { DishSearchController } from "./dish-search.controller.js";
import { DishSearchService } from "./dish-search.service.js";
import { HealthController } from "./health.controller.js";

@Module({
  controllers: [HealthController, DishSearchController],
  providers: [DishSearchService],
})
export class AppModule {}
