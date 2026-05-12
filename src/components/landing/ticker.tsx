import { Marquee } from "./marquee";

const tokens = [
  "Engenharia",
  "Design",
  "IA aplicada",
  "Cloud",
  "Produto",
  "Mobile",
  "Discovery",
  "DevOps",
];

export function Ticker() {
  return (
    <section
      aria-label="O que fazemos"
      className="border-y border-atro-border bg-atro-subtle py-6"
    >
      <Marquee duration={42}>
        {tokens.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="atro-display mx-7 flex items-center gap-7 text-[clamp(1.9rem,5.5vw,4.5rem)] text-atro-text"
          >
            <span>
              <em>{t}</em>
            </span>
            <span
              aria-hidden
              className="inline-block h-3 w-3 rounded-full bg-atro-primary-9"
              style={{ boxShadow: "0 0 16px var(--atro-primary-9)" }}
            />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
