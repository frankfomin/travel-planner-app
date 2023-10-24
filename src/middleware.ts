export { default } from "next-auth/middleware";

export const config = { matcher: ["/profile", "/trips", "/profile/security-log", "/profile/account"] };
