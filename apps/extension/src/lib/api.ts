import { AuditResponse } from '@domain-pulse/shared';

export const VOLCANO_CLOUD_API_BASE = 'https://7cf17484-33bf-4348-9159-048674bdc509.functions.volcano.run';
export const LOCAL_DEV_API_BASE = 'http://localhost:3000';

const STORAGE_KEY_API_BASE = 'pulse_domain_api_base';

export function getApiBaseUrl(): string {
  // If user explicitly saved an override in settings, respect it
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem(STORAGE_KEY_API_BASE);
    if (saved) return saved;
  }

  // In production builds, default to Volcano Cloud
  if (import.meta.env.PROD) {
    return VOLCANO_CLOUD_API_BASE;
  }

  // In development mode, default to local server
  return LOCAL_DEV_API_BASE;
}

export function setApiBaseUrl(url: string): void {
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(STORAGE_KEY_API_BASE, url.trim().replace(/\/+$/, ''));
  }
}

export async function fetchDomainAudit(domain: string): Promise<AuditResponse> {
  const apiBase = getApiBaseUrl();
  const url = `${apiBase}/v1/audit?domain=${encodeURIComponent(domain)}`;

  try {
    const res = await fetch(url, {
      headers: {
        'X-Client-Version': '1.0.0',
        Accept: 'application/json',
      },
    });

    if (!res.ok) {
      const errJson = await res.json().catch(() => null);

      // If cloud gateway fails or is provisioning, attempt transparent local gateway fallback
      if (apiBase !== LOCAL_DEV_API_BASE) {
        try {
          const localRes = await fetch(`${LOCAL_DEV_API_BASE}/v1/audit?domain=${encodeURIComponent(domain)}`, {
            headers: { 'X-Client-Version': '1.0.0', Accept: 'application/json' },
          });
          if (localRes.ok) {
            return (await localRes.json()) as AuditResponse;
          }
        } catch {
          // local gateway not reachable, throw original cloud error
        }
      }

      throw new Error(errJson?.message || `Error del servidor HTTP ${res.status}: ${res.statusText}`);
    }

    const data = (await res.json()) as AuditResponse;
    return data;
  } catch (err: any) {
    // If connection refused on cloud endpoint, try local fallback
    if (apiBase !== LOCAL_DEV_API_BASE) {
      try {
        const localRes = await fetch(`${LOCAL_DEV_API_BASE}/v1/audit?domain=${encodeURIComponent(domain)}`, {
          headers: { 'X-Client-Version': '1.0.0', Accept: 'application/json' },
        });
        if (localRes.ok) {
          return (await localRes.json()) as AuditResponse;
        }
      } catch {
        // Fallback failed
      }
    }

    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      throw new Error(
        `No se pudo conectar con el Gateway (${apiBase}). Verifica tu conexión o revisa los ajustes del gateway.`
      );
    }
    throw err;
  }
}
