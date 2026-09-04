import { readFileSync, readdirSync } from 'node:fs';
const h = readFileSync('out/zh.html', 'utf8');
const count = (re) => (h.match(re) || []).length;
console.log('ld+json blocks          :', count(/application\/ld\+json/g));
console.log('FAQPage schema          :', count(/"@type":"FAQPage"/g));
console.log('Question schema count   :', count(/"@type":"Question"/g));
console.log('BreadcrumbList schema   :', count(/"@type":"BreadcrumbList"/g));
console.log('TouristAttraction schema:', count(/"@type":"TouristAttraction"/g));
console.log('AggregateRating schema  :', count(/"@type":"AggregateRating"/g));
const faqText = h.match(/<h2[^>]*id="faq"[^>]*>/g) || [];
console.log('visible section#faq h2  :', faqText.length);
console.log('details tags (FAQ 可见) :', count(/<details/g));

// GA4 同意门控键一致性
const client = readFileSync('src/app/[locale]/cookie-settings/CookieSettingsClient.tsx', 'utf8');
console.log('client stores cookiePrefs :', client.includes("'cookiePrefs'") || client.includes('"cookiePrefs"'));
console.log('client dispatch consent  :', client.includes("consent-updated"));
console.log('layout reads cookiePrefs :', readFileSync('src/app/[locale]/layout.tsx', 'utf8').includes("cookiePrefs"));
console.log('GA ID 全库唯一值        :', readFileSync('src/config.ts', 'utf8').includes('G-HXM22WWPKP'));
