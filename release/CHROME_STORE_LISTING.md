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
`Audit domain health, DNS routing, SSL security, and web infrastructure directly in Chrome's native Side Panel.`

### Category
- **Primary Category:** Developer Tools
- **Secondary Category:** Productivity

---

### Detailed Description

```markdown
⚡ Real-time web infrastructure and domain health diagnosis right in Google Chrome's native Side Panel.

Domain Pulse turns complex network and security diagnostics into an actionable, real-time dashboard. Audit any website you visit without leaving your active tab.

Designed for web developers, DevOps engineers, and security teams, Domain Pulse provides instant visibility into core domain configuration, security posture, and server technology.

Key Features:
- 🌐 DNS Health & Validation: Inspect core zone configuration, mail routing records, and cryptographic DNSSEC chain-of-trust validation.
- 🔒 SSL/TLS Certificate Analysis: View expiration countdowns, issuing certificate authorities, alternative names, protocol versions, and HSTS security enforcement.
- 🛡️ Email Authentication & Deliverability: Check SPF lookup limits, DMARC policy enforcement, strict transport security, and brand indicator records.
- 🔎 Subdomain Discovery: Passively discover active subdomains and public endpoints using Certificate Transparency logs and live DNS resolution.
- 💻 Technology Detection: Identify underlying content management systems, modern frameworks, web servers, and analytics tools.
- 📊 Health Score & Recommendations: Get an instant 0–100 domain health rating with prioritized security tips and actionable fixes.
- 📋 One-Click Markdown Export: Copy complete audit summaries formatted for GitHub issues, pull requests, Jira tickets, or client reports.
- 🌍 Multilingual Support: Automatically adapts to your browser locale, with support for English, Spanish, French, German, Portuguese, and Japanese.

Privacy First:
Domain Pulse does not track your browsing history, inject advertisements, collect cookies, or require an account. All audits are performed over secure HTTPS queries to public network registries.
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
| **Privacy Policy** | Public URL | `https://github.com/maquina-la/domain-pulse/blob/main/release/PRIVACY_POLICY.md` |

---

## 🔒 5. Privacy & Permissions Disclosure

In the **Privacy** tab of the Google Chrome Web Store Developer Console:

1. **`sidePanel`**:
   - *Justification:* Used to render the real-time audit HUD inside Chrome's native Side Panel adjacent to active browsing tabs without obstructing page content.
2. **`activeTab` & `tabs`**:
   - *Justification:* Required only to read the hostname of the currently active tab when the user initiates an audit, ensuring the HUD knows which domain to evaluate.
3. **`storage`**:
   - *Justification:* Used locally to remember user preferences, such as interface language and optional custom API gateway endpoints.
4. **`host_permissions` (`https://*.functions.volcano.run/*`)**:
   - *Justification:* Required solely to communicate with the Domain Pulse API Gateway hosted on Volcano Cloud to retrieve domain health, DNS, and security data. The extension never requests host access to audited websites or user page contents.
5. **Single Purpose Description**:
   - *"Domain Pulse provides real-time web infrastructure, DNS, and security health auditing for web domains via the Chrome Side Panel."*
