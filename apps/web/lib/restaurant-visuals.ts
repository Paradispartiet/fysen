type RestaurantIdentity = { readonly name: string; readonly address: string };

const byporten = {
  logo: "/restaurants/egon-byporten/logo.svg",
  exterior: "/restaurants/egon-byporten/exterior.webp",
  interior: "/restaurants/egon-byporten/interior.webp",
  sourceUrl: "https://egon.no/restauranter/oslo/egon-byporten",
} as const;

const karlJohan = {
  logo: byporten.logo,
  exterior: "/restaurants/egon-karl-johan/exterior.webp",
  interior: "/restaurants/egon-karl-johan/interior.webp",
  sourceUrl: "https://egon.no/restauranter/oslo/egon-karl-johan",
} as const;

const nordstrand = {
  logo: byporten.logo,
  exterior: "/restaurants/egon-nordstrand/exterior.webp",
  interior: null,
  sourceUrl: "https://egon.no/restauranter/oslo/egon-nordstrand",
} as const;

const storo = {
  logo: byporten.logo,
  exterior: "/restaurants/egon-storo/exterior.webp",
  interior: "/restaurants/egon-storo/interior.webp",
  sourceUrl: "https://egon.no/restauranter/oslo/egon-storo",
} as const;

function normalized(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

/** Match the branch and street address, independent of archive/live IDs. */
export function restaurantVisuals(restaurant: RestaurantIdentity) {
  const address = normalized(restaurant.address);
  if (normalized(restaurant.name) === "egon storo" &&
      /^vitaminveien 9 11(?: |$)/u.test(address)) return storo;
  if (normalized(restaurant.name) === "egon nordstrand" &&
      /^ekebergveien 228 ?b(?: |$)/u.test(address)) {
    return nordstrand;
  }
  if (normalized(restaurant.name) === "egon karl johan" &&
      (address === "karl johans gate 37" || address.startsWith("karl johans gate 37 "))) {
    return karlJohan;
  }
  return normalized(restaurant.name) === "egon byporten" &&
    (address === "jernbanetorget 6" || address.startsWith("jernbanetorget 6 "))
    ? byporten : null;
}
