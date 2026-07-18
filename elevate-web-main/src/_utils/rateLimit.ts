// Simple in-memory rate limiting utility
const rateCache = new Map<string, { count: number; expiresAt: number }>();

export interface RateLimitOptions {
  windowMs: number;
  maxRequests: number;
}

export function rateLimit(key: string, options: RateLimitOptions): { success: boolean; limit: number; remaining: number } {
  const now = Date.now();
  const record = rateCache.get(key);

  if (!record || now > record.expiresAt) {
    // New or expired
    rateCache.set(key, { count: 1, expiresAt: now + options.windowMs });
    return { success: true, limit: options.maxRequests, remaining: options.maxRequests - 1 };
  }

  if (record.count >= options.maxRequests) {
    // Rate limit exceeded
    return { success: false, limit: options.maxRequests, remaining: 0 };
  }

  // Increment
  record.count += 1;
  return { success: true, limit: options.maxRequests, remaining: options.maxRequests - record.count };
}

// Cleanup function to prevent memory leaks in long-running processes
export function cleanupRateCache() {
  const now = Date.now();
  for (const [key, record] of rateCache.entries()) {
    if (now > record.expiresAt) {
      rateCache.delete(key);
    }
  }
}

// Run cleanup periodically (e.g. every 10 minutes)
if (typeof setInterval !== 'undefined') {
  setInterval(cleanupRateCache, 10 * 60 * 1000);
}
