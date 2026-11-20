"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { Check } from "./icons";
import { useSeen } from "./motion";
import { base, type Dict } from "./content";

/** Three inspection stages. Each checklist ticks itself off when it's shown. */
export function Quality({ t }: { t: Dict }) {
  const STAGES = t.quality.stages.map((s, i) => ({ ...s, img: base.quality[i] }));
  const [on, setOn] = useState(0);
  const [ref, seen] = useSeen<HTMLDivElement>(0.35);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const i = (on + d + STAGES.length) % STAGES.length;
    setOn(i);
    tabs.current[i]?.focus();
  };

  const stage = STAGES[on];

  return (
    <section className="stage stage-glacier quality" id="quality" aria-labelledby="quality-title">
      <div className="head" data-reveal>
        <div>
          <p className="eyebrow">{t.quality.eyebrow}</p>
          <h2 id="quality-title">{t.quality.title}</h2>
        </div>
        <ul className="certs" aria-label={t.quality.certsLabel}>
          {base.certs.map((c, i) => (
            <li key={c} style={{ "--i": i } as CSSProperties}>
              <span className="cert-seal" aria-hidden>
                <Check />
              </span>
              {c}
            </li>
          ))}
        </ul>
      </div>

      <div className="qc" ref={ref}>
        <div className="qc-tabs" role="tablist" aria-label={t.quality.tablist} onKeyDown={onKey}>
          {STAGES.map((s, i) => (
            <button
              key={s.tab}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`qc-${i}`}
              aria-selected={on === i}
              aria-controls="qc-panel"
              tabIndex={on === i ? 0 : -1}
              className={on === i ? "is-on" : ""}
              onClick={() => setOn(i)}
            >
              <span className="qc-no">0{i + 1}</span>
              {s.tab}
            </button>
          ))}
        </div>

        <div className="qc-panel" id="qc-panel" role="tabpanel" aria-labelledby={`qc-${on}`}>
          <div className="qc-photo" key={`p-${on}`}>
            <Image src={stage.img} alt={`${stage.tab}, ${t.quality.alt}`} fill sizes="(max-width: 900px) 92vw, 46vw" />
          </div>
          <ul className={`qc-list${seen ? " is-run" : ""}`} key={`l-${on}`}>
            {stage.checks.map((c, i) => (
              <li key={c} style={{ "--i": i } as CSSProperties}>
                <span className="qc-box" aria-hidden>
                  <Check />
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
