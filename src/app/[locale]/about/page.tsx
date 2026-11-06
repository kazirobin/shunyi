"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Award, Building2, Users, Truck, Leaf, Shield, Clock, Target } from "lucide-react";

export default function AboutPage() {
  const t = useTranslations("homepage");

  const values = [
    { icon: Award, title: "Quality First", desc: "Every garment passes through rigorous quality checks at multiple stages" },
    { icon: Shield, title: "Compliance", desc: "WRAP, BSCI, OEKO-TEX, ISO certified - meeting global standards" },
    { icon: Leaf, title: "Sustainability", desc: "Eco-friendly processes, ETP, solar energy, and waste reduction" },
    { icon: Users, title: "People", desc: "2,500+ skilled workers with fair wages, safe conditions, and growth opportunities" },
    { icon: Clock, title: "On-Time Delivery", desc: "95%+ on-time delivery rate with transparent production tracking" },
    { icon: Target, title: "Innovation", desc: "Continuous investment in technology, automation, and sustainable materials" },
  ];

  const milestones = [
    { year: "2010", title: "Founded", desc: "Started as a small knitwear factory in Gazipur with 50 workers" },
    { year: "2013", title: "Export License", desc: "Obtained export license and shipped first international order to Europe" },
    { year: "2016", title: "WRAP Certified", desc: "Achieved WRAP Gold certification for social compliance" },
    { year: "2018", title: "Expansion", desc: "Expanded to woven and denim divisions, workforce reached 1,000+" },
    { year: "2020", title: "Sustainability", desc: "Installed ETP, solar panels, and achieved ISO 14001 certification" },
    { year: "2022", title: "Digital Transformation", desc: "Implemented ERP, digital sampling, and real-time production tracking" },
    { year: "2024", title: "Today", desc: "2,500+ workers, 5M pieces/month capacity, exporting to 35+ countries" },
  ];

  const management = [
    { name: "Mr. Ahmed Hassan", role: "Chairman", desc: "30+ years in textile industry, visionary leader" },
    { name: "Mr. Karim Rahman", role: "Managing Director", desc: "Operations expert, drove digital transformation" },
    { name: "Ms. Farida Begum", role: "Director - HR & Compliance", desc: "Champion of worker welfare and compliance" },
    { name: "Mr. Jamal Uddin", role: "Director - Production", desc: "Lean manufacturing specialist, efficiency expert" },
    { name: "Ms. Salma Akter", role: "Director - Quality", desc: "Quality systems architect, zero-defect advocate" },
    { name: "Mr. Rahim Khan", role: "Director - Finance", desc: "Financial strategist, sustainable growth driver" },
  ];

  return (
    <div className="space-y-16 py-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 md:py-24 bg-gradient-to-b from-primary/5 via-background to-background"
        aria-labelledby="about-heading"
      >
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-6">
              {t("about.title")}
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              {t("about.title")}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.description")}
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="py-16"
        aria-labelledby="values-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Our Core Values
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              These principles guide every decision we make, from the factory floor to the boardroom.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <motion.article
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="card p-6 hover:shadow-lg transition-shadow"
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <value.icon className="h-7 w-7" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-foreground text-center mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-center text-sm">{value.desc}</p>
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
        aria-labelledby="history-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Our Journey
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              From a small factory to a global manufacturing partner - key milestones in our growth story.
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-primary/20" />
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`relative flex ${index % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}
                >
                  <div className={`w-1/2 pr-8 ${index % 2 === 0 ? "text-right" : "pl-8"}`}>
                    <div className={`relative ${index % 2 === 0 ? "text-right" : ""}`}>
                      <span className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                        {milestone.year}
                      </span>
                      <h3 className="mt-3 text-xl font-semibold text-foreground">{milestone.title}</h3>
                      <p className="mt-1 text-muted-foreground">{milestone.desc}</p>
                    </div>
                  </div>
                  <div className="w-1/2 flex items-center justify-center">
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-primary border-4 border-background z-10" />
                  </div>
                  <div className={`w-1/2 ${index % 2 === 0 ? "pl-8" : "pr-8 text-right"}`}>
                    <div className="aspect-video rounded-2xl bg-muted/50 flex items-center justify-center">
                      <span className="text-muted-foreground/50">Historical Image</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-16"
        aria-labelledby="management-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Leadership Team
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Experienced professionals dedicated to excellence in garment manufacturing.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {management.map((member, index) => (
              <motion.article
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="card p-6 text-center"
              >
                <div className="mx-auto mb-4 h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
                  {member.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                <p className="text-primary text-sm font-medium">{member.role}</p>
                <p className="mt-2 text-sm text-muted-foreground">{member.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-16 bg-primary text-primary-foreground"
        aria-labelledby="facilities-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              World-Class Facilities
            </h2>
            <p className="mt-4 text-lg text-primary-foreground/80 max-w-2xl mx-auto">
              Modern infrastructure designed for efficiency, quality, and worker comfort.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: Building2, title: "Production Floor", desc: "12 production lines with ergonomic workstations" },
              { icon: Shield, title: "Quality Lab", desc: "In-house testing for fabric, colorfastness, and durability" },
              { icon: Leaf, title: "ETP Plant", desc: "Effluent treatment plant with zero liquid discharge" },
              { icon: Users, title: "Worker Amenities", desc: "Cafeteria, medical center, daycare, and prayer rooms" },
              { icon: Truck, title: "Warehouse", desc: "Climate-controlled storage for raw materials and finished goods" },
              { icon: Target, title: "Sampling Unit", desc: "Digital sampling with 3D visualization and quick turnaround" },
              { icon: Clock, title: "Training Center", desc: "Regular skill development and safety training programs" },
              { icon: Award, title: "Compliance Office", desc: "Dedicated team for audits, certifications, and compliance" },
            ].map((facility, index) => (
              <motion.article
                key={facility.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                className="bg-primary-foreground/5 rounded-xl p-6 hover:bg-primary-foreground/10 transition-colors"
              >
                <div className="mb-4 h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center">
                  <facility.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="font-semibold mb-2">{facility.title}</h3>
                <p className="text-primary-foreground/80 text-sm">{facility.desc}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-16"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground mb-4">
            Ready to Partner with Us?
            </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Let's discuss how Shunyi Garments can support your manufacturing needs with quality, compliance, and reliability.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a href="/rfq" className="btn btn-primary text-lg px-8 py-3">
              Request a Quote
            </a>
            <a href="/contact" className="btn btn-outline text-lg px-8 py-3">
              Contact Us
            </a>
          </div>
        </div>
      </motion.section>
    </div>
  );
}