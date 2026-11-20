import { Suspense } from "react";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/admin/app-sidebar";
import { SiteHeader } from "@/components/admin/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { isLoggedIn } from "@/lib/auth";

async function RequireAuth({ children }: { children: React.ReactNode }) {
  if (!(await isLoggedIn())) redirect("/admin/login");
  return children;
}

function PageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-9 w-56" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }, (_, i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
      <Skeleton className="h-80 rounded-2xl" />
    </div>
  );
}

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className="min-w-0">
        <SiteHeader />
        <div className="flex-1 p-4 md:p-6 lg:p-8">
          <Suspense fallback={<PageSkeleton />}>
            <RequireAuth>{children}</RequireAuth>
          </Suspense>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
