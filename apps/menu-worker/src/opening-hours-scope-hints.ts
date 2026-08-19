export const OPENING_HOURS_SCOPE_HINT_RESOLVER_VERSION = "scope-priority-v1";

function normalizedHintList(values: readonly string[]): readonly string[] {
  const seen = new Set<string>();
  const output: string[] = [];
  for (const value of values) {
    const hint = value.trim();
    if (!hint || seen.has(hint)) continue;
    seen.add(hint);
    output.push(hint);
  }
  return output;
}

export function resolveOpeningHoursScopeHints(
  explicitScopeHints: readonly string[],
  fallbackScopeHints: readonly string[],
): readonly string[] {
  const explicit = normalizedHintList(explicitScopeHints);
  return explicit.length > 0 ? explicit : normalizedHintList(fallbackScopeHints);
}
