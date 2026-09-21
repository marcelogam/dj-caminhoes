/** Persisted photos must survive Cancel; new uploads can be removed immediately. */
export async function prepareImageRemoval(
  url: string,
  savedImages: readonly string[],
  remove: (url: string) => Promise<void>,
): Promise<'deferred' | 'deleted'> {
  if (savedImages.includes(url)) return 'deferred';
  await remove(url);
  return 'deleted';
}
