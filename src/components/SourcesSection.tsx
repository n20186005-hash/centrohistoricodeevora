import { useMessages, useTranslations } from 'next-intl';

interface Source {
  name: string;
  url: string;
}

export default function SourcesSection() {
  const t = useTranslations('sources');
  const messages = useMessages() as { sources?: { items?: Source[] } };
  const items = messages?.sources?.items ?? [];

  return (
    <section id="sources" className="section-padding">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-3">{t('title')}</h2>
        <p className="text-base mb-8 max-w-3xl" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => {
            let host = item.url;
            try {
              host = new URL(item.url).hostname.replace(/^www\./, '');
            } catch {
              /* keep raw url */
            }
            return (
              <a
                key={item.url + item.name}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-2xl p-5 hover:opacity-90 transition"
                style={{
                  background: 'var(--card-bg, #ffffff)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}
              >
                <div className="text-sm font-semibold mb-1">{item.name}</div>
                <div className="text-xs break-all" style={{ color: 'var(--accent)' }}>
                  {host}
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
