"use server";

import { cookies } from "next/headers";
import { ADMIN_LOCALE_COOKIE, isAdminLocale } from "@/components/admin/i18n";

export async function setAdminLocale(locale: string) {
  if (!isAdminLocale(locale)) return;
  (await cookies()).set(ADMIN_LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
    sameSite: "lax",
  });
}
