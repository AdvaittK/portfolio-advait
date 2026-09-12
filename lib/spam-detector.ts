/**
 * Anti-spam detection heuristics for form submissions.
 * Catches automated bots and malicious scrapers without flagging legitimate client inquiries.
 */

export interface SpamCheckInput {
  name: string
  email: string
  subject: string
  message: string
  honeypot?: string
  timestamp?: number
}

export interface SpamCheckResult {
  isSpam: boolean
  silent: boolean // If true, respond with 200 OK so bots believe they succeeded
  reason?: string
}

// Basic RFC 5322 compliant email regex
const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/

export function evaluateSpam(input: SpamCheckInput): SpamCheckResult {
  const { name = '', email = '', subject = '', message = '', honeypot = '', timestamp } = input

  // 1. Honeypot check: Bots fill hidden inputs, humans don't
  if (honeypot && honeypot.trim().length > 0) {
    return { isSpam: true, silent: true, reason: 'Honeypot trap triggered' }
  }

  // 2. Email format check
  const cleanEmail = email.trim()
  if (!cleanEmail || !EMAIL_REGEX.test(cleanEmail)) {
    return {
      isSpam: true,
      silent: false,
      reason: 'Please provide a valid email address.',
    }
  }

  // 3. Minimum length checks for message & fields
  const cleanName = name.trim()
  const cleanSubject = subject.trim()
  const cleanMessage = message.trim()

  if (cleanName.length < 1) {
    return { isSpam: true, silent: false, reason: 'Please enter your name.' }
  }

  if (cleanSubject.length < 1) {
    return { isSpam: true, silent: false, reason: 'Please enter a subject.' }
  }

  if (cleanMessage.length < 3) {
    return {
      isSpam: true,
      silent: false,
      reason: 'Please enter a message (at least 3 characters).',
    }
  }

  // 4. Client-side timing check (only flag impossibly fast bot submissions < 400ms if timestamp provided)
  if (typeof timestamp === 'number' && timestamp > 0) {
    const elapsedMs = Date.now() - timestamp
    // Allow up to 30 days for long-lived tabs, and only flag if submission was superhumanly fast (< 400ms)
    // Also tolerate slight clock skew up to 60 seconds
    if (elapsedMs >= 0 && elapsedMs < 400) {
      return { isSpam: true, silent: true, reason: 'Submission too fast (< 400ms)' }
    }
  }

  // 5. Check for repetitive spam links or exploit scripts
  const scriptTagRegex = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
  if (scriptTagRegex.test(cleanMessage) || scriptTagRegex.test(cleanSubject) || scriptTagRegex.test(cleanName)) {
    return { isSpam: true, silent: true, reason: 'Malicious payload detected' }
  }

  // Check for excessive URL spam (e.g. 5+ distinct URLs in a single message)
  const urlMatches = cleanMessage.match(/https?:\/\/[^\s]+/gi) || []
  if (urlMatches.length >= 6) {
    return { isSpam: true, silent: true, reason: 'Excessive links in message body' }
  }

  return { isSpam: false, silent: false }
}

