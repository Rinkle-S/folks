# Nook: standing rules for every session

## Buildathon focus (deadline: Mon 26 Oct 2026, afternoon)
Judging is 35 points, seven criteria at 5 each:
1. **Problem clarity**: one clear user, one real problem
2. **Scope**: one journey, finished end to end
3. **Working product**: deployed, real data, buttons and pages work
4. **User experience**: easy on the platform
5. **Innovation**: not a ChatGPT wrapper or a copy
6. **Helpfulness**: time, money or stress saved
7. **Demo and GTM**: clear demo, first users, real feedback

**Story:** a parent aged 55+ practises an occasional phone task on a safe fake screen with a voice, scam traps included,
then does it themselves. **Hero flow:** pay safely by QR with the mic.

**Gate before building anything:** which of the seven does this raise, and is it worth the time left? If it raises none,
do not build it.

**Priority order**
- Working product (3 and 4): every button works, real data is recorded, no raw errors shown to parents, wrong-lesson matches fixed.
- Scope (2): one journey. No new features, apps or lessons.
- Evidence (7 and 6): make sure events that prove real use are recorded.

**If a request is outside this:** do not build it. Add it to `docs/PARKING-LOT.md` with the criterion it helps and what it
would delay, and ask for confirmation first.

## Deck (remove the scorecard before submitting)
The buildathon deck is a Slides artifact ("Nook Buildathon Deck", https://claude.ai/artifact/FCdHYQL667NKxk3EiYqmj8). It has one
INTERNAL slide, `scorecard`, with a self-estimated score per criterion. **Claude: before the deck is submitted or shared, delete
`project/slides/scorecard.html` and remove `scorecard` from `order` in `project/deck.json`, and remind the owner.** Fill the
bracketed placeholders (user story, testers, first 10 users, live link) only with real facts from the owner. Never invent evidence.

## Design for older users
The users are 55+. Big fonts (body text 18px or more), big buttons and tap areas (at least 56px high), easy-to-understand
design, calm colours (no flashy or neon colours, no blinking). One clear action per screen. Plain words, no jargon.

## Hard rules
- Do not turn Sarvam on (`SARVAM_TTS` and `SARVAM_STT` stay `off`). Do not test audio.
- Pushing to `main` is allowed (the owner said so). Keep each push small and run the build and `npm run check:ml` first. Branches and PRs are optional.
- No API keys in the repo. Keys live only in Vercel environment variables.
- Free tier only. No em dashes in app text. "Ask someone" wording. English is the default language.
- Never ask for or accept a real PIN on any practice screen (any digits are accepted, and nothing typed is stored).
- Language fixes keep each screen fully in the chosen language (English, Hindi, Malayalam). `npm run check:ml` must pass.
- Kind wording: never blame or talk down to the user (say "scammer", "debited").

## Testing
Light by default: build, `npm run check:ml`, and a targeted check of what changed. Run the full click-through only before
a release or after a big layout change.
