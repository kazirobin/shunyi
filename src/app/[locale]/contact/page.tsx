"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageSquare, Send, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
  {
    icon: MapPin,
    title: "Corporate Office",
    address: "House 12, Road 5, Gulshan-1, Dhaka 1212, Bangladesh",
    phone: "+880-2-XXXXXXXX",
    email: "corporate@shunyigarments.com",
  },
  {
    icon: MapPin,
    title: "Manufacturing Facility",
    address: "Plot 45-50, BSCIC Industrial Area, Kashimpur, Gazipur 1700, Bangladesh",
    phone: "+880-2-XXXXXXXX",
    email: "factory@shunyigarments.com",
  },
];

export default function ContactPage() {
  const t = useTranslations("contact");
  const [formState, setFormState] = useState<"idle" | "submitting" | "success">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState("submitting");
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setFormState("success");
      reset();
    } catch {
      setFormState("idle");
    }
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
          <h1 className="text-3xl font-bold text-foreground mb-4">Message Sent Successfully!</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Thank you for contacting us. We'll get back to you within 24 hours.
          </p>
          <button onClick={() => setFormState("idle")} className="btn btn-primary">
            Send Another Message
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
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-4">
            {t("title")}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4">
            {t("title")}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out through any of the channels below.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="space-y-8">
              {contactInfo.map((info, index) => (
                <div key={index} className="card p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                      <info.icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground mb-2">{info.title}</h3>
                      <address className="not-italic text-muted-foreground text-sm mb-3">{info.address}</address>
                      <div className="space-y-1 text-sm">
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          <a href={`tel:${info.phone}`} className="hover:text-primary transition-colors">{info.phone}</a>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Mail className="h-4 w-4" />
                          <a href={`mailto:${info.email}`} className="hover:text-primary transition-colors">{info.email}</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <a href="#" className="card p-6 text-center hover:shadow-md transition-shadow group">
                <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.478 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.572-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347zM12 10c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                </div>
                <h3 className="font-semibold text-foreground">WhatsApp</h3>
                <p className="text-sm text-muted-foreground">+880-1XXX-XXXXXX</p>
              </a>
              <a href="#" className="card p-6 text-center hover:shadow-md transition-shadow group">
                <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center text-green-600 group-hover:bg-green-200 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M21.5 1.5c.1 0 .2.1.2.2V21c0 .1-.1.2-.2.2H2.5c-.1 0-.2-.1-.2-.2V1.7c0-.1.1-.2.2-.2h19zm-1.5 5c-.1 0-.2.1-.2.2v10c0 .1.1.2.2.2h9V6.7c0-.1-.1-.2-.2-.2h-9zm-4 8.3c-.3 0-.6-.2-.6-.6V8.4c0-.3.2-.6.6-.6.3 0 .6.2.6.6v10.8c0 .3-.2.6-.6.6zm-6-10.2c-.3 0-.6-.2-.6-.6V5.9c0-.3.2-.6.6-.6.3 0 .6.2.6.6v7.6c0 .3-.2.6-.6.6zm-6 12.3c-.3 0-.6-.2-.6-.6V5c0-.3.2-.6.6-.6.3 0 .6.2.6.6v11.1c0 .3-.2.6-.6.6z"/></svg>
                </div>
                <h3 className="font-semibold text-foreground">WeChat</h3>
                <p className="text-sm text-muted-foreground">shunyigarments</p>
              </a>
              <a href="#" className="card p-6 text-center hover:shadow-md transition-shadow group">
                <div className="mx-auto mb-3 h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-foreground">Quick Message</h3>
                <p className="text-sm text-muted-foreground">24hr Response</p>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="card">
              <div className="card-header">
                <h2 className="card-title">Send Us a Message</h2>
                <p className="card-description">Fill out the form and we'll get back to you within 24 hours.</p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="card-content space-y-4" noValidate>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="label">{t("form.name")} *</label>
                    <input {...register("name")} className="input" placeholder="Your Name" />
                    {errors.name && <p className="text-sm text-destructive mt-1">{errors.name.message}</p>}
                  </div>
                  <div>
                    <label className="label">{t("form.email")} *</label>
                    <input type="email" {...register("email")} className="input" placeholder="your@email.com" />
                    {errors.email && <p className="text-sm text-destructive mt-1">{errors.email.message}</p>}
                  </div>
                </div>
                <div>
                  <label className="label">{t("form.subject")} *</label>
                  <select {...register("subject")} className="input">
                    <option value="">Select Subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="quotation">Request for Quotation</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="career">Career Opportunities</option>
                    <option value="media">Media & Press</option>
                    <option value="compliance">Compliance & Certifications</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.subject && <p className="text-sm text-destructive mt-1">{errors.subject.message}</p>}
                </div>
                <div>
                  <label className="label">{t("form.message")} *</label>
                  <textarea
                    {...register("message")}
                    className="input min-h-[120px] resize-y"
                    placeholder="Tell us about your requirements, questions, or how we can help..."
                  />
                  {errors.message && <p className="text-sm text-destructive mt-1">{errors.message.message}</p>}
                </div>
                <button type="submit" className="btn btn-primary w-full" disabled={formState === "submitting"}>
                  {formState === "submitting" ? "Sending..." : t("form.submit")}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6 text-center">Find Us on Map</h2>
          <div className="card overflow-hidden">
            <div className="aspect-video bg-muted flex items-center justify-center">
              <div className="text-center p-8">
                <MapPin className="mx-auto mb-3 h-12 w-12 text-muted-foreground/50" />
                <p className="text-muted-foreground">Google Maps Integration</p>
                <p className="text-sm text-muted-foreground mt-1">Factory: Gazipur, Bangladesh</p>
                <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-4 inline-flex">
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}