import { handleAuth } from '@auth0/nextjs-auth0';
import { NextApiRequest, NextApiResponse } from 'next';

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
  onError(req: NextApiRequest, res: NextApiResponse, error: Error) {
    console.error(error);
  }
});

export { handler as GET };
