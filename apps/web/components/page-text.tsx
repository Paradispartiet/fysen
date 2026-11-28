"use client";
import { usePreviewLocale } from "./language-preview";
import { pageText, type PageKey } from "../lib/page-messages";
import { locales } from "../lib/locales";
export function PageText({ message, values }: { message: PageKey; values?: Record<string, string | number> }) {
 const locale = usePreviewLocale();
 return <span lang={locale}>{pageText(locale,message,values)}</span>;
}
export function PageDate({ message, date, long = false }: { message: PageKey; date: string; long?: boolean }) {
 const locale = usePreviewLocale();
 const formatted = Number.isFinite(Date.parse(date)) ? new Intl.DateTimeFormat(locales[locale].intl, { dateStyle: long ? "long" : "medium", timeZone: "Europe/Oslo" }).format(new Date(date)) : date;
 return <span lang={locale}>{pageText(locale,message,{date:formatted})}</span>;
}
export function SavedPrice({ value, currency }: { value: number | null; currency: string }) {
 const locale = usePreviewLocale();
 return <span lang={locale}>{value === null ? pageText(locale,"priceMissing") : new Intl.NumberFormat(locales[locale].intl, {style:"currency",currency,maximumFractionDigits:2}).format(value/100)}</span>;
}
