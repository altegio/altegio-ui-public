import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { transform } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIST_ROOT = path.resolve(__dirname, '..', 'dist', 'web', 'angular');

async function* walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(fullPath);
    } else {
      yield fullPath;
    }
  }
}

async function minifyFile(filePath) {
  const code = await fs.readFile(filePath, 'utf8');
  const result = await transform(code, {
    minify: true,
    format: 'esm',
    target: 'es2022',
    legalComments: 'none',
    charset: 'utf8',
  });
  
  await fs.writeFile(filePath, result.code, 'utf8');
}

async function main() {
  try {
    await fs.access(DIST_ROOT);
  } catch {
    console.error(`[minify-ng-dist] Directory not found: ${DIST_ROOT}. Run the ng-packagr build first.`);
    process.exit(1);
  }

  const filesToMinify = [];
  for await (const file of walk(DIST_ROOT)) {
    if (file.endsWith('.mjs')) {
      filesToMinify.push(file);
    }
  }

  if (filesToMinify.length === 0) {
    console.log('[minify-ng-dist] No .mjs files found; nothing to minify.');
    return;
  }

  console.log(`[minify-ng-dist] Files to minify: ${filesToMinify.length}`);

  // Ограничим одновременную обработку, чтобы не съесть всю память
  const CONCURRENCY = 8;
  let index = 0;

  async function runBatch() {
    while (index < filesToMinify.length) {
      const start = index;
      const end = Math.min(start + CONCURRENCY, filesToMinify.length);
      index = end;
      const batch = filesToMinify.slice(start, end).map((f) => minifyFile(f));
      await Promise.all(batch);
    }
  }

  await runBatch();

  console.log('[minify-ng-dist] Minification completed.');
}

main().catch((err) => {
  console.error('[minify-ng-dist] Error:', err);
  process.exit(1);
});

