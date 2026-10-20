"use client";

import { useEffect, useState } from "react";
import { GlobalHeader } from "../../components/global-header";
import { FAVORITES_CHANGED, FAVORITES_KEY, readDeviceFavorites, removeDeviceFavorite, type DeviceFavorite } from "../../lib/device-favorites";
import { dishSearchHref } from "../../lib/public-path";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<DeviceFavorite[]>([]);
  const [error, setError] = useState(false);
  useEffect(() => {
    const sync = () => setFavorites(readDeviceFavorites());
    const onStorage = (event: StorageEvent) => { if (event.key === FAVORITES_KEY) sync(); };
    sync();
    window.addEventListener(FAVORITES_CHANGED, sync);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener(FAVORITES_CHANGED, sync);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  function remove(id: string) {
    try { removeDeviceFavorite(id); setError(false); }
    catch { setError(true); }
  }

  return (
    <div>
      <GlobalHeader />
      <main className="favoritesPage">
        <h1>Favoritter</h1>
        <p className="favoritesLead">Rettene du har lagret på denne enheten. Åpne ferske søkeresultater for å sjekke meny og tilgjengelighet på nytt.</p>
        {error ? <p role="alert">Kunne ikke oppdatere favorittene på denne enheten.</p> : null}
        {favorites.length === 0 ? (
          <section>
            <h2>Ingen favoritter ennå</h2>
            <p>Lagre retter fra søkeresultatene for å finne dem igjen her.</p>
            <div className="favoritesActions"><a href={dishSearchHref("ramen")}>Finn noe godt</a></div>
          </section>
        ) : (
          <ul className="favoritesList">
            {favorites.map((item) => (
              <li key={item.menuItemId}>
                <h2>{item.dishName}</h2>
                <p>{item.restaurantName} · {item.city}</p>
                <div className="favoritesActions">
                  <a href={dishSearchHref(item.dishName, item.city)}>Se ferske treff</a>
                  <button className="favoriteToggle" type="button" onClick={() => remove(item.menuItemId)}>Fjern favoritt</button>
                </div>
              </li>
            ))}
          </ul>
        )}
        <p className="favoritesNote">Favorittene lagres bare i nettleseren på denne enheten. De kan forsvinne hvis du sletter nettleserdata. De synkroniseres ikke med AHA eller «Min mat».</p>
      </main>
    </div>
  );
}
