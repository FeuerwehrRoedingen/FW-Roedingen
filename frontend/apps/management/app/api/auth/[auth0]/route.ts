import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest } from 'next/server';

type env = {
  AUTH0_BASE_URL:        string;
  AUTH0_CLIENT_ID:       string;
  AUTH0_CLIENT_SECRET:   string;
  AUTH0_ISSUER_BASE_URL: string;
  AUTH0_SECRET:          string;
  AUTH0_SCOPE:           string;
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends env {}
  }
}

const handler = handleAuth({
  onError(req: NextRequest, error: Error) {
    console.error(error);
  },
  login: async (req: NextApiRequest, res: NextApiResponse) => {
    return handleLogin(req, res, {
      returnTo: '/dashboard'
    });
  }
});

export { handler as GET };
