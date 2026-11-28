"use client";

import { usePreviewLocale } from "./language-preview";
import { pageText, type PageKey } from "../lib/page-messages";

import { useState } from "react";
import { withPublicBasePath } from "../lib/public-path";

export function MinMatLogoutButton() {
  const locale = usePreviewLocale();
  const t = (key: PageKey) => pageText(locale,key);
  const [busy, setBusy] = useState(false);
  async function logout(): Promise<void> {
    setBusy(true);
    try { await fetch(withPublicBasePath("/api/aha/session"), { method: "DELETE" }); } finally {
      window.location.assign(withPublicBasePath("/min-mat"));
    }
  }
  return <button className="minMatTextButton" type="button" onClick={logout} disabled={busy}>{busy ? t("logoutBusy") : t("logout")}</button>;
}
