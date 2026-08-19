import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  HttpCode,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import {
  ahaConsumerSessionCreateSchema,
  minMatSaveInputSchema,
  minMatSavedItemIdSchema,
  type AhaAnalysisHandoffReceipt,
  type AhaConsumerLogoutReceipt,
  type AhaConsumerSessionCreate,
  type AhaConsumerSessionReceipt,
  type FysenFoodCollectionV1,
  type MinMatItem,
  type MinMatList,
  type MinMatSaveInput,
} from "@fysen/contracts/aha-min-mat";
import { UnauthorizedException } from "@nestjs/common";
import { AhaMinMatService } from "./aha-min-mat.service.js";

function invalidBody(code: string, message: string, issues: Array<{ path: string; code: string; message: string }>): BadRequestException {
  return new BadRequestException({ code, message, issues });
}

export function parseAhaSessionCreate(value: unknown): AhaConsumerSessionCreate {
  const parsed = ahaConsumerSessionCreateSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  throw invalidBody("INVALID_AHA_SESSION_CREATE", "Invalid AHA session request.", parsed.error.issues.map((issue) => ({
    path: issue.path.join("."), code: issue.code, message: issue.message,
  })));
}

export function parseMinMatSave(value: unknown): MinMatSaveInput {
  const parsed = minMatSaveInputSchema.safeParse(value);
  if (parsed.success) return parsed.data;
  throw invalidBody("INVALID_MIN_MAT_SAVE", "Invalid Min mat save request.", parsed.error.issues.map((issue) => ({
    path: issue.path.join("."), code: issue.code, message: issue.message,
  })));
}

export function parseAhaConsumerBearer(value: string | undefined): string {
  const match = value ? /^Bearer ([A-Za-z0-9_-]{43,200})$/.exec(value) : null;
  const token = match?.[1];
  if (!token) throw new UnauthorizedException({ code: "INVALID_AHA_SESSION", message: "Missing or invalid AHA consumer session." });
  return token;
}

export function parseAhaHandoff(value: string | undefined): string {
  const match = value ? /^Handoff ([A-Za-z0-9_-]{43,200})$/.exec(value) : null;
  const token = match?.[1];
  if (!token) throw new UnauthorizedException({ code: "INVALID_AHA_HANDOFF", message: "Missing or invalid AHA handoff." });
  return token;
}

@Controller()
export class AhaMinMatController {
  constructor(@Inject(AhaMinMatService) private readonly service: AhaMinMatService) {}

  @Post("aha/sessions")
  @HttpCode(201)
  async connect(@Body() body: unknown): Promise<AhaConsumerSessionReceipt> {
    return this.service.connect(parseAhaSessionCreate(body));
  }

  @Delete("aha/sessions/current")
  @HttpCode(200)
  async logout(@Headers("authorization") authorization: string | undefined): Promise<AhaConsumerLogoutReceipt> {
    return this.service.logout(parseAhaConsumerBearer(authorization));
  }

  @Get("min-mat")
  async list(@Headers("authorization") authorization: string | undefined): Promise<MinMatList> {
    return this.service.list(parseAhaConsumerBearer(authorization));
  }

  @Post("min-mat/items")
  @HttpCode(201)
  async save(
    @Headers("authorization") authorization: string | undefined,
    @Body() body: unknown,
  ): Promise<MinMatItem> {
    return this.service.save(parseAhaConsumerBearer(authorization), parseMinMatSave(body).menuItemId);
  }

  @Delete("min-mat/items/:savedItemId")
  @HttpCode(200)
  async remove(
    @Headers("authorization") authorization: string | undefined,
    @Param("savedItemId") savedItemId: string,
  ): Promise<AhaConsumerLogoutReceipt> {
    const parsed = minMatSavedItemIdSchema.safeParse(savedItemId);
    if (!parsed.success) throw new BadRequestException({ code: "INVALID_MIN_MAT_ITEM_ID", message: "Invalid Min mat item id." });
    return this.service.remove(parseAhaConsumerBearer(authorization), parsed.data);
  }

  @Post("min-mat/handoffs")
  @HttpCode(201)
  async issueHandoff(@Headers("authorization") authorization: string | undefined): Promise<AhaAnalysisHandoffReceipt> {
    return this.service.issueHandoff(parseAhaConsumerBearer(authorization));
  }

  @Post("aha/handoffs/redeem")
  @HttpCode(200)
  async redeemHandoff(@Headers("authorization") authorization: string | undefined): Promise<FysenFoodCollectionV1> {
    return this.service.redeemHandoff(parseAhaHandoff(authorization));
  }
}
