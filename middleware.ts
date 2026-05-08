import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

const LEGACY_DOMAIN = 'advaitt.tech';
const CANONICAL_DOMAIN = 'advaitt.dev';

function getRedirectHost(hostname: string): string | null {
  const normalized = hostname.toLowerCase();

  if (normalized === LEGACY_DOMAIN || normalized === `www.${LEGACY_DOMAIN}`) {
    return CANONICAL_DOMAIN;
  }

  if (normalized.endsWith(`.${LEGACY_DOMAIN}`)) {
    return normalized.replace(/\.advaitt\.tech$/i, '.advaitt.dev');
  }

  return null;
}

export const config = {
  matcher: ['/:path*'],
};

export default function middleware(request: NextRequest) {
  const redirectHost = getRedirectHost(request.nextUrl.hostname);

  if (redirectHost) {
    const url = request.nextUrl.clone();
    url.protocol = 'https:';
    url.hostname = redirectHost;
    url.port = '';

    return NextResponse.redirect(url, 301);
  }

  try {
    const response = NextResponse.next();

    if (request.nextUrl.pathname === '/pricing' || request.nextUrl.pathname === '/projects') {
      const { country } = geolocation(request);
      const currency =
        typeof country === 'string' && country === 'IN' ? 'INR' : 'USD';

      response.cookies.set('currency', currency, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });
    }

    return response;
  } catch {
    return NextResponse.next();
  }
}

