"use client";

import type { ConversionEventType } from "@fysen/contracts";
import type { ReactNode } from "react";

interface TrackedExternalLinkProps {
  readonly href: string;
  readonly impressionId: string | null;
  readonly eventType: ConversionEventType;
  readonly className?: string;
  readonly children: ReactNode;
  readonly target?: "_blank";
  readonly rel?: string;
}

function emitConversionEvent(impressionId: string, eventType: ConversionEventType): void {
  if (process.env.NEXT_PUBLIC_DISABLE_FUNNEL_TRACKING === "1") return;

  const payload = JSON.stringify({
    clientEventId: crypto.randomUUID(),
    impressionId,
    eventType,
  });

  const blob = new Blob([payload], { type: "application/json" });
  if (navigator.sendBeacon("/api/funnel/events", blob)) return;

  void fetch("/api/funnel/events", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: payload,
    keepalive: true,
  }).catch(() => undefined);
}

export function TrackedExternalLink({
  href,
  impressionId,
  eventType,
  className,
  children,
  target,
  rel,
}: TrackedExternalLinkProps) {
  return (
    <a
      className={className}
      href={href}
      target={target}
      rel={rel}
      onClick={() => {
        if (impressionId) emitConversionEvent(impressionId, eventType);
      }}
    >
      {children}
    </a>
  );
}
