"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeftIcon, EyeIcon, EyeOffIcon, LoaderCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { loginAction } from "./actions";

export default function AdminLoginPage() {
  const router = useRouter();
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
        setError(result.message);
      }
    } catch {
      setError("Could not reach the server. Check your connection and try again.");
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
            <span className="block font-semibold">Shunyi Garments</span>
            <span className="block text-xs text-white/60">Factory admin</span>
          </span>
        </div>
        <div className="relative mt-auto max-w-md space-y-4">
          <p className="text-3xl leading-tight font-semibold tracking-tight">
            Run the floor from one place: people, products and every piece that moves through the line.
          </p>
          <p className="text-sm text-white/60">
            OEM and ODM cycling, ski, motocross and outdoor apparel, made in Zhongshan since 2004.
          </p>
        </div>
      </aside>

      <main className="flex flex-col p-6 sm:p-10">
        <Link href="/" className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeftIcon className="size-4" /> Back to website
        </Link>
        <div className="mx-auto flex w-full max-w-sm flex-1 flex-col justify-center py-12">
          <div className="mb-8 flex items-center gap-3 lg:hidden">
            <span className="flex size-10 items-center justify-center rounded-xl bg-primary">
              <Image src="/images/shunyi/logo.png" alt="" width={26} height={13} />
            </span>
            <span className="font-semibold">Shunyi Garments</span>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Sign in to the admin</h1>
          <p className="mt-2 text-sm text-muted-foreground">Enter the administrator password to manage employees and production.</p>

          <form onSubmit={handleLogin} className="mt-8 space-y-5">
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
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
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
        </div>
        <p className="text-center text-xs text-muted-foreground">Zhongshan Shunyi Intelligent Protective Equipment Technology Co., Ltd</p>
      </main>
    </div>
  );
}
