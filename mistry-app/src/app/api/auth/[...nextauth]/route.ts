import { NextAuthOptions } from "next-auth";
import dbConnect from "@/app/lib/bdConnect";
import bcrypt from "bcryptjs";
import UserModel from "@/app/models/User";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",

            credentials: {
                identifier: { label: "Identifier", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req): Promise<any> {
                await dbConnect();

                // Check if credentials are provided
                if (!credentials) {
                    throw new Error("No credentials provided");
                }

                try {
                    const user = await UserModel.findOne({
                        $or: [
                            { email: credentials.identifier },
                            { username: credentials.identifier }
                        ]
                    });
                    if (!user) {
                        throw new Error("No user found with this credentials")
                    }
                    if (!user.isVerified) {
                        throw new Error("user is not verified")
                    }
                    const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password)
                    if (isPasswordCorrect) {
                        return user
                    }
                    else {
                        throw new Error("incorrect password")
                    }
                } catch (error: any) {
                    throw new Error(error.message);
                }
            }
        })
    ],
    callbacks: {
        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.isVerified = token.isVerified;
                session.user.isAcceptingMessage = token.isAcceptingMessages;
                session.user.username = token.username;
            }
            return session
        },
        async jwt({ token, user }) {
            if (user) {
                token._id = user._id?.toString();
                token.isVerified = user.isVerified;
                token.isAcceptingMessage = user.isAcceptingMessages;
                token.username = user.username?.toString();
            }
            return token
        }
    },
    pages: {
        signIn: '/sign-in'
    },
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};
