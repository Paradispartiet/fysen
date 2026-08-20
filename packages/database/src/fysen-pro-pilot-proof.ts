const SESSION_TOKEN_PATTERN = /^[A-Za-z0-9_-]{32,200}$/;

export interface FysenProPilotCookie {
  readonly sessionToken: string;
  readonly httpOnly: true;
  readonly secure: true;
  readonly sameSite: "lax";
  readonly path: "/";
}

export interface FysenProPilotDashboardSummary {
  readonly restaurant: {
    readonly slug: string;
    readonly name: string;
    readonly city: string;
  };
  readonly periodDays: 30;
  readonly impressions: number;
  readonly clicks: number;
  readonly ctr: number;
  readonly topDishCount: number;
  readonly menuSourceCount: number;
  readonly actionCount: number;
  readonly cityDemandGapCount: number;
  readonly lowVolumeDemandProtected: true;
}

function record(value: unknown, name: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error(`${name} must be an object.`);
  }
  return value as Record<string, unknown>;
}

function stringValue(value: unknown, name: string): string {
  if (typeof value !== "string" || value.trim().length === 0) throw new Error(`${name} must be a non-empty string.`);
  return value;
}

function nonNegativeInteger(value: unknown, name: string): number {
  if (typeof value !== "number" || !Number.isInteger(value) || value < 0) {
    throw new Error(`${name} must be a non-negative integer.`);
  }
  return value;
}

export function parseFysenProSessionSetCookie(setCookie: string | null): FysenProPilotCookie {
  if (!setCookie) throw new Error("Fysen Pro login did not set a session cookie.");
  const segments = setCookie.split(";").map((segment) => segment.trim());
  const first = segments[0] ?? "";
  const separator = first.indexOf("=");
  if (separator <= 0) throw new Error("Fysen Pro session cookie is malformed.");

  const name = first.slice(0, separator);
  const sessionToken = first.slice(separator + 1);
  if (name !== "fysen_pro_session" || !SESSION_TOKEN_PATTERN.test(sessionToken)) {
    throw new Error("Fysen Pro login did not set the canonical session cookie.");
  }

  const attributes = new Map<string, string | true>();
  for (const segment of segments.slice(1)) {
    const equals = segment.indexOf("=");
    if (equals === -1) {
      attributes.set(segment.toLowerCase(), true);
      continue;
    }
    attributes.set(segment.slice(0, equals).trim().toLowerCase(), segment.slice(equals + 1).trim().toLowerCase());
  }

  if (attributes.get("httponly") !== true) throw new Error("Fysen Pro session cookie is missing HttpOnly.");
  if (attributes.get("secure") !== true) throw new Error("Fysen Pro session cookie is missing Secure.");
  if (attributes.get("samesite") !== "lax") throw new Error("Fysen Pro session cookie must use SameSite=Lax.");
  if (attributes.get("path") !== "/") throw new Error("Fysen Pro session cookie must use Path=/.");

  return { sessionToken, httpOnly: true, secure: true, sameSite: "lax", path: "/" };
}

export function summarizeFysenProDashboard(value: unknown, expectedRestaurantSlug: string): FysenProPilotDashboardSummary {
  const dashboard = record(value, "dashboard");
  const restaurant = record(dashboard.restaurant, "dashboard.restaurant");
  const slug = stringValue(restaurant.slug, "dashboard.restaurant.slug");
  if (slug !== expectedRestaurantSlug) {
    throw new Error(`Fysen Pro dashboard is scoped to ${slug}, expected ${expectedRestaurantSlug}.`);
  }

  const periodDays = dashboard.periodDays;
  if (periodDays !== 30) throw new Error("Fysen Pro dashboard must use the canonical 30-day period.");

  const metrics = record(dashboard.metrics, "dashboard.metrics");
  const impressions = nonNegativeInteger(metrics.impressions, "dashboard.metrics.impressions");
  const clicks = nonNegativeInteger(metrics.clicks, "dashboard.metrics.clicks");
  const ctr = metrics.ctr;
  if (typeof ctr !== "number" || ctr < 0 || ctr > 1) throw new Error("Fysen Pro dashboard CTR must be between 0 and 1.");

  const topDishes = dashboard.topDishes;
  const menuSources = dashboard.menuSources;
  const actions = dashboard.actions;
  const cityDemandGaps = dashboard.cityDemandGaps;
  if (!Array.isArray(topDishes) || topDishes.length > 10) throw new Error("Fysen Pro topDishes contract is invalid.");
  if (!Array.isArray(menuSources)) throw new Error("Fysen Pro menuSources contract is invalid.");
  if (!Array.isArray(actions)) throw new Error("Fysen Pro actions contract is invalid.");
  if (!Array.isArray(cityDemandGaps) || cityDemandGaps.length > 5) throw new Error("Fysen Pro cityDemandGaps contract is invalid.");

  for (const [index, gapValue] of cityDemandGaps.entries()) {
    const gap = record(gapValue, `dashboard.cityDemandGaps[${index}]`);
    if (typeof gap.searches7d !== "number" || !Number.isInteger(gap.searches7d) || gap.searches7d < 3) {
      throw new Error("Fysen Pro dashboard leaks a low-volume Demand Loop query.");
    }
  }

  return {
    restaurant: {
      slug,
      name: stringValue(restaurant.name, "dashboard.restaurant.name"),
      city: stringValue(restaurant.city, "dashboard.restaurant.city"),
    },
    periodDays: 30,
    impressions,
    clicks,
    ctr,
    topDishCount: topDishes.length,
    menuSourceCount: menuSources.length,
    actionCount: actions.length,
    cityDemandGapCount: cityDemandGaps.length,
    lowVolumeDemandProtected: true,
  };
}

export function assertAcceptedOnlyPayload(value: unknown, name: string): void {
  const payload = record(value, name);
  if (payload.accepted !== true) throw new Error(`${name} did not return accepted=true.`);
  const forbiddenKeys = ["setupToken", "sessionToken", "token", "tokenHash"];
  for (const key of forbiddenKeys) {
    if (key in payload) throw new Error(`${name} exposes a forbidden token field.`);
  }
}
