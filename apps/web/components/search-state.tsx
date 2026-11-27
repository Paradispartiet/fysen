import type { ReactNode } from "react";

export function SearchState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: ReactNode;
  body?: ReactNode;
  actionHref?: string | undefined;
  actionLabel?: ReactNode;
}) {
  return (
    <section className="searchState" aria-live="polite">
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      {actionHref && actionLabel ? <a href={actionHref}>{actionLabel}</a> : null}
    </section>
  );
}
