"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { base, getDict, homePath, type Locale } from "./content";
import { Arrow } from "./icons";
import { scrollToId } from "./motion";

const IDS = ["range", "story", "factory", "quality", "faq"];

export default function PublicNav() {
  const pathname = usePathname();
  const locale: Locale = pathname === "/zh" || pathname.startsWith("/zh/") ? "zh" : "en";
  const t = getDict(locale);
  const home = homePath(locale);
  const onHome = pathname === home;

  const [scrolledAway, setHidden] = useState(false);
  const [scrolledDown, setSolid] = useState(false);
  const [open, setOpen] = useState(false);
  // Off the landing page the bar is always solid and never hides.
  const hidden = onHome && scrolledAway;
  const solid = !onHome || scrolledDown;
  const last = useRef(0);
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useId();

  useEffect(() => {
    if (!onHome) return;
    const on = () => {
      const y = window.scrollY;
      if (y > 160 && y > last.current + 2) setHidden(true);
      if (y < last.current - 2 || y < 160) setHidden(false);
      setSolid(y > 24);
      last.current = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, [onHome]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const href = (id: string) => `${home}#${id}`;
  const go = (id: string) => (e: React.MouseEvent) => {
    setOpen(false);
    if (onHome && scrollToId(id)) e.preventDefault();
  };

  // Segmented EN | 中文 switch: both languages always visible, the current one filled.
  const langSwitch = (
    <div className="nav-lang" role="group" aria-label={locale === "zh" ? "语言" : "Language"}>
      {(["en", "zh"] as Locale[]).map((l) => (
        <Link
          key={l}
          href={homePath(l)}
          hrefLang={l === "zh" ? "zh-CN" : "en"}
          lang={l === "zh" ? "zh-CN" : "en"}
          aria-current={l === locale ? "true" : undefined}
          className={l === locale ? "is-on" : ""}
          onClick={() => setOpen(false)}
        >
          {l === "zh" ? "中文" : "EN"}
        </Link>
      ))}
    </div>
  );

  return (
    <header
      lang={t.htmlLang}
      className={`sy nav lang-${locale}${onHome ? " is-home" : ""}${hidden && !open ? " is-hidden" : ""}${solid || open ? " is-solid" : ""}${
        open ? " is-open" : ""
      }`}
    >
      <Link href={home} className="nav-logo" aria-label={t.nav.home} onClick={() => setOpen(false)}>
        <span className="logo-badge">
          <Image src="/images/shunyi/logo.png" alt="" width={220} height={110} priority />
        </span>
        <span className="nav-word">
          Shunyi
          <small>{t.nav.tagline}</small>
        </span>
      </Link>

      <nav aria-label="Main" className="nav-links">
        {IDS.map((id, i) => (
          <Link key={id} href={href(id)} onClick={go(id)}>
            {t.nav.links[i]}
          </Link>
        ))}
      </nav>

      <div className="nav-right">
        {langSwitch}
        <Link href={href("contact")} onClick={go("contact")} className="btn btn-signal btn-sm">
          {t.nav.cta} <Arrow />
        </Link>
        <button
          ref={toggle}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls={panel}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr">{open ? t.nav.close : t.nav.open}</span>
          <span aria-hidden className="nav-burger" />
        </button>
      </div>

      {open && (
        <div id={panel} className="nav-sheet">
          <nav aria-label="Mobile">
            {IDS.map((id, i) => (
              <Link key={id} href={href(id)} onClick={go(id)}>
                {t.nav.links[i]}
              </Link>
            ))}
            <Link href={base.links.products} onClick={() => setOpen(false)}>
              {t.nav.products}
            </Link>
          </nav>
          <Link href={href("contact")} onClick={go("contact")} className="btn btn-signal">
            {t.nav.cta} <Arrow />
          </Link>
        </div>
      )}
    </header>
  );
}
