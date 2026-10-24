# Nook: session handoff (read this first, then `CLAUDE.md`)

Last updated: Sat 24 Oct 2026. **Buildathon submission: Mon 26 Oct 2026, afternoon.**
Owner: Rinkle Sebastian. Repo: `Rinkle-S/folks` (the product is now called **Nook**; the repo and the Vercel URL keep the old name).
Live site: `folks-vert.vercel.app` (Vercel auto-deploys from `main`). Local clone: `/home/user/folks`.

## What Nook is
A phone-skills practice app for parents aged 55+ (English, Hindi, Malayalam). They practise an occasional phone task on a safe fake
screen with a voice, scam traps included, then do it on the real phone. **Hero flow:** pay safely at a shop by QR (lesson id `qr-pay`).
Tagline: "Your cozy corner for everyday learning". Next.js 14 app router, no login, no accounts. Profile lives in the browser
(`localStorage`); usage events go to Supabase via `/api/event`; `/stats` shows them.

## Standing rules (also in CLAUDE.md, which is authoritative)
- Judged on 7 criteria x 5 = 35: problem clarity, scope (one journey), working product, UX, innovation, helpfulness, demo and GTM.
  Gate before building: which criterion does it raise? If none, park it in `docs/PARKING-LOT.md` and ask.
- Sarvam voice stays **off** (`SARVAM_TTS`, `SARVAM_STT`). Never test audio. A phone-voice option and "Check audio" exist in Settings.
- Pushing to `main` is allowed (owner said so). Run `npm run build` and `npm run check:ml` first. No keys in the repo.
- Never ask for or accept a real PIN on a practice screen. No em dashes in app text. "Ask someone" wording. English default.
- Every screen fully in the chosen language; `npm run check:ml` must pass (no Hindi letters in Malayalam, every string present).
- Kind wording: no strong words ("cheated", "danger"...). Say "scammer", "debited". Design for older users: big text, big buttons, calm colours.
- No new features, apps or lessons unless the owner asks. The owner decides by looking at ideas first: **show options as images, don't change anything until they pick.**

## What is built (all on main)
- 103 lessons: hand-built plus guide lessons (`lib/guides/*`, screens in `lib/kitSpec*.js`, components in `components/kit` and `components/screens`).
  146 recreated app screens, **all are best guesses**: none checked against real phones. See `docs/SCREENS-TO-REPLACE.md`.
- Ride journey for Uber and Rapido (book, cancel, check driver, share trip, pay, rate, lost item), settings guides with scroll, toggles, brightness bar.
- Practice player: Leave button with confirm, Previous step, hand pointer plus light tint over the whole target (auto scrolls it into view),
  hints spoken only from the second wrong tap (blank taps are free), task-specific closing messages (`lib/closing.js`).
- End screen has one main action; quiet links for Print and Practise again. Feedback is three faces; reasons only after "Hard".
- Print: printer icon in the lesson top bar (opens the phone print screen, handout with a picture per step unless "Hide pictures" is on).
  Guide pages, app pages and topic pages print steps only. FAQ at `/help` and `/help/print`.
- Bottom tabs: Learn, Stay safe, **Help** (Help = ask for a lesson to family or "Tell the Nook team", lessons made for you, FAQ).
- Topics are one collapsed row on Home; each topic page has "Read the whole journey" (all steps on one page).
- Stay safe: 12 scam cards, warning words highlighted after the answer, a "how this scam works" panel, five signs card.
- Settings: Voice choice (Automatic or this phone's own voice), "Audio not working? Check audio", language, how I like to learn.
- Matcher fixes (`lib/match.js`): Latin keywords must start a word; naming another app excludes other apps' guides. ICICI and Zepto are hidden
  (code kept). AI helper removed (see `docs/ROADMAP-NOTES.md` for how to bring it back).
- Logo and rename done (`components/Logo.js`, `public/icon.svg`, `public/logo-full.svg`, PNG icons in `public/icons`).
- Event whitelist fixed in `app/api/event/route.js` (print, open_real_app, lesson_request... were being dropped). Server accepts both
  `sb_secret_` and legacy `service_role` keys (`lib/supabase.js`).

## Supabase (connected by the owner on Fri 23 or Sat 24 Oct)
Project `nook` (Mumbai). Steps in `docs/SUPABASE-SETUP.md`. Tables: `events`, `custom_lessons`. Vercel env vars `SUPABASE_URL`,
`SUPABASE_SERVICE_ROLE_KEY` were added by the owner (confirm rows appear in `events` before relying on it). Feedback answer is in
`events.meta->>'v'` (`easy|okay|hard`); detail in `type = 'feedback_detail'` (`meta->'reasons'`). No audio is stored. Lesson ids must stay stable
(log any id change in `docs/CONTENT-IDS.md`).

## The deck (a required submission)
Slides artifact: https://claude.ai/artifact/FCdHYQL667NKxk3EiYqmj8 ("Nook Buildathon Deck"), 12 slides plus one INTERNAL `scorecard` slide.
- **Before it is submitted or shared: delete the `scorecard` slide** (remove `project/slides/scorecard.html` and its id from `order` in `project/deck.json`).
- Slide ids: cover, story, loop, options, journey, safety, product, tour, scope, feedback, aarrr, gtm, scorecard. Images are uploaded assets (`/_blob/<id>`).
- Brackets still need **real facts from the owner**: the user's name, age, city and quotes, tester cards, funnel counts, ten first-user names, live link.
  Never invent evidence. The owner has edited the deck on the page (the cover has their name), so **read the artifact before publishing** over it.
- HelloPM wants about 10 slides; consider dropping `tour` and `product`'s overlap if the owner asks to shorten.
- Slide sources are generated by `scratchpad/deckgen/gen.py` in the previous session (not in the repo); regenerate or edit the slide HTML directly.

## Open items, in order
1. **Real testing** (criteria 3, 4, 6, 7): owner is asking a friend to watch their parent use it. Script: QR lesson (or a task the parent does not know),
   5 scam cards, one thing they type on the home screen. Collect where they got stuck; fix the top 2 or 3; then fill the deck.
2. Check the live site after Vercel deploys: open in a private window on a phone, do one lesson, confirm rows in Supabase `events` and `/stats`.
3. Real screenshots from the owner replace guessed screens (Google Pay first, then Uber and Rapido, WhatsApp, Settings).
4. Hindi and Malayalam text written by Claude needs a native read (FAQ, Help, Leave dialog, ride lessons, scam explainer, closing messages, tagline).
5. Final pass Monday morning: fill deck brackets, delete the scorecard slide, run the full demo once, check every button on the live site.
6. Parked (do not build without asking): login, workshops, brand-specific guides, keeping screens current, AI helper, "Watch the whole journey" video, laptop tasks.

## How to work here
- Build and test: `npm run build`, `npm run check:ml`. Production server for browser checks: `PORT=3110 npx next start -p 3110` (**rebuild first**,
  the `.next` folder goes stale). Free the port with `fuser -k 3110/tcp`. **Never** `pkill -f` something that matches the shell.
- Browser tests: Playwright from `/opt/node-tools/node_modules/playwright/index.mjs`, Chromium at `/opt/pw-browsers/chromium-1243/chrome-linux64/chrome`
  (`--no-sandbox`). Seed `localStorage`: `folks_lang`, `folks_practice_seen`, `folks_onboarded`, `folks_mute_v2=1`, `folks_mode` (practice, watch or follow).
  Block `/api/**` in tests. The internet is mostly blocked in the sandbox (app icon images fall back to drawn badges).
- Smoke test of all lessons: open every `/app/<id>` page, collect `/lesson/...` links, open each and click the first mode card (103 lessons, 0 failures last run).
- Git: the clone is shallow, so the Stop hook wrongly says "unpushed commits / no remote branch". Verify with `git ls-remote origin <branch>`.
  `gh pr create` is blocked; use the REST API with a JSON file (`gh api repos/Rinkle-S/folks/pulls -X POST --input file.json`). PRs 1 and 2 are merged.
- Commit trailers: see the system reminder in the session (Co-Authored-By and Claude-Session lines).
- Lesson text: Malayalam is keyed by English text in `lib/mlContent1.js` and `lib/mlContent2.js` (change an English string and you must change its key too).
  Guide steps carry their own Hindi and Malayalam inline: `g(id, app, appName, [titles], keywords, [[en,hi,ml]...], caution)`.

## How the owner likes to work
Plain language, short answers, shows images before building, wants honest limits (say what was not verified), no strong or blaming words, big and calm
design for older users. Don't burn credits on heavy testing; light checks by default, a full smoke test at pivotal points. They may be asleep: finish
requested work, push to main, and report clearly what is done and what is not.
