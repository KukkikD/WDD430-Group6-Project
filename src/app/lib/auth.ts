// src/app/lib/auth.ts
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { compare } from "bcryptjs";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

// ✅ Extend User shape we return from authorize to include role
interface CustomUser extends User {
  role: string;
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      // ✅ Validate user credentials here
      async authorize(credentials) {
        // 1) Normalize email so "Foo@Bar.com " matches stored value
        const email = (credentials?.email ?? "").trim().toLowerCase();
        const password = credentials?.password ?? "";

        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        // 2) Fetch user by normalized email
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !user.password) {
          throw new Error("Invalid email or password");
        }

        // 3) Compare password with the hashed one
        const isValid = await compare(password, user.password);
        if (!isValid) {
          throw new Error("Invalid email or password");
        }

        // 4) Return the minimal user payload you want in JWT
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role, // e.g. "customer" | "seller" | "admin"
        };
      },
    }),
  ],

  // ✅ Store session in a signed, httpOnly cookie (JWT strategy)
  session: {
    strategy: "jwt",
  },

  // ✅ Use your custom login page
  pages: {
    signIn: "/login",
  },

  callbacks: {
    // ✅ Put id & role into the JWT
    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    // ✅ Expose id & role on the client-side session
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        // Type-safe after we add module augmentation (see next-auth.d.ts below)
        session.user.id = (token.id as string) ?? "";
        session.user.role = (token.role as string) ?? "customer";
      }
      return session;
    },

    // ✅ Redirect users based on role after sign-in/endpoints that call `NextAuth`
    async redirect({ url, baseUrl }) {
      // If url is already relative or same-origin, let it pass through
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      if (new URL(url).origin === baseUrl) return url;
      // Default: stay on baseUrl
      return baseUrl;
    },
  },
};
