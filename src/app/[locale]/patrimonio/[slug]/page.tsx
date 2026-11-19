import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { heritagePlaces } from '@/data/heritage';
import { siteConfig } from '@/config';

export function generateStaticParams() {
  return heritagePlaces.map((place) => ({ locale: 'pt', slug: place.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{locale: string; slug: string}> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = heritagePlaces.find((item) => item.slug === slug);
  if (locale !== 'pt' || !place) return {};
  const canonical = `${siteConfig.baseUrl}/pt/patrimonio/${place.slug}`;
  return {
    title: `${place.name} | História, visita e mapa em Évora`,
    description: `${place.subtitle}. História, arquitetura, percurso a pé, informações práticas e localização de ${place.name}.`,
    alternates: { canonical, languages: { pt: canonical, 'x-default': canonical } },
    openGraph: { title: place.name, description: place.introduction, url: canonical, locale: 'pt_PT', type: 'article' },
  };
}

export default async function HeritagePage({ params }: { params: Promise<{locale: string; slug: string}> }) {
  const { locale, slug } = await params;
  const place = heritagePlaces.find((item) => item.slug === slug);
  if (locale !== 'pt' || !place) notFound();
  setRequestLocale(locale);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;
  const others = heritagePlaces.filter((item) => item.slug !== slug);
  const url = `${siteConfig.baseUrl}/pt/patrimonio/${slug}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'TouristAttraction', name: place.name,
    description: place.introduction, url,
    address: { '@type': 'PostalAddress', addressLocality: 'Évora', addressRegion: 'Alentejo', addressCountry: 'PT' },
    hasMap: mapUrl,
    isPartOf: { '@type': 'Place', name: 'Centro Histórico de Évora', url: `${siteConfig.baseUrl}/pt` },
  };
  return <>
    <Header />
    <main className="pt-16" style={{ color: 'var(--text-primary)', background: 'var(--bg-primary)' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
      <section className="py-16 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
        <div className="max-w-5xl mx-auto">
          <a href="/pt#patrimonio" className="text-sm hover:underline" style={{ color: 'var(--accent)' }}>← Explorar património de Évora</a>
          <p className="mt-8 text-sm uppercase tracking-widest" style={{ color: 'var(--accent)' }}>Património · Évora, Alentejo</p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-5">{place.name}</h1>
          <p className="text-xl max-w-3xl leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{place.subtitle}</p>
          <div className="flex flex-wrap gap-3 mt-8 text-sm">
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="rounded-full px-5 py-3 font-medium" style={{ background: 'var(--accent)', color: '#fff' }}>Abrir localização no Google Maps ↗</a>
            <a href="#informacoes" className="rounded-full border px-5 py-3" style={{ borderColor: 'var(--border-color)' }}>Informações práticas</a>
          </div>
        </div>
      </section>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14 leading-relaxed">
        <section><h2 className="font-display text-3xl font-bold mb-4">Descobrir {place.name}</h2><p>{place.introduction}</p></section>
        <section className="rounded-2xl p-7" style={{ background: 'var(--bg-secondary)' }}><h2 className="font-display text-2xl font-bold mb-3">Sobre a gestão e conservação</h2><p>{place.management}</p></section>
        <div className="grid md:grid-cols-2 gap-8">
          <section><h2 className="text-2xl font-semibold mb-3">História</h2><p>{place.history}</p></section>
          <section><h2 className="text-2xl font-semibold mb-3">Arquitetura e paisagem</h2><p>{place.architecture}</p></section>
        </div>
        <section><h2 className="text-2xl font-semibold mb-4">O que observar no local</h2><ul className="list-disc pl-6 space-y-3">{place.observe.map((item) => <li key={item}>{item}</li>)}</ul></section>
        <section id="informacoes"><h2 className="text-2xl font-semibold mb-4">Informações práticas</h2><div className="grid sm:grid-cols-2 gap-4">{[
          ['Localização e acesso', place.access], ['Horário e acesso', place.hours], ['Bilhetes e preços', place.price], ['Tempo e conselho de visita', place.visit],
        ].map(([label, value]) => <div key={label} className="rounded-xl p-5 border" style={{ borderColor: 'var(--border-color)' }}><h3 className="font-semibold mb-2">{label}</h3><p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{value}</p></div>)}</div></section>
        <section><h2 className="text-2xl font-semibold mb-4">Percurso a pé sugerido</h2><ol className="space-y-4">{place.route.map((item, index) => <li key={item} className="flex gap-4"><span className="shrink-0 rounded-full w-9 h-9 flex items-center justify-center font-semibold" style={{ background: 'var(--bg-secondary)' }}>{index + 1}</span><p className="pt-1">{item}</p></li>)}</ol></section>
        <section><h2 className="text-2xl font-semibold mb-3">Fotografia e visita responsável</h2><p>{place.photography}</p></section>
        <section><h2 className="text-2xl font-semibold mb-4">Perguntas frequentes</h2><div className="space-y-4">{place.faq.map((item) => <div key={item.question} className="border-b pb-4" style={{ borderColor: 'var(--border-color)' }}><h3 className="font-semibold mb-2">{item.question}</h3><p>{item.answer}</p></div>)}</div></section>
        <section><h2 className="text-2xl font-semibold mb-3">Mapa e fontes</h2><p>{place.access}</p><div className="flex flex-wrap gap-5 mt-3"><a className="underline" style={{ color: 'var(--accent)' }} href={mapUrl} target="_blank" rel="noopener noreferrer">Ver este local no Google Maps ↗</a><a className="underline" style={{ color: 'var(--accent)' }} href={place.source} target="_blank" rel="noopener noreferrer">Consultar fonte patrimonial ↗</a></div></section>
        <section><h2 className="text-2xl font-semibold mb-5">Continue a descobrir Évora</h2><div className="grid sm:grid-cols-3 gap-4">{others.map((item) => <a key={item.slug} href={`/pt/patrimonio/${item.slug}`} className="rounded-xl border p-5 hover:underline" style={{ borderColor: 'var(--border-color)', background: 'var(--bg-secondary)' }}><h3 className="font-semibold mb-2">{item.name}</h3><p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</p></a>)}</div></section>
      </div>
    </main>
    <Footer />
  </>;
}
