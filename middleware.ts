import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'career_tracker_token';
const protectedPagePrefixes = ['/dashboard', '/applications', '/resumes'];
const protectedApiPrefixes = ['/api/applications', '/api/resumes', '/api/metrics'];
const authPagePrefixes = ['/auth/login', '/auth/signup'];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);

  if (!isAuthenticated && matchesPrefix(pathname, protectedPagePrefixes)) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (!isAuthenticated && matchesPrefix(pathname, protectedApiPrefixes)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (isAuthenticated && matchesPrefix(pathname, authPagePrefixes)) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

  if (process.env.NODE_ENV === 'production') {
    // Production CSP tuned for Next.js assets while avoiding overly permissive script execution.
    response.headers.set(
      'Content-Security-Policy',
      "default-src 'self'; base-uri 'self'; frame-ancestors 'none'; object-src 'none'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.openai.com https: wss:; form-action 'self'; upgrade-insecure-requests;"
    );
  }

  return response;
}

export const config = {
  matcher: '/((?!_next/static|_next/image|favicon.ico).*)'
};
