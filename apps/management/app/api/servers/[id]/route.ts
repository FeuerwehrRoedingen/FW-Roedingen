import { NextRequest, NextResponse } from "next/server";

import { database } from "../../../../server/DB";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  return NextResponse.json(await database.getServer(parseInt(params.id, 10)));
}

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  return NextResponse.json(await database.deleteServer(parseInt(params.id, 10)));
}
