/**
 * Matlyst claims are about the inspected data only. A catalog suggestion is
 * not proof that a restaurant currently serves the dish.
 */
export type MenuEvidenceKind = "live" | "archive" | "unchecked" | "unavailable";

export function menuEvidenceLabel(kind: MenuEvidenceKind, restaurantCount: number): string {
  if (kind === "unavailable") return "Rettforslag · menydekning utilgjengelig";
  if (kind === "unchecked") return "Rettforslag · ikke kontrollert mot menyarkivet";

  if (restaurantCount === 0) {
    return kind === "archive"
      ? "Rettforslag · ikke funnet i det kontrollerte menyarkivet"
      : "Rettforslag · ingen treff i de hentede menyene";
  }
  const restaurants = restaurantCount === 1 ? "restaurant" : "restauranter";
  return kind === "archive"
    ? `Arkivert menytreff hos ${restaurantCount} ${restaurants} · ikke bekreftet nå`
    : `Registrert hos ${restaurantCount} ${restaurants} i de hentede menyene`;
}
