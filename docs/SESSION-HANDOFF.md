# Nook: session handoff (read this first, then `CLAUDE.md`)

Last updated: Sat 24 Oct 2026. **Buildathon submission: Mon 26 Oct 2026, afternoon.**
Owner: Rinkle Sebastian. Repo: `Rinkle-S/folks` (the product is called **Nook**; the repo keeps the old name for now).
Live site: `nook-learn.vercel.app` (added 24 Oct; the old `folks-vert.vercel.app` still works). Vercel auto-deploys from `main`.
Keep the `folks_` localStorage keys in the code: renaming them would reset every tester's progress and language. Local clone: `/home/user/folks`.

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

## Apps kept (Sat 24 Oct)
Only Google Pay, PhonePe, WhatsApp, Uber, Rapido, Zomato, YONO SBI, IRCTC and Google Maps (plus Phone basics) are in Nook. Paytm, Drive, YouTube, Swiggy, Ola, Amazon, Flipkart, Instagram, Spotify, Blinkit, ICICI and Zepto were deleted with their lessons, guides, screens and keywords. Zomato has no lesson of its own (its old lesson was the Swiggy one). Some old Malayalam text for the deleted lessons is still in `lib/mlContent*.js` (unused, harmless).

## Google Pay screens (Sat 24 Oct)
All Google Pay practice screens were rebuilt to match the owner's real screenshots (the screenshots were removed from the repo on 24 Oct for privacy; see `docs/SCREEN-TEMPLATES.md`). Shared parts in `components/screens/GPay.js`: `GpTop`, `BankingName`, `BankBadge`, `GpTabs`, `UpiMark`; one practice bank (State Bank of India ••••5234) and UPI ID everywhere. Lesson changes: 'Pay anyone' (not 'Pay contacts'), no 'Request' button in chat, success screen closes with the X at the top left (no 'Done'), recharge number under 'My recharges', electricity starts from 'Bills & recharges' on Home and uses 'Link account'. All 11 Google Pay lessons were played start to finish (English; 6 also in Hindi and Malayalam). The new Hindi and Malayalam lines need a native read.

## Core only (Sat 24 Oct, evening)
18 lessons across 5 apps (Google Pay, WhatsApp, Uber, YONO, Maps) plus Phone basics (6 lessons incl. Install an app). Eight rounds of lessons were hidden (see `docs/ROADMAP-NOTES.md`). Zomato has one lesson
(unverified, generic screens). The bottom bar (Learn, Stay safe, Help) now also shows on quick guides, the scam practice and the lesson end
screen; it stays hidden during a lesson, where "Leave" is the way out.

## Hidden, not deleted (Sat 24 Oct)
`lib/hidden.js` lists apps (Rapido, PhonePe) and guides that are switched off but kept in the code. To bring one back, remove its
id from the list. Why: the owner cannot verify every screen, so we show only what is checked. Details and the order to restore them
are in `docs/ROADMAP-NOTES.md`. The earlier deletions (Paytm, YouTube and the rest) are in git history before commit `692c6ff`.
Play Store is its own app now (install an app, find your way around). "Is this link or message safe?" is a quick guide in Stay safe.
Pointer fixes in `components/Player.js`: the hand no longer gets cut off (its bobbing animation overwrote its margin), the screen
can be scrolled freely (it used to snap back to the button), the highlight follows the button when the Help text opens, and a hand
at the screen edge points to a button scrolled out of sight.

## Practice clarity (Sat 24 Oct, from the Reddit and tester feedback)
Every practice screen has a PRACTICE banner (20px) and a faint tilted PRACTICE mark. A "this is practice" card opens at the start of every lesson until the person taps "I know this. Do not show it again" or turns it off in Settings ("Practice reminder at the start of each lesson"); the FAQ explains it. Step numbers now start at 1 on the first practice screen (the lesson start is not counted). Help scrolls the screen back to the button, and a hand at the screen edge points to a button that was scrolled out of sight. Highlight style options (ring, label, arrow, glow) were shown to the owner; no pick yet.

## Sat 24 Oct (evening): ten fixes from the owner's list
- **Home:** more space above "Learn by topic"; Phone basics icon is now a calm blue (`components/AppIcon.js`).
- **Search:** richer keywords for every hand-built lesson and some guides (`lib/keywordsMore.js`), a "Did you mean one of these?" list when nothing matches clearly or two lessons score almost the same (`suggest`, `isClear` in `lib/match.js`), one-letter typos tolerated. "pay money" used to show nothing.
- **Ask someone on WhatsApp removed** from the no-match card and the Help tab (the receiving page needs the lesson-making flow, which is not ready). Both now offer "Tell the Nook team" (event `lesson_request`).
- **Share buttons:** on a search result, and beside every lesson on app pages and topic pages (`components/ShareLesson.js`, event `share` with `meta.where`). Wording is shared with `/send` (`lib/shareMsg.js`).
- **Names by language** (`lib/persona.js`, `REGION`): English unchanged (general Indian names), Hindi drops the Kerala surname, Malayalam uses Kerala names and Chechi / Chettan. Needs a native read.
- **Voice note:** a calm banner on Home when the browser cannot listen or speak (Brave, in-app browsers).
- **Rating:** five big stars after the second finished lesson (once; "Not now" asks again after two more, twice at most) and always on the Help tab. Events `app_rating`, `app_feedback`.
- **Feedback by voice or typing:** "Tell us more" under the three faces at the end of every lesson, and a box on Help (`components/FeedbackAsk.js`). The mic uses the browser's own recognition, so nothing is recorded; it hides itself where unsupported. Note text is in `events.meta->>'note'`, `via` is `voice` or `typed`.

## Sat 24 Oct (late): second round from the owner
- **Continue where you left off:** Home shows one big card (`.resume-card`) when a practice lesson was left halfway; it replaces "Try this" and reopens the lesson at that step (`?resume=1`, `folks_resume` in localStorage, cleared when the lesson is finished, forgotten after a week). "Try this" shows only when there is nothing to resume.
- The lesson voice now waits until the "this is practice" card is dismissed (and does not repeat the step if the card is reopened from Settings).
- An example sentence under the mic in all three languages (`micExample`). The voice banner has an alert icon. The feedback box says "or tap the mic" only where a mic is shown.
- Already rated? Never asked again; Help shows the stars and a thank you. Help has a "Need help now?" card: a placeholder that records `tile_soon` (`tile: help_now`) and says it is coming soon.
- Settings: the trusted-contacts list became one field, "My son or daughter's name" (it only renames Rahul in practice chats; the WhatsApp number is no longer used). Extra sound rows are folded under "More sound options".
- Bottom bar also on Read-the-steps mode and on "lessons made for you". It stays hidden while a practice or watch lesson runs (Leave is the way out).
- **Waiting for the owner's pick (images sent):** the Send button look, the end-of-lesson screen, the Phone basics icon and colour.
- **Open question:** a Google Pay screen at the end that still says "open scanner"; the owner remembers it should be "Share screenshot" then "Done". Not found by reading the code: ask which lesson.

## What is built (all on main)
- 78 lessons: hand-built plus guide lessons (`lib/guides/*`, screens in `lib/kitSpec*.js`, components in `components/kit` and `components/screens`).
  99 recreated app screens, **all are best guesses**: none checked against real phones. See `docs/SCREENS-TO-REPLACE.md`.
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
- Smoke test of all lessons: open every `/app/<id>` page, collect `/lesson/...` links, open each and click the first mode card (78 lessons, 0 failures last run).
- Git: the clone is shallow, so the Stop hook wrongly says "unpushed commits / no remote branch". Verify with `git ls-remote origin <branch>`.
  `gh pr create` is blocked; use the REST API with a JSON file (`gh api repos/Rinkle-S/folks/pulls -X POST --input file.json`). PRs 1 and 2 are merged.
- Commit trailers: see the system reminder in the session (Co-Authored-By and Claude-Session lines).
- Lesson text: Malayalam is keyed by English text in `lib/mlContent1.js` and `lib/mlContent2.js` (change an English string and you must change its key too).
  Guide steps carry their own Hindi and Malayalam inline: `g(id, app, appName, [titles], keywords, [[en,hi,ml]...], caution)`.

## How the owner likes to work
Plain language, short answers, shows images before building, wants honest limits (say what was not verified), no strong or blaming words, big and calm
design for older users. Don't burn credits on heavy testing; light checks by default, a full smoke test at pivotal points. They may be asleep: finish
requested work, push to main, and report clearly what is done and what is not.
