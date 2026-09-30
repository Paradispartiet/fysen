import type { Metadata } from "next";
import { GlobalHeader } from "../../../../components/global-header";
import { RestaurantIntakeForm } from "../../../../components/restaurant-intake-form";
import "../../../../styles/restaurant-intake.css";

export const metadata: Metadata = {
  title: "Registrer restaurant — Fysen",
  robots: { index: false, follow: false },
};

export default function NewRestaurantPage() {
  return (
    <div className="claimPage">
      <GlobalHeader city="Oslo" />
      <main className="claimMain intakeMain">
        <section className="claimCard">
          <p className="claimEyebrow">Fysen · Operatør</p>
          <h1>Registrer en restaurant</h1>
          <p>
            Legg inn et nytt sted i Oslo med en offentlig meny. Fysen
            kontrollerer adressen, duplikater, retter og priser før restauranten
            kan godkjennes.
          </p>
          <RestaurantIntakeForm />
        </section>
      </main>
    </div>
  );
}
