import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0"

const handler = handleAuth({
  login: handleLogin({
    returnTo: '/home'
  }),
  logout: handleLogout({
    returnTo: '/login'
  }),
});

export const GET = handler;
