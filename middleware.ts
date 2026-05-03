import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const COOKIE_NAME = 'career_tracker_token';
const authPagePrefixes = ['/auth/login', '/auth/signup'];
const publicPagePrefixes = ['/', '/auth/login', '/auth/signup'];
const publicApiPrefixes = ['/api/auth'];

function matchesPrefix(pathname: string, prefixes: string[]) {
  return prefixes.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const isAuthenticated = Boolean(token);
  const isApiRoute = pathname.startsWith('/api');
  const isPublicPage = matchesPrefix(pathname, publicPagePrefixes);
  const isPublicApi = matchesPrefix(pathname, publicApiPrefixes);

  if (!isAuthenticated && isApiRoute && !isPublicApi) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  if (!isAuthenticated && !isApiRoute && !isPublicPage) {
    const loginUrl = new URL('/auth/login', request.url);
    loginUrl.searchParams.set('next', `${pathname}${request.nextUrl.search}`);
    return NextResponse.redirect(loginUrl);
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
