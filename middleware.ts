import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const role = request.cookies.get("role")?.value;

  // Not logged in
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Only admin can access /dashboard/admin
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/home", request.url));
  }

  return NextResponse.next();
}
