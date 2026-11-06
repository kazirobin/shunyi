"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { Menu, X, ChevronLeft, ChevronRight, LogOut, Settings } from "lucide-react";

interface AdminLayoutClientProps {
  user: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
    role?: string;
  };
  children: React.ReactNode;
}

export default function AdminLayoutClient({ user, children }: AdminLayoutClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("sidebarCollapsed");
      if (saved !== null) setSidebarCollapsed(JSON.parse(saved));
    }
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);
  const toggleCollapse = () => {
    const next = !sidebarCollapsed;
    setSidebarCollapsed(next);
    localStorage.setItem("sidebarCollapsed", JSON.stringify(next));
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: "/admin/login" });
  };

  const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: "layout" },
    { name: "Workers", href: "/admin/workers", icon: "users", roles: ["SUPER_ADMIN", "ADMIN", "HR_MANAGER"] },
    { name: "Attendance", href: "/admin/attendance", icon: "calendar", roles: ["SUPER_ADMIN", "ADMIN", "HR_MANAGER", "LINE_SUPERVISOR"] },
    { name: "Payroll", href: "/admin/payroll", icon: "dollar", roles: ["SUPER_ADMIN", "ADMIN", "ACCOUNTS"] },
    { name: "Production", href: "/admin/production", icon: "factory", roles: ["SUPER_ADMIN", "ADMIN", "HR_MANAGER", "LINE_SUPERVISOR"] },
    { name: "Inquiries", href: "/admin/inquiries", icon: "mail", roles: ["SUPER_ADMIN", "ADMIN", "BUYER_MANAGER"] },
    { name: "Reports", href: "/admin/reports", icon: "chart", roles: ["SUPER_ADMIN", "ADMIN", "HR_MANAGER", "ACCOUNTS"] },
    { name: "Settings", href: "/admin/settings", icon: "settings", roles: ["SUPER_ADMIN", "ADMIN"] },
  ];

  const filteredNav = navigation.filter((item) => !item.roles || item.roles.includes(user.role || ""));

  const isActive = (href: string) => pathname === href || (href !== "/admin/dashboard" && pathname.startsWith(href));

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={closeSidebar}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static z-50 flex h-full w-64 flex-col border-r bg-card transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? "lg:w-20" : "lg:w-64"
        } ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
        aria-label="Admin navigation"
      >
        {/* Logo & Collapse Toggle */}
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-2"
            aria-label="Shunyi Garments Dashboard"
          >
            {!sidebarCollapsed && (
              <>
                <span className="text-xl font-bold text-primary">Shunyi</span>
                <span className="text-xl font-medium text-foreground">Garments</span>
              </>
            )}
            {sidebarCollapsed && (
              <span className="text-xl font-bold text-primary">SG</span>
            )}
          </Link>
          <button
            onClick={toggleCollapse}
            className="hidden lg:flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-expanded={!sidebarCollapsed}
          >
            {sidebarCollapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 p-3 overflow-y-auto" aria-label="Main navigation">
          {filteredNav.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={closeSidebar}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                } ${sidebarCollapsed ? "justify-center px-2" : ""}`}
                aria-current={active ? "page" : undefined}
                title={sidebarCollapsed ? item.name : undefined}
              >
                <Icon name={item.icon} className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                {!sidebarCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        {/* User Profile & Actions */}
        <div className={`p-3 border-t transition-all duration-300 ${sidebarCollapsed ? "px-2" : "px-3"}`}>
          <div className="flex items-center gap-3 rounded-lg px-3 py-2">
            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium flex-shrink-0">
              {user.name?.charAt(0).toUpperCase()}
            </div>
            {!sidebarCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize truncate">
                  {user.role?.toLowerCase().replace("_", " ")}
                </p>
              </div>
            )}
            {!sidebarCollapsed && (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => router.push("/admin/settings")}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
                  title="Settings"
                  aria-label="Settings"
                >
                  <Settings className="h-4 w-4" />
                </button>
                <button
                  onClick={handleSignOut}
                  className="h-8 w-8 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        {/* Mobile Header */}
        <header className="flex h-16 items-center justify-between px-4 border-b bg-background sticky top-0 z-30 lg:hidden">
          <button
            onClick={toggleSidebar}
            className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            aria-controls="mobile-sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>
          <Link href="/admin/dashboard" className="flex items-center space-x-2 flex-1 justify-center">
            <span className="text-xl font-bold text-primary">Shunyi</span>
            <span className="text-xl font-medium text-foreground">Garments</span>
          </Link>
          <div className="w-10" />
        </header>

        {/* Desktop Header */}
        <header className="hidden lg:flex h-16 items-center justify-between px-6 border-b bg-background sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-foreground">
              {filteredNav.find((item) => isActive(item.href))?.name || "Dashboard"}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/admin/settings")}
              className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <div className="h-6 w-px bg-border" />
            <div className="flex items-center gap-2 pl-3">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                {user.name?.charAt(0).toUpperCase()}
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-foreground">{user.name}</p>
                <p className="text-xs text-muted-foreground capitalize">
                  {user.role?.toLowerCase().replace("_", " ")}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              className="h-10 w-10 rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
              aria-label="Sign out"
            >
              <LogOut className="h-5 w-5" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}

function Icon({ name, className }: { name: string; className?: string }) {
  const icons: Record<string, React.ReactNode> = {
    layout: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>,
    users: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>,
    calendar: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    dollar: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    factory: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>,
    mail: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
    chart: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    settings: <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  };
  return <span className={className}>{icons[name]}</span>;
}