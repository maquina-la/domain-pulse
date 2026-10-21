export async function checkHsts(domain: string, timeoutMs: number = 3500): Promise<boolean> {
  const url = `https://${domain}`;
  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);

    const res = await fetch(url, {
      method: 'HEAD',
      redirect: 'manual', // Check the apex domain response directly
      signal: controller.signal,
    });
    clearTimeout(timer);

    const hsts = res.headers.get('strict-transport-security');
    return !!hsts;
  } catch (err) {
    // If HEAD failed (some servers don't support HEAD), try a quick GET with small timeout
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 2000);
      const res = await fetch(url, {
        method: 'GET',
        redirect: 'follow',
        signal: controller.signal,
      });
      clearTimeout(timer);
      const hsts = res.headers.get('strict-transport-security');
      return !!hsts;
    } catch {
      return false;
    }
  }
}
