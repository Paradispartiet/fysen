"use client";

import { useEffect } from "react";
import { withPublicBasePath } from "../lib/public-path";

export function PwaRegistration() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    void navigator.serviceWorker.register(withPublicBasePath("/sw.js"), {
      scope: withPublicBasePath("/"),
    }).catch(() => {
      // Offline support is progressive enhancement; online search still works.
    });
  }, []);

  return null;
}
