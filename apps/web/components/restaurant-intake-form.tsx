"use client";

import { useState, type FormEvent } from "react";
import {
  restaurantIntakeRequestSchema,
  restaurantIntakeReceiptSchema,
} from "@fysen/contracts/restaurant-intake";
import { withPublicBasePath } from "../lib/public-path";

export function RestaurantIntakeForm() {
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [reviewUrl, setReviewUrl] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (pending) return;
    const form = event.currentTarget;
    const fields = new FormData(form);
    const parsed = restaurantIntakeRequestSchema.safeParse(
      Object.fromEntries(fields),
    );
    setMessage(null);
    setReviewUrl(null);
    if (!parsed.success) {
      setMessage(parsed.error.issues[0]?.message ?? "Kontroller feltene.");
      return;
    }
    const operatorToken = String(fields.get("operatorToken") ?? "");
    const tokenInput = form.elements.namedItem("operatorToken");
    if (tokenInput instanceof HTMLInputElement) tokenInput.value = "";
    setPending(true);
    try {
      const response = await fetch(
        withPublicBasePath("/api/admin/restaurant-intake"),
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${operatorToken}`,
          },
          body: JSON.stringify(parsed.data),
        },
      );
      const payload: unknown = await response.json();
      if (response.ok) {
        const result = restaurantIntakeReceiptSchema.parse(payload);
        setReceipt(result.pullRequestUrl);
      } else {
        const error = payload as {
          code?: string;
          status?: string;
          branchUrl?: string;
        };
        if (
          error.status === "needs_review" &&
          error.branchUrl?.startsWith(
            "https://github.com/Paradispartiet/fysen/tree/restaurant-intake/",
          )
        ) {
          setReviewUrl(error.branchUrl);
          setMessage(
            "Forespørselen ble bare delvis bekreftet. Kontroller registreringen før du sender på nytt.",
          );
        } else {
          const messages: Record<string, string> = {
            UNAUTHORIZED:
              "Tilgangsnøkkelen er feil. Skriv inn operatørnøkkelen på nytt.",
            INTAKE_NOT_CONFIGURED:
              "Restaurantregistrering er ikke aktivert ennå.",
            INVALID_INTAKE:
              "Kontroller adresse, lenker og dekningsbegrunnelse.",
          };
          setMessage(
            messages[error.code ?? ""] ??
              "Registreringen kunne ikke bekreftes. Prøv igjen senere.",
          );
        }
      }
    } catch {
      setMessage(
        "Svaret kunne ikke hentes. Kontroller åpne restaurantregistreringer i GitHub før du sender på nytt.",
      );
      setReviewUrl("https://github.com/Paradispartiet/fysen/pulls");
    } finally {
      setPending(false);
    }
  }

  if (receipt)
    return (
      <div className="claimSuccess" role="status">
        <strong>Restauranten er sendt til kontroll.</strong>
        <p>
          Adresse og meny kontrolleres nå. Deretter må kandidaten vurderes og
          godkjennes før den vises i Fysen.
        </p>
        <p>
          <a href={receipt}>Følg registreringen →</a>
        </p>
        <button
          className="claimSubmit"
          type="button"
          onClick={() => {
            setReceipt(null);
            setMessage(null);
          }}
        >
          Registrer en til
        </button>
      </div>
    );

  return (
    <form className="claimForm" onSubmit={(event) => void submit(event)}>
      <fieldset className="intakeFields" disabled={pending}>
        <div className="claimField">
          <label htmlFor="intake-name">Restaurantnavn</label>
          <input
            id="intake-name"
            name="name"
            minLength={2}
            maxLength={200}
            required
          />
        </div>
        <div className="claimField">
          <label htmlFor="intake-address">Adresse i Oslo</label>
          <input
            id="intake-address"
            name="address"
            placeholder="Gateadresse 1, 0123 Oslo"
            maxLength={500}
            required
            aria-describedby="intake-address-hint"
          />
          <p className="claimHint" id="intake-address-hint">
            Bruk restaurantens publiserte gateadresse og postnummer.
          </p>
        </div>
        <div className="claimField">
          <label htmlFor="intake-website">
            Nettside <span>(valgfri)</span>
          </label>
          <input
            id="intake-website"
            name="websiteUrl"
            type="url"
            inputMode="url"
            placeholder="https://restaurant.no"
            maxLength={2000}
          />
        </div>
        <div className="claimField">
          <label htmlFor="intake-menu">Meny-URL</label>
          <input
            id="intake-menu"
            name="menuUrl"
            type="url"
            inputMode="url"
            placeholder="https://restaurant.no/meny"
            maxLength={2000}
            required
            aria-describedby="intake-menu-hint"
          />
          <p className="claimHint" id="intake-menu-hint">
            En offentlig HTTPS-lenke til menyen med retter og priser.
          </p>
        </div>
        <details className="intakeDetails">
          <summary>Menytype og henting</summary>
          <div className="claimField">
            <label htmlFor="intake-source">Menytype</label>
            <select id="intake-source" name="sourceType" defaultValue="html">
              <option value="html">Nettside (HTML)</option>
              <option value="json_ld">JSON-LD</option>
              <option value="pdf">PDF</option>
              <option value="api">Offentlig meny-API</option>
            </select>
          </div>
          <div className="claimField">
            <label htmlFor="intake-fetch">Henting</label>
            <select id="intake-fetch" name="fetchMode" defaultValue="http">
              <option value="http">Vanlig HTTP</option>
              <option value="browser">Nettleser (HTML / JSON-LD)</option>
            </select>
          </div>
        </details>
        <details className="intakeDetails">
          <summary>
            Booking og bestilling <span>(valgfritt)</span>
          </summary>
          <div className="claimField">
            <label htmlFor="intake-booking">Bookinglenke</label>
            <input
              id="intake-booking"
              name="bookingUrl"
              type="url"
              maxLength={2000}
            />
          </div>
          <div className="claimField">
            <label htmlFor="intake-order">Bestillingslenke</label>
            <input
              id="intake-order"
              name="orderUrl"
              type="url"
              maxLength={2000}
            />
          </div>
          <div className="claimField">
            <label htmlFor="intake-action-source">
              Siden som publiserer lenkene
            </label>
            <input
              id="intake-action-source"
              name="actionSourceUrl"
              type="url"
              maxLength={2000}
            />
          </div>
        </details>
        <div className="claimField">
          <label htmlFor="intake-coverage">Hva tilfører stedet?</label>
          <textarea
            id="intake-coverage"
            name="coverageNote"
            rows={3}
            minLength={20}
            maxLength={1000}
            placeholder="Retter, kjøkken, geografisk dekning eller et konkret etterspørselsbehov."
            required
          />
        </div>
        <div className="claimField">
          <label htmlFor="intake-token">Operatørnøkkel</label>
          <input
            id="intake-token"
            name="operatorToken"
            type="password"
            autoComplete="off"
            minLength={32}
            maxLength={512}
            required
          />
        </div>
        <button className="claimSubmit" type="submit">
          {pending ? "Sender til kontroll …" : "Send til kontroll"}
        </button>
      </fieldset>
      {pending ? (
        <p role="status" className="claimHint">
          Oppretter registreringen …
        </p>
      ) : null}
      {message ? (
        <p className="claimError" role="alert">
          {message}
        </p>
      ) : null}
      {reviewUrl ? (
        <p>
          <a href={reviewUrl}>Kontroller registreringen →</a>
        </p>
      ) : null}
    </form>
  );
}
