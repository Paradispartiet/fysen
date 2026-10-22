"use client";

import { useEffect, useState } from "react";
import { FAVORITES_CHANGED, FAVORITES_KEY, readDeviceFavorites, toggleDeviceFavorite } from "../lib/device-favorites";

export function FavoriteToggle({ menuItemId, dishName, restaurantName, city }: {
  menuItemId: string;
  dishName: string;
  restaurantName: string;
  city: string;
}) {
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const sync = () => setSaved(readDeviceFavorites().some((favorite) => favorite.menuItemId === menuItemId));
    const storage = (event: StorageEvent) => { if (event.key === FAVORITES_KEY) sync(); };
    sync();
    window.addEventListener(FAVORITES_CHANGED, sync);
    window.addEventListener("storage", storage);
    return () => {
      window.removeEventListener(FAVORITES_CHANGED, sync);
      window.removeEventListener("storage", storage);
    };
  }, [menuItemId]);

  function toggle() {
    try {
      const result = toggleDeviceFavorite({ menuItemId, dishName, restaurantName, city, savedAt: new Date().toISOString() });
      setSaved(result);
      setError(false);
    } catch {
      setError(true);
    }
  }

  return (
    <button type="button" className="favoriteToggle" aria-pressed={saved} aria-label={saved ? "Fjern fra favoritter" : "Legg til i favoritter"} onClick={toggle} title={error ? "Kunne ikke lagre på denne enheten" : "Lagres på denne enheten"}>
      <span aria-hidden="true">{saved ? "♥" : "♡"}</span>
      <span>{error ? "Kunne ikke lagre" : saved ? "Lagret" : "Favoritt"}</span>
    </button>
  );
}
