/**
 * 图片压缩：public/gallery/*.jpg
 * - 自动按 EXIF 旋转
 * - Hero 首图最长边 1920，其余最长边 1600
 * - mozjpeg q80 渐进式，压缩后原地替换（保留文件名）
 * 运行：npm run optimize:images
 */
import { readdirSync, statSync, unlinkSync, renameSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const dir = join(process.cwd(), 'public', 'gallery');
const files = readdirSync(dir)
  .filter((f) => /\.jpg$/i.test(f))
  .sort((a, b) => {
    const na = parseInt(a.match(/(\d+)/)?.[1] ?? '0', 10);
    const nb = parseInt(b.match(/(\d+)/)?.[1] ?? '0', 10);
    return na - nb;
  });

let totalBefore = 0;
let totalAfter = 0;

for (const file of files) {
  const src = join(dir, file);
  const before = statSync(src).size;
  totalBefore += before;

  const isHero = /\(1\)\.jpg$/i.test(file);
  const maxWidth = isHero ? 1920 : 1600;

  const out = await sharp(src)
    .rotate() // apply EXIF orientation
    .resize({ width: maxWidth, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true, chromaSubsampling: '4:2:0' })
    .toBuffer();

  const tmp = `${src}.tmp`;
  await sharp(out).toFile(tmp);
  unlinkSync(src);
  renameSync(tmp, src);

  const after = statSync(src).size;
  totalAfter += after;
  console.log(
    `${file.padEnd(45)} ${(before / 1024).toFixed(0).padStart(6)}KB -> ${(after / 1024).toFixed(0).padStart(5)}KB  (${isHero ? '1920px' : '1600px'})`
  );
}

console.log('-----------------------------');
console.log(
  `TOTAL ${(totalBefore / 1024 / 1024).toFixed(1)}MB -> ${(totalAfter / 1024 / 1024).toFixed(1)}MB  (-${Math.round(
    (1 - totalAfter / totalBefore) * 100
  )}%)`
);
