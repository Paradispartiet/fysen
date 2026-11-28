"use client";

import { useSyncExternalStore } from "react";
import { locales, parseLocale } from "../lib/locales";
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
  for (const tag of navigator.languages ?? [navigator.language]) {
    const locale = parseLocale(tag);
    if (locale && isPreviewLocale(locale)) return locale;
  }
  return "nb";
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
