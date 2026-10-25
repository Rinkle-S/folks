# Nook: session handoff (read this first, then `CLAUDE.md`)

## Watch-only wording: 26 Oct 2026
- Reviewed 129 steps in 15 tutorials before deciding on a separate Watch script rather than rewriting Practice. Added EN/HI/ML `watchSay`, neutral quiz `watchWhy` and `watchClosing` metadata in `lib/watchCopy.js`.
- Player uses the Watch script for visible text, narration, warmup and quiz explanation. Safety prefaces are separate narration segments so the Watch body sentence highlights match. Watch completion voice credits watching.
- Watch keypad counters describe progress, not key presses. Narrow Watch status text wraps; all original app labels, quoted fraud requests, safety rules and real playback controls stay intact. Practice/Read data and behavior unchanged.
- Validation: all 129 scripts/languages, data immutability, all Watch screens at phone/laptop widths, all 45 automatic Watch runs, all tutorial modes/languages and mocked voice/highlight/safety sequencing. Build/ML pass; no actual audio or Sarvam changes. Details: `docs/WATCH-COPY-REVIEW.md`.

## Onboarding v2 and lesson end: 26 Oct 2026
- Audited both specs and the eight ZIP mockups before editing; the audit table was delivered in chat. Owner approved Find an old file/photo instead of the hidden Send a photo goal, and direct Stay safe entry for the scam goal.
- New five-step onboarding includes an inert Pay tap/success, translated copy, labelled name/live preview, larger app choices/None, and one first goal. Starts in the chosen mode picker (explicit onboarding exception to scene-first/default mode); Look around goes Home. Unstarted goals remain in Continue, including Stay safe until its first completed reading lesson.
- Shared `LessonEnd` shows all three numbered tips, safety styling, one visible feedback question and measured pinned next/repeat actions. Mode-specific next actions follow the existing app-page ordering. No end accordions/Send row/real-app prompt. Five two-tip guide lessons now have three concise completion tips.
- End Print generates a one-page three-tip handout; existing app/full-step printing is preserved. Mode picker has native Share with cancellation/copy fallback; app sharing retains its approved existing flow. Connected-dot Send icons throughout, including simulated screens; corresponding receipt hint corrected.
- New event types use the durable outbox and existing endpoint. Legacy completion/feedback events retained for Stats. No schema or Sarvam changes.
- Completed Learn v2 layout/items preserved apart from the missing onboarding-resume logic, new mode Send/minimum typography and sharing instrumentation. Deferred graphics stash untouched. Source/acceptance/interpretations: `docs/onboarding-v2/`.
- Validation passes: build/ML, all onboarding branches in EN/HI/ML with loaded fonts and contrast/targets, visible tips/pinned actions across phone/landscape/laptop/large text, all tutorial modes/languages, 45 automatic Watch runs, Learn v2/QR/Help/hand/search/event/offline regressions. All 45 tip PDFs verified one page. Browser audio, native print/share and API writes mocked; real iOS dialogs still need physical-device verification.

## Tutorial screenshot fixes: 25 Oct 2026
- Owner clarified mismatched car/driver details: stay outside, check booking, contact the booked driver and wait safely for the matching car; help/cancel if unresolved or unsafe. Updated practice, Read copy and guides. Corrected cancellation reason, Google Pay icon description, receive-money PIN wording and recharge wording.
- Shared quiz choices now have space, 19px text, 56px minimum height and 12px gaps. Quiz panels use page scrolling. WhatsApp rupee icons are round again.
- Video-call ringing moves ahead automatically after five seconds in Practice and Watch. Local gentle tone only with sound on; leaving/Previous/pause cleans up. Audio was mocked in tests, never played.
- All tutorial impersonation calls/SMS use teal safety practice treatment. Police/bank questions get matching inert pretend call screens. Split practiceSafetySub from the unrelated Stay safe translation key that had overwritten it.
- Completion uses a completed-lesson card and expandable reminders/feedback. Removed duplicate terminal Well done cards. Scene sentences highlight in all languages. Stay safe page numbers remain visual but are not narrated.
- Home Settings offers persistent voice speed. Synchronous print handlers commit one active handout before calling print; corrected iOS help. Physical iPhone native print/share sheet still needs owner verification.
- Send pages now have Back and bottom navigation; missing-page/invalid safety-lesson links offer Home exits. App detection is research TODO only in PARKING-LOT.md.
- Detailed checklist, sources and validation: `docs/TUTORIAL-REVIEW.md`. Production build/ML checks pass; all 15 lessons in three modes/languages, all 45 automatic Watch runs, QR/Help/hand checks, seven viewport responsive matrix, Learn v2 regressions, voice mocks, mobile print media and EN/HI/ML PDFs pass. No external writes or real audio in browser tests. Graphics stash untouched.

## Learn redesign v2: 25 Oct 2026
- Fetched and preserved the owner's Stay safe changes and v2 spec/mockups from `dcddd16`. Applied the three-screen Learn redesign with existing components and icons; no practice scene artwork changes.
- Home has labelled Settings, profile in Settings, shorter heading/greeting, a labelled Search action, all six app tiles in stable saved order with three progress states, and always-visible topics. App pages have labelled Back, Up next/Start, the request card and bottom helper actions. Mode choice adds lesson context and neutral, matching options.
- EN/HI/ML supplied. Scoped styles retain at least 16px body copy and 19–20px card titles, with wrapping instead of shrinking. Very narrow phones use two app columns. Existing bottom nav is unchanged.
- Owner confirmed reusing the existing sharing flow/message: `/send?app=…&lang=…`, not a new picker or native share-sheet design. Only two topics exist, so show both rather than inventing a third.
- Detailed acceptance results, interpretations and tests: `docs/learn-redesign-v2/IMPLEMENTATION.md`.
- Unfinished scene-graphics work from the earlier interrupted turn is saved in Git stash `Deferred scene graphics; excluded from Learn redesign v2`. Do not apply it unless the owner resumes graphics work.

## All-lesson scene and script review: 25 Oct 2026
- Latest owner request supersedes the earlier QR-only scope and Read bypass below. All 15 retained lessons open with a narrated scene, then a separate mode chooser, then step 1. Saved defaults and direct mode links skip only the chooser. Valid resume links stay direct.
- Removed `flashlight`, `bigger-text` and `gd-maps-offline` from the catalogue/search/topics. Old lesson links return a localized Home route; stale resumes are cleared without deleting completion history.
- `lib/lessonReview.js` applies the reviewed Send money, Recharge and Check balance scripts from `../Nook Lesson Scripts.docx` after shared helpers and language filling. Each addition supplies EN/HI/ML.
- Send money now includes selecting the WhatsApp recipient and sending the receipt, before returning to Done. Removed its repeated receive-money PIN trap. Read mode uses real-phone sharing instructions.
- Recharge has a distinct, inert pretend SMS screen; its plan tabs scroll and the first card has space for its glow. Balance now accepts any four practice digits, followed by the tick and a labelled pretend balance.
- Reviewed other retained lessons: contextual scenes/endings, status audience privacy, pickup/fare checks, driver/ride PIN checks, app authenticity clues, explicit prefilled/install simulation wording, and task-specific next tries. Corresponding quick guides corrected too.
- Help respects sound-off, speaks automatically with sound-on, shows the hint and refocuses the target. Listen again restores the original instruction. The PIN hint has a reserved row, separate from the yellow warning.
- New PIN/receipt/safety screens use their content height and page scrolling so the keypad, question and answers stay reachable without clipping or overlapping. Existing screens keep their established layout. Step counters wrap instead of truncating.
- Generated six scene vignettes as one atlas, `public/scenes/scene-atlas.png`; provenance and prompt in `docs/SCENE-ART.md`.
- Validation: production build and Malayalam checks; search/event/offline regression; all 15 lessons × EN/HI/ML through Practice, Read and Watch controls on phone and laptop, including wrong quiz picks; all 45 automatic Watch runs; scene/default/resume/retired-link/Help checks; seven-viewport rewards/watermark/hand regression. Audio and external APIs mocked throughout. No Sarvam credits used.
- Official references used for factual corrections: [WhatsApp status privacy](https://faq.whatsapp.com/502161774931737/) and [Uber payment selection](https://help.uber.com/riders/article/selecting-a-payment-method?nodeId=fcd07b2d-9597-423f-b3a7-ba68ae505dbe).

Earlier entries below describe historical behavior before this update.

## QR scene and lesson update: 25 Oct 2026
- QR has a narrated, unnumbered scene with Ready before mode selection. Saved Practise/Watch defaults still pass through it.
  Direct/default Read mode bypasses the scene; a valid resume link continues directly at its saved step.
  Lessons without `scene` keep their original introduction. The old PracticeIntro card and its Settings/storage logic are removed.
- `lib/qrPractice.js` applies the supplied three-language script after shared plain-word/PIN helpers.
  Only the Google Pay find-app instruction/hint is shared across lessons. The chat requested the other new wording for QR only;
  the subsequently added brief's broader shared-copy note was not used to expand that scope.
- Any quiz answer now shows its reason and Next. A wrong pick gets a soft red cross and reveals the green correct answer.
- `lib/handPosition.js` keeps the hand outside the target and inside the practice frame, with edge fallbacks and a below-arrow position.
- QR step 4 shows the shop board; steps 11/12 use the teal pretend-call banner, with a shield/preface only on step 11.
- Help still speaks the hint and refocuses the target. Listen again restores/speaks the original step instruction, without another button.
- QR closing/takeaways/realTry use the supplied copy. Read mode keeps its ordinary completion label because it is for the real phone.
Validation: build, Malayalam and regression checks; all 18 lessons at 320x568 in three languages (wrong quiz answers),
all 18 at 1366x768 in English (right quiz answers), and supporting pages. Responsive checks cover seven sizes x three languages.
`node scripts/test-qr-flow.mjs` checks scene/default modes/Read/resume, wrong-answer feedback, shop-name visibility, safety styling,
PIN acceptance, closing, hand bounds, and mocked speech sequencing. Speech/audio and API writes are mocked; Sarvam stays off.

## Responsive layout fix: 25 Oct 2026
Watermark follow-up: the owner wants the earlier larger laptop appearance. At 720px and above,
the mark now grows up to 84px while still fitting its container height/width; Malayalam has a lower width factor.
Phone sizing remains unchanged. The decorative wrapper carries its language to select the fit rule.
Verified: build, Malayalam check, seven viewport sizes x three languages (Help, scrolling, pointers and resize),
and phone/laptop quiz screens in all three languages. No player interaction logic changed.

Targeted CSS changes only; the player and highlight/hand/Help logic were preserved.
- Google Pay shortcuts use tighter spacing below 400px and wrap as a fallback; Rewards is no longer clipped.
- The practice banner can wrap and the diagonal watermark sizes to its own screen in all three languages.
- Very short screens keep a 320px minimum practice area and allow page scrolling, so long instructions cannot collapse chat targets.
- WhatsApp's video thumbnail fits above the call controls and below the header; its tools turn into a row only when needed.
- Removed identical `public/icon.svg`, which conflicted with the retained `app/icon.svg` route in development.
Validation: production build and Malayalam check passed. Browser checks passed for all 18 lessons in practice/read/watch-control modes
at 320x568 in English/Hindi/Malayalam, plus all 18 at 1366x768 in English. All 24 supporting pages passed at those settings.
`node scripts/check-responsive.mjs` checks seven viewport sizes x three languages, including clipping, Help, free scrolling,
edge pointers, tint alignment and live resizing. It uses the same runtime environment variables as `smoke-journeys.mjs`.
The smoke test also accepts TEST_WIDTH, TEST_HEIGHT and TEST_LESSON. Audio and real API writes remain disabled in tests.

## Owner update: 25 Oct 2026
All visible journeys must work end to end, not only QR payment. Ask someone remains removed.
The owner is testing nook-learn.vercel.app. Preserve their existing flows and progress keys.

Security/reliability update: Next.js 15.5.28, patched PostCSS override, async route params,
app-specific search filtering, durable lesson requests, and aggregate-only public stats.
Feedback queue IDs are kept in event metadata. Normal retries are acknowledged without another insert;
stats deduplicate concurrent retries too. The optional SQL index in
`supabase/migrations/20261025_event_retry_index.sql` enforces uniqueness for simultaneous inserts
at database level; it has not been applied to the live database. No migration is required for the app to run.
Raw search/request/feedback text remains available only through the owner's Supabase access.
Regression checks: `node scripts/test-fixes.mjs`, `node scripts/test-stats.mjs` (fresh build required),
and `node scripts/smoke-journeys.mjs` (local server plus Playwright required; see script comments).
Verified locally: production build, Malayalam check, dependency audit (0 vulnerabilities), regression tests,
public-stats integration checks, and all 18 visible lessons x 3 languages in practice/read/watch-control modes
(54 lesson/language combinations), plus 24 supporting pages per language, with no page errors.
These checks disable audio and mock API writes; watch timing/audio, real-phone deep links and live Supabase writes need owner verification.


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

## Sat 24 Oct (night): owner's picks applied
- **Send button** is the small round share mark (`ShareMark` in `components/ShareLesson.js`), quiet by design: it only reacts to a tap exactly on it, never opens another app, and copies the message with the link, then says "Link copied". Search result: mark plus words under the card; lesson rows: mark only.
- **End of a lesson (option A):** main button, then Print / Again / Send as round icons, then the three faces. "See other lessons" is gone (the bottom bar has Learn). The star rating and "Tell us more" appear only after a face is tapped.
- **Phone basics** icon is Google-style: light blue square, blue handset.
- Removed: the "My son or daughter's name" setting, the "lessons made for you" list on Help and Home (the ask-someone flow is gone), and the WhatsApp-number ask.
- The bottom bar no longer stretches across wide screens on pages outside the main shell (guides, reading mode, lesson end).

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
