import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const res = new NextResponse(null, { status: 204 })

  try {
    const country =
      request.headers.get('cf-ipcountry') ??
      request.headers.get('x-vercel-ip-country')
    const value =
      typeof country === 'string' && country.toUpperCase() === 'IN' ? 'INR' : 'USD'
    res.cookies.set('currency', value, {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  } catch {
    res.cookies.set('currency', 'USD', {
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
  }

  return res
}
