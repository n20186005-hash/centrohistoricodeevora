// 单景点 SEO 实体绑定配置中心 — Centro Histórico de Évora
// 所有结构化的实体数据集中在此，避免散落硬编码。

export const LOCALES = ['pt', 'zh', 'en', 'mwl'] as const;

export type SiteLocale = (typeof LOCALES)[number];

export const localeMeta: Record<
  SiteLocale,
  { path: string; htmlLang: string; ogLocale: string; label: string }
> = {
  zh: { path: '/zh', htmlLang: 'zh-CN', ogLocale: 'zh_CN', label: '中文' },
  en: { path: '/en', htmlLang: 'en', ogLocale: 'en_US', label: 'English' },
  pt: { path: '/pt', htmlLang: 'pt', ogLocale: 'pt_PT', label: 'Português' },
  mwl: { path: '/mwl', htmlLang: 'mwl', ogLocale: 'mwl', label: 'Mirandês' },
};

export const DEFAULT_LOCALE: SiteLocale = 'pt';

// 域名单点解析：部署时可通过环境变量 CURRENT_SITE_DOMAIN 覆盖（不写死），
// 未设置时回退到默认正式域名。避免 canonical / hreflang / OG / JSON-LD 指向错误站点。
const DEFAULT_DOMAIN = 'centrohistoricodeevora.com';

function resolveBaseUrl(): string {
  const candidate =
    typeof window === 'undefined' && typeof process !== 'undefined' && process.env?.CURRENT_SITE_DOMAIN
      ? String(process.env.CURRENT_SITE_DOMAIN)
      : '';
  const clean = candidate.replace(/^https?:\/\//, '').replace(/\/+$/, '');
  return `https://${clean || DEFAULT_DOMAIN}`;
}

export const siteConfig = {
  name: 'Centro Histórico de Évora',
  domain: DEFAULT_DOMAIN,
  baseUrl: resolveBaseUrl(),
  // 归属层级：景点 → 城市 → 省/大区 → 国家
  city: 'Évora',
  region: 'Alentejo',
  country: 'Portugal',
  countryCode: 'PT',
  postalCode: '7000-661',
  address: 'Jardim Diana, 7000-661 Évora, Portugal',
  plusCode: 'H3CR+86',
  geo: { latitude: 38.570845, longitude: -7.909381 },
  rating: 4.5,
  reviewCount: 5781,
  mapsShareUrl: 'https://maps.app.goo.gl/KUS9V88exRzTsuz86',
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5548.291642710998!2d-7.9093811!3d38.57084499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd19e4dd9f6e5edd%3A0xa4bd2c4b85acf00b!2sCentro%20Hist%C3%B3rico%20de%20%C3%89vora!5e1!3m2!1szh-CN!2s!4v1788515739848!5m2!1szh-CN!2s',
  // 权威出站链接（政府/官方）
  cmEvoraUrl: 'https://www.cm-evora.pt/',
  unescoUrl: 'https://whc.unesco.org/en/list/361/',
  visitPortugalUrl: 'https://www.visitportugal.com/',
  // 首图
  heroImagePath: '/gallery/centro-historico-de-evora (1).jpg',
  gaId: 'G-HXM22WWPKP',
  lastUpdated: '2026-09-04',
} as const;

// 用于 OG / JSON-LD 的绝对图片 URL（文件名含空格，需 URL 编码）
export const heroImageUrl = `${siteConfig.baseUrl}/gallery/centro-historico-de-evora%20(1).jpg`;

export function localeHome(locale: string) {
  const meta = localeMeta[locale as SiteLocale];
  return meta ? `${siteConfig.baseUrl}${meta.path}` : siteConfig.baseUrl;
}
