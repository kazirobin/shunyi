import { cookies } from "next/headers";

export const AUTH_COOKIE = "auth_token";

export async function isLoggedIn(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get(AUTH_COOKIE)?.value === "logged_in";
}