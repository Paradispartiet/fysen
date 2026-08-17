export function SearchState({
  title,
  body,
  actionHref,
  actionLabel,
}: {
  title: string;
  body?: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <section className="searchState" aria-live="polite">
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
      {actionHref && actionLabel ? <a href={actionHref}>{actionLabel}</a> : null}
    </section>
  );
}
