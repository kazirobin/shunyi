import type { Metadata } from "next";
import { Suspense } from "react";

import { HTML_LANG } from "@/components/admin/i18n";
import { AdminI18nProvider } from "@/components/admin/i18n-provider";
import { getAdminLocale } from "@/lib/admin-locale";
import { LoginForm } from "./login-form";

export const metadata: Metadata = { title: "Sign in" };

async function LocalizedLogin() {
  const locale = await getAdminLocale();
  return (
    <AdminI18nProvider locale={locale}>
      <div lang={HTML_LANG[locale]}>
        <LoginForm />
      </div>
    </AdminI18nProvider>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="min-h-svh bg-background lg:grid lg:grid-cols-[1.1fr_1fr]"><div className="hidden bg-sidebar lg:block" /></div>}>
      <LocalizedLogin />
    </Suspense>
  );
}
