'use client';

import { useTranslations, useLocale } from 'next-intl';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

const NAV_IDS = ['things-to-see', 'gallery', 'reviews', 'faq', 'map'] as const;

export default function Header({ solid = false }: { solid?: boolean }) {
  const t = useTranslations('header');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const base = `/${locale}`;
  const navLabelKey: Record<string, string> = {
    'things-to-see': 'thingsToSee',
    gallery: 'gallery',
    reviews: 'reviews',
    faq: 'faq',
    map: 'map',
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled || solid ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: scrolled || solid ? '1px solid var(--border-color)' : 'none',
        backdropFilter: scrolled || solid ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <a
          href={base}
          className="font-display text-lg font-semibold tracking-tight"
          style={{ color: scrolled || solid ? 'var(--text-primary)' : '#fff' }}
        >
          Centro Histórico de Évora
        </a>

        <nav className="hidden lg:flex items-center gap-6" aria-label={t('navigationLabel')}>
          {(locale === 'pt' || locale === 'en' || locale === 'zh' || locale === 'mwl') && <a href={`${base}/#patrimonio`} className="text-sm font-medium transition-colors" style={{ color: scrolled || solid ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}>{locale === 'zh' ? '周边景点' : locale === 'en' ? 'Explore' : locale === 'mwl' ? 'Património' : 'Património'}</a>}
          {NAV_IDS.map((id) => (
            <a
              key={id}
              href={`${base}/#${id}`}
              className="text-sm font-medium transition-colors"
              style={{
                color: scrolled || solid ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)',
              }}
            >
              {t(navLabelKey[id] as any)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LanguageToggle />
        </div>
      </div>
    </header>
  );
}
