// Gives the child's browser a one-time link to upload a screen recording straight to Supabase Storage
// (bucket "recordings", private). Files never pass through Vercel, so large videos are fine.
import { NextResponse } from 'next/server';
import { sb } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function POST(req) {
  const db = sb();
  if (!db) return NextResponse.json({ error: 'not connected' }, { status: 503 });
  let b;
  try {
    b = await req.json();
  } catch {
    return NextResponse.json({ error: 'bad json' }, { status: 400 });
  }
  if (typeof b.id !== 'string' || !/^[a-z0-9]{6,20}$/.test(b.id)) return NextResponse.json({ error: 'bad id' }, { status: 400 });
  const ext = (String(b.name || '').split('.').pop() || 'mp4').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 5) || 'mp4';
  const path = `${b.id}/${Date.now()}.${ext}`;
  const r = await fetch(`${db.url}/storage/v1/object/upload/sign/recordings/${path}`, {
    method: 'POST',
    headers: { ...db.headers, 'Content-Type': 'application/json' },
    body: '{}',
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok || !j.url) {
    console.error('sign upload failed', r.status, j);
    return NextResponse.json({ error: 'sign failed' }, { status: 502 });
  }
  return NextResponse.json({ uploadUrl: `${db.url}/storage/v1${j.url}`, path });
}
