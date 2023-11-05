import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0"

const handler = handleAuth({
  login: handleLogin({
    authorizationParams: {
      audience: "https://api.feuerwehr-roedingen.de/v1",
      scope: "openid profile email",
    },
  }),
  logout: handleLogout({}),
});

export const GET = handler;
