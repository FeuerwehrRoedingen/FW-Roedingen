import { NextRequest, NextResponse } from 'next/server';

import { database } from '../../../server/DB';

export const GET = async () => {
  return NextResponse.json(await database.getServers());
}

export const POST = async (req: NextRequest) => {
  const { name, ip, sshPort, vncPort } = await req.json();
  const id = await database.addServer(name, ip, sshPort, vncPort);

  if(!id) return NextResponse.error()

  return NextResponse.json(await database.getServer(id));
}
