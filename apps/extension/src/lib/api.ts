import { AuditResponse } from '@domain-pulse/shared';

export const VOLCANO_CLOUD_API_BASE = 'https://7cf17484-33bf-4348-9159-048674bdc509.functions.volcano.run';
export const LOCAL_DEV_API_BASE = 'http://localhost:3000';

const STORAGE_KEY_API_BASE = 'pulse_domain_api_base';

export function getApiBaseUrl(): string {
  // In production builds (dist/Chrome Web Store), strictly use the Volcano Cloud service
  if (import.meta.env.PROD) {
    return VOLCANO_CLOUD_API_BASE;
  }

  // In development mode, allow localStorage override for testing
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem(STORAGE_KEY_API_BASE);
    if (saved) return saved;
  }
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
      throw new Error(errJson?.message || `Error del servidor HTTP ${res.status}: ${res.statusText}`);
    }

    const data = (await res.json()) as AuditResponse;
    return data;
  } catch (err: any) {
    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      if (import.meta.env.PROD) {
        throw new Error(
          'No se pudo conectar con el servicio de Domain Pulse Cloud. Verifica tu conexión a internet.'
        );
      }
      throw new Error(
        `No se pudo conectar con el Gateway (${apiBase}). Verifica que el servidor de desarrollo esté corriendo.`
      );
    }
    throw err;
  }
}
