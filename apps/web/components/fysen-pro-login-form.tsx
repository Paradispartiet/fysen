"use client";

import { useState, type FormEvent } from "react";
import { withPublicBasePath } from "../lib/public-path";

export function FysenProLoginForm() {
  const [state, setState] = useState<"idle" | "submitting" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    setState("submitting");
    setMessage(null);

    const form = new FormData(event.currentTarget);
    const setupToken = String(form.get("setupToken") ?? "").trim();

    try {
      const response = await fetch(withPublicBasePath("/api/pro/session"), {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({ setupToken }),
      });
      if (!response.ok) throw new Error("setup failed");
      window.location.assign(withPublicBasePath("/pro"));
    } catch {
      setState("error");
      setMessage("Koden er ugyldig, utløpt eller allerede brukt.");
    }
  }

  return (
    <form className="proLoginForm" onSubmit={(event) => void submit(event)}>
      <div className="proField">
        <label htmlFor="pro-setup-token">Engangskode</label>
        <input
          id="pro-setup-token"
          name="setupToken"
          type="password"
          autoComplete="off"
          minLength={32}
          maxLength={200}
          required
          spellCheck={false}
        />
        <p>Koden kan bare brukes én gang og utstedes etter at restauranttilgangen er verifisert.</p>
      </div>
      <button className="proPrimaryButton" type="submit" disabled={state === "submitting"}>
        {state === "submitting" ? "Åpner …" : "Åpne Fysen Pro"}
      </button>
      {state === "error" && message ? <p className="proError" role="alert">{message}</p> : null}
    </form>
  );
}
