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

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy (Vercel + Supabase)

1. **Supabase:** create a free project, then go to SQL Editor → paste `supabase/schema.sql` → Run. Also create a **private** Storage bucket called `recordings` (for helpers' voice notes and videos).
2. **Vercel:** import this repo, then add these environment variables:
   - `SUPABASE_URL` (Project Settings → API → Project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → `service_role` key; it's only used on the server)
3. **Redeploy.** Open `/stats` to check that events arrive.

Without the env vars the app still works; events just aren't stored.

Optional: better voice search with Sarvam AI (good with Hindi and Hinglish). It costs about ₹0.04 per search.
- Set `SARVAM_API_KEY`, and set `SARVAM_STT=on` to switch it on.
- Without it, the mic uses the browser's own free speech recognition.

## Notes

- **Practice screens are generic look-alikes.** They have no real brand logos, carry a permanent "Practice only: no real money" banner, and nothing is sent. The PIN is always the practice PIN 1234, and lessons teach never to type a real PIN anywhere else.
- **Voice** uses the browser's own speech features (Chrome on Android works best). If voice isn't available, typing and the tiles still work.
