import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import { loginSchema } from "@/types";

import prisma from "@/db/index";
import bcrypt from "bcrypt";


// Extend NextAuth types to include `id`
declare module "next-auth" {
  interface User {
    id: string;
  }

  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
    };
  }

  interface JWT {
    uid: string;
  }
}

export const NEXT_AUTH_CONFIG: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "your@email.com" },
        password: { label: "Password", type: "password", placeholder: "••••••••" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required.");
        }


        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) throw new Error("Invalid input.");
        const { email, password } = parsed.data;

       
        const user = await prisma.user.findUnique({
          where: { email },
          select: { id: true, email: true, username: true, password: true },
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new Error("Invalid credentials.");
        }

        return {
          id: user.id, 
          name: user.username,
          email: user.email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.uid = user.id; 
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.uid as string; 
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
