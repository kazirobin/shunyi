
"use client";
import Navbar from "@/components/layout/navbar";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LockKeyhole, Eye, EyeOff, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password === "1234") {
      router.push("/admin/dashboard");
    } else {
      setError("Incorrect password. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-[#0B1120] px-4 py-12">
      <Card className="w-full max-w-md border-slate-800 bg-[#111827] text-white shadow-2xl">

        <CardHeader className="items-center space-y-4 text-center">
          <div className="rounded-2xl bg-blue-500/10 p-4">
            <ShieldCheck size={36} className="text-blue-400" />
          </div>
  <Navbar variant="public"/>
          <div>
            <CardTitle className="text-2xl">
              Admin Login
            </CardTitle>

            <CardDescription className="mt-2 text-slate-400">
              Sign in to access your management dashboard.
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleLogin} className="space-y-5">

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">
                Admin Password
              </Label>

              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-slate-700 bg-slate-900 pr-12 text-white placeholder:text-slate-500"
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <p className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-400">
                {error}
              </p>
            )}

            <Button
              type="submit"
              className="w-full"
              disabled={loading || !password}
            >
              <LockKeyhole className="mr-2" size={17} />
              {loading ? "Signing in..." : "Sign In"}
            </Button>

          </form>

          <p className="mt-6 text-center text-xs text-slate-500">
            Shunyi Garments Management Portal
          </p>
        </CardContent>
      </Card>
    </main>
  );
}
