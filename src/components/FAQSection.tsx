import { useMessages, useTranslations } from 'next-intl';

interface FaqItem {
  q: string;
  a: string;
}

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .trim();
}

export default function FAQSection() {
  const t = useTranslations('faq');
  const messages = useMessages() as { faq?: { items?: FaqItem[] } };
  const items = messages?.faq?.items ?? [];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripHtml(item.a),
      },
    })),
  };

  return (
    <>
      <section
        id="faq"
        className="section-padding"
        style={{ background: 'var(--bg-secondary)' }}
      >
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold mb-3">{t('title')}</h2>
          <p className="text-base mb-8" style={{ color: 'var(--text-muted)' }}>
            {t('subtitle')}
          </p>
          <div>
            {items.map((item, i) => (
              <details
                key={i}
                className="mb-3"
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  borderRadius: '0.9rem',
                  overflow: 'hidden',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <summary
                  className="cursor-pointer text-base font-semibold px-5 py-4 list-none flex items-center justify-between gap-4 select-none"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <span>{item.q}</span>
                  <span aria-hidden="true" className="text-lg" style={{ color: 'var(--accent)' }}>
                    +
                  </span>
                </summary>
                <div
                  className="px-5 pb-5 text-sm leading-relaxed"
                  style={{ color: 'var(--text-muted)' }}
                  dangerouslySetInnerHTML={{ __html: item.a }}
                />
              </details>
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
