import type { ReactNode } from "react";
import { ahaMinMatPilotEnabled } from "../lib/aha-min-mat-pilot";
import { citySwitchHref, dishBrowseHref, nordicCities, withPublicBasePath } from "../lib/public-path";
import { FysenLogo } from "./fysen-logo";

export function GlobalHeader({
  children,
  results = false,
  city = "Oslo",
  query = "",
  citySelectionPending = false,
}: {
  children?: ReactNode;
  results?: boolean;
  city?: string;
  query?: string;
  citySelectionPending?: boolean;
}) {
  return (
    <>
      <header className={results ? "globalHeader globalHeaderResults" : "globalHeader"}>
        <div className="globalHeaderInner">
          <div className="globalHeaderTopline">
            <FysenLogo />
            <div className="globalHeaderActions">
              {!citySelectionPending ? (
              <details className="cityMenu" name="fysen-header-disclosure">
                <summary className="locationText cityMenuButton" aria-label={`By: ${city}. Bytt by`}>
                  {city}
                  <svg aria-hidden="true" viewBox="0 0 16 16" fill="none">
                    <path d="m4 6 4 4 4-4" />
                  </svg>
                </summary>
                <nav className="siteMenuPanel cityMenuPanel" aria-label="Byvalg">
                  {nordicCities.map(({ name }) => (
                    <a key={name} href={citySwitchHref(name, query)} aria-current={city === name ? "true" : undefined}>{name}</a>
                  ))}
                </nav>
              </details>
              ) : null}
              <details className="siteMenu" name="fysen-header-disclosure">
                <summary className="siteMenuButton">
                  <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <span>Meny</span>
                </summary>
                <nav className="siteMenuPanel" aria-label="Hovedmeny">
                  <a href={withPublicBasePath("/")}>Forsiden</a>
                  <a href={dishBrowseHref(city)}>Finn retter</a>
                  <a href={withPublicBasePath("/kart")}>Kart · Oslo</a>
                  {ahaMinMatPilotEnabled ? <a href={withPublicBasePath("/min-mat")}>Min mat</a> : null}
                  <a href={withPublicBasePath("/om")}>Om Fysen</a>
                  <a href={withPublicBasePath("/om") + "#menydata"}>Om menydata</a>
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
