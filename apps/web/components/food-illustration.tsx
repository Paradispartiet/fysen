import { foodIllustrationSrc, type FoodIllustrationName } from "./food-illustration-data";
import { withPublicBasePath } from "../lib/public-path";

export function FoodIllustration({
  name,
  className,
  size = 44,
}: {
  readonly name: FoodIllustrationName;
  readonly className?: string;
  readonly size?: number;
}) {
  return (
    <img
      src={withPublicBasePath(foodIllustrationSrc(name))}
      alt=""
      aria-hidden="true"
      className={className ?? "foodIllustration"}
      loading="lazy"
      decoding="async"
      width={size}
      height={size}
    />
  );
}
