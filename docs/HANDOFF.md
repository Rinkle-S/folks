# Folks: handoff summary (23 Oct 2026, evening)

Read this first in a new session. Buildathon deadline: Mon 26 Oct 2026.
Then read `docs/FEEDBACK-FIXES.md` for the current work list.

## The product
- **Folks**: phone-skills practice app for parents 55+. English, Hindi, Malayalam. Practice screens look like the real apps; no real money moves.
- Live: https://folks-vert.vercel.app/ · Repo: GitHub `Rinkle-S/folks` (main) · Next.js 14 on Vercel · voice via Sarvam (keep credits low, no audio testing) · free AI fallback via Gemini (`GEMINI_API_KEY`).
- Rules: no em dashes in app text; "ask someone" wording; English default; free tier only; API keys only in Vercel, never in chat or repo.

## What is built
- **100 lessons**: 34 hand-built + 66 guide lessons (cut 31 rarely asked guides on 23 Oct). All use realistic, app-specific screens.
- **Screen kit** (`components/kit/`): reusable templates per app. Android (Settings, quick settings, Clock, Camera, Contacts, Play Store, Gallery, Gmail, call screen), WhatsApp, Google Pay, PhonePe, Paytm, YONO SBI, iMobile, YouTube, Instagram, Spotify, Swiggy, Blinkit, Zepto, Flipkart, IRCTC, Maps, Uber/Rapido (reused). Lessons are data: `lib/kitSpec*.js` (guides) and `lib/kitOverrides.js` (original lessons).
- **Lesson modes**: three clear cards (Practise / Watch first / Read the steps); Settings has a default "How I like to learn".
- **Home**: big mic + typed box; matched questions open the practice lesson; "Recently opened" replaced the progress card; AI-made guide when nothing matches.
- **Profile**: name on onboarding, phone detection (Android Chrome; iPhone picks manually).
- **Family helper** (`/send`): a child sends any lesson, or a "set up Folks for my parent" link (language + apps prefilled). No app or login needed for anyone.
- **Checks**: all 100 lessons click through to the end (English); screenshots reviewed for every screen.

## Open items
1. **Supabase** (account created, not connected): new project (Mumbai) -> SQL Editor: run `supabase/schema.sql` -> Storage: private buckets `recordings` and `tts` -> Vercel env vars `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` -> redeploy. Needed for real data, /stats, saved AI answers, "ask someone". Optional: every code path works without it. Do content fixes first.
2. **User testing**: messages sent to friends (testers only) and parents. Collect: where they got stuck, wrong screens, voice/wording issues, would parents use it.
3. **Research**: plan in the HelloPM project doc `Folks-Interview-and-Survey-Questions.md` (7-question survey for adult children, 12-min interview, 6-question parent chat).
4. **Deck** (Akshara, the past winner, won on focus + evidence): open with a real parent story; one hero flow (pay safely by QR + mic); evidence from tests; competitors incl. Gemini Live; market size; trust line; AARRR; first 10 users; 60 to 90 s demo video; security check.
5. Not verified: real-phone look, Hindi/Malayalam end-to-end runs, open-real-app links, native review of Hindi/Malayalam scripts (HelloPM project doc `Folks-Quick-Guides-Scripts-For-Review.md`).

## Testing tips
- Build detached: `npm run build` in background, wait for "done"; start `next start` on a fresh port each time; never `pkill -f` with a pattern that is in the same command.
- Node loader for lib imports: `node --import /tmp/reg.mjs` (resolves extensionless imports).
- Playwright at `/home/claude/.npm-global/lib/node_modules/playwright`; stub `/api/tts`.
