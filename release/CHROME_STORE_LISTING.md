# 🚀 Chrome Web Store Publication Guide — Domain Pulse

Este documento contiene todos los metadatos, textos de ficha, justificación de permisos y activos listos para subir en la [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole).

---

## 📦 1. Archivo para Subir (*Package Upload*)

- **Archivo Zip:** [`release/domain-pulse-v1.0.0.zip`](file:///Users/carlos/code/domain-pulse/release/domain-pulse-v1.0.0.zip)
- **Manifest:** Manifest V3 (`side_panel` native API)
- **Tamaño:** ~2.0 MB (incluye iconos vectoriales y bundles optimizados)

---

## 📝 2. Ficha del Producto (*Store Listing Metadata*)

### Nombre de la Extensión
`Domain Pulse - Domain Health & Audit HUD`

### Resumen Breve (*Short Summary* — máx. 132 caracteres)
`Audita en tiempo real la salud de cualquier dominio: DNS, SSL/TLS, SPF/DMARC, subdominios reales y stack web desde el Side Panel.`

*(En inglés)*:
`Real-time domain health & infrastructure audit HUD in Chrome Side Panel: DNS, SSL/TLS, SPF/DMARC, real subdomains & tech stack.`

### Categoría
- **Categoría principal:** Developer Tools (*Herramientas para desarrolladores*)
- **Categoría secundaria:** Productivity (*Productividad*)

---

### Descripción Detallada (*Detailed Description*)

```markdown
⚡ Domain Pulse — Your Real-Time Web Infrastructure & Domain Health HUD

Audit any website's infrastructure, security health, and DNS configuration instantly with a single click in Google Chrome's native Side Panel.

Designed for web developers, DevOps engineers, site reliability teams, and cybersecurity enthusiasts, Domain Pulse transforms raw networking protocols into an elegant, real-time diagnostic dashboard.

Key Features:
- 🌐 Comprehensive DNS Audit: A, AAAA, MX, TXT, NS, CNAME, SOA, CAA, and DNSSEC validation with root-of-trust status.
- 🔒 SSL/TLS Deep Inspection: Certificate validity countdown, issuer authority, SAN multi-domain coverage, TLS 1.3 protocol verification, and HSTS enforcement.
- 🛡️ Email Authentication & Security: Full SPF lookup counter (detecting the 10-lookup RFC limit), DMARC policy enforcement (p=reject / quarantine / none), MTA-STS strict transport compliance, and BIMI visual email trust indicators.
- 🔎 Real Subdomain Discovery: Detects active subdomains via Certificate Transparency OSINT + TLS SANs + DoH live probing (including staging, api, admin, and mail).
- 💻 Tech Stack Detection: Identifies underlying CMS (WordPress, Shopify), web frameworks (Next.js, Nuxt), web servers (Cloudflare, Nginx), and analytics.
- 📊 Health Score & Actionable Warnings: Instant 0–100 health rating with prioritized security recommendations.
- 📋 One-Click Markdown Export: Export an audit report to your clipboard for GitHub issues, Jira tickets, or client reports.
- 🌍 Multilingual Experience: Auto-detects your browser locale with full native support for English, Spanish, Portuguese, French, German, and Japanese.

Privacy First:
Domain Pulse does not track you, does not inject ads, does not collect cookies or personal data, and requires no account. Audits query public DNS and certificate logs over secure HTTPS.
```

---

## 📸 3. Capturas de Pantalla Oficiales (*Store Screenshots - 1280 x 800 px*)

Los siguientes 4 screenshots han sido generados en resolución exacta **1280 x 800 px** exigida por Google:

| # | Vista | Archivo | Descripción |
|---|---|---|---|
| **1** | **Overview & Health Meter** | [`release/store-assets/screenshot-1-overview.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-1-overview.png) | Medidor de salud 0–100 (94/100 Grado A), resumen de DNSSEC, SSL y recomendaciones. |
| **2** | **DNS & Security Headers** | [`release/store-assets/screenshot-2-dns-headers.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-2-dns-headers.png) | Validación DNSSEC ECDSA P-256, registros A/AAAA/CAA/NS y cabeceras HSTS/CSP. |
| **3** | **Email Deliverability** | [`release/store-assets/screenshot-3-email-auth.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-3-email-auth.png) | Contador RFC SPF (4/10 lookups), política estricta DMARC (p=reject), MTA-STS y BIMI. |
| **4** | **Subdomains & Tech Stack** | [`release/store-assets/screenshot-4-subdomains-stack.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-4-subdomains-stack.png) | Descubrimiento OSINT de subdominios reales (`admin`, `api`, `mail`) y stack de tecnologías. |

---

## 🖼️ 4. Activos Promocionales (*Promotional Tiles*)

| Tipo de Activo | Dimensiones Requeridas | Archivo Generado |
|---|---|---|
| **Icono de la Tienda** | 128 x 128 px | [`release/store-assets/icon-128x128.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/icon-128x128.png) |
| **Mosaico Pequeño (*Small Promo Tile*)** | 440 x 280 px | [`release/store-assets/promo-small-440x280.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/promo-small-440x280.png) |
| **Pancarta Grande (*Marquee Banner*)** | 1400 x 560 px | [`release/store-assets/marquee-1400x560.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/marquee-1400x560.png) |
| **Política de Privacidad** | URL / Documento | [`release/PRIVACY_POLICY.md`](file:///Users/carlos/code/domain-pulse/release/PRIVACY_POLICY.md) |

---

## 🔒 5. Justificación de Permisos (*Privacy & Permissions Disclosure*)

En la pestaña **Privacy** de la consola de desarrolladores de Google:

1. **`sidePanel`**:
   - *Justification:* Used to render the real-time audit HUD inside Chrome's native Side Panel adjacent to active browsing tabs without obstructing page content.
2. **`activeTab` & `tabs`**:
   - *Justification:* Required only to read the hostname of the currently active tab when the user initiates an audit, ensuring the HUD knows which domain to evaluate.
3. **`storage`**:
   - *Justification:* Used locally to remember user preferences, such as interface language and optional custom API gateway endpoints.
4. **`host_permissions` (`<all_urls>`)**:
   - *Justification:* The extension audits any public website the user navigates to. To query public DNS over HTTPS, certificate transparency records, and HTTP security response headers across any apex domain, broad host permission is necessary.
5. **Single Purpose Description**:
   - *"Domain Pulse provides real-time web infrastructure, DNS, and security health auditing for web domains via the Chrome Side Panel."*
