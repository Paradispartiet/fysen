import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import type { ReactNode } from "react";
import "../styles/tokens.css";
import "./globals.css";
import "../styles/theme.css";
import "../styles/design-v2-1.css";
import "../styles/results-v2-1.css";
import "../styles/design-v2-2.css";
import "../styles/design-v2-2-1.css";
import "../styles/dish-learning-dialog.css";
import "../styles/cuisine-explorer-v2-3.css";
import "../styles/matlyst-v2.css";
import "../styles/food-knowledge-v1.css";
import "../styles/dish-knowledge-restaurants.css";
import "../styles/discovery-quality-v1.css";
import "../styles/dish-browse.css";
import "../styles/matlyst-featured.css";
import "../styles/restaurant-claim.css";
import "../styles/fysen-pro.css";
import "../styles/min-mat.css";
import "../styles/mobile-app.css";
import { PwaRegistration } from "../components/pwa-registration";
import { MobileTabBar } from "../components/mobile-tab-bar";
import { withPublicBasePath } from "../lib/public-path";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fysen",
});

export const metadata: Metadata = {
  title: "Fysen — finn retten du har lyst på",
  description: "Søk etter en rett og finn restauranter som har den på en fersk, sporbar meny.",
  applicationName: "Fysen",
  manifest: withPublicBasePath("/manifest.webmanifest"),
  icons: {
    icon: [{ url: withPublicBasePath("/icon.svg"), type: "image/svg+xml" }],
    apple: [{ url: withPublicBasePath("/brand/fysen-mark-exact.png") }],
  },
  appleWebApp: { capable: true, title: "Fysen", statusBarStyle: "default" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#070807",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="nb">
      <body className={dmSans.variable}>{children}<MobileTabBar /><PwaRegistration /></body>
    </html>
  );
}
