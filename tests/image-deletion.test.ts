import { test } from 'node:test';
import assert from 'node:assert/strict';
import { deleteManagedImage, isManagedBlobUrl, parseImageBody } from '../api/_image-policy.ts';
import { prepareImageRemoval } from '../src/lib/image-removal.ts';

const url = 'https://teststore.public.blob.vercel-storage.com/dj-caminhoes-estoque/123-truck-AbC123.png';

test('removing a new upload waits for Blob deletion before changing the form', async () => {
  let deleted = false;
  const result = await prepareImageRemoval(url, [], async (actual) => { assert.equal(actual, url); deleted = true; });
  assert.equal(deleted, true);
  assert.equal(result, 'deleted');
});
test('removing a saved photo defers deletion so Cancel can preserve the advertisement', async () => {
  const result = await prepareImageRemoval(url, [url], async () => { throw new Error('Must not delete before saving'); });
  assert.equal(result, 'deferred');
});
test('failed deletion prevents successful form removal', async () => {
  await assert.rejects(prepareImageRemoval(url, [], async () => { throw new Error('Storage failed'); }), /Storage failed/);
});

test('accepts DJ Blob images and rejects unrelated or malformed URLs', () => {
  assert.equal(isManagedBlobUrl(url), true);
  for (const bad of [null, '', '/uploads/a.png', 'https://example.com/a.png', url.replace('dj-caminhoes-estoque', 'polaris'), url.replace('.com/', '.com.evil/'), url + '?download=1', url.replace('https:', 'http:'), url.replace('123-truck-AbC123', '%2e%2e%2fsecret')]) {
    assert.equal(isManagedBlobUrl(bad), false, String(bad));
  }
});
test('parses JSON, buffers and pre-parsed bodies; rejects bad JSON and non-string URLs', () => {
  for (const body of [{ url }, JSON.stringify({ url }), Buffer.from(JSON.stringify({ url }))]) assert.deepEqual(parseImageBody(body), { url });
  for (const body of ['{broken', null, {}, { url: ['a'] }]) assert.equal(parseImageBody(body), null);
});
test('deletes the exact unreferenced file, only after checking references', async () => {
  const calls: string[] = [];
  const result = await deleteManagedImage(url, {
    isReferenced: async (value) => { calls.push('check:' + value); return false; },
    remove: async (value) => { calls.push('delete:' + value); },
  });
  assert.deepEqual(calls, ['check:' + url, 'delete:' + url]);
  assert.deepEqual(result, { status: 200, body: { success: true } });
});
test('preserves images still used by a saved truck', async () => {
  let deleted = false;
  const result = await deleteManagedImage(url, { isReferenced: async () => true, remove: async () => { deleted = true; } });
  assert.equal(result.status, 409);
  assert.equal(deleted, false);
});
test('invalid input never reaches storage or the database', async () => {
  const unexpected = async () => { throw new Error('Unexpected call'); };
  const result = await deleteManagedImage('https://example.com/photo.jpg', { isReferenced: unexpected, remove: unexpected });
  assert.equal(result.status, 400);
});
test('storage and database failures propagate instead of reporting success', async () => {
  await assert.rejects(deleteManagedImage(url, { isReferenced: async () => false, remove: async () => { throw new Error('Blob unavailable'); } }), /Blob unavailable/);
  let deleted = false;
  await assert.rejects(deleteManagedImage(url, { isReferenced: async () => { throw new Error('DB unavailable'); }, remove: async () => { deleted = true; } }), /DB unavailable/);
  assert.equal(deleted, false);
});
