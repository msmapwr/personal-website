import { readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const assetsDir = join(process.cwd(), "dist", "assets");
const maxBytes = 600 * 1024;
const warnBytes = 500 * 1024;
const assets = readdirSync(assetsDir)
  .filter((file) => /\.(js|css)$/.test(file))
  .map((file) => ({ file, bytes: statSync(join(assetsDir, file)).size }))
  .sort((a, b) => b.bytes - a.bytes);

if (assets.length === 0) {
  throw new Error("构建体积检查失败：dist/assets 中没有 JS 或 CSS 资源");
}

for (const asset of assets) {
  const size = `${(asset.bytes / 1024).toFixed(1)} KiB`;
  if (asset.bytes > maxBytes) {
    throw new Error(`构建体积超预算：${asset.file} 为 ${size}，上限为 600 KiB`);
  }
  if (asset.bytes > warnBytes) {
    console.warn(`构建体积提醒：${asset.file} 为 ${size}，接近 600 KiB 上限`);
  }
}

console.log(`构建体积检查通过：最大资源 ${assets[0].file} (${(assets[0].bytes / 1024).toFixed(1)} KiB)`);
