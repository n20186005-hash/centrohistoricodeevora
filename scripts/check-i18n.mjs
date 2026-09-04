/**
 * 四语言 i18n parity 校验（zh / en / pt / mwl）
 * - 校验所有叶子 key 路径、对象/数组结构完全一致（不比较译文内容）。
 * - 校验常见内容列表的长度一致（facilities / stories / faq / thingsToSee / sources 等）。
 * - 扫描 messages 内是否残留其他站点/旧模板信息（mojibake 防护）。
 * 运行：node scripts/check-i18n.mjs
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dir = join(__dirname, '..', 'src', 'messages');
const FILES = ['zh', 'en', 'pt', 'mwl'];

function load(locale) {
  return JSON.parse(readFileSync(join(dir, `${locale}.json`), 'utf8'));
}

/** 结构签名：路径排序 + 类型；数组带长度与元素形态 */
function signature(value, path, out) {
  if (Array.isArray(value)) {
    out.push(`${path}[]:${value.length}`);
    if (value.length > 0) {
      const head = value[0];
      if (head && typeof head === 'object') {
        const firstKeys = Object.keys(head).sort().join(',');
        out.push(`${path}[0]keys:{${firstKeys}}`);
        signature(head, `${path}[0]`, out);
        // 校验其余元素与首元素同构（只比 key 集）
        for (let i = 1; i < value.length; i++) {
          const k = Object.keys(value[i]).sort().join(',');
          if (k !== firstKeys) throw new Error(`[${path}] element ${i} keys differ: ${k} vs ${firstKeys}`);
        }
      }
    }
    return;
  }
  if (value !== null && typeof value === 'object') {
    for (const key of Object.keys(value).sort()) {
      const child = value[key];
      out.push(`${path}.${key}:${Array.isArray(child) ? 'array' : typeof child}`);
      signature(child, `${path}.${key}`, out);
    }
    return;
  }
  out.push(`${path}:${typeof value}`);
}

/** 旧站点/模板残留扫描 */
const BANNED = /monsaraz|greatyarmouth|zh-Hant|ca-pub-|adsbygoogle|placeholder\.com|thekingsgarden/i;

function collect(locale) {
  const out = [];
  signature(load(locale), '', out);
  return out;
}

let fail = 0;
const ref = collect(FILES[0]);
for (const locale of FILES.slice(1)) {
  const other = collect(locale);
  const a = new Set(ref);
  const b = new Set(other);
  const missing = [...b].filter((x) => !a.has(x));
  const extra = [...a].filter((x) => !b.has(x));
  if (missing.length || extra.length) {
    fail = 1;
    console.error(`[${locale}] STRUCTURE MISMATCH`);
    if (missing.length) console.error('  missing in zh:', missing);
    if (extra.length) console.error('  extra in zh :', extra);
  }
}

for (const locale of FILES) {
  const text = JSON.stringify(load(locale));
  if (BANNED.test(text)) {
    fail = 1;
    console.error(`[${locale}] BANNED CONTENT FOUND`);
  }
}

console.log(fail ? 'FAIL' : `PARITY OK — ${FILES.length} files, ${ref.length} structural tokens`);
process.exit(fail);
