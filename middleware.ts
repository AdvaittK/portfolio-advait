import { NextRequest, NextResponse } from 'next/server';
import { geolocation } from '@vercel/edge';

export const config = {
  // Match only the /services path
  matcher: '/services',
};

export function middleware(request: NextRequest) {
  // Get the user's country from Vercel's Edge Middleware
  const { country } = geolocation(request);
  
  // Set a cookie for the country code to be used client-side
  const response = NextResponse.next();
  
  // For India, set a cookie to display INR by default 
  if (country === 'IN') {
    response.cookies.set('currency', 'INR', { 
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  } else {
    // For all other countries, set USD as default
    response.cookies.set('currency', 'USD', { 
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/',
    });
  }
  
  return response;
}
