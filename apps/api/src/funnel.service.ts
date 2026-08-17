import { Inject, Injectable } from "@nestjs/common";
import {
  conversionEventReceiptSchema,
  type ConversionEventInput,
  type ConversionEventReceipt,
} from "@fysen/contracts";
import { recordConversionEvent } from "@fysen/database";
import { DatabaseService } from "./database.service.js";

@Injectable()
export class FunnelService {
  constructor(@Inject(DatabaseService) private readonly databaseService: DatabaseService) {}

  async record(input: ConversionEventInput): Promise<ConversionEventReceipt> {
    const eventId = await recordConversionEvent(this.databaseService.pool(), {
      clientEventId: input.clientEventId,
      impressionId: input.impressionId,
      eventType: input.eventType,
    });

    return conversionEventReceiptSchema.parse({
      accepted: true,
      eventId,
    });
  }
}
