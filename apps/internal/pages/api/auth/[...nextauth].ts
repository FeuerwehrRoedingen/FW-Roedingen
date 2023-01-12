import NextAuth from 'next-auth'

import type { NextAuthOptions } from 'next-auth'

import FWRProvider from '../../../src/FwrProvider';


declare module 'next-auth'{
  interface User {
    id: string;
    created: string;
    updated: string;
    email: string;
    verified: boolean;
    lastResetSentAt: string;
    lastVerificationSentAt: string;
    profile: Object;
  }
  interface Session {
    user: User
  }
}

export const authOptions: NextAuthOptions = {
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
}

export default NextAuth(authOptions);
