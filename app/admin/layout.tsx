

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">

      <main className="mx-auto max-w-7xl p-6">
        {children}
      </main>
    </div>
  );
}
