/**
 * Anti-spam detection heuristics for form submissions.
 * Catches automated bots, headless scrapers, and random-gibberish spam.
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

const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y', 'A', 'E', 'I', 'O', 'U', 'Y'])

/**
 * Checks if a string has an unnatural consonant cluster (e.g. 5+ consecutive consonants)
 * such as 'qcmvUKzFk' or 'Tfnqcf'.
 */
function hasExcessiveConsonants(text: string, maxConsecutive = 5): boolean {
  let consecutive = 0
  for (const char of text) {
    if (/[a-zA-Z]/.test(char)) {
      if (!VOWELS.has(char)) {
        consecutive++
        if (consecutive >= maxConsecutive) {
          return true
        }
      } else {
        consecutive = 0
      }
    } else {
      consecutive = 0
    }
  }
  return false
}

/**
 * Checks if a single word has an unnatural vowel ratio (< 12% or > 80% on words >= 6 chars).
 */
function hasUnnaturalVowelRatio(word: string): boolean {
  const lettersOnly = word.replace(/[^a-zA-Z]/g, '')
  if (lettersOnly.length < 6) return false

  let vowelCount = 0
  for (const char of lettersOnly) {
    if (VOWELS.has(char)) vowelCount++
  }

  const ratio = vowelCount / lettersOnly.length
  return ratio < 0.12 || ratio > 0.85
}

/**
 * Detects erratic camelCase/mixed case inside a single token (e.g. 'qcmvUKzFkMPZilJyeYKor').
 */
function hasErraticCasing(word: string): boolean {
  if (word.length < 10) return false
  // Count case transitions (lowercase -> uppercase or vice versa)
  let transitions = 0
  for (let i = 1; i < word.length; i++) {
    const prev = word[i - 1]
    const curr = word[i]
    if (
      (/[a-z]/.test(prev) && /[A-Z]/.test(curr)) ||
      (/[A-Z]/.test(prev) && /[a-z]/.test(curr))
    ) {
      transitions++
    }
  }
  // Real words or PascalCase/camelCase usually have 1-3 transitions; random strings have 6+
  return transitions >= 5
}

/**
 * Evaluates whether a text token is high-entropy gibberish.
 */
function isGibberishToken(token: string): boolean {
  if (token.length < 7) return false
  if (hasExcessiveConsonants(token, 5)) return true
  if (hasUnnaturalVowelRatio(token)) return true
  if (hasErraticCasing(token)) return true
  return false
}

export function evaluateSpam(input: SpamCheckInput): SpamCheckResult {
  const { name = '', email = '', subject = '', message = '', honeypot = '', timestamp } = input

  // 1. Honeypot check: Bots fill hidden inputs
  if (honeypot && honeypot.trim().length > 0) {
    return { isSpam: true, silent: true, reason: 'Honeypot field triggered' }
  }

  // 2. Submission timing check (humans take at least 2.5s, max 24h)
  if (timestamp) {
    const elapsedMs = Date.now() - timestamp
    if (elapsedMs < 2500) {
      return { isSpam: true, silent: true, reason: 'Submission too fast (< 2.5s)' }
    }
    const twentyFourHoursMs = 24 * 60 * 60 * 1000
    if (elapsedMs > twentyFourHoursMs || elapsedMs < -10000) {
      return { isSpam: true, silent: true, reason: 'Invalid submission timestamp' }
    }
  }

  // 3. Email pattern checks: Excessive dots (e.g. e.l.ain.e.fox1213@gmail.com)
  const emailUsername = email.split('@')[0] || ''
  const dotCount = (emailUsername.match(/\./g) || []).length
  if (dotCount >= 4) {
    return { isSpam: true, silent: true, reason: 'Suspicious dot-stuffed email pattern' }
  }

  // 4. Whitespace & continuous string checks on subject and message
  const cleanSubject = subject.trim()
  const cleanMessage = message.trim()

  // Single continuous string > 18 characters without spaces (e.g. 'qcmvUKzFkMPZilJyeYKor' or 'dwnYJuTfnqcfDOeTDYEWDCJ')
  if (cleanSubject.length > 18 && !/\s/.test(cleanSubject)) {
    return { isSpam: true, silent: true, reason: 'Subject is a single long continuous string without whitespace' }
  }
  if (cleanMessage.length > 18 && !/\s/.test(cleanMessage)) {
    return { isSpam: true, silent: true, reason: 'Message is a single long continuous string without whitespace' }
  }

  // Check subject for gibberish
  if (cleanSubject.length >= 7) {
    const subjectWords = cleanSubject.split(/\s+/)
    const gibberishSubjectWords = subjectWords.filter(isGibberishToken)
    if (gibberishSubjectWords.length > 0 && gibberishSubjectWords.length >= subjectWords.length / 2) {
      return { isSpam: true, silent: true, reason: 'Subject contains high-entropy gibberish' }
    }
  }

  // Check message for gibberish
  const messageWords = cleanMessage.split(/\s+/).filter(Boolean)
  if (messageWords.length < 3) {
    return {
      isSpam: true,
      silent: false,
      reason: 'Please provide a more descriptive message (at least 3 words).'
    }
  }

  const gibberishMessageWords = messageWords.filter(isGibberishToken)
  if (gibberishMessageWords.length >= 1 && gibberishMessageWords.length >= messageWords.length / 2) {
    return { isSpam: true, silent: true, reason: 'Message contains high-entropy gibberish' }
  }

  // Check name for gibberish
  const cleanName = name.trim()
  if (cleanName.length > 5) {
    const nameParts = cleanName.split(/\s+/).filter(Boolean)
    const gibberishParts = nameParts.filter(isGibberishToken)
    if (gibberishParts.length > 0 && gibberishParts.length === nameParts.length) {
      return { isSpam: true, silent: true, reason: 'Name is high-entropy gibberish' }
    }
  }

  return { isSpam: false, silent: false }
}
