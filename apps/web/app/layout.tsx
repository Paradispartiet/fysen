import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import type { ReactNode } from "react";
import "../styles/tokens.css";
import "./globals.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter-tight",
});

export const metadata: Metadata = {
  title: "Fysen — finn retten du har lyst på",
  description: "Søk etter en rett og finn restauranter som har den på en fersk, sporbar meny.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="nb">
      <body className={interTight.variable}>{children}</body>
    </html>
  );
}
