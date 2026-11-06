"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { motion } from "framer-motion";

export default function HomePage() {
  const t = useTranslations("homepage");

  return (
    <div className="flex flex-col">
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background py-20 md:py-32 lg:py-40">
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Manufacturing Excellence Since 2010
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-6 text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl lg:text-7xl"
            >
              {t("hero.title")} <br />
              <span className="text-primary">{t("hero.subtitle")}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-10 text-lg text-muted-foreground max-w-2xl mx-auto"
            >
              {t("hero.description")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href={`/rfq`} className="btn btn-primary text-lg px-8 py-3">
                {t("hero.cta")}
              </Link>
              <Link href={`/products`} className="btn btn-outline text-lg px-8 py-3">
                {t("hero.watchVideo")}
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30" aria-labelledby="stats-heading">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { label: t("stats.workers"), value: "2,500+", icon: "users" },
              { label: t("stats.capacity"), value: "5M pcs/mo", icon: "shirt" },
              { label: t("stats.countries"), value: "35+", icon: "globe" },
              { label: t("stats.certifications"), value: "12+", icon: "award" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {stat.icon === "users" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                    {stat.icon === "shirt" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />}
                    {stat.icon === "globe" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />}
                    {stat.icon === "award" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                  </svg>
                </div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="about-heading">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                {t("about.title")}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
                {t("about.description").split(".")[0]}
              </h2>
              <p className="text-lg text-muted-foreground">
                {t("about.description").split(".").slice(1).join(".")}
              </p>
              <ul className="space-y-3" role="list">
                {[
                  "International compliance standards (WRAP, BSCI, OEKO-TEX, ISO)",
                  "Sustainable manufacturing with ETP and green energy",
                  "Skilled workforce of 2,500+ experienced professionals",
                  "Monthly capacity of 5 million pieces across all categories",
                  "Exporting to 35+ countries worldwide",
                  "In-house design, sampling, and quality control",
                ].map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <svg className="mt-1 h-5 w-5 flex-shrink-0 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
              <Link href={`/about`} className="btn btn-primary mt-4 inline-flex">
                Learn More
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative aspect-video rounded-2xl overflow-hidden bg-muted"
            >
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8">
                  <svg className="mx-auto mb-4 h-16 w-16 text-muted-foreground/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-muted-foreground">Factory Tour Video</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-muted/30" aria-labelledby="capabilities-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t("capabilities.title")}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Diverse Product Portfolio
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From casual knitwear to premium outerwear, we manufacture a wide range of garments with precision and quality.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: t("capabilities.knitwear"), desc: "T-shirts, polo shirts, hoodies, sweatshirts, joggers", icon: "shirt" },
              { title: t("capabilities.woven"), desc: "Shirts, blouses, dresses, trousers, shorts", icon: "scissors" },
              { title: t("capabilities.denim"), desc: "Jeans, jackets, skirts, overalls, shirts", icon: "layers" },
              { title: t("capabilities.outerwear"), desc: "Jackets, coats, parkas, vests, bomber jackets", icon: "box" },
            ].map((cap, index) => (
              <motion.article
                key={cap.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                className="card p-6 hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    {cap.icon === "shirt" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />}
                    {cap.icon === "scissors" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.121 14.121A9 9 0 015.1 5.1M13 19.008V9M19 13.012V9" />}
                    {cap.icon === "layers" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 16m-6-6a2 2 0 11-2.828 0 2 2 0 012.828 0" />}
                    {cap.icon === "box" && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />}
                  </svg>
                </div>
                <h3 className="mb-2 text-center text-lg font-semibold text-foreground">{cap.title}</h3>
                <p className="text-center text-sm text-muted-foreground">{cap.desc}</p>
              </motion.article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href={`/products`} className="btn btn-outline inline-flex">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24" aria-labelledby="certifications-heading">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              {t("certifications.title")}
            </span>
            <h2 className="mt-4 text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              International Standards & Compliance
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              We maintain the highest standards of quality, safety, and ethical manufacturing across all operations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { name: "WRAP", desc: "Worldwide Responsible Accredited Production", category: "Social" },
              { name: "BSCI", desc: "Business Social Compliance Initiative", category: "Social" },
              { name: "OEKO-TEX", desc: "Standard 100 - Textile Safety", category: "Quality" },
              { name: "ISO 9001", desc: "Quality Management Systems", category: "Quality" },
              { name: "ISO 14001", desc: "Environmental Management", category: "Environmental" },
              { name: "ISO 45001", desc: "Occupational Health & Safety", category: "Safety" },
              { name: "GOTS", desc: "Global Organic Textile Standard", category: "Environmental" },
              { name: "OCS", desc: "Organic Content Standard", category: "Environmental" },
              { name: "RCS", desc: "Recycled Claim Standard", category: "Environmental" },
            ].map((cert, index) => (
              <motion.article
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.05 }}
                className="card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                    {cert.name}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-sm text-muted-foreground">{cert.desc}</p>
                    <span className="badge badge-outline text-xs mt-1">{cert.category}</span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-primary text-primary-foreground" aria-labelledby="cta-heading">
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              {t("cta.title")}
            </h2>
            <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              {t("cta.description")}
            </p>
            <Link href={`/rfq`} className="btn bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-3">
              {t("cta.button")}
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}