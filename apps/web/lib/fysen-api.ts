import {
  dishBrowseQuerySchema,
  dishBrowseResponseSchema,
  type DishBrowseQuery,
  type DishBrowseResponse,
} from "@fysen/contracts/dish-browse";
import {
  fysenProDashboardSchema,
  fysenProLogoutReceiptSchema,
  fysenProSessionReceiptSchema,
  fysenProSetupRedeemSchema,
  type FysenProDashboard,
  type FysenProLogoutReceipt,
  type FysenProSessionReceipt,
} from "@fysen/contracts/fysen-pro";
import {
  restaurantClaimContextSchema,
  restaurantClaimReceiptSchema,
  restaurantClaimRequestSchema,
  restaurantClaimSlugSchema,
  type RestaurantClaimContext,
  type RestaurantClaimReceipt,
  type RestaurantClaimRequest,
} from "@fysen/contracts/restaurant-claims";
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

export async function browseDishes(input: DishBrowseQuery): Promise<DishBrowseResponse> {
  const query = dishBrowseQuerySchema.parse(input);
  const params = new URLSearchParams({ city: query.city });
  const response = await fetch(`${apiBaseUrl()}/v1/dishes/browse?${params.toString()}`, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API dish browse failed with HTTP ${response.status}`);
  }

  return dishBrowseResponseSchema.parse(await response.json());
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

export async function getRestaurantClaimContext(restaurantSlug: string): Promise<RestaurantClaimContext> {
  const slug = restaurantClaimSlugSchema.parse(restaurantSlug);
  const response = await fetch(`${apiBaseUrl()}/v1/restaurants/${encodeURIComponent(slug)}/claim`, {
    cache: "no-store",
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API restaurant claim context failed with HTTP ${response.status}`);
  }

  return restaurantClaimContextSchema.parse(await response.json());
}

export async function submitRestaurantClaim(
  restaurantSlug: string,
  input: RestaurantClaimRequest,
): Promise<RestaurantClaimReceipt> {
  const slug = restaurantClaimSlugSchema.parse(restaurantSlug);
  const claim = restaurantClaimRequestSchema.parse(input);
  const response = await fetch(`${apiBaseUrl()}/v1/restaurants/${encodeURIComponent(slug)}/claims`, {
    method: "POST",
    cache: "no-store",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(claim),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API restaurant claim request failed with HTTP ${response.status}`);
  }

  return restaurantClaimReceiptSchema.parse(await response.json());
}

export async function redeemFysenProSetupToken(setupToken: string): Promise<FysenProSessionReceipt> {
  const input = fysenProSetupRedeemSchema.parse({ setupToken });
  const response = await fetch(`${apiBaseUrl()}/v1/pro/sessions`, {
    method: "POST",
    cache: "no-store",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API Pro setup redemption failed with HTTP ${response.status}`);
  }

  return fysenProSessionReceiptSchema.parse(await response.json());
}

export async function getFysenProDashboard(sessionToken: string): Promise<FysenProDashboard> {
  const response = await fetch(`${apiBaseUrl()}/v1/pro/dashboard`, {
    cache: "no-store",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${sessionToken}`,
    },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API Pro dashboard failed with HTTP ${response.status}`);
  }

  return fysenProDashboardSchema.parse(await response.json());
}

export async function revokeFysenProSession(sessionToken: string): Promise<FysenProLogoutReceipt> {
  const response = await fetch(`${apiBaseUrl()}/v1/pro/sessions/current`, {
    method: "DELETE",
    cache: "no-store",
    headers: {
      accept: "application/json",
      authorization: `Bearer ${sessionToken}`,
    },
    signal: AbortSignal.timeout(5_000),
  });

  if (!response.ok) {
    throw new Error(`Fysen API Pro logout failed with HTTP ${response.status}`);
  }

  return fysenProLogoutReceiptSchema.parse(await response.json());
}
