"use client";

import { useState } from "react";
import { withPublicBasePath } from "../lib/public-path";

export function FysenProLogoutButton() {
  const [busy, setBusy] = useState(false);

  async function logout(): Promise<void> {
    setBusy(true);
    try {
      await fetch(withPublicBasePath("/api/pro/session"), { method: "DELETE" });
    } finally {
      window.location.assign(withPublicBasePath("/pro/login"));
    }
  }

  return (
    <button className="proSecondaryButton" type="button" onClick={() => void logout()} disabled={busy}>
      {busy ? "Logger ut …" : "Logg ut"}
    </button>
  );
}
