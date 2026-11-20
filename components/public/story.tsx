"use client";

import Image from "next/image";
import { useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { base, type Dict } from "./content";

/** 2004 → 2014 → 2021. Pick a year; the photo wipes across and the chapter reads out. */
export function Story({ t }: { t: Dict }) {
  const CH = t.story.chapters.map((c, i) => ({ ...c, year: base.years[i], img: base.story[i] }));
  const [on, setOn] = useState(CH.length - 1);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const i = (on + d + CH.length) % CH.length;
    setOn(i);
    tabs.current[i]?.focus();
  };

  return (
    <section className="stage stage-navy story" id="story" aria-labelledby="story-title">
      <div className="head" data-reveal>
        <div>
          <p className="eyebrow">{t.story.eyebrow}</p>
          <h2 id="story-title">{t.story.title}</h2>
        </div>
        <dl className="facts">
          {t.story.facts.map((f) => (
            <div key={f.k}>
              <dt>{f.k}</dt>
              <dd>{f.v}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="story-body">
        <div className="story-years" role="tablist" aria-label={t.story.tablist} onKeyDown={onKey} style={{ "--on": on, "--n": CH.length } as CSSProperties}>
          <span className="story-rail" aria-hidden>
            <span className="story-fill" />
          </span>
          {CH.map((c, i) => (
            <button
              key={c.year}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`year-${c.year}`}
              aria-selected={on === i}
              aria-controls="story-panel"
              tabIndex={on === i ? 0 : -1}
              className={`year${on === i ? " is-on" : ""}${i < on ? " is-past" : ""}`}
              onClick={() => setOn(i)}
            >
              <span className="year-dot" aria-hidden />
              {c.year}
            </button>
          ))}
        </div>

        <div className="story-panel" id="story-panel" role="tabpanel" aria-labelledby={`year-${CH[on].year}`}>
          <div className="story-photo">
            {CH.map((c, i) => (
              <div key={c.year} className={`story-img${i === on ? " is-on" : ""}`} aria-hidden={i !== on}>
                <Image src={c.img} alt="" fill sizes="(max-width: 900px) 92vw, 52vw" />
              </div>
            ))}
          </div>
          <div className="story-copy" key={`copy-${on}`}>
            <h3>{CH[on].title}</h3>
            <p>{CH[on].body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
