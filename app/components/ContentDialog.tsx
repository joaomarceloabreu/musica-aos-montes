"use client";

import { useEffect, type ReactNode } from "react";

interface ContentDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  variant?: "light" | "dark";
  children: ReactNode;
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function ContentDialog({
  open,
  onClose,
  title,
  variant = "light",
  children,
}: ContentDialogProps) {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  const isDark = variant === "dark";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6 md:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      <button
        type="button"
        className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
        onClick={onClose}
        aria-label="Fechar"
      />

      <div
        className={`relative flex max-h-[92vh] w-full animate-[fadeIn_0.25s_ease-out] flex-col overflow-hidden shadow-2xl sm:max-h-[88vh] sm:max-w-5xl sm:rounded-2xl ${
          isDark ? "bg-navy text-cream" : "bg-cream text-navy"
        }`}
      >
        <div
          className={`flex flex-shrink-0 items-center justify-between border-b px-5 py-4 sm:px-8 ${
            isDark ? "border-cream/10" : "border-navy/10"
          }`}
        >
          <h2 className="text-lg font-bold md:text-xl">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className={`rounded-full p-2 transition-colors ${
              isDark
                ? "text-cream/60 hover:bg-cream/10 hover:text-cream"
                : "text-navy/60 hover:bg-navy/5 hover:text-navy"
            }`}
            aria-label="Fechar"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="overflow-y-auto px-5 py-6 sm:px-8 sm:py-8">{children}</div>
      </div>
    </div>
  );
}
