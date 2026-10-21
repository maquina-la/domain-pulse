import * as tls from 'node:tls';
import { SslInfo } from '@domain-pulse/shared';

export interface TlsInspectionResult extends SslInfo {
  san_domains: string[];
}

export async function inspectTls(domain: string, timeoutMs: number = 4000): Promise<TlsInspectionResult> {
  return new Promise((resolve) => {
    let resolved = false;

    const cleanup = (info: TlsInspectionResult) => {
      if (!resolved) {
        resolved = true;
        resolve(info);
      }
    };

    try {
      const socket = tls.connect(
        {
          host: domain,
          port: 443,
          servername: domain,
          rejectUnauthorized: false,
          timeout: timeoutMs,
        },
        () => {
          try {
            const cert = socket.getPeerCertificate(false);
            const tls_version = socket.getProtocol();
            const authorized = socket.authorized;
            const authError = socket.authorizationError ? String(socket.authorizationError) : null;

            socket.end();

            if (!cert || Object.keys(cert).length === 0) {
              cleanup({
                issuer: null,
                valid_from: null,
                valid_to: null,
                days_remaining: null,
                tls_version: tls_version || null,
                hsts_enabled: false,
                is_valid: false,
                error: 'No se pudo obtener el certificado del servidor TLS.',
                san_domains: [],
              });
              return;
            }

            const issuerRaw = cert.issuer ? (cert.issuer.O || cert.issuer.CN) : null;
            const issuer = Array.isArray(issuerRaw)
              ? issuerRaw.join(', ')
              : issuerRaw || 'Emisor desconocido';

            const valid_from = cert.valid_from ? new Date(cert.valid_from).toISOString() : null;
            const valid_to = cert.valid_to ? new Date(cert.valid_to).toISOString() : null;

            let days_remaining: number | null = null;
            if (valid_to) {
              const expTime = new Date(valid_to).getTime();
              days_remaining = Math.round((expTime - Date.now()) / (1000 * 60 * 60 * 24));
            }

            const isExpired = days_remaining !== null && days_remaining < 0;
            const is_valid = authorized && !isExpired;

            // Extract Subject Alternative Names (SANs)
            const san_domains: string[] = [];
            if (cert.subjectaltname && typeof cert.subjectaltname === 'string') {
              const parts = cert.subjectaltname.split(', ');
              for (const part of parts) {
                if (part.startsWith('DNS:')) {
                  const name = part.slice(4).trim().toLowerCase();
                  san_domains.push(name);
                }
              }
            }

            cleanup({
              issuer,
              valid_from,
              valid_to,
              days_remaining,
              tls_version: tls_version || 'TLSv1.2',
              hsts_enabled: false,
              is_valid,
              error: !is_valid
                ? isExpired
                  ? 'El certificado SSL ha caducado.'
                  : authError || 'Certificado no confiable o no emitido por una CA raíz válida.'
                : null,
              san_domains,
            });
          } catch (err: any) {
            cleanup({
              issuer: null,
              valid_from: null,
              valid_to: null,
              days_remaining: null,
              tls_version: null,
              hsts_enabled: false,
              is_valid: false,
              error: err?.message || 'Error al inspeccionar certificado TLS',
              san_domains: [],
            });
          }
        }
      );

      socket.on('timeout', () => {
        socket.destroy();
        cleanup({
          issuer: null,
          valid_from: null,
          valid_to: null,
          days_remaining: null,
          tls_version: null,
          hsts_enabled: false,
          is_valid: false,
          error: 'Tiempo de espera agotado al conectar al puerto 443.',
          san_domains: [],
        });
      });

      socket.on('error', (err) => {
        socket.destroy();
        cleanup({
          issuer: null,
          valid_from: null,
          valid_to: null,
          days_remaining: null,
          tls_version: null,
          hsts_enabled: false,
          is_valid: false,
          error: `Error de conexión TLS: ${err.message}`,
          san_domains: [],
        });
      });
    } catch (err: any) {
      cleanup({
        issuer: null,
        valid_from: null,
        valid_to: null,
        days_remaining: null,
        tls_version: null,
        hsts_enabled: false,
        is_valid: false,
        error: err?.message || 'Fallo general al iniciar handshake TLS',
        san_domains: [],
      });
    }
  });
}
