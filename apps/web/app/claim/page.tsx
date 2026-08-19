import type { RestaurantClaimContext } from "@fysen/contracts/restaurant-claims";
import { GlobalHeader } from "../../components/global-header";
import { RestaurantClaimForm } from "../../components/restaurant-claim-form";
import { getRestaurantClaimContext } from "../../lib/fysen-api";
import { dishBrowseHref, withPublicBasePath } from "../../lib/public-path";

type SearchParams = Promise<Record<string, string | string[] | undefined>>;

function first(value: string | string[] | undefined): string {
  return typeof value === "string" ? value.trim() : "";
}

async function loadClaimContext(slug: string): Promise<RestaurantClaimContext | null> {
  if (!slug) return null;
  try {
    return await getRestaurantClaimContext(slug);
  } catch {
    return null;
  }
}

export default async function ClaimPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const slug = first(params.restaurant);
  const context = await loadClaimContext(slug);

  return (
    <div className="claimPage">
      <GlobalHeader city={context?.restaurant.city ?? "Oslo"} />
      <main className="claimMain">
        <a className="claimBackLink" href={dishBrowseHref(context?.restaurant.city ?? "Oslo")}>← Tilbake til rettene</a>

        {!context ? (
          <section className="claimCard">
            <p className="claimEyebrow">Claim Restaurant</p>
            <h1>Fant ikke restauranten</h1>
            <p>Åpne claim-siden fra en restaurant som allerede finnes i Fysen.</p>
          </section>
        ) : (
          <section className="claimCard">
            <p className="claimEyebrow">Claim Restaurant</p>
            <h1>Driver du {context.restaurant.name}?</h1>
            <p className="claimRestaurantAddress">{context.restaurant.address}, {context.restaurant.city}</p>

            {context.claimState === "claimed" ? (
              <div className="claimStateBox" data-state="claimed">
                <strong>Restauranten har verifisert tilgang.</strong>
                <p>Har du fått en Fysen Pro-engangskode, kan du åpne restaurantens dashboard.</p>
                <p><a href={withPublicBasePath("/pro/login")}>Åpne Fysen Pro →</a></p>
              </div>
            ) : (
              <>
                {context.claimState === "under_review" ? (
                  <div className="claimStateBox" data-state="review">
                    <strong>En forespørsel er allerede til behandling.</strong>
                    <p>Du kan fortsatt sende inn en egen forespørsel dersom du representerer virksomheten.</p>
                  </div>
                ) : null}

                <div className="claimPrinciples">
                  <p>Vi verifiserer tilknytningen manuelt før tilgang gis.</p>
                  <p>Claiming kan senere gi kontroll over restauranteide kontakt- og profilfelt. Det gir aldri rett til å omskrive Fysens kildebevis, historiske menydata eller organiske rangering.</p>
                </div>
                <RestaurantClaimForm restaurantSlug={context.restaurant.slug} />
              </>
            )}
          </section>
        )}
      </main>
    </div>
  );
}
