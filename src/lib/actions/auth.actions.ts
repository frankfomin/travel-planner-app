"use server";

import { db } from "@/db/db";
import {
  newPasswordSchema,
  resetPasswordSchema,
  signInSchema,
  signUpSchema,
} from "../validators";
import { getUserByEmail } from "./user.actions";
import { passwordResetToken, users, verificationToken } from "@/db/schema";
import { v4 as uuidv4 } from "uuid";
import {
  generatePasswordResetToken,
  generateVerificationToken,
  getPasswordResetTokenByToken,
  getVerificationTokenByToken,
} from "./tokens.actions";
import { signIn as logIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { sendPasswordResetEmail, sendVerificationEmail } from "./mail.actions";
import { eq } from "drizzle-orm";

export async function signUp(data: unknown) {
  try {
    const result = signUpSchema.safeParse(data);

    if (!result.success) {
      return {
        validationError: true,
      };
    }

    const { email, password } = result.data;

    console.log(email, password);

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        userExists: true,
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      id: uuidv4(),
      email,
      password: hashedPassword,
    });

    const verificationToken = await generateVerificationToken(email);

    console.log("verificationToken", verificationToken);
    await sendVerificationEmail({
      email: email,
      token: verificationToken.token,
    });

    return {
      success: true,
    };
  } catch (error) {
    return {
      error: true,
    };
  }
}

export async function signIn(data: unknown) {
  const result = signInSchema.safeParse(data);

  if (!result.success) {
    return {
      validationError: true,
    };
  }

  const { email, password } = result.data;
  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return {
      invalidCredentials: true,
    };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await sendVerificationEmail({
      token: verificationToken.token,
      email: existingUser.email,
    });

    return {
      emailSent: true,
    };
  }

  try {
    await logIn("credentials", {
      email,
      password,
      redirectTo: "/" || DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { invalidCredentials: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
}

export async function verifyEmail(token: string) {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    console.log("Token does not exist");
    return { error: "Invalid token" };
  }

  const hasExpired =
    new Date(existingToken.expires).getTime() < new Date().getTime();

  if (hasExpired) {
    return { error: "Token has expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  await db
    .update(users)
    .set({
      emailVerified: new Date(),
      email: existingToken.email,
    })
    .where(eq(users.email, existingToken.email));

  await db
    .delete(verificationToken)
    .where(eq(verificationToken.id, existingToken.id));
  console.log("Token deleted and success");

  return { success: "Email verified" };
}

export async function resetPassword(data: unknown) {
  try {
    const result = resetPasswordSchema.safeParse(data);

    if (!result.success) {
      return {
        validationError: true,
      };
    }

    const { email } = result.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return { error: "Email does not exist" };
    }

    const passwordResetToken = await generatePasswordResetToken(email);

    await sendPasswordResetEmail({
      email: passwordResetToken.email,
      token: passwordResetToken.token,
    });

    return { success: "Password reset email sent" };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
export async function newPassword({
  data,
  token,
}: {
  data: unknown;
  token: string;
}) {
  try {
    const result = newPasswordSchema.safeParse(data);

    if (!result.success) {
      return { validationError: "passwords doesn't match" };
    }

    const { password } = result.data;

    const existingToken = await getPasswordResetTokenByToken(token);
    console.log("Existing token: ", existingToken);
    if (!existingToken) {
      return { invalidToken: true };
    }

    const hasExpired =
      new Date(existingToken.expires).getTime() < new Date().getTime();

    if (hasExpired) {
      return { expired: true };
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    await db
      .update(users)
      .set({
        password: hashedPassword,
      })
      .where(eq(users.email, existingToken.email));

    await db
      .delete(passwordResetToken)
      .where(eq(passwordResetToken.id, existingToken.id));

    return { success: true };
  } catch (error) {
    return { error: true };
  }
}
