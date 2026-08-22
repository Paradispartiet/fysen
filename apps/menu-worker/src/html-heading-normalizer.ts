import { load } from "cheerio";

export const HTML_HEADING_NORMALIZER_VERSION = "heading-v3";

const STANDALONE_CURRENCY_LABEL = /^(?:NOK|kr\.?)$/iu;
const NOK_PREFIXED_PRICE = /^NOK\s*([1-9]\d{1,3}(?:[.,]\d{1,2})?)$/iu;
const DOT_DASH_NOK_PRICE = /(\b[1-9]\d{1,3})\s*\.-/gu;
const PRICE_WITH_TRAILING_PARENTHETICAL_METADATA =
  /^((?:(?:NOK\s*)|(?:kr\.?\s*))?[1-9]\d{1,3}(?:[.,]\d{1,2})?(?:\s*(?:,-|kr\.?|NOK))?)\s*(\([^()]{1,240}\))$/iu;

function normalizedText(value: string): string {
  return value.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function looksLikeParentheticalMetadata(value: string): boolean {
  const inner = value.slice(1, -1).trim();
  const parts = inner
    .split(",")
    .map((part) => part.trim())
    .filter(Boolean);
  return (
    parts.length >= 2 &&
    parts.every(
      (part) =>
        part.length >= 2 &&
        part.length <= 40 &&
        /^[\p{L}\s/&-]+$/u.test(part),
    )
  );
}

export function normalizeHtmlHeadingLineBreaks(html: string): string {
  const $ = load(html);
  $("h1, h2, h3, h4, h5, h6").each((_, heading) => {
    $(heading).find("br").replaceWith(" ");
  });

  $("body *").each((_, element) => {
    const node = $(element);
    const text = normalizedText(node.text());
    const nokPrefixedPrice = text.match(NOK_PREFIXED_PRICE);
    if (nokPrefixedPrice?.[1]) {
      node.text(`${nokPrefixedPrice[1]} NOK`);
      return;
    }
    if (STANDALONE_CURRENCY_LABEL.test(text)) {
      node.remove();
      return;
    }

    const priceWithMetadata = text.match(
      PRICE_WITH_TRAILING_PARENTHETICAL_METADATA,
    );
    if (
      priceWithMetadata?.[1] &&
      priceWithMetadata[2] &&
      looksLikeParentheticalMetadata(priceWithMetadata[2])
    ) {
      node.text(priceWithMetadata[1].trim());
    }
  });

  $("body")
    .find("*")
    .addBack()
    .contents()
    .each((_, content) => {
      if (content.type !== "text") return;
      content.data = content.data.replace(DOT_DASH_NOK_PRICE, "$1,-");
    });

  return $.html();
}
