import axios from "axios";

let auth0Token: string = "";
let createdAt: number = 0;

async function getToken() {
  const options = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_URL}oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: { "client_id": process.env.AUTH0_CLIENT_ID, "client_secret": process.env.AUTH0_CLIENT_SECRET, "audience": process.env.AUTH0_ACCESS_AUDIENCE, "grant_type": "client_credentials" }
  }

  const response = await axios(options);

  auth0Token = response.data.access_token;
  createdAt = Date.now();

  return auth0Token;
}

export async function callAuth0API(data: any, method: string, path: string) {
  if (!auth0Token || Date.now() - createdAt > 86_340_000) {   //24 hours in milliseconds (1000 * 60 * 60 * 24) minus 1 minute
    await getToken();
  }

  try {
    const res = await axios({
      method,
      headers: {
        'authorization': `Bearer ${auth0Token}`
      },
      url: `${process.env.AUTH0_API_URL}/${path}`,
      data
    });
    return res;
  }
  catch (err) {
    console.log(err);
    throw new Error("Failed to call Auth0 API");
  }
}
