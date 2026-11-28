import { LocalizedEditorialImg, EditorialCreditLabel } from "./localized-editorial-img";
import { withPublicBasePath } from "../lib/public-path";
import manifest from "../public/dish-images/manifest.json";

type DishImageEntry = {
  id: string;
  catalogId?: string | null;
  label: string;
  query: string;
  atlas: string;
  kind: string;
  largeSource?: string | null;
  largeViewEnabled?: boolean;
  largeSourceNativeWidth?: number;
  largeSourceNativeHeight?: number;
  photoCredit?: string;
  photoSource?: string;
  photoLicense?: string;
};
const entries: readonly DishImageEntry[] = manifest.images;
const normalize = (value: string) => value.trim().toLocaleLowerCase("nb-NO").replace(/\s+/gu, " ");

const imageIdAliases: Readonly<Record<string, string>> = {
  carbonara: "pasta-carbonara",
  "pad-thai": "pad-thai-reker",
};

export function findDishImage(dishId?: string | null, query?: string) {
  const exactId = dishId ? imageIdAliases[dishId] ?? dishId : null;
  return (exactId ? entries.find((image) => image.id === exactId || image.catalogId === exactId) : undefined)
    ?? (query ? entries.find((image) => normalize(image.query) === normalize(query)) : undefined);
}

export function DishEditorialImage({ dishId, query, className = "", priority = false }: {
  dishId?: string | null; query?: string; className?: string; priority?: boolean;
}) {
  const image = findDishImage(dishId, query);
  if (!image) return null;
  const master = image.largeViewEnabled === true && image.largeSource;
  const file = master || image.atlas;
  return (
    <figure className={`dishEditorialFigure ${className}`}>
      {/* The approved native-resolution AVIF is displayed in place, not opened in another tab. */}
      <LocalizedEditorialImg
        imageId={image.id}
        imageLabel={image.label}
        imageKind={image.kind}
        className="dishEditorialImage"
        src={withPublicBasePath(`/dish-images/${file}`)}
        alt={`${image.kind} av ${image.label}, ikke restaurantfoto`}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        width={master ? image.largeSourceNativeWidth : undefined}
        height={master ? image.largeSourceNativeHeight : undefined}
      />
      {image.photoCredit ? (
        <figcaption className="dishEditorialCredit">
          {image.photoSource ? <a href={image.photoSource} target="_blank" rel="noopener noreferrer">{image.photoCredit}</a> : image.photoCredit}
          {image.photoLicense ? <> · <a href={image.photoLicense} target="_blank" rel="noopener noreferrer"><EditorialCreditLabel kind="license" /></a></> : null}
        </figcaption>
      ) : image.kind.toLowerCase().includes("illustrasjon") ? <figcaption className="dishEditorialCredit"><EditorialCreditLabel kind="ai" /></figcaption> : null}
    </figure>
  );
}
