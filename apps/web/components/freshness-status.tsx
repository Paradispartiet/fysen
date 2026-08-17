const OSLO_TIME_ZONE = "Europe/Oslo";

function dateKey(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: OSLO_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function timeLabel(date: Date): string {
  return new Intl.DateTimeFormat("nb-NO", {
    timeZone: OSLO_TIME_ZONE,
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);
}

function longDateLabel(date: Date): string {
  return new Intl.DateTimeFormat("nb-NO", {
    timeZone: OSLO_TIME_ZONE,
    day: "numeric",
    month: "long",
  }).format(date);
}

function freshnessLabel(checkedAt: Date, now: Date): string {
  const diffMs = Math.max(0, now.getTime() - checkedAt.getTime());
  const diffMinutes = Math.floor(diffMs / 60_000);

  if (diffMinutes < 2) return "Sjekket nå";
  if (diffMinutes < 60) return `Sjekket for ${diffMinutes} min siden`;

  const today = dateKey(now);
  const checkedDay = dateKey(checkedAt);
  if (checkedDay === today) return `Sjekket i dag ${timeLabel(checkedAt)}`;

  const yesterday = dateKey(new Date(now.getTime() - 86_400_000));
  if (checkedDay === yesterday) return `Sjekket i går ${timeLabel(checkedAt)}`;

  return `Sist kontrollert ${longDateLabel(checkedAt)}`;
}

export function FreshnessStatus({
  checkedAt,
  freshUntil,
}: {
  checkedAt: string;
  freshUntil: string;
}) {
  const checked = new Date(checkedAt);
  const now = new Date();
  const isFresh = Number.isFinite(new Date(freshUntil).getTime()) && now <= new Date(freshUntil);
  const label = freshnessLabel(checked, now);

  return (
    <span className={isFresh ? "freshnessStatus isFresh" : "freshnessStatus"}>
      {isFresh ? <span className="freshnessDot" aria-hidden="true" /> : null}
      <time dateTime={checkedAt}>{label}</time>
    </span>
  );
}
