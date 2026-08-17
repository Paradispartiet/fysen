export function DishSearch({
  defaultValue = "",
  city = "Oslo",
  compact = false,
  buttonLabel = "Finn retten",
  inputId = "dish-query",
}: {
  defaultValue?: string;
  city?: string;
  compact?: boolean;
  buttonLabel?: string;
  inputId?: string;
}) {
  return (
    <form className={compact ? "dishSearch dishSearchCompact" : "dishSearch"} role="search" action="/search">
      <label className="srOnly" htmlFor={inputId}>Retten du vil spise</label>
      <input
        id={inputId}
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder="Biff tartar, ramen, carbonara …"
        autoComplete="off"
        enterKeyHint="search"
      />
      <input type="hidden" name="city" value={city} />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}
