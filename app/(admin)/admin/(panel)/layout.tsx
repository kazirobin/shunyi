import { Suspense } from "react";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/admin/app-sidebar";
import { HTML_LANG } from "@/components/admin/i18n";
import { AdminI18nProvider } from "@/components/admin/i18n-provider";
import { SiteHeader } from "@/components/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAdminLocale } from "@/lib/admin-locale";
import { isLoggedIn } from "@/lib/auth";

async function Frame({ children }: { children: React.ReactNode }) {
  if (!(await isLoggedIn())) redirect("/admin/login");
  const locale = await getAdminLocale();
  return (
    <AdminI18nProvider locale={locale}>
      <SidebarProvider lang={HTML_LANG[locale]}>
        <AppSidebar />
        <SidebarInset className="min-w-0">
          <SiteHeader />
          <div className="flex-1 p-4 md:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AdminI18nProvider>
  );
}

function FrameSkeleton() {
  return (
    <div className="flex min-h-svh gap-2 bg-sidebar p-2">
      <div className="hidden w-[calc(16rem-0.5rem)] shrink-0 space-y-3 p-2 md:block">
        <Skeleton className="h-10 bg-white/10" />
        <Skeleton className="h-8 bg-white/5" />
        <Skeleton className="h-8 bg-white/5" />
        <Skeleton className="h-8 bg-white/5" />
      </div>
      <div className="flex-1 space-y-6 rounded-2xl bg-background p-8">
        <Skeleton className="h-9 w-56" />
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }, (_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-80 rounded-2xl" />
      </div>
    </div>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<FrameSkeleton />}>
      <Frame>{children}</Frame>
    </Suspense>
  );
}
