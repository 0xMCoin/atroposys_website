"use client";

import { motion, useReducedMotion } from "framer-motion";
import { type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
  as?: "div" | "section" | "li" | "span";
};

/**
 * Generic reveal-on-scroll wrapper. Slides up + fades in once when the element
 * enters the viewport. Respects prefers-reduced-motion (renders static).
 *
 * Note: kept intentionally narrow on props (no `...rest`) — `as` polymorphism
 * conflicts with framer-motion's strict per-element HTMLMotionProps. None of
 * the callers need extra DOM props.
 */
export function Reveal({
  children,
  delay = 0,
  y = 32,
  className,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();

  const initial = reduce ? false : { opacity: 0, y };
  const whileInView = reduce ? undefined : { opacity: 1, y: 0 };
  const transition = reduce
    ? undefined
    : { duration: 0.9, delay, ease: [0.16, 0.84, 0.24, 1] as const };
  const viewport = reduce
    ? undefined
    : { once: true, margin: "-12% 0px -8% 0px" };

  switch (as) {
    case "section":
      return (
        <motion.section
          className={className}
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          transition={transition}
        >
          {children}
        </motion.section>
      );
    case "li":
      return (
        <motion.li
          className={className}
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          transition={transition}
        >
          {children}
        </motion.li>
      );
    case "span":
      return (
        <motion.span
          className={className}
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          transition={transition}
        >
          {children}
        </motion.span>
      );
    default:
      return (
        <motion.div
          className={className}
          initial={initial}
          whileInView={whileInView}
          viewport={viewport}
          transition={transition}
        >
          {children}
        </motion.div>
      );
  }
}

/**
 * Splits a string into spans (per-word) for staggered reveals.
 * Use for headlines where each word should reveal independently.
 *
 * `immediate` (default true): anima no mount via `animate`. Use isso quando
 * o componente está acima da fold (hero) ou dentro de um parent que pode
 * confundir o IntersectionObserver (transform/opacity dinâmicos).
 *
 * `immediate={false}`: usa `whileInView` — anima quando entra no viewport.
 * Bom pra headlines que estão abaixo da fold.
 */
export function RevealWords({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
  stagger?: number;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const words = text.split(/(\s+)/);

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={className}>
      {words.map((w, i) => {
        if (/\s+/.test(w)) return <span key={`s-${i}`}> </span>;
        const transition = {
          duration: 0.9,
          delay: delay + i * stagger * 0.5,
          ease: [0.16, 0.84, 0.24, 1] as const,
        };
        return (
          <span
            key={`w-${i}`}
            className="inline-block overflow-hidden align-bottom"
          >
            <motion.span
              className={`inline-block ${wordClassName ?? ""}`}
              initial={{ y: "110%" }}
              {...(immediate
                ? { animate: { y: "0%" } }
                : {
                    whileInView: { y: "0%" },
                    viewport: { once: true, margin: "-10% 0px" },
                  })}
              transition={transition}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </span>
  );
}
