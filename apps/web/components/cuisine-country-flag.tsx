import { countryFlagUrl } from "./cuisine-country-flag";

export function CuisineCountryFlag({
  emoji,
  className,
}: {
  readonly emoji: string;
  readonly className: string;
}) {
  const src = countryFlagUrl(emoji);
  if (!src) return null;

  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={className}
      width={28}
      height={20}
      loading="lazy"
      decoding="async"
    />
  );
}
