import {
  RegistrationInfo,
  DnsInfo,
  SslInfo,
  EmailInfo,
  ScorePenalty,
  HealthScoreResult,
  WarningItem,
} from './types.js';

export function calculateHealthScore(
  registration: RegistrationInfo,
  dns: DnsInfo,
  ssl: SslInfo,
  email: EmailInfo
): HealthScoreResult {
  let score = 100;
  const penalties: ScorePenalty[] = [];
  const warnings: WarningItem[] = [];

  // 1. Falta de certificado HTTPS válido: -40 pts
  if (!ssl.is_valid) {
    score -= 40;
    penalties.push({
      code: 'SSL_INVALID',
      label: 'Certificado HTTPS inválido o no disponible (-40)',
      deduction: 40,
      category: 'ssl',
    });
    warnings.push({
      code: 'SSL_INVALID',
      severity: 'critical',
      message: ssl.error || 'El sitio no cuenta con un certificado SSL/TLS válido.',
      category: 'ssl',
    });
  } else if (ssl.days_remaining !== null && ssl.days_remaining < 14) {
    // 2. Certificado SSL vence en < 14 días: -15 pts
    score -= 15;
    penalties.push({
      code: 'SSL_EXPIRING_CRITICAL',
      label: 'Certificado SSL caduca en menos de 14 días (-15)',
      deduction: 15,
      category: 'ssl',
    });
    warnings.push({
      code: 'SSL_EXPIRING_CRITICAL',
      severity: 'high',
      message: `El certificado SSL caduca pronto (${ssl.days_remaining} días restantes).`,
      category: 'ssl',
    });
  } else if (ssl.days_remaining !== null && ssl.days_remaining < 45) {
    // Warning without core penalty if between 14 and 45 days
    warnings.push({
      code: 'SSL_EXPIRING_SOON',
      severity: 'medium',
      message: `El certificado SSL caduca en ${ssl.days_remaining} días.`,
      category: 'ssl',
    });
  }

  // 3. Dominio vence en < 30 días: -20 pts
  if (
    registration.days_until_expiration !== null &&
    registration.days_until_expiration < 30
  ) {
    score -= 20;
    penalties.push({
      code: 'DOMAIN_EXPIRING_SOON',
      label: 'El registro del dominio vence en menos de 30 días (-20)',
      deduction: 20,
      category: 'registration',
    });
    warnings.push({
      code: 'DOMAIN_EXPIRING_SOON',
      severity: 'critical',
      message: `El dominio expira en ${registration.days_until_expiration} días. Renueva urgentemente con tu registrador.`,
      category: 'registration',
    });
  }

  // 4. Sin política DMARC: -15 pts
  if (!email.dmarc.configured || !email.dmarc.policy) {
    score -= 15;
    penalties.push({
      code: 'DMARC_MISSING',
      label: 'Sin política DMARC configurada (-15)',
      deduction: 15,
      category: 'email',
    });
    warnings.push({
      code: 'DMARC_MISSING',
      severity: 'high',
      message: 'No se detectó registro DMARC (_dmarc). El dominio es vulnerable a spoofing.',
      category: 'email',
    });
  } else if (email.dmarc.policy === 'none') {
    // 5. DMARC en modo permisivo (p=none): -5 pts
    score -= 5;
    penalties.push({
      code: 'DMARC_PERMISSIVE',
      label: 'Política DMARC en modo permisivo (p=none) (-5)',
      deduction: 5,
      category: 'email',
    });
    warnings.push({
      code: 'DMARC_PERMISSIVE',
      severity: 'medium',
      message: 'La política DMARC está configurada como p=none (solo monitoreo). Se recomienda p=quarantine o p=reject.',
      category: 'email',
    });
  }

  // 6. Sin registro SPF o mal configurado: -10 pts
  if (!email.spf.configured || !email.spf.raw) {
    score -= 10;
    penalties.push({
      code: 'SPF_MISSING',
      label: 'Sin registro SPF configurado (-10)',
      deduction: 10,
      category: 'email',
    });
    warnings.push({
      code: 'SPF_MISSING',
      severity: 'high',
      message: 'Falta el registro TXT SPF (v=spf1). Los servidores de correo pueden rechazar envíos.',
      category: 'email',
    });
  } else if (email.spf.strictness === 'neutral' || email.spf.strictness === 'none') {
    warnings.push({
      code: 'SPF_WEAK',
      severity: 'medium',
      message: 'El registro SPF tiene una directiva final débil (?all o +all). Usa ~all o -all.',
      category: 'email',
    });
  }

  // 7. Falta de soporte IPv6 (sin registros AAAA): -5 pts
  if (!dns.has_ipv6 || dns.aaaa_records.length === 0) {
    score -= 5;
    penalties.push({
      code: 'NO_IPV6',
      label: 'Sin registros AAAA (IPv6) configurados (-5)',
      deduction: 5,
      category: 'dns',
    });
    warnings.push({
      code: 'NO_IPV6',
      severity: 'low',
      message: 'No se detectó soporte para IPv6 (sin registros AAAA).',
      category: 'dns',
    });
  }

  // 8. Sin cabecera HSTS detectada: -5 pts
  if (!ssl.hsts_enabled) {
    score -= 5;
    penalties.push({
      code: 'HSTS_DISABLED',
      label: 'Cabecera HSTS (Strict-Transport-Security) ausente (-5)',
      deduction: 5,
      category: 'ssl',
    });
    warnings.push({
      code: 'HSTS_DISABLED',
      severity: 'low',
      message: 'No se encontró la cabecera HTTP Strict-Transport-Security.',
      category: 'ssl',
    });
  }

  // Clamp 0 - 100
  const finalScore = Math.max(0, Math.min(100, score));

  let grade: 'optimal' | 'warning' | 'critical' = 'optimal';
  if (finalScore < 60) {
    grade = 'critical';
  } else if (finalScore < 85) {
    grade = 'warning';
  }

  return {
    score: finalScore,
    grade,
    penalties,
    warnings,
  };
}
