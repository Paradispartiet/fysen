function compositionParts(description: string): string[] {
  const parts = description
    .split(/\s*(?:&|·|,|;|\+)\s*/u)
    .map((part) => part.trim())
    .filter((part) => part.length >= 2 && part.length <= 48);

  return Array.from(new Set(parts)).slice(0, 6);
}

export function DishComposition({ description }: { description: string | null }) {
  if (!description) return null;

  const parts = compositionParts(description);
  if (parts.length < 2) return null;

  return (
    <aside className="dishComposition" aria-label="Innhold fra menybeskrivelsen">
      <div className="dishCompositionHeading">
        <strong>I denne retten</strong>
        <span>fra menybeskrivelsen</span>
      </div>
      <div className="dishCompositionChips">
        {parts.map((part) => <span key={part}>{part}</span>)}
      </div>
    </aside>
  );
}
