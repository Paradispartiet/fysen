import type { DishSearchResult } from "@fysen/contracts";
import { FreshnessStatus } from "./freshness-status";

function formatPrice(priceMinor: number | null, currency: string): string {
  if (priceMinor === null) return "Pris ikke oppgitt";

  if (currency === "NOK") {
    return `${new Intl.NumberFormat("nb-NO", { maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2 }).format(priceMinor / 100)} kr`;
  }

  return new Intl.NumberFormat("nb-NO", {
    style: "currency",
    currency,
    maximumFractionDigits: priceMinor % 100 === 0 ? 0 : 2,
  }).format(priceMinor / 100);
}

export function DishResult({ result }: { result: DishSearchResult }) {
  return (
    <article className="dishResult">
      <div className="dishResultTopline">
        <div className="dishResultIdentity">
          <h2>{result.dish.name}</h2>
          <p className="restaurantName">{result.restaurant.name}</p>
        </div>
        <p className={result.dish.priceMinor === null ? "dishPrice isMissing" : "dishPrice"}>
          {formatPrice(result.dish.priceMinor, result.dish.currency)}
        </p>
      </div>

      {result.dish.description ? <p className="dishDescription">{result.dish.description}</p> : null}

      <div className="dishResultFacts">
        <span>{result.restaurant.address}, {result.restaurant.city}</span>
        {result.dish.sectionName ? <span>{result.dish.sectionName}</span> : null}
      </div>

      <div className="dishResultBottomline">
        <FreshnessStatus checkedAt={result.menu.lastCheckedAt} freshUntil={result.menu.freshUntil} />
        <a className="evidenceLink" href={result.menu.sourceUrl} target="_blank" rel="noreferrer">
          Se meny <span aria-hidden="true">↗</span>
        </a>
      </div>
    </article>
  );
}
