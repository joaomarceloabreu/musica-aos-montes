import Image from "next/image";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Espaço", href: "#espaco" },
  { label: "Serviços", href: "#servicos" },
  { label: "Artistas", href: "#artistas" },
  { label: "Galeria", href: "#galeria" },
  { label: "Contato", href: "#contato" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <circle cx="12" cy="12" r="5" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33A2.78 2.78 0 003.4 19.1c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.25 29 29 0 00-.46-5.43z" />
        <polygon points="9.75,15.02 15.5,11.75 9.75,8.48" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Spotify",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-5 w-5">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15c2.5-1 5.5-1 8 .5M7 12c3-1.5 7-1.5 10 .5M6.5 9c3.5-1.5 8.5-1.5 11.5 .5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-navy/10 bg-cream py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <Image
              src="/images/logos/MaM-logo_simbolo.png"
              alt="Música aos Montes"
              width={64}
              height={64}
              className="mb-6 h-14 w-auto"
            />
            <p className="max-w-xs text-sm leading-relaxed text-navy/60">
              Casa Criativa situada aos pés da Serra Do Curral, em Belo
              Horizonte - MG.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-navy">
              Navegação
            </h4>
            <nav className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm text-navy/60 transition-colors hover:text-purple"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-navy">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-navy/10 text-navy/60 transition-all hover:border-purple hover:text-purple"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-navy/10 pt-8 text-center">
          <p className="text-xs text-navy/40">
            &copy; {new Date().getFullYear()} Música aos Montes. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
