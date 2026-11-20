import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";

import { base, getDict, homePath, type Dict, type Locale } from "./content";
import { Faq } from "./faq";
import { Floor } from "./floor";
import { Hero } from "./hero";
import { ArrowUpRight, Chat, Mail, Phone, Pin } from "./icons";
import { SmoothScroll } from "./motion";
import { Quality } from "./quality";
import { Reveal } from "./reveal";
import { Story } from "./story";

function Partners({ t }: { t: Dict }) {
  const row = [...base.partners, ...base.partners];
  return (
    <section className="partners" aria-labelledby="partners-title">
      <p id="partners-title" className="partners-title">
        {t.partners}
      </p>
      <div className="marquee">
        <ul className="marquee-track">
          {row.map((p, i) => (
            <li key={`${p.file}-${i}`} className={`patch${p.dark ? " is-dark" : ""}`} aria-hidden={i >= base.partners.length}>
              <Image src={p.src} alt={i < base.partners.length ? p.name : ""} width={151} height={81} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Range({ t }: { t: Dict }) {
  return (
    <section className="stage stage-white range" id="range" aria-labelledby="range-title">
      <div className="head" data-reveal>
        <div>
          <p className="eyebrow">{t.range.eyebrow}</p>
          <h2 id="range-title">{t.range.title}</h2>
        </div>
        <p className="lead">{t.range.body}</p>
      </div>

      <ul className="bento">
        {t.range.items.map((item, i) => {
          const { img, size } = base.range[i];
          return (
            <li key={item.name} className={`cat${size ? ` cat-${size}` : ""}`} data-reveal style={{ "--i": i % 4 } as CSSProperties}>
              <Link href={base.links.products} className="cat-link">
                {img && (
                  <span className="cat-img">
                    <Image src={img} alt="" fill sizes="(max-width: 700px) 92vw, (max-width: 1100px) 46vw, 24vw" />
                  </span>
                )}
                <span className="cat-copy">
                  <span className="cat-name">{item.name}</span>
                  <span className="cat-note">{item.note}</span>
                </span>
                <span className="cat-go" aria-hidden>
                  <ArrowUpRight />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

function Close({ t }: { t: Dict }) {
  const c = base.contact;
  const l = t.close.labels;
  return (
    <section className="stage stage-signal close" id="contact" aria-labelledby="close-title">
      <div className="close-grid">
        <div data-reveal>
          <h2 id="close-title">{t.close.title}</h2>
          <p className="lead">{t.close.body}</p>
          <div className="close-actions">
            <a className="btn btn-ink" href={`mailto:${c.emails[0]}?subject=${encodeURIComponent(t.close.subject)}`}>
              <Mail /> {t.close.email}
            </a>
            <a className="btn btn-ghost-ink" href={c.whatsapp} target="_blank" rel="noopener noreferrer">
              <Chat /> {t.close.whatsapp}
            </a>
          </div>
        </div>

        <ul className="cards" data-reveal>
          <li>
            <Mail />
            <span>
              <small>{l.email}</small>
              {c.emails.map((e) => (
                <a key={e} href={`mailto:${e}`}>
                  {e}
                </a>
              ))}
            </span>
          </li>
          <li>
            <Phone />
            <span>
              <small>{l.phone}</small>
              <a href={c.phoneHref}>{c.phone}</a>
              <span className="muted">
                {l.tel} {c.tel} · {l.wechat} {c.wechat}
              </span>
            </span>
          </li>
          <li>
            <Pin />
            <span>
              <small>{l.office}</small>
              {c.address}
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}

function Footer({ t }: { t: Dict }) {
  const home = homePath(t.locale);
  const anchor = (id: string) => `${home}#${id}`;
  const company: [string, string][] = t.footer.companyLinks.map((label, i) => [label, anchor(["story", "factory", "quality", "faq"][i])]);
  const c = base.contact;

  return (
    <footer className="foot">
      <div className="foot-grid">
        <div className="foot-brand">
          <Link href={home} className="foot-logo">
            <span className="logo-badge">
              <Image src="/images/shunyi/logo.png" alt="" width={220} height={110} />
            </span>
            <span>
              <strong>Shunyi</strong>
              <small>{t.nav.tagline}</small>
            </span>
          </Link>
          <p className="foot-about">{t.footer.about}</p>
          <ul className="foot-certs" aria-label={t.quality.certsLabel}>
            {base.certs.map((cert) => (
              <li key={cert}>{cert}</li>
            ))}
          </ul>
        </div>

        <nav className="foot-col" aria-labelledby="foot-company">
          <h3 id="foot-company">{t.footer.company}</h3>
          <ul>
            {company.map(([label, href]) => (
              <li key={label}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="foot-col" aria-labelledby="foot-products">
          <h3 id="foot-products">{t.footer.products}</h3>
          <ul>
            {t.footer.productLinks.map((label) => (
              <li key={label}>
                <Link href={base.links.products}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="foot-col">
          <h3>{t.footer.contact}</h3>
          <ul>
            {c.emails.map((e) => (
              <li key={e}>
                <a href={`mailto:${e}`}>{e}</a>
              </li>
            ))}
            <li>
              <a href={c.phoneHref}>{c.phone}</a>
            </li>
            <li>
              <a href={c.whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <address>{c.address}</address>
            </li>
          </ul>
        </div>
      </div>

      <div className="foot-base">
        <p>
          © 2026 {base.legal}. {t.footer.philosophy}
        </p>
        <ul className="foot-social">
          {base.social.map((s) => (
            <li key={s.label}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {t.locale === "zh" && "zh" in s ? s.zh : s.label}
                <ArrowUpRight />
              </a>
            </li>
          ))}
          <li>
            <Link href={base.links.admin}>{t.footer.admin}</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

/** The whole public landing page, in one locale. */
export function Landing({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <div className={`sy page lang-${locale}`} lang={t.htmlLang}>
      <Hero t={t} />
      <Partners t={t} />
      <Range t={t} />
      <Story t={t} />
      <Floor t={t} />
      <Quality t={t} />
      <Faq t={t} />
      <Close t={t} />
      <Footer t={t} />
      <SmoothScroll />
      <Reveal />
    </div>
  );
}
