"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FloatingPaths } from "./background-paths";

/**
 * Hero v2 - reconstruído em torno do background `FloatingPaths` (kokonut/21st).
 *
 * Decisões de design:
 *  - Os paths animados SÃO o visual - dropei o `HeroVisual` (editor de código),
 *    que competiria visualmente. Hero agora é minimalista, centrado, dramático.
 *  - Letter-stagger spring no headline herdado do componente original
 *    (stiffness 150 / damping 25 - bate com `--atro-easing-spring` do DS).
 *  - CTAs em pill com `backdrop-blur` pra parecerem "embutidos" no campo
 *    de paths, e não simplesmente sobrepostos.
 *  - Stats ancorados no fundo do section sobre uma faixa `backdrop-blur-sm` -
 *    legibilidade preservada mesmo sobre as linhas animadas.
 *  - Parallax sutil de opacity no conteúdo central conforme rola pra baixo;
 *    paths ficam estáticos (já têm animação própria infinita).
 *
 * Performance: 36 paths × 2 layers = 72 motion.path com animação infinite,
 * GPU-composable mas pesado em low-end mobile. Letter-stagger fire-once.
 * `prefers-reduced-motion` desliga stagger e o parallax de opacity.
 */
export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const contentOpacity = useTransform(
    scrollYProgress,
    [0, 0.85],
    [1, reduce ? 1 : 0.15],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0, 1],
    ["0%", reduce ? "0%" : "12%"],
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-atro-canvas"
    >
      {/* Background: 2 layers de paths cruzados */}
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Faixa radial sutil pra atenuar paths no centro e priorizar o texto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 45%, var(--atro-canvas) 0%, transparent 70%)",
          opacity: 0.55,
        }}
      />

      {/* Conteúdo central */}
      <motion.div
        style={{ opacity: contentOpacity, y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-[1480px] flex-1 flex-col items-center justify-center px-5 pb-16 pt-28 text-center md:px-8 md:pb-20 md:pt-32"
      >
        {/* Eyebrow pill */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className=""
        >
          <span className="">
            Software house · Engenharia · Design · IA
          </span>
        </motion.div>

        {/* Headline com letter-stagger spring */}
        <h1 className="atro-display mt-7 max-w-[18ch] text-[clamp(2.5rem,7.5vw,6.75rem)] leading-[0.95]">
          <StaggeredLine text="Construímos software" baseDelay={0} reduce={reduce} />
          <br />
          <em className="text-atro-primary-9">
            <StaggeredLine
              text="que move negócios."
              baseDelay={0.18}
              reduce={reduce}
            />
          </em>
        </h1>

        {/* Subtitle */}
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: reduce ? 0 : 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-body mt-7 max-w-[52ch] text-[15px] leading-relaxed text-atro-text-secondary md:text-base"
        >
          Engenharia de produto, design e IA aplicada para times que precisam
          crescer sem quebrar o stack. Discovery, build e operação em ciclos
          curtos.
        </motion.p>

        {/* CTAs - estilo "embedded" com backdrop-blur */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.7,
            delay: reduce ? 0 : 1.0,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <a
            href="#contato"
            data-cursor="link"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-atro-primary-9 px-6 py-3.5 text-white shadow-[0_18px_50px_-18px] shadow-atro-primary-9 transition-all duration-300 hover:bg-atro-primary-10 hover:shadow-[0_22px_60px_-14px] hover:-translate-y-0.5"
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
            className="group inline-flex items-center gap-3 rounded-full border border-atro-border bg-atro-canvas/70 px-6 py-3.5 text-atro-text backdrop-blur-md backdrop-saturate-150 transition-all duration-300 hover:-translate-y-0.5 hover:border-atro-border-strong hover:bg-atro-canvas/90"
          >
            <span className="mono-eyebrow">Ver trabalhos</span>
            <span
              aria-hidden
              className="inline-block transition-transform duration-300 group-hover:translate-y-0.5"
            >
              ↓
            </span>
          </a>
        </motion.div>
      </motion.div>

      {/* Stats slim ancorados na base, sobre faixa blur pra legibilidade */}
      <div className="relative z-10 border-t border-atro-border/60 bg-atro-canvas/55 backdrop-blur-md backdrop-saturate-150">
        <div className="mx-auto grid w-full max-w-[1480px] grid-cols-2 gap-y-4 px-5 py-5 md:grid-cols-5 md:px-8 md:py-6">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                delay: reduce ? 0 : 1.2 + i * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="flex flex-col gap-1"
            >
              <div className="atro-display text-2xl text-atro-text md:text-3xl">
                <em>{s.n}</em>
              </div>
              <div className="mono-eyebrow text-atro-text-muted">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- subcomponents ---------- */

const STATS = [
  { n: "07", label: "anos construindo" },
  { n: "42", label: "projetos entregues" },
  { n: "18", label: "clientes ativos" },
  { n: "100%", label: "código nosso, seu" },
  { n: "<24h", label: "tempo de resposta" },
];

/**
 * Renderiza uma linha quebrando em letras com spring stagger.
 * Mantém `inline-block` em cada letra pra permitir o y-translate inicial.
 * Respeita `prefers-reduced-motion` retornando texto plano.
 */
function StaggeredLine({
  text,
  baseDelay,
  reduce,
}: {
  text: string;
  baseDelay: number;
  reduce: boolean | null;
}) {
  if (reduce) return <>{text}</>;

  const words = text.split(" ");
  let letterIdx = 0;

  return (
    <>
      {words.map((word, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((char) => {
            const delay = baseDelay + letterIdx * 0.025;
            letterIdx += 1;
            return (
              <motion.span
                key={`${wi}-${letterIdx}`}
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{
                  delay,
                  type: "spring",
                  stiffness: 150,
                  damping: 25,
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            );
          })}
          {wi < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </>
  );
}
