// Speech-to-text for the home-screen mic, using Sarvam (good with Hindi, Hinglish and Indian English).
// On whenever SARVAM_API_KEY is set (about ₹0.04 per 5-second search). To switch it off, set SARVAM_STT=off.
// The browser's own free speech recognition is used only when this is off.
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

function enabled() {
  return !!process.env.SARVAM_API_KEY && process.env.SARVAM_STT !== 'off';
}

export async function GET() {
  return NextResponse.json({ enabled: enabled() });
}

export async function POST(req) {
  if (!enabled()) return NextResponse.json({ error: 'disabled' }, { status: 501 });
  let form;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'bad form' }, { status: 400 });
  }
  const file = form.get('file');
  const lang = form.get('lang') === 'hi' ? 'hi-IN' : 'en-IN';
  if (!file || typeof file === 'string') return NextResponse.json({ error: 'no audio' }, { status: 400 });
  if (file.size > 2_000_000) return NextResponse.json({ error: 'too long' }, { status: 413 });

  // Strip codec details from the type (e.g. "audio/webm;codecs=opus" → "audio/webm").
  const type = (file.type || 'audio/webm').split(';')[0];
  const ext = type.includes('mp4') ? 'm4a' : type.includes('ogg') ? 'ogg' : type.includes('wav') ? 'wav' : 'webm';
  const audio = new Blob([await file.arrayBuffer()], { type });
  const out = new FormData();
  out.append('file', audio, `voice.${ext}`);
  out.append('language_code', lang);
  if (process.env.SARVAM_STT_MODEL) out.append('model', process.env.SARVAM_STT_MODEL);

  try {
    const r = await fetch('https://api.sarvam.ai/speech-to-text', {
      method: 'POST',
      headers: { 'api-subscription-key': process.env.SARVAM_API_KEY },
      body: out,
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok) {
      console.error('sarvam stt failed', r.status, j);
      return NextResponse.json({ error: 'stt failed', status: r.status, detail: (j && (j.error?.message || j.message)) || null }, { status: 502 });
    }
    return NextResponse.json({ transcript: j.transcript || '' });
  } catch (e) {
    console.error('sarvam stt error', e);
    return NextResponse.json({ error: 'stt error' }, { status: 502 });
  }
}
