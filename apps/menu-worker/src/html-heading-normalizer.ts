import { load } from "cheerio";

export const HTML_HEADING_NORMALIZER_VERSION = "heading-v1";

export function normalizeHtmlHeadingLineBreaks(html: string): string {
  const $ = load(html);
  $("h1, h2, h3, h4, h5, h6").each((_, heading) => {
    $(heading).find("br").replaceWith(" ");
  });
  return $.html();
}
