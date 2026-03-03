import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

const GALLERY_ITEMS = [
  { id: 1, src: "/images/elements/MaM-padrao-01.jpg", alt: "Padrão MaM 1" },
  { id: 2, src: "/images/elements/MaM-elementos-01.jpg", alt: "Elementos MaM" },
  { id: 3, src: "/images/elements/MaM-padrao-02.jpg", alt: "Padrão MaM 2" },
  { id: 4, src: "/images/elements/MaM-padrao-03.jpg", alt: "Padrão MaM 3" },
  { id: 5, src: "/images/elements/MaM-elementos-02.jpg", alt: "Elementos MaM 2" },
  { id: 6, src: "/images/elements/MaM-padrao-04.jpg", alt: "Padrão MaM 4" },
  { id: 7, src: "/images/elements/MaM-padrao-05.jpg", alt: "Padrão MaM 5" },
  { id: 8, src: "/images/elements/MaM-padrao-06.jpg", alt: "Padrão MaM 6" },
  { id: 9, src: "/images/logos/MaM-logo_principal_fundo.jpg", alt: "Logo MaM" },
];

export default function Gallery() {
  return (
    <section id="galeria" className="bg-cream py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <ScrollReveal>
          <div className="mb-16 text-center">
            <h2 className="mb-2 text-sm font-bold uppercase tracking-[0.3em] text-purple">
              {">"} Galeria
            </h2>
            <h3 className="mb-6 text-4xl font-bold text-navy md:text-5xl">
              Momentos
            </h3>
          </div>
        </ScrollReveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY_ITEMS.map((item, i) => {
            const tall = i === 0 || i === 4 || i === 7;
            return (
              <ScrollReveal key={item.id} delay={i * 80}>
                <div
                  className={`group relative cursor-pointer overflow-hidden rounded-xl ${
                    tall ? "sm:row-span-2" : ""
                  }`}
                >
                  <div className={tall ? "h-full min-h-80" : "aspect-[4/3]"}>
                    <Image
                      src={item.src}
                      alt={item.alt}
                      width={600}
                      height={tall ? 800 : 450}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
                    <p className="translate-y-4 p-5 text-sm font-bold text-cream transition-transform duration-500 group-hover:translate-y-0">
                      {item.alt}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
