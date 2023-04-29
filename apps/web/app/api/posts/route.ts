import { NextRequest, NextResponse } from "next/server"

import { IPost } from "components/Post"


export async function GET(req: NextRequest) {
  
  let start = parseInt(req.nextUrl.searchParams.get('start')||'0', 10);
  let limit = parseInt(req.nextUrl.searchParams.get('limit')||'3', 10);

  let posts: IPost[] = [];

  for(let i=0; i<limit; i++) {
    posts.push({
      id: start+i,
      title: `Post ${start+i}`,
      body: 'Lorem ipsum dolor sit amet',
      date: new Date().toDateString(),
      image: 'https://picsum.photos/200/300'
    });
  }

  return NextResponse.json(posts);
}
