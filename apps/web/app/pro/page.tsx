import type { FysenProDashboard } from "@fysen/contracts/fysen-pro";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { FysenProLogoutButton } from "../../components/fysen-pro-logout-button";
import { GlobalHeader } from "../../components/global-header";
import { getFysenProDashboard } from "../../lib/fysen-api";
import { FYSEN_PRO_SESSION_COOKIE } from "../../lib/fysen-pro-session";
import { withPublicBasePath } from "../../lib/public-path";

const integerFormat = new Intl.NumberFormat("nb-NO");
const percentFormat = new Intl.NumberFormat("nb-NO", { style: "percent", maximumFractionDigits: 1 });
const dateTimeFormat = new Intl.DateTimeFormat("nb-NO", {
  dateStyle: "medium",
  timeStyle: "short",
  timeZone: "Europe/Oslo",
});

function dateTime(value: string | null): string {
  if (!value) return "Ikke kontrollert";
  return dateTimeFormat.format(new Date(value));
}

function sourceStatus(source: FysenProDashboard["menuSources"][number]): string {
  if (!source.enabled) return "Deaktivert";
  if (!source.lastCheckedAt || !source.freshUntil) return "Mangler kontroll";
  if (source.consecutiveFailures > 0) return `${source.consecutiveFailures} feil på rad`;
  return new Date(source.freshUntil).getTime() > Date.now() ? "Fersk" : "Utløpt";
}

function actionStatus(action: FysenProDashboard["actions"][number]): string {
  if (!action.enabled) return "Deaktivert";
  return action.publishable ? "Publiseres" : "Utløpt / skjult";
}

async function authenticatedDashboard(): Promise<FysenProDashboard> {
  const cookieStore = await cookies();
  const token = cookieStore.get(FYSEN_PRO_SESSION_COOKIE)?.value;
  if (!token) redirect(withPublicBasePath("/pro/login"));

  try {
    return await getFysenProDashboard(token);
  } catch {
    redirect(withPublicBasePath("/pro/login"));
  }
}

export default async function FysenProPage() {
  const dashboard = await authenticatedDashboard();
  const clickBreakdown = [
    ["Meny", dashboard.metrics.clickBreakdown.menu],
    ["Restaurant", dashboard.metrics.clickBreakdown.restaurant],
    ["Veibeskrivelse", dashboard.metrics.clickBreakdown.directions],
    ["Booking", dashboard.metrics.clickBreakdown.booking],
    ["Bestilling", dashboard.metrics.clickBreakdown.order],
  ] as const;

  return (
    <div className="proPage">
      <GlobalHeader city={dashboard.restaurant.city} />
      <main className="proShell">
        <div className="proDashboardHeader">
          <div>
            <p className="proEyebrow">Fysen Pro · siste {dashboard.periodDays} dager</p>
            <h1>{dashboard.restaurant.name}</h1>
            <p className="proLead">{dashboard.restaurant.address}, {dashboard.restaurant.city}</p>
          </div>
          <FysenProLogoutButton />
        </div>

        <section className="proMetricGrid" aria-label="Nøkkeltall">
          <article className="proMetricCard">
            <span>Visninger</span>
            <strong>{integerFormat.format(dashboard.metrics.impressions)}</strong>
            <p>Resultatvisninger fra faktiske Fysen-søk.</p>
          </article>
          <article className="proMetricCard">
            <span>Handlinger</span>
            <strong>{integerFormat.format(dashboard.metrics.clicks)}</strong>
            <p>Registrerte klikk fra restaurantens søkeresultater.</p>
          </article>
          <article className="proMetricCard">
            <span>Engasjert CTR</span>
            <strong>{percentFormat.format(dashboard.metrics.ctr)}</strong>
            <p>Andel visninger som fikk minst én registrert handling.</p>
          </article>
        </section>

        <div className="proDashboardGrid">
          <section className="proPanel">
            <div className="proPanelHeader">
              <div>
                <p className="proEyebrow">Konvertering</p>
                <h2>Hva folk gjør etter treffet</h2>
              </div>
            </div>
            <dl className="proBreakdownList">
              {clickBreakdown.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{integerFormat.format(value)}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="proPanel">
            <div className="proPanelHeader">
              <div>
                <p className="proEyebrow">Menyhelse</p>
                <h2>Kildene Fysen faktisk bruker</h2>
              </div>
            </div>
            {dashboard.menuSources.length === 0 ? (
              <p className="proEmpty">Ingen menykilde er registrert.</p>
            ) : (
              <ul className="proStatusList">
                {dashboard.menuSources.map((source) => (
                  <li key={source.url}>
                    <div>
                      <strong>{sourceStatus(source)}</strong>
                      <a href={source.url} target="_blank" rel="noreferrer">{source.url}</a>
                    </div>
                    <span>Sist kontrollert: {dateTime(source.lastCheckedAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <section className="proPanel">
          <div className="proPanelHeader">
            <div>
              <p className="proEyebrow">Retter</p>
              <h2>Rettene som blir sett</h2>
            </div>
          </div>
          {dashboard.topDishes.length === 0 ? (
            <p className="proEmpty">Ingen rettvisninger i perioden ennå.</p>
          ) : (
            <div className="proTableWrap">
              <table className="proTable">
                <thead>
                  <tr><th>Rett</th><th>Visninger</th><th>Handlinger</th></tr>
                </thead>
                <tbody>
                  {dashboard.topDishes.map((dish) => (
                    <tr key={dish.name}>
                      <td>{dish.name}</td>
                      <td>{integerFormat.format(dish.impressions)}</td>
                      <td>{integerFormat.format(dish.clicks)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="proDashboardGrid">
          <section className="proPanel">
            <div className="proPanelHeader">
              <div>
                <p className="proEyebrow">Booking og bestilling</p>
                <h2>Verifiserte destinasjoner</h2>
              </div>
            </div>
            {dashboard.actions.length === 0 ? (
              <p className="proEmpty">Ingen verifisert booking- eller bestillingsdestinasjon er registrert.</p>
            ) : (
              <ul className="proStatusList">
                {dashboard.actions.map((action) => (
                  <li key={action.type}>
                    <div>
                      <strong>{action.type === "booking" ? "Booking" : "Bestilling"}</strong>
                      <span>{actionStatus(action)}</span>
                    </div>
                    <span>Verifisert {dateTime(action.verifiedAt)} · utløper {dateTime(action.expiresAt)}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="proPanel">
            <div className="proPanelHeader">
              <div>
                <p className="proEyebrow">Markedssignal</p>
                <h2>Uløste søk i {dashboard.restaurant.city}</h2>
              </div>
            </div>
            <p className="proPanelIntro">
              Dette er byens trusted Demand Loop, ikke søk vi påstår at akkurat din restaurant burde dekke.
            </p>
            {dashboard.cityDemandGaps.length === 0 ? (
              <p className="proEmpty">Ingen uløste eksplisitte demand-signaler i køen akkurat nå.</p>
            ) : (
              <ol className="proDemandList">
                {dashboard.cityDemandGaps.map((gap) => (
                  <li key={gap.query}>
                    <strong>{gap.query}</strong>
                    <span>{integerFormat.format(gap.searches7d)} signalsøk siste 7 dager</span>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </div>

        <p className="proFootnote">
          Fysen Pro viser målte data fra Fysens egne søk og kildekontroller. Claiming eller Pro-tilgang endrer ikke organisk rangering.
        </p>
      </main>
    </div>
  );
}
