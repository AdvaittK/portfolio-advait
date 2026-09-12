import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { evaluateSpam } from '@/lib/spam-detector'
import { checkRateLimit } from '@/lib/rate-limiter'

async function verifyTurnstile(token?: string, ip?: string): Promise<boolean> {
  const secretKey = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
  if (!secretKey) {
    // Pass through gracefully if Turnstile is not configured
    return true
  }
  if (!token) {
    // If Turnstile secret is configured but no token provided, only fail if explicitly enforced
    return process.env.TURNSTILE_ENFORCED === 'true' ? false : true
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
    console.error('[Turnstile] Verification error:', err)
    return true
  }
}

export async function POST(req: Request) {
  try {
    // 1. IP Rate Limiting (10 requests per 10 minutes)
    const forwardedFor = req.headers.get('x-forwarded-for')
    const clientIp = forwardedFor ? forwardedFor.split(',')[0].trim() : '127.0.0.1'

    const rateLimit = checkRateLimit(clientIp, { limit: 10, windowMs: 10 * 60 * 1000 })
    if (!rateLimit.success) {
      return NextResponse.json(
        {
          error: `Too many submissions. Please wait ${rateLimit.resetInSeconds} seconds before trying again.`,
        },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => null)
    if (!body) {
      return NextResponse.json({ error: 'Invalid JSON request body' }, { status: 400 })
    }

    const {
      name,
      email,
      subject,
      message,
      website,
      honeypot,
      b_url_trap,
      b_email_trap,
      timestamp,
      turnstileToken,
    } = body

    // 2. Required field presence
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields (name, email, subject, message).' },
        { status: 400 }
      )
    }

    // 3. Multi-layer Anti-Spam Evaluation
    // Use trap field (honeypot / b_url_trap / b_email_trap / website)
    const trapValue = b_url_trap || b_email_trap || honeypot || website || ''
    const spamCheck = evaluateSpam({
      name: String(name),
      email: String(email),
      subject: String(subject),
      message: String(message),
      honeypot: String(trapValue),
      timestamp: typeof timestamp === 'number' ? timestamp : undefined,
    })

    if (spamCheck.isSpam) {
      console.warn(`[Anti-Spam] Flagged submission from IP ${clientIp}. Reason: ${spamCheck.reason}`)

      if (spamCheck.silent) {
        // Silent drop for automated spam bots
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

    // 5. Initialize Resend & Validate API Key
    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      console.error('[Contact API Error] RESEND_API_KEY is not defined in environment variables.')
      return NextResponse.json(
        {
          error: 'Email service configuration missing on server. Please contact advaitt.dev@gmail.com directly.',
        },
        { status: 500 }
      )
    }

    const resend = new Resend(apiKey)
    const recipientEmail = process.env.CONTACT_EMAIL || 'advaitt.dev@gmail.com'
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'Portfolio Contact <onboarding@resend.dev>'

    const formattedMessage = String(message)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;')
      .replace(/\n/g, '<br/>')

    // 6. Send email via Resend
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: recipientEmail,
      replyTo: String(email).trim(),
      subject: `[Portfolio Inquiry] ${String(subject).trim()} - from ${String(name).trim()}`,
      text: `New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}
IP: ${clientIp}
Time: ${new Date().toLocaleString()}

Message:
${message}
      `,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background-color: #ffffff; border: 1px solid #e4e4e7; border-radius: 12px; color: #18181b;">
          <div style="border-bottom: 2px solid #f4f4f5; padding-bottom: 16px; margin-bottom: 20px;">
            <h2 style="margin: 0; color: #09090b; font-size: 20px; font-weight: 700;">📬 New Portfolio Inquiry</h2>
            <p style="margin: 4px 0 0 0; color: #71717a; font-size: 13px;">Received via advaitt.dev contact form</p>
          </div>

          <div style="background-color: #fafafa; border: 1px solid #f4f4f5; border-radius: 8px; padding: 16px; margin-bottom: 20px;">
            <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #71717a; width: 80px; font-weight: 500;">From:</td>
                <td style="padding: 6px 0; color: #09090b; font-weight: 600;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #71717a; font-weight: 500;">Email:</td>
                <td style="padding: 6px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none; font-weight: 600;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #71717a; font-weight: 500;">Subject:</td>
                <td style="padding: 6px 0; color: #09090b; font-weight: 600;">${subject}</td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px 0; color: #3f3f46; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em;">Message</h4>
            <div style="background-color: #ffffff; border: 1px solid #e4e4e7; border-left: 4px solid #18181b; border-radius: 6px; padding: 16px; font-size: 15px; line-height: 1.6; color: #27272a; white-space: pre-wrap;">
${formattedMessage}
            </div>
          </div>

          <div style="text-align: center; margin-bottom: 20px;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(String(subject))}" style="display: inline-block; background-color: #18181b; color: #ffffff; padding: 12px 24px; border-radius: 9999px; text-decoration: none; font-weight: 600; font-size: 14px;">
              Reply to ${name}
            </a>
          </div>

          <div style="border-top: 1px solid #f4f4f5; padding-top: 12px; font-size: 12px; color: #a1a1aa; text-align: center;">
            Sent from IP: ${clientIp} • ${new Date().toUTCString()}
          </div>
        </div>
      `,
    })

    if (error) {
      console.error('[Contact API Resend Error]:', error)
      return NextResponse.json(
        {
          error: error.message || 'Failed to deliver message via email provider. Please contact advaitt.dev@gmail.com directly.',
        },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Message sent successfully!',
      data,
    })
  } catch (error) {
    console.error('[Contact API Server Error]:', error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Internal server error while processing message',
      },
      { status: 500 }
    )
  }
}