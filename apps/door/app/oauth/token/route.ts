import { NextRequest, NextResponse } from "next/server";

import { API } from "fw-roedingen-shared/api"

export function POST(request: NextRequest) {
  return NextResponse.redirect(`${API}/oauth/token`);
}
