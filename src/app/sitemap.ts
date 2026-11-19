import { MetadataRoute } from 'next';
import { siteConfig, localeHome, LOCALES } from '@/config';
import { heritagePlaces } from '@/data/heritage';

export const dynamic = 'force-static';

const ROUTES = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

// 葡语专属攻略页（仅 pt 语言版本）
const PT_GUIDE_ROUTES = ['/o-que-visitar-em-evora', '/evora-em-um-dia', ...heritagePlaces.map((place) => `/patrimonio/${place.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemap: MetadataRoute.Sitemap = [];

  for (const route of ROUTES) {
    const languages = {
      'zh-CN': localeHome('zh') + route,
      en: localeHome('en') + route,
      pt: localeHome('pt') + route,
      mwl: localeHome('mwl') + route,
      'x-default': localeHome('pt') + route,
    } as Record<string, string>;

    for (const locale of LOCALES) {
      sitemap.push({
        url: localeHome(locale) + route,
        lastModified: new Date(siteConfig.lastUpdated),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.5,
        alternates: { languages },
      });
    }
  }

  for (const route of PT_GUIDE_ROUTES) {
    const isHeritage = route.startsWith('/patrimonio/');
    const locales = isHeritage ? ['pt', 'en', 'zh'] : ['pt'];
    const languages = isHeritage ? { pt: localeHome('pt') + route, en: localeHome('en') + route, 'zh-CN': localeHome('zh') + route, 'x-default': localeHome('pt') + route } : { pt: localeHome('pt') + route, 'x-default': localeHome('pt') + route };
    for (const locale of locales) sitemap.push({ url: localeHome(locale) + route, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8, alternates: { languages } });
  }

  return sitemap;
}
