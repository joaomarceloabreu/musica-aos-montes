import Image from "next/image";

const GALLERY_ITEMS = [
  { id: 1, src: "/images/elements/MaM-padrao-01.jpg", alt: "Padrão MaM 1" },
  { id: 2, src: "/images/elements/MaM-elementos-01.jpg", alt: "Elementos MaM" },
  { id: 3, src: "/images/elements/MaM-padrao-02.jpg", alt: "Padrão MaM 2" },
  { id: 4, src: "/images/elements/MaM-padrao-03.jpg", alt: "Padrão MaM 3" },
  { id: 5, src: "/images/elements/MaM-elementos-02.jpg", alt: "Elementos MaM 2" },
  { id: 6, src: "/images/elements/MaM-padrao-04.jpg", alt: "Padrão MaM 4" },
  { id: 7, src: "/images/elements/MaM-padrao-05.jpg", alt: "Padrão MaM 5" },
  { id: 8, src: "/images/elements/MaM-padrao-06.jpg", alt: "Padrão MaM 6" },
  { id: 9, src: "/images/logos/logo-principal.png", alt: "Logo MaM" },
];

export default function Gallery() {
  return (
    <div>
      <p className="mb-8 max-w-2xl text-lg text-navy/70">
        Registros visuais da casa criativa, dos eventos e do universo Música aos
        Montes.
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_ITEMS.map((item, i) => {
          const tall = i === 0 || i === 4 || i === 7;
          return (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-xl ${
                tall ? "sm:row-span-2" : ""
              }`}
            >
              <div className={tall ? "h-full min-h-56 sm:min-h-80" : "aspect-[4/3]"}>
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={600}
                  height={tall ? 800 : 450}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-all duration-500 group-hover:opacity-100">
                <p className="translate-y-4 p-4 text-sm font-bold text-cream transition-transform duration-500 group-hover:translate-y-0">
                  {item.alt}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
