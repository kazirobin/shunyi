"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AdminLoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const t = useTranslations("admin.login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const callbackUrl = searchParams.get("callbackUrl") || "/admin/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError(t("error"));
      } else {
        router.push(callbackUrl);
        router.refresh();
      }
    } catch {
      setError(t("error"));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/50 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <div className="card-header text-center">
            <Link href="/" className="flex items-center justify-center space-x-2 mb-6">
              <span className="text-2xl font-bold text-primary">Shunyi</span>
              <span className="text-2xl font-medium text-foreground">Garments</span>
            </Link>
            <h1 className="card-title">{t("title")}</h1>
            <p className="card-description text-muted-foreground">{t("subtitle")}</p>
          </div>

          <form onSubmit={handleSubmit} className="card-content space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive" role="alert">
                {error}
              </div>
            )}

            <div className="space-y-1.5">
              <label htmlFor="email" className="label">
                {t("email")}
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
                placeholder="admin@shunyigarments.com"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="label">
                  {t("password")}
                </label>
                <Link href="#" className="text-sm text-primary hover:underline">
                  {t("forgotPassword")}
                </Link>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="input"
                placeholder="••••••••"
                disabled={isLoading}
              />
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  disabled={isLoading}
                />
                <span className="text-sm text-muted-foreground">{t("rememberMe")}</span>
              </label>
            </div>

            <button type="submit" className="btn btn-primary w-full" disabled={isLoading}>
              {isLoading ? t("loggingIn") : t("login")}
            </button>
          </form>

          <div className="card-footer justify-center text-sm text-muted-foreground">
            <Link href="/" className="text-primary hover:underline">
              ← Back to Website
            </Link>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Default credentials: admin@shunyigarments.com / admin123
        </p>
      </motion.div>
    </div>
  );
}