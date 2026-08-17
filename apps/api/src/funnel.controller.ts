import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  Inject,
  Post,
} from "@nestjs/common";
import {
  conversionEventInputSchema,
  type ConversionEventInput,
  type ConversionEventReceipt,
} from "@fysen/contracts";
import { FunnelService } from "./funnel.service.js";

export function parseConversionEvent(value: unknown): ConversionEventInput {
  const parsed = conversionEventInputSchema.safeParse(value);
  if (parsed.success) return parsed.data;

  throw new BadRequestException({
    code: "INVALID_CONVERSION_EVENT",
    message: "Invalid conversion event.",
    issues: parsed.error.issues.map((issue) => ({
      path: issue.path.join("."),
      code: issue.code,
      message: issue.message,
    })),
  });
}

@Controller("funnel")
export class FunnelController {
  constructor(@Inject(FunnelService) private readonly funnelService: FunnelService) {}

  @Post("events")
  @HttpCode(202)
  async record(@Body() body: unknown): Promise<ConversionEventReceipt> {
    return this.funnelService.record(parseConversionEvent(body));
  }
}
