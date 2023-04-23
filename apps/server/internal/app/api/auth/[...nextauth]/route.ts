import NextAuth from 'next-auth'

import type { NextAuthOptions } from 'next-auth'

import { FWRProvider } from 'fw-roedingen-shared'

const authOptions: NextAuthOptions = {
  providers: [
    FWRProvider
  ],
  callbacks: {
    async jwt({ token, user, account, profile, isNewUser}){
      if(user){
        token.user = user;
      }
      return token;
    },
    async session({session, token, user}){
      //@ts-ignore
      session.user = token.user;
      return session;
    }
  },
  session: {
    strategy: 'jwt'
  }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
