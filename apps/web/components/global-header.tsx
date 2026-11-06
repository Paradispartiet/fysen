import type { ReactNode } from "react";
import { ahaMinMatPilotEnabled } from "../lib/aha-min-mat-pilot";
import { dishBrowseHref, withPublicBasePath } from "../lib/public-path";
import { FysenLogo } from "./fysen-logo";

export function GlobalHeader({
  children,
  results = false,
  city = "Oslo",
}: {
  children?: ReactNode;
  results?: boolean;
  city?: string;
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
                {ahaMinMatPilotEnabled ? <a href={withPublicBasePath("/min-mat")}>Min mat</a> : null}
                <a href={withPublicBasePath("/om")}>Om Fysen</a>
              </nav>
            </details>
          </div>
        </div>
        {children ? <div className="globalHeaderSearch">{children}</div> : null}
      </div>
    </header>
  );
}
