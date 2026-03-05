import ScrollReveal from "./ScrollReveal";

export default function Education() {
  return (
    <section id="educacao" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-purple">
              {">"} Educação
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-navy md:text-5xl">
              Aprenda com quem faz
            </h3>
            <p className="mx-auto max-w-2xl text-lg text-navy/70">
              Workshops, mentorias e programas de capacitação para artistas em
              desenvolvimento.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-navy/10 bg-white/50 py-20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="mb-6 h-16 w-16 text-navy/20"
            >
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="text-lg font-medium text-navy/40">
              Em breve — novas turmas e workshops
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
