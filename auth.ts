import nextAuth from "next-auth";

import { NextAuthOptions } from "next-auth";
import { db } from "@/db/db";
import { securityLogs, users } from "@/db/schema";
import { eq } from "drizzle-orm";
import * as argon2 from "argon2";

import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";

export const config: NextAuthOptions = {
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

        if (!user[0].password || user.length === 0) {
          return null;
        }

        const isValid = await argon2.verify(
          user[0].password,
          credentials.password
        );
        console.log("ISVALID:", isValid);

        if (!isValid) {
          console.log("INVALID");
          return null;
        }

        return {
          id: user[0].id.toString(),
          email: user[0].email,
        };
      },
    }),
  ],
  callbacks: {
    async signIn(user) {
      const email = user.profile?.email ? user.profile?.email : user.user.email;

      const name = user.profile?.name ? user.profile?.name : user.user.email;
      if (!email) {
        return false;
      }

      const userId = await db
        .select()
        .from(users)
        .where(eq(users.email, email));

      console.log("USERID:", userId[0].id);
      if (userId.length === 0) {
        return false;
      }

      const ip = await axios.get("https://api.ipify.org?format=json");
      const ipAddress = ip.data.ip;

      await db.insert(securityLogs).values({
        userId: userId[0].id,
        ip: ipAddress,
        provider: name,
        type: "Signed into Venturevista",
      });

      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours

    // Session is updated when user is active
  },
  pages: {
    signIn: "/sign-in",
    newUser: "/",
  },
};

export const { handlers, auth, signIn, signOut } = nextAuth(config);
