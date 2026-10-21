import { AuditResponse } from './types.js';

export function generateAuditMarkdown(audit: AuditResponse): string {
  const { domain, score, timestamp, registration, dns, ssl, email, warnings } = audit;

  const scoreEmoji = score >= 85 ? '🟢' : score >= 60 ? '🟡' : '🔴';
  const scoreLabel = score >= 85 ? 'Excelente / Óptimo' : score >= 60 ? 'Advertencia / Mejorable' : 'Crítico / Atención Requerida';

  const dateStr = new Date(timestamp).toUTCString();

  let md = `# ⚡ Domain Pulse Audit: \`${domain}\`\n\n`;
  md += `> **Health Score:** ${scoreEmoji} **${score}/100** (${scoreLabel})  \n`;
  md += `> **Audit Timestamp:** ${dateStr}  \n`;
  if (audit.cached) {
    md += `> *Data retrieved from cache*  \n`;
  }
  md += `\n---\n\n`;

  // 1. Registro
  md += `## 📋 1. Registro & Delegación\n\n`;
  md += `| Parámetro | Valor |\n`;
  md += `| :--- | :--- |\n`;
  md += `| **Registrador** | ${registration.registrar || 'Desconocido / Privado'} |\n`;
  md += `| **Fecha de Creación** | ${registration.created_at ? new Date(registration.created_at).toLocaleDateString() : 'N/D'} |\n`;
  md += `| **Fecha de Expiración** | ${registration.expires_at ? new Date(registration.expires_at).toLocaleDateString() : 'N/D'} |\n`;
  md += `| **Días Restantes** | ${registration.days_until_expiration !== null ? `${registration.days_until_expiration} días` : 'N/D'} |\n`;
  md += `| **Estado** | ${registration.status || 'Active'} |\n`;
  md += `| **Nameservers** | ${registration.nameservers.length > 0 ? registration.nameservers.join(', ') : 'No detectados'} |\n\n`;

  // 2. Infraestructura DNS
  md += `## 🌐 2. Infraestructura DNS\n\n`;
  md += `| Parámetro | Valor |\n`;
  md += `| :--- | :--- |\n`;
  md += `| **Proveedor / CDN** | **${dns.detected_provider}** |\n`;
  md += `| **Soporte IPv6** | ${dns.has_ipv6 ? '✅ Sí (AAAA presente)' : '❌ No disponible'} |\n`;
  md += `| **Registros A (IPv4)** | ${dns.a_records.length > 0 ? dns.a_records.map(ip => `\`${ip}\``).join(', ') : 'Ninguno'} |\n`;
  md += `| **Registros AAAA (IPv6)** | ${dns.aaaa_records.length > 0 ? dns.aaaa_records.map(ip => `\`${ip}\``).join(', ') : 'Ninguno'} |\n\n`;

  // 3. Seguridad SSL/TLS
  md += `## 🔒 3. Seguridad SSL / TLS\n\n`;
  md += `| Parámetro | Valor |\n`;
  md += `| :--- | :--- |\n`;
  md += `| **Estado del Certificado** | ${ssl.is_valid ? '✅ Válido' : '❌ Inválido o Ausente'} |\n`;
  md += `| **Emisor (Issuer)** | ${ssl.issuer || 'N/D'} |\n`;
  md += `| **Vigencia** | ${ssl.valid_from ? new Date(ssl.valid_from).toLocaleDateString() : 'N/D'} - ${ssl.valid_to ? new Date(ssl.valid_to).toLocaleDateString() : 'N/D'} |\n`;
  md += `| **Días Restantes de Certificado** | ${ssl.days_remaining !== null ? `${ssl.days_remaining} días` : 'N/D'} |\n`;
  md += `| **Versión TLS** | ${ssl.tls_version || 'N/D'} |\n`;
  md += `| **Cabecera HSTS** | ${ssl.hsts_enabled ? '✅ Habilitado (Strict-Transport-Security)' : '⚠️ Deshabilitado / No detectado'} |\n\n`;

  // 4. Email Deliverability
  md += `## ✉️ 4. Entregabilidad de Correo Electrónico\n\n`;
  md += `| Parámetro | Configuración | Detalle |\n`;
  md += `| :--- | :--- | :--- |\n`;
  md += `| **Proveedor MX** | ${email.provider} | ${email.mx_records.length > 0 ? email.mx_records.map(m => `${m.host} (prio ${m.priority})`).join(', ') : 'Sin registros MX'} |\n`;
  md += `| **Registro SPF** | ${email.spf.configured ? `✅ Configurado (\`${email.spf.strictness}\`)` : '❌ No configurado'} | \`${email.spf.raw || 'N/A'}\` |\n`;
  md += `| **Política DMARC** | ${email.dmarc.configured ? `✅ Configurado (\`p=${email.dmarc.policy}\`)` : '❌ No configurado'} | \`${email.dmarc.raw || 'N/A'}\` |\n\n`;

  // 5. Diagnóstico & Advertencias
  if (warnings && warnings.length > 0) {
    md += `## ⚠️ Diagnóstico & Recomendaciones Accionables\n\n`;
    for (const w of warnings) {
      const badge =
        w.severity === 'critical' ? '🔴 CRÍTICO' :
        w.severity === 'high' ? '🟠 ALTO' :
        w.severity === 'medium' ? '🟡 MEDIO' : 'ℹ️ INFO';
      md += `- **[${badge}]** ${w.message}\n`;
    }
    md += `\n`;
  }

  md += `---\n`;
  md += `*Generado automáticamente por [Domain Pulse](https://domainpulse.dev) - Chrome Extension Side Panel Audit*\n`;

  return md;
}
