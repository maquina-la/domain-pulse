interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const windowMs = 60 * 1000; // 1 minute
const maxRequests = 30; // 30 req/min

const clients = new Map<string, RateLimitRecord>();

// Cleanup stale records periodically
setInterval(() => {
  const now = Date.now();
  for (const [ip, record] of clients.entries()) {
    if (now > record.resetAt) {
      clients.delete(ip);
    }
  }
}, 60 * 1000);

export function isRateLimited(clientId: string): { limited: boolean; remaining: number; resetInSec: number } {
  const now = Date.now();
  let record = clients.get(clientId);

  if (!record || now > record.resetAt) {
    record = {
      count: 1,
      resetAt: now + windowMs,
    };
    clients.set(clientId, record);
    return { limited: false, remaining: maxRequests - 1, resetInSec: 60 };
  }

  if (record.count >= maxRequests) {
    return {
      limited: true,
      remaining: 0,
      resetInSec: Math.ceil((record.resetAt - now) / 1000),
    };
  }

  record.count += 1;
  return {
    limited: false,
    remaining: maxRequests - record.count,
    resetInSec: Math.ceil((record.resetAt - now) / 1000),
  };
}
