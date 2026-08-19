import { load } from "cheerio";

export const HTML_HEADING_NORMALIZER_VERSION = "heading-v2";

const STANDALONE_CURRENCY_LABEL = /^(?:NOK|kr\.?)$/iu;
const NOK_PREFIXED_PRICE = /^NOK\s*([1-9]\d{1,3}(?:[.,]\d{1,2})?)$/iu;
const CONTACT_PHONE_METADATA = /(?:^|\s)(?:phone|telefon|tel(?:efon)?|mobile|mobil)\s*:\s*[+()\d][+()\d\s.-]{4,}/iu;

function normalizedText(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

export function normalizeHtmlHeadingLineBreaks(html: string): string {
  const $ = load(html);
  $("h1, h2, h3, h4, h5, h6").each((_, heading) => {
    $(heading).find("br").replaceWith(" ");
  });

  const elements = $("body *").toArray();
  for (const element of [...elements].reverse()) {
    const node = $(element);
    const text = normalizedText(node.text());
    if (text.length <= 160 && CONTACT_PHONE_METADATA.test(text)) {
      node.remove();
    }
  }

  $("body *").each((_, element) => {
    const node = $(element);
    const text = normalizedText(node.text());
    const nokPrefixedPrice = text.match(NOK_PREFIXED_PRICE);
    if (nokPrefixedPrice?.[1]) {
      node.text(`${nokPrefixedPrice[1]} NOK`);
      return;
    }
    if (STANDALONE_CURRENCY_LABEL.test(text)) node.remove();
  });

  return $.html();
}
