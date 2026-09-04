import { useMessages, useTranslations } from 'next-intl';

interface Facility {
  id?: string;
  name: string;
  desc: string;
}

export default function FacilitiesSection() {
  const t = useTranslations('facilities');
  const messages = useMessages() as { facilities?: { items?: Facility[] } };
  const items = messages?.facilities?.items ?? [];

  return (
    <section
      id="facilities"
      className="section-padding"
      style={{ background: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-6xl">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-6 text-base" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {items.map((item, i) => (
            <div
              key={item.id || i}
              className="rounded-2xl p-5"
              style={{ background: 'var(--card-bg)', boxShadow: 'var(--card-shadow)' }}
            >
              <div
                className="text-xs font-bold mb-3 inline-flex items-center justify-center w-8 h-8 rounded-full"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>
              <h3 className="text-base font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
                {item.name}
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 text-xs leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {t('note')}
        </p>
      </div>
    </section>
  );
}
