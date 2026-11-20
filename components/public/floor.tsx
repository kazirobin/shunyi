"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { prefersReduced, usePinProgress } from "./motion";
import { base, type Dict } from "./content";

/** The factory floor as a pinned, sideways walk. On phones it's a swipeable row. */
export function Floor({ t }: { t: Dict }) {
  const STOPS = t.floor.stops.map((s, i) => ({ ...s, img: base.floor[i] }));
  const [pinned, setPinned] = useState(false);
  const track = useRef<HTMLOListElement>(null);
  const meter = useRef<HTMLSpanElement>(null);
  const [at, setAt] = useState(0);

  useEffect(() => {
    const mq = matchMedia("(min-width: 900px)");
    const check = () => setPinned(mq.matches && !prefersReduced());
    const id = requestAnimationFrame(check);
    mq.addEventListener("change", check);
    return () => {
      cancelAnimationFrame(id);
      mq.removeEventListener("change", check);
    };
  }, []);

  const ref = usePinProgress<HTMLElement>((p) => {
    const t = track.current;
    if (!t) return;
    if (!pinned) {
      t.style.transform = "";
      return;
    }
    const travel = Math.max(0, t.scrollWidth - t.parentElement!.clientWidth);
    t.style.transform = `translate3d(${-p * travel}px,0,0)`;
    if (meter.current) meter.current.style.transform = `scaleX(${p})`;
    const i = Math.min(STOPS.length - 1, Math.floor(p * STOPS.length));
    setAt((prev) => (prev === i ? prev : i));
  });

  return (
    <section ref={ref} className={`floor${pinned ? " is-pinned" : ""}`} id="factory" aria-labelledby="floor-title">
      <div className="floor-pin">
        <div className="head" data-reveal>
          <div>
            <p className="eyebrow">{t.floor.eyebrow}</p>
            <h2 id="floor-title">{t.floor.title}</h2>
          </div>
          <div className="floor-meta">
            <p className="lead">{t.floor.body}</p>
            {pinned && (
              <p className="floor-count" aria-hidden>
                <span>0{at + 1}</span> / 0{STOPS.length} · {STOPS[at].name}
                <span className="floor-meter">
                  <span ref={meter} />
                </span>
              </p>
            )}
          </div>
        </div>

        <div className="floor-window">
          <ol className="floor-track" ref={track}>
            {STOPS.map((s, i) => (
              <li key={s.name} className={`stop${pinned && i === at ? " is-on" : ""}`}>
                <div className="stop-img">
                  <Image src={s.img} alt={`${s.name}, ${t.floor.alt}`} fill sizes="(max-width: 900px) 80vw, 38vw" />
                </div>
                <div className="stop-copy">
                  <span className="stop-no">0{i + 1}</span>
                  <h3>{s.name}</h3>
                  <p>{s.note}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
