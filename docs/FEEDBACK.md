# Feedback log

Real feedback and what we did about it. Add new entries at the top. Never invent feedback.

## 24 Oct 2026: replies on r/AgingParents (caregivers, strangers)
The subreddit does not allow product research or surveys, so this was unasked-for feedback. Three replies, shortened:

| What we heard | What we changed |
|---|---|
| "A fake app would confuse them even further. They'd think they were actually doing whatever it is instead of just practicing." Another reply: if it is clearly practice mode with big PRACTICE labels, it could help. | Banner on every practice screen: "PRACTICE: this is not the real app" (18px, three languages). A faint PRACTICE mark across the screen (taps pass through it). The first-run card says it is a look-alike that may look a little different. FAQ: "Is the practice screen the real app?" |
| "I showed her maybe 10 times. Every time she acts like it's the first time hearing it." | Already built: practise again as often as wanted, a voice that can be replayed, finished lessons come back after 3 days. |
| "Please do not create yet another app for a vulnerable population without expertise. Work with an organisation that understands the elderly and good UI/UX." | We show only what could be checked against the real app and hide the rest (`lib/hidden.js`). New: "Does this screen look different on your phone?" in a lesson's settings sends a `screen_mismatch` event (lesson, step, screen). FAQ: "Who made Nook, and has it been checked?" (honest: a small project by one person). Next: expert review with an eldercare organisation (roadmap). |
| "Google Maps was suddenly speaking German. It took 40 minutes to find the language setting." | Not built. Idea for the roadmap: a "change the language in an app" lesson. |

Honest limits: this is a side project by one person; these are three online replies, not tested users. Real testers are still needed.
Where to look in the data: `events` where `type = 'screen_mismatch'`.
