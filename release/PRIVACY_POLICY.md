# Privacy Policy for Domain Pulse

**Effective Date:** October 21, 2026  
**Extension Name:** Domain Pulse - Domain Health & Audit HUD  

## 1. Overview
Domain Pulse is a developer tool and productivity browser extension designed to audit domain health, DNS records, SSL/TLS certificates, security headers, and email authentication in real time directly from the Chrome Side Panel.

We believe strongly in user privacy. Domain Pulse is built with a **zero-data-collection** philosophy.

---

## 2. Information We Do NOT Collect
- **No Personal Information:** We do not collect names, email addresses, IP addresses, or device identifiers.
- **No Browsing History:** We do not track, log, or store your browsing history.
- **No Form Data or Keystrokes:** We never access passwords, cookies, credit cards, or input forms.
- **No Analytics or Trackers:** There are no third-party tracking scripts, analytics SDKs, or advertising beacons embedded in Domain Pulse.

---

## 3. How Permissions Are Used
Domain Pulse only requests permissions strictly required to perform its single purpose:

| Permission | Purpose |
|---|---|
| `sidePanel` | Allows the extension interface to open smoothly in the native Chrome Side Panel beside your active tab. |
| `activeTab` & `tabs` | Used solely to detect the apex hostname (e.g., `example.com`) of the webpage currently in focus, so the audit HUD can inspect that domain upon request. |
| `storage` | Saves user-specific interface preferences locally on your device (such as your chosen display language and optional custom API gateway endpoint). |
| `host_permissions` (`<all_urls>`) | Necessary to query public network endpoints (DNS over HTTPS, RDAP registries, and public TLS certificate transparency logs) for any domain you choose to audit. |

---

## 4. Network Communications & Data Flow
When you inspect a domain:
- The domain name (e.g., `example.com`) is sent to the Domain Pulse API Gateway to query public DNS, SSL, and RDAP records.
- All network communication is encrypted over HTTPS.
- Audit results may be cached ephemerally in memory (up to 2 hours) to prevent redundant network lookups, after which they expire automatically.
- No user identity is associated with any domain lookup.

---

## 5. Contact & Open Source
Domain Pulse is transparent and open source. If you have questions about this privacy policy, you can reach out via our GitHub repository or contact the developer directly.
