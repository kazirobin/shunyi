
import "./globals.css";
import { Suspense } from "react";
import { isLoggedIn } from "@/lib/auth";
import Navbar from "@/components/layout/navbar";

async function NavbarWrapper() {
  const loggedIn = await isLoggedIn();
  return <Navbar loggedIn={loggedIn} />;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Suspense fallback={<div className="h-16 border-b" />}>
          <NavbarWrapper />
        </Suspense>
        <main>{children}</main>
      </body>
    </html>
  );
}