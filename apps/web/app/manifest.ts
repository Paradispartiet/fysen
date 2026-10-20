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
      { src: withPublicBasePath("/icon.svg"), sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: withPublicBasePath("/icon-maskable.svg"), sizes: "any", type: "image/svg+xml", purpose: "maskable" },
    ],
  };
}
