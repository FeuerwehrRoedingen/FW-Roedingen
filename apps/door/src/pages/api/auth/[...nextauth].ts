import NextAuth from 'next-auth'
import { FWRProvider, FWREmailProvider } from 'fw-roedingen-shared/providers'

import { adapter } from '../../../db/database'

import type { NextAuthOptions } from 'next-auth'

export const authOptions: NextAuthOptions = {
  adapter,
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
  pages: {
    error: '/',
    signIn: '/',
    signOut: '/'
  }
}

export default NextAuth(authOptions);
