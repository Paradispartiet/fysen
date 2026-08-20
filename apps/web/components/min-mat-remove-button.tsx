"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { withPublicBasePath } from "../lib/public-path";

export function MinMatRemoveButton({ savedItemId }: { savedItemId: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(false);
  async function remove(): Promise<void> {
    setBusy(true);
    setError(false);
    try {
      const response = await fetch(`${withPublicBasePath("/api/min-mat/items")}/${encodeURIComponent(savedItemId)}`, { method: "DELETE" });
      if (!response.ok) throw new Error("remove failed");
      router.refresh();
    } catch {
      setError(true);
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <button className="minMatTextButton" type="button" onClick={remove} disabled={busy}>{busy ? "Fjerner …" : error ? "Prøv igjen" : "Fjern"}</button>
      {error ? <p role="alert">Kunne ikke fjerne retten.</p> : null}
    </div>
  );
}
