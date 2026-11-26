"use client";

import type { ReactNode } from "react";
import { LanguagePreviewSelector, usePreviewLocale } from "./language-preview";
import { translate } from "../lib/locale-messages";
import { ahaMinMatPilotEnabled } from "../lib/aha-min-mat-pilot";
import { citySwitchHref, dishBrowseHref, nordicCities, withPublicBasePath } from "../lib/public-path";
import { FysenLogo } from "./fysen-logo";

export function GlobalHeader({
  children,
  results = false,
  city = "Oslo",
  query = "",
}: {
  children?: ReactNode;
  results?: boolean;
  city?: string;
  query?: string;
}) {
  const locale = usePreviewLocale();
  const t = (key: Parameters<typeof translate>[1]) => translate(locale, key);
  return (
    <>
      <header className={results ? "globalHeader globalHeaderResults" : "globalHeader"}>
        <div className="globalHeaderInner">
          <div className="globalHeaderTopline">
            <FysenLogo />
            <div className="globalHeaderActions">
              <span className="locationText" lang={locale} aria-label={translate(locale, "selectedCity", city)}>{city}</span>
              <details className="siteMenu" lang={locale}>
                <summary className="siteMenuButton">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>{t("menu")}</span>
                </summary>
                <nav className="siteMenuPanel" aria-label={t("mainMenu")}>
                  <a href={withPublicBasePath("/")}>{t("home")}</a>
                  <a href={dishBrowseHref(city)}>{t("findDishes")}</a>
                  <span>{t("chooseCity")}</span>
                  {nordicCities.map(({ name }) => (
                    <a key={name} href={citySwitchHref(name, query)} aria-current={city === name ? "true" : undefined}>{name}</a>
                  ))}
                  {ahaMinMatPilotEnabled ? <a href={withPublicBasePath("/min-mat")}>{t("myFood")}</a> : null}
                  <a href={withPublicBasePath("/om")}>{t("about")}</a>
                  <a href={withPublicBasePath("/om") + "#menydata"}>{t("aboutMenus")}</a>
                  <LanguagePreviewSelector />
                </nav>
              </details>
            </div>
          </div>
        </div>
      </header>
      {children ? (
        <div className="globalHeaderSearchRegion">
          <div className="globalHeaderSearch">{children}</div>
        </div>
      ) : null}
    </>
  );
}
