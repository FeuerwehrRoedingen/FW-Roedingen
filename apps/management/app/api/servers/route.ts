import { NextRequest, NextResponse } from 'next/server';

import { database } from '../../../server/DB';

export const GET = () => {
  return NextResponse.json(database.getServers());
}

export const POST = async (req: NextRequest) => {
  const { name, ip, port } = await req.json();
  const id = await database.addServer(name, ip, port);

  return NextResponse.json(database.getServer(id));
}
