"use client";

import { useSyncExternalStore } from "react";

type Theme = "light" | "dark";

/**
 * Subscribe to the `data-theme` attribute on <html>. SSR-safe - returns
 * `null` during server render and on the very first client render before
 * hydration; updates reactively when the attribute changes (so multiple
 * mounted toggles stay in sync, and external scripts that flip the theme
 * propagate too).
 */
function useTheme(): Theme | null {
  const subscribe = (onChange: () => void) => {
    if (typeof window === "undefined") return () => {};
    const observer = new MutationObserver(onChange);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  };
  const getSnapshot = (): Theme | null => {
    if (typeof window === "undefined") return null;
    const v = document.documentElement.dataset.theme;
    return v === "dark" ? "dark" : v === "light" ? "light" : null;
  };
  const getServerSnapshot = (): Theme | null => null;
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/**
 * Toggle light/dark - espelha o `.theme-toggle` do DS oficial: pill com dot
 * + label uppercase. Persistência em `localStorage.atroposys-theme` (mesma
 * chave do bootstrap inline no <head>).
 */
export function ThemeToggle() {
  const theme = useTheme();

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("atroposys-theme", next);
    } catch {
      // localStorage indisponível (modo privado, iframe sandboxed) - ignorar.
    }
  };

  // Placeholder de mesmo tamanho até a hidratação - evita layout shift.
  if (theme === null) {
    return (
      <span
        aria-hidden
        className="atro-pill invisible"
        style={{ minWidth: "82px" }}
      >
        <span className="atro-pill__dot" />
        LIGHT
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-cursor="link"
      aria-label={`Alternar para tema ${theme === "dark" ? "light" : "dark"}`}
      className="atro-pill cursor-pointer transition-colors hover:border-atro-border-strong hover:text-atro-text"
    >
      {theme.toUpperCase()}
    </button>
  );
}
