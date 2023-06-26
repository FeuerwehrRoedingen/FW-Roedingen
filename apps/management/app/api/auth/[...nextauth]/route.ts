import NextAuth from "next-auth/next";
import Auth0Provider from "next-auth/providers/auth0";

type env = {
  AUTH0_CLIENT_ID:     string;
  AUTH0_CLIENT_SECRET: string;
  AUTH0_ISSUER:        string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends env {}
  }
}

const handler = NextAuth({
  providers: [
    Auth0Provider({
      clientId:     process.env.AUTH0_CLIENT_ID,
      clientSecret: process.env.AUTH0_CLIENT_SECRET,
      issuer:       process.env.AUTH0_ISSUER
    })
  ],
});

export { handler as GET, handler as POST};
