import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config';
import Header from '@/components/Header';
import ThingsToSeeSection from '@/components/ThingsToSeeSection';
import RouteSection from '@/components/RouteSection';
import FAQSection from '@/components/FAQSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

const SLUG = 'o-que-visitar-em-evora';
const LOCALES = ['pt', 'en', 'zh', 'mwl'] as const;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({locale}));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!LOCALES.includes(locale as (typeof LOCALES)[number])) return {};
  const t = await getTranslations({ locale, namespace: 'guideOQueVisitar' });
  const url = `${siteConfig.baseUrl}/${locale}/${SLUG}`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: { ...Object.fromEntries(LOCALES.map(lang => [lang === 'zh' ? 'zh-CN' : lang, `${siteConfig.baseUrl}/${lang}/${SLUG}`])), 'x-default': `${siteConfig.baseUrl}/pt/${SLUG}` } as Record<string, string>,
    },
  };
}

export default async function OQueVisitarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guideOQueVisitar' });

  return (
    <>
      <Header />
      <main>
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('h1')}
            </h1>
            <p className="text-lg leading-relaxed mb-2" style={{ color: 'var(--text-muted)' }}>
              {t('intro')}
            </p>
          </div>
        </section>

        <ThingsToSeeSection />

        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-3">{t('planTitle')}</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('planText')}
            </p>
          </div>
        </section>

        <RouteSection />
        <FAQSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
