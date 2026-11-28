# Nordic localization

Fysen must support Nordic languages across the whole product, not just city navigation. The Fysen brand is unchanged.

## Planned language coverage

- nb (Norsk bokmål), nn (Norsk nynorsk), sv (Svenska), da (Dansk), fi (Suomi), is (Íslenska), en (English).
- fo (Føroyskt), kl (Kalaallisut), se (Davvisámegiella); further Sámi and Nordic minority languages can be added through the same architecture.
- Only offer a locale as complete after its required translation catalog and review are complete. Faroese, Greenlandic and Sámi copy needs competent linguistic review. English is an additional international locale.

## Implementation

1. Typed locale registry, deterministic negotiation, explicit user preference over browser preference, existing Bokmål fallback. Locale must never implicitly change the user's selected city, query or filters.
2. Typed UI dictionaries with completeness tests. Localized document language, page titles, metadata, accessible labels and language selector with native language names, not flags as the sole label. Persist preference; preserve routes and preview base path. Avoid forcing all public routes dynamic solely for language negotiation without assessing caching impact.
3. Translate header, home, search forms, filters, results, restaurant cards, map, error/loading/empty states, Matlyst, food knowledge, Min mat, restaurant and legal pages. Use locale-aware plurals, numbers, dates and currencies. Currency belongs to the restaurant market, not language. Keep original brand, restaurant names and local place names where appropriate.
4. Add localized dish aliases linked to stable canonical dish IDs. For example kjøttboller, köttbullar, kødboller, lihapullat and kjötbollur can be related search terms only where semantic equivalence is verified. Preserve culinary distinctions. Do not translate a dish into a false verified match.
5. Translate food descriptions separately from original source menu items. Keep original menu wording, price, currency, source URL and verification date. Label any translated source text. Never create restaurant availability by translation.
6. Test locale completeness, language switching, query/city/filter persistence, multilingual matching and non-matches, diacritics, accessible controls, localized metadata, mobile and desktop. Test the five Nordic city routes and preserve the existing Norwegian experience. Use targeted checks for each change; full production proof at release milestone.

## Release

This foundation is not an implemented language selector or published translation. Complete the UI and search integration in staged PRs. Do not publish until the relevant translation and regression checks pass. No changes to menu-source priority, archive freshness, restaurant verification or pricing semantics.

## Partial UI preview (not launch-ready)

Set `NEXT_PUBLIC_FYSEN_LANGUAGE_PREVIEW=true` in a dedicated preview build to expose the selector inside the main navigation. Default production builds keep it off. Seven draft dictionaries cover the home hero, city links, global menu and default search labels. Explicit language choice persists locally; unsupported browser languages fall back to Bokmål. The preview does not alter the URL, city, query or menu data. It does not make server routes dynamic. The document language and metadata remain Bokmål until complete route localization; translated fragments use language attributes. Search-result copy, explicit search-button overrides, Matlyst, food knowledge, all other content, minority-language dictionaries and native-speaker reviews remain outstanding. Do not enable on production until the release gates above pass.

## Cuisine atlas preview

The 12 home cuisines and all names extracted from the current atlas and food-type catalogs have seven-language display labels (162 registered labels including shared filter labels). The original Norwegian canonical names remain the identity for filters, search, cuisine membership and dish queries; flags, illustrations and source metadata are unchanged. Tests enforce dictionary coverage. These are draft translations pending linguistic review. Context paragraphs, status text, dish names/descriptions, other discovery controls and minority-language dictionaries still need work. The previous CI run found three source-text assertions that expected hardcoded Bokmål; they were updated to check the translated component and the original Bokmål dictionary value instead. Release remains blocked until current CI and preview browser checks pass.

## Food encyclopedia preview

Thirty message keys now cover the encyclopedia list, search-result note and article dialog in seven preview locales. Twelve existing article summaries have six additional draft translations keyed by canonical dish ID. Untranslated summaries fall back to the unchanged Bokmål text with its language attribute. Eleven canonical dish IDs have draft localized display labels; international dish names otherwise remain unchanged. Display names never replace canonical queries or source menu text. Long articles, recipe ingredients/instructions, other summaries, region names, multilingual search matching, and the three additional planned locales are not complete. Previous CI stopped on a missing Node URL import in the cuisine label test; that import has been added. New CI and native-language review remain mandatory before release.

### Complete summary coverage

All 33 canonical food encyclopedia summaries now have draft translations in the six additional preview languages (198 translations, 231 language versions including the unchanged original Bokmål). The test compares the exact translation IDs against the canonical manifest. Full article body and recipe translations remain outstanding. The previous mobile/tablet browser proof timed out on the Dal makhani note because the accessible label introduced a separator; the original label format has been restored. Fresh CI and browser proof are required before activation.

### Complete article translation pilot

Dal makhani now has complete editorial body and recipe drafts in Nynorsk, Swedish, Danish, Finnish, Icelandic and English. The article overlay retains the original dish ID, summary lookup, canonical query, ingredient artwork mapping, related IDs and source links; missing translations use the unchanged Bokmål body and explicit language notice. A targeted test checks field coverage, list lengths and exact numeric tokens in quantities and times. Other 32 full article bodies and several shared dialog labels remain untranslated. The last pre-pilot commit 715f904 passed CI, mobile/iPad browser proof and public archive verification. New pilot changes require fresh test results and linguistic review.

### Second full article: Ramen

Ramen is registered alongside Dal makhani with complete editorial body and recipe translations in the six additional preview locales. All original menu queries, article IDs, ingredient artwork, related dish IDs and source links remain unchanged. The quantity and structure test now covers both original articles. Commit e8caceb (Dal makhani pilot) passed CI, mobile/iPad proof and public menu archive verification. The Ramen changes await their own checks and language review. Full article body coverage is 2/33.

### Third full article: Biryani

Biryani has complete body and recipe drafts in all six additional preview locales. All 12 ingredient entries, five steps, four regional/vegetarian variants and original sources are retained; tests compare the numeric quantities and timing with the original. The registry and shared tests now cover three of 33 full articles. At the time of this update, the Ramen commit 02ccfbe had passed the mobile/iPad and menu archive proofs, with CI still running. Biryani is not yet independently verified or published.

### Fourth full article: Falafel

Falafel now has complete article body and recipe drafts in all six additional preview locales, retaining 10 ingredient entries, five steps, four variants and original source links. The shared structure and quantity tests cover all four translated articles. The preceding Biryani commit a80c175 passed CI, responsive mobile/iPad proof and public menu archive verification. Falafel still requires fresh CI and linguistic review. Full article body coverage is 4/33; no production activation.

### Fifth full article: Carbonara

Carbonara now has complete article body and recipe drafts in all six additional preview locales. The original seven ingredient entries, five steps, three variants, canonical query and source links remain unchanged. The shared structure and numeric quantity tests cover all five registered articles. Ingredient numeric tokens were compared across all six new translations before committing. No workflow runs were returned for the preceding Falafel documentation commit ac3865e during this update; the new changes are not yet independently verified. Full article body coverage is 5/33. Linguistic review and release checks remain outstanding.

### Sixth full article: Tacos al pastor

Tacos al pastor now has complete body and recipe drafts in the six additional preview locales. Ten ingredient entries, five steps, three variants and the original source link are retained. Numeric ingredient tokens were checked against the Bokmål original before committing; the shared tests now cover six registered articles. No workflow runs were returned for the previous Carbonara documentation commit 07e6f20 during this update. Full article body coverage is 6/33. Fresh CI, linguistic review and release checks remain outstanding; no production activation.

### Batch 7–9: Pad thai, Sushi and Gyoza

Three complete article bodies and recipes were translated in the six additional preview locales and registered together. All original IDs, query mappings, sources and recipes are retained. The new translation data was checked for field counts, ingredient list lengths and numeric consistency; the shared test now covers nine articles. Full article body coverage is 9/33. Work proceeds in larger batches rather than requiring a separate user turn per dish. Fresh CI and linguistic review remain outstanding; no production activation.

### Batch 10–12: Tom yum, Phở and Bánh mì

Three full article bodies and recipes were translated in the six additional preview locales and registered together. All original article IDs, query mappings, source fields and recipes remain intact. Translation list counts and ingredient numeric consistency were checked before committing; shared tests now include twelve articles. Makrut lime is used as a synonym in the Tom yum translations without changing the original ingredient. Full article body coverage is 12/33. GitHub returned no workflow runs for the previous batch commit 970c445 at the start of this update. Fresh CI and linguistic review remain outstanding; no production activation.

### Batch 13–18: Katsu, Bao, Mapo tofu, Butter chicken, Tandoori and Chana masala

Six more full article bodies and recipes are translated into the six additional preview locales. All six files are registered and the shared structure and numeric-quantity test includes eighteen articles. Ingredient counts and numeric consistency between translations were checked before committing; original article IDs, recipes, related dish IDs, source fields and menu query mappings are unchanged. Full article body coverage is 18/33. GitHub returned no workflow runs for the previous batch commit 8f77282 at the start of the update. Fresh CI and linguistic review remain outstanding; no production activation.

### Batch 19–24: Dosa, Cacio e pepe, Pizza Margherita, Arancini, Pasta alla Norma and Hummus

Six additional full article bodies and recipes are translated in all six additional preview locales. The register and shared recipe tests now cover 24 of 33 articles. List and field counts were checked before committing. Canonical IDs, sources and original recipes are unchanged. No workflow runs were returned for the previous batch commit 4c59711 at the start of this update. Fresh CI and linguistic review remain outstanding; no production activation.

### Batch 25–33: complete original encyclopedia coverage

Shawarma, Manakish, Koshari, Pide, Birria, Cochinita pibil, Pozole, Fish taco and Smashburger are now registered with complete article-body and recipe drafts in all six additional preview locales (nn, sv, da, fi, is, en). The canonical manifest and translation registry were compared directly: 33/33 entries, no missing or extra IDs. The nine new translation files were read back from GitHub and compared with the respective original article files: all 54 new locale/article combinations retain list lengths, numeric ingredient and step tokens, numeric yield and time tokens. The shared regression suite covers all 33 original articles and now asserts full manifest coverage. This is structural verification, not a linguistic or food-safety review. No workflow runs were returned for previous head c6e901b at the start of this batch. Fresh CI, native-language review, remaining interface localization, multilingual search and the Faroese, Greenlandic and Northern Sami rollout remain outstanding. Preview is not activated in production.

### Nordic search and price presentation

Added 17 explicit editorial dish equivalence groups (87 unique normalized search terms), verified against the canonical catalog. Preview-only archive expansion preserves literal matches, city, actual menu item names, source versions, dates, prices and quarantine checks; alternate terms match complete word sequences and are lower-ranked than literal matches. Broad ingredient/category terms and non-equivalent variants such as pho bo versus pho are not added. The live API still receives the literal query; a localized optional link searches the canonical international name separately, preserving city, location and sort. The knowledge note uses the canonical ID via its query. Localized live and archive price labels use the original currency and minor-unit convention (no currency conversion); existing Norwegian output remains the default. Source provenance distinctions are retained and localized. Added targeted search and price tests, not yet run by CI. Comparison with main shows a divergent branch (four main-only commits at the time of inspection) and six overlapping files: cuisine explorer, knowledge note, learning section, global header and two source contract tests. Resolve the overlap without discarding main changes before merging; do not activate production until tests and language review pass.

### Merge and regression repairs

Merged current main into preview, retaining restaurant artwork and city navigation. The first mobile/iPad proof passed; CI identified three stale source assertions and archive live proof used a data-URL loader unable to resolve a relative import. Updated the assertions to retain their evidence requirements and use direct TypeScript imports in the live proof. Incorporated subsequent main changes for Egon Nordstrand, including the optional interior guard and exact artwork blob. New CI is required; no production activation.

### Gallery and account/search page localization

Gallery labels cover 44 exact editorial variants in seven preview languages, preserving image IDs, original queries and source evidence. The requested Norwegian gallery intro was removed and the kicker is “Matlyst · Til inspirasjon”. Restaurant artwork captions and alt labels are localized, and the latest Egon Nordstrand assets are retained. Mobile/iPad, archive integrity and approved-image preservation passed on d53465f; six older gallery assertions were repaired to verify the dictionary and dynamic count. Min mat, save/remove/disconnect states, About Fysen content and search counts/errors/location controls now use 66 localized keys. Server-side account session, data access, explicit AHA handoff, menu query, source evidence, geography and currency are unchanged. New CI and native review remain required. Other browse surfaces, image-specific cautions, metadata and three additional Nordic languages are not complete; preview remains off in production.

### Browse menus and evidence labels

On b43af26, quality, mobile/iPad, archive integrity, scope and approved-image preservation all succeeded; database was skipped. Added 61 seven-language browse message keys, translated live and archived browse labels and category links without changing canonical filters, source records or menu queries. All four menu-evidence states are localized separately, keeping unexamined and unavailable states distinct from zero matches. Large editorial image alt text and licence/AI credits are localized, preserving exact image IDs and original attribution. Norwegian defaults remain intact for evidence and image captions. Detailed thumbnail variant descriptions, cuisine context paragraphs, some accessibility labels and server metadata still need localization. Faroese, Greenlandic and Northern Sami remain pending linguistic review. New CI required; production remains unchanged.

### Additional Nordic language review pack

Prepared separate, unreviewed draft dictionaries for Faroese (fo), Greenlandic/Kalaallisut (kl) and Northern Sami (se), each covering all 18 core navigation and homepage message keys. Faroese also has a complete 46-key search-result draft. A new test validates message keys, placeholders, locale tags and explicit exclusion from preview selection. These are AI-assisted drafts, not certified translations; no claim of dictionary verification of every phrase. Suggested terminology review resources: Sprotin and the Faroese language technology centre (https://mtd.setur.fo/resource/ordabokur-a-sprotanum/); Oqaasileriffik (https://oqaasileriffik.gl/en/resources/); Giellatekno/Divvun's Neahttadigisánit (https://sanit.oahpa.no/). Native-speaker review is mandatory, especially for Greenlandic and Northern Sami grammar, menu terminology and evidence wording. The active preview locale set, search evidence and original menus remain unchanged. No production activation.

Faroese food-knowledge UI now has all 31 message keys drafted, including recipe headings, related dishes and the explicit non-evidence warning. This is UI copy only: article bodies, recipes, summaries and the remaining dictionaries still need translation. The draft remains excluded from runtime selection.

### Faroese account, browse and visual review drafts

Added full Faroese draft dictionaries for page/account (66), browse (61) and visual UI (17) messages. Each key and placeholder was compared against Bokmål; original restaurant/menu data and the selectable language set are unchanged. These translations are unreviewed, particularly account/privacy terminology, evidence labels, grammar and accessibility wording. Main was merged using its exact seven changed blobs, including Egon Storo and Ullevaal artwork. No production changes.

Added partial Kalaallisut and Northern Sami search-control drafts (23 keys each), deliberately excluding unreviewed evidence statements and privacy-sensitive explanations. Keys and placeholders were checked, not linguistic accuracy. Both languages are still disabled in the runtime. Faroese now has 239 core/page/browse/result/knowledge/visual keys drafted; cuisine names, image variant names, article summaries/bodies and additional evidence/price strings remain outstanding.

### Faroese food content drafts

Added display-only Faroese drafts covering 162 canonical category labels, 44 exact gallery variant labels, 11 localized dish-name entries and all 33 encyclopedia summaries. International dish names are deliberately retained where appropriate; gallery variant IDs and their original captions remain separate from general dish names. Coverage was compared against existing registries. These 250 entries extend the prior 239 UI messages to 489 Faroese draft entries. Full article bodies and recipes, smaller ancillary dictionaries and native linguistic review are still pending. No new search aliases, runtime locale activation, or original menu changes. On 4e91639 all five applicable checks passed (database skipped); new checks required for this batch.

### Faroese full encyclopedia article drafts: batch 1–9

Drafted all body fields and recipes for Ramen, Biryani, Falafel, Carbonara, Tacos al pastor, Pad thai, Dal makhani, Sushi and Gyoza in a separate Faroese review module. Compared all list lengths and numeric tokens in ingredient lists, preparation steps, yield and time directly against the original nine articles. Added a regression test for those invariants. The 33 existing summaries are separate; source links and related dish IDs remain unchanged in the originals. These translations require native-language and recipe review before use. The runtime registry and enabled locales remain unchanged. Fixed two no-regex-spaces lint errors in the earlier draft tests. Prior mobile, archive, scope and image preservation checks passed; fresh quality check required. Database is outside this change scope.

### Faroese full encyclopedia article drafts: batches 10–33

All 33 article bodies and recipes are now drafted in the separate Faroese review module. The final 15 articles (Dosa through Smashburger) were compared with the original files before committing: required list lengths and numeric tokens in ingredient lines, steps, yield and time matched. The completed review module was read back from GitHub and its 33 IDs and required fields checked against the expanded regression test. This is structural verification only: translation accuracy, terminology, food safety and native-speaker review remain outstanding, as does fresh CI. Faroese remains excluded from the runtime preview locale set. No production activation, original recipe changes, search aliases or source changes.

### Arctic food-knowledge navigation and Peppes Ensjø merge

Merged main into the Nordic draft, preserving the exact Peppes Ensjø exterior photograph, source metadata, attribution and license link and the optional logo/interior guards. Illustration captions remain localized; new photograph-specific wording is temporarily Norwegian. Added 25 food-knowledge UI draft keys each for Kalaallisut (kl) and Northern Sami (se), preserving source placeholders. Six keys involving menu evidence, loading and availability remain intentionally untranslated pending review. These languages now have 66 draft UI keys each (18 core, 23 search controls, 25 knowledge). Drafts remain excluded from runtime locale selection and require native-speaker review. Added coverage tests; CI and linguistic review remain pending. No production activation.

### Arctic browse, page, visual and food-label drafts

Added 65 UI draft keys per language (34 browse, 25 page, 6 visual) for Kalaallisut and Northern Sami, bringing each to 131 of the original 239 UI keys. Added 51 cuisine/category labels and 39 exact gallery-variant labels per language; five uncertain variant translations were intentionally held back. Checked source keys, placeholders and original gallery captions before committing; expanded regression tests and repaired missing test imports. All drafts remain unreviewed and disabled. No menu aliases or restaurant evidence changed. Main has separately expanded the original 33-entry food encyclopedia manifest by 167 entries and added Peppes Stortingsgata artwork. The new merge conflict and catalog/translation compatibility must be resolved before release; 33 Faroese drafts cover the original collection only. CI and native review remain pending.

### Integration of expanded 200-article catalog

Merged main ee360470 into the Nordic draft while preserving all 33 existing translated article IDs and Faroese drafts. The canonical manifest now contains 200 unique IDs; the 167 new original articles and updated original source references are carried over without edits. Main's eighteen featured homepage articles, explicit menu-result links, gallery intro removal and exact Peppes Stortingsgata photograph and provenance are retained. The two existing translation coverage tests now verify the original 33 IDs separately from the 167 additions and assert exact Bokmål fallback for untranslated additions across preview locales. The new expansion test retains its catalog, query, source and UI checks and checks the localized Norwegian dictionary instead of requiring hardcoded Norwegian JSX. Fresh CI and native review remain pending. No activation or production merge.

### Complete original Arctic UI draft dictionaries

Kalaallisut and Northern Sami now each contain all 239 keys in the six original UI dictionaries (18 core, 46 results, 31 knowledge, 61 browse, 66 page/account, 17 visual). All dictionaries were read back and compared against Bokmål for exact key coverage, nonempty values and matching placeholders. The regression tests were updated to assert completeness rather than partial coverage. These are AI-assisted working translations, not approved language versions. Native review of account/privacy wording, menu-evidence distinctions, geographical and cooking terminology is particularly important. Runtime selection remains disabled; no menu data or production activation changed. The separate 51 category and 39 gallery variant drafts remain partial. New main changes require another merge reconciliation and CI remains pending.

### International language foundation

Added French (fr-FR), European Portuguese (pt-PT), Spanish (es-ES) and German (de-DE) as planned locales, taking the register to 14 languages. English is already in the preview subset. The four new languages each have 95 review-only UI keys: 18 core, 46 results, 31 knowledge. Existing preview selection remains unchanged. Regional tags resolve to the base language (including pt-BR to pt); this does not yet provide Brazilian Portuguese wording. City, currency, search identity and original menu evidence remain independent of locale. Source keys and placeholders were checked before committing; dedicated regression tests assert complete coverage for these dictionaries and exclusion from runtime selection. Remaining: browse, account/page, visuals, food labels, article summaries/bodies, search aliases, CI and linguistic review. No production activation.

### Complete international original UI review dictionaries

French, European Portuguese, Spanish and German now each have all 239 original UI keys: 18 core, 46 results, 31 knowledge, 61 browse, 66 page/account and 17 visual. The 144 new keys per locale include location/permission wording, menu evidence and limitations, account transfer and privacy wording, gallery attribution and image distinctions. All remain review-only, excluded from runtime selection. Exact keys and interpolation tokens checked before commits; regression tests cover all six dictionaries. Language review, CI and main reconciliation remain pending. No new article translations, search aliases or menu evidence changes in this batch.

### International editorial food display labels

French, European Portuguese, Spanish and German now have 162/162 cuisine/category labels, 44/44 exact gallery-variant captions and 11/11 localized dish display names per language, in a separate review-only module. All keys were compared against source registries, and gallery rows retain the exact Norwegian original label. International culinary names and canonical identifiers remain intact. Added regression assertions for exact key coverage, nonempty labels and original gallery variants; no changes to menu matching, query aliases, article translations or production locale selection. Native review, CI and main reconciliation remain pending.

### International summary review batch 1

Added four review-language summaries for all 33 original articles and five-language summaries for 50 expanded articles. Existing 33 English summaries copied verbatim, not replaced. Total 83/200 per language in a separate review-only registry, with exact canonical IDs verified and regression coverage for nonempty values, language keys and existing English text preservation. No runtime activation or changes to originals, search aliases or menu evidence. Remaining 117 summaries per language; linguistic review, CI and main reconciliation pending.

### International summary review batch 2

Added 55 canonical article summaries in each of five languages, reaching 138/200 per language. The 275 new working translations preserve existing entries, and original source IDs were checked against the remaining ordered list. The registry is still review-only; 62 articles remain per language. Updated coverage assertion; no CI execution or production activation.

### International summary review batch 3 – complete original 200-entry catalog

Added the final 62 canonical summaries in each of five languages (310 new working translations). The review registry now contains exactly 200 canonical IDs and all five languages per row, 1,000 summary texts in total, including the original 33 English summaries preserved verbatim. Regression tests assert exact canonical ID equality, language keys, nonempty entries and English preservation. All remain review-only; no change to runtime selection, original articles, menu evidence or query aliases. Full article bodies, linguistic review, CI and main reconciliation remain pending.

### International full article review batch 1

Added complete review-only article bodies for sambar, idli, vada, naan, yakitori, green curry, udon and dumplings in English, French, European Portuguese, Spanish and German (40 bodies). Includes all original editorial sections, recipe labels, yields, times, ingredients, ordered steps, variants, serving and mistakes. All original numeric tokens and list lengths were compared before committing. Summaries already exist; related IDs and original source links remain in the original articles and must be composed unchanged on activation. Existing 33 English article bodies remain untouched. Review counts: English 41/200, other four 8/200. No runtime activation, CI or native review. Main reconciliation remains pending.
