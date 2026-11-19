export type HeritagePlace = {
  slug: string;
  name: string;
  subtitle: string;
  introduction: string;
  history: string;
  architecture: string;
  observe: string[];
  management: string;
  visit: string;
  route: string[];
  photography: string;
  access: string;
  hours: string;
  price: string;
  faq: { question: string; answer: string }[];
  source: string;
  mapQuery: string;
};

export const heritagePlaces: HeritagePlace[] = [
  {
    slug: 'templo-romano-de-evora', name: 'Templo Romano de Évora',
    subtitle: 'Colunas coríntias e memória do fórum da antiga cidade romana',
    introduction: 'No ponto alto do centro histórico, o templo romano é uma das referências visuais de Évora. A sua visita permite compreender como a cidade atual ocupa sucessivas camadas de história.',
    history: 'O monumento remonta ao século I e integrava a área do fórum da cidade romana. Ficou popularmente conhecido como Templo de Diana, embora a atribuição à deusa resulte de uma tradição posterior; a interpretação histórica liga-o ao culto imperial.',
    architecture: 'As colunas de capitéis coríntios e o pódio elevado mostram a monumentalidade da construção romana. O contraste entre a ruína e os edifícios vizinhos revela a continuidade da ocupação urbana.',
    observe: ['Os capitéis coríntios e a proporção das colunas', 'O pódio de pedra que sustenta o conjunto', 'A relação com o Jardim Diana e a Sé próxima'],
    management: 'O monumento integra o património histórico de Évora. A Câmara Municipal disponibiliza informação patrimonial; intervenções, acessos e regras no local devem ser confirmados junto das entidades responsáveis.',
    visit: 'Reserve 15–30 minutos para observar o exterior e o entorno. Combine com a Sé de Évora e um percurso pelas ruas históricas, sem necessidade de deslocação motorizada entre estes dois pontos.',
    route: ['Comece no Jardim Diana e observe a implantação do templo', 'Contorne os pontos públicos de observação para comparar ângulos', 'Siga a pé para a Sé Catedral e continue em direção à Praça do Giraldo'],
    photography: 'A luz lateral ajuda a destacar o relevo dos capitéis. Procure enquadramentos que incluam as colunas e a paisagem urbana sem ultrapassar barreiras de proteção.',
    access: 'Largo do Conde de Vila Flor, centro histórico de Évora, Portugal. Chegue a pé a partir da Sé ou da Praça do Giraldo; ruas e pavimentos antigos podem ser irregulares.',
    hours: 'A observação exterior faz-se a partir do espaço público; eventuais restrições locais podem mudar.',
    price: 'Não há bilhete para observar o monumento a partir do exterior público.',
    faq: [{question:'O Templo de Diana e o Templo Romano são o mesmo lugar?', answer:'Sim. Templo de Diana é a designação tradicional; Templo Romano de Évora é o nome preferível para a identificação histórica.'}, {question:'É possível visitar o interior?', answer:'Trata-se de uma ruína monumental observada essencialmente do exterior, a partir das áreas públicas autorizadas.'}],
    source: 'https://www.cm-evora.pt/locais/templo-romano/',
    mapQuery: 'Templo Romano de Évora, Largo do Conde de Vila Flor, Évora, Portugal',
  },
  {
    slug: 'se-catedral-de-evora', name: 'Sé Catedral de Évora',
    subtitle: 'Uma catedral medieval fortificada no coração do Alentejo',
    introduction: 'A Sé domina uma das partes mais altas de Évora e constitui uma paragem essencial para conhecer a arquitetura religiosa medieval da cidade.',
    history: 'A construção desenvolveu-se a partir do período medieval, com destaque para a conclusão de partes importantes no século XIII. O edifício acompanhou a afirmação de Évora como centro religioso e urbano.',
    architecture: 'A fachada de caráter fortificado, os elementos góticos, as torres e a cúpula central traduzem várias soluções construtivas. A leitura do exterior ajuda a perceber a escala da catedral perante a malha urbana.',
    observe: ['A composição da fachada e das torres', 'A cúpula central e a volumetria da cobertura', 'A transição entre a praça, o templo e as ruas adjacentes'],
    management: 'A Sé é um edifício religioso com gestão própria. Horários de culto, percursos visitáveis e bilhetes devem ser verificados nos canais da catedral antes da deslocação.',
    visit: 'Conte com 45–90 minutos caso pretenda conhecer os espaços interiores disponíveis. O acesso a algumas áreas pode depender de bilhete, eventos religiosos e condições meteorológicas.',
    route: ['Observe primeiro a fachada no largo da catedral', 'Visite os espaços abertos ao público de acordo com o bilhete e as regras do local', 'Continue a pé até ao Templo Romano, a poucos minutos'],
    photography: 'O largo permite fotografar a fachada; no interior, respeite as regras para fotografia e a celebração de serviços religiosos.',
    access: 'Largo do Marquês de Marialva, Évora, Portugal. O acesso a pé é natural desde o Templo Romano e do centro histórico.',
    hours: 'Horário de visita variável; confirmar diretamente com a Sé, sobretudo em dias de celebrações.',
    price: 'A visita turística a áreas específicas pode ser paga; verificar modalidades e valores atualizados.',
    faq: [{question:'A Sé fica perto do Templo Romano?', answer:'Sim, ambos se encontram na zona alta do centro histórico e podem ser visitados no mesmo percurso a pé.'}, {question:'Posso entrar durante as celebrações?', answer:'A prioridade é o culto; siga as instruções da equipa local e os horários destinados à visita turística.'}],
    source: 'https://www.visitportugal.com/en/content/se-catedral-de-evora',
    mapQuery: 'Sé Catedral de Évora, Largo do Marquês de Marialva, Évora, Portugal',
  },
  {
    slug: 'aqueduto-da-agua-de-prata', name: 'Aqueduto da Água de Prata',
    subtitle: 'Engenharia de abastecimento de água na Évora renascentista',
    introduction: 'O aqueduto atravessa a paisagem e partes da cidade, tornando visível a infraestrutura que durante séculos levou água a Évora.',
    history: 'Inaugurado em 28 de março de 1537, é uma importante obra de engenharia da primeira metade do século XVI. Ao longo do tempo recebeu adaptações, reparações e alterações no seu percurso.',
    architecture: 'Os arcos exteriores contrastam com os troços integrados na malha urbana. Na Rua Nova de Santiago, a caixa de água renascentista atribuída a Francisco de Arruda mostra o tratamento arquitetónico dado à distribuição de água.',
    observe: ['O ritmo dos arcos e a diferença de alturas', 'A integração de construções e ruas junto à estrutura', 'A caixa de água renascentista na Rua Nova de Santiago'],
    management: 'A Câmara Municipal de Évora realiza trabalhos de manutenção e valorização patrimonial no aqueduto. Trechos e acessos podem estar sujeitos a intervenções.',
    visit: 'Reserve 30–60 minutos para explorar um troço urbano a pé. O aqueduto é extenso: escolha previamente um ponto concreto, evitando tratar toda a infraestrutura como uma única entrada.',
    route: ['Comece na Rua Nova de Santiago para observar a caixa de água', 'Siga apenas pelas ruas públicas contíguas a um trecho visível do aqueduto', 'Regresse ao núcleo central pela zona histórica, sem entrar em zonas vedadas'],
    photography: 'Experimente perspetivas longitudinais que mostrem a repetição dos arcos; fotografe apenas de passeios e espaços públicos seguros.',
    access: 'Referência urbana: Rua Nova de Santiago, Évora, Portugal. Existem outros troços do aqueduto; confirme no mapa qual pretende visitar.',
    hours: 'A observação exterior dos troços públicos não equivale a uma visita interior; eventuais zonas condicionadas têm regras próprias.',
    price: 'Observação exterior a partir da via pública sem bilhete; visitas especiais podem ter condições diferentes.',
    faq: [{question:'Onde começa a visita ao aqueduto?', answer:'Para um percurso curto no centro histórico, a Rua Nova de Santiago é uma referência útil; confirme o ponto exato no mapa.'}, {question:'É possível percorrer todo o aqueduto a pé?', answer:'É uma infraestrutura extensa, com troços de natureza diversa. Planeie um segmento, respeitando caminhos públicos e zonas interditas.'}],
    source: 'https://www.cm-evora.pt/locais/aqueduto-da-agua-da-prata/',
    mapQuery: 'Aqueduto da Água de Prata, Rua Nova de Santiago, Évora, Portugal',
  },
  {
    slug: 'muralhas-de-evora', name: 'Muralhas de Évora',
    subtitle: 'As cercas defensivas que moldaram o centro histórico',
    introduction: 'As muralhas ajudam a ler os limites e a evolução urbana de Évora. Portas, panos de muralha e mudanças no traçado das ruas revelam diferentes momentos da cidade.',
    history: 'A história defensiva de Évora inclui fases sucessivas desde a Antiguidade e a Idade Média. A cerca antiga e expansões posteriores refletem o crescimento para além do núcleo inicial.',
    architecture: 'Em vez de um único recinto homogéneo, encontram-se troços de épocas e soluções construtivas diferentes. A relação entre portas, torres, alvenarias e ruas explica o papel estratégico do conjunto.',
    observe: ['As mudanças de materiais e aparelhos de pedra', 'Os pontos em que a via urbana atravessa antigas portas', 'A relação entre o perímetro defensivo e o núcleo histórico'],
    management: 'Os troços fazem parte do património urbano da cidade. Consulte a Câmara Municipal de Évora para informação sobre conservação, obras e acessos condicionados.',
    visit: 'Para um primeiro contacto, escolha um percurso exterior de 30–60 minutos por troços públicos identificados no mapa. Nem todas as muralhas são percorríveis pelo topo.',
    route: ['Identifique um troço visível junto ao limite do centro histórico', 'Observe as portas e a relação com as ruas atuais', 'Siga pelas vias públicas até outro troço, evitando atalhos por terrenos privados'],
    photography: 'Fotografe em diagonal para mostrar simultaneamente a espessura da estrutura e o contexto urbano. A luz rasante destaca a textura da pedra.',
    access: 'Vários pontos no perímetro do centro histórico de Évora, Portugal. A indicação de mapa abaixo é uma pesquisa do conjunto, não uma entrada única.',
    hours: 'Os troços exteriores visíveis do espaço público podem ser observados conforme as condições locais.',
    price: 'Sem bilhete para contemplação exterior pública; outras experiências organizadas podem ter preços próprios.',
    faq: [{question:'Existe uma entrada única para as muralhas?', answer:'Não. As muralhas distribuem-se por diversos troços do perímetro histórico; escolha o setor que deseja visitar.'}, {question:'É possível subir às muralhas?', answer:'Não assuma que os troços são acessíveis. Respeite sinalização, barreiras e informação municipal.'}],
    source: 'https://whc.unesco.org/en/list/361',
    mapQuery: 'Muralhas de Évora, Évora, Portugal',
  },
];
