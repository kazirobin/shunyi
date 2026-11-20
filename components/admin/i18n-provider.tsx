"use client";

import { createContext, useContext, useMemo } from "react";
import { formatYmd, getAdminDict, INTL, type AdminDict, type AdminLocale } from "./i18n";

type Ctx = {
  locale: AdminLocale;
  t: AdminDict;
  nf: Intl.NumberFormat;
  date: (ymd: string, opts: Intl.DateTimeFormatOptions) => string;
};

const AdminI18nContext = createContext<Ctx | null>(null);

export function AdminI18nProvider({ locale, children }: { locale: AdminLocale; children: React.ReactNode }) {
  const value = useMemo<Ctx>(
    () => ({
      locale,
      t: getAdminDict(locale),
      nf: new Intl.NumberFormat(INTL[locale]),
      date: (ymd, opts) => formatYmd(locale, ymd, opts),
    }),
    [locale],
  );
  return <AdminI18nContext.Provider value={value}>{children}</AdminI18nContext.Provider>;
}

export function useAdminI18n() {
  const ctx = useContext(AdminI18nContext);
  if (!ctx) throw new Error("useAdminI18n must be used inside AdminI18nProvider");
  return ctx;
}
