import { withPublicBasePath } from "../lib/public-path";

export function FysenLogo({ linked = true }: { linked?: boolean }) {
  const mark = (
    <span className="fysenBrandLockup">
      <span className="fysenLogo">fysen</span>
      <img
        className="fysenBrandMark"
        src={withPublicBasePath("/brand/fysen-mark-exact.png")}
        width="58"
        height="38"
        alt=""
        aria-hidden="true"
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
