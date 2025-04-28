import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is signed in and the current path is /auth/* redirect the user to /dashboard
  if (session && (req.nextUrl.pathname === "/auth/login" || req.nextUrl.pathname === "/auth/signup")) {
    return NextResponse.redirect(new URL("/dashboard", req.url))
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
