# Folks — phone help for your folks

Safe, voice-guided practice for everyday phone tasks for parents aged 55+. They practise with fake money, in Hindi or English, and then do it for real on their own.

HelloPM Buildathon, Oct 2026 · built by Rinkle Sebastian · spec in [SPEC.md](SPEC.md)

## What's in v1

| Page | For | What it does |
|---|---|---|
| `/` | Parent | Choose a language → say or type what you want to learn → matching lesson. Also lesson tiles. A "coming soon" tile or a request with no match → "Ask my son/daughter" on WhatsApp, logged as demand. |
| `/lesson/qr-pay` | Parent | Pay at a shop by scanning a QR code. Covers the scan icon, checking the shop's name, typing the amount, practice PIN 1234, and refusing a "PIN to receive money" scam request. |
| `/lesson/whatsapp-docs` | Parent | Find an old PDF or photo on WhatsApp (contact name → Media, links and docs → Docs). |
| `/send` | Son/daughter | Pick a lesson and language, then send the link on WhatsApp. No login. |
| `/stats` | Team/judges | Live numbers from the database: starts, completions, where people get stuck, requests, feedback. |

How a lesson works:
- Each step shows a practice look-alike screen plus a spoken instruction.
- A wrong tap or 💡 Help makes the right button glow and speaks a simpler hint.
- Every step is logged (no names or phone numbers).

All lesson content lives in `lib/lessons.js`, so adding a lesson or a language means adding data.

## Run locally

```bash
npm install
npm run dev   # http://localhost:3000
```

## Deploy (Vercel + Supabase)

1. **Supabase:** create a free project, then go to SQL Editor → paste `supabase/schema.sql` → Run.
2. **Vercel:** import this repo, then add these environment variables:
   - `SUPABASE_URL` (Project Settings → API → Project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` (Project Settings → API → `service_role` key; it's only used on the server)
3. **Redeploy.** Open `/stats` to check that events arrive.

Without the env vars the app still works; events just aren't stored.

Optional: better voice search with Sarvam AI (good with Hindi and Hinglish). It costs about ₹0.04 per search.
- Set `SARVAM_API_KEY`, and set `SARVAM_STT=on` to switch it on.
- Without it, the mic uses the browser's own free speech recognition.

## Notes

- **Practice screens are generic look-alikes.** They have no real brand logos, carry a permanent "Practice — no real money" banner, and nothing is sent. The PIN is always the practice PIN 1234, and lessons teach never to type a real PIN anywhere else.
- **Voice** uses the browser's own speech features (Chrome on Android works best). If voice isn't available, typing and the tiles still work.
