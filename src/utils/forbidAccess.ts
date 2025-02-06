import { NextResponse, NextRequest } from "next/server";

export const checkForForbidding = (req: NextRequest) => {
  const allowedOrigin = process.env.NEXT_PUBLIC_SITE_URL as string;
  const origin = req.headers.get("origin") || req.headers.get("referer");
  console.log("reeee", req.headers.get("user-agent"));
  if (!origin || !origin.startsWith(allowedOrigin)) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }
};
