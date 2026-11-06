"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle, Shield, Search, Microscope, ClipboardCheck, RotateCcw, Award, Truck, ClipboardList, Settings, Thermometer, Weight } from "lucide-react";

export default function QualityProcessPage() {
  const t = useTranslations("homepage");

  const qualityStages = [
    {
      stage: 1,
      title: "Incoming Material Inspection",
      icon: Search,
      color: "blue",
      steps: [
        "Fabric inspection per 4-point system (ASTM D5430)",
        "Colorfastness testing (light, wash, rub, perspiration)",
        "Dimensional stability and shrinkage testing",
        "Fabric weight (GSM) and construction verification",
        "Chemical testing for restricted substances (OEKO-TEX)",
        "Accessory inspection (buttons, zippers, labels, threads)",
      ],
      equipment: ["Spectrophotometer", "GSM Cutter", "Shrinkage Template", "Crockmeter", "Light Box"],
      duration: "24-48 hours",
    },
    {
      stage: 2,
      title: "Pre-Production Approval",
      icon: ClipboardCheck,
      color: "purple",
      steps: [
        "Pre-production sample approval (PP sample)",
        "Fit session with technical team and buyer",
        "Construction and workmanship review",
        "Measurement specification verification",
        "Wash test and appearance approval",
        "Label and packaging sample approval",
      ],
      equipment: ["Measurement Forms", "Fit Forms", "Wash Test Machine", "Digital Camera"],
      duration: "3-5 days",
    },
    {
      stage: 3,
      title: "In-Line Production Control",
      icon: Settings,
      color: "orange",
      steps: [
        "Inline inspection at every operation (100% check)",
        "End-of-line inspection (AQL 2.5)",
        "Real-time defect tracking and categorization",
        "Workmanship standards enforcement",
        "Measurement checks every 2 hours",
        "Needle detection and broken needle policy",
      ],
      equipment: ["Measurement Tapes", "Defect Classification Charts", "Needle Detector", "Inline Tablets"],
      duration: "Continuous",
    },
    {
      stage: 4,
      title: "Final Random Inspection",
      icon: Shield,
      color: "green",
      steps: [
        "Final inspection per AQL 2.5/4.0 (ISO 2859-1)",
        "Measurement audit on 100% of size range",
        "Visual inspection for all defect categories",
        "Functionality testing (zippers, buttons, snaps)",
        "Label verification (care, size, country of origin)",
        "Packing and carton audit",
      ],
      equipment: ["AQL Tables", "Metal Detector", "Barcode Scanner", "Checklist Tablets"],
      duration: "Before shipment",
    },
    {
      stage: 5,
      title: "Laboratory Testing",
      icon: Microscope,
      color: "red",
      steps: [
        "Physical testing: tensile, tear, burst, abrasion",
        "Colorfastness: wash, light, rub, perspiration, water",
        "Dimensional stability after wash/dry cycles",
        "Pilling resistance and appearance retention",
        "Flammability testing (where applicable)",
        "Chemical testing: formaldehyde, pH, AZO dyes, heavy metals",
      ],
      equipment: ["Tensile Tester", "Martindale Abrasion", "Washfastness Tester", "Spectrophotometer", "pH Meter"],
      duration: "Per buyer protocol",
    },
    {
      stage: 6,
      title: "Shipment Release",
      icon: Truck,
      color: "indigo",
      steps: [
        "Final quality report generation",
        "Inspection certificate issuance",
        "Container loading supervision",
        "Seal verification and documentation",
        "Shipping document preparation",
        "Buyer notification and tracking",
      ],
      equipment: ["Seal Locks", "Container Checklist", "Digital Camera", "Document Scanner"],
      duration: "Loading day",
    },
  ];

  const defectCategories = [
    { category: "Critical Defects", examples: ["Sharp edges/metal contamination", "Needle/broken needle", "Safety hazards", "Wrong labels causing legal issues"], aql: "0%", color: "red" },
    { category: "Major Defects", examples: ["Open seams/broken stitches", "Measurement out of tolerance", "Color shade variation", "Fabric holes/cuts/stains", "Missing/incorrect labels"], aql: "2.5%", color: "orange" },
    { category: "Minor Defects", examples: ["Thread trimming issues", "Slight shade variation", "Minor press marks", "Label position variance", "Loose threads"], aql: "4.0%", color: "yellow" },
  ];

  const labCapabilities = [
    { test: "Tensile Strength", standard: "ASTM D5034 / ISO 13934-1", equipment: "Universal Testing Machine" },
    { test: "Tear Strength", standard: "ASTM D2261 / ISO 13937-2", equipment: "Elmendorf Tear Tester" },
    { test: "Burst Strength", standard: "ASTM D3786 / ISO 13938-1", equipment: "Hydraulic Burst Tester" },
    { test: "Abrasion Resistance", standard: "ASTM D4966 / ISO 12947-2", equipment: "Martindale Abrasion Tester" },
    { test: "Pilling Resistance", standard: "ASTM D4970 / ISO 12945-2", equipment: "Pilling Tester (Martindale)" },
    { test: "Colorfastness to Wash", standard: "AATCC 61 / ISO 105-C06", equipment: "Launder-Ometer" },
    { test: "Colorfastness to Light", standard: "AATCC 16 / ISO 105-B02", equipment: "Xenon Arc Tester" },
    { test: "Colorfastness to Rub", standard: "AATCC 8 / ISO 105-X12", equipment: "Crockmeter" },
    { test: "Dimensional Stability", standard: "AATCC 135 / ISO 6330", equipment: "Washing Machine + Template" },
    { test: "Formaldehyde Content", standard: "ISO 14184-1 / JIS L 1041", equipment: "Spectrophotometer" },
    { test: "pH Value", standard: "ISO 3071 / AATCC 81", equipment: "pH Meter" },
    { test: "AZO Dyes", standard: "EN 14362-1 / ISO 17234-1", equipment: "GC-MS / HPLC" },
  ];

  return (
    <div className="space-y-16 py-12">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="py-16 md:py-24 bg-gradient-to-b from-purple-50/50 via-background to-background"
        aria-labelledby="quality-heading"
      >
        <div className="container-custom">
          <div className="mx-auto max-w-4xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full bg-purple-600/10 px-4 py-1.5 text-sm font-medium text-purple-600 mb-6">
              Quality Assurance
            </span>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">
              Quality Management System
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Our 6-stage quality process ensures every garment meets international standards before it leaves our facility. From raw material to final shipment, quality is built into every step.
            </p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="py-16"
        aria-labelledby="stages-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              6-Stage Quality Process
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive quality control at every stage of production.
            </p>
          </div>

          <div className="space-y-8">
            {qualityStages.map((stage, index) => (
              <motion.article
                key={stage.stage}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="card overflow-hidden"
              >
                <div className={`border-l-4 border-${stage.color}-500`}>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex items-center gap-4">
                        <div className="flex-shrink-0 h-16 w-16 rounded-xl bg-${stage.color}-100 flex items-center justify-center text-${stage.color}-600">
                          <stage.icon className="h-8 w-8" aria-hidden="true" />
                        </div>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <span className={`badge badge-${stage.color}`}>Stage {stage.stage}</span>
                            <span className="text-sm text-muted-foreground">Duration: {stage.duration}</span>
                          </div>
                          <h3 className="text-2xl font-bold text-foreground">{stage.title}</h3>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <ClipboardList className="h-4 w-4" />
                          {stage.steps.length} Checkpoints
                        </span>
                        <span className="flex items-center gap-1">
                          <Settings className="h-4 w-4" />
                          {stage.equipment.length} Equipment
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {stage.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                          <div className="flex-shrink-0 mt-0.5 h-5 w-5 rounded-full border-2 border-${stage.color}-500 flex items-center justify-center">
                            <CheckCircle className="h-3 w-3 text-${stage.color}-500" />
                          </div>
                          <p className="text-sm text-foreground">{step}</p>
                        </div>
                      ))}
                    </div>

                    <details className="mt-6 group">
                      <summary className="flex items-center gap-2 cursor-pointer text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                        <Settings className="h-4 w-4" />
                        Equipment Used
                        <svg className="ml-auto h-4 w-4 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <div className="mt-4 p-4 rounded-lg bg-muted/50">
                        <ul className="space-y-2">
                          {stage.equipment.map((eq, eqIndex) => (
                            <li key={eqIndex} className="flex items-center gap-2 text-sm text-foreground">
                              <span className="h-2 w-2 rounded-full bg-${stage.color}-500" />
                              {eq}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </details>
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
        transition={{ delay: 0.2 }}
        className="py-16 bg-muted/30"
        aria-labelledby="defects-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              Defect Classification (AQL Standards)
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Following ISO 2859-1 sampling procedures with customized defect categorization.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {defectCategories.map((defect, index) => (
              <motion.article
                key={defect.category}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="card p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-lg bg-${defect.color}-100 flex items-center justify-center text-${defect.color}-600`}>
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{defect.category}</h3>
                    <p className="text-sm text-muted-foreground">AQL: {defect.aql}</p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {defect.examples.map((example, exIndex) => (
                    <li key={exIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="flex-shrink-0 mt-1 h-1.5 w-1.5 rounded-full bg-${defect.color}-500" />
                      {example}
                    </li>
                  ))}
                </ul>
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
        aria-labelledby="lab-heading"
      >
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-foreground">
              In-House Laboratory Capabilities
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Fully equipped testing lab accredited to international standards.
            </p>
          </div>

          <div className="card overflow-hidden">
            <table className="w-full" role="table">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Test Parameter</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Standard Reference</th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Equipment</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {labCapabilities.map((test, index) => (
                  <tr key={index} className="hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{test.test}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground font-mono text-xs">{test.standard}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{test.equipment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-16 bg-primary text-primary-foreground"
        aria-labelledby="cta-heading"
      >
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Quality You Can Trust
          </h2>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Experience our rigorous quality process firsthand. Request a factory audit or sample evaluation.
          </p>
          <a href="/rfq" className="btn bg-primary-foreground text-primary hover:bg-primary-foreground/90 text-lg px-8 py-3">
            Request Quality Audit
          </a>
        </div>
      </motion.section>
    </div>
  );
}