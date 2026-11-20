"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  CalendarCheckIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  ExternalLinkIcon,
  FactoryIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  LogOutIcon,
  ShieldCheckIcon,
  UsersIcon,
} from "lucide-react";

import { logoutAction } from "@/app/(admin)/admin/login/actions";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";

type Item = { title: string; href: string; icon: React.ComponentType; external?: boolean };
type Group = { label: string; items: Item[] };

const GROUPS: Group[] = [
  {
    label: "Overview",
    items: [{ title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboardIcon }],
  },
  {
    label: "Operations",
    items: [
      { title: "Employees", href: "/admin/employee", icon: UsersIcon },
      { title: "Attendance", href: "/admin/attendance", icon: CalendarCheckIcon },
      { title: "Production", href: "/admin/layout", icon: FactoryIcon },
    ],
  },
  {
    label: "Website",
    items: [
      { title: "English site", href: "/", icon: GlobeIcon, external: true },
      { title: "中文网站", href: "/zh", icon: GlobeIcon, external: true },
    ],
  },
];

function NavGroup({ group, pathname }: { group: Group; pathname: string }) {
  const { setOpenMobile } = useSidebar();
  return (
    <Collapsible defaultOpen className="group/collapsible" render={<SidebarGroup />}>
      <SidebarGroupLabel
        render={<CollapsibleTrigger />}
        className="w-full cursor-pointer text-[11px] tracking-wide text-sidebar-foreground/50 hover:text-sidebar-foreground"
      >
        {group.label}
        <ChevronRightIcon className="ml-auto transition-transform duration-200 group-data-open/collapsible:rotate-90" />
      </SidebarGroupLabel>
      <CollapsibleContent className="h-(--collapsible-panel-height) overflow-hidden transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0">
        <SidebarGroupContent>
          <SidebarMenu>
            {group.items.map((item) => {
              const active = !item.external && (pathname === item.href || pathname.startsWith(`${item.href}/`));
              const Icon = item.icon;
              return (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    isActive={active}
                    className="relative data-active:bg-sidebar-accent data-active:text-white data-active:before:absolute data-active:before:inset-y-2 data-active:before:-left-2 data-active:before:w-1 data-active:before:rounded-r-full data-active:before:bg-sidebar-primary group-data-[collapsible=icon]:before:hidden data-active:[&>svg]:text-sidebar-primary"
                    render={
                      item.external ? (
                        <a href={item.href} target="_blank" rel="noopener noreferrer" />
                      ) : (
                        <Link href={item.href} onClick={() => setOpenMobile(false)} />
                      )
                    }
                  >
                    <Icon />
                    <span>{item.title}</span>
                    {item.external && <ExternalLinkIcon className="ml-auto size-3.5! opacity-40" />}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroupContent>
      </CollapsibleContent>
    </Collapsible>
  );
}

function UserMenu() {
  const { isMobile } = useSidebar();
  const router = useRouter();

  async function logout() {
    await logoutAction();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={<SidebarMenuButton size="lg" className="aria-expanded:bg-sidebar-accent" />}
          >
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-sidebar-foreground">
              <ShieldCheckIcon className="size-4" />
            </span>
            <span className="grid flex-1 text-left leading-tight">
              <span className="truncate text-sm font-medium text-white">Administrator</span>
              <span className="truncate text-xs text-sidebar-foreground/60">Account menu</span>
            </span>
            <ChevronsUpDownIcon className="ml-auto opacity-60" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-56" side={isMobile ? "bottom" : "right"} align="end" sideOffset={8}>
            <DropdownMenuItem render={<a href="/" target="_blank" rel="noopener noreferrer" />}>
              <GlobeIcon />
              View public site
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem variant="destructive" onClick={logout}>
              <LogOutIcon />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}

export function AppSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" render={<Link href="/admin/dashboard" />} className="hover:bg-transparent">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-sidebar-primary">
                <Image src="/images/shunyi/logo.png" alt="" width={22} height={11} />
              </span>
              <span className="grid flex-1 leading-tight">
                <span className="truncate text-sm font-semibold text-white">Shunyi Garments</span>
                <span className="truncate text-xs text-sidebar-foreground/60">Factory admin</span>
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {GROUPS.map((group) => (
          <NavGroup key={group.label} group={group} pathname={pathname} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
