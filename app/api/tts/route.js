// Natural Indian voice for lessons, using Sarvam Bulbul. Each sentence is generated once, then reused:
// saved in Supabase Storage (bucket "tts") when connected, and cached by Vercel's CDN.
// Only sentences that exist in the app can be voiced. Turn off with SARVAM_TTS=off.
import { NextResponse } from 'next/server';
import { speechTexts } from '@/lib/speechText';
import { sb } from '@/lib/supabase';
import { isLang, langCode } from '@/lib/langs';
import { prepareSpeech } from '@/lib/speechPrep';

export const dynamic = 'force-dynamic';

const MODEL = () => process.env.SARVAM_TTS_MODEL || 'bulbul:v3';
const SPEAKER = (lang) =>
  lang === 'hi'
    ? process.env.SARVAM_TTS_SPEAKER_HI || 'priya'
    : lang === 'ml'
      ? process.env.SARVAM_TTS_SPEAKER_ML || 'kavitha'
      : process.env.SARVAM_TTS_SPEAKER_EN || 'ishita';
const enabled = () => !!process.env.SARVAM_API_KEY && process.env.SARVAM_TTS !== 'off';

const CACHE = 'public, max-age=31536000, s-maxage=31536000, immutable';

export async function GET(req) {
  const u = new URL(req.url);
  if (u.searchParams.get('probe')) return NextResponse.json({ enabled: enabled() });
  if (!enabled()) return NextResponse.json({ error: 'disabled' }, { status: 501 });

  const id = u.searchParams.get('h') || '';
  const l = u.searchParams.get('l');
  const lang = isLang(l) ? l : 'en';
  const text = speechTexts().get(id);
  if (!text) return NextResponse.json({ error: 'unknown text' }, { status: 404 });

  const db = sb();
  // v2: pauses fixed (see lib/speechPrep.js). A new version means new audio, not the old saved copy.
  const path = `${MODEL().replace(/[^a-z0-9]/gi, '')}-${SPEAKER(lang)}-v2/${lang}/${id}.mp3`;

  // 1. Already generated? Serve the saved copy (no credits used).
  if (db && !u.searchParams.get('debug')) {
    try {
      const r = await fetch(`${db.url}/storage/v1/object/tts/${path}`, { headers: db.headers });
      if (r.ok) {
        const buf = Buffer.from(await r.arrayBuffer());
        return new NextResponse(buf, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': CACHE } });
      }
    } catch {}
  }

  // 2. Generate with Sarvam.
  let audio;
  try {
    const r = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: { 'api-subscription-key': process.env.SARVAM_API_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        text: prepareSpeech(text, lang),
        language_code: langCode(lang),
        model: MODEL(),
        speaker: SPEAKER(lang),
        pace: 0.9,
        output_audio_codec: 'mp3',
        speech_sample_rate: 24000,
      }),
    });
    const j = await r.json().catch(() => ({}));
    if (!r.ok || !j.audios || !j.audios[0]) {
      console.error('sarvam tts failed', r.status, j);
      return NextResponse.json({ error: 'tts failed', status: r.status, detail: j }, { status: 502, headers: { 'Cache-Control': 'no-store' } });
    }
    audio = Buffer.from(j.audios.join(''), 'base64');
    if (u.searchParams.get('debug')) {
      return NextResponse.json(
        { ok: true, bytes: audio.length, head: audio.subarray(0, 12).toString('hex'), model: MODEL(), speaker: SPEAKER(lang), text, sent: prepareSpeech(text, lang) },
        { headers: { 'Cache-Control': 'no-store' } }
      );
    }
  } catch (e) {
    console.error('sarvam tts error', e);
    return NextResponse.json({ error: 'tts error' }, { status: 502 });
  }

  // 3. Save it so we never pay for this sentence again.
  if (db) {
    try {
      await fetch(`${db.url}/storage/v1/object/tts/${path}`, {
        method: 'POST',
        headers: { ...db.headers, 'Content-Type': 'audio/mpeg', 'x-upsert': 'true' },
        body: audio,
      });
    } catch {}
  }

  return new NextResponse(audio, { headers: { 'Content-Type': 'audio/mpeg', 'Cache-Control': CACHE } });
}
