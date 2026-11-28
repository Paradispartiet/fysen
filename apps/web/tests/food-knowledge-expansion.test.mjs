import assert from "node:assert/strict";
import { mkdtemp, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import test, { after } from "node:test";
import { URL, fileURLToPath, pathToFileURL } from "node:url";
import ts from "typescript";

const webRoot = path.resolve(fileURLToPath(new URL("..", import.meta.url)));
const compiledRoot = await mkdtemp(path.join(tmpdir(), "fysen-food-knowledge-"));
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


const knowledge = await importSource("content/food-knowledge/index.ts");
const publicPath = await importSource("lib/public-path.ts");
const learning = await importSource("components/dish-learning-data.ts");
const discovery = await importSource("content/food-knowledge/matlyst-discovery-catalog.ts");
const learningSource = await readFile(path.join(webRoot, "components/dish-learning-section.tsx"), "utf8");
const gallerySource = await readFile(path.join(webRoot, "components/dish-photo-gallery.tsx"), "utf8");

test("The expanded encyclopedia has at least 200 complete, uniquely registered articles", () => {
  const dishes = knowledge.foodKnowledgeDishes;
  assert.ok(dishes.length >= 200);
  assert.equal(dishes.length, new Set(dishes.map(dish => dish.id)).size);
  assert.equal(dishes.length, knowledge.foodKnowledgeArticles.length);
  assert.equal(dishes.length, knowledge.foodKnowledgeDishIds.length);
  for (const dish of dishes) {
    assert.equal(typeof dish.region, "string", dish.id);
    for (const key of ["name", "region", "cuisine", "summary", "overview", "history", "flavor", "technique"]) {
      assert.ok(typeof dish[key] === "string" && dish[key].trim(), dish.id + ": " + key);
    }
    for (const items of [dish.essentials, dish.recipe.ingredients, dish.recipe.steps, dish.variants, dish.serving, dish.commonMistakes]) {
      assert.ok(Array.isArray(items) && items.length > 0 && items.every(item => typeof item === "string" && item.trim()), dish.id);
    }
    for (const related of dish.relatedDishIds) assert.ok(knowledge.getFoodDish(related));
    for (const source of dish.sources) {
      assert.ok(source.label.trim(), dish.id);
      assert.equal(new URL(source.href).protocol, "https:", dish.id);
    }
  }
});

test("Every article links to a valid dish search and resolves back to itself", () => {
  for (const dish of knowledge.foodKnowledgeDishes) {
    const url = new URL(publicPath.dishSearchHref(dish.query), "https://example.com");
    assert.ok(url.pathname.endsWith("/search"), dish.id);
    assert.equal(url.searchParams.get("city"), "Oslo", dish.id);
    assert.equal(url.searchParams.get("q"), dish.query, dish.id);
    assert.ok(dish.query.length >= 2 && dish.query.length <= 80, dish.id);
    assert.equal(knowledge.findFoodDishByQuery(url.searchParams.get("q"))?.id, dish.id);
    assert.equal(knowledge.getFoodKnowledgeDish(dish.id)?.summary, dish.summary);
  }
});

test("Existing discovery IDs remain unique and ambiguous Shiro is not mislabeled", () => {
  const entries = discovery.matlystDiscoveryCatalog;
  assert.equal(entries.length, new Set(entries.map(dish => dish.id)).size);
  assert.notEqual(knowledge.findFoodDishByQuery("Shiro")?.id, "shiro");
  assert.equal(knowledge.findFoodDishByQuery("shiro w salad")?.id, "shiro");
  assert.equal(knowledge.findFoodDishByQuery("shiro v")?.id, "shiro");
});

test("Homepage exposes all articles, explicit menu links and updated copy", () => {
  assert.equal(learning.learningDishes.length, knowledge.foodKnowledgeDishes.length);
  assert.equal(learning.featuredLearningDishCount, 18);
  assert.ok(learningSource.includes("Vis alle ${learningDishes.length} retter"));
  assert.ok(learningSource.includes("dishSearchHref(dish.query)"));
  assert.ok(learningSource.includes("Se menytreff"));
  assert.ok(gallerySource.includes("Til inspirasjon"));
  assert.ok(!gallerySource.includes("Litt inspirasjon"));
  assert.ok(!gallerySource.includes("Oppdag retter i ditt eget tempo"));
});
