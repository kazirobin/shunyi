"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLinkIcon } from "lucide-react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import type { AdminDict } from "./i18n";
import { useAdminI18n } from "./i18n-provider";
import { LanguageSwitcher } from "./language-switcher";

type NavKey = keyof AdminDict["nav"];
const PAGES: Record<string, { section: NavKey; title: NavKey }> = {
  "/admin/dashboard": { section: "overview", title: "dashboard" },
  "/admin/employee": { section: "operations", title: "employees" },
  "/admin/attendance": { section: "operations", title: "attendance" },
  "/admin/layout": { section: "operations", title: "production" },
};

export function SiteHeader() {
  const pathname = usePathname();
  const { t } = useAdminI18n();
  const page = PAGES[pathname] ?? PAGES["/admin/dashboard"];

  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 rounded-t-2xl border-b bg-card/85 px-4 backdrop-blur md:px-6">
      <SidebarTrigger className="-ml-1.5 text-muted-foreground" />
      <Separator orientation="vertical" className="mr-1.5 data-vertical:h-4 data-vertical:self-auto" />
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem className="hidden sm:block">
            <BreadcrumbLink render={<Link href="/admin/dashboard" />}>Shunyi</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem className="hidden sm:block">{t.nav[page.section]}</BreadcrumbItem>
          <BreadcrumbSeparator className="hidden sm:block" />
          <BreadcrumbItem>
            <BreadcrumbPage className="font-medium">{t.nav[page.title]}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="ml-auto flex items-center gap-2">
        <LanguageSwitcher />
        <Button variant="outline" size="sm" nativeButton={false} render={<a href="/" target="_blank" rel="noopener noreferrer" />}>
          <ExternalLinkIcon />
          <span className="hidden sm:inline">{t.nav.viewSite}</span>
        </Button>
      </div>
    </header>
  );
}
