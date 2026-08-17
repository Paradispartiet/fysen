type Suggestion = {
  label: string;
  query: string;
  kind?: "editorial" | "sponsored";
  sponsorName?: string;
};

const defaultSuggestions: Suggestion[] = [
  { label: "Ramen", query: "ramen" },
  { label: "Tartar", query: "tartar" },
  { label: "Fried chicken", query: "fried chicken" },
  { label: "Pizza", query: "pizza" },
];

function suggestionHref(query: string): string {
  const params = new URLSearchParams({ q: query, city: "Oslo" });
  return `/search?${params.toString()}`;
}

export function SuggestionRail({ suggestions = defaultSuggestions }: { suggestions?: Suggestion[] }) {
  if (suggestions.length === 0) return null;

  return (
    <section className="suggestionRail" aria-labelledby="suggestion-rail-title">
      <div className="suggestionRailHeading">
        <div>
          <p className="suggestionRailEyebrow">Matlyst</p>
          <h2 id="suggestion-rail-title">Forslag akkurat nå</h2>
        </div>
        <p>Snarveier til retter du kan søke etter.</p>
      </div>

      <div className="suggestionRailList">
        {suggestions.map((suggestion) => (
          <a className="suggestionCard" href={suggestionHref(suggestion.query)} key={`${suggestion.kind ?? "editorial"}-${suggestion.query}`}>
            <span className="suggestionCardMeta">
              {suggestion.kind === "sponsored" ? "Sponset" : "Forslag"}
            </span>
            <strong>{suggestion.label}</strong>
            <span className="suggestionCardAction">Finn retten <span aria-hidden="true">→</span></span>
            {suggestion.kind === "sponsored" && suggestion.sponsorName ? (
              <span className="suggestionSponsor">Fra {suggestion.sponsorName}</span>
            ) : null}
          </a>
        ))}
      </div>
    </section>
  );
}
