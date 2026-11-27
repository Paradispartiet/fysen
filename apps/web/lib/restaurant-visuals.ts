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

function normalized(value: string): string {
  return value.normalize("NFKC").toLocaleLowerCase("nb-NO").replace(/[^\p{L}\p{N}]+/gu, " ").trim();
}

/** Match the branch and street address, independent of archive/live IDs. */
export function restaurantVisuals(restaurant: RestaurantIdentity) {
  const address = normalized(restaurant.address);
  if (normalized(restaurant.name) === "egon karl johan" &&
      (address === "karl johans gate 37" || address.startsWith("karl johans gate 37 "))) {
    return karlJohan;
  }
  return normalized(restaurant.name) === "egon byporten" &&
    (address === "jernbanetorget 6" || address.startsWith("jernbanetorget 6 "))
    ? byporten : null;
}
