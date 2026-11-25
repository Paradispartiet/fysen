import type { ReactNode } from "react";
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
  return (
    <header className={results ? "globalHeader globalHeaderResults" : "globalHeader"}>
      <div className="globalHeaderInner">
        <div className="globalHeaderTopline">
          <FysenLogo />
          <div className="globalHeaderActions">
            <span className="locationText" aria-label={`Valgt by: ${city}`}>{city}</span>
            <details className="siteMenu">
              <summary className="siteMenuButton">
                <svg aria-hidden="true" viewBox="0 0 24 24" fill="none">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <span>Meny</span>
              </summary>
              <nav className="siteMenuPanel" aria-label="Hovedmeny">
                <a href={withPublicBasePath("/")}>Forsiden</a>
                <a href={dishBrowseHref(city)}>Finn retter</a>
                <span>Velg by</span>
                {nordicCities.map(({ name }) => (
                  <a key={name} href={citySwitchHref(name, query)} aria-current={city === name ? "true" : undefined}>
                    {name}
                  </a>
                ))}
                {ahaMinMatPilotEnabled ? <a href={withPublicBasePath("/min-mat")}>Min mat</a> : null}
                <a href={withPublicBasePath("/om")}>Om Fysen</a>
                <a href={withPublicBasePath("/om") + "#menydata"}>Om menydata</a>
              </nav>
            </details>
          </div>
        </div>
        {children ? <div className="globalHeaderSearch">{children}</div> : null}
      </div>
    </header>
  );
}
