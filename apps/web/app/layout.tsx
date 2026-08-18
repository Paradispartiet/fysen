import type { Metadata } from "next";
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
import "../styles/food-knowledge-v1.css";
import "../styles/dish-knowledge-restaurants.css";
import "../styles/discovery-quality-v1.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fysen",
});

export const metadata: Metadata = {
  title: "Fysen — finn retten du har lyst på",
  description: "Søk etter en rett og finn restauranter som har den på en fersk, sporbar meny.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="nb">
      <body className={dmSans.variable}>{children}</body>
    </html>
  );
}
