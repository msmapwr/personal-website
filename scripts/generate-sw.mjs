import { readFileSync, writeFileSync } from "node:fs";

const { version } = JSON.parse(readFileSync("package.json", "utf8"));
const manifest = JSON.parse(readFileSync("dist/.vite/manifest.json", "utf8"));
const assets = new Set(["./", "./index.html", "./manifest.json"]);
const visited = new Set();

function include(key) {
  if (visited.has(key)) return;
  const chunk = manifest[key];
  if (!chunk) throw new Error(`Service Worker: missing build entry ${key}`);
  visited.add(key);
  assets.add(`./${chunk.file}`);
  for (const css of chunk.css ?? []) assets.add(`./${css}`);
  for (const dependency of chunk.imports ?? []) include(dependency);
}

include("index.html");
const home = Object.keys(manifest).find((key) => key.endsWith("/pages/Home.tsx"));
if (!home) throw new Error("Service Worker: missing home page chunk");
include(home);

const template = readFileSync("public/sw.js", "utf8");
const output = template
  .replace('"__SITE_VERSION__"', JSON.stringify(version))
  .replace(/const CORE_ASSETS = .*;/, `const CORE_ASSETS = ${JSON.stringify([...assets])};`);
writeFileSync("dist/sw.js", output);
console.log(`Service Worker ${version}: ${assets.size} startup resources precached; other routes cached on demand.`);
