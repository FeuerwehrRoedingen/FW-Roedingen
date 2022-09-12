//Libraries
import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
//Files

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
          //TODO
          return resolve(null);
        });
      }
    })
  ]
})
