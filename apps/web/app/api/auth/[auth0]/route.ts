import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0"

const handler = handleAuth({
  login: handleLogin({}),
  logout: handleLogout({}),
});

export const GET = handler;
