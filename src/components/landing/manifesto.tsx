"use client";

import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./reveal";

const tenets = [
  {
    n: "01",
    title: "Cada linha é decisão de negócio.",
    body: "Não escrevemos código por código. Cada escolha é uma alavanca de velocidade, custo ou risco - e isso fica explícito antes da primeira branch.",
  },
  {
    n: "02",
    title: "Tokens são a única fonte da verdade.",
    body: "O mesmo princípio do nosso Design System se aplica ao código: nada de valores soltos. Decisões viram tokens, tokens viram contrato, contrato vira sistema.",
  },
  {
    n: "03",
    title: "Times pequenos, problemas grandes.",
    body: "Squads de 3 a 6 pessoas senior, dedicadas e contínuas. Sem hand-offs, sem caixa-preta - você vê o tabuleiro inteiro.",
  },
];

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const bigY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-22%"]);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative overflow-hidden px-5 py-20 md:px-8 md:py-32"
    >
      {/* Decorative oversized word in background */}
      <motion.div
        aria-hidden
        style={{ y: bigY }}
        className="atro-display pointer-events-none absolute -right-10 top-10 select-none text-[30vw] leading-none text-atro-text/[0.04] md:-right-16"
      >
        manifesto
      </motion.div>

      <div className="relative mx-auto grid w-full max-w-[1480px] grid-cols-12 gap-x-6 gap-y-12">
        <Reveal className="col-span-12 md:col-span-4">
          <h2 className="atro-display text-[clamp(2rem,4.5vw,3.75rem)]">
            Software <em>deveria</em>
            <br />
            resolver, não
            <br />
            <em>complicar.</em>
          </h2>
        </Reveal>

        <div className="col-span-12 grid grid-cols-1 gap-y-10 md:col-span-7 md:col-start-6 md:gap-y-12">
          {tenets.map((t, i) => (
            <Reveal
              key={t.n}
              delay={i * 0.08}
              className="grid grid-cols-12 items-baseline gap-x-4 border-t border-atro-border pt-5"
            >
              <span className="mono-eyebrow col-span-2 text-atro-primary-9 md:col-span-1">
                {t.n}
              </span>
              <div className="col-span-10 md:col-span-11">
                <h3 className="atro-heading text-xl text-atro-text md:text-2xl">
                  {t.title}
                </h3>
                <p className="mt-2.5 max-w-prose text-[15px] leading-relaxed text-atro-text-secondary md:text-base">
                  {t.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
