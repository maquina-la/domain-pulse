import { LRUCache } from 'lru-cache';
import { AuditResponse } from '@domain-pulse/shared';

// 2 hours TTL in milliseconds
const TWO_HOURS_MS = 2 * 60 * 60 * 1000;

export const auditCache = new LRUCache<string, AuditResponse>({
  max: 1000,
  ttl: TWO_HOURS_MS,
  allowStale: false,
  updateAgeOnGet: false,
});
