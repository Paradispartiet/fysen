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

const taxonomy = await importSource("components/culinary-taxonomy.ts");
const explorerData = await importSource("components/cuisine-explorer-data.ts");
const publicPath = await importSource("lib/public-path.ts");

function world(id) {
  return taxonomy.culinaryWorlds.find((candidate) => candidate.id === id);
}

function region(worldId, regionId) {
  return world(worldId)?.regions.find((candidate) => candidate.id === regionId);
}

function cuisineLink(worldId, regionId, cuisineName) {
  return region(worldId, regionId)?.cuisines.find((candidate) => candidate.name === cuisineName);
}

test("Matlyst v3 låser sentrale verdensdel → region → kjøkken-stier", () => {
  assert.equal(cuisineLink("asia", "east-asia", "Japansk")?.cuisine?.name, "Japansk");
  assert.equal(cuisineLink("europe", "southern-europe", "Italiensk")?.cuisine?.name, "Italiensk");
  assert.equal(cuisineLink("africa", "north-africa", "Egyptisk")?.cuisine?.name, "Egyptisk");
  assert.equal(cuisineLink("asia", "west-asia", "Levantinsk")?.cuisine?.name, "Levantinsk");
});

test("Iberia beholder Spansk og Portugisisk som definerte, men ikke falskt aktive kjøkken", () => {
  const iberia = region("europe", "iberia");
  assert.ok(iberia);
  assert.deepEqual(iberia.cuisines.map((entry) => entry.name), ["Spansk", "Portugisisk"]);
  assert.ok(iberia.cuisines.every((entry) => entry.cuisine === null));
});

test("hvert aktivt kjøkken finnes nøyaktig én gang i taksonomien", () => {
  const activeLinks = taxonomy.culinaryWorlds.flatMap((entry) =>
    entry.regions.flatMap((culinaryRegion) => culinaryRegion.cuisines.filter((link) => link.cuisine)),
  );
  const activeNames = activeLinks.map((entry) => entry.name);
  assert.equal(new Set(activeNames).size, activeNames.length);
  assert.deepEqual(
    [...activeNames].sort((left, right) => left.localeCompare(right, "nb")),
    explorerData.cuisines.map((cuisine) => cuisine.name).sort((left, right) => left.localeCompare(right, "nb")),
  );
});

test("Midtøsten kan ikke komme tilbake som både region og kjøkken", () => {
  assert.ok(!explorerData.cuisines.some((cuisine) => cuisine.name === "Midtøsten"));
  assert.ok(!taxonomy.culinaryWorlds.some((entry) =>
    entry.regions.some((culinaryRegion) =>
      culinaryRegion.name === "Midtøsten" || culinaryRegion.cuisines.some((link) => link.name === "Midtøsten"),
    ),
  ));
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

test("deep-link-helperen roundtripper world, region og cuisine", () => {
  const href = publicPath.dishBrowseTaxonomyHref("Oslo", {
    worldId: "asia",
    regionId: "east-asia",
    cuisineName: "Japansk",
  });
  const url = new URL(href, "https://fysen.test");
  assert.equal(url.pathname, "/search");
  assert.equal(url.searchParams.get("city"), "Oslo");
  assert.equal(url.searchParams.get("world"), "asia");
  assert.equal(url.searchParams.get("region"), "east-asia");
  assert.equal(url.searchParams.get("cuisine"), "Japansk");
});

test("ugyldige deep-link-kombinasjoner nedgraderes trygt", () => {
  const valid = taxonomy.resolveActiveCuisineTaxonomySelection("asia", "east-asia", "Japansk");
  assert.equal(valid.world?.name, "Asia");
  assert.equal(valid.region?.name, "Øst-Asia");
  assert.equal(valid.cuisine?.name, "Japansk");

  const wrongRegion = taxonomy.resolveActiveCuisineTaxonomySelection("asia", "iberia", "Spansk");
  assert.equal(wrongRegion.world?.name, "Asia");
  assert.equal(wrongRegion.region, null);
  assert.equal(wrongRegion.cuisine, null);

  const inactiveCuisine = taxonomy.resolveActiveCuisineTaxonomySelection("europe", "iberia", "Spansk");
  assert.equal(inactiveCuisine.world?.name, "Europa");
  assert.equal(inactiveCuisine.region, null);
  assert.equal(inactiveCuisine.cuisine, null);

  const unknownWorld = taxonomy.resolveActiveCuisineTaxonomySelection("atlantis", "east-asia", "Japansk");
  assert.equal(unknownWorld.world, null);
  assert.equal(unknownWorld.region, null);
  assert.equal(unknownWorld.cuisine, null);
});
