import { getAccessToken, withApiAuthRequired } from '@auth0/nextjs-auth0';
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

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
    interface ProcessEnv extends env { }
  }
}

const GET = withApiAuthRequired((req, ctx) => handle(req, 'GET', ctx.params!));
const POST = withApiAuthRequired((req, ctx) => handle(req, 'POST', ctx.params!));
const DELETE = withApiAuthRequired((req, ctx) => handle(req, 'DELETE', ctx.params!));
const PUT = withApiAuthRequired((req, ctx) => handle(req, 'PUT', ctx.params!));
const PATCH = withApiAuthRequired((req, ctx) => handle(req, 'PATCH', ctx.params!));

const handle = async (req: NextRequest, method: 'GET' | 'POST' | 'DELETE' | 'PUT' | 'PATCH', params: Record<string, string | string[]>) => {
  try {
    const slug = typeof params.slug === 'string' ? params.slug : params.slug.join('/');
    console.log(`API: ${method} ${process.env.API_URL}/${slug}`)

    const { accessToken } = await getAccessToken();

    let data = undefined;

    if(method !== 'GET'){
      if(req.headers.get('content-type')?.includes('application/json')){
        data = await req.json();
      } 
      else {
        data = await req.text();
      }
    }

    const result = await axios(`${process.env.API_URL}/${slug}`, {
      method,
      headers: {
        authorization: `Bearer ${accessToken}`,
        contentType: req.headers.get('content-type'),
      },
      data
    })
      .catch(e => {
        console.error(`API: ${method} ${process.env.API_URL}/${slug} ${e}`)
      });


    if (!result)
      return new NextResponse('Internal Server Error', { status: 500 });

    if(typeof result.headers['content-type'] === 'string' && result.headers['content-type'].split(';')[0] === 'text/plain'){
      return new NextResponse(result.data, { status: result.status });
    }
    
    return NextResponse.json(result.data, { status: result.status });
  }
  catch (e: any) {
    return new NextResponse(e.message, { status: 500 });
  }
};

export { GET, POST, DELETE, PUT, PATCH };
