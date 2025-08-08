import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/app/lib/prisma";
import { compare } from "bcryptjs";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

// ✅ Define a custom user interface to include user role
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
      // ✅ Authorize user by verifying email and password
      async authorize(credentials) {
        // Find user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials?.email },
        });

        // Return error if user is not found or missing password
        if (!user || !user.password) throw new Error("Invalid email or password");

        // Compare hashed password with provided password
        const isValid = await compare(credentials!.password, user.password);
        if (!isValid) throw new Error("Invalid email or password");

        // Return user object with additional role information
        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt", // ✅ Use JWT-based session stored in httpOnly cookie
  },
  pages: {
    signIn: "/login", // ✅ Redirect to custom login page
  },
  callbacks: {
    // ✅ Include role and ID in the JWT token
    async jwt({ token, user }: { token: JWT; user?: CustomUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    // ✅ Attach role and ID to the session object on the client
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
