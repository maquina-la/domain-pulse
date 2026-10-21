const fs = require('fs');
const { execSync } = require('child_process');

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

function generateHtml(activeView) {
  return `<!DOCTYPE html>
<html lang="en" class="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1280, height=800">
  <title>Domain Pulse Screenshot</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      darkMode: 'class',
      theme: {
        extend: {
          colors: {
            background: '#0d0d11',
            card: '#16161c',
            border: '#272730',
            primary: '#06b6d4',
            emerald: '#10b981',
          }
        }
      }
    }
  </script>
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 1280px;
      height: 800px;
      overflow: hidden;
      font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "Inter", sans-serif;
      background: radial-gradient(circle at 50% 0%, #1e1e28 0%, #0c0c10 100%);
    }
    .macos-blur {
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
    }
    .neon-pulse {
      stroke: url(#pulseGrad);
    }
  </style>
</head>
<body class="text-zinc-100 flex flex-col justify-between p-6 box-border select-none">
  <!-- Top Feature Pill Banner -->
  <div class="flex items-center justify-between px-2">
    <div class="flex items-center gap-3">
      <div class="flex items-center justify-center w-8 h-8 rounded-lg bg-zinc-800/80 border border-zinc-700/60 shadow">
        <svg class="w-5 h-5" viewBox="0 0 512 512" fill="none">
          <defs>
            <linearGradient id="brand" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#06B6D4" />
              <stop offset="50%" stop-color="#10B981" />
              <stop offset="100%" stop-color="#06B6D4" />
            </linearGradient>
          </defs>
          <path d="M 78 208 A 184 184 0 0 1 434 208" stroke="url(#brand)" stroke-width="40" stroke-linecap="round" />
          <path d="M 434 304 A 184 184 0 0 1 78 304" stroke="url(#brand)" stroke-width="40" stroke-linecap="round" />
          <path d="M 44 256 H 168 L 208 308 L 256 108 L 304 404 L 344 204 L 372 256 H 468" stroke="url(#brand)" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" />
          <circle cx="256" cy="108" r="20" fill="#FFFFFF" />
        </svg>
      </div>
      <div>
        <h1 class="text-sm font-bold tracking-tight text-white flex items-center gap-2">
          Domain Pulse <span class="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 font-medium">Side Panel HUD</span>
        </h1>
        <p class="text-[11px] text-zinc-400">${activeView.subtitle}</p>
      </div>
    </div>
    <div class="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-zinc-800/70 border border-zinc-700 text-zinc-300">
      <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
      ${activeView.tag}
    </div>
  </div>

  <!-- Browser Window Frame Mockup -->
  <div class="w-full h-[690px] rounded-xl border border-zinc-800 bg-[#121217] shadow-2xl flex flex-col overflow-hidden">
    <!-- macOS Browser Window Titlebar -->
    <div class="h-10 bg-[#1a1a22] border-b border-zinc-800 flex items-center px-4 justify-between">
      <!-- Traffic lights -->
      <div class="flex items-center gap-2 w-20">
        <div class="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
        <div class="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
        <div class="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
      </div>

      <!-- Tab & URL Bar -->
      <div class="flex-1 max-w-xl mx-auto flex items-center justify-center">
        <div class="w-full h-7 bg-[#121217] rounded-md border border-zinc-700/60 flex items-center px-3 text-xs text-zinc-300 gap-2 shadow-inner">
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
          <span class="text-zinc-500 font-mono text-[11px]">https://</span><span class="font-medium text-white">github.com</span><span class="text-zinc-500 font-mono text-[11px]">/torvalds/linux</span>
        </div>
      </div>

      <!-- Window actions -->
      <div class="w-20 flex justify-end items-center gap-2 text-zinc-400">
        <!-- Side panel active icon -->
        <div class="p-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/40">
          <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7"></path></svg>
        </div>
      </div>
    </div>

    <!-- Browser Body: Webpage (Left) + Domain Pulse Side Panel (Right) -->
    <div class="flex-1 flex overflow-hidden">
      <!-- Left: Simulated Web Page Viewport -->
      <div class="flex-1 bg-[#09090d] p-6 border-r border-zinc-800/80 overflow-hidden flex flex-col justify-between">
        <div class="space-y-4 max-w-md opacity-80">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center text-white font-bold">
              <svg class="w-6 h-6 fill-current" viewBox="0 0 16 16"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg>
            </div>
            <div>
              <div class="text-sm font-bold text-white">torvalds / linux</div>
              <div class="text-xs text-zinc-400">Linux kernel source tree</div>
            </div>
          </div>
          <div class="h-3 w-4/5 bg-zinc-800 rounded"></div>
          <div class="h-3 w-3/5 bg-zinc-800/60 rounded"></div>
          <div class="grid grid-cols-3 gap-2 pt-2">
            <div class="h-16 rounded bg-zinc-800/40 border border-zinc-800 p-2 text-[10px] text-zinc-400">182k Commits</div>
            <div class="h-16 rounded bg-zinc-800/40 border border-zinc-800 p-2 text-[10px] text-zinc-400">190k Stars</div>
            <div class="h-16 rounded bg-zinc-800/40 border border-zinc-800 p-2 text-[10px] text-zinc-400">53k Forks</div>
          </div>
        </div>

        <div class="text-[11px] text-zinc-500 font-mono flex items-center gap-2">
          <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> Active browsing tab detected by Domain Pulse
        </div>
      </div>

      <!-- Right: Domain Pulse Chrome Side Panel (Width: 420px) -->
      <div class="w-[420px] bg-[#141419] flex flex-col border-l border-zinc-800 select-none overflow-hidden">
        <!-- Side Panel Header -->
        <div class="p-3 bg-[#181820] border-b border-zinc-800 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <img src="https://www.google.com/s2/favicons?domain=github.com&sz=32" class="w-4 h-4 rounded-sm" />
            <span class="font-bold text-xs text-white">github.com</span>
            <span class="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">ONLINE</span>
          </div>

          <!-- Segmented Navigation Dropdown -->
          <div class="flex items-center gap-1.5 bg-zinc-900 px-2 py-1 rounded-md border border-zinc-700/80 text-[11px] font-medium text-zinc-200">
            <span>${activeView.tabName}</span>
            <svg class="w-3 h-3 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>

        <!-- Side Panel Content View -->
        <div class="flex-1 p-3.5 space-y-3 overflow-y-auto">
          ${activeView.contentHtml}
        </div>

        <!-- Side Panel Footer -->
        <div class="p-2.5 bg-[#121217] border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400">
          <span class="flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Gateway: Volcano Cloud (US-East)
          </span>
          <span class="font-mono text-zinc-500">v1.0.0</span>
        </div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

const views = [
  {
    filename: 'screenshot-1-overview.png',
    tag: 'Overview & Health Meter',
    subtitle: 'Comprehensive 0–100 health score with real-time security grading and instant action items.',
    tabName: 'All Checks',
    contentHtml: `
      <!-- Health Score Card -->
      <div class="bg-[#1b1b24] p-3.5 rounded-xl border border-zinc-700/60 flex items-center justify-between shadow-sm">
        <div>
          <div class="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">Health Rating</div>
          <div class="text-3xl font-black text-emerald-400 flex items-baseline gap-1">
            94 <span class="text-xs font-normal text-zinc-400">/ 100</span>
          </div>
          <div class="text-[11px] text-zinc-300 font-medium pt-0.5">Grade A • Optimal Security</div>
        </div>
        <div class="relative w-16 h-16 flex items-center justify-center">
          <svg class="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
            <path stroke="#272730" stroke-width="3.5" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
            <path stroke="#10b981" stroke-dasharray="94, 100" stroke-width="3.5" stroke-linecap="round" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
          </svg>
          <span class="absolute text-xs font-bold text-white">94%</span>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="grid grid-cols-2 gap-2">
        <div class="bg-[#181820] p-2.5 rounded-lg border border-zinc-800">
          <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">DNSSEC</div>
          <div class="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            Validated (Active)
          </div>
          <div class="text-[9px] text-zinc-400 mt-0.5">ECDSA P-256 Curve</div>
        </div>
        <div class="bg-[#181820] p-2.5 rounded-lg border border-zinc-800">
          <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">SSL / TLS</div>
          <div class="text-xs font-bold text-cyan-400 flex items-center gap-1 mt-1">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path></svg>
            284 Days Left
          </div>
          <div class="text-[9px] text-zinc-400 mt-0.5">DigiCert Global Root G2</div>
        </div>
      </div>

      <!-- Warnings List -->
      <div class="bg-[#181820] p-3 rounded-lg border border-zinc-800 space-y-2">
        <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold flex items-center justify-between">
          <span>Security Recommendations</span>
          <span class="px-1.5 py-0.5 rounded text-[9px] bg-amber-500/20 text-amber-300 font-bold">2 Warnings</span>
        </div>
        <div class="p-2 rounded bg-amber-500/10 border border-amber-500/20 text-[11px] text-amber-200 flex items-start gap-2">
          <span class="text-amber-400 font-bold">⚠️</span>
          <div>
            <div class="font-semibold text-white">DMARC Subdomain Policy (sp=)</div>
            <div class="text-[10px] text-amber-200/80">Missing explicit sp= tag; defaults to apex policy.</div>
          </div>
        </div>
        <div class="p-2 rounded bg-blue-500/10 border border-blue-500/20 text-[11px] text-blue-200 flex items-start gap-2">
          <span class="text-blue-400 font-bold">ℹ️</span>
          <div>
            <div class="font-semibold text-white">HSTS Preload Submission</div>
            <div class="text-[10px] text-blue-200/80">Eligible for Chrome HSTS official preload list.</div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <button class="w-full py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 hover:opacity-95 text-zinc-950 font-bold text-xs rounded-lg flex items-center justify-center gap-2 shadow">
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path></svg>
        Copy Markdown Audit Report
      </button>
    `
  },
  {
    filename: 'screenshot-2-dns-headers.png',
    tag: 'DNS & Web Security Headers',
    subtitle: 'Cryptographic DNSSEC root-of-trust, CAA records, and strict HTTP response security headers.',
    tabName: 'DNS & Security',
    contentHtml: `
      <!-- DNSSEC Card -->
      <div class="bg-[#1b1b24] p-3 rounded-lg border border-zinc-700/60">
        <div class="flex items-center justify-between mb-1.5">
          <span class="text-[11px] font-bold text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span> DNSSEC Root-of-Trust
          </span>
          <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">SECURE</span>
        </div>
        <div class="text-[10px] text-zinc-300 space-y-1 font-mono">
          <div>Algorithm: 13 (ECDSA Curve P-256 with SHA-256)</div>
          <div>Key Tag: 2371 • Digest Type: SHA-256</div>
        </div>
      </div>

      <!-- DNS Records -->
      <div class="bg-[#181820] p-3 rounded-lg border border-zinc-800 space-y-2">
        <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Active DNS Records</div>
        <div class="space-y-1 font-mono text-[10px]">
          <div class="flex justify-between p-1 rounded bg-zinc-900/60"><span class="text-cyan-400 font-bold">A</span><span class="text-zinc-200">140.82.121.4</span></div>
          <div class="flex justify-between p-1 rounded bg-zinc-900/60"><span class="text-cyan-400 font-bold">AAAA</span><span class="text-zinc-200">2606:50c0:8000::153</span></div>
          <div class="flex justify-between p-1 rounded bg-zinc-900/60"><span class="text-cyan-400 font-bold">CAA</span><span class="text-zinc-200">issue "digicert.com"</span></div>
          <div class="flex justify-between p-1 rounded bg-zinc-900/60"><span class="text-cyan-400 font-bold">NS</span><span class="text-zinc-200">dns1.p08.nsone.net</span></div>
        </div>
      </div>

      <!-- Security Headers -->
      <div class="bg-[#181820] p-3 rounded-lg border border-zinc-800 space-y-2">
        <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Hardened HTTP Headers</div>
        <div class="grid grid-cols-2 gap-1.5 text-[10px]">
          <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
            <span>HSTS</span><span class="font-bold">31536000s</span>
          </div>
          <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
            <span>CSP</span><span class="font-bold">Enforced</span>
          </div>
          <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
            <span>X-Frame-Options</span><span class="font-bold">DENY</span>
          </div>
          <div class="p-1.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 flex items-center justify-between">
            <span>HTTP➔HTTPS</span><span class="font-bold">301 Redirect</span>
          </div>
        </div>
      </div>
    `
  },
  {
    filename: 'screenshot-3-email-auth.png',
    tag: 'Email Auth & Deliverability',
    subtitle: 'RFC SPF 10-lookup validation, DMARC policy enforcement, MTA-STS, and BIMI trust seals.',
    tabName: 'Email Security',
    contentHtml: `
      <!-- SPF Card -->
      <div class="bg-[#1b1b24] p-3 rounded-lg border border-zinc-700/60 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-400"></span> SPF Record
          </span>
          <span class="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">4 / 10 LOOKUPS</span>
        </div>
        <div class="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
          <div class="bg-emerald-400 h-full rounded-full" style="width: 40%"></div>
        </div>
        <div class="p-2 rounded bg-zinc-900/80 font-mono text-[9px] text-zinc-300 break-all border border-zinc-800">
          v=spf1 include:_spf.google.com include:mailgun.org ip4:192.30.252.0/22 ~all
        </div>
      </div>

      <!-- DMARC Card -->
      <div class="bg-[#181820] p-3 rounded-lg border border-zinc-800 space-y-1.5">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white">DMARC Enforcement</span>
          <span class="text-[9px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">p=reject</span>
        </div>
        <div class="grid grid-cols-2 gap-2 text-[10px] text-zinc-400 pt-1">
          <div>Subdomain Policy: <span class="text-white font-mono font-medium">p=reject</span></div>
          <div>Percentage: <span class="text-white font-mono font-medium">100%</span></div>
        </div>
      </div>

      <!-- MTA-STS & BIMI Cards -->
      <div class="grid grid-cols-2 gap-2">
        <div class="bg-[#181820] p-2.5 rounded-lg border border-zinc-800">
          <div class="text-[10px] text-zinc-400 uppercase font-semibold">MTA-STS</div>
          <div class="text-xs font-bold text-emerald-400 mt-1">mode: enforce</div>
          <div class="text-[9px] text-zinc-400 mt-0.5">TLS enforced for MX</div>
        </div>
        <div class="bg-[#181820] p-2.5 rounded-lg border border-zinc-800">
          <div class="text-[10px] text-zinc-400 uppercase font-semibold">BIMI</div>
          <div class="text-xs font-bold text-cyan-400 mt-1">Valid SVG Logo</div>
          <div class="text-[9px] text-zinc-400 mt-0.5">Verified sender mark</div>
        </div>
      </div>
    `
  },
  {
    filename: 'screenshot-4-subdomains-stack.png',
    tag: 'Subdomain Discovery & Tech Stack',
    subtitle: 'Real subdomain discovery via Certificate Transparency OSINT and automated web technology profiling.',
    tabName: 'Subdomains & Stack',
    contentHtml: `
      <!-- Real Subdomains -->
      <div class="bg-[#1b1b24] p-3 rounded-lg border border-zinc-700/60 space-y-2">
        <div class="flex items-center justify-between">
          <span class="text-xs font-bold text-white flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-cyan-400"></span> Discovered Subdomains
          </span>
          <span class="text-[9px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">14 Active Found</span>
        </div>
        <div class="space-y-1 font-mono text-[10px]">
          <div class="flex justify-between items-center p-1.5 rounded bg-zinc-900/70 border border-zinc-800">
            <span class="text-white font-medium">admin.github.com</span>
            <span class="text-[9px] px-1.5 rounded bg-amber-500/20 text-amber-300">401 Auth</span>
          </div>
          <div class="flex justify-between items-center p-1.5 rounded bg-zinc-900/70 border border-zinc-800">
            <span class="text-white font-medium">api.github.com</span>
            <span class="text-[9px] px-1.5 rounded bg-emerald-500/20 text-emerald-300">200 OK</span>
          </div>
          <div class="flex justify-between items-center p-1.5 rounded bg-zinc-900/70 border border-zinc-800">
            <span class="text-white font-medium">mail.github.com</span>
            <span class="text-[9px] px-1.5 rounded bg-blue-500/20 text-blue-300">MX Active</span>
          </div>
        </div>
      </div>

      <!-- Tech Stack Detection -->
      <div class="bg-[#181820] p-3 rounded-lg border border-zinc-800 space-y-2">
        <div class="text-[10px] text-zinc-400 uppercase tracking-wider font-semibold">Detected Tech Stack</div>
        <div class="flex flex-wrap gap-1.5 pt-0.5">
          <span class="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs font-medium text-white flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Ruby on Rails
          </span>
          <span class="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs font-medium text-white flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-cyan-400"></span> React 18
          </span>
          <span class="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs font-medium text-white flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Nginx / Unicorn
          </span>
          <span class="px-2 py-1 rounded bg-zinc-900 border border-zinc-700 text-xs font-medium text-white flex items-center gap-1.5">
            <span class="w-1.5 h-1.5 rounded-full bg-blue-400"></span> Fastly CDN
          </span>
        </div>
      </div>
    `
  }
];

views.forEach((v, idx) => {
  const htmlPath = `/tmp/screen-${idx}.html`;
  const outPath = `release/store-assets/${v.filename}`;
  fs.writeFileSync(htmlPath, generateHtml(v));
  console.log(`Generating screenshot ${idx + 1}/4: ${v.filename}...`);
  execSync(`"${CHROME_PATH}" --headless=new --screenshot="${outPath}" --window-size=1280,800 --default-background-color=00000000 "file://${htmlPath}"`);
});

console.log('All 4 Chrome Web Store screenshots generated successfully in release/store-assets/!');
