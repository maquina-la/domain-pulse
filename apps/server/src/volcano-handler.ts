import { app } from './app.js';

export async function handler(event: any) {
  // CORS Preflight
  if (event.method === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Max-Age': '86400',
      },
      body: '',
    };
  }

  // Construct URL
  const scheme = event.request_context?.scheme || 'https';
  const host = event.headers?.['host']?.[0] || event.request_context?.host || 'localhost';
  const path = event.path || '/';
  const qs = event.raw_query_string ? `?${event.raw_query_string}` : '';
  const url = `${scheme}://${host}${path}${qs}`;

  const headers = new Headers();
  if (event.headers) {
    for (const [key, val] of Object.entries(event.headers)) {
      if (Array.isArray(val)) {
        for (const v of val) headers.append(key, String(v));
      } else if (val) {
        headers.append(key, String(val));
      }
    }
  }

  const reqInit: RequestInit = {
    method: event.method || 'GET',
    headers,
  };

  if (event.body && event.method !== 'GET' && event.method !== 'HEAD') {
    reqInit.body = event.is_base64_encoded
      ? Buffer.from(event.body, 'base64')
      : event.body;
  }

  try {
    const req = new Request(url, reqInit);
    const res = await app.fetch(req);
    const body = await res.text();

    const outHeaders: Record<string, string> = {};
    res.headers.forEach((v, k) => {
      outHeaders[k] = v;
    });

    outHeaders['access-control-allow-origin'] = '*';
    outHeaders['access-control-allow-methods'] = 'GET, POST, OPTIONS';
    outHeaders['access-control-allow-headers'] = '*';

    return {
      statusCode: res.status,
      headers: outHeaders,
      body,
    };
  } catch (err: any) {
    console.error('Volcano handler error:', err);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Internal Server Error',
        message: err?.message || String(err),
      }),
    };
  }
}
