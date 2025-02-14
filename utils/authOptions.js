import  CredentialsProvider  from "next-auth/providers/credentials";
import User from "@/models/user";
import bcrypt from "bcrypt";
import dbConnect from "@/utils/dbConnect";
import { signIn } from "next-auth/react";

// Check auth email/pass
export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        dbConnect();
        const { email, password } = credentials;
        const user = await User.findOne({ email });

        if(!user) {
            throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);
        if(!isPasswordMatched){
            throw new Error("Invalid Email or Password");
        }

        return user;
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,
  pages : {
    signIn: "/login" // after we protect pages if they try access protected pages they will be redirected to login
  }
};
