"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";
import { base, type Dict } from "./content";
import { Arrow } from "./icons";
import { prefersReduced, scrollToId, useSeen } from "./motion";

const DWELL = 4200;

function Count({ to, suffix, run, locale }: { to: number; suffix: string; run: boolean; locale: string }) {
  // Server-rendered with the real figure; counts up from zero once it's on screen.
  const [n, setN] = useState(to);
  useEffect(() => {
    if (!run || prefersReduced()) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / 1400);
      setN(Math.round(to * (1 - Math.pow(1 - p, 4))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [run, to]);
  return (
    <>
      {n.toLocaleString(locale === "zh" ? "zh-CN" : "en-US")}
      {suffix}
    </>
  );
}

export function Hero({ t }: { t: Dict }) {
  const show = t.hero.show.map((s, i) => ({ ...s, ...base.showcase[i] }));
  const [on, setOn] = useState(0);
  const [paused, setPaused] = useState(false);
  const [auto, setAuto] = useState(false);
  const [stats, seen] = useSeen<HTMLUListElement>(0.4);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const id = requestAnimationFrame(() => setAuto(!prefersReduced()));
    return () => cancelAnimationFrame(id);
  }, []);

  const next = useCallback(() => setOn((i) => (i + 1) % show.length), [show.length]);

  useEffect(() => {
    if (!auto || paused) return;
    const id = setTimeout(next, DWELL);
    return () => clearTimeout(id);
  }, [auto, paused, on, next]);

  const onKey = (e: React.KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const i = (on + d + show.length) % show.length;
    setOn(i);
    tabs.current[i]?.focus();
  };

  const jump = (id: string) => (e: React.MouseEvent) => {
    if (scrollToId(id)) e.preventDefault();
  };

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-copy">
        <p className="chip" data-load style={{ "--d": 0 } as CSSProperties}>
          <span className="chip-dot" aria-hidden />
          {t.hero.chip}
        </p>
        <h1 id="hero-title" className="hero-h1">
          {t.hero.title.map((line, i) => (
            <span className="ln" key={line}>
              <span style={{ "--d": i + 1 } as CSSProperties}>
                {i === t.hero.title.length - 1 ? <em>{line}</em> : line}
              </span>
            </span>
          ))}
        </h1>
        <p className="hero-body" data-load style={{ "--d": 3 } as CSSProperties}>
          {t.hero.body}
        </p>
        <div className="hero-actions" data-load style={{ "--d": 4 } as CSSProperties}>
          <a href="#contact" className="btn btn-signal" onClick={jump("contact")}>
            {t.hero.cta} <Arrow />
          </a>
          <a href="#range" className="btn btn-line" onClick={jump("range")}>
            {t.hero.secondary}
          </a>
        </div>
      </div>

      <div
        className="show"
        data-load
        style={{ "--d": 5, "--tint": show[on].tint } as CSSProperties}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {show.map((s, i) => (
          <figure key={s.name} className={`show-item${i === on ? " is-on" : ""}`} aria-hidden={i !== on}>
            <Image src={s.img} alt={s.name} fill sizes="(max-width: 900px) 92vw, 60vw" priority={i === 0} className="show-img" />
            <figcaption className="show-name">
              <span className="show-index">0{i + 1}</span>
              {s.name}
            </figcaption>
            <ul className="show-specs">
              {s.specs.map((spec, k) => (
                <li key={spec} style={{ "--k": k } as CSSProperties}>
                  <span aria-hidden className="tick">
                    <svg viewBox="0 0 12 12">
                      <path d="M2.5 6.4 5 8.8 9.6 3.4" />
                    </svg>
                  </span>
                  {spec}
                </li>
              ))}
            </ul>
          </figure>
        ))}

        <div className="show-tabs" role="tablist" aria-label={t.hero.showLabel} onKeyDown={onKey}>
          {show.map((s, i) => (
            <button
              key={s.tab}
              ref={(el) => {
                tabs.current[i] = el;
              }}
              type="button"
              role="tab"
              aria-selected={i === on}
              tabIndex={i === on ? 0 : -1}
              className={i === on ? "is-on" : ""}
              onClick={() => setOn(i)}
            >
              {s.tab}
              <span
                className="bar"
                aria-hidden
                key={`${on}-${paused}`}
                style={{
                  animationDuration: `${DWELL}ms`,
                  animationPlayState: auto && !paused && i === on ? "running" : "paused",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <ul className="stats" ref={stats} data-load style={{ "--d": 6 } as CSSProperties}>
        {t.hero.stats.map((s, i) => (
          <li key={s.label}>
            <strong>
              <Count to={base.stats[i]} suffix={s.suffix} run={seen} locale={t.locale} />
            </strong>
            <span>{s.label}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
