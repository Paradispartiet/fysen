"use client";

import { useSyncExternalStore } from "react";
import { locales, resolveLocale } from "../lib/locales";
import { isPreviewLocale, previewLocales, translate, type MessageKey, type PreviewLocale } from "../lib/locale-messages";

const enabled = process.env.NEXT_PUBLIC_FYSEN_LANGUAGE_PREVIEW === "true";
const storageKey = "fysen.locale";
const eventName = "fysen-locale-change";
let sessionChoice: PreviewLocale | undefined;

function subscribe(callback: () => void) {
  window.addEventListener(eventName, callback);
  window.addEventListener("storage", callback);
  window.addEventListener("languagechange", callback);
  return () => {
    window.removeEventListener(eventName, callback);
    window.removeEventListener("storage", callback);
    window.removeEventListener("languagechange", callback);
  };
}

function getSnapshot(): PreviewLocale {
  if (!enabled) return "nb";
  let stored: string | null = null;
  try { stored = window.localStorage.getItem(storageKey); } catch { /* storage may be blocked */ }
  const selected = sessionChoice ?? stored;
  if (selected && isPreviewLocale(selected)) return selected;
  const browser = navigator.languages.map((tag, index) => index === 0 ? tag : tag + ";q=" + Math.max(0.1, 1 - index / 10)).join(",");
  const available = browser.split(",").filter((part) => isPreviewLocale(resolveLocale(undefined, part)) && resolveLocale(undefined, part) !== "nb" || /^n[bo](?:-|;|$)/i.test(part));
  const resolved = resolveLocale(undefined, available.join(","));
  return isPreviewLocale(resolved) ? resolved : "nb";
}

function serverSnapshot(): PreviewLocale { return "nb"; }

export function usePreviewLocale(): PreviewLocale {
  return useSyncExternalStore(subscribe, getSnapshot, serverSnapshot);
}

function selectLocale(value: string) {
  if (!isPreviewLocale(value)) return;
  sessionChoice = value;
  try { window.localStorage.setItem(storageKey, value); } catch { /* session choice still works */ }
  window.dispatchEvent(new Event(eventName));
}

export function LocalizedText({ message, city }: { message: MessageKey; city?: string }) {
  const locale = usePreviewLocale();
  return <span lang={locale}>{translate(locale, message, city)}</span>;
}

export function LanguagePreviewSelector() {
  const locale = usePreviewLocale();
  if (!enabled) return null;
  return (
    <div lang={locale} className="languagePreview">
      <label>
        <span>{translate(locale, "language")}</span>
        <select value={locale} onChange={(event) => selectLocale(event.target.value)}>
          {previewLocales.map((code) => <option key={code} value={code} lang={code}>{locales[code].label}</option>)}
        </select>
      </label>
      <small>{translate(locale, "previewNotice")}</small>
    </div>
  );
}
