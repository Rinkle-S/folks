# Parking lot

Things asked for or thought of that are outside the buildathon priorities (see `CLAUDE.md`). Nothing here is built until the
owner confirms. "Delays" is what it would take time from.

| # | Idea | Criterion it helps | Size and what it delays | Status |
|---|------|--------------------|-------------------------|--------|
| 1 | Print: a button on each guide, each app and each topic, plus a "how to print" FAQ at `/help/print` | 6 Helpfulness (a little on 4) | Owner confirmed it is wanted. Built on `feat/seniors-print-topics-home`. The all-guides print page was removed | Built, in PR |
| 2 | Login for each user, Google sign-in, saved profile picture, demo "Try as Kamala" login | 3 only if a login is required (a demo login is needed only for apps behind a login; Nook has none) | Large (a day). Delays everything in the priority list. Adds a second journey | Waiting |
| 3 | Workshops tab (dance, yoga, games) | none of the seven (a second audience works against 2 Scope) | Large | On the roadmap slide only |
| 4 | Phone brand specific guides and screens (Samsung, Xiaomi, Vivo) | 4 UX, 6 Helpfulness | Large: separate content per brand and per language | After the buildathon |
| 5 | More topic content from the workshop outlines: medicines and prescriptions, 2FA, native-language setup, streaming, voice assistants and AI helpers, Ola, mobile banking in depth | none (works against 2 Scope: no new lessons) | Large | After the buildathon. Listed in `docs/ROADMAP-NOTES.md` |
| 6 | Word-by-word highlight while speaking (sentence highlight is built) | 4 UX | Medium. Needs voice timing data, and audio must stay off | After the buildathon |
| 7 | Keeping practice screens current when apps update (check dates, "does not match my phone" button) | 6, 3 over time | Medium | Roadmap slide |
| 8 | "Look first, then answer" two-step quizzes for careful quizzes | 4 UX | Small to medium. Adds a tap on those quizzes | Waiting |
| 10 | AI helper ("ask anything", Gemini fallback) and voice assistants / ChatGPT-style lessons | 5 Innovation, but it makes Nook look like a chatbot wrapper | Removed from the app. Home shows "coming soon". How to bring it back is in `docs/ROADMAP-NOTES.md` | Parked by owner |
| 9 | Show the original-order Hindi chats in English lessons as English | 4 UX | Small | Waiting |

## Needs the owner (not code)
- **Connect Supabase** so events are really recorded (criteria 3 and 7). Steps are in `docs/HANDOFF.md` on the
  `docs/handoff-and-feedback-tasklist` branch: create the project, run `supabase/schema.sql`, add the private buckets, set
  `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in Vercel, redeploy.
- A native speaker reads the Hindi and Malayalam text.
- Real testers (3 to 5) and their written feedback (criterion 7).
