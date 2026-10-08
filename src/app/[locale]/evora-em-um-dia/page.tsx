import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { siteConfig } from '@/config';
import Header from '@/components/Header';
import RouteSection from '@/components/RouteSection';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

const PATH = '/pt/evora-em-um-dia';

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
  const t = await getTranslations({ locale, namespace: 'guideEvoraUmDia' });
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

export default async function EvoraEmUmDiaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (locale !== 'pt') notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: 'guideEvoraUmDia' });

  const blocks: { title: string; text: string }[] = [
    { title: t('morningTitle'), text: t('morningText') },
    { title: t('afternoonTitle'), text: t('afternoonText') },
    { title: t('eveningTitle'), text: t('eveningText') },
  ];

  return (
    <>
      <Header />
      <main>
        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
              {t('h1')}
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('intro')}
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: 'var(--bg-secondary)' }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6 space-y-8">
            {blocks.map((b) => (
              <div
                key={b.title}
                className="rounded-2xl p-6"
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                }}
              >
                <h2 className="text-2xl font-semibold mb-2">{b.title}</h2>
                <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {b.text}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="section-padding" style={{ background: 'var(--bg-primary)' }}>
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <h2 className="text-3xl font-bold mb-3">{t('tipsTitle')}</h2>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {t('tipsText')}
            </p>
          </div>
        </section>

        <RouteSection />
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
