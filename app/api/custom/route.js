// Family-made lessons: a parent asks, the child writes the key steps (or uploads a recording).
import { NextResponse } from 'next/server';
import { sb } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

const clip = (v, n) => (typeof v === 'string' ? v.trim().slice(0, n) : null);
const validId = (id) => typeof id === 'string' && /^[a-z0-9]{6,20}$/.test(id);

// GET /api/custom?ids=a,b  → those lessons (ids are random and unguessable)
export async function GET(req) {
  const db = sb();
  if (!db) return NextResponse.json({ error: 'not connected', lessons: [] }, { status: 503 });
  const ids = (new URL(req.url).searchParams.get('ids') || '').split(',').filter(validId).slice(0, 20);
  if (!ids.length) return NextResponse.json({ lessons: [] });
  const r = await fetch(`${db.url}/rest/v1/custom_lessons?id=in.(${ids.join(',')})&select=*`, { headers: db.headers, cache: 'no-store' });
  if (!r.ok) return NextResponse.json({ error: 'read failed', lessons: [] }, { status: 502 });
  const lessons = await r.json();
  // Private files get short-lived links so the parent's phone can play them.
  for (const l of lessons) {
    const media = Array.isArray(l.media) ? l.media : [];
    l.media = [];
    for (const m of media.slice(0, 10)) {
      try {
        const s = await fetch(`${db.url}/storage/v1/object/sign/recordings/${m.path}`, {
          method: 'POST',
          headers: { ...db.headers, 'Content-Type': 'application/json' },
          body: JSON.stringify({ expiresIn: 60 * 60 * 6 }),
        });
        const j = await s.json();
        if (s.ok && (j.signedURL || j.signedUrl)) l.media.push({ type: m.type, url: `${db.url}/storage/v1${j.signedURL || j.signedUrl}` });
      } catch {}
    }
  }
  return NextResponse.json({ lessons });
}

// POST /api/custom  → create the request (parent) or add steps / recording (child)
export async function POST(req) {
  const db = sb();
  if (!db) return NextResponse.json({ error: 'not connected' }, { status: 503 });
  let b;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 });
  }
  if (!validId(b.id)) return NextResponse.json({ error: 'bad id' }, { status: 400 });

  const row = { id: b.id };
  if (b.question) row.question = clip(b.question, 300);
  if (b.lang) row.lang = b.lang === 'hi' ? 'hi' : 'en';
  if (b.app) row.app = clip(b.app, 40);
  if (b.author) row.author = clip(b.author, 40);
  if (Array.isArray(b.media)) {
    row.media = b.media
      .filter((m) => m && typeof m.path === 'string' && m.path.startsWith(`${b.id}/`))
      .map((m) => ({ path: clip(m.path, 200), type: ['audio', 'video', 'image'].includes(m.type) ? m.type : 'video' }))
      .slice(0, 10);
  }
  if (Array.isArray(b.steps)) {
    const steps = b.steps.map((s) => clip(s, 300)).filter(Boolean).slice(0, 15);
    if (steps.length) row.steps = steps;
  }
  if (b.status && ['asked', 'ready'].includes(b.status)) row.status = b.status;

  const r = await fetch(`${db.url}/rest/v1/custom_lessons?on_conflict=id`, {
    method: 'POST',
    headers: { ...db.headers, 'Content-Type': 'application/json', Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(row),
  });
  if (!r.ok) {
    console.error('custom upsert failed', r.status, await r.text());
    return NextResponse.json({ error: 'save failed' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
