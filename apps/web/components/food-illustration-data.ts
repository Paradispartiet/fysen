/**
 * Fysen original illustrations — small transparent SVG assets suitable for both
 * dark and light surfaces. Assets are kept as editable, scalable vector files.
 * Never accompany an authentic national or regional flag with an illustration.
 */
export const foodIllustrationNames = ["pizza","pasta","rice","curry","coconut","flatbread","fish","greens","taco","chili","orange","steak","burger","chicken","hotdog","sandwich","wrap","fishchips","kebab","pretzel","olive","cheese","salad","pie","croissant","bagel","lobster","barbecue","tomato","soup","cake","basil","spice"] as const;

export type FoodIllustrationName = (typeof foodIllustrationNames)[number];

export const foodIllustrationBasePath = "/food-icons";

export function foodIllustrationSrc(name: FoodIllustrationName): string {
  return `${foodIllustrationBasePath}/${name}.svg`;
}
