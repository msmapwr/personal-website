import { gzipSync } from "node:zlib";
import { readFileSync, readdirSync } from "node:fs";
import { join, relative } from "node:path";

function filesUnder(directory) {
  try {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
      const path = join(directory, entry.name);
      return entry.isDirectory() ? filesUnder(path) : [path];
    });
  } catch {
    return [];
  }
}

function reportGroup(label, files) {
  const rows = files
    .map((path) => {
      const buffer = readFileSync(path);
      return {
        path: relative(process.cwd(), path),
        bytes: buffer.length,
        gzipBytes: gzipSync(buffer).length,
      };
    })
    .sort((a, b) => b.bytes - a.bytes);
  const total = rows.reduce((sum, row) => sum + row.bytes, 0);
  const gzipTotal = rows.reduce((sum, row) => sum + row.gzipBytes, 0);

  console.log(`\n${label}`);
  console.log(`总大小: ${(total / 1024).toFixed(1)} KiB | gzip 估算: ${(gzipTotal / 1024).toFixed(1)} KiB`);
  for (const row of rows.slice(0, 8)) {
    console.log(`- ${row.path}: ${(row.bytes / 1024).toFixed(1)} KiB (gzip ${(row.gzipBytes / 1024).toFixed(1)} KiB)`);
  }
}

const distAssets = filesUnder(join(process.cwd(), "dist", "assets"));
const publicImages = filesUnder(join(process.cwd(), "public", "images"));

if (distAssets.length === 0) {
  throw new Error("未找到 dist/assets，请先运行 npm run build");
}

reportGroup("构建资源", distAssets);
reportGroup("图片资源", publicImages);
