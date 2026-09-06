import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { evaluateSpam } from '@/lib/spam-detector'
import { checkRateLimit } from '@/lib/rate-limiter'

const resend = new Resend(process.env.RESEND_API_KEY)

async function verifyTurnstile(token?: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
  if (!secretKey) {
    // Pass through gracefully if Turnstile is not configured
    return true
  }
  if (!token) {
    return false
  }

  try {
    const formData = new URLSearchParams()
    formData.append('secret', secretKey)
    formData.append('response', token)
    if (ip) formData.append('remoteip', ip)

    const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    })

    const outcome = await res.json()
    return Boolean(outcome.success)
  } catch (err) {
    console.error('Turnstile verification error:', err)
    return true
  }
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting
    const forwardedFor = req.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

    const rateLimit = checkRateLimit(clientIp, { limit: 5, windowMs: 10 * 60 * 1000 })
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      )
    }

    const body = await req.json()
    const { name, email, subject, message, website, honeypot, timestamp, turnstileToken } = body

    // 2. Required field presence
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // 3. Multi-layer Anti-Spam Evaluation (Honeypot, Timestamps, Gibberish/Entropy)
    const spamCheck = evaluateSpam({
      name: String(name),
      email: String(email),
      subject: String(subject),
      message: String(message),
      honeypot: honeypot || website,
      timestamp: typeof timestamp === 'number' ? timestamp : undefined,
    })

    if (spamCheck.isSpam) {
      console.warn(`[Anti-Spam] Flagged submission from IP ${clientIp}. Reason: ${spamCheck.reason}`)

      if (spamCheck.silent) {
        // Silent drop: fool the bot into thinking it succeeded so it doesn't adapt
        return NextResponse.json({
          success: true,
          message: 'Message sent successfully!',
        })
      } else {
        return NextResponse.json(
          { error: spamCheck.reason || 'Invalid message content' },
          { status: 400 }
        )
      }
    }

    // 4. Cloudflare Turnstile verification (if enabled)
    const isHuman = await verifyTurnstile(turnstileToken, clientIp)
    if (!isHuman) {
      return NextResponse.json(
        { error: 'Security verification failed. Please refresh and try again.' },
        { status: 403 }
      )
    }

    // 5. Send email via Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL || 'your-email@example.com',
      subject: `New Contact Form Submission: ${subject}`,
      replyTo: email,
      text: `
Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}
      `,
    })

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}