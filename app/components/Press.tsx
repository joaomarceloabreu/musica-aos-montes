import ScrollReveal from "./ScrollReveal";

export default function Press() {
  return (
    <section id="imprensa" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-turquoise">
            {">"} Imprensa
          </h2>
          <h3 className="mb-6 text-4xl font-bold text-cream md:text-5xl">
            Na mídia
          </h3>
          <p className="mb-16 max-w-2xl text-lg text-cream/70">
            Matérias, entrevistas e aparições da Música aos Montes na imprensa.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={200}>
          <div className="flex flex-col items-center justify-center rounded-2xl border border-cream/10 bg-cream/5 py-20">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="mb-6 h-16 w-16 text-cream/20"
            >
              <path d="M4 22h16a2 2 0 002-2V4a2 2 0 00-2-2H8a2 2 0 00-2 2v16a2 2 0 01-2 2zm0 0a2 2 0 01-2-2v-9c0-1.1.9-2 2-2h2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M18 14h-8M18 18h-8M10 6h8" strokeLinecap="round" />
            </svg>
            <p className="text-lg font-medium text-cream/40">
              Em breve — clipping e releases
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
