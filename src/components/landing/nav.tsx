"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { BrandLockup } from "./brand";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { href: "#manifesto", label: "Manifesto" },
  { href: "#servicos", label: "Serviços" },
  { href: "#trabalhos", label: "Trabalhos" },
  { href: "#processo", label: "Processo" },
  { href: "#contato", label: "Contato" },
];

export function Nav() {
  const [condensed, setCondensed] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondensed(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[padding,background-color,border-color,backdrop-filter] duration-500",
        condensed
          ? "border-b border-atro-border bg-atro-canvas/80 py-2.5 backdrop-blur-md backdrop-saturate-150"
          : "border-b border-transparent py-4",
      )}
    >
      <div className="mx-auto flex w-full max-w-[1480px] items-center justify-between gap-4 px-5 md:px-8">
        <a
          href="#top"
          data-cursor="link"
          aria-label="Atroposys - início"
          className="group"
        >
          <BrandLockup badge="software house" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor="link"
              className="mono-eyebrow text-atro-text-secondary transition-colors hover:text-atro-primary-9"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#contato"
            data-cursor="link"
            className="group relative hidden items-center gap-2.5 rounded-full bg-atro-primary-9 px-4 py-2 text-white transition-all duration-300 hover:bg-atro-primary-10 hover:shadow-[0_10px_30px_-10px] hover:shadow-atro-primary-9 sm:inline-flex"
          >
            <span className="mono-eyebrow">Iniciar projeto</span>
            <span
              aria-hidden
              className="inline-block translate-y-px text-base leading-none transition-transform duration-300 group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
