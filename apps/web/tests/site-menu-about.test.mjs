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
  assert.match(about, /id="menydata"/u);
  assert.match(header, /#menydata/u);
  assert.match(about, /ikke en sanntidsbekreftelse/u);
});

test("ordinary pages keep status details exclusively behind the menu", () => {
  const archive = read("../components/verified-menu-archive-view.tsx");
  const search = read("../app/search/page.tsx");
  const home = read("../app/page.tsx");
  const browse = read("../components/dish-browse.tsx");
  const explorer = read("../components/cuisine-explorer.tsx");
  const preview = read("../components/static-preview-search-page.tsx");
  const knowledge = read("../components/dish-knowledge-dialog.tsx");
  const result = read("../components/dish-result.tsx");
  const visibleCopy = /Ingen ferske|ferske menyer|ferske menytreff|menyarkiv|arkivtreff|ikke sanntid|sist bekreftede menyer/iu;
  for (const [name, source] of Object.entries({ archive, home, browse, explorer, preview, knowledge, result })) {
    assert.doesNotMatch(source, visibleCopy, name);
  }
  assert.doesNotMatch(search, /" arkivtreff \(ikke sanntid\)"|title=\{`Ingen ferske/u);
  assert.doesNotMatch(result, /<FreshnessStatus/u);
  assert.match(archive, /Alle retter i \{city\}/u);
});
