export type MapMenuEvidence = { name: string; sourceUrl: string; date: string; origin: "live" | "archive" | "catalog"; price?: string; menuItemId?: string };
export type MapEvidenceBySlug = Record<string, MapMenuEvidence[]>;
export function safeMapMenuUrl(value: string): boolean {
  try { const url = new URL(value); return (url.protocol === "https:" || url.protocol === "http:") && !url.username && !url.password; }
  catch { return false; }
}
