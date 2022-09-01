//Libraries
import ReactDOMServer from 'react-dom/server'
import NextAuth, { Theme } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import EmailProvider, { SendVerificationRequestParams } from "next-auth/providers/email"
import { createTransport } from "nodemailer"
//Files
import { getUser } from 'server/Database'
import EMailComponent from 'src/components/EMailComponent'
import type { User } from 'server/prisma/types'

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
    }),
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
      sendVerificationRequest
    })
  ]
})

async function sendVerificationRequest(params: SendVerificationRequestParams) {
  const { identifier, provider, theme, url } = params
  const { host } = new URL(url)
  const transport = createTransport(provider.server)
  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    text: text({ url, host }),
    html: ReactDOMServer.renderToStaticMarkup(<EMailComponent url={url} host={host} theme={theme}/>),
  })
  const failed = result.rejected.concat(result.pending).filter(Boolean)
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`)
  }
}

function text({ url, host }: { url: string; host: string }) {
  return `Sign in to ${host}\n${url}\n\n`
}
