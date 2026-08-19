import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import {
  ahaAnalysisHandoffReceiptSchema,
  ahaAuthorizationExchangeSchema,
  ahaConsumerLogoutReceiptSchema,
  ahaConsumerSessionReceiptSchema,
  fysenFoodCollectionV1Schema,
  minMatItemSchema,
  minMatListSchema,
  type AhaAnalysisHandoffReceipt,
  type AhaConsumerLogoutReceipt,
  type AhaConsumerSessionCreate,
  type AhaConsumerSessionReceipt,
  type FysenFoodCollectionV1,
  type MinMatItem,
  type MinMatList,
} from "@fysen/contracts/aha-min-mat";
import {
  createAhaConsumerSession,
  issueAhaAnalysisHandoff,
  listMinMatItems,
  redeemAhaAnalysisHandoff,
  removeMinMatItem,
  revokeAhaConsumerSession,
  saveMinMatItem,
} from "@fysen/database";
import { DatabaseService } from "./database.service.js";

export const AHA_FYSEN_EXCHANGE_URL = process.env.AHA_FYSEN_EXCHANGE_URL?.trim()
  || "https://aha-canonical-api-production.redground-9c6e20c2.northeurope.azurecontainerapps.io/v1/integrations/fysen/exchange";

export async function exchangeAhaAuthorization(
  input: AhaConsumerSessionCreate,
  fetchImpl: typeof fetch = fetch,
) {
  let response: Response;
  try {
    response = await fetchImpl(AHA_FYSEN_EXCHANGE_URL, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({
        clientId: "fysen",
        redirectUri: input.redirectUri,
        codeVerifier: input.codeVerifier,
        authorizationCode: input.authorizationCode,
      }),
      cache: "no-store",
    });
  } catch {
    throw new UnauthorizedException({ code: "AHA_EXCHANGE_UNAVAILABLE", message: "AHA authorization could not be verified." });
  }
  let body: unknown = null;
  try { body = await response.json(); } catch {}
  if (!response.ok) {
    throw new UnauthorizedException({ code: "INVALID_AHA_AUTHORIZATION", message: "AHA authorization is invalid or expired." });
  }
  const candidate = (body && typeof body === "object" && "data" in body)
    ? (body as { data?: unknown }).data
    : null;
  const parsed = ahaAuthorizationExchangeSchema.safeParse(candidate);
  if (!parsed.success || new Date(parsed.data.expiresAt).getTime() <= Date.now()) {
    throw new UnauthorizedException({ code: "INVALID_AHA_EXCHANGE", message: "AHA returned an invalid authorization receipt." });
  }
  return parsed.data;
}

@Injectable()
export class AhaMinMatService {
  constructor(@Inject(DatabaseService) private readonly database: DatabaseService) {}

  async connect(input: AhaConsumerSessionCreate): Promise<AhaConsumerSessionReceipt> {
    const authorization = await exchangeAhaAuthorization(input);
    const receipt = await createAhaConsumerSession(this.database.pool(), authorization);
    if (!receipt) {
      throw new ConflictException({ code: "AHA_AUTHORIZATION_REPLAYED", message: "This AHA authorization has already been used." });
    }
    return ahaConsumerSessionReceiptSchema.parse(receipt);
  }

  async logout(sessionToken: string): Promise<AhaConsumerLogoutReceipt> {
    await revokeAhaConsumerSession(this.database.pool(), sessionToken);
    return ahaConsumerLogoutReceiptSchema.parse({ accepted: true });
  }

  async list(sessionToken: string): Promise<MinMatList> {
    const items = await listMinMatItems(this.database.pool(), sessionToken);
    if (!items) throw invalidSession();
    return minMatListSchema.parse({ items });
  }

  async save(sessionToken: string, menuItemId: string): Promise<MinMatItem> {
    const item = await saveMinMatItem(this.database.pool(), sessionToken, menuItemId);
    if (!item) {
      const session = await listMinMatItems(this.database.pool(), sessionToken);
      if (!session) throw invalidSession();
      throw new NotFoundException({ code: "MENU_ITEM_NOT_FOUND", message: "The menu item is not available for Min mat." });
    }
    return minMatItemSchema.parse(item);
  }

  async remove(sessionToken: string, savedItemId: string): Promise<AhaConsumerLogoutReceipt> {
    const removed = await removeMinMatItem(this.database.pool(), sessionToken, savedItemId);
    if (removed === null) throw invalidSession();
    if (!removed) throw new NotFoundException({ code: "MIN_MAT_ITEM_NOT_FOUND", message: "Saved Min mat item was not found." });
    return ahaConsumerLogoutReceiptSchema.parse({ accepted: true });
  }

  async issueHandoff(sessionToken: string): Promise<AhaAnalysisHandoffReceipt> {
    const receipt = await issueAhaAnalysisHandoff(this.database.pool(), sessionToken);
    if (!receipt) {
      const session = await listMinMatItems(this.database.pool(), sessionToken);
      if (!session) throw invalidSession();
      throw new ConflictException({ code: "MIN_MAT_EMPTY", message: "Min mat is empty." });
    }
    return ahaAnalysisHandoffReceiptSchema.parse(receipt);
  }

  async redeemHandoff(handoffToken: string): Promise<FysenFoodCollectionV1> {
    const payload = await redeemAhaAnalysisHandoff(this.database.pool(), handoffToken);
    if (!payload) throw new UnauthorizedException({ code: "INVALID_AHA_HANDOFF", message: "Invalid, expired or already used handoff." });
    return fysenFoodCollectionV1Schema.parse(payload);
  }
}

function invalidSession(): UnauthorizedException {
  return new UnauthorizedException({ code: "INVALID_AHA_SESSION", message: "Invalid or expired AHA consumer session." });
}
