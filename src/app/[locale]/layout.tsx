import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import type { Metadata, Viewport } from 'next';
import {
  siteConfig,
  heroImageUrl,
  localeHome,
  localeMeta,
} from '@/config';

const ogLocaleMap: Record<string, string> = {
  zh: 'zh_CN',
  en: 'en_US',
  pt: 'pt_PT',
  mwl: 'mwl',
};

const inLangMap: Record<string, string> = {
  zh: 'zh-CN',
  en: 'en',
  pt: 'pt',
  mwl: 'mwl',
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const messages = (await import(`@/messages/${locale}.json`)).default;

  const selfUrl = localeHome(locale);
  const zhUrl = localeHome('zh');
  const enUrl = localeHome('en');
  const ptUrl = localeHome('pt');
  const mwlUrl = localeHome('mwl');

  return {
    title: messages.meta.title,
    description: messages.meta.description,
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
    openGraph: {
      title: messages.meta.title,
      description: messages.meta.description,
      url: selfUrl,
      siteName: 'Centro Histórico de Évora',
      locale: ogLocaleMap[locale] || 'zh_CN',
      type: 'website',
      images: [
        {
          url: heroImageUrl,
          width: 1600,
          height: 1200,
          alt: messages.hero.imgAlt || 'Centro Histórico de Évora',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.meta.title,
      description: messages.meta.description,
      images: [heroImageUrl],
    },
  };
}

export const viewport: Viewport = {
  themeColor: '#3a7a8d',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  const htmlLang = localeMeta[locale as keyof typeof localeMeta]?.htmlLang || 'zh-CN';
  const selfUrl = localeHome(locale);
  const baseUrl = siteConfig.baseUrl;
  const inLanguage = inLangMap[locale] || 'zh-CN';

  // 描述/评分等本地化数据（供 JSON-LD 使用）
  const meta = messages.meta as { title: string; description: string };
  const reviewCount = siteConfig.reviewCount;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baseUrl}/#organization`,
        name: 'Centro Histórico de Évora Visitor Guide',
        url: baseUrl,
        logo: {
          '@type': 'ImageObject',
          url: `${baseUrl}/icons/icon.svg`,
        },
      },
      {
        '@type': 'WebSite',
        '@id': `${baseUrl}/#website`,
        url: baseUrl,
        name: meta.title,
        description: meta.description,
        publisher: { '@id': `${baseUrl}/#organization` },
        inLanguage: inLanguage,
      },
      {
        '@type': 'WebPage',
        '@id': `${selfUrl}/#webpage`,
        url: selfUrl,
        name: meta.title,
        description: meta.description,
        isPartOf: { '@id': `${baseUrl}/#website` },
        about: { '@id': `${baseUrl}/#attraction` },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: heroImageUrl,
        },
        dateModified: siteConfig.lastUpdated,
        inLanguage: inLanguage,
      },
      {
        '@type': 'TouristAttraction',
        '@id': `${baseUrl}/#attraction`,
        name: 'Centro Histórico de Évora',
        alternateName: [
          'Historic Centre of Évora',
          'Évora Historic Centre',
          'Centro Histórico de Évora (Évora)',
        ],
        description: meta.description,
        url: selfUrl,
        image: [heroImageUrl],
        isAccessibleForFree: true,
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jardim Diana',
          addressLocality: 'Évora',
          addressRegion: 'Alentejo',
          postalCode: siteConfig.postalCode,
          addressCountry: 'PT',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: siteConfig.geo.latitude,
          longitude: siteConfig.geo.longitude,
        },
        hasMap: siteConfig.mapsShareUrl,
        plusCode: siteConfig.plusCode,
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: [
              'Monday',
              'Tuesday',
              'Wednesday',
              'Thursday',
              'Friday',
              'Saturday',
              'Sunday',
            ],
            opens: '00:00',
            closes: '23:59',
          },
        ],
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: siteConfig.rating,
          reviewCount,
          bestRating: 5,
        },
        sameAs: [
          siteConfig.mapsShareUrl,
          siteConfig.cmEvoraUrl,
          siteConfig.unescoUrl,
          siteConfig.visitPortugalUrl,
        ],
      },
    ],
  };

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#3a7a8d" />
        <link rel="manifest" href="/manifest.webmanifest" />
        <link rel="icon" href="/icons/icon.svg" type="image/svg+xml" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark') {
                    document.documentElement.setAttribute('data-theme', 'dark');
                  }
                } catch(e) {}
              })();
            `,
          }}
        />
        {/* GA4 (consent-gated) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function readPrefs() {
                  try {
                    var p = localStorage.getItem('cookiePrefs');
                    return p ? JSON.parse(p) : null;
                  } catch (e) { return null; }
                }
                var loaded = false;
                function loadGtag() {
                  if (loaded) return;
                  loaded = true;
                  var s = document.createElement('script');
                  s.async = true;
                  s.src = 'https://www.googletagmanager.com/gtag/js?id=${siteConfig.gaId}';
                  document.head.appendChild(s);
                  window.dataLayer = window.dataLayer || [];
                  function gtag() { window.dataLayer.push(arguments); }
                  window.gtag = gtag;
                  gtag('js', new Date());
                  gtag('config', '${siteConfig.gaId}', { anonymize_ip: true });
                }
                function check() {
                  var p = readPrefs();
                  if (p && p.analytics) loadGtag();
                }
                window.addEventListener('consent-updated', check);
                check();
              })();
            `,
          }}
        />
        {/* Service Worker registration (PWA) */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                if ('serviceWorker' in navigator) {
                  window.addEventListener('load', function() {
                    navigator.serviceWorker.register('/sw.js').catch(function(err) {
                      console.warn('SW registration failed:', err);
                    });
                  });
                }
              })();
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
