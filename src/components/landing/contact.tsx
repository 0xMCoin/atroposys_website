"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./reveal";

export function Contact() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const arrowX = useTransform(scrollYProgress, [0, 1], ["-10%", "8%"]);

  return (
    <section
      id="contato"
      ref={ref}
      className="relative overflow-hidden border-t border-atro-border px-5 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1480px]">
        <Reveal className="flex">
          <span className="mono-eyebrow ml-auto text-atro-text-muted">
            Tempo de resposta: &lt; 24h úteis · pt-BR / en
          </span>
        </Reveal>

        <Reveal delay={0.08} className="mt-10">
          <h2 className="atro-display text-[clamp(1.5rem,8vw,5rem)] leading-[0.92]">
            Vamos
            <br />
            <span className="inline-flex flex-wrap items-center gap-6">
              <em>construir</em>
              <motion.span
                aria-hidden
                style={{ x: arrowX }}
                className="hidden text-atro-primary-9 md:inline-block"
              >
                →
              </motion.span>
            </span>
            <br />
            <em>juntos.</em>
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-12 gap-x-6 gap-y-10 md:mt-16">
          <Reveal className="col-span-12 md:col-span-5">
            <span className="mono-eyebrow text-atro-text-muted">
              Conte o que precisa
            </span>
            <a
              href="mailto:atroposys@gmail.com"
              data-cursor="link"
              className="atro-display mt-3 ml-3 inline-block text-2xl text-atro-text underline decoration-atro-primary-9 decoration-[3px] underline-offset-[8px] transition-colors hover:text-atro-primary-9 md:text-4xl"
            >
              hello@atroposys.com
            </a>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-atro-text-secondary md:text-base">
              Manda uma linha sobre o problema, o estágio do produto e o que
              seria sucesso em 90 dias. A gente responde com um plano - não com
              brochura.
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="col-span-12 md:col-span-5 md:col-start-8"
          >
            <span className="mono-eyebrow text-atro-text-muted">
              Onde estamos
            </span>
            <ul className="mt-3 space-y-3 text-base md:text-lg">
              <li className="flex items-baseline justify-between gap-4 border-b border-atro-border pb-3">
                <span className="atro-display text-atro-text">
                  Curitiba
                </span>
                <span className="mono-eyebrow text-atro-text-muted">PR / BR</span>
              </li>
              <li className="flex items-baseline justify-between gap-4 border-b border-atro-border pb-3">
                <span className="atro-display text-atro-text">São Paulo</span>
                <span className="mono-eyebrow text-atro-text-muted">SP / BR</span>
              </li>
              <li className="flex items-baseline justify-between gap-4 border-b border-atro-border pb-3">
                <span className="atro-display text-atro-text">Remoto</span>
                <span className="mono-eyebrow text-atro-text-muted">
                  UTC-3 ± 4h
                </span>
              </li>
            </ul>

            <div className="mt-8">
              <a
                href="mailto:hello@atroposys.com?subject=Iniciar%20projeto%20com%20Atroposys"
                data-cursor="link"
                className="group inline-flex items-center gap-3 rounded-full bg-atro-primary-9 px-6 py-3 text-white transition-all duration-300 hover:bg-atro-primary-10 hover:shadow-[0_20px_50px_-15px] hover:shadow-atro-primary-9"
              >
                <span className="mono-eyebrow">Escrever para o time</span>
                <span
                  aria-hidden
                  className="text-xl transition-transform duration-300 group-hover:translate-x-1"
                >
                  →
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
