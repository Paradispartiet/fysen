import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test, { after } from "node:test";
import { URL, fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const webRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const compiledRoot = await mkdtemp(path.join(tmpdir(), "fysen-matlyst-v3-"));
const compiled = new Map();

after(async () => {
  await rm(compiledRoot, { recursive: true, force: true });
});

function outputPath(sourcePath) {
  return sourcePath.replace(/\.(?:ts|tsx)$/u, ".js");
}

async function resolveRelativeSource(importerPath, specifier) {
  const base = path.normalize(path.join(path.dirname(importerPath), specifier));
  const candidates = [base, `${base}.ts`, `${base}.tsx`, path.join(base, "index.ts"), path.join(base, "index.tsx")];
  for (const candidate of candidates) {
    try {
      await readFile(path.join(webRoot, candidate), "utf8");
      return candidate;
    } catch {
      // Try the next supported local source shape.
    }
  }
  throw new Error(`Could not resolve ${specifier} from ${importerPath}`);
}

async function compileLocalModule(relativeSourcePath) {
  const normalizedSourcePath = path.normalize(relativeSourcePath);
  if (compiled.has(normalizedSourcePath)) return compiled.get(normalizedSourcePath);

  const source = await readFile(path.join(webRoot, normalizedSourcePath), "utf8");
  let javascript = ts.transpileModule(source, {
    compilerOptions: {
      jsx: ts.JsxEmit.ReactJSX,
      module: ts.ModuleKind.ES2022,
      target: ts.ScriptTarget.ES2022,
    },
    fileName: normalizedSourcePath,
  }).outputText;

  const importSpecifiers = [...source.matchAll(/(?:from\s+|import\s*)["'](\.\.?\/[^"']+)["']/gu)].map((match) => match[1]);
  const sourceOutputPath = outputPath(normalizedSourcePath);

  for (const specifier of new Set(importSpecifiers)) {
    const dependencySourcePath = await resolveRelativeSource(normalizedSourcePath, specifier);
    await compileLocalModule(dependencySourcePath);
    const dependencyOutputPath = outputPath(dependencySourcePath);
    let rewrittenSpecifier = path.relative(path.dirname(sourceOutputPath), dependencyOutputPath).replaceAll(path.sep, "/");
    if (!rewrittenSpecifier.startsWith(".")) rewrittenSpecifier = `./${rewrittenSpecifier}`;
    javascript = javascript
      .replaceAll(`"${specifier}"`, `"${rewrittenSpecifier}"`)
      .replaceAll(`'${specifier}'`, `'${rewrittenSpecifier}'`);
  }

  const destination = path.join(compiledRoot, sourceOutputPath);
  await mkdir(path.dirname(destination), { recursive: true });
  await writeFile(destination, javascript, "utf8");
  compiled.set(normalizedSourcePath, destination);
  return destination;
}

async function importSource(relativeSourcePath) {
  const destination = await compileLocalModule(relativeSourcePath);
  return import(pathToFileURL(destination).href);
}

const explorerData = await importSource("components/cuisine-explorer-data.ts");
const dishDiscovery = await importSource("lib/dish-discovery.ts");
const publicPath = await importSource("lib/public-path.ts");
const explorerSource = await readFile(path.join(webRoot, "components/cuisine-explorer.tsx"), "utf8");
const clientBrowseSource = await readFile(path.join(webRoot, "lib/client-dish-search.ts"), "utf8");
const previewSearchSource = await readFile(path.join(webRoot, "components/static-preview-search-page.tsx"), "utf8");

test("Matlyst viser en flat, entydig katalog over aktive kjøkken", () => {
  const activeNames = explorerData.cuisines.map((cuisine) => cuisine.name);
  assert.equal(activeNames.length, 19);
  assert.equal(new Set(activeNames).size, activeNames.length);
  assert.ok(activeNames.includes("Japansk"));
  assert.ok(activeNames.includes("Italiensk"));
  assert.ok(activeNames.includes("Egyptisk"));
  assert.ok(activeNames.includes("Levantinsk"));
});

test("Midtøsten kan ikke komme tilbake som et aggregert kjøkken", () => {
  assert.ok(!explorerData.cuisines.some((cuisine) => cuisine.name === "Midtøsten"));
});

test("Utforsk verden er flat og kommer før Hva frister", () => {
  const worldDirectory = explorerSource.indexOf('id="all-cuisines-title">Utforsk verden</h3>');
  const moodDirectory = explorerSource.indexOf('id="matlyst-mood-title">Velg etter lyst</h3>');
  assert.ok(worldDirectory >= 0, "mangler den flate Utforsk verden-katalogen");
  assert.ok(moodDirectory > worldDirectory, "Hva frister skal ligge under Utforsk verden");
  assert.doesNotMatch(explorerSource, /culinaryWorlds|selectedWorld|selectedCulinaryRegion/u);
});

test("Utforsk verden viser seks relevante kjøkken før brukeren åpner resten", () => {
  assert.deepEqual(explorerData.featuredCuisineNames, [
    "Italiensk",
    "Japansk",
    "Tyrkisk",
    "Indisk",
    "Kinesisk",
    "Thai",
  ]);
  assert.match(explorerSource, /const COLLAPSED_CUISINE_COUNT = 6/u);
  assert.match(explorerSource, /filteredCuisines\.slice\(0, COLLAPSED_CUISINE_COUNT\)/u);
  assert.match(explorerSource, /aria-expanded=\{isCuisineDirectoryExpanded\}/u);
  assert.match(explorerSource, /Vis alle kjøkken/u);
  assert.match(explorerSource, /Vis færre kjøkken/u);
});

test("Utforsk verden viser ferskt restaurantbevis også i Pages-preview", () => {
  assert.match(explorerSource, /På menyen nå/u);
  assert.match(explorerSource, /restaurantExamples/u);
  assert.match(explorerSource, /browseDishesClient/u);
  assert.match(clientBrowseSource, /NEXT_PUBLIC_FYSEN_API_BASE_URL/u);
  assert.match(clientBrowseSource, /https:\/\/fysen-api\.vercel\.app/u);
  assert.match(clientBrowseSource, /configuredBasePath \? defaultPreviewApiBaseUrl/u);
  assert.match(previewSearchSource, /browseDishesClient/u);
  assert.match(previewSearchSource, /clientPreviewApiBaseUrl/u);
  assert.doesNotMatch(previewSearchSource, /const previewApiBaseUrl/u);
  assert.doesNotMatch(previewSearchSource, /function previewBrowseUrl/u);
  assert.match(explorerSource, /Kunne ikke hente ferske restauranttreff akkurat nå/u);

  const coverage = dishDiscovery.discoveryCoverage(
    [
      {
        id: "concept:ramen",
        name: "Ramen",
        query: "ramen",
        restaurantCount: 3,
        restaurantExamples: [
          { id: "00000000-0000-4000-8000-000000000001", name: "Ramen 1", address: "Testgata 1" },
          { id: "00000000-0000-4000-8000-000000000002", name: "Ramen 2", address: "Testgata 2" },
        ],
      },
    ],
    { label: "Ramen", query: "ramen", aliases: [] },
  );
  assert.equal(coverage.restaurantCount, 3);
  assert.deepEqual(coverage.restaurantExamples.map((restaurant) => restaurant.name), ["Ramen 1", "Ramen 2"]);
});

test("production-backed discovery-retter er tilgjengelige i Alle retter-scope", () => {
  const expected = [
    ["Nepalsk", "momo"],
    ["Polsk", "pierogi"],
    ["Etiopisk", "doro-wat"],
    ["Filippinsk", "sisig"],
  ];
  for (const [cuisineName, dishId] of expected) {
    const ids = explorerData.discoveryDishesForCuisine(cuisineName).map((entry) => entry.dish.id);
    assert.ok(ids.includes(dishId), `${cuisineName} mangler ${dishId}`);
  }
});

test("deep-link-helperen roundtripper et direkte kjøkkenvalg", () => {
  const href = publicPath.dishBrowseCuisineHref("Oslo", "Japansk");
  const url = new URL(href, "https://fysen.test");
  assert.equal(url.pathname, "/search");
  assert.equal(url.searchParams.get("city"), "Oslo");
  assert.equal(url.searchParams.get("cuisine"), "Japansk");
  assert.equal(url.searchParams.has("world"), false);
  assert.equal(url.searchParams.has("region"), false);
});
