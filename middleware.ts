import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const config = {
  matcher: ['/pricing', '/projects'],
};

export default function middleware(request: NextRequest) {
  try {
    const { country } = geolocation(request);
    const response = NextResponse.next();
    const currency =
      typeof country === 'string' && country === 'IN' ? 'INR' : 'USD';

    response.cookies.set('currency', currency, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    });

    return response;
  } catch {
    return NextResponse.next();
  }
}

