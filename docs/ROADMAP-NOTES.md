# Roadmap notes (for the deck, not built)

Decided 23 Oct 2026. Put these on the roadmap slide when we do the deck at the end.

- **Workshops / sessions:** live group sessions for seniors (dance, yoga, games, chair exercise), a "Workshops" tab
  with "Coming soon". Not built for the buildathon: it adds a second audience and journey, and the reviewers'
  advice (and the winning Akshara entry) was to go deep on one user and one journey.
- Cross-app "how to upload a photo or document" concept lesson.
- Retention: surface the "now try it yourself, no hints" replay (tracked as `real_try`).
- Audio pace research (what pace suits elders).

## Keeping screens up to date when apps change (roadmap, not built)
Practice screens copy real apps (Google Pay, WhatsApp, YouTube and others), and those apps change their look and
button names every few months. A feasible plan, cheapest first:
1. **Screens are data.** Each lesson's screens live in `lib/kitSpec*.js` and the shared templates in `components/kit/`,
   so one fix updates every lesson that uses that screen. Keep it that way.
2. **"Last checked" on every app.** Store app, version and the date we last compared it with the real app. Show a
   short list of apps overdue for a check (say after 90 days).
3. **A "this does not match my phone" button** on every practice screen. It logs the lesson, step, app and phone model
   (to Supabase `events`), so real users tell us which screens are stale first.
4. **Quarterly check of the top 10 apps.** One person takes real-phone screenshots, compares them with the practice
   screens, and fixes the templates. Play Store "what's new" notes are the early warning.
5. **Family helpers can fix it.** The child already adds steps with `/add`. Let them attach a screenshot when a
   screen is out of date, so we get fresh pictures without hunting for them.
6. **Later:** AI-assisted compare. Upload a real screenshot, flag which template differs and what moved.
Rule: label practice screens as "look-alike" (done), so a small difference is expected, and the lesson text names buttons
the way the app shows them.
