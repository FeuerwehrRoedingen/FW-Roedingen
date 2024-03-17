import { NextResponse } from 'next/server';
import { AppRouteHandlerFn, withApiAuthRequired } from '@auth0/nextjs-auth0'

const _GET: AppRouteHandlerFn = async (req, ctx) => {
  const url = req.nextUrl.searchParams.get('url');

  if(!url) {
    return NextResponse.json({ error: 'missing_url', description: 'The url query parameter is required' }, { status: 400 });
  }

  try {
    const response = await fetch(url);
    return new NextResponse<Buffer>(response.body, { headers: {...response.headers} });
  } 
  catch (error: any) {
    return NextResponse.json({ error: 'proxy_error', description: error.message }, { status: 500 })
  }
}
const _POST: AppRouteHandlerFn = async (req, ctx) => {
  return NextResponse.json({ error: 'not_implemented', description: 'POST requests are not implemented yet' }, { status: 501 });
}

export const GET = withApiAuthRequired(_GET);
export const POST = withApiAuthRequired(_POST);
