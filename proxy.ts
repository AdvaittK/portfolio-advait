import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const config = {
  matcher: ['/services', '/projects'],
};

export default function proxy(request: NextRequest) {
  const { country } = geolocation(request);
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
