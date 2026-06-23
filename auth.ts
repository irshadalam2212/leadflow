import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } =
  NextAuth({
    providers: [
      Credentials({
        credentials: {
          email: {},
          password: {},
        },

        async authorize(credentials) {
          const email = credentials?.email as string;
          const password = credentials?.password as string;

          // Temporary hardcoded admin
          if (
            email === "admin@leadflow.com" &&
            password === "admin123"
          ) {
            return {
              id: "1",
              name: "Admin",
              email,
              role: "admin",
            };
          }

          return null;
        },
      }),
    ],

    pages: {
      signIn: "/login",
    },

    session: {
      strategy: "jwt",
    },

    secret: process.env.AUTH_SECRET,
  });