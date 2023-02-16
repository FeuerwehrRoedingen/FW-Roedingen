import NextAuth from 'next-auth'

import type { NextAuthOptions } from 'next-auth'

import { FWRProvider, FWREmailProvider } from 'fw-roedingen-shared'

import { adapter } from '../../../db/database'

export const authOptions: NextAuthOptions = {
  providers: [
    FWRProvider,
    FWREmailProvider({})
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
  },
  adapter
}

export default NextAuth(authOptions);
