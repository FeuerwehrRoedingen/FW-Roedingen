import { getSession } from '@auth0/nextjs-auth0'

import { handleUnauthorized } from './handleError';

const API_URL = process.env.node_env === 'production' ? 'https://api.feuerwehr-roedingen.de' : 'http://localhost:3024';

export async function APIfetch(input: string, init?: RequestInit) {

  const session = await getSession();

  if(!session || !session.accessToken)
    return handleUnauthorized();

  return fetch(API_URL + input, {
    ...init,
    headers: {
      ...init?.headers,
      'Authorization': `Bearer ${session.accessToken}`,
    }
  });
}
