import type { MinMatList } from "@fysen/contracts/aha-min-mat";
import { cookies } from "next/headers";
import { GlobalHeader } from "../../components/global-header";
import { MinMatLogoutButton } from "../../components/min-mat-logout-button";
import { MinMatRemoveButton } from "../../components/min-mat-remove-button";
import { getMinMat } from "../../lib/aha-min-mat-api";
import { FYSEN_AHA_SESSION_COOKIE } from "../../lib/aha-consumer-session";
import { withPublicBasePath } from "../../lib/public-path";

const priceFormat = new Intl.NumberFormat("nb-NO", { style: "currency", currency: "NOK", maximumFractionDigits: 2 });
const dateFormat = new Intl.DateTimeFormat("nb-NO", { dateStyle: "medium", timeZone: "Europe/Oslo" });

function price(value: number | null, currency: string): string {
  if (value === null) return "Pris ikke registrert";
  if (currency === "NOK") return priceFormat.format(value / 100);
  return new Intl.NumberFormat("nb-NO", { style: "currency", currency }).format(value / 100);
}

async function collection(): Promise<{ signedIn: boolean; data: MinMatList }> {
  const token = (await cookies()).get(FYSEN_AHA_SESSION_COOKIE)?.value;
  if (!token) return { signedIn: false, data: { items: [] } };
  try { return { signedIn: true, data: await getMinMat(token) }; }
  catch { return { signedIn: false, data: { items: [] } }; }
}

export default async function MinMatPage() {
  const { signedIn, data } = await collection();
  const connectHref = `${withPublicBasePath("/api/aha/connect")}?returnTo=${encodeURIComponent(withPublicBasePath("/min-mat"))}`;
  return (
    <div className="minMatPage">
      <GlobalHeader />
      <main className="minMatShell">
        <header className="minMatHero">
          <p className="minMatEyebrow">AHA × Fysen</p>
          <h1>Min mat</h1>
          <p>Samle retter du vil huske. Søkehistorikken din blir ikke lagt her og blir ikke koblet til AHA-identiteten.</p>
        </header>

        {!signedIn ? (
          <section className="minMatPanel">
            <h2>Ta samlingen med deg</h2>
            <p>Logg inn med AHA for å lagre retter på tvers av enheter og velge når du vil analysere samlingen i AHA.</p>
            <a className="minMatPrimary" href={connectHref}>Logg inn med AHA</a>
            <p className="minMatPrivacy">Fysen får en pseudonym AHA-identitet for Min mat. Dette gir aldri tilgang til Restaurant Claim eller Fysen Pro.</p>
          </section>
        ) : (
          <>
            <div className="minMatToolbar">
              <p>{data.items.length} {data.items.length === 1 ? "lagret rett" : "lagrede retter"}</p>
              <MinMatLogoutButton />
            </div>
            {data.items.length === 0 ? (
              <section className="minMatPanel minMatEmpty">
                <h2>Samlingen er tom</h2>
                <p>Søk etter en rett og velg «Lagre i Min mat» på et resultat du vil ta vare på.</p>
                <a className="minMatPrimary" href={withPublicBasePath("/search?city=Oslo")}>Finn en rett</a>
              </section>
            ) : (
              <>
                <ul className="minMatList">
                  {data.items.map((item) => (
                    <li key={item.savedItemId}>
                      <div>
                        <h2>{item.dishName}</h2>
                        <p>{item.restaurantName} · {item.city}</p>
                        <span>{price(item.priceMinor, item.currency)} · lagret {dateFormat.format(new Date(item.savedAt))}</span>
                      </div>
                      <MinMatRemoveButton savedItemId={item.savedItemId} />
                    </li>
                  ))}
                </ul>
                <section className="minMatAnalysis">
                  <div>
                    <p className="minMatEyebrow">Eksplisitt handoff</p>
                    <h2>Utforsk samlingen i AHA</h2>
                    <p>Bare de opptil 50 rettene som er i Min mat når du trykker sendes videre. AHA viser en ny preview før du velger analyse.</p>
                  </div>
                  <form action={withPublicBasePath("/api/min-mat/handoff")} method="post">
                    <button className="minMatPrimary" type="submit">Analyser i AHA</button>
                  </form>
                </section>
              </>
            )}
          </>
        )}
      </main>
    </div>
  );
}
