import { Reveal } from "./reveal";

const services = [
  {
    n: "01",
    title: "Produto Digital",
    body: "Discovery, design de produto e dev em um time só. Saímos do problema com uma solução medível.",
    tags: ["Discovery", "UX/UI", "Roadmap"],
  },
  {
    n: "02",
    title: "Engenharia Web & Mobile",
    body: "Aplicações em Next.js, React Native e Flutter. SSR, edge, real-time — o que o produto pedir.",
    tags: ["Next.js", "React Native", "Flutter"],
  },
  {
    n: "03",
    title: "IA & Automação",
    body: "LLMs em produção: RAG, agentes, orquestração e avaliação. IA que entrega valor, não demo.",
    tags: ["RAG", "Agentes", "Eval"],
  },
  {
    n: "04",
    title: "Cloud & DevOps",
    body: "Infra como código, pipelines, observabilidade e custos controlados. AWS, GCP, Vercel.",
    tags: ["Terraform", "Observability", "FinOps"],
  },
  {
    n: "05",
    title: "Squad as a Service",
    body: "Time dedicado embarcado no seu produto. Senior-heavy, sem rotatividade de salto em salto.",
    tags: ["Dedicado", "Senior", "Contínuo"],
  },
  {
    n: "06",
    title: "Modernização de Legados",
    body: "Migrações graduais, strangler-fig, refactor estratégico. Sem big-bang, sem parar o negócio.",
    tags: ["Migração", "Refactor", "Stack"],
  },
];

export function Services() {
  return (
    <section
      id="servicos"
      className="relative border-t border-atro-border bg-atro-surface-dark text-white"
    >
      <div className="mx-auto w-full max-w-[1480px] px-5 py-20 md:px-8 md:py-32">
        <div className="grid grid-cols-12 gap-x-6">
          <Reveal className="col-span-12 md:col-span-5">
            <h2 className="atro-display text-[clamp(2rem,4.5vw,3.75rem)]">
              Seis frentes, <em>um time</em> que entende o todo.
            </h2>
          </Reveal>
          <Reveal
            delay={0.1}
            className="col-span-12 mt-6 md:col-span-5 md:col-start-8 md:mt-2"
          >
            <p className="max-w-prose text-[15px] leading-relaxed text-white/75 md:text-base">
              Não somos uma fábrica de tickets. Cada engagement começa com uma
              pergunta crítica: o que precisa ser verdade daqui a 90 dias? A
              partir dali, escolhemos a frente — ou combinamos algumas.
            </p>
          </Reveal>
        </div>

        <ul className="mt-14 border-t border-white/15 md:mt-20">
          {services.map((s, i) => (
            <Reveal
              key={s.n}
              as="li"
              delay={i * 0.05}
              className="service-row group grid grid-cols-12 items-baseline gap-x-4 py-5 md:py-7"
            >
              <span className="mono-eyebrow col-span-2 text-white/55 md:col-span-1">
                {s.n}
              </span>
              <h3 className="atro-display col-span-10 text-[clamp(1.6rem,4vw,3rem)] md:col-span-5">
                {s.title}
              </h3>
              <p className="col-span-12 mt-3 max-w-prose text-[14px] text-white/75 md:col-span-4 md:col-start-7 md:mt-0 md:text-[15px]">
                {s.body}
              </p>
              <div className="col-span-12 mt-4 flex flex-wrap items-center justify-between gap-3 md:col-span-1 md:col-start-12 md:mt-0 md:justify-end">
                <div className="flex flex-wrap gap-2 md:hidden">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="mono-eyebrow rounded-full border border-white/25 px-2 py-1 text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="service-arrow inline-block text-3xl">
                  →
                </span>
              </div>
              <div className="col-span-12 mt-2 hidden flex-wrap gap-2 md:col-span-5 md:col-start-7 md:flex">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="mono-eyebrow rounded-full border border-white/20 px-2.5 py-1 text-white/55"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
