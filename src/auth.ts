import { DrizzleAdapter } from "@auth/drizzle-adapter";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { db } from "@/db/db";
import { signInSchema } from "./lib/validators";
import bcrypt from "bcryptjs";
import {
  getAccountByUserId,
  getUserByEmail,
  getUserById,
} from "./lib/actions/user.actions";
import { ExtendedSession } from "./types";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const result = signInSchema.safeParse(credentials);
        if (result.success) {
          const { email, password } = result.data;
          console.log(email, password);
          const user = await getUserByEmail(email);
          if (!user || !user.password) return null;

          const passwordIsValid = await bcrypt.compare(password, user.password);

          if (passwordIsValid) {
            return user;
          }
        }

        return null;
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/sign-in",
  },
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        const user = session.user as ExtendedSession;

        user.id = token.sub;
        user.isOAuth = token.isOAuth as boolean;
        user.provider = token.provider as string;
      }
      return session;
    },
    async signIn({ user, account }) {
      const existingUser = await getUserById(user.id);

      if (account?.provider !== "credentials") return true;

      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      const existingAccount = await getAccountByUserId(existingUser.id);
      token.isOAuth = !!existingAccount;
      token.name = existingUser.name;
      token.email = existingUser.email;
      token.provider = existingAccount?.provider || "credentials";

      return token;
    },
  },
});
