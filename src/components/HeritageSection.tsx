import { heritagePlaces } from '@/data/heritage';
import { heritageTranslations } from '@/data/heritageTranslations';

export default function HeritageSection({ locale = 'pt' }: { locale?: 'pt' | 'en' | 'zh' }) {
  const labels = locale === 'zh' ? {kicker:'探索埃武拉',heading:'历史中心及周边景点',intro:'了解埃武拉的罗马遗迹、教堂、广场与城市历史，每个地点都有独立介绍与地图。',cta:'查看景点 →'} : locale === 'en' ? {kicker:'Explore Évora',heading:'Monuments and places in the historic centre',intro:'Discover Roman remains, churches, squares and local history with a dedicated guide and map for each place.',cta:'Explore this place →'} : {kicker:'Explorar Évora',heading:'Monumentos e lugares do centro histórico',intro:'Do legado romano às muralhas e à engenharia renascentista: descubra a história, os percursos a pé e a localização de cada monumento antes da visita.',cta:'Explorar este lugar →'};
  return <section id="patrimonio" className="section-padding py-16 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-6xl mx-auto">
      <p className="text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>{labels.kicker}</p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>{labels.heading}</h2>
      <p className="max-w-3xl mb-8" style={{ color: 'var(--text-secondary)' }}>{labels.intro}</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {heritagePlaces.map((place) => <a key={place.slug} href={`/${locale}/patrimonio/${place.slug}`} className="block rounded-2xl border overflow-hidden transition-transform hover:-translate-y-1" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
          {place.image && <img src={place.image} alt={locale === 'pt' ? place.name : heritageTranslations[locale][place.slug].name} loading="lazy" className="w-full h-40 object-cover" />}
          <div className="p-5"><h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{locale === 'pt' ? place.name : heritageTranslations[locale][place.slug].name}</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{locale === 'pt' ? place.subtitle : heritageTranslations[locale][place.slug].subtitle}</p>
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>{labels.cta}</span></div>
        </a>)}
      </div>
    </div>
  </section>;
}
