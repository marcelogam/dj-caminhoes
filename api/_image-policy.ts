/** Only this application's upload prefix may be removed. */
export function isManagedBlobUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password && !url.port
      && /^[a-z0-9-]+\.public\.blob\.vercel-storage\.com$/.test(url.hostname)
      && /^\/dj-caminhoes-estoque\/[^/]+\.(jpg|jpeg|png|webp|avif)$/i.test(url.pathname)
      && !url.search && !url.hash && !/%(2f|5c|2e)/i.test(url.pathname);
  } catch { return false; }
}

export function parseImageBody(body: unknown): { url: string } | null {
  try {
    const parsed: unknown = typeof body === 'string' || Buffer.isBuffer(body)
      ? JSON.parse(body.toString()) : body;
    if (!parsed || typeof parsed !== 'object' || !('url' in parsed) || typeof parsed.url !== 'string') return null;
    return { url: parsed.url };
  } catch { return null; }
}

export async function deleteManagedImage(url: unknown, dependencies: {
  isReferenced: (url: string) => Promise<boolean>;
  remove: (url: string) => Promise<unknown>;
}): Promise<{ status: number; body: { success?: boolean; error?: string } }> {
  if (!isManagedBlobUrl(url)) return { status: 400, body: { error: 'Informe uma imagem válida do estoque da DJ.' } };
  if (await dependencies.isReferenced(url)) return { status: 409, body: { error: 'A foto ainda está vinculada a um caminhão. Salve a remoção no cadastro antes de apagar o arquivo.' } };
  await dependencies.remove(url);
  return { status: 200, body: { success: true } };
}
