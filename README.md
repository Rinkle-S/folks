# Nook: your cozy corner for everyday learning

Live: https://nook-learn.vercel.app

Public landing page: https://nook-learn.vercel.app/about

The landing page source is in `website/`, separate from the learning app. `npm run dev` and `npm run build` run `scripts/prepare-website.mjs`, which copies it to the generated `/about` route with its own styles, images, and narrated demo. The generated `public/about/` directory is ignored by Git. Pushing `main` triggers the existing GitHub-to-Vercel deployment for both the app and landing page.

Safe, voice-guided practice for everyday phone tasks for parents aged 55+. They practise with fake money, in English, Hindi or Malayalam, and then do it for real on their own.

HelloPM Buildathon, Oct 2026 · built by Rinkle Sebastian · spec in [SPEC.md](SPEC.md)

## What's in it

| Page | For | What it does |
|---|---|---|
| `/` | Parent | Say or type what you want to learn → the matching lesson. An "up next" lesson card, a grid of apps ("Your apps" first), plus a "Spot the scam" card. With no match, "Ask someone to make this lesson" sends a WhatsApp link. |
| `/app/<id>` | Parent | One app's lessons, with what's already learned. |
| `/lesson/<id>` | Parent | Hand-built lessons (Google Pay: QR payment, send money, recharge, electricity bill · WhatsApp: find an old file, status, video call · Uber: book a cab, check the car, share the trip · Rapido: book an auto, OTP, fair fare). Each lesson can be learned three ways (see below). |
| `/scams` | Parent | 10 real-looking messages and calls (KYC link, fake bank call, "new number" child, customs, job offer, lottery, wrong-number refund) plus genuine ones. Pick Real or Scam and hear why. |
| `/add/<id>` | Helper | Make a lesson for what the parent asked: type the steps, record a voice note, and/or upload a screen recording or screenshots. |
| `/my/<id>` | Parent | The lesson made for them: the helper's voice note, video, screenshots and written steps (read aloud). |
| `/send` | Helper | Send a parent a lesson link on WhatsApp. |
| `/stats` | Team/judges | Live numbers: starts, completions, where people get stuck, requests, feedback. |

The three ways to learn each lesson:
- **Practise it myself:** tap through practice screens. The button to press always glows with a "Tap here" label, and a wrong tap gets a simpler hint.
- **Watch first:** plays by itself, with voice and glowing taps. You can pause or go back, or tap "Let me try".
- **Read the steps:** a written guide worded for the real app, with each step read aloud and an optional picture.

All lesson content lives in `lib/lessons.js` and `lib/lessonsMore.js` (and scam cards in `lib/scams.js`), so a new lesson gets all three ways automatically.

## Languages

English, Hindi and Malayalam. Lesson files are written in English and Hindi; Malayalam is filled in from `lib/mlContent1.js` and `lib/mlContent2.js` (keyed by the English sentence) and `lib/i18nMl.js` for the interface. Bank SMS in the scam practice stay in English, as they arrive that way on real phones. Sarvam supports 11 languages for voice and mic (English, Hindi, Bengali, Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Punjabi, Odia); adding one means a line in `lib/langs.js` plus its words. Malayalam voice uses the `kavitha` speaker (`SARVAM_TTS_SPEAKER_ML` to change).

## Every lesson starts on the phone's home screen

Step 1 of each lesson is a practice Android home screen: the parent finds the app's icon, guided by its colour, shape and the name written under it.

## On a computer

Nook is a phone app. On a wide screen it shows the same phone layout, centred, with a QR code beside it to open it on a phone.

## Installs like an app

Nook is a Progressive Web App. On an Android phone in Chrome, open the link, then use **Settings → Add Nook to home screen** (or Chrome's menu → *Install app*). It gets its own icon and opens full screen, without the browser bar. It could later be wrapped for the Play Store (Trusted Web Activity) without rewriting anything. A native Android app is only needed for things a website can't do, like guiding on top of other apps or reading which apps are installed.

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

- **Practice screens are look-alikes.** App icons are the real Play Store icons (loaded from Google's image server, with drawn badges as a fallback) so parents can recognise the app on their own phone. The practice screens carry a permanent "Practice only: no real money" banner, and nothing is sent. PIN screens accept any digits ("type any 4 numbers, this is just practice") and never ask for a real PIN, and nothing typed is stored or sent. Lessons teach never to share a real PIN with anyone.
- **If voice isn't available,** typing, the tiles and the written steps still work.
