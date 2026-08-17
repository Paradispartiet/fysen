export function FysenLogo({ linked = true }: { linked?: boolean }) {
  const mark = <span className="fysenLogo">fysen.</span>;

  if (!linked) return mark;

  return (
    <a className="fysenLogoLink" href="/" aria-label="Fysen forsiden">
      {mark}
    </a>
  );
}
