import type { DishSearchSort } from "@fysen/contracts";
import { withPublicBasePath } from "../lib/public-path";

export function DishSearch({
  defaultValue = "",
  city = "Oslo",
  compact = false,
  buttonLabel = "Finn retten",
  inputId = "dish-query",
  latitude = null,
  longitude = null,
  sort = "relevance",
}: {
  defaultValue?: string;
  city?: string;
  compact?: boolean;
  buttonLabel?: string;
  inputId?: string;
  latitude?: number | null;
  longitude?: number | null;
  sort?: DishSearchSort;
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
          minLength={2}
          maxLength={80}
          enterKeyHint="search"
        />
      </div>
      <input type="hidden" name="city" value={city} />
      {latitude !== null && longitude !== null ? (
        <>
          <input type="hidden" name="lat" value={latitude} />
          <input type="hidden" name="lon" value={longitude} />
          <input type="hidden" name="sort" value={sort} />
        </>
      ) : null}
      <button type="submit">{buttonLabel}</button>
    </form>
  );
}
