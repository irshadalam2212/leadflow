import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {},
            },

            async authorize(credentials) {
                const email = credentials?.email as string;
                const password = credentials?.password as string;

                if (
                    email === "admin@leadflow.com" &&
                    password === "admin123"
                ) {
                    return {
                        id: "1",
                        name: "Admin",
                        email,
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

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }

            return token;
        },

        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string;
            }

            return session;
        },
    },

    secret: process.env.AUTH_SECRET,
});