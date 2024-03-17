import { NextAppRouterHandler, handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0"

const login: NextAppRouterHandler = async (req, ctx) => {

  const returnURL = req.nextUrl.searchParams.get("returnTo");

  if (returnURL){
    console.log("returnURL", returnURL);
  }

  return handleLogin(req, ctx);
}

const handler = handleAuth({
  login,
  logout: handleLogout({}),
});

export const GET = handler;
