"use client";

import { useState } from "react";
import { withPublicBasePath } from "../lib/public-path";

export function MinMatLogoutButton() {
  const [busy, setBusy] = useState(false);
  async function logout(): Promise<void> {
    setBusy(true);
    try { await fetch(withPublicBasePath("/api/aha/session"), { method: "DELETE" }); } finally {
      window.location.assign(withPublicBasePath("/min-mat"));
    }
  }
  return <button className="minMatTextButton" type="button" onClick={logout} disabled={busy}>{busy ? "Logger ut …" : "Koble fra AHA"}</button>;
}
