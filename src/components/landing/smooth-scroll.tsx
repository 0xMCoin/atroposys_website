"use client";

import { useEffect } from "react";

/**
 * Lerp-based smooth scroll — same idea as Lenis/Locomotive, but inline.
 *
 * Hijacks `wheel` events and animates `window.scrollY` toward a target via
 * linear interpolation on rAF. Touch + reduced-motion fall back to native
 * momentum scroll.
 *
 * State sync — the tricky bit:
 *  - When something OTHER than this component changes `window.scrollY`
 *    (anchor link click, keyboard PageDown, browser restore, etc.), the
 *    internal `target`/`current` go stale. The next wheel tick would then
 *    yank the page back to the stale target.
 *  - Fix: tick re-reads `window.scrollY` each frame and re-syncs if it
 *    diverged beyond `SYNC_THRESHOLD_PX` from what we last wrote. We also
 *    listen for the `scroll` event so we can resync even when no wheel is
 *    active.
 *  - Anchor clicks: intercepted at the document level so the smooth-scroll
 *    itself does the jump (keeps state coherent + animation consistent).
 */
export function SmoothScroll() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;
    if (reduceMotion || isCoarse) {
      // On touch/reduced-motion we let the browser handle anchors natively.
      return;
    }

    const NAV_OFFSET = 72; // sticky nav height — anchors land below it
    const SYNC_THRESHOLD_PX = 8; // beyond this gap, force re-sync

    let target = window.scrollY;
    let current = window.scrollY;
    let lastWriteY = window.scrollY; // last position we wrote — used to detect external scroll
    let rafId = 0;
    let running = false;
    const ease = 0.1;

    const getMaxScroll = () =>
      document.documentElement.scrollHeight - window.innerHeight;

    const clampTarget = () => {
      const max = getMaxScroll();
      if (target < 0) target = 0;
      if (target > max) target = max;
    };

    const tick = () => {
      // If anything moved the page outside of our last write, re-sync.
      const actual = window.scrollY;
      if (Math.abs(actual - lastWriteY) > SYNC_THRESHOLD_PX) {
        current = actual;
        target = actual;
      }

      current += (target - current) * ease;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        window.scrollTo(0, current);
        lastWriteY = current;
        running = false;
        return;
      }
      window.scrollTo(0, current);
      lastWriteY = current;
      rafId = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(tick);
    };

    // Stop hijacking when the wheel originated inside a scrollable child
    // (modals, dropdowns, code blocks with their own overflow).
    const isInsideScrollable = (el: EventTarget | null) => {
      let node = el as HTMLElement | null;
      while (node && node !== document.body) {
        const style = window.getComputedStyle(node);
        const overflowY = style.overflowY;
        if (
          (overflowY === "auto" || overflowY === "scroll") &&
          node.scrollHeight > node.clientHeight
        ) {
          return true;
        }
        node = node.parentElement;
      }
      return false;
    };

    const onWheel = (e: WheelEvent) => {
      if (isInsideScrollable(e.target)) return;
      e.preventDefault();
      // Sync target with where the page actually is before adding deltaY —
      // covers the case where an anchor jump moved us without our knowledge.
      const actual = window.scrollY;
      if (Math.abs(actual - lastWriteY) > SYNC_THRESHOLD_PX) {
        current = actual;
        target = actual;
      }
      target += e.deltaY;
      clampTarget();
      start();
    };

    // External scroll (anchor without our handler, keyboard, programmatic
    // scrollTo) — sync silently. Throttled to next rAF to avoid feedback.
    let pendingSync = false;
    const onScroll = () => {
      if (running) return; // our own writes — let `tick` handle it
      if (pendingSync) return;
      pendingSync = true;
      requestAnimationFrame(() => {
        pendingSync = false;
        if (running) return;
        const actual = window.scrollY;
        if (Math.abs(actual - lastWriteY) > SYNC_THRESHOLD_PX) {
          current = actual;
          target = actual;
          lastWriteY = actual;
        }
      });
    };

    // Anchor clicks — preventDefault and route through our lerp so the
    // animation matches the rest of the page. Also keeps state in sync.
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const el = e.target as HTMLElement | null;
      const anchor = el?.closest("a") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("#") || href === "#") return;
      const id = decodeURIComponent(href.slice(1));
      const targetEl = document.getElementById(id);
      if (!targetEl) return;
      e.preventDefault();
      const rect = targetEl.getBoundingClientRect();
      target = window.scrollY + rect.top - NAV_OFFSET;
      clampTarget();
      start();
      // Update URL hash without an extra native scroll
      if (history.pushState) {
        history.pushState(null, "", href);
      }
    };

    const onResize = () => {
      target = window.scrollY;
      current = window.scrollY;
      lastWriteY = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return null;
}
