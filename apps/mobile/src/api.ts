const BASE = "https://fysen-api.vercel.app";
const REQUEST_TIMEOUT_MS = 12000;

export interface ArchivedDish {
  readonly name: string;
  readonly normalizedName: string;
  readonly priceMinor: number | null;
  readonly priceMaxMinor: number | null;
  readonly priceKind: "exact" | "from" | "multiple";
  readonly currency: "NOK";
  readonly restaurant: {
    readonly name: string;
    readonly slug: string;
    readonly address: string;
    readonly city: string;
  };
  readonly menu: {
    readonly sourceUrl: string;
    readonly observedAt: string;
  };
}

export type ArchivedSearchResponse = {
  readonly source: "verified-menu-archive";
  readonly realtime: false;
  readonly city: string;
  readonly results: readonly ArchivedDish[];
};

export type FeaturedResponse = {
  readonly city: string;
  readonly source: "verified-menu-archive";
  readonly realtime: false;
  readonly dishes: readonly {
    readonly name: string;
    readonly query: string;
    readonly restaurantCount: number;
  }[];
};

function object(value: unknown): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Ugyldig menyarkiv.");
  }
  return value as Record<string, unknown>;
}

function text(value: unknown): value is string {
  return typeof value === "string" && value.trim().length > 0;
}

function price(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isSafeInteger(value) && value >= 0);
}

function validSource(value: unknown): value is string {
  return text(value) && /^https?:\/\/[^\s/]+/iu.test(value);
}

function verifiedEnvelope(value: unknown): Record<string, unknown> {
  const data = object(value);
  if (data.source !== "verified-menu-archive" || data.realtime !== false ||
      data.city !== "Oslo") {
    throw new Error("Menyarkivet mangler sikker kildeinformasjon.");
  }
  return data;
}

export function parseArchivedSearch(value: unknown): ArchivedSearchResponse {
  const data = verifiedEnvelope(value);
  if (!Array.isArray(data.results) || data.results.length > 50) throw new Error("Ugyldige menytreff.");
  const results = data.results.map((candidate: unknown): ArchivedDish => {
    const dish = object(candidate);
    const restaurant = object(dish.restaurant);
    const menu = object(dish.menu);
    if (!text(dish.name) || !text(dish.normalizedName) ||
        !price(dish.priceMinor) || !price(dish.priceMaxMinor) ||
        !["exact", "from", "multiple"].includes(String(dish.priceKind)) ||
        dish.currency !== "NOK" ||
        !text(restaurant.name) || !text(restaurant.slug) ||
        !text(restaurant.address) || restaurant.city !== "Oslo" ||
        !validSource(menu.sourceUrl) || !text(menu.observedAt) ||
        !Number.isFinite(Date.parse(menu.observedAt))) {
      throw new Error("Ugyldig menyinformasjon.");
    }
    return {
      name: dish.name, normalizedName: dish.normalizedName,
      priceMinor: dish.priceMinor, priceMaxMinor: dish.priceMaxMinor,
      priceKind: dish.priceKind, currency: "NOK",
      restaurant: {
        name: restaurant.name, slug: restaurant.slug,
        address: restaurant.address, city: "Oslo",
      },
      menu: { sourceUrl: menu.sourceUrl, observedAt: menu.observedAt },
    } as ArchivedDish;
  });
  return { source: "verified-menu-archive", realtime: false, city: "Oslo", results };
}

export function parseArchivedBrowse(value: unknown): FeaturedResponse {
  const data = verifiedEnvelope(value);
  if (!Array.isArray(data.dishes) || data.dishes.length > 100) throw new Error("Ugyldig Matlyst-utvalg.");
  const dishes = data.dishes.map((candidate: unknown) => {
    const dish = object(candidate);
    if (!text(dish.name) || !text(dish.query) ||
        typeof dish.restaurantCount !== "number" ||
        !Number.isSafeInteger(dish.restaurantCount) || dish.restaurantCount < 0) {
      throw new Error("Ugyldig Matlyst-rett.");
    }
    return {
      name: dish.name as string,
      query: dish.query as string,
      restaurantCount: dish.restaurantCount as number,
    };
  });
  return { city: "Oslo", source: "verified-menu-archive", realtime: false, dishes };
}

async function getJson(path: string, signal?: AbortSignal): Promise<unknown> {
  const controller = new AbortController();
  const onAbort = () => controller.abort();
  if (signal?.aborted) controller.abort();
  signal?.addEventListener("abort", onAbort, { once: true });
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
  try {
    const response = await fetch(BASE + path, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    return (await response.json()) as unknown;
  } finally {
    clearTimeout(timeout);
    signal?.removeEventListener("abort", onAbort);
  }
}

/** Public read-only archive; never requests database-based search or demand logging. */
export async function searchDishes(term: string, signal?: AbortSignal): Promise<ArchivedSearchResponse> {
  const params = new URLSearchParams({
    q: term,
    city: "Oslo",
    limit: "20",
    sort: "relevance",
  });
  return parseArchivedSearch(await getJson("/v1/dishes/archive/search?" + params.toString(), signal));
}

/** Counts distinct archived restaurants, not recent additions or live demand. */
export async function loadFeatured(signal?: AbortSignal): Promise<FeaturedResponse> {
  return parseArchivedBrowse(await getJson("/v1/dishes/archive/browse?city=Oslo", signal));
}
