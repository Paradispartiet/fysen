"use client";

import { useEffect, useState } from "react";
import type { DishBrowseResponse } from "@fysen/contracts/dish-browse";
import { browseDishesClient } from "../lib/client-dish-search";
import { DishBrowse } from "./dish-browse";

export function DishBrowseLoader({ city, initialCuisineName }: { city: string; initialCuisineName: string }) {
  const [data, setData] = useState<DishBrowseResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    void browseDishesClient(city, { signal: controller.signal })
      .then((result) => { setData(result); setError(null); })
      .catch(() => { if (!controller.signal.aborted) setError("Sjekk nettet og prøv igjen."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [city]);

  return <DishBrowse city={city} data={data} error={error} loading={loading} initialCuisineName={initialCuisineName} />;
}
