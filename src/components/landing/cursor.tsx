"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * SSR-safe subscription to `matchMedia` via useSyncExternalStore.
 * Returns false during SSR; updates reactively on the client.
 */
function useMediaQuery(query: string) {
  const subscribe = (onChange: () => void) => {
    if (typeof window === "undefined") return () => { };
    const mql = window.matchMedia(query);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  };
  const getSnapshot = () => {
    if (typeof window === "undefined") return false;
    return window.matchMedia(query).matches;
  };
  const getServerSnapshot = () => false;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Editorial dot+ring cursor. Three modes:
 *   - default: small ring with difference blend (works on any background)
 *   - link: bigger ring, same treatment - for any clickable
 *   - view: large solid primary-9 disk with rotating "VER PROJETO" text
 *           around the edge + center arrow - for work case cards
 *
 * Dot follows pointer 1:1; ring trails with spring physics.
 */
export function Cursor() {
  const mx = useMotionValue(-100);
  const my = useMotionValue(-100);
  const ringX = useSpring(mx, { stiffness: 240, damping: 28, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 240, damping: 28, mass: 0.6 });

  const [mode, setMode] = useState<"default" | "link" | "view">("default");
  const enabled = useMediaQuery("(hover: hover) and (pointer: fine)");
  const rafRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        mx.set(e.clientX);
        my.set(e.clientY);
      });

      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, [role='button'], [data-cursor]",
      ) as HTMLElement | null;
      if (!interactive) {
        setMode("default");
        return;
      }
      const kind = interactive.getAttribute("data-cursor");
      if (kind === "view") setMode("view");
      else setMode("link");
    };

    const onLeave = () => {
      mx.set(-100);
      my.set(-100);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, mx, my]);

  if (!enabled) return null;

  return (
    <>
      {/* Dot - segue o pointer 1:1 */}
      <motion.div
        aria-hidden
        className="atro-cursor pointer-events-none fixed left-0 top-0 z-[100] h-1.5 w-1.5 rounded-full bg-atro-text"
        style={{
          x: mx,
          y: my,
          translateX: "-50%",
          translateY: "-50%",
          opacity: mode === "view" ? 0 : 1,
        }}
      />

      {/* Ring - trail com spring; muda forma/cor por modo */}
      <motion.div
        aria-hidden
        className="atro-cursor pointer-events-none fixed left-0 top-0 z-[99] flex items-center justify-center rounded-full"
        style={{
          x: ringX,
          y: ringY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: mode === "view" ? 116 : mode === "link" ? 54 : 32,
          height: mode === "view" ? 116 : mode === "link" ? 54 : 32,
          backgroundColor:
            mode === "view" ? "var(--atro-primary-9)" : "transparent",
          borderColor:
            mode === "view" ? "transparent" : "var(--atro-text-primary)",
          borderWidth: mode === "view" ? 0 : 1,
          mixBlendMode: mode === "view" ? "normal" : "difference",
          boxShadow:
            mode === "view"
              ? "0 20px 50px -10px rgba(233,48,54,0.55), 0 0 0 1px rgba(255,255,255,0.08) inset"
              : "0 0 0 0 transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24, mass: 0.5 }}
      >
        {mode === "view" && <ViewCursorBadge />}
      </motion.div>
    </>
  );
}

/**
 * Conteúdo do cursor no modo "view":
 *  - SVG com textPath fazendo "VER PROJETO · VER CASE · " seguir o contorno do
 *    círculo, com rotação contínua em loop (12s)
 *  - Seta `→` ao centro, em Fira Sans Extrabold
 */
function ViewCursorBadge() {
  return (
    <>
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 h-full w-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        aria-hidden
      >
        <defs>
          <path
            id="atro-cursor-circle"
            d="M 50,50 m -39,0 a 39,39 0 1,1 78,0 a 39,39 0 1,1 -78,0"
            fill="none"
          />
        </defs>
        <text
          fill="#FCFCFD"
          fontSize="9.5"
          letterSpacing="4"
          style={{
            fontFamily: "var(--atro-font-mono)",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          {/* Texto natural (~208px) é ~37px mais curto que o perímetro do
              círculo (~245px). Esse gap natural vira o respiro do seam.
              O "·" no INÍCIO (não no fim) garante que ao dar a volta o
              separador apareça depois do gap, formando leitura consistente:
              "...VER CASE [gap] · VER PROJETO..." em qualquer rotação.
              Sem textLength: spacing fica uniforme, sem distorção. */}
          <textPath href="#atro-cursor-circle" startOffset="0">
            · VER PROJETO · VER CASE
          </textPath>
        </text>
      </motion.svg>

      <span
        aria-hidden
        className="atro-display relative z-10 text-2xl leading-none text-white"
      >
        →
      </span>
    </>
  );
}
