"use client";

import Lenis from "lenis";
import { useEffect, useRef, useState, type RefObject } from "react";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

export const prefersReduced = () =>
  typeof window !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Scroll to an element, riding Lenis when it's running. */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  const y = el.getBoundingClientRect().top + window.scrollY - 24;
  if (window.__lenis) window.__lenis.scrollTo(y, { duration: 1.4 });
  else window.scrollTo({ top: y, behavior: prefersReduced() ? "auto" : "smooth" });
  return true;
}

/** Eased, inertial page scroll for the public page only. Scenes read the real scroll position. */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReduced()) return;
    const lenis = new Lenis({ lerp: 0.1 });
    window.__lenis = lenis;
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });
    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
      window.__lenis = undefined;
    };
  }, []);
  return null;
}

/** True once the element has come into view. Stays true. */
export function useSeen<T extends Element>(threshold = 0.25): [RefObject<T | null>, boolean] {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, seen];
}

/**
  Progress through a tall, pinned section: 0 when its top reaches the top of the viewport,
  1 when its bottom reaches the bottom. Calls fn on every scroll frame while near.
*/
export function usePinProgress<T extends HTMLElement>(fn: (p: number) => void) {
  const ref = useRef<T>(null);
  const cb = useRef(fn);
  useEffect(() => {
    cb.current = fn;
  });
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const run = () => {
      raf = 0;
      const r = el.getBoundingClientRect();
      const span = r.height - innerHeight;
      cb.current(span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0);
    };
    const on = () => {
      if (!raf) raf = requestAnimationFrame(run);
    };
    run();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
      cancelAnimationFrame(raf);
    };
  }, []);
  return ref;
}
