import type { Metadata } from "next";
import { PageText, PageDate } from "../../components/page-text";
import { GlobalHeader } from "../../components/global-header";
import { getPublicMenuArchive } from "../../lib/verified-menu-archive";
import { withPublicBasePath } from "../../lib/public-path";

export const metadata: Metadata = {
  title: "Om Fysen",
  description: "Hvordan Fysen finner restaurantretter og håndterer menydata.",
};

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
        <p className="aboutEyebrow"><PageText message="about" /></p>
        <h1><PageText message="aboutTitle" /></h1>
        <p className="aboutLead"><PageText message="aboutLead" /></p>

        <section className="aboutSection">
          <h2><PageText message="matchesTitle" /></h2>
          <p><PageText message="matchesHelp" /></p>
        </section>

        <section className="aboutSection" id="menydata">
          <h2><PageText message="menusTitle" /></h2>
          <p><PageText message="menusHelp" /></p>
          <p><PageText message="notRealtime" /></p>
          {archiveDate ? (
            <p className="aboutArchiveDates">
              <PageDate message="established" date={archiveDate} long />
              {lastRefreshAt ? <> · <PageDate message="updated" date={lastRefreshAt} long /></> : null}
              . <PageText message="datesHelp" />
            </p>
          ) : null}
        </section>

        <a className="aboutHomeLink" href={withPublicBasePath("/")}><PageText message="home" /></a>
      </main>
    </div>
  );
}
