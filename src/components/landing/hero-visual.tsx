"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Hero visual - editor de código animado mostrando `atroposys.config.ts`.
 *
 * Estilo Aceternity-inspired (window chrome + code reveal staggered + caret
 * pulsando), porém implementado direto com framer-motion (já no projeto)
 * para evitar inflar o bundle com a lib do Aceternity.
 *
 * Decisões de design:
 *  - O snippet referencia os tokens reais do DS Atroposys (--primary-9, fontes,
 *    radius, motion) - reforça a narrativa "tokens são a fonte da verdade".
 *  - Syntax highlighting feito inline com classes Tailwind - sem Prism/Shiki,
 *    sem reflow no carregamento.
 *  - Reveal linha-a-linha em vez de typewriter caractere-por-caractere: mais
 *    performático e mais legível.
 */
export function HeroVisual() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-label="Editor mostrando tokens do Design System Atroposys"
      className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-atro-surface-dark shadow-[0_30px_80px_-30px_rgba(0,0,0,0.5)]"
    >
      <WindowChrome />

      {/* Editor body */}
      <div className="relative grid grid-cols-[auto_1fr] gap-x-3 px-4 pb-5 pt-4 font-mono text-[12px] leading-[1.65] md:px-5 md:pb-6 md:pt-5 md:text-[13px]">
        {/* Gutter de números */}
        <div className="flex flex-col text-right text-white/30 select-none">
          {LINES.map((_, i) => (
            <span key={i} className="tabular-nums">
              {String(i + 1).padStart(2, "0")}
            </span>
          ))}
        </div>

        {/* Código */}
        <code className="flex flex-col whitespace-pre">
          {LINES.map((line, i) => (
            <motion.span
              key={i}
              initial={reduce ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.5,
                delay: reduce ? 0 : 0.4 + i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="min-h-[1.7em]"
            >
              {line.length === 0 ? " " : renderTokens(line)}
            </motion.span>
          ))}
          {/* Caret pulsando ao fim da última linha */}
          <span className="inline-flex items-center">
            <motion.span
              aria-hidden
              className="ml-1 inline-block h-[1.1em] w-[0.5ch] translate-y-[2px] bg-atro-primary-9"
              animate={reduce ? undefined : { opacity: [1, 0, 1] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          </span>
        </code>
      </div>

      {/* Status bar inferior */}
      <div className="flex items-center justify-between border-t border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-medium uppercase tracking-[0.14em] text-white/60 md:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-atro-primary-9" />
            main
          </span>
          <span className="hidden text-white/30 md:inline">·</span>
          <span className="hidden md:inline">tokens.ts</span>
        </div>
        <span>UTF-8 · LF · TS</span>
      </div>
    </div>
  );
}

/* ---------- Window chrome (titlebar estilo macOS) ---------- */

function WindowChrome() {
  return (
    <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-4 py-3 md:px-5">
      <div className="flex items-center gap-1.5">
        <span className="h-3 w-3 rounded-full bg-atro-primary-9/80" />
        <span className="h-3 w-3 rounded-full bg-[#FFC53D]" />
        <span className="h-3 w-3 rounded-full bg-[#46A758]" />
      </div>
      <span className="font-mono text-[11px] tracking-[0.08em] text-white/55">
        atroposys.config.ts
      </span>
      <span className="font-mono text-[11px] text-white/30">×</span>
    </div>
  );
}

/* ---------- Linhas do snippet (single source of truth) ---------- */

type CodeLine = Token[];
type Token =
  | { kind: "kw"; v: string }
  | { kind: "fn"; v: string }
  | { kind: "str"; v: string }
  | { kind: "num"; v: string }
  | { kind: "cmt"; v: string }
  | { kind: "prop"; v: string }
  | { kind: "punc"; v: string }
  | { kind: "txt"; v: string };

const LINES: CodeLine[] = [
  [{ kind: "cmt", v: "// atroposys design system v1.0" }],
  [],
  [
    { kind: "kw", v: "import" },
    { kind: "txt", v: " { " },
    { kind: "fn", v: "defineConfig" },
    { kind: "txt", v: " } " },
    { kind: "kw", v: "from" },
    { kind: "txt", v: " " },
    { kind: "str", v: "'@atroposys/tokens'" },
  ],
  [],
  [
    { kind: "kw", v: "export default" },
    { kind: "txt", v: " " },
    { kind: "fn", v: "defineConfig" },
    { kind: "punc", v: "({" },
  ],
  [
    { kind: "txt", v: "  " },
    { kind: "prop", v: "primary" },
    { kind: "punc", v: ":" },
    { kind: "txt", v: " " },
    { kind: "str", v: "'#E93036'" },
    { kind: "punc", v: "," },
  ],
  [
    { kind: "txt", v: "  " },
    { kind: "prop", v: "display" },
    { kind: "punc", v: ":" },
    { kind: "txt", v: " " },
    { kind: "str", v: "'Fira Sans Extrabold'" },
    { kind: "punc", v: "," },
  ],
  [
    { kind: "txt", v: "  " },
    { kind: "prop", v: "radius" },
    { kind: "punc", v: ": {" },
    { kind: "txt", v: " " },
    { kind: "prop", v: "sm" },
    { kind: "punc", v: ":" },
    { kind: "txt", v: " " },
    { kind: "num", v: "8" },
    { kind: "punc", v: "," },
    { kind: "txt", v: " " },
    { kind: "prop", v: "md" },
    { kind: "punc", v: ":" },
    { kind: "txt", v: " " },
    { kind: "num", v: "12" },
    { kind: "txt", v: " " },
    { kind: "punc", v: "}," },
  ],
  [
    { kind: "txt", v: "  " },
    { kind: "prop", v: "motion" },
    { kind: "punc", v: ": {" },
    { kind: "txt", v: " " },
    { kind: "prop", v: "fast" },
    { kind: "punc", v: ":" },
    { kind: "txt", v: " " },
    { kind: "num", v: "180" },
    { kind: "punc", v: "," },
    { kind: "txt", v: " " },
    { kind: "prop", v: "base" },
    { kind: "punc", v: ":" },
    { kind: "txt", v: " " },
    { kind: "num", v: "260" },
    { kind: "txt", v: " " },
    { kind: "punc", v: "}," },
  ],
  [
    { kind: "txt", v: "  " },
    { kind: "prop", v: "mission" },
    { kind: "punc", v: ":" },
    { kind: "txt", v: " " },
    { kind: "str", v: "'tokens são a fonte da verdade'" },
    { kind: "punc", v: "," },
  ],
  [{ kind: "punc", v: "})" }],
];

function renderTokens(line: Token[]) {
  return line.map((t, i) => (
    <span key={i} className={CLASSES[t.kind]}>
      {t.v}
    </span>
  ));
}

const CLASSES: Record<Token["kind"], string> = {
  kw: "text-atro-primary-9",
  fn: "text-[#FFC53D]",
  str: "text-[#46A758]",
  num: "text-atro-secondary-9",
  cmt: "text-white/35 italic",
  prop: "text-white/95",
  punc: "text-white/45",
  txt: "text-white/70",
};
