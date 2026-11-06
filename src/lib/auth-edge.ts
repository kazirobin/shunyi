import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        return {
          id: "1",
          email: credentials.email as string,
          name: "Admin User",
          role: "SUPER_ADMIN",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export type UserRole = "SUPER_ADMIN" | "ADMIN" | "HR_MANAGER" | "ACCOUNTS" | "LINE_SUPERVISOR" | "BUYER_MANAGER";

export const rolePermissions: Record<UserRole, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN: [
    "workers:read",
    "workers:write",
    "attendance:read",
    "attendance:write",
    "payroll:read",
    "payroll:write",
    "production:read",
    "production:write",
    "inquiries:read",
    "inquiries:write",
    "reports:read",
    "settings:read",
    "settings:write",
    "users:read",
    "users:write",
  ],
  HR_MANAGER: [
    "workers:read",
    "workers:write",
    "attendance:read",
    "attendance:write",
    "production:read",
    "reports:read",
  ],
  ACCOUNTS: [
    "workers:read",
    "payroll:read",
    "payroll:write",
    "reports:read",
  ],
  LINE_SUPERVISOR: [
    "workers:read",
    "attendance:read",
    "attendance:write",
    "production:read",
    "production:write",
  ],
  BUYER_MANAGER: [
    "inquiries:read",
    "inquiries:write",
    "products:read",
  ],
};

export function hasPermission(role: UserRole, permission: string): boolean {
  const permissions = rolePermissions[role];
  return permissions.includes("*") || permissions.includes(permission);
}