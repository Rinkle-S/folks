// "Ask anything": when no lesson we wrote matches, build a short step-by-step guide for the real app.
// Order: 1) saved answer (free)  2) Claude + web search (needs ANTHROPIC_API_KEY)  3) tell the app to fall back to "ask someone".
// Safety: the key stays on the server, there are per-device and per-day limits, and the guide is always shown as AI-made.
import { NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { sb } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const maxDuration = 60;

const MODEL = () => process.env.ANTHROPIC_MODEL || 'claude-sonnet-5-5';
const DAILY_CAP = () => Number(process.env.AI_DAILY_CAP || 150);
const DEVICE_CAP = () => Number(process.env.AI_DEVICE_CAP || 6);
const LANG_NAME = { en: 'English', hi: 'Hindi (Devanagari script)', ml: 'Malayalam' };

// Soft per-device limit kept in memory (resets when the server restarts). The daily total is counted in Supabase.
const seen = globalThis.__askSeen || (globalThis.__askSeen = new Map());
const today = () => new Date().toISOString().slice(0, 10);

const norm = (q) => q.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, ' ').replace(/\s+/g, ' ').trim();
const keyOf = (q, lang, phone) => createHash('sha1').update(`${lang}|${phone || ''}|${norm(q)}`).digest('hex').slice(0, 20);

async function readCache(db, id) {
  if (!db) return null;
  try {
    const r = await fetch(`${db.url}/rest/v1/ai_tutorials?id=eq.${id}&select=*`, { headers: db.headers, cache: 'no-store' });
    if (!r.ok) return null;
    const rows = await r.json();
    return rows[0] || null;
  } catch {
    return null;
  }
}
async function todaysCount(db) {
  if (!db) return 0;
  try {
    const r = await fetch(`${db.url}/rest/v1/ai_tutorials?created_at=gte.${today()}T00:00:00Z&select=id`, { headers: { ...db.headers, Prefer: 'count=exact', Range: '0-0' }, cache: 'no-store' });
    const range = r.headers.get('content-range') || '';
    return Number(range.split('/')[1]) || 0;
  } catch {
    return 0;
  }
}
async function saveCache(db, row) {
  if (!db) return;
  try {
    await fetch(`${db.url}/rest/v1/ai_tutorials?on_conflict=id`, {
      method: 'POST',
      headers: { ...db.headers, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(row),
    });
  } catch {}
}

function systemPrompt(lang, phone) {
  return `You write short how-to guides for older Indian parents (age 55+) who are not comfortable with phones.
The parent asked how to do something in a real phone app. Search the web for how it is done in the CURRENT version of that app, then write the guide.

Rules:
- Write in ${LANG_NAME[lang] || 'English'}. Very simple, warm, short sentences. No jargon. Keep button names exactly as shown in the app (in English letters if the app shows English), put them in quotes.
- 4 to 8 steps. One action per step. Say where on the screen to look ("at the bottom", "top right").
- Never ask the parent to share a PIN, OTP, password or card number with anyone. For any step where a PIN is typed, say "type your PIN yourself, never tell it to anyone".
- If the task moves money, add a final note: do a small test amount first and ask a family member the first time.
- If you are not sure about a step because apps change, say so in "caution". Do not invent buttons.
- If it is a phone setting, the phone brand/model is: ${phone || 'unknown'}. Mention that menu names can differ slightly if unsure.
- If the request is not a phone/app how-to, or is unsafe (hacking, spying on someone, bypassing security), return {"refuse": true}.

Reply with ONLY this JSON, nothing else:
{"title": "short title in the parent's language", "app": "app name or 'Phone'", "steps": [{"say": "the instruction", "look": "what the screen looks like or where to look (optional, short)"}], "caution": "one short line or empty"}`;
}

async function askClaude(q, lang, phone) {
  const key = process.env.ANTHROPIC_API_KEY;
  let messages = [{ role: 'user', content: `The parent asked: "${q}"` }];
  for (let turn = 0; turn < 3; turn++) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: { 'x-api-key': key, 'anthropic-version': '2023-06-01', 'content-type': 'application/json' },
      body: JSON.stringify({
        model: MODEL(),
        max_tokens: 1800,
        system: systemPrompt(lang, phone),
        tools: [{ type: 'web_search_20250305', name: 'web_search', max_uses: 3 }],
        messages,
      }),
    });
    if (!r.ok) throw new Error(`anthropic ${r.status} ${(await r.text()).slice(0, 200)}`);
    const j = await r.json();
    if (j.stop_reason === 'pause_turn') {
      messages = [...messages, { role: 'assistant', content: j.content }];
      continue;
    }
    const text = (j.content || []).filter((b) => b.type === 'text').map((b) => b.text).join('\n');
    const m = text.match(/\{[\s\S]*\}\s*$/) || text.match(/\{[\s\S]*\}/);
    if (!m) throw new Error('no json');
    return JSON.parse(m[0]);
  }
  throw new Error('too many turns');
}

function clean(g) {
  if (!g || g.refuse) return null;
  const steps = (Array.isArray(g.steps) ? g.steps : [])
    .map((s) => ({ say: String(s.say || '').trim().slice(0, 300), look: String(s.look || '').trim().slice(0, 200) }))
    .filter((s) => s.say)
    .slice(0, 10);
  if (steps.length < 2) return null;
  return { title: String(g.title || '').trim().slice(0, 120), app: String(g.app || '').trim().slice(0, 40), steps, caution: String(g.caution || '').trim().slice(0, 240) };
}

export async function POST(req) {
  let b;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ status: 'error' }, { status: 400 });
  }
  const q = typeof b.q === 'string' ? b.q.trim().slice(0, 200) : '';
  const lang = ['hi', 'ml'].includes(b.lang) ? b.lang : 'en';
  const phone = typeof b.phone === 'string' ? b.phone.slice(0, 40) : '';
  const device = typeof b.device === 'string' ? b.device.slice(0, 60) : 'anon';
  if (q.length < 3) return NextResponse.json({ status: 'error' }, { status: 400 });

  const db = sb();
  const id = keyOf(q, lang, phone);

  // 1) already made before: free
  const cached = await readCache(db, id);
  if (cached && cached.steps) {
    return NextResponse.json({ status: 'ok', cached: true, guide: { title: cached.title, app: cached.app, steps: cached.steps, caution: cached.caution || '' } });
  }

  // 2) AI, only if switched on and within limits
  if (!process.env.ANTHROPIC_API_KEY) return NextResponse.json({ status: 'unavailable' });
  const dk = `${device}|${today()}`;
  const n = seen.get(dk) || 0;
  if (n >= DEVICE_CAP()) return NextResponse.json({ status: 'limit' });
  if ((await todaysCount(db)) >= DAILY_CAP()) return NextResponse.json({ status: 'limit' });
  seen.set(dk, n + 1);

  try {
    const guide = clean(await askClaude(q, lang, phone));
    if (!guide) return NextResponse.json({ status: 'refused' });
    await saveCache(db, { id, question: q, lang, phone: phone || null, title: guide.title, app: guide.app, steps: guide.steps, caution: guide.caution });
    return NextResponse.json({ status: 'ok', cached: false, guide });
  } catch (e) {
    console.error('ask failed', e && e.message);
    return NextResponse.json({ status: 'error' }, { status: 502 });
  }
}
