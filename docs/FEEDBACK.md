# Feedback log

Real feedback and what we did about it. Add new entries at the top. Never invent feedback.

## 24 Oct 2026: a mother's feedback, passed on by her child (first real tester feedback)
About the Uber cab lesson, and the IRCTC and YONO lessons. She sometimes struggles to book a cab and is not comfortable with English.

What she liked: watching, then reading the steps, then practising herself; the highlighted buttons ("where to tap next"); the Hindi instructions; being able to read or listen at her own pace; knowing it was only practice and no real cab would be booked. The Uber lesson was the most useful because it covers something she needs in daily life.

| What was suggested | What we did |
|---|---|
| Button names in the instructions should match the screen exactly, with a simple Hindi explanation. Example: IRCTC steps say "PNR Status", the screen says "PNR Enquiry". | Not yet. We rebuild each app's screens from real screenshots the owner sends (Google Pay is done), and fix the names then. |
| Make practice versus real clearer. The written YONO lesson said to open the real app, then asked for "any six numbers for practice". | Done. Seven steps in the written and real-phone modes now ask for the person's own details (YONO PIN, IRCTC login and PNR, Wi-Fi password, and others). The written steps open with a note: "These steps are for your real phone. Use your own details. Never type practice numbers in your real app." |

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
