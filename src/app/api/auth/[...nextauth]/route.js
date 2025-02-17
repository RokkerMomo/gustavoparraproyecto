import axios from 'axios';
import CredentialsProvider from 'next-auth/providers/credentials'
import NextAuth from "next-auth";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
          name: 'Credentials',
          credentials: {
            username: { label: "Email", type: "email", placeholder: "jsmith" },
            password: {  label: "Password", type: "password" }
          },
          async authorize(credentials, req) {
            console.log(credentials)
            const res = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signin`, {
              email: credentials.email,
              password: credentials.password
            });
            const user = res.data;

            if (res.status === 200 && user) {
              return user
            }
            return null
          }
        })
      ],callbacks: {
        async jwt({ token, user }) {
          if (user) token.user = user;
          return token;
        },
        async session({ session, token }) {
          session.user = token.user;
          return session;
        },
      },
      secret:process.env.NO_SECRET
})

export { handler as GET, handler as POST };
