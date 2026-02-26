import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PROTECTED_ROUTES = ['/dashboard', '/pengguna', '/admin', '/superadmin']
const AUTH_ROUTES = ['/masuk', '/daftar', '/forgot-password']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuthenticated = request.cookies.get('auth-active')?.value === '1'
  const role = request.cookies.get('auth-role')?.value

  // Protected routes — redirect to login if not authenticated
  const isProtected = PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  if (isProtected && !isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/masuk'
    url.searchParams.set('redirect', pathname)
    return NextResponse.redirect(url)
  }

  // Auth routes — redirect to dashboard if already authenticated
  const isAuthRoute = AUTH_ROUTES.some((route) => pathname.startsWith(route))
  if (isAuthRoute && isAuthenticated) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Role-based route protection
  if (isAuthenticated && role) {
    // /admin routes — only ADMIN and SUPERADMIN
    if (pathname.startsWith('/admin') && !['ADMIN', 'SUPERADMIN'].includes(role)) {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }

    // /superadmin routes — only SUPERADMIN
    if (pathname.startsWith('/superadmin') && role !== 'SUPERADMIN') {
      const url = request.nextUrl.clone()
      url.pathname = '/dashboard'
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/pengguna/:path*',
    '/admin/:path*',
    '/superadmin/:path*',
    '/masuk',
    '/daftar',
    '/forgot-password',
  ],
}
