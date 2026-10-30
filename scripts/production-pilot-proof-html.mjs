function renderedText(htmlFragment) {
  return htmlFragment
    .replace(/<!--[\s\S]*?-->/gu, "")
    .replace(/<[^>]+>/gu, "")
    .replace(/\s+/gu, " ")
    .trim();
}

export function hasServerRenderedDishBrowseHeading(webHtml, city) {
  const heading = webHtml.match(
    /<h1\b[^>]*\bid=["']dish-browse-title["'][^>]*>([\s\S]*?)<\/h1>/iu,
  );
  return (
    heading !== null &&
    renderedText(heading[1] ?? "") === `Alle retter i ${city}`
  );
}

export function hasServerRenderedLiveDishBrowse(webHtml, city) {
  const renderedHtml = webHtml
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/giu, "")
    .replace(/<!--[\s\S]*?-->/gu, "");
  if (!hasServerRenderedDishBrowseHeading(renderedHtml, city)) return false;
  const firstDish = renderedHtml.match(
    /<div\b[^>]*\bclass=["']dishBrowseList["'][^>]*>\s*<div\b[^>]*\bclass=["']dishBrowseItem["'][^>]*>\s*<a\b[^>]*\bclass=["']dishBrowseItemMain["'][^>]*>\s*<strong\b[^>]*>([\s\S]*?)<\/strong>/iu,
  );
  return firstDish !== null && renderedText(firstDish[1] ?? "").length > 0;
}
