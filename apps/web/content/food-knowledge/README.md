# Food Knowledge content

This directory is the canonical editorial dish layer used by Fysen web.

- `catalog.ts` owns stable dish identity, search aliases, cuisine/region ownership and explorer priority.
- `manifest.ts` explicitly lists dishes with full Food Knowledge articles and the small featured homepage subset.
- `articles/` owns one rich article per manifested dish.
- `index.ts` validates catalog/article/related-dish integrity and exposes the assembled runtime model.
- `types.ts` is the content contract.

Do not recreate dish identity or article bodies inside UI components. Restaurant-specific facts still come only from Fysen menu evidence and are not stored here.
