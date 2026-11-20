"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Menu,
  LayoutDashboard,
  Users,
  ClipboardCheck,
  LogOut,
  LogIn,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { logoutAction } from "@/app/admin/login/actions";

type NavLink = {
  name: string;
  href: string;
  icon?: LucideIcon;
};

const publicLinks: NavLink[] = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Products", href: "/products" },
  { name: "Contact", href: "/contact" },
];

const adminLinks: NavLink[] = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Employees", href: "/admin/employee", icon: Users },
  { name: "Layout", href: "/admin/layout", icon: ClipboardCheck },
];

export default function Navbar({ loggedIn }: { loggedIn: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  const links = loggedIn ? adminLinks : publicLinks;

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);

  const linkClass = (href: string) =>
    `flex items-center gap-2 text-sm font-medium transition-colors ${
      isActive(href)
        ? "text-primary"
        : "text-muted-foreground hover:text-primary"
    }`;

  const handleLogout = async () => {
    await logoutAction();
    router.push("/");
    router.refresh();
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        {/* Logo */}
        <Link
          href={loggedIn ? "/admin/dashboard" : "/"}
          className="text-xl font-bold"
        >
          Shunyi <span className="text-primary">Garments</span>
          {loggedIn && (
            <span className="ml-2 text-xs font-medium text-muted-foreground">
              Admin
            </span>
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={linkClass(link.href)}
              >
                {Icon && <Icon className="h-4 w-4" />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action */}
        <div className="hidden md:block">
          {loggedIn ? (
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          ) : (
            <Button onClick={() => router.push("/admin/login")}>
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </Button>
          )}
        </div>

        {/* Mobile */}
        <Sheet>
          <SheetTrigger
            className="rounded-md p-2 transition-colors hover:bg-muted md:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>

          <SheetContent side="right">
            <SheetHeader>
              <SheetTitle>
                Shunyi Garments {loggedIn ? "Admin" : ""}
              </SheetTitle>
            </SheetHeader>

            <div className="mt-6 flex flex-col gap-5 px-4">
              {links.map((link) => {
                const Icon = link.icon;
                return (
                  <SheetClose
                    key={link.href}
                    render={
                      <Link
                        href={link.href}
                        aria-current={
                          isActive(link.href) ? "page" : undefined
                        }
                        className={linkClass(link.href)}
                      />
                    }
                  >
                    {Icon && <Icon className="h-4 w-4" />}
                    {link.name}
                  </SheetClose>
                );
              })}

              <Separator />

              {loggedIn ? (
                <SheetClose
                  render={
                    <Button
                      className="w-full"
                      variant="outline"
                      onClick={handleLogout}
                    />
                  }
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </SheetClose>
              ) : (
                <SheetClose
                  render={
                    <Button
                      className="w-full"
                      onClick={() => router.push("/admin/login")}
                    />
                  }
                >
                  <LogIn className="mr-2 h-4 w-4" />
                  Admin Login
                </SheetClose>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}