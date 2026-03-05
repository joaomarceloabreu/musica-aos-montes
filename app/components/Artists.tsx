import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const ARTISTS = [
  { name: "Artista 1", genre: "MPB", pattern: "/images/elements/MaM-padrao-01.jpg" },
  { name: "Artista 2", genre: "Rock", pattern: "/images/elements/MaM-padrao-02.jpg" },
  { name: "Artista 3", genre: "Pop", pattern: "/images/elements/MaM-padrao-03.jpg" },
  { name: "Artista 4", genre: "Indie", pattern: "/images/elements/MaM-padrao-04.jpg" },
  { name: "Artista 5", genre: "Soul", pattern: "/images/elements/MaM-padrao-05.jpg" },
  { name: "Artista 6", genre: "Eletrônico", pattern: "/images/elements/MaM-padrao-06.jpg" },
];

export default function Artists() {
  return (
    <section id="selo" className="bg-navy py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-turquoise">
            {">"} Selo
          </h2>
          <h3 className="mb-6 text-4xl font-bold text-cream md:text-5xl">
            Quem faz parte
          </h3>
          <p className="mb-16 max-w-2xl text-lg text-cream/70">
            Artistas que fazem parte do selo e já passaram pela nossa casa.
          </p>
        </ScrollReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ARTISTS.map((artist, i) => (
            <ScrollReveal key={artist.name} delay={i * 100}>
              <div className="group relative overflow-hidden rounded-xl border border-cream/10 bg-cream/5 transition-all duration-500 hover:-translate-y-2 hover:border-turquoise/30 hover:shadow-xl hover:shadow-turquoise/10">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src={artist.pattern}
                    alt={artist.name}
                    width={400}
                    height={533}
                    className="h-full w-full object-cover opacity-40 transition-all duration-700 group-hover:scale-110 group-hover:opacity-60"
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg
                      width="64"
                      height="64"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1"
                      className="text-cream/30 transition-all duration-300 group-hover:scale-110 group-hover:text-cream/50"
                    >
                      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                </div>
                <div className="relative z-10 bg-gradient-to-t from-navy via-navy/90 to-transparent p-6">
                  <h4 className="text-lg font-bold text-cream">{artist.name}</h4>
                  <p className="text-sm font-bold text-turquoise">{artist.genre}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
