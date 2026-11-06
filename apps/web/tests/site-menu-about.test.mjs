import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { URL } from "node:url";

function read(relative) {
  return readFileSync(new URL(relative, import.meta.url), "utf8");
}

test("the site menu offers an About Fysen page", () => {
  const header = read("../components/global-header.tsx");
  const about = read("../app/om/page.tsx");
  assert.match(header, /<details className="siteMenu">/u);
  assert.match(header, /withPublicBasePath\("\/om"\)/u);
  assert.match(about, /Menyarkiv mens ferske søk er utilgjengelige/u);
  assert.match(about, /ikke sanntidsinformasjon/u);
});

test("archive result and browse views do not show the large archive information box", () => {
  const archive = read("../components/verified-menu-archive-view.tsx");
  const search = read("../app/search/page.tsx");
  assert.doesNotMatch(archive, /ArchiveIntro/u);
  assert.match(search, /arkivtreff \(ikke sanntid\)/u);
});
