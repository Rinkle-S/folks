// Integration check with a local fake database. No credentials or production writes.
import http from 'node:http';
import { spawn } from 'node:child_process';
import assert from 'node:assert/strict';
const secret = 'PRIVATE_SENTINEL_5551234567';
const events = [
  { id: 1, device: secret, type: 'lesson_request', meta: { q: secret, eid: 'request-01' } },
  { id: 2, device: secret, type: 'lesson_request', meta: { q: secret, eid: 'request-01' } },
  { id: 3, device: secret, type: 'feedback_detail', lesson: 'qr-pay', meta: { note: secret, reasons: ['words', secret] } },
  { id: 4, device: secret, type: 'voice_search', meta: { q: secret } },
  { id: 5, device: secret, type: 'voice_error', meta: { error: secret } },
  { id: 6, device: secret, type: 'feedback', lesson: '__proto__', meta: { v: 'hard' } },
];
const db = http.createServer((req, res) => {
  const offset = Number(new URL(req.url, 'http://localhost').searchParams.get('offset') || 0);
  res.setHeader('Content-Type', 'application/json');
  // Deliberately return fewer than 1,000 rows per page to exercise Supabase response caps.
  res.end(JSON.stringify(events.slice(offset, offset + 2)));
});
await new Promise((resolve) => db.listen(0, '127.0.0.1', resolve));
const server = spawn(process.execPath, ['node_modules/next/dist/bin/next', 'start', '-p', '3112'], {
  env: { ...process.env, SUPABASE_URL: `http://127.0.0.1:${db.address().port}`, SUPABASE_SERVICE_ROLE_KEY: 'fake-test-key' },
  stdio: ['ignore', 'pipe', 'pipe'], windowsHide: true,
});
let logs = ''; server.stdout.on('data', (s) => { logs += s; }); server.stderr.on('data', (s) => { logs += s; });
try {
  let response;
  for (let i = 0; i < 100; i++) {
    try { response = await fetch('http://127.0.0.1:3112/stats'); if (response.ok) break; } catch {}
    await new Promise((resolve) => setTimeout(resolve, 100));
  }
  assert.ok(response?.ok, logs);
  const html = await response.text();
  assert.ok(!html.includes(secret), 'Never leak arbitrary user input in HTML or RSC data');
  assert.match(html, /Other lesson requests[\s\S]*?<b>1<\/b>/, 'Include new requests and count duplicate queue IDs once');
  assert.match(html, /1<!-- --> voice errors/, 'Read all database pages');
  console.log('PASS: stats privacy, request totals, retry deduplication and capped database pagination.');
} finally { server.kill(); await new Promise((resolve) => db.close(resolve)); }
