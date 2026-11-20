"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useAdminI18n } from "@/components/admin/i18n-provider";
import { LanguageSwitcher } from "@/components/admin/language-switcher";

import { loginAction } from "./actions";

export function LoginForm() {
  const router = useRouter();
  const { t: dict } = useAdminI18n();
  const t = dict.login;
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await loginAction(password);
      if (result.success) {
        router.push("/admin/dashboard");
        router.refresh();
      } else {
        setError(t.wrong);
      }
    } catch {
      setError(t.network);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-svh bg-background lg:grid-cols-[1.1fr_1fr]">
      <aside className="relative hidden overflow-hidden bg-sidebar p-10 text-white lg:flex lg:flex-col">
        <Image
          src="/images/shunyi/factory/ws1.jpg"
          alt=""
          fill
          priority
          sizes="55vw"
          className="object-cover opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-sidebar via-sidebar/70 to-sidebar/30" />
        <div className="relative flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-xl bg-sidebar-primary">
            <Image src="/images/shunyi/logo.png" alt="" width={26} height={13} />
          </span>
          <span className="leading-tight">
            <span className="block font-semibold">{dict.nav.brand}</span>
            <span className="block text-xs text-white/60">{dict.nav.subtitle}</span>
          </span>
        </div>
        <div className="relative mt-auto max-w-md space-y-4">
          <p className="text-3xl leading-tight font-semibold tracking-tight">
            {t.headline}
          </p>
          <p className="text-sm text-white/60">
            {t.about}
          </p>
        </div>
      </aside>

      <main className="flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between gap-3">
          <Link href="/" className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
            <ArrowLeftIcon className="size-4" /> {t.back}
          </Link>
          <LanguageSwitcher />
        </div>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary">
              <Image src="/images/shunyi/logo.png" alt="" width={26} height={13} />
            </span>
            <span className="font-semibold">{dict.nav.brand}</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t.desc}</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">{t.password}</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  autoFocus
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? "login-error" : undefined}
                  className="h-11 bg-card pr-11"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                  aria-label={showPassword ? t.hide : t.show}
                >
                  {showPassword ? <EyeOffIcon className="size-4" /> : <EyeIcon className="size-4" />}
                </button>
              </div>
              {error && (
                <p id="login-error" role="alert" className="text-sm text-destructive">
                  {error}
                </p>
              )}
            </div>

            <Button type="submit" size="lg" className="h-11 w-full" disabled={loading || !password}>
              {loading && <LoaderCircleIcon className="animate-spin" />}
              {loading ? t.signingIn : t.signIn}
            </Button>
          </form>
        </div>
        <p className="text-center text-xs text-muted-foreground">Zhongshan Shunyi Intelligent Protective Equipment Technology Co., Ltd</p>
      </main>
    </div>
  );
}
