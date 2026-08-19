import { GlobalHeader } from "../../../components/global-header";
import { FysenProLoginForm } from "../../../components/fysen-pro-login-form";
import { withPublicBasePath } from "../../../lib/public-path";

export default function FysenProLoginPage() {
  return (
    <div className="proPage">
      <GlobalHeader city="Oslo" />
      <main className="proShell proLoginShell">
        <a className="proBackLink" href={withPublicBasePath("/")}>← Til Fysen</a>
        <section className="proLoginCard">
          <p className="proEyebrow">For restauranter</p>
          <h1>Fysen Pro</h1>
          <p className="proLead">
            Bruk engangskoden du har fått etter at restauranttilgangen er verifisert.
          </p>
          <FysenProLoginForm />
          <div className="proSecurityNote">
            <strong>Tilgang er knyttet til en verifisert restaurant.</strong>
            <p>Fysen lagrer ikke engangskoden eller session-tokenen i klartekst.</p>
          </div>
        </section>
      </main>
    </div>
  );
}
