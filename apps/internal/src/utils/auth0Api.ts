
import { env } from "env"

type Auth0Token = {
  access_token: string;
  expires_in: number;
  token_type: string;
}
type Auth0Role = {
  id: string;
  name: string;
  description: string;
}

let token: Auth0Token | null = null;

async function getToken(){
  token = await  fetch(`${env.AUTH0_ISSUER_BASE_URL}/oauth/token`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'client_credentials',
      client_id: env.AUTH0_CLIENT_ID,
      client_secret: env.AUTH0_CLIENT_SECRET,
      audience: env.AUTH0_AUDIENCE
    })
  })
  .then((res) => res.json());
}

export async function getUserRoles(uid: string): Promise<Auth0Role[]> {
  if(!token) {
    await getToken();
  }

  return fetch(`${env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${uid}/roles`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token?.access_token}`
    }
  })
  .then((res) => res.json());
}
