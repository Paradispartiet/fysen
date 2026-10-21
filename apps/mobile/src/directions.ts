/** Directions, not a search-result list, to the restaurant's actual location. */
export type RestaurantDestination = {
  name: string;
  address: string;
  latitude: number | null;
  longitude: number | null;
};

function validatedCoordinates(destination: RestaurantDestination): string | null {
  const { latitude, longitude } = destination;
  if (
    typeof latitude !== "number" || typeof longitude !== "number" ||
    !Number.isFinite(latitude) || !Number.isFinite(longitude) ||
    latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180 ||
    (latitude === 0 && longitude === 0)
  ) {
    return null;
  }
  return latitude + "," + longitude;
}

export function restaurantDirectionsUrl(
  platform: string,
  restaurant: RestaurantDestination,
): string {
  const destination = validatedCoordinates(restaurant)
    ?? [restaurant.name, restaurant.address].filter(Boolean).join(", ");
  const encoded = encodeURIComponent(destination);

  if (platform === "ios") {
    return "https://maps.apple.com/?daddr=" + encoded + "&dirflg=d";
  }

  return "https://www.google.com/maps/dir/?api=1&destination=" + encoded + "&travelmode=driving";
}
