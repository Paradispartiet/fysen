import type { MetadataRoute } from "next";
import { withPublicBasePath } from "../lib/public-path";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Fysen – finn maten du har lyst på",
    short_name: "Fysen",
    description: "Finn ferske retter og restauranter i Oslo.",
    lang: "nb",
    id: withPublicBasePath("/"),
    start_url: withPublicBasePath("/"),
    scope: withPublicBasePath("/"),
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#070807",
    theme_color: "#070807",
    icons: [
      { src: withPublicBasePath("/pwa-icons/192"), sizes: "192x192", type: "image/png", purpose: "any" },
      { src: withPublicBasePath("/pwa-icons/512"), sizes: "512x512", type: "image/png", purpose: "any maskable" },
    ],
  };
}
