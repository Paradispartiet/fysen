"use client";

import { usePreviewLocale } from "./language-preview";
import { translate } from "../lib/locale-messages";
import type { DishSearchSort } from "@fysen/contracts";
import { withPublicBasePath } from "../lib/public-path";

export function DishSearch({
  defaultValue = "",
  city = "Oslo",
  compact = false,
  buttonLabel,
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
  const locale = usePreviewLocale();
  return (
    <form
      className={compact ? "dishSearch dishSearchCompact" : "dishSearch"}
      role="search"
      lang={locale}
      action={withPublicBasePath("/search")}
    >
      <label className="srOnly" htmlFor={inputId}>{translate(locale, "dishLabel")}</label>
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
          placeholder={translate(locale, "placeholder")}
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
      <button type="submit">{buttonLabel ?? translate(locale, "searchButton")}</button>
    </form>
  );
}
