# 🚀 Chrome Web Store Publication Guide — Domain Pulse

This document contains all listing metadata, store descriptions, permissions disclosures, and assets ready for submission to the [Chrome Web Store Developer Console](https://chrome.google.com/webstore/devconsole).

---

## 📦 1. Package Upload

- **Zip File:** [`release/domain-pulse-v1.0.1.zip`](file:///Users/carlos/code/domain-pulse/release/domain-pulse-v1.0.1.zip)
- **Manifest:** Manifest V3 (`side_panel` native API)
- **Size:** ~2.0 MB (includes vector branding and optimized assets)

---

## 📝 2. Store Listing Metadata

### Extension Name
`Domain Pulse - Domain Health & Audit HUD`

### Short Summary (max 132 characters)
`Real-time domain health & infrastructure audit HUD in Chrome Side Panel: DNS, SSL/TLS, SPF/DMARC, real subdomains & tech stack.`

### Category
- **Primary Category:** Developer Tools
- **Secondary Category:** Productivity

---

### Detailed Description

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

## 📸 3. Official Store Screenshots (1280 x 800 px)

The following 4 screenshots have been generated at the exact **1280 x 800 px** resolution required by Google:

| # | View | File | Description |
|---|---|---|---|
| **1** | **Overview & Health Meter** | [`release/store-assets/screenshot-1-overview.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-1-overview.png) | 0–100 Health Gauge (94/100 Grade A), DNSSEC status, SSL countdown, and security warnings. |
| **2** | **DNS & Security Headers** | [`release/store-assets/screenshot-2-dns-headers.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-2-dns-headers.png) | DNSSEC ECDSA P-256 validation, A/AAAA/CAA/NS records, and HSTS/CSP security response headers. |
| **3** | **Email Deliverability** | [`release/store-assets/screenshot-3-email-auth.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-3-email-auth.png) | RFC SPF counter (4/10 lookups), strict DMARC enforcement (p=reject), MTA-STS, and BIMI trust seals. |
| **4** | **Subdomains & Tech Stack** | [`release/store-assets/screenshot-4-subdomains-stack.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/screenshot-4-subdomains-stack.png) | OSINT discovery of real subdomains (`admin`, `api`, `mail`) and detected technologies. |

---

## 🖼️ 4. Promotional Tiles

| Asset Type | Required Dimensions | Generated File |
|---|---|---|
| **Store Icon** | 128 x 128 px | [`release/store-assets/icon-128x128.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/icon-128x128.png) |
| **Small Promo Tile** | 440 x 280 px | [`release/store-assets/promo-small-440x280.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/promo-small-440x280.png) |
| **Marquee Banner** | 1400 x 560 px | [`release/store-assets/marquee-1400x560.png`](file:///Users/carlos/code/domain-pulse/release/store-assets/marquee-1400x560.png) |
| **Privacy Policy** | URL / Document | [`release/PRIVACY_POLICY.md`](file:///Users/carlos/code/domain-pulse/release/PRIVACY_POLICY.md) |

---

## 🔒 5. Privacy & Permissions Disclosure

In the **Privacy** tab of the Google Chrome Web Store Developer Console:

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
