/**
 * In-memory sliding window rate limiter.
 * Tracks requests per IP and auto-cleans stale entries.
 */

interface RateLimitRecord {
  timestamps: number[]
}

const ipRecords = new Map<string, RateLimitRecord>()

// Clean up entries older than 30 minutes every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000
const MAX_RECORD_AGE_MS = 30 * 60 * 1000

let lastCleanup = Date.now()

function cleanupOldRecords() {
  const now = Date.now()
  if (now - lastCleanup < CLEANUP_INTERVAL_MS) return
  lastCleanup = now

  ipRecords.forEach((record, ip) => {
    record.timestamps = record.timestamps.filter((ts) => now - ts < MAX_RECORD_AGE_MS)
    if (record.timestamps.length === 0) {
      ipRecords.delete(ip)
    }
  })
}

export interface RateLimitOptions {
  limit?: number // Maximum requests allowed in the window
  windowMs?: number // Sliding window time in milliseconds
}

export interface RateLimitResult {
  success: boolean
  remaining: number
  resetInSeconds: number
}

/**
 * Checks whether an IP has exceeded the allowed rate limit.
 * Defaults: 5 requests per 10 minutes.
 */
export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): RateLimitResult {
  cleanupOldRecords()

  const limit = options.limit ?? 5
  const windowMs = options.windowMs ?? 10 * 60 * 1000
  const now = Date.now()

  let record = ipRecords.get(ip)
  if (!record) {
    record = { timestamps: [] }
    ipRecords.set(ip, record)
  }

  // Filter timestamps within current window
  record.timestamps = record.timestamps.filter((ts) => now - ts < windowMs)

  if (record.timestamps.length >= limit) {
    const oldestTimestamp = record.timestamps[0]
    const resetInSeconds = Math.max(
      1,
      Math.ceil((oldestTimestamp + windowMs - now) / 1000)
    )
    return {
      success: false,
      remaining: 0,
      resetInSeconds,
    }
  }

  // Register current hit
  record.timestamps.push(now)

  return {
    success: true,
    remaining: limit - record.timestamps.length,
    resetInSeconds: Math.ceil(windowMs / 1000),
  }
}
