import Navbar from "@/components/layout/navbar";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
 <html lang="en">
  <body
    suppressHydrationWarning
    className="min-h-full flex flex-col"
  >
    <Navbar variant="public"/>
    {children}
  </body>
</html>
  );
}
