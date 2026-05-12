import { Marquee } from "./marquee";
import { Reveal } from "./reveal";

const row1 = [
  "TypeScript",
  "React",
  "Next.js",
  "Node",
  "Python",
  "Go",
  "PostgreSQL",
  "Redis",
];

const row2 = [
  "AWS",
  "GCP",
  "Vercel",
  "Docker",
  "Kubernetes",
  "Terraform",
  "OpenAI",
  "Anthropic",
];

function Row({
  items,
  reverse,
  duration,
}: {
  items: string[];
  reverse?: boolean;
  duration: number;
}) {
  return (
    <Marquee duration={duration} reverse={reverse}>
      {items.map((t, i) => (
        <span
          key={`${t}-${i}`}
          className="atro-display mx-6 flex items-center gap-6 text-[clamp(1.8rem,4.5vw,3.5rem)] text-white"
        >
          <span>{t}</span>
          <span
            aria-hidden
            className="mono-eyebrow inline-block translate-y-[0.35em] text-atro-primary-9"
          >
            ✦
          </span>
        </span>
      ))}
    </Marquee>
  );
}

export function Stack() {
  return (
    <section className="relative bg-atro-surface-dark py-14 text-white md:py-20">
      <Reveal className="mx-auto mb-10 w-full max-w-[1480px] px-5 md:px-8">
        <p className="max-w-2xl text-base text-white/75 md:text-lg">
          Ferramentas são meio, não fim — mas a gente domina as nossas. Stack
          principal, atualizada a cada trimestre.
        </p>
      </Reveal>
      <div className="flex flex-col gap-3">
        <Row items={row1} duration={48} />
        <Row items={row2} duration={56} reverse />
      </div>
    </section>
  );
}
