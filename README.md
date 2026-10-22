# ⚡ Domain Pulse

> **Real-time Domain Health, Infrastructure & Security Audit HUD for Google Chrome & Apple Safari.**

[![GitHub License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Manifest V3](https://img.shields.io/badge/Chrome%20Extension-Manifest%20V3-4285F4?logo=googlechrome&logoColor=white)](https://developer.chrome.com/docs/extensions/mv3/intro/)
[![Safari Web Extension](https://img.shields.io/badge/Safari-Web%20Extension-000000?logo=safari&logoColor=white)](https://developer.apple.com/documentation/safariservices/safari_web_extensions)
[![Volcano Cloud](https://img.shields.io/badge/Deployed%20on-Volcano%20Cloud-FF4500)](https://volcano.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-v4-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

---

<p align="center">
  <img src="docs/assets/SaaCR-20261021-oquv.png" alt="Domain Pulse HUD in Chrome Side Panel" width="100%" />
</p>

---

## 🚀 Overview

**Domain Pulse** replaces the fragmented workflow of juggling half a dozen bookmarklets and diagnostics tools (WHOIS lookup, DNS checkers, SSL Labs, MXToolbox, security headers analyzers). It centralizes an end-to-end infrastructure and domain health diagnosis right inside your browser's native **Side Panel** in real time:

- 🌐 **Comprehensive DNS & DNSSEC:** Inspects `A` (IPv4), `AAAA` (IPv6), `MX`, `TXT`, `NS`, `CNAME`, `SOA`, and `CAA` records, complete with cryptographic **DNSSEC** chain-of-trust verification.
- 🔒 **SSL/TLS Deep Inspection:** Real-time certificate validity countdown, issuing Certificate Authority (CA), Subject Alternative Names (SANs), TLS 1.3 protocol verification, and HTTP Strict-Transport-Security (**HSTS**).
- 🛡️ **Email Security & Deliverability:** 
  - **RFC SPF Lookup Counter:** Verifies SPF records and counts DNS lookups against the strict RFC 10-lookup limit.
  - **DMARC Enforcement:** Detects strict policies (`p=reject`, `p=quarantine`, `p=none`), subdomain inheritance, and reporting endpoints.
  - **MTA-STS & BIMI:** Verifies mail server transport encryption policies and visual brand trust seals.
- 🔎 **Real Subdomain Discovery (Passive DNS OSINT):** Discovers live subdomains (`admin`, `api`, `mail`, `staging`, etc.) using Certificate Transparency logs, TLS SAN extraction, and DoH probe verification.
- 💻 **Automated Tech Stack Profiling:** Identifies CMS platforms (WordPress, Shopify), modern frameworks (Next.js, React, Rails, Nuxt), web servers (Cloudflare, Nginx, Vercel), and analytics tags.
- 📊 **Domain Health Score (0–100):** Weighted algorithmic rating accompanied by prioritized, actionable security warnings.
- 📋 **One-Click Markdown Export:** Copies a clean, structured diagnostic report directly to your clipboard for GitHub issues, Slack messages, or client deliverables.
- 🌍 **Native Multilingual (i18n):** Auto-detects your browser locale with full native translations in **English**, **Spanish**, **Portuguese**, **French**, **German**, and **Japanese** (with automatic English fallback).

---

## 🏗️ Monorepo Architecture

Domain Pulse is structured as a clean, performant TypeScript monorepo powered by `pnpm`:

```
domain-pulse/
├── packages/
│   └── shared/               # TypeScript schemas, Health Score algorithm, and Markdown exporter
│       ├── src/types.ts      # Unified AuditResponse & telemetry data models
│       ├── src/score.ts      # Weighted health score engine with penalty logic
│       ├── src/markdown.ts   # Structured audit report generator
│       └── dist/
├── apps/
│   ├── server/               # API Gateway & High-Performance Orchestrator (Node.js + Hono)
│   │   ├── src/services/doh.ts        # Parallel Cloudflare DoH fan-out (A, AAAA, MX, TXT, CAA, DS)
│   │   ├── src/services/subdomains.ts # Passive DNS OSINT + TLS SANs + DoH discovery
│   │   ├── src/services/rdap.ts       # Official ICANN RDAP registration resolver
│   │   ├── src/services/tls.ts        # Port 443 TLS handshake & certificate transparency
│   │   ├── src/services/http-probe.ts # Web security headers & tech stack signatures
│   │   ├── src/services/cache.ts      # Ephemeral 2-hour LRU cache (FR-08)
│   │   ├── src/services/rate-limit.ts # Sliding-window rate limiting (30 req/min)
│   │   └── src/index.ts               # Standalone Hono server entrypoint
│   │
│   ├── extension/            # Chrome Extension MV3 (React 19 + Tailwind v4 + Lucide Icons)
│   │   ├── public/
│   │   │   ├── manifest.json # Chrome Manifest V3 with sidePanel & background service worker
│   │   │   ├── branding/     # Freestanding vector logos and high-res assets
│   │   │   └── icons/        # Transparent PNG icon suite (16x16 through 512x512)
│   │   ├── src/
│   │   │   ├── background.ts # Tab change listener & side panel launcher
│   │   │   ├── lib/api.ts    # Dual-mode client (Volcano Cloud production + local dev fallback)
│   │   │   ├── lib/i18n.ts   # 6-language localization engine
│   │   │   ├── components/   # macOS-inspired HUD cards (ScoreGauge, DNS, Email, Headers)
│   │   │   └── App.tsx       # Main side panel dashboard view
│   │   └── sidepanel.html    # Native Chrome Side Panel entrypoint
│   │
│   └── safari/               # Native macOS Safari Web Extension companion app
│       └── DomainPulse/      # Xcode project & Swift host app generated with Apple CLI
│
├── release/                  # Production artifacts for store distribution
│   ├── domain-pulse-v1.0.0.zip # Chrome Web Store upload archive
│   ├── CHROME_STORE_LISTING.md # Store listing copy, keywords, and permissions disclosure
│   ├── PRIVACY_POLICY.md       # Zero-data-collection privacy policy
│   └── store-assets/           # Promo tiles (440x280, 1400x560) and 1280x800 screenshots
│
└── volcano/                  # Volcano Cloud serverless deployment configuration
    ├── functions/api/        # Production Node.js 24 serverless HTTP function
    └── volcano-config.yaml   # Declarative deployment manifest
```

---

## ⚡ Quickstart & Local Development

### Prerequisites
- **Node.js** >= 20 (tested on Node.js v24)
- **pnpm** >= 9 (`corepack enable pnpm`)
- **Google Chrome** (v114+ for Side Panel API) or **Safari** (macOS Sonoma / Sequoia)

### 1. Installation & Build

```bash
# Clone the repository
git clone https://github.com/maquina-la/domain-pulse.git
cd domain-pulse

# Install dependencies across all workspaces
pnpm install

# Build all packages (@domain-pulse/shared, server, extension)
pnpm build
```

---

### 2. Running the Local API Gateway

The API gateway handles parallel DNS-over-HTTPS lookups, TLS inspections, RDAP queries, and security header evaluations:

```bash
pnpm dev:server
```

The gateway will start on **`http://localhost:3000`**.

Verify health:
```bash
curl http://localhost:3000/health
# {"status":"ok","service":"domain-pulse-gateway",...}

# Audit a domain:
curl "http://localhost:3000/v1/audit?domain=github.com"
```

---

### 3. Loading in Google Chrome (Side Panel)

1. Build the extension:
   ```bash
   pnpm build:extension
   ```
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** using the toggle in the top-right corner.
4. Click **Load unpacked**.
5. Select the `apps/extension/dist` directory:
   ```
   /path/to/domain-pulse/apps/extension/dist
   ```
6. Click the **Domain Pulse** icon in your Chrome toolbar. The HUD opens immediately in Chrome's native Side Panel and audits your active tab.

---

### 4. Running in Apple Safari (macOS)

Domain Pulse includes a native macOS Safari Extension wrapper:

1. Build and sign the Safari extension app:
   ```bash
   pnpm build:safari
   ```
2. Open the companion app:
   ```bash
   pnpm open:safari
   ```
3. In **Safari**:
   - Go to **Safari > Settings > Advanced** and check **"Show features for web developers"**.
   - In Safari's top menu bar, click **Develop > Allow Unsigned Extensions**.
   - In **Safari > Settings > Extensions**, enable **DomainPulse Extension**.
4. The Domain Pulse icon will appear in Safari's toolbar. Click it to open the diagnostic HUD popover.

---

## 🎯 Domain Health Scoring Engine

The domain health index is calculated on a weighted scale from **0 to 100** based on industry RFC standards and security hygiene:

| Check | Deduction | Description |
|---|---|---|
| **Invalid or Missing SSL/TLS** | `-40 pts` | Site does not serve valid HTTPS or certificate is untrusted |
| **Domain Expiration < 30 Days** | `-20 pts` | Imminent domain lapse risk |
| **SSL Expiration < 14 Days** | `-15 pts` | Certificate expiration warning |
| **Missing DMARC Policy** | `-15 pts` | Domain is vulnerable to email spoofing and phishing |
| **Missing or Invalid SPF** | `-10 pts` | Incomplete sender verification |
| **DMARC in Monitor Mode (`p=none`)** | `-5 pts` | Policy does not block spoofed emails |
| **No IPv6 Support (No AAAA Records)** | `-5 pts` | Incomplete modern networking coverage |
| **Missing HSTS Header** | `-5 pts` | HTTP Strict Transport Security not enforced |
| **Missing CAA Records** | `-5 pts` | Certificate Authority Authorization not restricted |
| **SPF Exceeds 10 Lookups** | `-5 pts` | Violates RFC 7208 lookup limit (causes SPF PermError) |

---

## 🌋 Cloud Deployment (Volcano)

The backend API gateway is deployed to [Volcano Cloud](https://volcano.dev) as a globally distributed Node.js 24 HTTP function:

- **Production Endpoint:** `https://7cf17484-33bf-4348-9159-048674bdc509.functions.volcano.run/`
- **Zero Configuration for End Users:** The production Chrome Web Store build connects directly to Domain Pulse Cloud with zero setup.
- **Resilient Fallback:** When testing unpacked builds, the client automatically falls back to `http://localhost:3000` if local development servers are running.

---

## 🔒 Privacy & Security

Domain Pulse is built with a strict **zero-data-collection** philosophy:
- **No Personal Data:** No emails, usernames, IP tracking, or accounts required.
- **No Browsing History:** We only inspect the active tab's domain name when an audit is performed.
- **Read-Only OSINT:** Audits query public DNS over HTTPS, certificate transparency registries, and public HTTP response headers.
- **No Third-Party Trackers:** Zero analytics beacons, telemetry, or embedded advertising.

See the complete [Privacy Policy](release/PRIVACY_POLICY.md).

---

## 📄 License

Domain Pulse is licensed under the [MIT License](LICENSE).
Built with ❤️ by [Máquina](https://github.com/maquina-la).
