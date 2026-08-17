import type { ReactNode } from "react";
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
          <span className="locationText" aria-label={`Valgt by: ${city}`}>{city}</span>
        </div>
        {children ? <div className="globalHeaderSearch">{children}</div> : null}
      </div>
    </header>
  );
}
