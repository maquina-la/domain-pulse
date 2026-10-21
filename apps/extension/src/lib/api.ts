import { AuditResponse } from '@domain-pulse/shared';

const DEFAULT_API_BASE = 'http://localhost:3000';
const STORAGE_KEY_API_BASE = 'pulse_domain_api_base';

export function getApiBaseUrl(): string {
  if (typeof window !== 'undefined' && window.localStorage) {
    const saved = localStorage.getItem(STORAGE_KEY_API_BASE);
    if (saved) return saved;
  }
  return DEFAULT_API_BASE;
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
    // If connection refused (backend not yet running or demoing), check if mock should be used or throw
    if (err.message?.includes('Failed to fetch') || err.message?.includes('NetworkError')) {
      throw new Error(
        `No se pudo conectar con el Gateway (${apiBase}). Asegúrate de que el backend de Domain-pulse esté corriendo en el puerto 3000.`
      );
    }
    throw err;
  }
}
