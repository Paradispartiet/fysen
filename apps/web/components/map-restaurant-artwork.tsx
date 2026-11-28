"use client";

import { useState } from "react";
import { restaurantVisuals } from "../lib/restaurant-visuals";
import { withPublicBasePath } from "../lib/public-path";
import styles from "./restaurant-map.module.css";

export function MapRestaurantArtwork({ restaurant }: { restaurant: { name: string; address: string } }) {
  const visuals = restaurantVisuals(restaurant);
  const [failed, setFailed] = useState<string[]>([]);
  const photo = visuals && "photoCredit" in visuals ? visuals : null;
  const interiorPhoto = visuals && "interiorPhoto" in visuals ? visuals.interiorPhoto : null;
  const interiorSource = visuals && "interiorIllustrationSource" in visuals ? visuals.interiorIllustrationSource : visuals?.sourceUrl;
  const initials = (restaurant.name.match(/[\p{L}\p{N}]+/gu) ?? []).slice(0, 2).map(word => Array.from(word)[0]).join("").toLocaleUpperCase("nb-NO") || "R";
  const logo = visuals?.logo;
  const scenes = [
    { path: visuals?.exterior, label: "Fasade", credit: photo, source: visuals?.sourceUrl },
    { path: visuals?.interior, label: "Interiør", credit: interiorPhoto, source: interiorSource },
  ].filter(scene => scene.path && !failed.includes(scene.path));

  return <section className={styles.artwork} aria-label="Restaurantens visuelle identitet">
    {logo && !failed.includes(logo) ? (
      <img className={styles.restaurantLogo} src={withPublicBasePath(logo)} alt={restaurant.name + " – logo"} width={100} height={48} onError={() => setFailed(previous => [...previous, logo])} />
    ) : <span className={styles.monogram} aria-hidden="true">{initials}</span>}
    {scenes.length > 0 && <div className={styles.scenes}>
      {scenes.map(scene => {
        const path = scene.path!;
        const imageUrl = withPublicBasePath(path);
        return <figure key={path}>
          <a href={imageUrl} target="_blank" rel="noopener noreferrer" aria-label={scene.label + " – åpne stort bilde"}>
            {/* Images must retain their complete framing and may be enlarged. */}
            <img src={imageUrl} alt={(scene.credit ? "Foto" : "Illustrasjon") + " – " + scene.label + " hos " + restaurant.name} width={1536} height={1024} loading="lazy" decoding="async" onError={() => setFailed(previous => [...previous, path])} />
          </a>
          <figcaption>
            {scene.label} · {scene.credit ? "Foto fra " + scene.credit.photoDate.slice(0, 4) : "Illustrasjon"}
            {scene.credit ? <span><a href={scene.credit.sourceUrl} target="_blank" rel="noopener noreferrer">{scene.credit.photoCredit} · Wikimedia Commons</a> · <a href={scene.credit.licenseUrl} target="_blank" rel="noopener noreferrer">{scene.credit.licenseUrl.includes("/publicdomain/") ? "Public domain" : "CC BY-SA " + (scene.credit.licenseUrl.match(/\/by-sa\/([\d.]+)\//u)?.[1] ?? "")}</a> · Nedskalert, uten beskjæring</span> : scene.source ? <span><a href={scene.source} target="_blank" rel="noopener noreferrer">Basert på restaurantens egne bilder</a></span> : null}
          </figcaption>
        </figure>;
      })}
    </div>}
  </section>;
}
