import type { MinMatList } from "@fysen/contracts/aha-min-mat";
import { cookies } from "next/headers";
import { PageText, PageDate, SavedPrice } from "../../components/page-text";
import { GlobalHeader } from "../../components/global-header";
import { MinMatLogoutButton } from "../../components/min-mat-logout-button";
import { MinMatRemoveButton } from "../../components/min-mat-remove-button";
import { getMinMat } from "../../lib/aha-min-mat-api";
import { ahaMinMatPilotEnabled } from "../../lib/aha-min-mat-pilot";
import { FYSEN_AHA_SESSION_COOKIE } from "../../lib/aha-consumer-session";
import { withPublicBasePath } from "../../lib/public-path";

async function collection(): Promise<{ signedIn: boolean; data: MinMatList }> {
  const token = (await cookies()).get(FYSEN_AHA_SESSION_COOKIE)?.value;
  if (!token) return { signedIn: false, data: { items: [] } };
  try { return { signedIn: true, data: await getMinMat(token) }; }
  catch { return { signedIn: false, data: { items: [] } }; }
}

export default async function MinMatPage({ searchParams }: { searchParams: Promise<{ handoff?: string }> }) {
  const { signedIn, data } = await collection();
  const { handoff } = await searchParams;
  const connectHref = `${withPublicBasePath("/api/aha/connect")}?returnTo=${encodeURIComponent(withPublicBasePath("/min-mat"))}`;
  return (
    <div className="minMatPage">
      <GlobalHeader />
      <main className="minMatShell">
        <header className="minMatHero">
          <p className="minMatEyebrow">Fysen</p>
          <h1><PageText message="myFood" /></h1>
          <p>{ahaMinMatPilotEnabled ? <PageText message="collect" /> : <PageText message="paused" />}</p>
        </header>

        {handoff === "failed" ? (
          <section className="minMatPanel" role="alert">
            <h2><PageText message="handoffFailed" /></h2>
            <p><PageText message="handoffHelp" /></p>
          </section>
        ) : null}

        {!ahaMinMatPilotEnabled && !signedIn ? (
          <section className="minMatPanel">
            <h2><PageText message="pilotPaused" /></h2>
            <p><PageText message="searchStill" /></p>
            <a className="minMatPrimary" href={withPublicBasePath("/search?city=Oslo")}><PageText message="findDish" /></a>
          </section>
        ) : !signedIn ? (
          <section className="minMatPanel">
            <h2><PageText message="takeCollection" /></h2>
            <p><PageText message="signInHelp" /></p>
            <a className="minMatPrimary" href={connectHref}><PageText message="signIn" /></a>
            <p className="minMatPrivacy"><PageText message="privacy" /></p>
          </section>
        ) : (
          <>
            <div className="minMatToolbar">
              <p><PageText message={data.items.length === 1 ? "savedOne" : "savedMany"} values={{count:data.items.length}} /></p>
              <MinMatLogoutButton />
            </div>
            {data.items.length === 0 ? (
              <section className="minMatPanel minMatEmpty">
                <h2><PageText message="empty" /></h2>
                <p>{ahaMinMatPilotEnabled ? <PageText message="emptyHelp" /> : <PageText message="emptyPaused" />}</p>
                <a className="minMatPrimary" href={withPublicBasePath("/search?city=Oslo")}><PageText message="findDish" /></a>
              </section>
            ) : (
              <>
                <ul className="minMatList">
                  {data.items.map((item) => (
                    <li key={item.savedItemId}>
                      <div>
                        <h2>{item.dishName}</h2>
                        <p>{item.restaurantName} · {item.city}</p>
                        <span><SavedPrice value={item.priceMinor} currency={item.currency} /> · <PageDate message="saved" date={item.savedAt} /></span>
                      </div>
                      <MinMatRemoveButton savedItemId={item.savedItemId} />
                    </li>
                  ))}
                </ul>
                {ahaMinMatPilotEnabled ? <section className="minMatAnalysis">
                  <div>
                    <p className="minMatEyebrow"><PageText message="handoffLabel" /></p>
                    <h2><PageText message="analyzeTitle" /></h2>
                    <p><PageText message="analyzeHelp" /></p>
                  </div>
                  <form action={withPublicBasePath("/api/min-mat/handoff")} method="post">
                    <button className="minMatPrimary" type="submit"><PageText message="analyze" /></button>
                  </form>
                </section> : null}
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
