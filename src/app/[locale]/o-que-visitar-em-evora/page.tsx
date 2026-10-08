import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config';
import Header from '@/components/Header';
import ThingsToSeeSection from '@/components/ThingsToSeeSection';
import RouteSection from '@/components/RouteSection';
import FAQSection from '@/components/FAQSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

const PATH = '/pt/o-que-visitar-em-evora';

export function generateStaticParams() {
  return [{ locale: 'pt' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (locale !== 'pt') return {};
  const t = await getTranslations({ locale, namespace: 'guideOQueVisitar' });
  const url = `${siteConfig.baseUrl}${PATH}`;
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: url,
      languages: { pt: url, 'x-default': url } as Record<string, string>,
    },
  };
}

export default async function OQueVisitarPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'pt') notFound();
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
