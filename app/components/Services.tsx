import ScrollReveal from "./ScrollReveal";

const SERVICES = [
  {
    title: "Selo & Gravadora",
    description:
      "Lançamento e distribuição de música com suporte completo ao artista.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="3" />
        <path d="M12 2v4M12 18v4M2 12h4M18 12h4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "Produção Musical",
    description:
      "Produção, gravação, mixagem e masterização em estúdio profissional com equipamentos de ponta.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M9 18V5l12-2v13" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="18" cy="16" r="3" />
      </svg>
    ),
  },
  {
    title: "Branding Artístico",
    description:
      "Construção de identidade visual e posicionamento de marca para artistas e projetos musicais.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Marketing de Lançamento",
    description:
      "Estratégias de lançamento, gestão de redes sociais e campanhas para maximizar o alcance.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Shows",
    description:
      "Produção e realização de shows, apresentações ao vivo e experiências musicais memoráveis.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M12 2v8M4.93 10.93l1.41 1.41M2 18h2M20 18h2M17.66 12.34l1.41-1.41" strokeLinecap="round" />
        <path d="M6 18h12a2 2 0 002-2c0-4-3-6-8-6s-8 2-8 6a2 2 0 002 2zM4 22h16" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "Educação",
    description:
      "Workshops, mentorias e programas de capacitação para artistas em desenvolvimento.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-8 w-8">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

export default function Services() {
  return (
    <section id="servicos" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-purple">
              {">"} Serviços
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-navy md:text-5xl">
              O que fazemos
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-navy/70">
              Concentramos em um só endereço todas as soluções que artistas e
              influenciadores precisam para suas carreiras.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 100}>
              <div className="group rounded-xl border border-navy/10 bg-white/50 p-8 transition-all duration-500 hover:-translate-y-2 hover:border-purple/30 hover:shadow-xl hover:shadow-purple/10">
                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-purple/10 text-purple transition-all duration-300 group-hover:bg-purple group-hover:text-cream group-hover:scale-110">
                  {service.icon}
                </div>
                <h4 className="mb-3 text-xl font-bold text-navy transition-colors group-hover:text-purple">
                  {service.title}
                </h4>
                <p className="text-sm leading-relaxed text-navy/60">
                  {service.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
