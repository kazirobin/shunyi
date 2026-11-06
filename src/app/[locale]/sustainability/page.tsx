"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Leaf, Recycle, Droplets, Sun, Wind, TreePine, Award, Shield, Factory, Heart, Globe } from "lucide-react";

export default function SustainabilityPage() {
  const t = useTranslations("homepage");

  const initiatives = [
    {
      icon: Leaf,
      title: "Eco-Friendly Materials",
      desc: "GOTS certified organic cotton, recycled polyester, Tencel, and other sustainable fibers",
      stats: "40% sustainable materials",
    },
    {
      icon: Recycle,
      title: "Circular Economy",
      desc: "Fabric waste recycling program, upcycling initiatives, and zero-waste pattern cutting",
      stats: "85% waste diverted",
    },
    {
      icon: Droplets,
      title: "Water Conservation",
      desc: "ETP with zero liquid discharge, rainwater harvesting, and low-liquor dyeing machines",
      stats: "60% water saved",
    },
    {
      icon: Sun,
      title: "Renewable Energy",
      desc: "Rooftop solar panels generating 500kW, reducing grid dependency and carbon footprint",
      stats: "500kW solar capacity",
    },
    {
      icon: Wind,
      title: "Carbon Reduction",
      desc: "Energy-efficient machinery, LED lighting, heat recovery systems, and carbon offset programs",
      stats: "30% CO2 reduction",
    },
    {
      icon: TreePine,
      title: "Green Factory",
      desc: "Indoor plants, green walls, natural ventilation, and biophilic design for worker wellbeing",
      stats: "2000+ plants",
    },
  ];

  const certifications = [
    { name: "GOTS", full: "Global Organic Textile Standard", icon: Award, desc: "Organic fiber certification from farm to finished product" },
    { name: "OCS", full: "Organic Content Standard", icon: Award, desc: "Verifies organic material content in final products" },
    { name: "RCS", full: "Recycled Claim Standard", icon: Recycle, desc: "Tracks recycled raw materials through supply chain" },
    { name: "ISO 14001", full: "Environmental Management", icon: Shield, desc: "Systematic approach to environmental performance" },
    { name: "OEKO-TEX", full: "Standard 100", icon: Shield, desc: "Textile safety - free from harmful substances" },
    { name: "ZDHC", full: "Zero Discharge of Hazardous Chemicals", icon: Droplets, desc: "Chemical management for cleaner production" },
    { name: "Higg Index", full: "Sustainability Measurement", icon: Globe, desc: "Industry-standard environmental impact assessment" },
    { name: "BEPI", full: "Business Environmental Performance", icon: Factory, desc: "Environmental performance improvement program" },
  ];

  const goals = [
    { year: "2025", title: "50% Sustainable Materials", desc: "Half of all fabric sourcing from certified sustainable sources", progress: 40 },
    { year: "2026", title: "Carbon Neutral Operations", desc: "Scope 1 & 2 emissions neutralized through reduction and offsets", progress: 30 },
    { year: "2027", title: "Zero Waste to Landfill", desc: "100% of production waste recycled, upcycled, or composted", progress: 85 },
    { year: "2030", title: "Net Zero Supply Chain", desc: "Full value chain carbon neutrality including Scope 3 emissions", progress: 15 },
  ];

  const workerWellbeing = [
    { icon: Heart, title: "Health & Safety", desc: "On-site medical center, regular health checkups, ergonomic workstations, and safety training" },
    { icon: Users, title: "Fair Wages & Benefits", desc: "Above minimum wage, festival bonuses, health insurance, provident fund, and gratuity" },
    { icon: GraduationCap, title: "Skill Development", desc: "Technical training, literacy programs, leadership development, and career advancement" },
    { icon: Home, title: "Living Conditions", desc: "Safe transport, subsidized meals, daycare facility, prayer rooms, and recreation areas" },
    { icon: Shield, title: "Worker Voice", desc: "Grievance mechanisms, worker committees, anonymous feedback, and union recognition" },
    { icon: Award, title: "Recognition", desc: "Employee of the month, long service awards, performance bonuses, and suggestion schemes" },
  ];

  return (
    <div className="space-y-16 py-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 md:py-24 bg-gradient-to-b from-green-50/50 via-background to-background"
        aria-labelledby="sustainability-heading"
      >
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-green-600/10 px-4 py-1.5 text-sm font-medium text-green-600 mb-6">
              {t("sustainability.title")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {t("sustainability.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("sustainability.description") || "We believe that creating beautiful garments shouldn't come at the cost of our planet or people. Our sustainability journey is built on measurable actions, transparent reporting, and continuous improvement."}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="py-16"
        aria-labelledby="initiatives-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Our Sustainability Initiatives
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Concrete actions we're taking across our operations to reduce environmental impact.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {initiatives.map((initiative, index) => (
              <motion.article
                key={initiative.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <initiative.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{initiative.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{initiative.desc}</p>
                <div className="pt-4 border-t flex items-center justify-between">
                  <span className="badge badge-success">{initiative.stats}</span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="py-16 bg-muted/30"
        aria-labelledby="certifications-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Environmental & Social Certifications
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Third-party verified standards that validate our sustainability commitments.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, index) => (
              <motion.article
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="card p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                    <cert.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{cert.name}</h3>
                    <p className="text-xs text-muted-foreground">{cert.full}</p>
                    <p className="text-sm text-muted-foreground mt-1">{cert.desc}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-16"
        aria-labelledby="goals-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Our 2030 Sustainability Goals
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Ambitious targets aligned with Science Based Targets initiative (SBTi) and UN SDGs.
            </p>
          </div>

          <div className="space-y-6 max-w-3xl mx-auto">
            {goals.map((goal, index) => (
              <motion.article
                key={goal.year}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="badge badge-outline mb-2">{goal.year}</span>
                    <h3 className="text-xl font-semibold text-foreground">{goal.title}</h3>
                  </div>
                  <span className="text-2xl font-bold text-primary">{goal.progress}%</span>
                </div>
                <p className="text-muted-foreground mb-4">{goal.desc}</p>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${goal.progress}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 1 }}
                    className="h-full bg-primary rounded-full"
                  />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-16 bg-muted/30"
        aria-labelledby="wellbeing-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Worker Wellbeing & Social Responsibility
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Our people are our greatest asset. We invest in their health, growth, and dignity.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {workerWellbeing.map((item, index) => (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="card p-6 text-center"
              >
                <div className="mx-auto mb-4 h-14 w-14 rounded-xl bg-green-100 flex items-center justify-center text-green-600">
                  <item.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-16 bg-green-600 text-green-50"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Join Our Sustainability Journey
          </h2>
          <p className="text-lg text-green-100 max-w-2xl mx-auto mb-8">
            Partner with a manufacturer who shares your commitment to sustainable fashion.
          </p>
          <a href="/rfq" className="btn bg-white text-green-600 hover:bg-green-50 text-lg px-8 py-3">
            Start a Sustainable Project
          </a>
        </div>
      </motion.section>
    </div>
  );
}

function Users({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  );
}

function GraduationCap({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    </svg>
  );
}

function Home({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 22V12h6v10" />
    </svg>
  );
}