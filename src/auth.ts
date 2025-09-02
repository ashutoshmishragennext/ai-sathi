/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
// auth.ts
import authConfig from "@/auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";
import { Role } from "./validaton-schema";
import { findUserById } from "./actions/user";
import { db } from "./db";
// Import your table definitions
import { 
  UsersTable, 
  AccountsTable, 
  SessionsTable, 
  VerificationTokensTable 
} from "@/db/schema"; // Adjust path as needed

export type ExtendedUser = DefaultSession["user"] & {
  role: Role;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: Role;
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  // Configure the adapter with your custom table names
  adapter: DrizzleAdapter(db, {
    usersTable: UsersTable,
    accountsTable: AccountsTable,
    sessionsTable: SessionsTable,
    verificationTokensTable: VerificationTokensTable,
  }),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  debug: process.env.NODE_ENV === "development",
  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("SignIn callback:", { user: user?.email, provider: account?.provider });
      
      // Always allow OAuth sign-ins
      if (account?.provider === "google") {
        return true;
      }

      // For credentials, check verification
      if (account?.provider === "credentials") {
        const existingUser = await findUserById(user.id!);
        if (!existingUser?.emailVerified) {
          console.log("User not verified:", user.email);
          return false;
        }
      }

      return true;
    },

    async jwt({ token, user, account }) {
      console.log("JWT callback:", { 
        tokenSub: token.sub, 
        userEmail: user?.email, 
        provider: account?.provider 
      });

      if (!token.sub) {
        return token;
      }

      const existingUser = await findUserById(token.sub);
      if (existingUser) {
        token.role = existingUser.role;
        console.log("Found user with role:", existingUser.role);
      } else {
        console.log("No user found for token.sub:", token.sub);
      }

      return token;
    },

    async session({ session, token }) {
      console.log("Session callback:", { 
        sessionEmail: session.user?.email, 
        tokenSub: token.sub 
      });

      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role;
      }

      return session;
    },
  },
  events: {
    async signIn({ user, account, profile }) {
      console.log("SignIn event:", { 
        email: user.email, 
        provider: account?.provider,
        profileId: profile?.sub 
      });
    },
    async createUser({ user }) {
      console.log("User created:", user.email);
    },
  },
  ...authConfig,
});
