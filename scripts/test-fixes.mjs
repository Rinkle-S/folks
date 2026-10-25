import { load } from './test-loader.mjs';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import vm from 'node:vm';

const { matchLesson, matchGuide, suggest } = await load('lib/match.js');
const { LESSONS } = await load('lib/lessons.js');
const { GUIDES } = await load('lib/guides/index.js');
for (const q of ['send money via yono', 'send money whatsapp', 'send money phonepe']) {
  const app = q.includes('yono') ? 'yono' : q.includes('whatsapp') ? 'whatsapp' : 'phonepe';
  const m = matchLesson(q);
  assert.ok(!m || LESSONS[m.id].app === app, q);
  for (const s of suggest(q)) assert.equal((s.kind === 'lesson' ? LESSONS[s.id] : GUIDES[s.id]).app, app);
}
assert.equal(matchLesson('how do I pay by QR').id, 'qr-pay');
assert.equal(matchLesson('check balance yono').id, 'yono-balance');
assert.equal(matchLesson('book uber').id, 'uber-cab');
assert.ok(!matchLesson('send money via yono') || matchLesson('send money via yono').kind === 'weak');
assert.ok(!matchGuide('check balance yono') || GUIDES[matchGuide('check balance yono').id].app === 'yono');

// Exercise the actual event handler with a database mock: the same queued event must insert once.
const { POST } = await load('app/api/event/route.js');
process.env.SUPABASE_URL = 'https://database.invalid';
process.env.SUPABASE_SERVICE_ROLE_KEY = 'test-only';
const realFetch = globalThis.fetch;
const rows = new Map();
globalThis.fetch = async (url, options) => {
  if (!options.method) {
    const params = new URL(url).searchParams;
    const eid = params.get('meta->>eid').slice(3);
    const device = params.get('device').slice(3);
    const type = params.get('type').slice(3);
    return Response.json([...rows.values()].filter((r) => r.device === device && r.type === type && r.meta.eid === eid));
  }
  const row = JSON.parse(options.body);
  assert.equal(row.id, undefined, 'Never override the generated-always identity column');
  rows.set(rows.size + 1, row);
  return new Response(null, { status: 201 });
};
const send = (eid, device = 'device-a') => POST(new Request('http://localhost/api/event', {
  method: 'POST', body: JSON.stringify({ type: 'feedback', device, eid, meta: { v: 'easy' } }),
}));
assert.equal((await (await send('queued-event-01')).json()).stored, true);
await send('queued-event-01');
assert.equal(rows.size, 1);
await send('queued-event-02');
await send('queued-event-01', 'device-b');
assert.equal(rows.size, 3);
const { uniqueEvents } = await load('lib/events.js');
const duplicate = rows.values().next().value;
assert.equal(uniqueEvents([...rows.values(), duplicate]).length, 3);
globalThis.fetch = realFetch;

// A failed network call leaves requests queued; the next flush drains all events, including >20.
const source = readFileSync('lib/client.js', 'utf8');
const block = source.slice(source.indexOf("const OUTBOX ="), source.indexOf('import { stopSpeaking')).replaceAll('export ', '');
const storage = new Map(); let offline = true; let nextId = 0; const sent = [];
const context = {
  read: (k) => storage.get(k) || null,
  write: (k, v) => { storage.set(k, v); return true; },
  window: {}, deviceId: () => 'test', getFrom: () => '', newId: () => `event-${++nextId}`,
  fetch: async (_url, options) => {
    if (offline) throw Error('offline');
    sent.push(JSON.parse(options.body));
    return { ok: true, json: async () => ({ stored: true }) };
  }, Date, JSON, Set,
};
vm.createContext(context); vm.runInContext(block, context);
context.track('lesson_request', { meta: { q: 'A new lesson' } });
await new Promise((r) => setTimeout(r, 0));
assert.equal(JSON.parse(storage.get('folks_outbox')).length, 1);
for (let i = 0; i < 25; i++) context.track('feedback');
await new Promise((r) => setTimeout(r, 0));
offline = false; await context.flushOutbox();
assert.equal(sent.length, 26);
assert.equal(JSON.parse(storage.get('folks_outbox')).length, 0);
context.write = () => false;
context.track('lesson_request');
await new Promise((r) => setTimeout(r, 0));
assert.equal(sent.length, 27, 'Still send when browser storage is unavailable');
console.log('PASS: app-specific search, event idempotency, offline requests and complete queue draining.');
