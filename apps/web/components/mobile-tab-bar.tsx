"use client";

import { usePathname } from "next/navigation";
import { withPublicBasePath } from "../lib/public-path";

const tabs = [
  { href: withPublicBasePath("/"), label: "Søk", icon: "search" },
  { href: withPublicBasePath("/search?city=Oslo"), label: "Utforsk", icon: "explore" },
  { href: withPublicBasePath("/favoritter"), label: "Favoritter", icon: "heart" },
] as const;

function TabIcon({ name }: { name: "search" | "explore" | "heart" }) {
  if (name === "search") return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m15.5 15.5 5 5" /></svg>;
  if (name === "heart") return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 1 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" /></svg>;
  return <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2"><path d="m12 2 4 8 6 2-9 4-3 6-2-9-6-3 10-8Z" strokeLinejoin="round" /><circle cx="12" cy="12" r="2" /></svg>;
}

export function MobileTabBar() {
  const pathname = usePathname();
  if (!pathname || pathname.startsWith(withPublicBasePath("/admin")) || pathname.startsWith(withPublicBasePath("/pro")) || pathname.startsWith(withPublicBasePath("/claim"))) return null;

  return (
    <nav className="mobileTabBar" aria-label="Appnavigasjon">
      {tabs.map(({ href, label, icon }) => {
        const path = href.split("?")[0];
        const active = path === withPublicBasePath("/")
          ? pathname === path
          : path === withPublicBasePath("/search")
            ? pathname === path
            : pathname.startsWith(path);
        return (
          <a key={label} href={href} className={active ? "mobileTab active" : "mobileTab"} aria-current={active ? "page" : undefined}>
            <TabIcon name={icon} />
            <span>{label}</span>
          </a>
        );
      })}
    </nav>
  );
}
