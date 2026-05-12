"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { HeroVisual } from "./hero-visual";
import { RevealWords } from "./reveal";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden px-5 pb-10 pt-20 md:px-8 md:pb-12 md:pt-24"
    >
      <div className="mx-auto flex w-full max-w-[1480px] flex-1 flex-col">

        {/* Middle: display + subtitle + visual, centralizado verticalmente */}
        <motion.div
          style={{ y, opacity }}
          className="flex flex-1 flex-col justify-center py-8 md:py-10"
        >
          <div className="grid grid-cols-12 items-end gap-x-6 gap-y-8">
            {/* Display col 1-7 em desktop, alinhado bottom */}
            <h1 className="atro-display col-span-12 text-[clamp(2rem,5.5vw,5rem)] md:col-span-7">
              <RevealWords text="Construímos software" immediate />
              <br />
              <em>
                <RevealWords text="que move negócios." delay={0.06} immediate />
              </em>
            </h1>

            {/* Subtitle + CTAs col 8-12, alinhado bottom (junto da última linha do display) */}
            <div className="col-span-12 md:col-span-5 md:col-start-8">
              <p className="font-body text-[15px] leading-snug text-atro-text-secondary md:text-base">
                Engenharia de produto, design e IA aplicada para times que
                precisam crescer sem quebrar o stack. Discovery, build e
                operação em ciclos curtos.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href="#contato"
                  data-cursor="link"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-atro-primary-9 px-5 py-2.5 text-white transition-all duration-300 hover:bg-atro-primary-10 hover:shadow-[0_14px_40px_-12px] hover:shadow-atro-primary-9"
                >
                  <span className="mono-eyebrow">Iniciar projeto</span>
                  <span
                    aria-hidden
                    className="text-base transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </a>
                <a
                  href="#trabalhos"
                  data-cursor="link"
                  className="group inline-flex items-center gap-2.5 rounded-full border border-atro-border px-5 py-2.5 text-atro-text transition-colors hover:border-atro-border-strong"
                >
                  <span className="mono-eyebrow">Ver trabalhos</span>
                  <span
                    aria-hidden
                    className="inline-block transition-transform duration-300 group-hover:translate-x-1"
                  >
                    ↓
                  </span>
                </a>
              </div>
            </div>
          </div>

          {/* Visual abaixo do display+subtitle — centralizado horizontalmente
              com max-w para não ocupar a row inteira. */}
          <div className="mt-8 flex justify-center md:mt-10">
            <div className="w-full max-w-[820px]">
              <HeroVisual />
            </div>
          </div>
        </motion.div>

        {/* Bottom: stats */}
        <div className="grid grid-cols-2 gap-y-5 border-t border-atro-border pt-5 md:grid-cols-5 md:pt-6">
          {[
            { n: "07", label: "anos construindo" },
            { n: "42", label: "projetos entregues" },
            { n: "18", label: "clientes ativos" },
            { n: "100%", label: "código nosso, seu" },
            { n: "<24h", label: "tempo de resposta" },
          ].map((s) => (
            <div key={s.label} className="flex flex-col gap-1">
              <div className="atro-display text-3xl text-atro-text md:text-4xl">
                <em>{s.n}</em>
              </div>
              <div className="mono-eyebrow text-atro-text-muted">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
