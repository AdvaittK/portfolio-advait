import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { geolocation } from '@vercel/edge'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
  const { country } = geolocation(request)
  const res = new NextResponse(null, { status: 204 })

  const value = country === 'IN' ? 'INR' : 'USD'
  res.cookies.set('currency', value, {
    maxAge: 60 * 60 * 24 * 30,
    path: '/',
  })

  return res
}
