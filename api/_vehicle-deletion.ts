import type { PoolClient } from 'pg';
import { isManagedBlobUrl } from './_image-policy.js';

export async function deleteVehicleWithImages(
  id: number,
  dependencies: {
    connect: () => Promise<Pick<PoolClient, 'query' | 'release'>>;
    remove: (urls: string[]) => Promise<unknown>;
  },
): Promise<{ id: number; nome: string } | null> {
  const client = await dependencies.connect();
  try {
    await client.query('BEGIN');
    // Serialize image references while deciding which files are exclusively owned.
    await client.query('LOCK TABLE estoque_caminhoes IN SHARE ROW EXCLUSIVE MODE');
    const result = await client.query<{
      id: number; nome: string; image_banner: string | null; images: string[] | null;
    }>(
      'DELETE FROM estoque_caminhoes WHERE id = $1 RETURNING id, nome, image_banner, images',
      [id],
    );
    const vehicle = result.rows[0];
    if (!vehicle) {
      await client.query('ROLLBACK');
      return null;
    }

    const candidates = [...new Set([vehicle.image_banner, ...(vehicle.images ?? [])])]
      .filter(isManagedBlobUrl);
    const removable: string[] = [];
    for (const url of candidates) {
      const references = await client.query(
        'SELECT 1 FROM estoque_caminhoes WHERE image_banner = $1 OR $1 = ANY(images) LIMIT 1',
        [url],
      );
      if (references.rows.length === 0) removable.push(url);
    }
    if (removable.length > 0) await dependencies.remove(removable);
    await client.query('COMMIT');
    return { id: vehicle.id, nome: vehicle.nome };
  } catch (error) {
    // Keep the record and its URLs available for retry if Blob deletion fails.
    // Blob and PostgreSQL are not atomic: files already removed cannot be restored.
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
