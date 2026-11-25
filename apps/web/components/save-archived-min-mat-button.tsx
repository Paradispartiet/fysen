"use client";

import type { MinMatArchiveSaveInput } from "@fysen/contracts/aha-min-mat";
import { useState } from "react";
import { withPublicBasePath } from "../lib/public-path";
import styles from "./save-min-mat-button.module.css";

export function SaveArchivedMinMatButton({ evidence }: {
  readonly evidence: MinMatArchiveSaveInput;
}) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "unavailable" | "error">("idle");

  async function save(): Promise<void> {
    if (state === "saving" || state === "saved" || state === "unavailable") return;
    setState("saving");
    try {
      const response = await fetch(withPublicBasePath("/api/min-mat/archive"), {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify(evidence),
      });
      if (response.status === 401) {
        const returnTo = `${window.location.pathname}${window.location.search}`;
        window.location.assign(`${withPublicBasePath("/api/aha/connect")}?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }
      if (response.status === 404) {
        setState("unavailable");
        return;
      }
      if (!response.ok) throw new Error("Save failed");
      setState("saved");
    } catch {
      setState("error");
    }
  }

  return (
    <button className={styles.button} type="button" onClick={save}
      disabled={state === "saving" || state === "saved" || state === "unavailable"}>
      {state === "saving" ? "Lagrer …"
        : state === "saved" ? "Lagret i Min mat"
        : state === "unavailable" ? "Kan ikke lagres fra denne menykilden"
        : state === "error" ? "Prøv å lagre igjen"
        : "Lagre i Min mat"}
    </button>
  );
}
