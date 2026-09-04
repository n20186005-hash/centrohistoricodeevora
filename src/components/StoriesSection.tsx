import { useMessages, useTranslations } from 'next-intl';

interface Story {
  kind: string;
  title: string;
  content: string;
}

export default function StoriesSection() {
  const t = useTranslations('stories');
  const messages = useMessages() as {
    stories?: { kinds?: Record<string, string>; items?: Story[] };
  };
  const items = messages?.stories?.items ?? [];
  const kinds = messages?.stories?.kinds ?? {};

  return (
    <section id="stories" className="section-padding">
      <div className="mx-auto max-w-4xl">
        <h2
          className="font-display text-3xl sm:text-4xl font-semibold mb-3"
          style={{ color: 'var(--text-primary)' }}
        >
          {t('title')}
        </h2>
        <p className="mb-8 max-w-3xl text-base" style={{ color: 'var(--text-muted)' }}>
          {t('subtitle')}
        </p>
        <div className="w-12 h-0.5 mb-10" style={{ background: 'var(--accent)' }} />

        <div className="space-y-6">
          {items.map((story, i) => {
            const isLegend = story.kind === 'legend';
            return (
              <article
                key={i}
                className="rounded-2xl p-6 sm:p-8"
                style={{
                  background: 'var(--card-bg)',
                  boxShadow: 'var(--card-shadow)',
                  borderLeft: `4px solid ${isLegend ? '#c76b2a' : 'var(--accent)'}`,
                }}
              >
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      background: isLegend ? 'rgba(199,107,42,0.15)' : 'var(--tag-bg)',
                      color: isLegend ? '#a85520' : 'var(--tag-text)',
                    }}
                  >
                    {kinds[story.kind] || story.kind}
                  </span>
                  <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className="font-display text-xl font-semibold mb-3"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {story.title}
                </h3>
                <p className="text-sm sm:text-base leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {story.content}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
