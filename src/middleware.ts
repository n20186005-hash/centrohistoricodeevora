import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from './i18n/routing';

const localeMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  if (request.nextUrl.hostname === 'centrohistoricodeevora.com') {
    const target = request.nextUrl.clone();
    target.hostname = 'www.centrohistoricodeevora.com';
    target.protocol = 'https:';
    return NextResponse.redirect(target, 308);
  }
  return localeMiddleware(request);
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
};
