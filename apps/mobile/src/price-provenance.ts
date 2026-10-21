/** Native price label must reflect the menu source, not invent a dine-in price. */
export function priceProvenanceLabel(sourceUrl: string): string {
  let hostname: string;
  try {
    hostname = new URL(sourceUrl).hostname.toLowerCase();
  } catch {
    return "Pris fra menykilden";
  }
  if (hostname === "wolt.com" || hostname.endsWith(".wolt.com")) {
    return "Wolt-leveringspris · kan avvike fra bordpris";
  }
  if (hostname === "foodora.no" || hostname.endsWith(".foodora.no")) {
    return "Foodora-leveringspris · kan avvike fra bordpris";
  }
  return "Pris fra menykilden";
}
