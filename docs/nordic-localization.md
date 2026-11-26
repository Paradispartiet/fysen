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
