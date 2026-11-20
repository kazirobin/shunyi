"use client";

import { useId, useState } from "react";
import { Plus } from "./icons";
import type { Dict } from "./content";

/** Accordion: one open at a time, smooth height, the plus turns into a minus. */
export function Faq({ t }: { t: Dict }) {
  const [open, setOpen] = useState<number | null>(0);
  const uid = useId();

  return (
    <section className="faq" id="faq" aria-labelledby="faq-title">
      <div className="faq-grid">
        <div className="faq-head" data-reveal>
          <p className="eyebrow">{t.faq.eyebrow}</p>
          <h2 id="faq-title">{t.faq.title}</h2>
          <div className="faq-moq">
            <strong>500</strong>
            <span>
              {t.faq.moq[0]}
              <br />
              {t.faq.moq[1]}
            </span>
          </div>
        </div>

        <ul className="faq-list">
          {t.faq.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className={`qa${isOpen ? " is-open" : ""}`}>
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`${uid}-a-${i}`}
                    id={`${uid}-q-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                  >
                    {item.q}
                    <span className="qa-icon" aria-hidden>
                      <Plus />
                    </span>
                  </button>
                </h3>
                <div className="qa-a" id={`${uid}-a-${i}`} role="region" aria-labelledby={`${uid}-q-${i}`} inert={!isOpen}>
                  <div>
                    <p>{item.a}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
