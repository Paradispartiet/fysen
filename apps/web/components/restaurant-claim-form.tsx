"use client";

import {
  restaurantClaimReceiptSchema,
  type RestaurantClaimRole,
} from "@fysen/contracts/restaurant-claims";
import { useState, type FormEvent } from "react";
import { withPublicBasePath } from "../lib/public-path";

const roleLabels: Readonly<Record<RestaurantClaimRole, string>> = {
  owner: "Eier",
  manager: "Daglig leder / manager",
  authorized_agent: "Autorisert representant",
};

export function RestaurantClaimForm({ restaurantSlug }: { restaurantSlug: string }) {
  const [state, setState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);
  const [claimId, setClaimId] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState("submitting");
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const body = {
      claimantName: String(form.get("claimantName") ?? ""),
      claimantEmail: String(form.get("claimantEmail") ?? ""),
      claimantRole: String(form.get("claimantRole") ?? ""),
      evidenceUrl: String(form.get("evidenceUrl") ?? ""),
      evidenceNote: String(form.get("evidenceNote") ?? ""),
    };

    try {
      const response = await fetch(
        withPublicBasePath(`/api/restaurants/${encodeURIComponent(restaurantSlug)}/claims`),
        {
          method: "POST",
          headers: { accept: "application/json", "content-type": "application/json" },
          body: JSON.stringify(body),
        },
      );
      const payload: unknown = await response.json();
      if (!response.ok) throw new Error("Claim request failed");
      const receipt = restaurantClaimReceiptSchema.parse(payload);
      setClaimId(receipt.claimId);
      setState("success");
      setMessage(
        receipt.duplicate
          ? "Denne forespørselen er allerede til behandling."
          : "Forespørselen er mottatt og venter på verifikasjon.",
      );
      event.currentTarget.reset();
    } catch {
      setState("error");
      setMessage("Forespørselen kunne ikke sendes nå. Prøv igjen senere.");
    }
  }

  if (state === "success") {
    return (
      <div className="claimSuccess" role="status">
        <strong>{message}</strong>
        <p>Referanse: <code>{claimId}</code></p>
        <p>Ingen restaurantdata endres før tilknytningen er verifisert.</p>
      </div>
    );
  }

  return (
    <form className="claimForm" onSubmit={(event) => void submit(event)}>
      <div className="claimField">
        <label htmlFor="claimant-name">Navn</label>
        <input id="claimant-name" name="claimantName" autoComplete="name" minLength={2} maxLength={160} required />
      </div>

      <div className="claimField">
        <label htmlFor="claimant-email">Jobb-e-post</label>
        <input id="claimant-email" name="claimantEmail" type="email" autoComplete="email" maxLength={320} required />
      </div>

      <div className="claimField">
        <label htmlFor="claimant-role">Din rolle</label>
        <select id="claimant-role" name="claimantRole" defaultValue="owner" required>
          {(Object.entries(roleLabels) as Array<[RestaurantClaimRole, string]>).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>

      <div className="claimField">
        <label htmlFor="claim-evidence-url">Lenke som kan bekrefte tilknytningen <span>(valgfri)</span></label>
        <input
          id="claim-evidence-url"
          name="evidenceUrl"
          type="url"
          inputMode="url"
          placeholder="https://restaurant.no/kontakt"
        />
      </div>

      <div className="claimField">
        <label htmlFor="claim-evidence-note">Hvordan kan vi verifisere deg?</label>
        <textarea
          id="claim-evidence-note"
          name="evidenceNote"
          rows={4}
          maxLength={2000}
          placeholder="For eksempel navn på virksomheten, rolle og hvilken offisiell kontaktkanal vi kan kontrollere."
        />
        <p className="claimHint">Gi enten en verifiserbar HTTPS-lenke eller en forklaring på minst 20 tegn.</p>
      </div>

      <button className="claimSubmit" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Sender …" : "Send forespørsel"}
      </button>
      {state === "error" && message ? <p className="claimError" role="alert">{message}</p> : null}
    </form>
  );
}
