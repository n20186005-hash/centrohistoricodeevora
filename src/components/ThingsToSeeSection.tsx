import { useMessages, useTranslations } from 'next-intl';

interface Item {
  id?: string;
  name: string;
  desc: string;
}

export default function ThingsToSeeSection() {
  const t = useTranslations('thingsToSee');
  const messages = useMessages() as { thingsToSee?: { items?: Item[] } };
  const items = messages?.thingsToSee?.items ?? [];

  return (
    <section
      id="things-to-see"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold mb-3">{t('title')}</h2>
        <p className="text-base mb-8 max-w-3xl" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="grid md:grid-cols-2 gap-5">
          {items.map((item, i) => (
            <div
              key={item.id || i}
              id={item.id}
              className="rounded-2xl p-6"
              style={{
                background: 'var(--card-bg, #ffffff)',
                boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
                scrollMarginTop: '5rem',
              }}
            >
              <div
                className="text-sm font-bold mb-3 inline-flex items-center justify-center w-8 h-8 rounded-full"
                style={{ background: 'var(--accent)', color: '#ffffff' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
