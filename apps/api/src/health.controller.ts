import { Controller, Get } from "@nestjs/common";

interface HealthResponse {
  readonly service: "fysen-api";
  readonly status: "ok";
}

@Controller("health")
export class HealthController {
  @Get()
  getHealth(): HealthResponse {
    return { service: "fysen-api", status: "ok" };
  }
}
