import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse, NextRequest } from 'next/server';

type env = {
  API_URL: string;
}
type Options = {
  params: {
    slug: string;
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends env {}
  }
}

const GET    = withApiAuthRequired((req, ctx) => handle(req, 'GET',    ctx.params!));
const POST   = withApiAuthRequired((req, ctx) => handle(req, 'POST',   ctx.params!));
const DELETE = withApiAuthRequired((req, ctx) => handle(req, 'DELETE', ctx.params!));

const handle = async (req: NextRequest, method: 'GET'|'POST'|'DELETE', params: Record<string, string|string[]>) => {
  try{
    const { accessToken } = await getAccessToken();
    const slug = typeof params.slug === 'string' ? params.slug : params.slug.join('/');

    const result = await fetch(`${process.env.API_URL}/${slug}`, {
      method,
      headers: {
        authorization: `Bearer ${accessToken}`
      },
      body: req.body
    })
    .catch(e => {
      console.error(`API: ${method} ${process.env.API_URL}/${slug} ${e}`)
    });

    if(!result) 
      return new NextResponse('Internal Server Error', {status: 500});

    return new NextResponse(result.body, {status: result.status});
  }
  catch(e: any){
    return new NextResponse(e.message, {status: 500});
  }
};

export { GET, POST, DELETE };
