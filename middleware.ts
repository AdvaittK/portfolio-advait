import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const config = {
  matcher: ['/services', '/projects'],
};

export default function middleware(request: NextRequest) {
  const { country } = geolocation(request);
  const pathname = request.nextUrl.pathname;

  // Block access to services page for all users
  if (pathname === '/services') {
    return new NextResponse(null, { status: 404 });
  }

  const response = NextResponse.next();

  if (country === 'IN') {
    response.cookies.set('currency', 'INR', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  } else {
    response.cookies.set('currency', 'USD', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });
  }

  return response;
}

