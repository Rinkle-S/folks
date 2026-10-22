# Folks — phone help for your folks

Safe, voice-guided practice for everyday phone tasks for parents aged 55+. They practise with fake money, in Hindi or English, and then do it for real on their own.

HelloPM Buildathon, Oct 2026 · built by Rinkle Sebastian · spec in [SPEC.md](SPEC.md)

## What's in it

| Page | For | What it does |
|---|---|---|
| `/` | Parent | Say or type what you want to learn → the matching lesson. Lessons are grouped by app ("Your apps" first), plus a "Spot the scam" card. With no match, "Ask someone to make this lesson" sends a WhatsApp link. |
| `/lesson/<id>` | Parent | 8 lessons (Google Pay: QR payment, send money, recharge, electricity bill · WhatsApp: find an old file, status, video call · Google Drive: scan to PDF). Each lesson can be learned three ways (see below). |
| `/scams` | Parent | 10 real-looking messages and calls (KYC link, fake bank call, "new number" child, customs, job offer, lottery, wrong-number refund) plus genuine ones. Pick Real or Scam and hear why. |
| `/add/<id>` | Helper | Make a lesson for what the parent asked: type the steps, record a voice note, and/or upload a screen recording or screenshots. |
| `/my/<id>` | Parent | The lesson made for them: the helper's voice note, video, screenshots and written steps (read aloud). |
| `/send` | Helper | Send a parent a lesson link on WhatsApp. |
| `/stats` | Team/judges | Live numbers: starts, completions, where people get stuck, requests, feedback. |

The three ways to learn each lesson:
- **Practise it myself:** tap through practice screens. The button to press always glows with a "Tap here" label, and a wrong tap gets a simpler hint.
- **Watch first:** plays by itself, with voice and glowing taps. You can pause or go back, or tap "Let me try".
- **Read the steps:** a written guide worded for the real app, with each step read aloud and an optional picture.

All lesson content lives in `lib/lessons.js` (and scam cards in `lib/scams.js`), so a new lesson gets all three ways automatically.

## Installs like an app

Folks is a Progressive Web App. On an Android phone in Chrome, open the link, then use **Settings → Add Folks to home screen** (or Chrome's menu → *Install app*). It gets its own icon and opens full screen, without the browser bar. It could later be wrapped for the Play Store (Trusted Web Activity) without rewriting anything. A native Android app is only needed for things a website can't do, like guiding on top of other apps or reading which apps are installed.

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy (Vercel + Supabase)

1. **Supabase:** create a free project, then go to SQL Editor → paste `supabase/schema.sql` → Run. Also create two **private** Storage buckets: `recordings` (for helpers' voice notes and videos) and `tts` (saved lesson voice clips).
2. **Vercel:** import this repo, then add these environment variables:
   - `SUPABASE_URL` (Project Settings → API → Project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → `service_role` key; it's only used on the server)
3. **Redeploy.** Open `/stats` to check that events arrive.

Without the env vars the app still works; events just aren't stored.

**Voice (Sarvam AI, optional):** set `SARVAM_API_KEY` in Vercel and both of these switch on:
- **Lesson voice:** a natural Indian voice (Bulbul v3; `priya` for Hindi, `ishita` for English). Each sentence is generated once and saved in a private Supabase bucket called `tts`, so replays cost nothing. Only sentences that exist in the app can be voiced. Turn it off with `SARVAM_TTS=off`.
- **Voice search:** speech-to-text, at about ₹0.04 per search. Turn it off with `SARVAM_STT=off`.

Without a key, the phone's own voice and speech recognition are used.

## Notes

- **Practice screens are generic look-alikes.** They have no real brand logos, carry a permanent "Practice only: no real money" banner, and nothing is sent. The PIN is always the practice PIN 1234, and lessons teach never to type a real PIN anywhere else.
- **If voice isn't available,** typing, the tiles and the written steps still work.
