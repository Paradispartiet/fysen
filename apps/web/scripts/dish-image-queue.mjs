/* global process, console */
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL, URL } from "node:url";
import ts from "typescript";

const webRoot = fileURLToPath(new URL("../", import.meta.url));

function initializer(source, name) {
  const ast = ts.createSourceFile("input.tsx", source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  for (const statement of ast.statements) {
    if (!ts.isVariableStatement(statement)) continue;
    for (const declaration of statement.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== name || !declaration.initializer) continue;
      let node = declaration.initializer;
      while (ts.isAsExpression(node) || ts.isSatisfiesExpression(node) || ts.isParenthesizedExpression(node)) node = node.expression;
      return node;
    }
  }
  throw new Error("Missing declaration: " + name);
}
function property(node, key) {
  if (!ts.isObjectLiteralExpression(node)) throw new Error("Expected a literal catalog entry");
  const entry = node.properties.find(item => ts.isPropertyAssignment(item) &&
    (ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) && item.name.text === key);
  if (!entry || !ts.isStringLiteral(entry.initializer)) throw new Error("Expected literal property: " + key);
  return entry.initializer.text;
}
function array(source, name) {
  const node = initializer(source, name);
  if (!ts.isArrayLiteralExpression(node)) throw new Error("Expected array: " + name);
  return node.elements;
}
export function readRegistry(root = webRoot) {
  const read = relative => readFileSync(path.join(root, relative), "utf8");
  const catalog = array(read("content/food-knowledge/catalog.ts"), "foodDishCatalog")
    .map(node => Object.fromEntries(["id", "name", "cuisine", "region"].map(key => [key, property(node, key)])));
  const articles = array(read("content/food-knowledge/manifest.ts"), "foodKnowledgeDishIds").map(node => {
    if (!ts.isStringLiteral(node)) throw new Error("Nonliteral article ID");
    return node.text;
  });
  const aliasNode = initializer(read("components/dish-editorial-image.tsx"), "imageIdAliases");
  if (!ts.isObjectLiteralExpression(aliasNode)) throw new Error("Expected exact image aliases");
  const aliases = Object.fromEntries(aliasNode.properties.map(item => {
    if (!ts.isPropertyAssignment(item) || !(ts.isIdentifier(item.name) || ts.isStringLiteral(item.name)) || !ts.isStringLiteral(item.initializer)) throw new Error("Nonliteral image alias");
    return [item.name.text, item.initializer.text];
  }));
  const images = JSON.parse(read("public/dish-images/manifest.json")).images;
  return { catalog, articles, aliases, images };
}

export function buildImageQueue({ catalog, articles, aliases, images }, hasFile = () => true) {
  const unique = (values, label) => {
    if (new Set(values).size !== values.length) throw new Error("Duplicate " + label);
  };
  unique(catalog.map(dish => dish.id), "catalog ID");
  unique(articles, "article ID");
  unique(images.map(image => image.id), "image ID");
  const catalogById = new Map(catalog.map(dish => [dish.id, dish]));
  const articleSet = new Set(articles);
  for (const id of articles) if (!catalogById.has(id)) throw new Error("Unknown article ID: " + id);
  // Preserve the existing editorial component's exact-ID and explicit-alias semantics.
  // Never infer image coverage from restaurant menu names or query strings.
  const order = [...articles, ...catalog.filter(dish => !articleSet.has(dish.id)).map(dish => dish.id)];
  const rows = order.map(id => {
    const dish = catalogById.get(id);
    const exactId = Object.hasOwn(aliases, id) ? aliases[id] : id;
    const matches = images.filter(image => image.id === exactId || image.catalogId === exactId);
    if (matches.length > 1) throw new Error("Ambiguous editorial image for " + id);
    const image = matches[0];
    let status = "missing";
    if (image) {
      if (!image.atlas || !hasFile(image.atlas)) status = "broken";
      else if (image.largeViewEnabled === true) status = image.largeSource && hasFile(image.largeSource) ? "master" : "broken";
      else status = "thumbnail";
    }
    return { ...dish, article: articleSet.has(id), imageId: image?.id ?? null, status };
  });
  const summarize = list => ({
    total: list.length,
    master: list.filter(row => row.status === "master").length,
    thumbnail: list.filter(row => row.status === "thumbnail").length,
    missing: list.filter(row => row.status === "missing").length,
    broken: list.filter(row => row.status === "broken").length,
  });
  const priority = { broken: 0, thumbnail: 1, missing: 2 };
  const queue = rows.filter(row => row.status !== "master")
    .sort((a, b) => priority[a.status] - priority[b.status] || Number(b.article) - Number(a.article));
  return { catalog: summarize(rows), articles: summarize(rows.filter(row => row.article)), queue, rows };
}

export function readImageQueue(root = webRoot) {
  return buildImageQueue(readRegistry(root), filename =>
    typeof filename === "string" && /^[a-z0-9-]+\.avif$/u.test(filename) &&
    existsSync(path.join(root, "public/dish-images", filename)));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const report = readImageQueue();
  if (process.argv.includes("--json")) console.log(JSON.stringify(report, null, 2));
  else {
    console.log("Catalog:", report.catalog);
    console.log("Matleksikon:", report.articles);
    console.log("Production queue (not deployed):");
    for (const row of report.queue) console.log(row.status + "\t" + row.id + "\t" + row.name);
  }
  if (report.catalog.broken) process.exitCode = 1;
}
