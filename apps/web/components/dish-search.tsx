import { withPublicBasePath } from "../lib/public-path";

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
    <form
      className={compact ? "dishSearch dishSearchCompact" : "dishSearch"}
      role="search"
      action={withPublicBasePath("/search")}
    >
      <label className="srOnly" htmlFor={inputId}>Retten du vil spise</label>
      <div className="dishSearchField">
        <span className="dishSearchIcon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m15.5 15.5 5 5" />
          </svg>
        </span>
        <input
          id={inputId}
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="Biff tartar, ramen, carbonara …"
          autoComplete="off"
          enterKeyHint="search"
        />
      </div>
      <input type="hidden" name="city" value={city} />
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}
