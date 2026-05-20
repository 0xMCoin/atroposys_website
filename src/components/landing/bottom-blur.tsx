/**
 * Faixa fixa de blur na base do viewport. Cria uma transição visual entre o
 * conteúdo que sai da fold e o footer/borda inferior, no estilo "frosted edge".
 *
 * Performance: `backdrop-filter` é GPU-acelerado mas custoso proporcional à
 * área pintada. Mantemos a altura curta (h-28/h-36 = 112/144px) e usamos um
 * único layer com `mask-image` em gradient para simular blur progressivo - bem
 * mais barato que empilhar 3-5 layers (técnica comum mas com custo de paint
 * multiplicado). `pointer-events: none` garante que cliques no footer/CTA
 * passam direto.
 *
 * Sem state/effects -> server component (zero JS no bundle).
 */
export function BottomBlur() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40 h-20 md:h-32"
    >
      {/* Layer 1: blur progressivo via mask. Sharp na base, esmaece pra cima. */}
      <div
        className="absolute inset-0"
        style={{
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          maskImage:
            "linear-gradient(to top, black 0%, black 35%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to top, black 0%, black 35%, transparent 100%)",
        }}
      />
      {/* Layer 2: tint sutil da cor do canvas pra ancorar a borda inferior
          (evita que o blur pareça "flutuando" sem fundo definido). */}
      <div className="absolute inset-0 bg-gradient-to-t from-atro-canvas/70 via-atro-canvas/20 to-transparent" />
    </div>
  );
}
