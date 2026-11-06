import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { ThemeProvider } from "next-themes";
import { notFound } from "next/navigation";
import Link from "next/link";

export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale) ? locale as Locale : "en";

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages({ locale: validLocale });

  return (
    <NextIntlClientProvider messages={messages}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <nav className="container-custom flex h-16 items-center justify-between" aria-label="Main navigation">
              <Link href={`/${validLocale}`} className="flex items-center space-x-2" aria-label="Shunyi Garments Home">
                <span className="text-xl font-bold text-primary">Shunyi</span>
                <span className="text-xl font-medium text-foreground">Garments</span>
              </Link>

              <div className="hidden md:flex md:items-center md:space-x-8">
                <Link href={`/${locale}`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
                <Link href={`/${validLocale}/about`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
                <Link href={`/${validLocale}/products`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Products
                </Link>
                <Link href={`/${validLocale}/sustainability`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Sustainability
                </Link>
                <Link href={`/${validLocale}/quality-process`} className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                  Quality Process
                </Link>
                <Link href={`/${validLocale}/rfq`} className="btn btn-primary text-sm">
                  Get a Quote
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <LanguageSwitcher locale={validLocale} />
                <Link href="/admin/login" className="btn btn-outline text-sm hidden sm:flex">
                  Admin Login
                </Link>
              </div>
            </nav>
          </header>

          <main className="flex-1">{children}</main>

          <footer className="border-t bg-muted/50">
            <div className="container-custom py-12 md:py-16">
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Shunyi Garments</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Excellence in garment manufacturing with international compliance standards.
                  </p>
                  <div className="flex space-x-4">
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="LinkedIn">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Twitter">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                    <a href="#" className="text-muted-foreground hover:text-foreground transition-colors" aria-label="Facebook">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                    </a>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Quick Links</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href={`/${locale}/about`} className="hover:text-foreground transition-colors">About Us</Link></li>
                    <li><Link href={`/${locale}/products`} className="hover:text-foreground transition-colors">Products</Link></li>
                    <li><Link href={`/${locale}/rfq`} className="hover:text-foreground transition-colors">Request Quote</Link></li>
                    <li><Link href={`/${locale}/contact`} className="hover:text-foreground transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Products</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><Link href={`/${locale}/products?category=knitwear`} className="hover:text-foreground transition-colors">Knitwear</Link></li>
                    <li><Link href={`/${locale}/products?category=woven`} className="hover:text-foreground transition-colors">Woven</Link></li>
                    <li><Link href={`/${locale}/products?category=denim`} className="hover:text-foreground transition-colors">Denim</Link></li>
                    <li><Link href={`/${locale}/products?category=outerwear`} className="hover:text-foreground transition-colors">Outerwear</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium mb-4">Contact</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li>Corporate Office: Dhaka, Bangladesh</li>
                    <li>Factory: Gazipur, Bangladesh</li>
                    <li>Email: info@shunyigarments.com</li>
                    <li>Phone: +880-XX-XXXXXXX</li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 pt-8 border-t text-center text-sm text-muted-foreground">
                <p>&copy; {new Date().getFullYear()} Shunyi Garments. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}

function LanguageSwitcher({ locale }: { locale: Locale }) {
  return (
    <div className="relative">
      <button
        className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Switch language"
      >
        {locale === "en" ? "EN" : "中文"}
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
      </button>
    </div>
  );
}