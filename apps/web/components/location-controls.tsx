"use client";

import type { DishSearchSort } from "@fysen/contracts";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

interface LocationControlsProps {
  readonly hasLocation: boolean;
  readonly sort: DishSearchSort;
}

function roundedCoordinate(value: number): string {
  return value.toFixed(4);
}

export function LocationControls({ hasLocation, sort }: LocationControlsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  function navigate(update: (params: URLSearchParams) => void): void {
    const params = new URLSearchParams(searchParams.toString());
    update(params);
    router.push(`/search?${params.toString()}`, { scroll: false });
  }

  function useLocation(): void {
    if (!navigator.geolocation) {
      setStatus("Nettleseren din støtter ikke posisjon.");
      return;
    }

    setLocating(true);
    setStatus(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        navigate((params) => {
          params.set("lat", roundedCoordinate(position.coords.latitude));
          params.set("lon", roundedCoordinate(position.coords.longitude));
          params.set("sort", "distance");
        });
        setLocating(false);
      },
      (error) => {
        setLocating(false);
        setStatus(
          error.code === error.PERMISSION_DENIED
            ? "Posisjon ble ikke delt. Du kan fortsatt søke uten den."
            : "Vi fikk ikke hentet posisjonen din akkurat nå.",
        );
      },
      {
        enableHighAccuracy: false,
        timeout: 8_000,
        maximumAge: 5 * 60_000,
      },
    );
  }

  function setSort(nextSort: DishSearchSort): void {
    navigate((params) => params.set("sort", nextSort));
  }

  function clearLocation(): void {
    navigate((params) => {
      params.delete("lat");
      params.delete("lon");
      params.set("sort", "relevance");
    });
    setStatus(null);
  }

  return (
    <div className="locationControls" aria-label="Avstand og sortering">
      {!hasLocation ? (
        <button className="locationAction" type="button" onClick={useLocation} disabled={locating}>
          {locating ? "Henter posisjon …" : "Bruk min posisjon"}
        </button>
      ) : (
        <>
          <div className="sortControls" aria-label="Sorter søkeresultater">
            <button
              className={sort === "relevance" ? "sortAction isActive" : "sortAction"}
              type="button"
              onClick={() => setSort("relevance")}
              aria-pressed={sort === "relevance"}
            >
              Beste treff
            </button>
            <button
              className={sort === "distance" ? "sortAction isActive" : "sortAction"}
              type="button"
              onClick={() => setSort("distance")}
              aria-pressed={sort === "distance"}
            >
              Nærmest
            </button>
          </div>
          <button className="locationClear" type="button" onClick={clearLocation}>
            Fjern posisjon
          </button>
        </>
      )}
      {status ? <p className="locationStatus" role="status">{status}</p> : null}
    </div>
  );
}
