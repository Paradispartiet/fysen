import type { Metadata } from "next";
import { GlobalHeader } from "../../components/global-header";
import { getPublicMenuArchive } from "../../lib/verified-menu-archive";
import { withPublicBasePath } from "../../lib/public-path";

export const metadata: Metadata = {
  title: "Om Fysen",
  description: "Hvordan Fysen finner restaurantretter og håndterer menydata.",
};

function displayDate(value: string): string {
  if (!Number.isFinite(Date.parse(value))) return value;
  return new Intl.DateTimeFormat("nb-NO", {
    day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Oslo",
  }).format(new Date(value));
}

export default async function AboutPage() {
  let archiveDate: string | null = null;
  let lastRefreshAt: string | null = null;

  try {
    const archive = await getPublicMenuArchive();
    archiveDate = archive.archiveDate;
    lastRefreshAt = archive.lastRefreshAt;
  } catch {
    // The explanation remains available even when the archive cannot be loaded.
  }

  return (
    <div className="aboutPage">
      <GlobalHeader />
      <main className="aboutMain">
        <p className="aboutEyebrow">Om Fysen</p>
        <h1>Finn retten du har lyst på.</h1>
        <p className="aboutLead">
          Fysen hjelper deg å finne restauranter ut fra en rett du har lyst på,
          og gjør det enklere å kontrollere menyen hos restauranten selv.
        </p>

        <section className="aboutSection">
          <h2>Slik fungerer menytreff</h2>
          <p>
            Menyinformasjon kan endre seg. Se alltid restaurantens egen meny for å
            kontrollere pris, åpningstider og tilgjengelighet før du drar.
          </p>
        </section>

        <section className="aboutSection" id="menydata">
          <h2>Om menydata</h2>
          <p>
            Fysen samler retter og priser fra offentlige restaurantmenyer. Vi
            kontrollerer og oppdaterer menyene fortløpende. Når den vanlige
            søketjenesten ikke har tilgjengelige resultater, bruker Fysen også
            sitt kvalitetskontrollerte menydatagrunnlag.
          </p>
          <p>
            Et menytreff er ikke en sanntidsbekreftelse på at retten serveres
            akkurat nå. Restauranter kan endre utvalg, pris og åpningstider
            mellom våre kontroller. Sjekk derfor menyen hos restauranten.
          </p>
          {archiveDate ? (
            <p className="aboutArchiveDates">
              Grunnlag etablert: {displayDate(archiveDate)}
              {lastRefreshAt ? " · Siste indeksoppdatering: " + displayDate(lastRefreshAt) : ""}
              . Hver menykilde kan ha en annen kontrolldato enn indeksen.
            </p>
          ) : null}
        </section>

        <a className="aboutHomeLink" href={withPublicBasePath("/")}>
          Tilbake til forsiden
        </a>
      </main>
    </div>
  );
}
