import { heritagePlaces } from '@/data/heritage';

export default function HeritageSection() {
  return <section id="patrimonio" className="section-padding py-16 px-4 sm:px-6" style={{ background: 'var(--bg-secondary)' }}>
    <div className="max-w-6xl mx-auto">
      <p className="text-sm tracking-widest uppercase mb-3" style={{ color: 'var(--accent)' }}>Explorar Évora</p>
      <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>Monumentos e lugares do centro histórico</h2>
      <p className="max-w-3xl mb-8" style={{ color: 'var(--text-secondary)' }}>Do legado romano às muralhas e à engenharia renascentista: descubra a história, os percursos a pé e a localização de cada monumento antes da visita.</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {heritagePlaces.map((place) => <a key={place.slug} href={`/pt/patrimonio/${place.slug}`} className="block p-6 rounded-2xl border transition-transform hover:-translate-y-1" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-color)' }}>
          <h3 className="text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>{place.name}</h3>
          <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{place.subtitle}</p>
          <span className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>Explorar este lugar →</span>
        </a>)}
      </div>
    </div>
  </section>;
}
