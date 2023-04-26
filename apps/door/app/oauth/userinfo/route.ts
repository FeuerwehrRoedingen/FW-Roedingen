import { NextRequest, NextResponse } from "next/server";

import { API } from "fw-roedingen-shared/api"

export function GET(request: NextRequest) {
  return NextResponse.redirect(`${API}/oauth/userinfo`);
}
