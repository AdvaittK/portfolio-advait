const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT_DIR = path.join(__dirname, '..', 'public');
const SKIP = new Set(['new_homepage.png']);
const INPUT_EXTS = new Set(['.png', '.jpg', '.jpeg']);

function isConvertible(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!INPUT_EXTS.has(ext)) return false;
  const base = path.basename(filePath);
  if (SKIP.has(base)) return false;
  return true;
}

async function convertFile(filePath) {
  const dir = path.dirname(filePath);
  const base = path.basename(filePath, path.extname(filePath));
  const outPath = path.join(dir, `${base}.webp`);

  try {
    await sharp(filePath)
      .webp({ quality: 85 })
      .toFile(outPath);
    console.log(`Converted -> ${path.relative(ROOT_DIR, outPath)}`);
  } catch (error) {
    console.error(`Failed -> ${filePath}:`, error.message);
  }
}

async function walk(dir) {
  const entries = await fs.promises.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      await walk(fullPath);
    } else if (isConvertible(fullPath)) {
      await convertFile(fullPath);
    }
  }
}

async function main() {
  await walk(ROOT_DIR);
  console.log('WebP conversion complete (skip list respected).');
}

main().catch((err) => {
  console.error('Unexpected error during conversion:', err);
  process.exit(1);
});
