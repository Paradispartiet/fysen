import {
  ahaAnalysisHandoffReceiptSchema,
  ahaConsumerLogoutReceiptSchema,
  ahaConsumerSessionCreateSchema,
  ahaConsumerSessionReceiptSchema,
  fysenFoodCollectionV1Schema,
  minMatItemSchema,
  minMatListSchema,
  minMatSaveInputSchema,
  type AhaAnalysisHandoffReceipt,
  type AhaConsumerLogoutReceipt,
  type AhaConsumerSessionCreate,
  type AhaConsumerSessionReceipt,
  type FysenFoodCollectionV1,
  type MinMatItem,
  type MinMatList,
} from "@fysen/contracts/aha-min-mat";

function apiBaseUrl(): string {
  const configured = process.env.FYSEN_API_BASE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3001";
  throw new Error("FYSEN_API_BASE_URL is required in production");
}

async function request(path: string, init: RequestInit): Promise<Response> {
  return fetch(`${apiBaseUrl()}${path}`, {
    ...init,
    cache: "no-store",
    signal: AbortSignal.timeout(5_000),
  });
}

export async function connectAhaConsumer(input: AhaConsumerSessionCreate): Promise<AhaConsumerSessionReceipt> {
  const body = ahaConsumerSessionCreateSchema.parse(input);
  const response = await request("/v1/aha/sessions", {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`AHA consumer session failed with HTTP ${response.status}`);
  return ahaConsumerSessionReceiptSchema.parse(await response.json());
}

export async function revokeAhaConsumer(sessionToken: string): Promise<AhaConsumerLogoutReceipt> {
  const response = await request("/v1/aha/sessions/current", {
    method: "DELETE",
    headers: { accept: "application/json", authorization: `Bearer ${sessionToken}` },
  });
  if (!response.ok) throw new Error(`AHA consumer logout failed with HTTP ${response.status}`);
  return ahaConsumerLogoutReceiptSchema.parse(await response.json());
}

export async function getMinMat(sessionToken: string): Promise<MinMatList> {
  const response = await request("/v1/min-mat", {
    method: "GET",
    headers: { accept: "application/json", authorization: `Bearer ${sessionToken}` },
  });
  if (!response.ok) throw new Error(`Min mat list failed with HTTP ${response.status}`);
  return minMatListSchema.parse(await response.json());
}

export async function saveMinMat(sessionToken: string, menuItemId: string): Promise<MinMatItem> {
  const body = minMatSaveInputSchema.parse({ menuItemId });
  const response = await request("/v1/min-mat/items", {
    method: "POST",
    headers: { accept: "application/json", authorization: `Bearer ${sessionToken}`, "content-type": "application/json" },
    body: JSON.stringify(body),
  });
  if (!response.ok) throw new Error(`Min mat save failed with HTTP ${response.status}`);
  return minMatItemSchema.parse(await response.json());
}

export async function removeMinMat(sessionToken: string, savedItemId: string): Promise<AhaConsumerLogoutReceipt> {
  const response = await request(`/v1/min-mat/items/${encodeURIComponent(savedItemId)}`, {
    method: "DELETE",
    headers: { accept: "application/json", authorization: `Bearer ${sessionToken}` },
  });
  if (!response.ok) throw new Error(`Min mat remove failed with HTTP ${response.status}`);
  return ahaConsumerLogoutReceiptSchema.parse(await response.json());
}

export async function issueAhaHandoff(sessionToken: string): Promise<AhaAnalysisHandoffReceipt> {
  const response = await request("/v1/min-mat/handoffs", {
    method: "POST",
    headers: { accept: "application/json", authorization: `Bearer ${sessionToken}` },
  });
  if (!response.ok) throw new Error(`AHA handoff issue failed with HTTP ${response.status}`);
  return ahaAnalysisHandoffReceiptSchema.parse(await response.json());
}

export async function redeemAhaHandoff(handoffToken: string): Promise<FysenFoodCollectionV1> {
  const response = await request("/v1/aha/handoffs/redeem", {
    method: "POST",
    headers: { accept: "application/json", authorization: `Handoff ${handoffToken}` },
  });
  if (!response.ok) throw new Error(`AHA handoff redemption failed with HTTP ${response.status}`);
  return fysenFoodCollectionV1Schema.parse(await response.json());
}
