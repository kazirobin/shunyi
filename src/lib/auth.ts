import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./mongodb";
import User from "@/models/User";
import { verifyPassword } from "./utils";

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

        await connectDB();

        const user = await User.findOne({ email: credentials.email }).select("+password");
        if (!user) {
          throw new Error("Invalid credentials");
        }

        const isValid = await verifyPassword(credentials.password as string, user.password);
        if (!isValid) {
          throw new Error("Invalid credentials");
        }

        if (!user.isActive) {
          throw new Error("Account is deactivated");
        }

        return {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          image: user.image,
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
    authorized: async ({ auth }) => {
      return !!auth;
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