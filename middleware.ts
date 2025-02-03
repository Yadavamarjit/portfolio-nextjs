import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest): NextResponse {
  const allowedOrigin: string = process.env.NEXT_PUBLIC_SITE_URL as string;
  const origin: string | null =
    req.headers.get("origin") || req.headers.get("referer");

  if (!origin || !origin.startsWith(allowedOrigin)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
