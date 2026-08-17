import {
  conversionEventInputSchema,
  conversionEventReceiptSchema,
  dishSearchQuerySchema,
  dishSearchResponseSchema,
  type ConversionEventInput,
  type ConversionEventReceipt,
  type DishSearchQuery,
  type DishSearchResponse,
} from "@fysen/contracts";

function apiBaseUrl(): string {
  const configured = process.env.FYSEN_API_BASE_URL?.trim();
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.NODE_ENV === "development") return "http://localhost:3001";
  throw new Error("FYSEN_API_BASE_URL is required in production");
}

export async function searchDishes(input: DishSearchQuery): Promise<DishSearchResponse> {
  const query = dishSearchQuerySchema.parse(input);
  const params = new URLSearchParams({
    q: query.q,
    city: query.city,
    limit: String(query.limit),
    sort: query.sort,
  });
  if (query.lat !== undefined && query.lon !== undefined) {
    params.set("lat", String(query.lat));
    params.set("lon", String(query.lon));
  }

  const response = await fetch(`${apiBaseUrl()}/v1/dishes/search?${params.toString()}`, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API dish search failed with HTTP ${response.status}`);
  }

  return dishSearchResponseSchema.parse(await response.json());
}

export async function recordConversionEvent(input: ConversionEventInput): Promise<ConversionEventReceipt> {
  const event = conversionEventInputSchema.parse(input);
  const response = await fetch(`${apiBaseUrl()}/v1/funnel/events`, {
    method: "POST",
    cache: "no-store",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(event),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API conversion event failed with HTTP ${response.status}`);
  }

  return conversionEventReceiptSchema.parse(await response.json());
}
