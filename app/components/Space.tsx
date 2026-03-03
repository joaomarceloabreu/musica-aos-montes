import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const SPACES = [
  {
    title: "Estúdio de Gravação",
    description:
      "Sala de gravação profissional com tratamento acústico de ponta, equipada para produção musical de alta qualidade.",
    image: "/images/elements/MaM-elementos-01.jpg",
  },
  {
    title: "Sala de Produção",
    description:
      "Ambiente dedicado à pré e pós-produção, mixagem e masterização com equipamentos de referência.",
    image: "/images/elements/MaM-elementos-02.jpg",
  },
  {
    title: "Espaço de Ensaio",
    description:
      "Salas para ensaios e preparação de shows, com infraestrutura completa para bandas e artistas solo.",
    image: "/images/elements/MaM-padrao-04.jpg",
  },
  {
    title: "Auditório",
    description:
      "Espaço multiuso para shows intimistas, workshops, palestras e eventos criativos.",
    image: "/images/elements/MaM-padrao-05.jpg",
  },
];

export default function Space() {
  return (
    <section id="espaco" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-turquoise">
            {">"} O Espaço
          </h2>
          <h3 className="mb-6 text-4xl font-bold leading-tight text-cream md:text-5xl">
            700m² de criatividade
          </h3>
          <p className="mb-16 max-w-2xl text-lg text-cream/70">
            Uma mansão dos anos 70 transformada em hub artístico completo, aos
            pés da Serra do Curral em Belo Horizonte.
          </p>
        </ScrollReveal>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {SPACES.map((space, i) => (
            <ScrollReveal key={space.title} delay={i * 120}>
              <div className="group relative overflow-hidden rounded-xl border border-cream/10 bg-cream/5 transition-all duration-500 hover:border-turquoise/30 hover:bg-cream/10 hover:-translate-y-2 hover:shadow-xl hover:shadow-turquoise/5">
                <div className="h-48 overflow-hidden">
                  <Image
                    src={space.image}
                    alt={space.title}
                    width={400}
                    height={200}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <h4 className="mb-3 text-xl font-bold text-cream">
                    {space.title}
                  </h4>
                  <p className="text-sm leading-relaxed text-cream/60">
                    {space.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
