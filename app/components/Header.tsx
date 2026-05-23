"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { NAV_LINKS } from "../lib/nav-links";
import { useDialog } from "./DialogProvider";

function navLinkKey(link: (typeof NAV_LINKS)[number]) {
  return "dialog" in link ? link.dialog : link.href;
}

export default function Header() {
  const { openDialog } = useDialog();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV_LINKS.filter(
      (l): l is Extract<(typeof NAV_LINKS)[number], { id: string }> =>
        "id" in l && !!l.id
    )
      .map((l) => document.getElementById(l.id))
      .filter(Boolean) as HTMLElement[];

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

  const handleDialogOpen = (dialog: "galeria" | "na-midia") => {
    openDialog(dialog);
    setMenuOpen(false);
  };

  const desktopLinkClass = (link: (typeof NAV_LINKS)[number]) =>
    `relative text-xs font-bold uppercase tracking-widest transition-colors duration-200 ${
      scrolled
        ? "id" in link && activeSection === link.id
          ? "text-purple"
          : "text-navy hover:text-purple"
        : "id" in link && activeSection === link.id
          ? "text-turquoise"
          : "text-cream hover:text-turquoise"
    }`;

  const mobileLinkClass = (link: (typeof NAV_LINKS)[number]) =>
    `text-sm font-bold uppercase tracking-widest transition-colors ${
      "id" in link && activeSection === link.id
        ? "text-turquoise"
        : "text-cream hover:text-turquoise"
    }`;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-cream/95 shadow-md backdrop-blur-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="/" className="flex-shrink-0">
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
          {NAV_LINKS.map((link) =>
            "dialog" in link ? (
              <button
                key={navLinkKey(link)}
                type="button"
                onClick={() => handleDialogOpen(link.dialog)}
                className={desktopLinkClass(link)}
              >
                {link.label}
              </button>
            ) : (
              <a
                key={navLinkKey(link)}
                href={link.href}
                {...("external" in link && link.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className={desktopLinkClass(link)}
              >
                {link.label}
                {"id" in link && activeSection === link.id && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-current transition-all" />
                )}
              </a>
            )
          )}
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
          menuOpen ? "max-h-[36rem]" : "max-h-0"
        }`}
      >
        <nav className="bg-navy/95 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-6 px-6 py-8">
            {NAV_LINKS.map((link) =>
              "dialog" in link ? (
                <button
                  key={navLinkKey(link)}
                  type="button"
                  onClick={() => handleDialogOpen(link.dialog)}
                  className={mobileLinkClass(link)}
                >
                  {link.label}
                </button>
              ) : (
                <a
                  key={navLinkKey(link)}
                  href={link.href}
                  {...("external" in link && link.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={() => setMenuOpen(false)}
                  className={mobileLinkClass(link)}
                >
                  {link.label}
                </a>
              )
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
