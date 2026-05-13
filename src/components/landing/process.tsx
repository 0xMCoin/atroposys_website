"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "./reveal";

const steps = [
  {
    n: "01",
    title: "Discovery",
    duration: "1–2 sem",
    body: "Imersão com stakeholders, mapa de problemas, hipóteses e métricas. Saímos com uma carta de intenções escrita a quatro mãos.",
  },
  {
    n: "02",
    title: "Estratégia & Arquitetura",
    duration: "1 sem",
    body: "Decisões técnicas críticas registradas em ADRs: stack, contratos, segurança, custos esperados. Sem zonas cinzentas.",
  },
  {
    n: "03",
    title: "Design de produto",
    duration: "2–3 sem",
    body: "Fluxos, design system e protótipo navegável. Validado com usuários reais - não só com o time interno.",
  },
  {
    n: "04",
    title: "Build em sprints",
    duration: "4–12 sem",
    body: "Sprints de uma semana, com demo ao vivo. Você acompanha o board, o repo e as deploys de homologação.",
  },
  {
    n: "05",
    title: "Lançamento & Iteração",
    duration: "Contínuo",
    body: "Hand-off técnico documentado, runbook de operação, e - se quiser - o squad continua iterando ao seu lado.",
  },
];

export function Process() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.1, 0.85], [0, 1]);

  return (
    <section
      id="processo"
      ref={ref}
      className="relative overflow-hidden bg-atro-subtle px-5 py-20 md:px-8 md:py-32"
    >
      <div className="mx-auto w-full max-w-[1480px]">
        <Reveal>
          <h2 className="atro-display text-[clamp(2rem,4.5vw,3.75rem)] md:max-w-[80%]">
            Cinco etapas. <em>Nada</em> de waterfall disfarçado de ágil.
          </h2>
        </Reveal>

        <div className="relative mt-14 grid grid-cols-12 gap-x-6 md:mt-20">
          {/* progress rail */}
          <div className="pointer-events-none absolute left-[calc(8.333%-1px)] top-0 hidden h-full md:block">
            <div className="relative h-full w-px bg-atro-border">
              <motion.div
                style={{ scaleY: lineScale, transformOrigin: "top" }}
                className="absolute inset-0 w-px bg-atro-primary-9"
              />
            </div>
          </div>

          <ul className="col-span-12 flex flex-col gap-10 md:gap-14">
            {steps.map((s, i) => (
              <Reveal
                key={s.n}
                as="li"
                delay={i * 0.06}
                className="grid grid-cols-12 items-baseline gap-x-4"
              >
                <span className="atro-display col-span-2 text-4xl text-atro-primary-9 md:col-span-1 md:text-5xl">
                  {s.n}
                </span>
                <div className="col-span-10 md:col-span-6 ml-4">
                  <h3 className="atro-display text-2xl text-atro-text md:text-4xl">
                    {s.title}
                  </h3>
                  <p className="mt-3 max-w-prose text-[15px] leading-relaxed text-atro-text-secondary md:text-base">
                    {s.body}
                  </p>
                </div>
                <div className="col-span-12 mt-3 md:col-span-4 md:col-start-9 md:mt-0">
                  <span className="mono-eyebrow inline-block rounded-full border border-atro-text px-3 py-1 text-atro-text">
                    {s.duration}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
