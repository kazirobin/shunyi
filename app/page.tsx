
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  Factory,
  Globe2,
  Layers3,
  PackageCheck,
  Scissors,
  ShieldCheck,
  Shirt,
  Truck,
} from "lucide-react";

const services = [
  {
    number: "01",
    icon: Shirt,
    title: "Apparel Manufacturing",
    description:
      "Thoughtful garment manufacturing with attention to design, materials, and production requirements.",
  },
  {
    number: "02",
    icon: Scissors,
    title: "Cutting & Sewing",
    description:
      "Organized cutting and sewing processes focused on consistency and production efficiency.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Quality Control",
    description:
      "Careful quality checks throughout production to maintain product standards.",
  },
  {
    number: "04",
    icon: PackageCheck,
    title: "Finishing & Packaging",
    description:
      "Professional finishing, inspection, and packaging to prepare garments for delivery.",
  },
];

const benefits = [
  "Quality-focused production",
  "Organized manufacturing workflow",
  "Attention to detail",
  "Reliable communication",
];

const process = [
  {
    step: "01",
    title: "Inquiry",
    description: "Understand buyer requirements and product specifications.",
  },
  {
    step: "02",
    title: "Planning",
    description: "Prepare materials, production planning, and timelines.",
  },
  {
    step: "03",
    title: "Production",
    description: "Manage cutting, sewing, and manufacturing operations.",
  },
  {
    step: "04",
    title: "Delivery",
    description: "Complete quality inspection, finishing, and packaging.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#fafaf7] text-[#20251f]">
      {/* Hero */}
      <section className="relative">
        <div className="mx-auto grid min-h-[680px] max-w-7xl items-center gap-12 px-5 py-16 md:px-10 lg:grid-cols-2 lg:py-24">
          <div className="relative z-10">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#dce3d5] bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#61764e]">
              <span className="h-2 w-2 rounded-full bg-[#718c58]" />
              Garment Manufacturing
            </div>

            <h1 className="max-w-2xl text-5xl font-semibold leading-[1.08] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
              Crafting quality.
              <span className="mt-2 block text-[#718c58]">
                Building trust.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-base leading-8 text-[#73786f] md:text-lg">
              Welcome to Shunyi Garments. We are focused on thoughtful
              garment manufacturing, consistent quality, and building
              long-term business relationships.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center gap-3 rounded-full bg-[#718c58] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#5c7545]"
              >
                Contact Us
                <ArrowUpRight size={18} />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center gap-3 rounded-full border border-[#d9ded4] bg-white px-7 py-4 text-sm font-semibold transition hover:border-[#718c58]"
              >
                Discover Our Company
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="mt-14 flex flex-wrap items-center gap-8 border-t border-[#e5e7df] pt-7">
              <div>
                <p className="text-sm font-semibold">Quality First</p>
                <p className="mt-1 text-xs text-[#858a80]">
                  Attention to detail
                </p>
              </div>
              <div className="h-9 w-px bg-[#e1e4dc]" />
              <div>
                <p className="text-sm font-semibold">Production Focus</p>
                <p className="mt-1 text-xs text-[#858a80]">
                  Organized processes
                </p>
              </div>
              <div className="h-9 w-px bg-[#e1e4dc]" />
              <div>
                <p className="text-sm font-semibold">Partnership</p>
                <p className="mt-1 text-xs text-[#858a80]">
                  Built on trust
                </p>
              </div>
            </div>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-[570px]">
            <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[#e7eddf] blur-3xl" />

            <div className="relative overflow-hidden rounded-[32px] bg-[#e9ede3] p-4 sm:p-6">
              <div className="relative flex min-h-[440px] flex-col justify-between overflow-hidden rounded-[24px] bg-[#71845e] p-7 text-white sm:p-10">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 10px, #ffffff 11px, transparent 12px)",
                  }}
                />

                <div className="relative flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-white/70">
                      Shunyi Garments
                    </p>
                    <p className="mt-2 text-sm text-white/80">
                      Manufacturing with purpose
                    </p>
                  </div>
                  <Factory size={34} strokeWidth={1.3} />
                </div>

                <div className="relative py-10">
                  <div className="relative mx-auto flex h-52 w-52 items-center justify-center rounded-full border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm sm:h-64 sm:w-64">
                    <div className="absolute h-40 w-40 rounded-full border border-white/30 sm:h-48 sm:w-48" />
                    <div className="flex h-32 w-32 items-center justify-center rounded-full bg-[#f2f1e9] text-[#71845e] shadow-xl sm:h-40 sm:w-40">
                      <Shirt size={85} strokeWidth={1} />
                    </div>
                    <div className="absolute -right-2 top-8 rounded-full bg-white p-3 text-[#71845e] shadow-lg">
                      <Check size={22} />
                    </div>
                  </div>
                </div>

                <div className="relative flex items-end justify-between border-t border-white/20 pt-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                      Our commitment
                    </p>
                    <p className="mt-2 text-xl font-medium">
                      Quality in every detail.
                    </p>
                  </div>
                  <Layers3 size={32} strokeWidth={1.2} />
                </div>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl border border-[#e8e9e1] bg-white p-5 shadow-xl sm:block">
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-[#edf1e7] p-3 text-[#718c58]">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-sm font-semibold">Quality Focused</p>
                  <p className="mt-1 text-xs text-[#858a80]">
                    From start to finish
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="border-y border-[#e9eae3] bg-white py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#718c58]">
              About Shunyi Garments
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              More than garments.
              <span className="block text-[#718c58]">
                A commitment to quality.
              </span>
            </h2>
          </div>

          <div>
            <p className="text-base leading-8 text-[#73786f]">
              At Shunyi Garments, we believe that every garment represents
              craftsmanship, responsibility, and attention to detail.
              Our approach focuses on organized production, quality
              management, and meaningful relationships with our partners.
            </p>
            <Link
              href="/about"
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#718c58] hover:gap-4 transition-all"
            >
              Learn more about us <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#718c58]">
                What We Do
              </p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
                Our Capabilities
              </h2>
            </div>
            <p className="max-w-md text-sm leading-7 text-[#858a80]">
              From production preparation to final packaging, every stage
              deserves attention and care.
            </p>
          </div>

          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const Icon = service.icon;

              return (
                <div
                  key={service.number}
                  className="group rounded-3xl border border-[#e7e9e1] bg-white p-7 transition duration-300 hover:-translate-y-2 hover:border-[#c8d3bd] hover:shadow-xl"
                >
                  <div className="flex items-center justify-between">
                    <div className="rounded-2xl bg-[#eef1e9] p-4 text-[#718c58] transition group-hover:bg-[#718c58] group-hover:text-white">
                      <Icon size={27} strokeWidth={1.6} />
                    </div>
                    <span className="text-sm font-medium text-[#b5b9af]">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="mt-9 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#858a80]">
                    {service.description}
                  </p>
                  <div className="mt-7 h-px w-full bg-[#e9eae3] transition group-hover:bg-[#718c58]" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-[#20291f] py-24 text-white">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#a8bd91]">
              Why Shunyi Garments
            </p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Built on quality.
              <span className="block text-[#a8bd91]">
                Driven by trust.
              </span>
            </h2>
            <p className="mt-6 max-w-lg text-sm leading-8 text-white/60">
              We aim to create a manufacturing experience where clear
              communication, careful workmanship, and organized processes
              come together.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <CheckCircle2 className="shrink-0 text-[#a8bd91]" size={22} />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Production Process */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#718c58]">
              How We Work
            </p>
            <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Our Production Process
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#858a80]">
              A structured approach designed to keep every stage of
              manufacturing organized.
            </p>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <div key={item.step} className="relative">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#edf1e7] text-lg font-semibold text-[#718c58]">
                  {item.step}
                </div>
                {index !== process.length - 1 && (
                  <div className="absolute left-16 top-7 hidden h-px w-[calc(100%-3rem)] bg-[#e4e8df] lg:block" />
                )}
                <h3 className="mt-7 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 max-w-xs text-sm leading-7 text-[#858a80]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="px-5 py-20 md:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[32px] bg-[#71845e] px-7 py-16 text-white sm:px-14 sm:py-20">
          <div className="absolute -right-20 -top-32 h-80 w-80 rounded-full border border-white/10" />
          <div className="absolute -right-5 -top-20 h-64 w-64 rounded-full border border-white/10" />

          <div className="relative z-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/70">
              Let's Work Together
            </p>
            <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Have a project in mind?
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-8 text-white/75">
              Connect with Shunyi Garments to discuss your garment
              manufacturing requirements and explore opportunities to
              work together.
            </p>
            <Link
              href="/contact"
              className="mt-9 inline-flex items-center gap-3 rounded-full bg-white px-7 py-4 text-sm font-semibold text-[#536b42] transition hover:bg-[#f0f2eb]"
            >
              Get in Touch
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - no navbar */}
      <footer className="border-t border-[#e7e9e1] bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-9 md:flex-row md:items-center md:justify-between md:px-10">
          <div>
            <p className="text-lg font-bold tracking-tight">
              SHUNYI <span className="text-[#718c58]">GARMENTS</span>
            </p>
            <p className="mt-2 text-xs text-[#858a80]">
              Quality, craftsmanship & trust.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-[#73786f]">
            <Link href="/about" className="hover:text-[#718c58]">
              About
            </Link>
            <Link href="/services" className="hover:text-[#718c58]">
              Services
            </Link>
            <Link href="/contact" className="hover:text-[#718c58]">
              Contact
            </Link>
            <Link
              href="/admin/login"
              className="hover:text-[#718c58]"
            >
              Admin
            </Link>
          </div>

         <p className="text-xs text-[#a0a49b]">
  © 2026 Shunyi Garments. All rights reserved.
</p>
        </div>
      </footer>
    </main>
  );
}
