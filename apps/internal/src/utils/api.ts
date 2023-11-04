import { getSession } from "@auth0/nextjs-auth0";
import handleUnauthorized from "./handleUnauthorized";

const isDev = process.env.NODE_ENV !== 'production';

export async function fetchApi(path: string, init?: RequestInit){
  const url = isDev ? `http://localhost:3024${path}` : `https://api.feuerwehr-roedingen.de${path}`;
  const session = await getSession();

  if(!session || !session.accessToken)
    handleUnauthorized();

  const _init = {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: `Bearer ${session.accessToken}`
    }
  };

  return fetch(url, _init).then(res => res.json());
}
