"use client";
import { usePreviewLocale } from "./language-preview";
import { browseText, type BrowseKey } from "../lib/browse-messages";
import { resultText, type ResultMessageKey } from "../lib/result-messages";
import { cuisineLabel } from "../lib/cuisine-labels";
export function BrowseText({message,values,cuisine}:{message:BrowseKey;values?:Record<string,string|number>;cuisine?:string}) {
 const locale=usePreviewLocale();
 return <span lang={locale}>{browseText(locale,message,cuisine===undefined?values:{...values,name:cuisineLabel(cuisine,locale)})}</span>;
}
export function CuisineText({name}:{name:string}) {
 const locale=usePreviewLocale();
 return <span lang={locale}>{cuisineLabel(name,locale)}</span>;
}

export function BrowseResultText({message}:{message:ResultMessageKey}) {
 const locale=usePreviewLocale();
 return <span lang={locale}>{resultText(locale,message)}</span>;
}
