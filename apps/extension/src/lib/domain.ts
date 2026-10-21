import { parse } from 'tldts';

export interface ExtractedDomain {
  rawHostname: string;
  apexDomain: string;
  isSpecialPage: boolean;
  isValid: boolean;
}

export function extractApexDomain(urlOrHostname: string): ExtractedDomain {
  if (!urlOrHostname) {
    return {
      rawHostname: '',
      apexDomain: '',
      isSpecialPage: false,
      isValid: false,
    };
  }

  // Check special browser internal schemes
  if (
    urlOrHostname.startsWith('chrome://') ||
    urlOrHostname.startsWith('chrome-extension://') ||
    urlOrHostname.startsWith('edge://') ||
    urlOrHostname.startsWith('about:') ||
    urlOrHostname.startsWith('file://')
  ) {
    return {
      rawHostname: urlOrHostname,
      apexDomain: '',
      isSpecialPage: true,
      isValid: false,
    };
  }

  let cleaned = urlOrHostname.trim().toLowerCase();
  cleaned = cleaned.replace(/^[a-z]+:\/\//, ''); // strip protocol
  cleaned = cleaned.replace(/\/.*$/, ''); // strip path & query
  cleaned = cleaned.replace(/:[0-9]+$/, ''); // strip port

  const parsed = parse(cleaned);
  const apexDomain = parsed.domain || cleaned;

  const isValid = !!apexDomain && apexDomain.includes('.') && !apexDomain.endsWith('.');

  return {
    rawHostname: parsed.hostname || cleaned,
    apexDomain,
    isSpecialPage: false,
    isValid,
  };
}

export async function getActiveTabDomain(): Promise<ExtractedDomain> {
  // Check if chrome.tabs is available (extension runtime)
  if (typeof chrome !== 'undefined' && chrome.tabs && chrome.tabs.query) {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (tab && tab.url) {
        return extractApexDomain(tab.url);
      }
    } catch (err) {
      console.warn('Failed to query chrome.tabs:', err);
    }
  }

  // Fallback for browser preview / testing outside extension
  if (typeof window !== 'undefined' && window.location) {
    const host = window.location.hostname;
    if (host && host !== 'localhost' && host !== '127.0.0.1') {
      return extractApexDomain(host);
    }
  }

  // Default demo domain
  return extractApexDomain('github.com');
}
