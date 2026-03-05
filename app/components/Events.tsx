import ScrollReveal from "./ScrollReveal";

export default function Events() {
  return (
    <section id="eventos" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-turquoise">
            {">"} Eventos
          </h2>
          <h3 className="mb-6 text-4xl font-bold text-cream md:text-5xl">
            Agenda
          </h3>
          <p className="mb-16 max-w-2xl text-lg text-cream/70">
            Shows, lançamentos, festas e encontros criativos na nossa casa.
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
              <rect x="3" y="4" width="18" height="18" rx="2" />
              <path d="M16 2v4M8 2v4M3 10h18" strokeLinecap="round" />
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" strokeLinecap="round" />
            </svg>
            <p className="text-lg font-medium text-cream/40">
              Em breve — fique ligado nas nossas redes!
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
