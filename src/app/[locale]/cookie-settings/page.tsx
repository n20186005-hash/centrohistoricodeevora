import { setRequestLocale } from 'next-intl/server';
import type { Metadata } from 'next';
import { localeHome } from '@/config';
import CookieSettingsClient from './CookieSettingsClient';

const SEG = '/cookie-settings';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const selfUrl = localeHome(locale) + SEG;
  const zhUrl = localeHome('zh') + SEG;
  const enUrl = localeHome('en') + SEG;
  const ptUrl = localeHome('pt') + SEG;
  const mwlUrl = localeHome('mwl') + SEG;

  return {
    alternates: {
      canonical: selfUrl,
      languages: {
        'zh-CN': zhUrl,
        en: enUrl,
        pt: ptUrl,
        mwl: mwlUrl,
        'x-default': ptUrl,
      } as Record<string, string>,
    },
  };
}

export default async function CookiePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <CookieSettingsClient />;
}
