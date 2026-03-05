import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function About() {
  return (
    <section id="sobre" className="relative bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 md:grid-cols-2 md:gap-16">
          <ScrollReveal direction="left">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-purple">
              {">"} Sobre
            </h2>
            <h3 className="mb-8 text-4xl font-bold leading-tight text-navy md:text-5xl">
              Uma Casa Criativa aos pés da Serra
            </h3>
            <div className="space-y-6 text-lg leading-relaxed text-navy/80">
              <p>
                Música Aos Montes é uma Casa Criativa situada aos pés da Serra
                Do Curral, no bairro Mangabeiras em Belo Horizonte (MG).
              </p>
              <p>
                A mansão dos anos 70 foi transformada em um hub artístico de
                mais de 700 m². O espaço nasce para integrar produção musical,
                gravação audiovisual, ensaios, shows e serviços diversos de
                gestão de carreira, concentrando em um só endereço soluções para
                artistas e influenciadores.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={200}>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-2xl bg-navy/10">
                <Image
                  src="/images/logos/logo-principal.png"
                  alt="Música aos Montes"
                  width={600}
                  height={600}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 -z-10 h-full w-full rounded-2xl bg-purple/20" />
              <div className="absolute -left-6 -top-6 -z-10 h-32 w-32 opacity-20">
                <Image
                  src="/images/elements/MaM-padrao-01.jpg"
                  alt=""
                  width={128}
                  height={128}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
