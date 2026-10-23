// Stores one usage event in Supabase. Keys stay on the server (Vercel env vars).
import { NextResponse } from 'next/server';

const ALLOWED = new Set([
  'lesson_start',
  'step_done',
  'wrong_tap',
  'hint',
  'lesson_complete',
  'real_try',
  'share',
  'feedback',
  'feedback_detail',
  'voice_search',
  'ask_child',
  'tile_soon',
  'link_created',
  'mic_error',
  'voice_error',
  'mode_pick',
  'read_all',
  'scam_answer',
  'scam_done',
  'apps_set',
  'custom_created',
  'custom_view',
  'recording_uploaded',
  'print',
  'cheated_call',
  'cheated_portal',
  'guide_open',
  'open_real_app',
  'profile_set',
  'lesson_request',
]);

const clip = (v, n) => (typeof v === 'string' ? v.slice(0, n) : null);

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'bad json' }, { status: 400 });
  }
  if (!body || !ALLOWED.has(body.type)) {
    return NextResponse.json({ ok: false, error: 'bad type' }, { status: 400 });
  }

  const meta = body.meta && typeof body.meta === 'object' ? { ...body.meta } : {};
  if (typeof body.at === 'string') meta.client_at = body.at.slice(0, 40); // when it really happened, if it was queued
  // Which version of the app wrote this event, so results stay readable after the content changes.
  if (process.env.VERCEL_GIT_COMMIT_SHA) meta.build = process.env.VERCEL_GIT_COMMIT_SHA.slice(0, 7);
  const metaStr = JSON.stringify(meta);
  const row = {
    device: clip(body.device, 64),
    type: body.type,
    lesson: clip(body.lesson, 40),
    step: Number.isInteger(body.step) ? body.step : null,
    from_name: clip(body.from, 40),
    meta: metaStr.length > 2000 ? {} : meta,
  };

  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    // Database not connected yet: accept the event so the app keeps working.
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const r = await fetch(`${url}/rest/v1/events`, {
      method: 'POST',
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal',
      },
      body: JSON.stringify(row),
    });
    if (!r.ok) {
      const text = await r.text();
      console.error('supabase insert failed', r.status, text);
      return NextResponse.json({ ok: false, stored: false }, { status: 502 });
    }
    return NextResponse.json({ ok: true, stored: true });
  } catch (e) {
    console.error('supabase error', e);
    return NextResponse.json({ ok: false, stored: false }, { status: 502 });
  }
}
