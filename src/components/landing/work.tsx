import { Reveal } from "./reveal";

type WorkCase = {
  n: string;
  client: string;
  title: string;
  category: string;
  year: string;
};

const cases: WorkCase[] = [
  {
    n: "001",
    client: "PódioTicket",
    title: "Plataforma para venda de ingressos esportivos",
    category: "Web · Mobile · Backend",
    year: "26",
  },
  {
    n: "002",
    client: "Ribus",
    title: "Tokenização de imoveis web3",
    category: "Web · Mobile · Backend",
    year: "25",
  },
  {
    n: "003",
    client: "HypeApp",
    title: "Plataforma que conecta influenciadores e marcas de forma simples.",
    category: "Web · Mobile · Backend · Social",
    year: "25",
  },
  {
    n: "004",
    client: "Linksto.be",
    title: "Telemedicina com prontuário interoperável",
    category: "Mobile · Compliance · API",
    year: "24",
  },
];

export function Work() {
  return (
    <section id="trabalhos" className="relative px-5 py-20 md:px-8 md:py-32">
      <div className="mx-auto w-full max-w-[1480px]">
        <Reveal>
          <h2 className="atro-display text-[clamp(2rem,4.5vw,3.75rem)] md:max-w-[80%]">
            Quatro projetos. <em>Quatro problemas</em> que ninguém queria
            resolver.
          </h2>
        </Reveal>

        <div className="mt-14 border-t border-atro-border md:mt-20">
          {cases.map((c, i) => (
            <Reveal
              key={c.n}
              delay={i * 0.04}
              className="work-card group relative grid grid-cols-12 items-center gap-x-4 border-b border-atro-border py-6 md:py-9"
            >
              <a
                href="#contato"
                data-cursor="view"
                aria-label={`Ver case ${c.client}`}
                className="absolute inset-0 z-10"
              />
              <span className="mono-eyebrow col-span-2 text-atro-text-muted md:col-span-1">
                {c.n}
              </span>
              <div className="col-span-10 md:col-span-4">
                <h3 className="atro-display text-2xl text-atro-text transition-colors duration-300 group-hover:text-atro-primary-9 md:text-4xl">
                  {c.client}
                </h3>
                <p className="mt-1 text-sm text-atro-text-muted md:hidden">
                  {c.title}
                </p>
              </div>
              <p className="col-span-12 hidden text-base text-atro-text-secondary md:col-span-4 md:block">
                {c.title}
              </p>
              <div className="col-span-12 mt-3 flex items-center justify-between md:col-span-3 md:mt-0 md:justify-end md:gap-6">
                <span className="mono-eyebrow text-atro-text-muted">
                  {c.category}
                </span>
                <span className="mono-eyebrow text-atro-text">/{c.year}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-12 flex justify-end">
          <a
            href="#contato"
            data-cursor="link"
            className="group inline-flex items-center gap-3 border-b border-atro-text pb-1 text-atro-text"
          >
            <span className="mono-eyebrow">Pedir um portfólio completo</span>
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        </Reveal>
      </div>
    </section>
  );
}
