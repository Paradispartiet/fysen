import { withPublicBasePath } from "../lib/public-path";

export function FysenLogo({ linked = true }: { linked?: boolean }) {
  const mark = (
    <span className="fysenBrandLockup">
      <img
        className="fysenBrandMark"
        src={withPublicBasePath("/brand/fysen-mark.webp")}
        width="42"
        height="42"
        alt=""
        aria-hidden="true"
      />
      <span className="fysenLogo">fysen</span>
    </span>
  );

  if (!linked) return mark;

  return (
    <a className="fysenLogoLink" href={withPublicBasePath("/")} aria-label="Fysen forsiden">
      {mark}
    </a>
  );
}
