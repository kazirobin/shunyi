"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Upload, CheckCircle, AlertCircle, X, FileText, MessageSquare as MessageSquareIcon, Package } from "lucide-react";

const rfqSchema = z.object({
  buyerName: z.string().min(2, "Buyer name is required"),
  companyName: z.string().min(2, "Company name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number is required"),
  country: z.string().min(1, "Country is required"),
  productType: z.enum(["KNITWEAR", "WOVEN", "DENIM", "OUTERWEAR"]),
  estimatedQuantity: z.number().min(1, "Quantity must be at least 1"),
  targetPrice: z.number().min(0).optional(),
  currency: z.string().min(1, "Currency is required"),
  specifications: z.string().min(50, "Please provide detailed specifications (min 50 characters)"),
  additionalInfo: z.string().optional(),
});

type RFQFormData = z.infer<typeof rfqSchema> & { targetPrice?: number };

const defaultValues: RFQFormData = {
  buyerName: "",
  companyName: "",
  email: "",
  phone: "",
  country: "",
  productType: "KNITWEAR",
  estimatedQuantity: 1,
  targetPrice: undefined,
  currency: "USD",
  specifications: "",
  additionalInfo: "",
};

const productTypes = [
  { value: "KNITWEAR", label: "Knitwear (T-shirts, Polos, Hoodies, Sweatshirts)" },
  { value: "WOVEN", label: "Woven (Shirts, Blouses, Trousers, Dresses)" },
  { value: "DENIM", label: "Denim (Jeans, Jackets, Skirts)" },
  { value: "OUTERWEAR", label: "Outerwear (Jackets, Coats, Parkas, Vests)" },
];

const countries = [
  "United States", "United Kingdom", "Germany", "France", "Italy", "Spain",
  "Netherlands", "Belgium", "Sweden", "Denmark", "Norway", "Finland",
  "Japan", "South Korea", "Australia", "Canada", "China", "Hong Kong",
  "Singapore", "UAE", "Saudi Arabia", "Bangladesh", "India", "Pakistan",
  "Turkey", "Poland", "Czech Republic", "Portugal", "Greece", "Ireland",
];

export default function RFQPage() {
  const t = useTranslations("rfq");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [techPackFiles, setTechPackFiles] = useState<File[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    reset,
  } = useForm<RFQFormData>({
    resolver: zodResolver(rfqSchema),
    defaultValues,
  });

  const onSubmit = async (data: RFQFormData) => {
    setFormState("submitting");
    setErrorMessage("");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState("success");
      reset();
      setTechPackFiles([]);
    } catch {
      setFormState("error");
      setErrorMessage("Failed to submit inquiry. Please try again.");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter((f) => f.type === "application/pdf" || f.type.startsWith("image/"));
    setTechPackFiles((prev) => [...prev, ...validFiles]);
  };

  const removeFile = (index: number) => {
    setTechPackFiles((prev) => prev.filter((_, i) => i !== index));
  };

  if (formState === "success") {
    return (
      <div className="py-12 md:py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto text-center"
        >
          <div className="mx-auto mb-6 h-20 w-20 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            {t("form.success").split(".")[0]}
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            {t("form.success").split(".").slice(1).join(".")}
          </p>
          <button
            onClick={() => setFormState("idle")}
            className="btn btn-primary"
          >
            Submit Another Inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl mx-auto"
      >
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            {t("title")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t("subtitle")}
          </p>
        </div>

        {formState === "error" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 p-4 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-3"
            role="alert"
          >
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-destructive">Submission Failed</p>
              <p className="text-sm text-muted-foreground">{errorMessage}</p>
            </div>
            <button
              onClick={() => setFormState("idle")}
              className="ml-auto text-destructive hover:text-destructive/80"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="card" noValidate>
          <div className="card-content pt-4 space-y-6">
            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                Buyer Information
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="label">{t("form.buyerName")} *</label>
                  <input {...register("buyerName")} className="input" placeholder="John Smith" />
                  {errors.buyerName && <p className="text-sm text-destructive mt-1">{errors.buyerName.message}</p>}
                </div>
                <div>
                  <label className="label">{t("form.companyName")} *</label>
                  <input {...register("companyName")} className="input" placeholder="H&M / Inditex / Gap Inc." />
                  {errors.companyName && <p className="text-sm text-destructive mt-1">{errors.companyName.message}</p>}
                </div>
                <div>
                  <label className="label">{t("form.email")} *</label>
                  <input type="email" {...register("email")} className="input" placeholder="john@company.com" />
                  {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="label">{t("form.phone")} *</label>
                  <input type="tel" {...register("phone")} className="input" placeholder="+1-XXX-XXX-XXXX" />
                  {errors.phone && <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>}
                </div>
                <div>
                  <label className="label">{t("form.country")} *</label>
                  <select {...register("country")} className="input">
                    <option value="">Select Country</option>
                    {countries.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  {errors.country && <p className="text-sm text-destructive mt-1">{errors.country.message}</p>}
                </div>
              </div>
            </div>

            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Package className="h-5 w-5 text-primary" />
                Product Details
              </h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="label">{t("form.product")} *</label>
                  <select {...register("productType")} className="input">
                    <option value="">Select Product Type</option>
                    {productTypes.map((p) => <option key={p.value} value={p.value}>{p.label}</option>)}
                  </select>
                  {errors.productType && <p className="text-sm text-destructive mt-1">{errors.productType.message}</p>}
                </div>
                <div>
                  <label className="label">{t("form.quantity")} *</label>
                  <input type="number" {...register("estimatedQuantity", { valueAsNumber: true })} className="input" placeholder="50000" min="1" />
                  {errors.estimatedQuantity && <p className="text-sm text-destructive mt-1">{errors.estimatedQuantity.message}</p>}
                </div>
                <div>
                  <label className="label">{t("form.targetPrice")}</label>
                  <div className="flex gap-2">
                    <select {...register("currency")} className="input w-28">
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="BDT">BDT</option>
                    </select>
                    <input type="number" {...register("targetPrice", { valueAsNumber: true })} className="input flex-1" placeholder="5.50" step="0.01" min="0" />
                  </div>
                </div>
              </div>
            </div>

            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                {t("form.specifications")}
              </h2>
              <div>
                <label className="label">{t("form.specifications")} *</label>
                <textarea
                  {...register("specifications")}
                  className="input min-h-[120px] resize-y"
                  placeholder="Please provide detailed specifications including:
- Fabric composition and GSM
- Color requirements (Pantone codes if available)
- Size range and grading
- Trim details (buttons, zippers, labels, etc.)
- Construction details (stitching, seams, finishing)
- Packaging requirements
- Quality standards and testing requirements
- Any special treatments or finishes"
                />
                {errors.specifications && <p className="text-sm text-destructive mt-1">{errors.specifications.message}</p>}
                <p className="text-xs text-muted-foreground mt-1">Minimum 50 characters. Be as detailed as possible for accurate quotation.</p>
              </div>
            </div>

            <div className="border-b pb-6">
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <Upload className="h-5 w-5 text-primary" />
                {t("form.techPack")}
              </h2>
              <div>
                <label className="btn btn-outline w-full justify-center">
                  <Upload className="h-4 w-4 mr-2" />
                  Select Tech Pack Files
                  <input type="file" accept=".pdf,.jpg,.jpeg,.png,.ai,.eps" multiple onChange={handleFileChange} className="sr-only" />
                </label>
                <p className="text-xs text-muted-foreground mt-1">Supported formats: PDF, JPG, PNG, AI, EPS (Max 10MB per file)</p>
                {techPackFiles.length > 0 && (
                  <div className="mt-3 space-y-2 max-h-40 overflow-y-auto">
                    {techPackFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 rounded bg-muted/50 text-sm">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-muted-foreground" />
                          <span className="truncate max-w-[200px]">{file.name}</span>
                          <span className="text-xs text-muted-foreground">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        </div>
                        <button type="button" onClick={() => removeFile(index)} className="text-destructive hover:text-destructive/80">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div>
              <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <MessageSquareIcon className="h-5 w-5 text-primary" />
                {t("form.additionalInfo")}
              </h2>
              <div>
                <label className="label">{t("form.additionalInfo")}</label>
                <textarea
                  {...register("additionalInfo")}
                  className="input min-h-[80px] resize-y"
                  placeholder="Any additional requirements, deadlines, certifications needed, or special instructions..."
                />
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex justify-end pt-4 border-t"
            >
              <button type="submit" className="btn btn-primary text-lg px-8 py-3" disabled={formState === "submitting"}>
                {formState === "submitting" ? t("form.submitting") : t("form.submit")}
              </button>
            </motion.div>
          </div>
        </form>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-8 grid gap-6 md:grid-cols-3"
        >
          <div className="card p-6 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Mail className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Email Us</h3>
            <p className="text-sm text-muted-foreground mt-1">rfq@shunyigarments.com</p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Phone className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Call Us</h3>
            <p className="text-sm text-muted-foreground mt-1">+880-XX-XXXXXXX</p>
          </div>
          <div className="card p-6 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <MapPin className="h-6 w-6" />
            </div>
            <h3 className="font-semibold text-foreground">Visit Us</h3>
            <p className="text-sm text-muted-foreground mt-1">Gazipur, Bangladesh</p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}