//Libraries
import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
//Files
import { getUser } from '../../../../server/db/Database'
import type { User } from '@prisma/client'

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req): Promise<User | null> {
        return new Promise<User | null>(async function (resolve, reject) {
          const user = await getUser(credentials!.username)
          if (credentials === undefined || user === null) {
            resolve(null);
          }
          if (credentials?.password === user?.password) {
            return resolve(user);
          }
          return resolve(null);
        });
      }
    })
  ]
})
