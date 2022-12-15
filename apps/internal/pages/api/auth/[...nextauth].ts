import NextAuth from 'next-auth'
import CredentialsProvicer from 'next-auth/providers/credentials';

import type { NextAuthOptions, User } from 'next-auth'

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
    CredentialsProvicer({
      name: 'credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Username'},
        password: { label: 'Password', type: 'password'},
      },
      async authorize(credentials, req): Promise<User|null>{
        try{
          const response = await fetch('https://api.feuerwehr-roedingen.de/login/', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
              username: credentials?.username,
              password: credentials?.password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          })

          const data = await response.json();
          return Promise.resolve(data.user);
        } catch(error){
          console.error(error);
          return Promise.resolve(null);
        }
      }
    })
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
