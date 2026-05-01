const rateWindow = Number(process.env.RATE_LIMIT_WINDOW ?? '60') * 1000;
const maxRequests = Number(process.env.RATE_LIMIT_MAX ?? '120');

const store = new Map<string, { count: number; expires: number }>();

export function checkRateLimit(ip: string) {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || record.expires < now) {
    store.set(ip, { count: 1, expires: now + rateWindow });
    return { allowed: true, remaining: maxRequests - 1 };
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, reset: record.expires };
  }

  record.count += 1;
  store.set(ip, record);
  return { allowed: true, remaining: maxRequests - record.count };
}
