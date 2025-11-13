import { NextRequest, NextResponse } from 'next/server'
import nextAuthMiddleware from 'next-auth/middleware'

// Wrap the imported middleware so we always export a function
export default async function middleware(req: NextRequest) {
  // next-auth may export the middleware as the default function, or as an object with a default property.
  const mw: any = nextAuthMiddleware && (typeof nextAuthMiddleware === 'function'
    ? nextAuthMiddleware
    : nextAuthMiddleware.default)

  if (typeof mw === 'function') {
    // Call and return the next-auth middleware result
    return mw(req)
  }

  // Fallback: allow the request through if next-auth middleware isn't available
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/screening/:path*',
  ],
}
