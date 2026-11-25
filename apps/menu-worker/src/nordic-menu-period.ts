export interface MenuDateRange {
  readonly validFrom: string;
  readonly validThrough: string;
  readonly overridePeriod?: { readonly from: string; readonly through: string };
}

function validIsoDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/u.test(value)) return false;
  const time = Date.parse(value + "T00:00:00Z");
  return Number.isFinite(time) && new Date(time).toISOString().slice(0,10) === value;
}

export function localMenuDate(now: Date, timeZone: string): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone, year: "numeric", month: "2-digit", day: "2-digit",
  }).formatToParts(now);
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return get("year") + "-" + get("month") + "-" + get("day");
}

export function assertOrdinaryMenuPeriod(today: string, period: MenuDateRange): void {
  const { validFrom, validThrough, overridePeriod } = period;
  if (![today, validFrom, validThrough].every(validIsoDate) || validFrom > validThrough ||
    today < validFrom || today > validThrough) {
    throw new Error("Reviewed ordinary menu is outside its validity period");
  }
  if (overridePeriod) {
    const { from, through } = overridePeriod;
    if (![from, through].every(validIsoDate) || from > through || from < validFrom || through > validThrough) {
      throw new Error("Invalid seasonal menu override");
    }
    if (today >= from && today <= through) {
      throw new Error("Seasonal menu override is active; review that menu separately");
    }
  }
}
