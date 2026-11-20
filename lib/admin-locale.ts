import { cookies } from "next/headers";
import { ADMIN_LOCALE_COOKIE, getAdminDict, isAdminLocale, type AdminLocale } from "@/components/admin/i18n";

export async function getAdminLocale(): Promise<AdminLocale> {
  const value = (await cookies()).get(ADMIN_LOCALE_COOKIE)?.value;
  return isAdminLocale(value) ? value : "en";
}

export async function getAdminT() {
  return getAdminDict(await getAdminLocale());
}
