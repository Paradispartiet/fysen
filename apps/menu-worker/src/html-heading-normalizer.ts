import { load } from "cheerio";

export const HTML_HEADING_NORMALIZER_VERSION = "heading-v2";

const STANDALONE_CURRENCY_LABEL = /^(?:NOK|kr\.?)$/iu;
const CONTACT_PHONE_METADATA = /^(?:phone|telefon|tel(?:efon)?|mobile|mobil)\s*:\s*[+()\d][+()\d\s.-]{4,}$/iu;

function parserOnlyMetadata(value: string): boolean {
  const normalized = value.normalize("NFKC").replace(/\s+/g, " ").trim();
  return STANDALONE_CURRENCY_LABEL.test(normalized) || CONTACT_PHONE_METADATA.test(normalized);
}

export function normalizeHtmlHeadingLineBreaks(html: string): string {
  const $ = load(html);
  $("h1, h2, h3, h4, h5, h6").each((_, heading) => {
    $(heading).find("br").replaceWith(" ");
  });

  $("*").each((_, element) => {
    const node = $(element);
    if (node.children().length > 0) return;
    if (parserOnlyMetadata(node.text())) node.remove();
  });

  return $.html();
}
