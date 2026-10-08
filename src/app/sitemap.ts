import { MetadataRoute } from 'next';
import { siteConfig, localeHome, LOCALES } from '@/config';

export const dynamic = 'force-static';

const ROUTES = ['', '/privacy-policy', '/terms-of-service', '/cookie-settings'];

// 葡语专属攻略页（仅 pt 语言版本）
const PT_GUIDE_ROUTES = ['/o-que-visitar-em-evora', '/evora-em-um-dia'];

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
    const url = localeHome('pt') + route;
    sitemap.push({
      url,
      lastModified: new Date(siteConfig.lastUpdated),
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          pt: url,
          'x-default': url,
        } as Record<string, string>,
      },
    });
  }

  return sitemap;
}
