# Folks: user-testing feedback, fixes task list (23 Oct 2026, evening)

Read alongside `docs/HANDOFF.md` (product context, build state, testing tips).

Buildathon deadline: **Mon 26 Oct 2026**. Repo: `Rinkle-S/folks` (main). Live: https://folks-vert.vercel.app/

## Current state a new session must know
- **Sarvam voice is OFF right now.** Env flags `SARVAM_TTS=off` and `SARVAM_STT=off` are set in Vercel and redeployed. Do not test audio or re-enable without asking, it costs credits. The app still works fully by text and the typed box on home.
- **Do content/screen fixes BEFORE wiring Supabase.** Supabase is optional and additive (powers `/stats`, saved AI answers, "ask someone" recordings). Every code path degrades gracefully without it. Only wire it up if we want real usage numbers for the deck, ideally right before a final test round.
- **Models:** Sonnet 5.5 for the execution items; Opus 5.5 for the hard redesign (#4) and gnarly debugging.
- Work on a branch and open a PR. Do not push straight to `main` (Vercel deploys from it). Rinkle merges.

## Key product decisions, hold these
- **Never ask elders to enter their REAL PIN**, not even as an option. Practice accepts any input and says it is pretend. (Do not train the group scammers target to type a real PIN into a bank look-alike screen. Also a strong trust/security slide.)
- **Folks is a companion you keep open while doing the real thing, not something to memorise.** Reduce the memory burden by trimming to crucial steps, not by teaching harder.

## The feedback (9 items), bucketed by priority

### MUST-FIX before Monday (correctness + trust)
1. **Language leak.** In Malayalam, a screen rendered Hindi text. Audit ML content against the kit specs (`lib/ml.js`, `lib/mlContent1.js`, `lib/mlContent2.js`, `lib/i18nMl.js`, `lib/kitSpec*.js`); find missing or wrong-language strings and fix the fallback order so Malayalam stays Malayalam (or English), never Hindi. Start here.
3. **PIN confusion.** Testers froze on "1234". Accept any 4 digits and move on, plus a gentle hint ("type any 4 numbers, this is just practice"). Never request their real PIN.
4. **Prototype vs real phone confusion.** Elders cannot tell the practice screen from their real phone. Add a persistent, gentle "practice" cue (label / tint / border so it never looks identical to the real app) plus a first-run explanation ("This is a practice screen. Tap along, nothing real happens"). Biggest UX risk in the batch. Use Plan mode first.

### DO IF TIME (quality of life)
6. **Back button.** Add a clear "previous step" control inside a lesson (for mis-taps); make the big back button exit-with-confirmation and relabel it so it is not mistaken for step-back.
2. **Audio pace.** Slower default speaking rate plus short pauses between steps. Config only; do not burn Sarvam credits testing (it is off right now anyway).
9. **Trim "Read the steps" to crucial steps only**, framed as "keep this open while you do it for real".

### ROADMAP (put in the deck, do not build)
7. A general cross-app **"how to upload a photo/document"** concept lesson (Rinkle's mom's ask; a transferable skill). Build only if 1/3/4 are done.
8. A **retention test / quiz**. Lightweight MVP may already exist: a "now try it yourself, no hints" replay (the code already tracks a `real_try` event). Surface that rather than build a quiz mode.
- Audio-pace research (what pace actually suits elders).

### RINKLE'S CALL (cheap toggle)
5. **"Recently opened" on home.** Keep only if dead simple ("pick up where you left off"); otherwise cut it so home stays big mic + typed box. Ask before deciding.

## Suggested order
1 (language audit) -> 3 (PIN) -> 4 (practice vs real), then 6 / 2 / 9 if time.
Deck gold regardless of build: the never-ask-real-PIN stance (#3) and the companion-not-memorisation reframe (#9).

## Rules that still apply
No em dashes in app text; "ask someone" wording; English default; free tier only; API keys only in Vercel, never in chat or repo.
