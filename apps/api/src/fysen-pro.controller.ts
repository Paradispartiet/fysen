import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Inject,
  Post,
  UnauthorizedException,
} from "@nestjs/common";
import {
  fysenProSetupRedeemSchema,
  type FysenProDashboard,
  type FysenProLogoutReceipt,
  type FysenProSessionReceipt,
  type FysenProSetupRedeem,
} from "@fysen/contracts/fysen-pro";
import { FysenProService } from "./fysen-pro.service.js";

export function parseFysenProSetupRedeem(value: unknown): FysenProSetupRedeem {
  const parsed = fysenProSetupRedeemSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  throw new BadRequestException({
    code: "INVALID_PRO_SETUP_REDEEM",
    message: "Invalid Fysen Pro setup request.",
    issues: parsed.error.issues.map((issue) => ({
      path: issue.path.join("."),
      code: issue.code,
      message: issue.message,
    })),
  });
}

export function parseFysenProBearer(value: string | undefined): string {
  if (!value) {
    throw new UnauthorizedException({ code: "MISSING_PRO_SESSION", message: "Missing Fysen Pro session." });
  }
  const match = /^Bearer ([A-Za-z0-9_-]{32,200})$/.exec(value);
  const token = match?.[1];
  if (!token) {
    throw new UnauthorizedException({ code: "INVALID_PRO_SESSION", message: "Invalid Fysen Pro session." });
  }
  return token;
}

@Controller("pro")
export class FysenProController {
  constructor(@Inject(FysenProService) private readonly service: FysenProService) {}

  @Post("sessions")
  @HttpCode(201)
  async redeem(@Body() body: unknown): Promise<FysenProSessionReceipt> {
    return this.service.redeem(parseFysenProSetupRedeem(body).setupToken);
  }

  @Get("dashboard")
  async dashboard(@Headers("authorization") authorization: string | undefined): Promise<FysenProDashboard> {
    return this.service.dashboard(parseFysenProBearer(authorization));
  }

  @Delete("sessions/current")
  @HttpCode(200)
  async logout(@Headers("authorization") authorization: string | undefined): Promise<FysenProLogoutReceipt> {
    return this.service.logout(parseFysenProBearer(authorization));
  }
}
