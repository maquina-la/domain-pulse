import { SecurityHeadersInfo, TechStackInfo } from '@domain-pulse/shared';

export interface HttpProbeResult {
  security_headers: SecurityHeadersInfo;
  tech_stack: TechStackInfo;
  hsts_enabled: boolean;
}

export async function probeHttpAndTech(domain: string, timeoutMs: number = 4000): Promise<HttpProbeResult> {
  const [redirectResult, httpsResult] = await Promise.allSettled([
    checkHttpRedirect(domain, timeoutMs),
    inspectHttpsAndHtml(domain, timeoutMs),
  ]);

  const redirectsToHttps = redirectResult.status === 'fulfilled' ? redirectResult.value : false;

  const httpsData =
    httpsResult.status === 'fulfilled'
      ? httpsResult.value
      : {
          headers: {} as Record<string, string>,
          html: '',
          hsts: false,
          csp: false,
          xFrame: false,
          xContentType: false,
          referrerPolicy: false,
          permissionsPolicy: false,
        };

  // Calculate percentage of security headers implemented
  const totalHeaders = 6;
  const countPresent = [
    httpsData.hsts,
    httpsData.csp,
    httpsData.xFrame,
    httpsData.xContentType,
    httpsData.referrerPolicy,
    httpsData.permissionsPolicy,
  ].filter(Boolean).length;

  const score_percentage = Math.round((countPresent / totalHeaders) * 100);

  const security_headers: SecurityHeadersInfo = {
    hsts: httpsData.hsts,
    csp: httpsData.csp,
    x_frame_options: httpsData.xFrame,
    x_content_type_options: httpsData.xContentType,
    referrer_policy: httpsData.referrerPolicy,
    permissions_policy: httpsData.permissionsPolicy,
    http_redirects_to_https: redirectsToHttps,
    score_percentage,
  };

  // Analyze tech stack
  const tech_stack = analyzeTechStack(httpsData.headers, httpsData.html);

  return {
    security_headers,
    tech_stack,
    hsts_enabled: httpsData.hsts,
  };
}

async function checkHttpRedirect(domain: string, timeoutMs: number): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(`http://${domain}`, {
      method: 'GET',
      redirect: 'manual',
      signal: controller.signal,
    });
    clearTimeout(timer);

    const loc = res.headers.get('location') || '';
    const status = res.status;

    return (status === 301 || status === 302 || status === 307 || status === 308) && loc.startsWith('https://');
  } catch {
    return false;
  }
}

async function inspectHttpsAndHtml(domain: string, timeoutMs: number) {
  const url = `https://${domain}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  const headersMap: Record<string, string> = {};
  let html = '';

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 DomainPulse/1.0',
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      },
      redirect: 'follow',
      signal: controller.signal,
    });
    clearTimeout(timer);

    res.headers.forEach((val, key) => {
      headersMap[key.toLowerCase()] = val;
    });

    // Read only first ~64KB of HTML for tech signature discovery
    const reader = res.body?.getReader();
    if (reader) {
      let bytesRead = 0;
      const chunks: Uint8Array[] = [];
      while (bytesRead < 65536) {
        const { done, value } = await reader.read();
        if (done || !value) break;
        chunks.push(value);
        bytesRead += value.length;
      }
      reader.cancel().catch(() => {});
      const totalBuffer = new Uint8Array(bytesRead);
      let offset = 0;
      for (const chunk of chunks) {
        totalBuffer.set(chunk, offset);
        offset += chunk.length;
      }
      html = new TextDecoder('utf-8', { fatal: false }).decode(totalBuffer);
    }
  } catch {
    // Graceful fallback if HTTPS body fetch failed
  }

  const hsts = !!headersMap['strict-transport-security'];
  const csp = !!headersMap['content-security-policy'];
  const xFrame = !!headersMap['x-frame-options'];
  const xContentType = headersMap['x-content-type-options'] === 'nosniff';
  const referrerPolicy = !!headersMap['referrer-policy'];
  const permissionsPolicy = !!headersMap['permissions-policy'] || !!headersMap['feature-policy'];

  return {
    headers: headersMap,
    html,
    hsts,
    csp,
    xFrame,
    xContentType,
    referrerPolicy,
    permissionsPolicy,
  };
}

function analyzeTechStack(headers: Record<string, string>, html: string): TechStackInfo {
  const detected = new Set<string>();
  let server: string | null = null;
  let framework: string | null = null;
  let cms: string | null = null;
  let ui: string | null = null;
  let cdn: string | null = null;
  const analytics: string[] = [];

  const serverHeader = headers['server'];
  if (serverHeader) {
    server = serverHeader;
    if (/cloudflare/i.test(serverHeader)) {
      cdn = 'Cloudflare';
      detected.add('Cloudflare');
    } else if (/nginx/i.test(serverHeader)) {
      detected.add('Nginx');
    } else if (/apache/i.test(serverHeader)) {
      detected.add('Apache');
    } else if (/caddy/i.test(serverHeader)) {
      detected.add('Caddy');
    } else if (/litespeed/i.test(serverHeader)) {
      detected.add('LiteSpeed');
    } else if (/microsoft-iis/i.test(serverHeader)) {
      detected.add('Microsoft IIS');
    }
  }

  // CDN detection via headers
  if (headers['x-vercel-id'] || headers['x-vercel-cache']) {
    cdn = 'Vercel';
    framework = framework || 'Next.js';
    detected.add('Vercel');
    detected.add('Next.js');
  }
  if (headers['x-amz-cf-id'] || headers['x-amz-cf-pop']) {
    cdn = 'AWS CloudFront';
    detected.add('AWS CloudFront');
  }
  if (headers['x-fastly-request-id'] || headers['fastly-debug-digest']) {
    cdn = 'Fastly';
    detected.add('Fastly');
  }
  if (headers['x-nf-request-id']) {
    cdn = 'Netlify';
    detected.add('Netlify');
  }

  // X-Powered-By
  const poweredBy = headers['x-powered-by'];
  if (poweredBy) {
    if (/next\.js/i.test(poweredBy)) {
      framework = 'Next.js';
      detected.add('Next.js');
    } else if (/express/i.test(poweredBy)) {
      framework = 'Express.js';
      detected.add('Express.js');
      detected.add('Node.js');
    } else if (/php/i.test(poweredBy)) {
      framework = 'PHP';
      detected.add('PHP');
    } else if (/asp\.net/i.test(poweredBy)) {
      framework = 'ASP.NET';
      detected.add('ASP.NET');
    }
  }

  // Cookies analysis
  const cookieHeader = headers['set-cookie'] || '';
  if (/phpsessid/i.test(cookieHeader)) {
    detected.add('PHP');
  }
  if (/laravel_session/i.test(cookieHeader)) {
    framework = 'Laravel';
    detected.add('Laravel');
    detected.add('PHP');
  }
  if (/csrftoken/i.test(cookieHeader)) {
    detected.add('Django / Python');
  }
  if (/connect\.sid/i.test(cookieHeader)) {
    detected.add('Node.js');
  }

  // HTML Analysis
  if (html) {
    // Meta generator tag
    const metaGenMatch = html.match(/<meta\s+name=["']generator["']\s+content=["']([^"']+)["']/i);
    if (metaGenMatch) {
      const gen = metaGenMatch[1];
      if (/wordpress/i.test(gen)) {
        cms = 'WordPress';
        detected.add('WordPress');
      } else if (/webflow/i.test(gen)) {
        cms = 'Webflow';
        detected.add('Webflow');
      } else if (/shopify/i.test(gen)) {
        cms = 'Shopify';
        detected.add('Shopify');
      } else if (/ghost/i.test(gen)) {
        cms = 'Ghost';
        detected.add('Ghost');
      } else if (/drupal/i.test(gen)) {
        cms = 'Drupal';
        detected.add('Drupal');
      } else if (/astro/i.test(gen)) {
        framework = 'Astro';
        detected.add('Astro');
      } else if (/docusaurus/i.test(gen)) {
        framework = 'Docusaurus';
        detected.add('Docusaurus');
      } else if (/hugo/i.test(gen)) {
        framework = 'Hugo';
        detected.add('Hugo');
      } else if (/gatsby/i.test(gen)) {
        framework = 'Gatsby';
        detected.add('Gatsby');
      }
    }

    // Next.js signatures
    if (html.includes('__NEXT_DATA__') || html.includes('/_next/')) {
      framework = 'Next.js';
      ui = ui || 'React';
      detected.add('Next.js');
      detected.add('React');
    }

    // Nuxt signatures
    if (html.includes('__NUXT__') || html.includes('/_nuxt/')) {
      framework = 'Nuxt.js';
      ui = ui || 'Vue.js';
      detected.add('Nuxt.js');
      detected.add('Vue.js');
    }

    // SvelteKit
    if (html.includes('__sveltekit') || html.includes('/_app/immutable/')) {
      framework = 'SvelteKit';
      ui = 'Svelte';
      detected.add('SvelteKit');
      detected.add('Svelte');
    }

    // React / Vue / Angular detection
    if (html.includes('react') && !detected.has('React')) {
      if (html.includes('data-reactroot') || html.includes('react-dom')) {
        ui = 'React';
        detected.add('React');
      }
    }

    if (html.includes('data-v-') && !detected.has('Vue.js')) {
      ui = 'Vue.js';
      detected.add('Vue.js');
    }

    // WordPress path markers
    if (html.includes('/wp-content/') || html.includes('/wp-includes/')) {
      cms = 'WordPress';
      detected.add('WordPress');
      detected.add('PHP');
    }

    // Shopify markers
    if (html.includes('cdn.shopify.com') || html.includes('window.Shopify')) {
      cms = 'Shopify';
      detected.add('Shopify');
    }

    // Webflow markers
    if (html.includes('data-wf-page') || html.includes('uploads-ssl.webflow.com')) {
      cms = 'Webflow';
      detected.add('Webflow');
    }

    // Tailwind CSS
    if (html.includes('tailwind') || /class="[^"]*(?:flex|grid|px-|py-|text-|bg-|rounded-)[^"]*"/i.test(html)) {
      detected.add('Tailwind CSS');
    }

    // Analytics & Tracking
    if (html.includes('googletagmanager.com') || html.includes('google-analytics.com')) {
      analytics.push('Google Analytics');
      detected.add('Google Analytics');
    }
    if (html.includes('posthog')) {
      analytics.push('PostHog');
      detected.add('PostHog');
    }
    if (html.includes('hotjar.com')) {
      analytics.push('Hotjar');
      detected.add('Hotjar');
    }
    if (html.includes('segment.com') || html.includes('analytics.js')) {
      analytics.push('Segment');
      detected.add('Segment');
    }
    if (html.includes('intercom.io')) {
      analytics.push('Intercom');
      detected.add('Intercom');
    }
    if (html.includes('cloudflareinsights.com') || html.includes('/cdn-cgi/rum')) {
      analytics.push('Cloudflare Analytics');
    }
  }

  // Provide fallback framework/ui if detected set has items
  if (!framework && detected.has('Next.js')) framework = 'Next.js';
  if (!framework && detected.has('Nuxt.js')) framework = 'Nuxt.js';
  if (!framework && detected.has('WordPress')) framework = 'WordPress (PHP)';
  if (!ui && detected.has('React')) ui = 'React';
  if (!ui && detected.has('Vue.js')) ui = 'Vue.js';
  if (!ui && detected.has('Tailwind CSS')) ui = ui ? `${ui} + Tailwind` : 'Tailwind CSS';

  return {
    server,
    framework,
    cms,
    ui,
    analytics,
    cdn,
    detected: Array.from(detected),
  };
}
