"use client";

import { usePreviewLocale } from "./language-preview";
import { pageText, type PageKey } from "../lib/page-messages";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { withPublicBasePath } from "../lib/public-path";

export function MinMatRemoveButton({ savedItemId }: { savedItemId: string }) {
  const locale = usePreviewLocale();
  const t = (key: PageKey) => pageText(locale,key);
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
      <button className="minMatTextButton" type="button" onClick={remove} disabled={busy}>{busy ? t("removeBusy") : error ? t("retry") : t("remove")}</button>
      {error ? <p role="alert">{t("removeError")}</p> : null}
    </div>
  );
}
