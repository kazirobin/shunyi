
import Navbar from "@/components/layout/navbar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <Navbar variant="admin" />

      <main className="mx-auto max-w-7xl p-6">
        {children}
      </main>
    </div>
  );
}
