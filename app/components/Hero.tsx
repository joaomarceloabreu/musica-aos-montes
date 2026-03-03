"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const onScroll = () => {
      if (!videoRef.current) return;
      const y = window.scrollY;
      videoRef.current.style.transform = `translateY(${y * 0.3}px) scale(1.1)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full origin-center scale-110 object-cover will-change-transform"
      >
        <source src="/movies/hero-video.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-navy/50 to-navy/80" />

      <div className="relative z-10 flex flex-col items-center gap-8">
        <Image
          src="/images/logos/MaM-logo_principal_negativa.png"
          alt="Música aos Montes"
          width={400}
          height={400}
          priority
          className="w-64 animate-[fadeIn_1.5s_ease-out] md:w-80 lg:w-96"
        />
        <p className="max-w-xl animate-[fadeIn_2s_ease-out] px-6 text-center text-lg font-light tracking-[0.2em] text-cream/90 md:text-xl">
          Casa Criativa
        </p>
      </div>

      <a
        href="#sobre"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce"
        aria-label="Rolar para baixo"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-cream/70"
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
