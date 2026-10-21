import * as tls from 'node:tls';
import { SslInfo } from '@domain-pulse/shared';

export async function inspectTls(domain: string, timeoutMs: number = 4000): Promise<SslInfo> {
  return new Promise((resolve) => {
    let resolved = false;

    const cleanup = (info: SslInfo) => {
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

            cleanup({
              issuer,
              valid_from,
              valid_to,
              days_remaining,
              tls_version: tls_version || 'TLSv1.2',
              hsts_enabled: false, // will be combined with hsts inspection
              is_valid,
              error: !is_valid
                ? isExpired
                  ? 'El certificado SSL ha caducado.'
                  : authError || 'Certificado no confiable o no emitido por una CA raíz válida.'
                : null,
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
      });
    }
  });
}
