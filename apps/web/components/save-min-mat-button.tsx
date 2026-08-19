"use client";

import { useState } from "react";
import { withPublicBasePath } from "../lib/public-path";
import styles from "./save-min-mat-button.module.css";

export function SaveMinMatButton({ menuItemId }: { menuItemId: string }) {
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");

  async function save(): Promise<void> {
    if (state === "saving" || state === "saved") return;
    setState("saving");
    try {
      const response = await fetch(withPublicBasePath("/api/min-mat/items"), {
        method: "POST",
        headers: { accept: "application/json", "content-type": "application/json" },
        body: JSON.stringify({ menuItemId }),
      });
      if (response.status === 401) {
        const returnTo = `${window.location.pathname}${window.location.search}`;
        window.location.assign(`${withPublicBasePath("/api/aha/connect")}?returnTo=${encodeURIComponent(returnTo)}`);
        return;
      }
      if (!response.ok) throw new Error("save failed");
      setState("saved");
    } catch {
      setState("error");
    }
  }

  return (
    <button className={styles.button} type="button" onClick={save} disabled={state === "saving" || state === "saved"}>
      {state === "saving" ? "Lagrer …" : state === "saved" ? "Lagret i Min mat" : state === "error" ? "Prøv å lagre igjen" : "Lagre i Min mat"}
    </button>
  );
}
