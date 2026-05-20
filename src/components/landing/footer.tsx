import { BrandSymbol } from "./brand";

const social = [
  { label: "Instagram", href: "#" },
];

const nav = [
  { label: "Manifesto", href: "#manifesto" },
  { label: "Serviços", href: "#servicos" },
  { label: "Trabalhos", href: "#trabalhos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="overflow-hidden border-t border-atro-border bg-atro-canvas px-5 pb-28 pt-12 md:px-8 md:pb-44 md:pt-16">
      <div className="mx-auto w-full max-w-[1480px]">
        {/* Wordmark - atropo + sys (sys em primary-9). Overflow-hidden +
            whitespace-nowrap evitam scroll horizontal em viewports estreitas. */}
        <div className="flex items-center gap-5 overflow-hidden md:gap-8">
          <div className="hidden shrink-0 text-atro-primary-9 md:block">
            <BrandSymbol size={124} />
          </div>
          <div
            aria-hidden
            className="atro-display select-none whitespace-nowrap text-[clamp(2.4rem,11vw,9rem)] leading-[0.82] text-atro-text"
          >
            Atropo<span className="text-atro-primary-9">sys</span>
          </div>
        </div>

        {/* Grid responsivo: mobile 2 cols (Navegar/Social lado a lado, Contato
            full-width abaixo); md+ 12 cols com pesos 5/3/4. Wrap natural
            preserva alinhamento em qualquer largura entre 320 e 1480px. */}
        <div className="mt-12 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-atro-border pt-8 md:mt-16 md:grid-cols-12 md:gap-x-8">
          <div className="col-span-1 md:col-span-5">
            <span className="mono-eyebrow text-atro-text-muted">Navegar</span>
            <ul className="mt-3 space-y-2">
              {nav.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    data-cursor="link"
                    className="text-base text-atro-text transition-colors hover:text-atro-primary-9"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-3">
            <span className="mono-eyebrow text-atro-text-muted">Social</span>
            <ul className="mt-3 space-y-2">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    data-cursor="link"
                    className="group inline-flex items-center gap-2 text-base text-atro-text transition-colors hover:text-atro-primary-9"
                  >
                    {s.label}
                    <span
                      aria-hidden
                      className="inline-block transition-transform group-hover:translate-x-0.5"
                    >
                      ↗
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-4 md:text-right">
            <span className="mono-eyebrow text-atro-text-muted">Contato</span>
            <p className="mt-3 break-all text-base text-atro-text md:break-normal">
              contato@atroposys.com
            </p>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-atro-border pt-5 md:flex-row md:items-center">
          <span className="mono-eyebrow text-atro-text-muted">
            © {year} Atroposys - Todos os direitos reservados
          </span>
          <span className="mono-eyebrow text-atro-text-muted">
            Feito com cuidado em BR · Design system v1.0
          </span>
        </div>
      </div>
    </footer>
  );
}
