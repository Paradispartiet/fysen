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
