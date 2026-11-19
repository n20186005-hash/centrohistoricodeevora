import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HeritageVisitorInfo from '@/components/HeritageVisitorInfo';
import { heritagePlaces } from '@/data/heritage';
import { heritageTranslations } from '@/data/heritageTranslations';
import { heritageDeepTranslations } from '@/data/heritageDeepTranslations';
import { siteConfig } from '@/config';

type Language = 'pt' | 'en' | 'zh' | 'mwl';
const available: Language[] = ['pt', 'en', 'zh', 'mwl'];
const labelSets = {
  pt: ['← Explorar património de Évora','Património · Évora, Alentejo','Abrir localização no Google Maps ↗','Informações práticas','Descobrir','Sobre a gestão e conservação','História','Arquitetura e paisagem','O que observar no local','Localização e acesso','Horário e acesso','Bilhetes e preços','Tempo e conselho de visita','Percurso a pé sugerido','Fotografia e visita responsável','Perguntas frequentes','Mapa e fontes','Ver este local no Google Maps ↗','Consultar fonte patrimonial ↗','Continue a descobrir Évora','Vista do monumento · imagem de referência do local'],
  en: ['← Explore Évora heritage','Heritage · Évora, Alentejo','Open location in Google Maps ↗','Practical information','Discover','Management and conservation','History','Architecture and setting','What to look for','Location and access','Opening and access','Tickets and prices','Visit duration and advice','Suggested walking route','Photography and responsible visiting','Frequently asked questions','Map and sources','View on Google Maps ↗','Consult heritage source ↗','Keep exploring Évora','View of the actual monument · location reference image'],
  zh: ['← 探索埃武拉历史遗产','历史遗产 · 葡萄牙阿连特茹埃武拉','在 Google 地图查看地点 ↗','实用游览信息','探索','管理与保护','历史背景','建筑与周边景观','现场观察重点','位置与交通','开放时间与参观条件','门票及费用','建议时长与游览提示','建议步行路线','摄影与文明参观','常见问题','地图与资料来源','在 Google 地图查看 ↗','查看遗产资料来源 ↗','继续探索埃武拉','景点实景照片 · 对应地点参考影像'],
  mwl: ['← Çcubrir l património de Ébora','Património · Ébora, Alentejo','Ber l lhugar ne l Google Maps ↗','Anformaçones práticas','Çcubrir','Gestiçon i cunserbaçon','Stória','Arquitetura i paisaige','Qué mirar ne l lhugar','Lhocalizaçon i acésso','Horários i acésso','Bilhetes i preços','Tempo i cunseilhos de besita','Percurso a pie sujerido','Fotografia i besita cun respeito','Preguntas frequentes','Mapa i fuontes','Ber ne l Google Maps ↗','Cunsultar la fuonte patrimonial ↗','Cuntinar a çcubrir Ébora','Bista de l monumento · eimaige de l lhugar'],
} satisfies Record<Language, string[]>;

function translatedPlace(place: (typeof heritagePlaces)[number], language: Language) {
  if (language === 'pt') return place;
  const basic = heritageTranslations[language][place.slug];
  const deep = heritageDeepTranslations[language][place.slug];
  return { ...place, name: basic.name, subtitle: basic.subtitle, introduction: basic.intro, history: basic.history, architecture: basic.features, visit: basic.visit, ...deep };
}

export function generateStaticParams() {
  return available.flatMap((locale) => heritagePlaces.map((place) => ({ locale, slug: place.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{locale: string; slug: string}> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const place = heritagePlaces.find((item) => item.slug === slug);
  if (!available.includes(locale as Language) || !place) return {};
  const translated = locale === 'pt' ? null : heritageTranslations[locale as Exclude<Language, 'pt'>][slug];
  const canonical = `${siteConfig.baseUrl}/${locale}/patrimonio/${place.slug}`;
  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: translated ? `${translated.name} | ${locale === 'zh' ? '埃武拉景点指南' : locale === 'mwl' ? 'Guia de l Património de Ébora' : 'Évora Heritage Guide'}` : `${place.name} | História, visita e mapa em Évora`,
    description: translated ? `${translated.subtitle}. ${translated.intro}` : `${place.subtitle}. História, arquitetura, percurso a pé, informações práticas e localização de ${place.name}.`,
    alternates: { canonical, languages: { pt: `${siteConfig.baseUrl}/pt/patrimonio/${slug}`, en: `${siteConfig.baseUrl}/en/patrimonio/${slug}`, 'zh-CN': `${siteConfig.baseUrl}/zh/patrimonio/${slug}`, mwl: `${siteConfig.baseUrl}/mwl/patrimonio/${slug}`, 'x-default': `${siteConfig.baseUrl}/pt/patrimonio/${slug}` } as Record<string, string> },
    openGraph: { title: translated?.name || place.name, description: translated?.intro || place.introduction, url: canonical, locale: locale === 'zh' ? 'zh_CN' : locale === 'en' ? 'en_US' : locale === 'mwl' ? 'mwl' : 'pt_PT', type: 'article', images: place.image ? [place.image] : undefined },
  };
}

export default async function HeritagePage({ params }: { params: Promise<{locale: string; slug: string}> }) {
  const { locale, slug } = await params;
  const place = heritagePlaces.find((item) => item.slug === slug);
  if (!available.includes(locale as Language) || !place) notFound();
  setRequestLocale(locale);
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;
  const others = heritagePlaces.filter((item) => item.slug !== slug);
  const url = `${siteConfig.baseUrl}/${locale}/patrimonio/${slug}`;
  if (locale === 'en' || locale === 'zh' || locale === 'mwl') {
    const tr = heritageTranslations[locale][slug];
    const deep = heritageDeepTranslations[locale][slug];
    const l = labelSets[locale];
    const labels = {back:l[0], heritage:l[1], map:l[2], practical:l[3], discover:l[4], management:l[5], history:l[6], features:l[7], observe:l[8], access:l[9], hours:l[10], price:l[11], visit:l[12], route:l[13], photo:l[14], faq:l[15], sources:l[16], mapLink:l[17], source:l[18], nearby:l[19], caption:l[20]};
    return <><Header solid/><main className="pt-16" style={{color:'var(--text-primary)',background:'var(--bg-primary)'}}>
      <section className="py-16 px-4 sm:px-6" style={{background:'var(--bg-secondary)'}}><div className="max-w-5xl mx-auto">
        <a href={`/${locale}#patrimonio`} className="text-sm hover:underline" style={{color:'var(--accent)'}}>{labels.back}</a>
        <p className="mt-8 text-sm uppercase tracking-widest" style={{color:'var(--accent)'}}>{labels.heritage}</p>
        <h1 className="font-display text-4xl sm:text-5xl font-bold mt-3 mb-5">{tr.name}</h1><p className="text-xl max-w-3xl" style={{color:'var(--text-secondary)'}}>{tr.subtitle}</p>
        <a href={mapUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-full px-5 py-3 mt-7 font-medium" style={{background:'var(--accent)',color:'#fff'}}>{labels.map}</a>
      </div></section>
      {place.image && <figure className="max-w-5xl mx-auto px-4 sm:px-6 pt-8"><img src={place.image} alt={tr.name} loading="eager" className="w-full max-h-[520px] object-cover rounded-2xl"/><figcaption className="mt-2 text-xs" style={{color:'var(--text-muted)'}}>{labels.caption}</figcaption></figure>}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14 leading-relaxed">
        <section><h2 className="font-display text-3xl font-bold mb-4">{labels.discover} {tr.name}</h2><p>{tr.intro}</p></section>
        <section className="rounded-2xl p-7" style={{background:'var(--bg-secondary)'}}><h2 className="font-display text-2xl font-bold mb-3">{labels.management}</h2><p>{deep.management}</p></section>
        <HeritageVisitorInfo place={{...place,name:tr.name,subtitle:tr.subtitle,introduction:tr.intro,history:tr.history,architecture:tr.features,visit:tr.visit,...deep}} locale={locale} mapUrl={mapUrl}/>
        <div className="grid md:grid-cols-2 gap-8"><section><h2 className="text-2xl font-semibold mb-3">{labels.history}</h2><p>{tr.history}</p></section><section><h2 className="text-2xl font-semibold mb-3">{labels.features}</h2><p>{tr.features}</p></section></div>
        <section><h2 className="text-2xl font-semibold mb-4">{labels.observe}</h2><ul className="list-disc pl-6 space-y-3">{deep.observe.map(item=><li key={item}>{item}</li>)}</ul></section>
        <section id="informacoes"><h2 className="text-2xl font-semibold mb-4">{labels.practical}</h2><div className="grid sm:grid-cols-2 gap-4">{[[labels.access,deep.access],[labels.hours,deep.hours],[labels.price,deep.price],[labels.visit,tr.visit]].map(([label,value])=><div key={label} className="rounded-xl p-5 border" style={{borderColor:'var(--border-color)'}}><h3 className="font-semibold mb-2">{label}</h3><p className="text-sm" style={{color:'var(--text-secondary)'}}>{value}</p></div>)}</div></section>
        <section><h2 className="text-2xl font-semibold mb-4">{labels.route}</h2><ol className="space-y-4">{deep.route.map((item,index)=><li key={item} className="flex gap-4"><span className="shrink-0 rounded-full w-9 h-9 flex items-center justify-center font-semibold" style={{background:'var(--bg-secondary)'}}>{index+1}</span><p className="pt-1">{item}</p></li>)}</ol></section>
        <section><h2 className="text-2xl font-semibold mb-3">{labels.photo}</h2><p>{deep.photography}</p></section>
        <section><h2 className="text-2xl font-semibold mb-4">{labels.faq}</h2><div className="space-y-4">{deep.faq.map(item=><div key={item.question} className="border-b pb-4" style={{borderColor:'var(--border-color)'}}><h3 className="font-semibold mb-2">{item.question}</h3><p>{item.answer}</p></div>)}</div></section>
        <section><h2 className="text-2xl font-semibold mb-3">{labels.sources}</h2><p>{deep.access}</p><div className="flex flex-wrap gap-5 mt-3"><a href={mapUrl} className="underline" style={{color:'var(--accent)'}} target="_blank" rel="noopener noreferrer">{labels.mapLink}</a><a href={place.source} className="underline" style={{color:'var(--accent)'}} target="_blank" rel="noopener noreferrer">{labels.source}</a></div></section>
        <section><h2 className="text-2xl font-semibold mb-5">{labels.nearby}</h2><div className="grid sm:grid-cols-3 gap-4">{others.map(item=><a key={item.slug} className="rounded-xl border p-5 hover:underline" style={{borderColor:'var(--border-color)',background:'var(--bg-secondary)'}} href={`/${locale}/patrimonio/${item.slug}`}><h3 className="font-semibold mb-2">{heritageTranslations[locale][item.slug].name}</h3><p className="text-sm" style={{color:'var(--text-secondary)'}}>{heritageTranslations[locale][item.slug].subtitle}</p></a>)}</div></section>
      </div>
    </main><Footer/></>;
  }
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'TouristAttraction', name: place.name,
    description: place.introduction, url,
    address: { '@type': 'PostalAddress', addressLocality: 'Évora', addressRegion: 'Alentejo', addressCountry: 'PT' },
    hasMap: mapUrl,
    isPartOf: { '@type': 'Place', name: 'Centro Histórico de Évora', url: `${siteConfig.baseUrl}/pt` },
  };
  return <>
    <Header solid />
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
      {place.image && <figure className="max-w-5xl mx-auto px-4 sm:px-6 pt-8">
        <img src={place.image} alt={`Vista real de ${place.name}, em Évora`} loading="eager" className="w-full max-h-[520px] object-cover rounded-2xl" />
        <figcaption className="mt-2 text-xs" style={{ color: 'var(--text-muted)' }}>Vista do monumento · imagem de referência do local</figcaption>
      </figure>}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14 leading-relaxed">
        <section><h2 className="font-display text-3xl font-bold mb-4">Descobrir {place.name}</h2><p>{place.introduction}</p></section>
        <section className="rounded-2xl p-7" style={{ background: 'var(--bg-secondary)' }}><h2 className="font-display text-2xl font-bold mb-3">Sobre a gestão e conservação</h2><p>{place.management}</p></section>
        <HeritageVisitorInfo place={place} locale="pt" mapUrl={mapUrl}/>
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
