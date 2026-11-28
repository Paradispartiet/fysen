"use client";
import type { ComponentProps } from "react";
import { usePreviewLocale } from "./language-preview";
import { galleryName,visualText } from "../lib/visual-messages";
export function LocalizedEditorialImg({imageId,imageLabel,imageKind,alt,...props}:ComponentProps<"img"> & {imageId:string;imageLabel:string;imageKind:string}) {
 const locale=usePreviewLocale();
 const name=galleryName(imageId,imageLabel,locale);
 const label=locale==="nb"?alt:visualText(locale,imageKind.toLowerCase().includes("illustrasjon")?"aiAlt":"photoAlt",{name});
 return <img {...props} alt={label} />;
}
export function EditorialCreditLabel({kind}:{kind:"license"|"ai"}) {
 const locale=usePreviewLocale();
 return <span lang={locale}>{visualText(locale,kind)}</span>;
}
