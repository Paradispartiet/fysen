import { withPublicBasePath } from "../lib/public-path";

export function FysenLogo({ linked = true }: { linked?: boolean }) {
  const mark = (
    <span className="fysenBrandLockup">
      <img
        className="fysenBrandMark"
        src={withPublicBasePath("/brand/fysen-logo-approved.webp")}
        width="84"
        height="84"
        alt={linked ? "" : "Fysen"}
      />
    </span>
  );

  if (!linked) return mark;

  return (
    <a className="fysenLogoLink" href={withPublicBasePath("/")} aria-label="Fysen forsiden">
      {mark}
    </a>
  );
}
