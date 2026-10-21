import { RegistrationInfo } from '@domain-pulse/shared';

interface RdapEntity {
  roles?: string[];
  vcardArray?: unknown[];
  handle?: string;
  entities?: RdapEntity[];
}

interface RdapEvent {
  eventAction?: string;
  eventDate?: string;
}

interface RdapResponse {
  entities?: RdapEntity[];
  events?: RdapEvent[];
  nameservers?: Array<{ ldhName?: string }>;
  status?: string[];
}

function extractRegistrarName(entities?: RdapEntity[]): string | null {
  if (!entities || !Array.isArray(entities)) return null;

  for (const entity of entities) {
    if (entity.roles && entity.roles.includes('registrar')) {
      if (Array.isArray(entity.vcardArray) && entity.vcardArray[1]) {
        const vcardProps = entity.vcardArray[1] as unknown[][];
        for (const prop of vcardProps) {
          if (Array.isArray(prop) && prop[0] === 'fn' && typeof prop[3] === 'string') {
            return prop[3];
          }
        }
      }
      if (entity.handle) {
        return entity.handle;
      }
    }
    // Check nested entities
    if (entity.entities) {
      const nested = extractRegistrarName(entity.entities);
      if (nested) return nested;
    }
  }

  return null;
}

export async function fetchRdapInfo(domain: string, fallbackNameservers: string[] = []): Promise<RegistrationInfo> {
  const url = `https://rdap.org/domain/${encodeURIComponent(domain)}`;
  
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 4500);

    const res = await fetch(url, {
      headers: {
        accept: 'application/rdap+json, application/json',
      },
      signal: controller.signal,
    });
    clearTimeout(timer);

    if (!res.ok) {
      return buildFallbackRegistration(fallbackNameservers);
    }

    const data = (await res.json()) as RdapResponse;

    let created_at: string | null = null;
    let expires_at: string | null = null;

    if (Array.isArray(data.events)) {
      for (const ev of data.events) {
        if (ev.eventAction === 'registration') {
          created_at = ev.eventDate || null;
        } else if (ev.eventAction === 'expiration') {
          expires_at = ev.eventDate || null;
        }
      }
    }

    let days_until_expiration: number | null = null;
    if (expires_at) {
      const expTime = new Date(expires_at).getTime();
      const now = Date.now();
      days_until_expiration = Math.max(0, Math.round((expTime - now) / (1000 * 60 * 60 * 24)));
    }

    const registrar = extractRegistrarName(data.entities);

    const nameservers: string[] = [];
    if (Array.isArray(data.nameservers)) {
      for (const ns of data.nameservers) {
        if (ns.ldhName) {
          nameservers.push(ns.ldhName.toLowerCase());
        }
      }
    }

    const status = Array.isArray(data.status) && data.status.length > 0 ? data.status[0] : 'active';

    return {
      registrar: registrar || 'Registrador Privado / ICANN Protegido',
      created_at,
      expires_at,
      days_until_expiration,
      status,
      nameservers: nameservers.length > 0 ? nameservers : fallbackNameservers,
    };
  } catch (err) {
    return buildFallbackRegistration(fallbackNameservers);
  }
}

function buildFallbackRegistration(nameservers: string[]): RegistrationInfo {
  return {
    registrar: 'Consultado vía DNS / Whois Privado',
    created_at: null,
    expires_at: null,
    days_until_expiration: null,
    status: 'active',
    nameservers,
  };
}
