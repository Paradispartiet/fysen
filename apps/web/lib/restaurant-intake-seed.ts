import type { RestaurantIntakeRequest } from "@fysen/contracts/restaurant-intake";

export function intakeSlug(name: string): string {
  const stem = name
    .toLowerCase()
    .replace(/æ/gu, "ae")
    .replace(/ø/gu, "o")
    .replace(/å/gu, "a")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/gu, "")
    .replace(/[^a-z0-9]+/gu, "-")
    .replace(/^-|-$/gu, "");
  if (!stem)
    throw new Error(
      "Restaurantnavnet må inneholde bokstaver som kan brukes i en slug.",
    );
  return `${stem
    .replace(/-oslo$/u, "")
    .slice(0, 150)
    .replace(/-$/u, "")}-oslo`;
}

export function buildRestaurantIntakeSeed(
  input: RestaurantIntakeRequest,
  checkedAt: string,
) {
  const actions: Array<{
    type: "booking" | "order";
    url: string;
    sourceUrl: string;
    provider: null;
  }> = [];
  for (const [type, url] of [
    ["booking", input.bookingUrl],
    ["order", input.orderUrl],
  ] as const) {
    if (url && input.actionSourceUrl)
      actions.push({
        type,
        url,
        sourceUrl: input.actionSourceUrl,
        provider: null,
      });
  }
  return {
    version: 1,
    concurrency: 1,
    coverageRationale: input.coverageNote,
    restaurants: [
      {
        version: 1,
        restaurant: {
          slug: intakeSlug(input.name),
          name: input.name,
          websiteUrl: input.websiteUrl ?? null,
          address: input.address,
          city: "Oslo",
          countryCode: "NO",
        },
        menuSource: {
          url: input.menuUrl,
          sourceType: input.sourceType,
          fetchMode: input.fetchMode,
          userAgent: "FysenMenuBot/0.1",
          checkIntervalMinutes: 720,
        },
        verification: {
          hours: {
            status: "unverified",
            checkedAt,
            note: "Registrert av operatør. Åpningstider er ikke kontrollert; meny, adresse og handlinger skal valideres i eksisterende intake.",
          },
        },
        actions,
        assertionCount: 8,
      },
    ],
  };
}
