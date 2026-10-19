import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(req: NextRequest): NextResponse {
  // Allow public game API endpoints (Bhaag Dipke feedback & visitor analytics)
  if (req.nextUrl.pathname.startsWith("/api/game")) {
    if (req.method === "OPTIONS") {
      return new NextResponse(null, {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
          "Access-Control-Allow-Headers": "Content-Type, Authorization",
        },
      });
    }

    const response = NextResponse.next();
    response.headers.set("Access-Control-Allow-Origin", "*");
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return response;
  }

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
