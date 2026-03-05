"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Sobre", href: "#sobre", id: "sobre" },
  { label: "Espaço", href: "#espaco", id: "espaco" },
  { label: "Serviços", href: "#servicos", id: "servicos" },
  { label: "Selo", href: "#selo", id: "selo" },
  { label: "Ouça", href: "#playlist", id: "playlist" },
  { label: "Eventos", href: "#eventos", id: "eventos" },
  { label: "Educação", href: "#educacao", id: "educacao" },
  { label: "Imprensa", href: "#imprensa", id: "imprensa" },
  { label: "Galeria", href: "#galeria", id: "galeria" },
  { label: "Contato", href: "#contato", id: "contato" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      Boolean
    ) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          setActiveSection(visible[0].target.id);
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#" className="flex-shrink-0">
          <Image
            src={
              scrolled
                ? "/images/logos/logo-azul-escuro.png"
                : "/images/logos/logo-bege.png"
            }
            alt="Música aos Montes"
            width={48}
            height={48}
            className="h-10 w-auto transition-all duration-300 md:h-12"
          />
        </a>

        <nav className="hidden items-center gap-5 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
                scrolled
                  ? activeSection === link.id
                    ? "text-purple"
                    : "text-navy hover:text-purple"
                  : activeSection === link.id
                    ? "text-turquoise"
                    : "text-cream hover:text-turquoise"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-current transition-all" />
              )}
            </a>
          ))}
        </nav>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`flex flex-col gap-1.5 lg:hidden ${
            scrolled ? "text-navy" : "text-cream"
          }`}
          aria-label="Menu"
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen ? "translate-y-2 rotate-45" : ""
            } ${scrolled ? "bg-navy" : "bg-cream"}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen ? "opacity-0" : ""
            } ${scrolled ? "bg-navy" : "bg-cream"}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              menuOpen ? "-translate-y-2 -rotate-45" : ""
            } ${scrolled ? "bg-navy" : "bg-cream"}`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-300 lg:hidden ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <nav className="bg-navy/95 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 px-6 py-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`text-sm font-bold uppercase tracking-widest transition-colors ${
                  activeSection === link.id
                    ? "text-turquoise"
                    : "text-cream hover:text-turquoise"
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}
