import NextAuth from "next-auth";
import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await db
          .select()
          .from(users)
          .where(eq(users.email, credentials?.email));

        console.log("USERFIRST:", user);

        if (!user || user.length === 0) {
          return null;
        }

        const isValid = await argon2.verify(
          user[0].hashedPassword,
          credentials.password
        );
        console.log("ISVALID:", isValid);

        if (!isValid) {
          return null;
        }

        console.log("USERSECOND:", user);
        // Return the user object if authentication is successful
        return {
          id: user[0].id.toString(),
          email: user[0].email,
        };
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "database",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours

    // Session is updated when user is active
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/sign-up",
  },
});

export { handler as GET, handler as POST };
