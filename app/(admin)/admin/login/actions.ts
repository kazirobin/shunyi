"use server";

import { cookies } from "next/headers";
import { AUTH_COOKIE } from "@/lib/auth";

export async function loginAction(password: string) {
  if (password !== "1234") {
    return {
      success: false,
      message: "Incorrect password. Please try again.",
    };
  }

  const cookieStore = await cookies();
  cookieStore.set(AUTH_COOKIE, "logged_in", {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return { success: true, message: "Logged in" };
}

export async function logoutAction() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTH_COOKIE);
  return { success: true };
}