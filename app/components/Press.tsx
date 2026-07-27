interface PressItem {
  id: string;
  outlet: string;
  date: string;
  title: string;
  summary: string;
  url: string;
}

const PRESS_ITEMS: PressItem[] = [
  {
    id: "estado-de-minas-2024",
    outlet: "Estado de Minas",
    date: "Janeiro de 2024",
    title:
      "Selo Música aos Montes aposta na potência da nova cena autoral mineira",
    summary:
      "Como o selo, fundado em 2015 e atuante na gestão de carreiras desde 2021, apoia compositores emergentes de Minas Gerais com produção, distribuição, marketing e direcionamento de carreira.",
    url: "https://www.em.com.br/cultura/2024/01/6789696-selo-musica-aos-montes-aposta-na-potencia-da-nova-cena-autoral-mineira.html",
  },
  {
    id: "o-tempo-2023",
    outlet: "O Tempo",
    date: "Outubro de 2023",
    title:
      "Conheça os artistas que fazem parte do selo mineiro Música aos Montes",
    summary:
      "Perfil dos artistas do selo — Cruvinel, Davi Leão, Flor Grassi e Túlio Dayrell — e de como cada um chegou até o Música aos Montes.",
    url: "https://www.otempo.com.br/entretenimento/conheca-os-artistas-que-fazem-parte-do-selo-mineiro-musica-aos-montes-1.3244062",
  },
  {
    id: "culturadoria-2023",
    outlet: "Culturadoria",
    date: "Agosto de 2023",
    title:
      "Conheça o Música aos Montes, o selo que vem revelando e desenvolvendo os novos talentos da música mineira",
    summary:
      "Uma imersão no modelo de parceria \"360 graus\" criado por Carol Figueiredo e Dan Oliveira para guiar composição, produção e promoção dos artistas do selo.",
    url: "https://culturadoria.com.br/musica-aos-montes/",
  },
];

function ExternalLinkIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
    >
      <path
        d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function Press() {
  return (
    <div>
      <p className="mb-8 max-w-2xl text-lg text-cream/70">
        Matérias, entrevistas e aparições da Música aos Montes na imprensa.
      </p>

      <div className="flex flex-col gap-4">
        {PRESS_ITEMS.map((item) => (
          <a
            key={item.id}
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col gap-2 rounded-2xl border border-cream/10 bg-cream/5 p-6 transition-all duration-300 hover:border-turquoise/40 hover:bg-cream/10"
          >
            <div className="flex items-center justify-between gap-4">
              <span className="text-sm font-bold uppercase tracking-widest text-turquoise">
                {item.outlet}
              </span>
              <span className="text-xs text-cream/40">{item.date}</span>
            </div>
            <h3 className="text-lg font-bold text-cream md:text-xl">
              {item.title}
            </h3>
            <p className="text-sm text-cream/60 md:text-base">
              {item.summary}
            </p>
            <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-cream/70 transition-colors group-hover:text-turquoise">
              Ler matéria
              <ExternalLinkIcon />
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
