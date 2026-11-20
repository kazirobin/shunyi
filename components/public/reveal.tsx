"use client";

import { useEffect } from "react";
import { prefersReduced } from "./motion";

/**
  Marks the page as animated, then reveals every [data-reveal] block as it scrolls in.
  Content stays visible without JavaScript and with reduced motion.
*/
export function Reveal() {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".sy.page");
    if (!root) return;
    root.classList.add("is-ready");
    if (prefersReduced()) {
      root.classList.add("is-still");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    root.querySelectorAll("[data-reveal]").forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
