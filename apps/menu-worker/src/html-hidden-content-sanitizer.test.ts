import { describe, expect, it } from "vitest";
import {
  extractHtmlVisibleText,
  stripExplicitlyHiddenHtmlContent,
} from "./html-extractor.js";

describe("hidden HTML recovery sanitization", () => {
  it("removes proven Webflow invisible noise without discarding generic collapsed menu content", () => {
    const html = `
      <html><body>
        <section hidden><p>Kashke Bademjan 99 kr</p></section>
        <section aria-hidden="true"><p>Soltani 299 kr</p></section>
        <div class="w-condition-invisible"><p>ALT 339 kr</p></div>
      </body></html>
    `;

    const sanitized = stripExplicitlyHiddenHtmlContent(html);
    const visibleText = extractHtmlVisibleText(sanitized);

    expect(visibleText).toContain("Kashke Bademjan 99 kr");
    expect(visibleText).toContain("Soltani 299 kr");
    expect(visibleText).not.toContain("ALT 339 kr");
  });
});
